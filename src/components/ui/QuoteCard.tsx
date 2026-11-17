import type { ReactNode } from "react";
import { cx } from "./cx";

type QuoteCardProps = {
  quote: ReactNode;
  /** Attribution line, e.g. "Name, Role, Organization". */
  caption?: ReactNode;
  className?: string;
  /** "sm": a smaller quote (20–24px) for the narrow cards beside a large one. */
  size?: "default" | "sm";
};

/** Pull quote on a Sage box. Quote and caption are Forest. No headshots (faces rule). */
export function QuoteCard({ quote, caption, className, size = "default" }: QuoteCardProps) {
  return (
    <figure className={cx("tone-sage rounded-card card-pad m-0", className)}>
      <blockquote className={cx("type-quote m-0", size === "sm" && "text-[clamp(20px,1.8vw,24px)]")}>{quote}</blockquote>
      {caption && (
        <figcaption className="type-small mt-6 not-italic">{caption}</figcaption>
      )}
    </figure>
  );
}
