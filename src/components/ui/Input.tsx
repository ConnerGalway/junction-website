import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./cx";

type FieldShellProps = {
  label: ReactNode;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
};

function FieldShell({ label, hideLabel, hint, className, children }: FieldShellProps) {
  return (
    <label className={cx("flex flex-col gap-2", className)}>
      <span className={cx("text-[15px] font-medium", hideLabel && "sr-only")}>{label}</span>
      {children}
      {hint && <span className="type-small">{hint}</span>}
    </label>
  );
}

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "className"> & {
  label: ReactNode;
  hideLabel?: boolean;
  hint?: ReactNode;
  className?: string;
};

/** Labelled text input. Radius 10, Flint border, Canopy focus ring. */
export function Input({ label, hideLabel, hint, className, ...rest }: InputProps) {
  return (
    <FieldShell label={label} hideLabel={hideLabel} hint={hint} className={className}>
      <input className="field" {...rest} />
    </FieldShell>
  );
}

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "className"> & {
  label: ReactNode;
  hideLabel?: boolean;
  className?: string;
};

export function Select({ label, hideLabel, className, children, ...rest }: SelectProps) {
  return (
    <FieldShell label={label} hideLabel={hideLabel} className={className}>
      <select className="field" {...rest}>
        {children}
      </select>
    </FieldShell>
  );
}

type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "className"> & {
  label: ReactNode;
  hideLabel?: boolean;
  className?: string;
};

export function Textarea({ label, hideLabel, className, ...rest }: TextareaProps) {
  return (
    <FieldShell label={label} hideLabel={hideLabel} className={className}>
      <textarea className="field" {...rest} />
    </FieldShell>
  );
}
