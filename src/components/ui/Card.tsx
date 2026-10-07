import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

type CardProps<T extends ElementType> = {
  /**
   * default: same colour as its ground, soft shadow + 3px Forest top rule.
   * carbon / forest: a dark panel that switches its children to that tone.
   * Neighbouring dark panels alternate (one Forest, one Carbon).
   */
  tone?: "default" | "carbon" | "forest";
  /** Set false to control padding yourself (e.g. tables, media). */
  padded?: boolean;
  /** Makes the whole card a link; its top rule turns pink on hover/focus. */
  href?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "href">;

export function Card<T extends ElementType = "div">({
  tone = "default",
  padded = true,
  href,
  as,
  className,
  ...rest
}: CardProps<T>) {
  const classes = cx(
    tone === "default" ? "card" : `tone-${tone} rounded-card`,
    padded && "card-pad",
    href && "card-link group block",
    className
  );
  if (href) {
    return <Link href={href} className={classes} {...rest} />;
  }
  const Tag: ElementType = as ?? "div";
  return <Tag className={classes} {...rest} />;
}
