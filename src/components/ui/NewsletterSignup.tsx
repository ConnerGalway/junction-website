"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { cx } from "./cx";

/** The CASL consent line under every Brief signup. */
export const BRIEF_CONSENT = "We'll email you The Brief every Monday. Unsubscribe anytime.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type NewsletterSignupProps = {
  className?: string;
  /** Field label (default "Get The Brief in your inbox"). */
  label?: string;
  /** Keep the label for screen readers only (e.g. when a headline introduces the form). */
  hideLabel?: boolean;
  /** An extra line above the consent line (The Brief page: "Free · award-winning · 500+ articles"). */
  helper?: ReactNode;
  /** Centre the label, row and lines (The Brief page). */
  centered?: boolean;
};

/**
 * One-row email signup for The Brief. Adapts to its tone (Newsprint or
 * Carbon). Posts to /api/brief-subscribe, which adds the subscriber to
 * MailerLite server side (the API key never reaches the browser).
 *
 * States: sending (button disabled, "Sending…"), success ("You're in. Check
 * your inbox."), error (a retry; the form stays filled). A honeypot field
 * catches bots. Messages are announced (aria-live).
 */
export function NewsletterSignup({ className, label = "Get The Brief in your inbox", hideLabel, helper, centered }: NewsletterSignupProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const [email, setEmail] = useState("");
  const [bot, setBot] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/brief-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), "bot-field": bot }),
      });
      if (res.ok) setState("sent");
      else setState(res.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" aria-live="polite" className={cx("flex flex-col gap-1", centered && "text-center", className)}>
        <p className="type-button m-0">You&apos;re in. Check your inbox.</p>
        <p className="type-small m-0">{BRIEF_CONSENT}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-busy={state === "sending"}
      className={cx("flex flex-col gap-3", centered && "items-stretch text-center", className)}
    >
      <label htmlFor={id} className={cx("type-button", hideLabel && "sr-only")}>
        {label}
      </label>
      {/* Honeypot: hidden from people and screen readers; bots fill it. */}
      <p aria-hidden="true" className="sr-only">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} />
        </label>
      </p>
      <div className={cx("flex flex-wrap gap-3", centered && "justify-center")}>
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid" || state === "error") setState("idle");
          }}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={helperId}
          className="field min-w-0 flex-[1_1_220px]"
        />
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : state === "error" ? "Try again" : "Subscribe"}
        </Button>
      </div>
      <div aria-live="polite">
        {state === "invalid" && (
          <p role="alert" className="type-small m-0 font-medium text-(--tone-text)">
            Enter a valid email address, like name@business.com
          </p>
        )}
        {state === "error" && (
          <p role="alert" className="type-small m-0 font-medium text-(--tone-text)">
            That didn&apos;t go through. Please try again in a moment.
          </p>
        )}
      </div>
      <div id={helperId} className="flex flex-col gap-1">
        {helper && <p className="type-small m-0">{helper}</p>}
        <p className="type-small m-0">
          {BRIEF_CONSENT}{" "}
          <Link href="/privacy-policy" className="link">
            Privacy policy
          </Link>
        </p>
      </div>
    </form>
  );
}
