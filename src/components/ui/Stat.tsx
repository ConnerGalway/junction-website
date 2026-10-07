import type { ReactNode } from "react";
import { cx } from "./cx";

type StatProps = {
  /**
   * everyday = accent-2 number on Newsprint with a 1.5px accent-2 top rule.
   * feature  = accent-1 number, for Carbon grounds.
   */
  variant?: "everyday" | "feature";
  value: ReactNode;
  label?: ReactNode;
  className?: string;
  /** Override the number size (e.g. a smaller stat inside a card). */
  valueClassName?: string;
};

export function Stat({ variant = "everyday", value, label, className, valueClassName }: StatProps) {
  return (
    <div
      className={cx(
        variant === "everyday" && "border-t-[1.5px] border-accent-2 pt-4",
        className
      )}
    >
      <div
        className={cx(
          "type-stat",
          variant === "everyday" ? "text-accent-2" : "text-accent-1",
          valueClassName
        )}
      >
        {value}
      </div>
      {label && <div className="type-small mt-3">{label}</div>}
    </div>
  );
}
