"use client";

import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/components";

/**
 * Contact form fields in the editorial style (contact page only; every other
 * form uses the boxed Input / Select / Textarea): a copper small caps label
 * above the control, the value in Epilogue 600 ~20px, no box, a 1.5px Carbon
 * bottom rule that turns Canopy and 2px on focus (.contact-field).
 */
function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx("min-w-0", className)}>
      <label htmlFor={id} className="type-eyebrow block">
        {label}
      </label>
      {children}
    </div>
  );
}

type Common = { label: string; className?: string };

export function EdInput({ label, className, ...rest }: Common & Omit<ComponentPropsWithoutRef<"input">, "className">) {
  const id = useId();
  return (
    <Field id={id} label={label} className={className}>
      <input id={id} className="contact-field" {...rest} />
    </Field>
  );
}

export function EdTextarea({ label, className, ...rest }: Common & Omit<ComponentPropsWithoutRef<"textarea">, "className">) {
  const id = useId();
  return (
    <Field id={id} label={label} className={className}>
      <textarea id={id} rows={3} className="contact-field resize-y" {...rest} />
    </Field>
  );
}

export function EdSelect({ label, className, children, ...rest }: Common & Omit<ComponentPropsWithoutRef<"select">, "className">) {
  const id = useId();
  return (
    <Field id={id} label={label} className={className}>
      <span className="relative block">
        <select id={id} className="contact-field cursor-pointer appearance-none pr-8" {...rest}>
          {children}
        </select>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-carbon"
        >
          <path d="M4.5 7.5 10 13l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Field>
  );
}
