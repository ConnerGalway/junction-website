import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isExternal } from "./Button";
import { cx } from "./cx";

type TextLinkProps = {
  href: string;
  /** Append a trailing arrow (→) if the copy doesn't already have one. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * Underlined text link. Colour comes from the tone; text and underline turn
 * pink together on hover (break-on-light on Newsprint, break-on-dark on dark).
 */
export function TextLink({ href, arrow, className, children, ...rest }: TextLinkProps) {
  const classes = cx("link type-button", className);
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true"> →</span>}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
