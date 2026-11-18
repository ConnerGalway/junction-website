import { cx } from "./cx";

/**
 * A sub-brand wordmark: JUNCTION_ + suffix (e.g. JUNCTION_U for JunctionU).
 * Bebas, letter-spaced, with the underscore as a solid bar between JUNCTION
 * and the suffix, sitting on the baseline like the main logo's. Size it with
 * a text-* class; the bar is Fern unless `barClassName` says otherwise.
 */
export function SubBrandWordmark({
  suffix,
  className,
  barClassName = "bg-fern",
}: {
  suffix: string;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span className={cx("inline-block font-wordmark leading-none tracking-[0.1em] whitespace-nowrap", className)}>
      JUNCTION
      {/* An empty inline-block's bottom sits on the baseline. The tracking after
          the N is the gap before the bar. */}
      <span aria-hidden="true" className={cx("inline-block h-[0.11em] w-[0.42em]", barClassName)} />
      <span className="sr-only"> </span>
      <span className="ml-[0.1em]">{suffix}</span>
    </span>
  );
}
