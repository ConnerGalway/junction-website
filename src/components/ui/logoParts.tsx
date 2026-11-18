import type { CSSProperties } from "react";
import type { Logo } from "@/lib/logos";

/**
 * Optical size factor: wide wordmarks get less height, square badges more,
 * so every logo carries a similar visual weight in the fixed-height slot.
 */
export function opticalFactor(ratio: number) {
  return Math.min(1, Math.max(0.5, 1.25 / Math.sqrt(ratio)));
}

export function LogoItem({ logo }: { logo: Logo }) {
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

export function LogoList({ logos, hidden }: { logos: Logo[]; hidden?: boolean }) {
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

