import { SubBrandWordmark, cx } from "@/components";
import { SHOW_JU_WORDMARK } from "@/lib/flags";

/**
 * The eLearningU name in the nav and footer. In order:
 * - SHOW_JU_WORDMARK on: the JUNCTION_U wordmark (JunctionU is on hold).
 * - `logo` given (public/images/elearningu/logo.svg exists; the layout checks
 *   at build time and passes it in): the official logo.
 * - Otherwise "eLearningU" in the page's Oswald, sentence case, Newsprint.
 * TODO: Andrea to provide the official logo (public/images/elearningu/logo.svg).
 * Size it with a text-* class (the logo is 1.1em tall). `fontClassName`
 * swaps the text face: outside eLearningU pages Oswald isn't loaded, so pass a
 * main-site face (e.g. the Marketing strategy thumbnail uses Epilogue).
 */
export function EluWordmark({
  logo,
  className,
  fontClassName = "ju-title",
}: {
  logo?: string | null;
  className?: string;
  fontClassName?: string;
}) {
  if (SHOW_JU_WORDMARK) return <SubBrandWordmark suffix="U" className={className} />;
  if (logo) {
    return (
      <span className={cx("inline-flex items-center leading-none", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- an SVG logo at a fixed height */}
        <img src={logo} alt="eLearningU" className="block h-[1.1em] w-auto" />
      </span>
    );
  }
  return (
    <span className={cx(fontClassName, "inline-block leading-none whitespace-nowrap text-newsprint", className)}>
      eLearningU
    </span>
  );
}
