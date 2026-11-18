import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./cx";

/**
 * Sage callout: sage-25 box (radius 14) with Forest text and links, for a
 * short highlighted statement inside a Newsprint section.
 */
export function Callout({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("tone-callout rounded-card card-pad", className)} {...rest} />;
}
