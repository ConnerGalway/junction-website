import { FORMS_FALLBACK_EMAIL } from "@/lib/forms";
import { cx } from "./ui";

/**
 * The shared error line for every form: "Something went wrong. Email
 * hello@wearejunction.com instead." with a mailto. role="alert", so it's
 * announced when it appears.
 */
export function FormError({ className }: { className?: string }) {
  return (
    <p role="alert" className={cx("type-small m-0 font-medium text-(--tone-text)", className)}>
      Something went wrong. Email{" "}
      <a href={`mailto:${FORMS_FALLBACK_EMAIL}`} className="link">
        {FORMS_FALLBACK_EMAIL}
      </a>{" "}
      instead.
    </p>
  );
}

/** The hidden honeypot field every form carries (bots fill it; Netlify drops those submissions). */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <p aria-hidden="true" className="sr-only">
      <label>
        Leave this empty
        <input name="bot-field" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </p>
  );
}
