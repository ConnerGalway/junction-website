import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./cx";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href);
}

/**
 * Primary or secondary button, rendered as a link when given an href.
 * Colours come from the surrounding tone (see globals.css).
 * External links open in a new tab.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cx("btn", `btn-${variant}`, className);

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _c;
    void _ch;
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, type = "button", ...rest } = props;
  void _v;
  void _c;
  void _ch;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
