import type { ReactNode } from "react";
import { cx } from "./cx";

type StatProps = {
  value: ReactNode;
  label?: ReactNode;
  className?: string;
  /** Override the number size (e.g. a smaller stat inside a card). */
  valueClassName?: string;
};

/**
 * Big number in Bebas Neue, gold for the current ground (accent-1-on-light
 * on Newsprint, accent-1 on Carbon and Forest), with a body-size label below.
 */
export function Stat({ value, label, className, valueClassName }: StatProps) {
  return (
    <div className={className}>
      <div className={cx("type-stat", valueClassName)}>{value}</div>
      {label && <div className="type-body mt-2">{label}</div>}
    </div>
  );
}
