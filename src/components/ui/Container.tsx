import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";

const widths = {
  wide: "max-w-wide",
  headline: "max-w-headline",
  body: "max-w-body",
} as const;

type ContainerProps<T extends ElementType> = {
  /** wide = 1320px, headline = 1040px, body = 680px (running copy). */
  width?: keyof typeof widths;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({
  width = "wide",
  as,
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cx("mx-auto w-full", widths[width], className)} {...rest} />;
}
