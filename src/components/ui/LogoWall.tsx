import type { CSSProperties } from "react";
import type { Logo } from "@/lib/logos";
import { cx } from "./cx";

type LogoWallProps = {
  logos: Logo[];
  /**
   * marquee: one row scrolling continuously (pauses on hover and focus,
   * static under prefers-reduced-motion). row: static, evenly spaced,
   * wrapping. grid: 7 / 4 / 3 columns.
   */
  variant?: "marquee" | "row" | "grid";
  /** Accessible name for the wall (the marquee is a focusable region). */
  label: string;
  className?: string;
};

/**
 * Optical size factor: wide wordmarks get less height, square badges more,
 * so every logo carries a similar visual weight in the fixed-height slot.
 */
function opticalFactor(ratio: number) {
  return Math.min(1, Math.max(0.5, 1.25 / Math.sqrt(ratio)));
}

function LogoItem({ logo }: { logo: Logo }) {
  if (!logo.src || !logo.ratio) {
    return <span className="logo-text">{logo.name}</span>;
  }
  const style = {
    "--logo": `url("${logo.src}")`,
    "--ratio": logo.ratio,
    "--opt": opticalFactor(logo.ratio) * (logo.scale ?? 1),
  } as CSSProperties;
  return <span role="img" aria-label={logo.name} className="logo-mark" style={style} />;
}

function LogoList({ logos, hidden }: { logos: Logo[]; hidden?: boolean }) {
  return (
    <ul className="logo-wall-list" aria-hidden={hidden || undefined}>
      {logos.map((logo) => (
        <li key={logo.name} className="logo-wall-item">
          <LogoItem logo={logo} />
        </li>
      ))}
    </ul>
  );
}

/**
 * One-colour logo wall. Each logo is drawn through a CSS mask in the
 * tone's logo colour (Carbon 60% on Newsprint, Newsprint 70% on dark).
 * Organizations without a logo file render as DM Sans 500 text.
 */
export function LogoWall({ logos, variant = "row", label, className }: LogoWallProps) {
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
