import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./cx";

export type Tone = "newsprint" | "carbon" | "forest";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Ground colour. Carbon and Forest are both dark grounds; don't let two of the same touch. */
  tone?: Tone;
  /** default = clamp(96px, 11.5vw, 168px); tight = clamp(72px, 8vw, 120px). */
  spacing?: "default" | "tight";
  /** Drop top or bottom padding where a section continues the one above. */
  flush?: "top" | "bottom";
};

/**
 * A full-width band with the side gutter and vertical rhythm. The tone sets
 * the CSS variables (text, muted, link, focus ring, eyebrow, stat, buttons)
 * that every child component reads.
 */
export function Section({
  tone = "newsprint",
  spacing = "default",
  flush,
  className,
  children,
  ...rest
}: SectionProps) {
  const y = spacing === "tight" ? "section-tight" : "section";
  return (
    <section
      className={cx(
        `tone-${tone}`,
        // The body is already Newsprint: Newsprint bands stay see-through so
        // lowest-layer decoration (the hero wordmark) isn't covered.
        tone === "newsprint" && "bg-transparent",
        "px-gutter",
        flush !== "top" && (y === "section" ? "pt-section" : "pt-section-tight"),
        flush !== "bottom" && (y === "section" ? "pb-section" : "pb-section-tight"),
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
