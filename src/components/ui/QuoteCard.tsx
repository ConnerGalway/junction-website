import type { ReactNode } from "react";
import { cx } from "./cx";

type QuoteCardProps = {
  quote: ReactNode;
  /** Attribution line, e.g. "Name, Role, Organization". */
  caption?: ReactNode;
  /** Optional small round headshot (or a placeholder) shown before the caption. */
  media?: ReactNode;
  className?: string;
};

/** Pull quote on a Sage box. Quote and caption are Forest. */
export function QuoteCard({ quote, caption, media, className }: QuoteCardProps) {
  return (
    <figure className={cx("tone-sage rounded-card card-pad m-0", className)}>
      <blockquote className="type-quote m-0">{quote}</blockquote>
      {(caption || media) && (
        <figcaption className="type-small mt-6 flex items-center gap-3.5 not-italic">
          {media}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
