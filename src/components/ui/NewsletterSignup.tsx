"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { cx } from "./cx";

type NewsletterSignupProps = {
  className?: string;
  /** Field label (default "Get The Brief in your inbox"). */
  label?: string;
  /** Keep the label for screen readers only (e.g. when a headline introduces the form). */
  hideLabel?: boolean;
  /** Line under the field (default "[ Frequency ] · unsubscribe anytime"). */
  helper?: ReactNode;
  /** Centre the label, row and helper (The Brief page). */
  centered?: boolean;
};

/**
 * One-row email signup for The Brief. Adapts to its tone (Newsprint or
 * Carbon). Submission is not wired up yet.
 */
export function NewsletterSignup({
  className,
  label = "Get The Brief in your inbox",
  hideLabel,
  helper = "[ Frequency ] · unsubscribe anytime",
  centered,
}: NewsletterSignupProps) {
  const id = useId();
  const helperId = `${id}-helper`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire The Brief signup to the newsletter provider.
  }

  return (
    <form onSubmit={handleSubmit} className={cx("flex flex-col gap-3", centered && "items-stretch text-center", className)}>
      <label htmlFor={id} className={cx("type-button", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className={cx("flex flex-wrap gap-3", centered && "justify-center")}>
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          aria-describedby={helperId}
          className="field min-w-0 flex-[1_1_220px]"
        />
        <Button type="submit">Subscribe</Button>
      </div>
      <p id={helperId} className="type-small m-0">
        {helper}
      </p>
    </form>
  );
}
