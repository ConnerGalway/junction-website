import type { Logo } from "@/lib/logos";
import { cx } from "./cx";
import { LogoItem, LogoList } from "./logoParts";
import { LogoWallAuto } from "./LogoWallAuto";

type LogoWallProps = {
  logos: Logo[];
  /**
   * marquee: one row scrolling continuously (pauses on hover and focus,
   * static under prefers-reduced-motion). row: static, evenly spaced,
   * wrapping. grid: 7 / 4 / 3 columns. auto: one static row while the
   * logos fit the width, the marquee only when they overflow.
   */
  variant?: "marquee" | "row" | "grid" | "auto";
  /** auto only: classes added while it runs as a marquee (e.g. edge fades). */
  marqueeClassName?: string;
  /** Accessible name for the wall (the marquee is a focusable region). */
  label: string;
  className?: string;
};

/**
 * One-colour logo wall. Each logo is drawn through a CSS mask in the
 * tone's logo colour (Carbon 60% on Newsprint, Newsprint 70% on dark).
 * Organizations without a logo file render as DM Sans 500 text.
 */
export function LogoWall({ logos, variant = "row", label, className, marqueeClassName }: LogoWallProps) {
  if (variant === "auto") {
    return <LogoWallAuto logos={logos} label={label} className={className} marqueeClassName={marqueeClassName} />;
  }
  if (variant === "marquee") {
    return (
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cx("logo-wall logo-wall-marquee", className)}
      >
        <div className="logo-marquee-track">
          <LogoList logos={logos} />
          <LogoList logos={logos} hidden />
        </div>
      </div>
    );
  }
  return (
    <div className={cx("logo-wall", `logo-wall-${variant}`, className)}>
      <ul className="logo-wall-list" aria-label={label}>
        {logos.map((logo) => (
          <li key={logo.name} className="logo-wall-item">
            <LogoItem logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
