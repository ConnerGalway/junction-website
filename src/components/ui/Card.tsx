import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

type CardProps<T extends ElementType> = {
  /**
   * default: same colour as its ground, soft shadow + 3px Forest top rule.
   * carbon / forest: a dark panel that switches its children to that tone.
   * Neighbouring dark panels alternate (one Forest, one Carbon).
   * newsprint: a light panel on a dark ground (no shadow, no top rule).
   */
  tone?: "default" | "carbon" | "forest" | "newsprint";
  /** true = card padding (28px, 24px under 640px); "sm" = compact 20px for
   *  small cards; false = control padding yourself (e.g. tables, media). */
  padded?: boolean | "sm";
  /** Makes the whole card a link: 2px pink outline on hover/focus. Put no
   *  buttons or other links inside a linked card. */
  href?: string;
  /** For linked cards, e.g. target="_blank" with rel="noopener noreferrer". */
  target?: string;
  rel?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "href" | "target" | "rel">;

export function Card<T extends ElementType = "div">({
  tone = "default",
  padded = true,
  href,
  target,
  rel,
  as,
  className,
  ...rest
}: CardProps<T>) {
  const classes = cx(
    tone === "default" ? "card" : `tone-${tone} rounded-card`,
    padded === "sm" ? "card-pad-sm" : padded && "card-pad",
    href && "card-link group block",
    className
  );
  if (href) {
    if (/^https?:\/\//.test(href)) {
      return <a href={href} target={target} rel={rel} className={classes} {...rest} />;
    }
    return <Link href={href} target={target} rel={rel} className={classes} {...rest} />;
  }
  const Tag: ElementType = as ?? "div";
  return <Tag className={classes} {...rest} />;
}
