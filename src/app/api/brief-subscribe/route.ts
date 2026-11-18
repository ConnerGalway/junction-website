import { mailerliteKey, subscribeToBrief } from "@/lib/mailerlite";

/**
 * POST /api/brief-subscribe: The Brief signup (the /the-brief form and the
 * footer). Body: JSON { email, "bot-field" }. Validates the email, drops
 * honeypot hits quietly, rate-limits per IP, then adds the subscriber to
 * MailerLite (src/lib/mailerlite.ts). The API key never leaves the server.
 *
 * Responses: 200 { ok: true } · 400 invalid email · 429 too many tries ·
 * 503 not configured · 502 MailerLite failed. The UI shows its error state
 * (with a retry) for anything but 200.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Basic rate limit: at most 5 signups per IP per 10 minutes, per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: { email?: unknown; "bot-field"?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid_request" });
  }

  // Honeypot: real visitors never fill it. Pretend it worked.
  if (typeof body["bot-field"] === "string" && body["bot-field"].trim() !== "") return json(200, { ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return json(400, { ok: false, error: "invalid_email" });

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate_limited" });

  if (!mailerliteKey()) {
    console.error("[brief-subscribe] MAILERLITE_API_KEY is not set; signup not sent.");
    return json(503, { ok: false, error: "not_configured" });
  }

  try {
    await subscribeToBrief(email);
    return json(200, { ok: true });
  } catch (error) {
    const status = (error as { status?: number }).status;
    // 422: MailerLite rejected the address itself.
    if (status === 422) return json(400, { ok: false, error: "invalid_email" });
    console.error("[brief-subscribe] MailerLite signup failed.", String(error));
    return json(502, { ok: false, error: "provider_error" });
  }
}
