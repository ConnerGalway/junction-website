import type { ReactNode } from "react";
import { cx } from "./cx";

type ChipProps = {
  /**
   * sage = Sage fill, Forest text. outline = 1.5px Forest outline.
   * fern-outline = 1.5px Fern outline with Fern text, for dark grounds.
   */
  variant?: "sage" | "outline" | "fern-outline";
  className?: string;
  children: ReactNode;
};

export function Chip({ variant = "sage", className, children }: ChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-control px-3 py-1 text-[13px] font-medium leading-[1.4]",
        variant === "sage" && "bg-sage text-forest",
        variant === "outline" && "border-[1.5px] border-forest text-forest",
        variant === "fern-outline" && "border-[1.5px] border-fern text-fern",
        className
      )}
    >
      {children}
    </span>
  );
}
