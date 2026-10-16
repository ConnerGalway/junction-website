import type { ReactNode } from "react";
import { Dot } from "./Eyebrow";
import { cx } from "./cx";

type BadgeProps = {
  /** outline = 2px break border, pink text, break dot. filled = pink fill. */
  variant?: "outline" | "filled";
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "outline", className, children }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-control px-3 py-1 text-[13px] font-medium leading-[1.4]",
        variant === "outline"
          ? "border-2 border-break text-(--tone-highlight)"
          : "bg-break-on-light text-newsprint",
        className
      )}
    >
      {variant === "outline" && <Dot />}
      {children}
    </span>
  );
}
