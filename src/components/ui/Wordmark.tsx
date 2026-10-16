import { cx } from "./cx";

/** JUNCTION_ wordmark: the only place Bebas Neue is used. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cx("type-wordmark text-[34px]", className)}>
      JUNCTION<span className="text-canopy">_</span>
    </span>
  );
}
