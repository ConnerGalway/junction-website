import type { CSSProperties, ReactNode } from "react";
import { cx } from "./cx";

type StatProps = {
  value: ReactNode;
  label?: ReactNode;
  className?: string;
  /** Extra classes for the number. Size it with `maxSize`, not a text-* class. */
  valueClassName?: string;
  /** Largest size for the number (default: the type-stat clamp). */
  maxSize?: string;
};

/**
 * Bebas Neue advance widths (em), measured in the browser. Characters not
 * listed are 0.4em (digits, most capitals); unknown ones get a safe 0.45em.
 */
const GLYPH_EM: Record<string, number> = {
  " ": 0.16, "%": 0.589, "&": 0.417, "#": 0.412, "*": 0.422, "-": 0.27, "–": 0.3, "—": 0.5,
  ",": 0.188, ".": 0.188, ":": 0.188, "·": 0.188, "'": 0.188, "!": 0.21, "?": 0.363, "/": 0.389,
  "(": 0.276, ")": 0.276, "→": 0.954, "@": 0.696, B: 0.404, C: 0.383, D: 0.406, E: 0.363,
  F: 0.344, G: 0.391, H: 0.42, I: 0.192, J: 0.265, K: 0.414, L: 0.344, M: 0.538, N: 0.427,
  P: 0.386, R: 0.403, S: 0.372, T: 0.364, U: 0.402, V: 0.382, W: 0.557, X: 0.406, Y: 0.394,
  Z: 0.362,
};
const KNOWN_400 = /[0-9$+<=>^~×−AOQ]/;

/** Width of a string set in Bebas Neue, in em (Bebas has caps only). */
function bebasWidthEm(text: string) {
  let em = 0;
  for (const ch of text.toUpperCase()) {
    em += GLYPH_EM[ch] ?? (KNOWN_400.test(ch) ? 0.4 : 0.45);
  }
  return em;
}

/**
 * Big number in Bebas Neue, gold for the current ground (accent-1-on-light
 * on Newsprint, accent-1 on Carbon and Forest), with a body-size label below.
 *
 * The number fits its container: as large as `maxSize` allows but never
 * wider than the space it's in (a container query on the number's box,
 * with the text's width worked out from Bebas glyph widths). A hidden,
 * zero-height copy keeps the Stat's natural width in shrink-to-fit spots
 * (a flex item), where the container alone would collapse.
 * Non-text values (React nodes) just use `maxSize`.
 */
export function Stat({ value, label, className, valueClassName, maxSize }: StatProps) {
  const text = typeof value === "string" || typeof value === "number" ? String(value) : null;
  const style = {
    ...(maxSize ? { "--stat-max": maxSize } : null),
    // 2% headroom for rounding.
    ...(text ? { "--stat-em": (bebasWidthEm(text) * 1.02).toFixed(3) } : null),
  } as CSSProperties;
  return (
    <div className={cx("stat", className)} style={style}>
      {/* Zero-height sizer: gives the Stat its natural width in shrink-to-fit
          layouts (the container below doesn't size to its content). */}
      {text && <div aria-hidden="true" className="h-0 w-[calc(var(--stat-em)*var(--stat-max))] max-w-full" />}
      <div className={cx(text && "stat-box")}>
        <div className={cx("type-stat whitespace-nowrap", text && "stat-fit", valueClassName)}>{value}</div>
      </div>
      {label && <div className="type-body mt-2">{label}</div>}
    </div>
  );
}
