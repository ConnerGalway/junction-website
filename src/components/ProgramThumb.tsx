import { cx } from "./ui/cx";

export type ProgramKey = "accelerator" | "offload" | "training" | "strategy" | "speaking" | "other";

/**
 * A small designed visual for each program, in that program's language (no
 * photos, no faces). Drawn as a 56 × 56 SVG that scales to its box (size it
 * with width/height classes). Decorative: aria-hidden. Used by the contact
 * form's program tiles; the Programs dropdown will reuse it.
 *
 * - accelerator: a sage panel with a mini score ring
 * - offload: Carbon with five journey dots (three gold, two grey)
 * - training: Forest with three overlapping course cards
 * - strategy: Newsprint with five rising green bars
 * - speaking: the stage with a soft spotlight over a tiny slide
 * - other: Sage with a Forest "?" in Fraunces italic
 */
export function ProgramThumb({ program, className }: { program: ProgramKey; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" className={cx("block size-14 shrink-0 overflow-hidden rounded-[8px]", className)}>
      {art[program]}
    </svg>
  );
}

const art: Record<ProgramKey, React.ReactNode> = {
  accelerator: (
    <>
      <rect width="56" height="56" className="fill-sage" />
      <circle cx="28" cy="28" r="14" fill="none" strokeWidth="5" className="stroke-forest/15" />
      <circle
        cx="28"
        cy="28"
        r="14"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${0.72 * 2 * Math.PI * 14} 999`}
        transform="rotate(-90 28 28)"
        className="stroke-canopy"
      />
    </>
  ),
  offload: (
    <>
      <rect width="56" height="56" className="fill-carbon" />
      <line x1="10" y1="28" x2="46" y2="28" strokeWidth="1.5" className="stroke-newsprint/25" />
      {[10, 19, 28, 37, 46].map((x, i) => (
        <circle key={x} cx={x} cy="28" r="3.6" className={i < 3 ? "fill-accent-1" : "fill-newsprint/35"} />
      ))}
    </>
  ),
  training: (
    <>
      <rect width="56" height="56" className="fill-forest" />
      <rect x="9" y="14" width="19" height="25" rx="3" transform="rotate(-8 18 26)" className="fill-newsprint" />
      <rect x="19" y="16" width="19" height="25" rx="3" transform="rotate(2 28 28)" className="fill-carbon" />
      <rect x="29" y="18" width="19" height="25" rx="3" transform="rotate(8 38 30)" className="fill-sage" />
    </>
  ),
  strategy: (
    <>
      <rect x="0.5" y="0.5" width="55" height="55" rx="7.5" strokeWidth="1" className="fill-newsprint stroke-carbon/15" />
      {[14, 20, 17, 27, 34].map((h, i) => (
        <rect key={i} x={10 + i * 8} y={44 - h} width="5" height={h} rx="1" className={i === 4 ? "fill-canopy" : "fill-canopy/45"} />
      ))}
    </>
  ),
  speaking: (
    <>
      <rect width="56" height="56" className="fill-stage" />
      {/* A soft spotlight: stacked faint circles */}
      {[24, 17, 11].map((r) => (
        <circle key={r} cx="28" cy="20" r={r} className="fill-newsprint/[0.07]" />
      ))}
      <rect x="18" y="24" width="20" height="13" rx="1.5" className="fill-newsprint" />
      <rect x="21" y="28" width="12" height="1.6" rx="0.8" className="fill-carbon/40" />
      <rect x="21" y="31.5" width="8" height="1.6" rx="0.8" className="fill-carbon/25" />
    </>
  ),
  other: (
    <>
      <rect width="56" height="56" className="fill-sage" />
      <text x="28" y="39" textAnchor="middle" className="fill-forest font-quote text-[30px] font-black italic">
        ?
      </text>
    </>
  ),
};
