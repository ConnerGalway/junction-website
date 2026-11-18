import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

type EyebrowProps<T extends ElementType> = {
  /** highlight = break dot + pink text (break-on-light / break-on-dark by tone). */
  variant?: "default" | "highlight";
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Eyebrow<T extends ElementType = "p">({
  variant = "default",
  as,
  className,
  children,
  ...rest
}: EyebrowProps<T>) {
  const Tag: ElementType = as ?? "p";
  return (
    <Tag
      className={cx(
        "type-eyebrow",
        variant === "highlight" && "inline-flex items-center gap-2 text-(--tone-highlight)",
        className
      )}
      {...rest}
    >
      {variant === "highlight" && <Dot />}
      {children}
    </Tag>
  );
}

/** Small break-pink dot used by highlight eyebrows, badges and the nav. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("inline-block size-2 shrink-0 rounded-full bg-break", className)}
    />
  );
}
