import type { ReactNode } from "react";
import { cx } from "./cx";

type ChipProps = {
  /** sage = Sage fill, Forest text. outline = 1.5px Forest outline. */
  variant?: "sage" | "outline";
  className?: string;
  children: ReactNode;
};

export function Chip({ variant = "sage", className, children }: ChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-control px-3 py-1 text-[13px] font-medium leading-[1.4] text-forest",
        variant === "sage" ? "bg-sage" : "border-[1.5px] border-forest",
        className
      )}
    >
      {children}
    </span>
  );
}
