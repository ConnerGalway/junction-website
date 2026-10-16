import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { cx } from "./cx";

/**
 * Logo lockup: JUNCTION_ wordmark, a 1px divider and the two-line tagline.
 * Colours follow the tone (Carbon wordmark + Flint tagline on Newsprint,
 * Newsprint + newsprint-muted on dark). Links to the home page.
 */
export function LogoLockup({
  className,
  collapseOnSmall,
}: {
  className?: string;
  /** Hide the divider and tagline on very narrow screens (header). */
  collapseOnSmall?: boolean;
}) {
  const small = collapseOnSmall && "max-[419px]:hidden";
  return (
    <Link
      href="/"
      aria-label="Junction: Strategy & Capacity Building, home"
      className={cx("link-plain inline-flex shrink-0 items-center gap-3.5", className)}
    >
      <Wordmark className="text-(--tone-text)" />
      <span aria-hidden="true" className={cx("h-[34px] w-px bg-(--tone-text)/20", small)} />
      <span
        aria-hidden="true"
        className={cx(
          "text-[14px] leading-[1.25] font-normal tracking-[0.04em] whitespace-nowrap text-(--tone-muted)",
          small
        )}
      >
        Strategy &amp;
        <br />
        Capacity Building
      </span>
    </Link>
  );
}
