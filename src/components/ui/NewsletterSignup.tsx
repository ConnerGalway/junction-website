"use client";

import { useId } from "react";
import { Button } from "./Button";
import { cx } from "./cx";

type NewsletterSignupProps = {
  className?: string;
};

/**
 * One-row email signup for The Brief. Adapts to its tone (Newsprint or
 * Carbon). Submission is not wired up yet.
 */
export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const id = useId();
  const helperId = `${id}-helper`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire The Brief signup to the newsletter provider.
  }

  return (
    <form onSubmit={handleSubmit} className={cx("flex flex-col gap-3", className)}>
      <label htmlFor={id} className="type-button">
        Get The Brief in your inbox
      </label>
      <div className="flex flex-wrap gap-3">
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
        [ Frequency ] · unsubscribe anytime
      </p>
    </form>
  );
}
