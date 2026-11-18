import "server-only";

/**
 * MailerLite (The Brief's newsletter platform), server side only.
 *
 * The API key is read from the environment variable MAILERLITE_API_KEY
 * (set in Netlify for Production, Deploy Previews and Branch deploys).
 * It's never sent to the browser: this module is server-only, and the
 * signup goes through the /api/brief-subscribe route handler.
 *
 * Optional: MAILERLITE_BRIEF_GROUP_ID, the group new subscribers join.
 * Without it, the group named "The Brief" is looked up once and cached.
 */

const API = "https://connect.mailerlite.com/api";

/** The group new Brief subscribers join when MAILERLITE_BRIEF_GROUP_ID isn't set. */
export const BRIEF_GROUP_NAME = "The Brief";

export function mailerliteKey(): string | null {
  const key = process.env.MAILERLITE_API_KEY?.trim();
  return key ? key : null;
}

/** A MailerLite API call. Throws (with the status, never the key) on a non-2xx response. */
export async function mailerlite<T>(path: string, init: RequestInit = {}): Promise<T> {
  const key = mailerliteKey();
  if (!key) throw new Error("MAILERLITE_API_KEY is not set");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) {
    const err = new Error(`MailerLite ${init.method ?? "GET"} ${path.split("?")[0]} responded ${res.status}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

/* ─── The Brief's group ───────────────────────────────────────────────────── */

type Group = { id: string; name: string };

/** The cached lookup: the group id, null if none was found, undefined if not looked up yet. */
let groupCache: { id: string | null; at: number } | undefined;
const GROUP_TTL = 60 * 60 * 1000;

/**
 * The group new subscribers join: MAILERLITE_BRIEF_GROUP_ID if set, else the
 * group named "The Brief" (case-insensitive), looked up through the API and
 * cached for an hour on this server instance. Null if there's no such group
 * (the signup then goes ahead without one; see subscribeToBrief).
 */
export async function briefGroupId(): Promise<string | null> {
  const fromEnv = process.env.MAILERLITE_BRIEF_GROUP_ID?.trim();
  if (fromEnv) return fromEnv;
  if (groupCache && Date.now() - groupCache.at < GROUP_TTL) return groupCache.id;
  const wanted = BRIEF_GROUP_NAME.toLowerCase();
  let found: string | null = null;
  // filter[name] is a "contains" search; confirm the exact name and page through just in case.
  for (let page = 1; page <= 5 && !found; page++) {
    const res = await mailerlite<{ data: Group[]; meta?: { last_page?: number } }>(
      `/groups?limit=100&page=${page}&filter[name]=${encodeURIComponent(BRIEF_GROUP_NAME)}`
    );
    found = res.data.find((g) => g.name.trim().toLowerCase() === wanted)?.id ?? null;
    if (!res.meta?.last_page || page >= res.meta.last_page) break;
  }
  groupCache = { id: found, at: Date.now() };
  return found;
}

/**
 * Add (or update) a subscriber and put them in The Brief's group. If the
 * group can't be found or looked up, they're still added to MailerLite,
 * without a group, and a warning is logged. Throws if MailerLite rejects the
 * subscriber itself.
 */
export async function subscribeToBrief(email: string): Promise<void> {
  let group: string | null = null;
  try {
    group = await briefGroupId();
  } catch (error) {
    console.warn("[brief-subscribe] Couldn't look up The Brief's MailerLite group; subscribing without a group.", String(error));
  }
  if (!group) {
    console.warn(`[brief-subscribe] No MailerLite group named "${BRIEF_GROUP_NAME}" (and MAILERLITE_BRIEF_GROUP_ID isn't set); subscriber added without a group.`);
  }
  await mailerlite("/subscribers", {
    method: "POST",
    body: JSON.stringify(group ? { email, groups: [group] } : { email }),
  });
}
