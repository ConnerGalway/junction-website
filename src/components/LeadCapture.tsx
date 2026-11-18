"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { CALENDLY_URL } from "@/lib/constants";
import { EMAIL_RE, pageUrl, submitNetlifyForm } from "@/lib/forms";
import { FormError, Honeypot } from "./FormFeedback";
import { Button, Input, cx } from "./ui";

/** The success line every lead magnet shows (we reply by hand; nothing is sent automatically). */
export const LEAD_SUCCESS = "Thanks — we've got it. We'll be in touch with your results.";

/** The CASL consent line under the email field. */
export const LEAD_CONSENT = "We'll only use your email to reply about your results.";

/**
 * Email capture at the end of a lead magnet (Quick Score, time-back
 * calculator). Name (optional) and email, the consent line, then a Netlify
 * Forms submission with whatever `data()` returns (answers, results) plus
 * the name, email, lead magnet and page URL. We answer each one by hand.
 *
 * States: sending (button disabled, "Sending…"), success (LEAD_SUCCESS and a
 * secondary "Book a 20-min call"; or the parent's own card via `onSent`),
 * error (FormError with the mailto). Field errors and the outcome are
 * announced.
 */
export function LeadCapture({
  formName,
  leadMagnet,
  prompt,
  data,
  onSent,
  className,
}: {
  formName: string;
  /** "Quick Score", "Time-back calculator". */
  leadMagnet: string;
  /** The line above the fields. */
  prompt: string;
  /** The answers and results to send. Called on submit. */
  data: () => Record<string, string>;
  /** If set, the parent shows the success state instead (it receives the name). */
  onSent?: (name: string) => void;
  className?: string;
}) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bot, setBot] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      await submitNetlifyForm(formName, {
        ...data(),
        lead_magnet: leadMagnet,
        name: name.trim(),
        email: email.trim(),
        page: pageUrl(),
        "bot-field": bot,
      });
      if (onSent) onSent(name.trim());
      else setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" aria-live="polite" className={className}>
        <p className="type-h4 m-0">{LEAD_SUCCESS}</p>
        <Button variant="secondary" href={CALENDLY_URL} className="mt-5">
          Book a 20-min call
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={className} aria-busy={state === "sending"}>
      <p className="type-h4 m-0 mb-4">{prompt}</p>
      <Honeypot value={bot} onChange={setBot} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Name (optional)" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          placeholder="you@business.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid" || state === "error") setState("idle");
          }}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={`${id}-consent${state === "invalid" ? ` ${id}-invalid` : ""}`}
        />
      </div>
      <p id={`${id}-consent`} className="type-small m-0 mt-2.5">
        {LEAD_CONSENT}
      </p>
      <div aria-live="polite">
        {state === "invalid" && (
          <p id={`${id}-invalid`} role="alert" className="type-small m-0 mt-2 font-medium text-(--tone-text)">
            Enter a valid email address, like name@business.com
          </p>
        )}
        {state === "error" && <FormError className="mt-2" />}
      </div>
      <Button type="submit" disabled={state === "sending"} className={cx("mt-5", state === "sending" && "cursor-wait")}>
        {state === "sending" ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
