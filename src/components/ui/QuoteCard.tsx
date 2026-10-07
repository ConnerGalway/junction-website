import type { ReactNode } from "react";
import { cx } from "./cx";

type QuoteCardProps = {
  quote: ReactNode;
  /** Attribution line, e.g. "Name, Role, Organization". */
  caption?: ReactNode;
  className?: string;
};

/** Pull quote on a Sage box. Quote and caption are Forest. */
export function QuoteCard({ quote, caption, className }: QuoteCardProps) {
  return (
    <figure className={cx("tone-sage rounded-card card-pad m-0", className)}>
      <blockquote className="type-quote m-0">{quote}</blockquote>
      {caption && (
        <figcaption className="type-small mt-6 not-italic">{caption}</figcaption>
      )}
    </figure>
  );
}
