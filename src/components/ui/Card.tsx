import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

type CardProps<T extends ElementType> = {
  /**
   * Default: no fill, hairline border, Newsprint shows through.
   * carbon: a dark panel (Carbon fill) that switches its children to the
   * Carbon tone.
   */
  tone?: "default" | "carbon";
  /** Set false to control padding yourself (e.g. tables, media). */
  padded?: boolean;
  /** Makes the whole card a link; the border turns pink on hover. */
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
    "rounded-card",
    tone === "carbon" ? "tone-carbon" : "border border-(--tone-hairline)",
    padded && "card-pad",
    href && "group block hover:border-break",
    className
  );
  if (href) {
    return <Link href={href} className={classes} {...rest} />;
  }
  const Tag: ElementType = as ?? "div";
  return <Tag className={classes} {...rest} />;
}
