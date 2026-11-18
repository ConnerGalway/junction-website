/**
 * Netlify Forms (the site deploys on Netlify with the Next.js runtime).
 *
 * Every form is declared in public/__forms.html, which Netlify reads at
 * deploy time to learn each form's name and fields. The React forms post to
 * that file's path with fetch, URL-encoded, including `form-name`. Fields not
 * declared there are dropped by Netlify, so a new field must be added to
 * both places. Submissions show in Netlify → Forms.
 *
 * Client-safe: no secrets here.
 */

export const FORMS_PATH = "/__forms.html";

/** The forms (and the names Andrea sees in Netlify). */
export const FORM_NAMES = {
  contact: "contact",
  quickScore: "lead-quick-score",
  timeBack: "lead-time-back",
  speaking: "speaking-availability",
  trainingSketch: "training-sketch",
} as const;

/** The fallback address in every form's error message. */
export const FORMS_FALLBACK_EMAIL = "hello@wearejunction.com";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Post a submission. Resolves on success; throws on a network error or a
 * non-2xx response (the caller shows the error state). Empty values are
 * left out. `bot-field` is the honeypot: real visitors never fill it.
 */
export async function submitNetlifyForm(formName: string, fields: Record<string, string | undefined>) {
  const body = new URLSearchParams({ "form-name": formName });
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== "") body.set(key, value);
  }
  const res = await fetch(FORMS_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Form "${formName}" responded ${res.status}`);
}

/** The page the visitor was on (sent with every lead). */
export const pageUrl = () => (typeof window === "undefined" ? "" : window.location.href);
