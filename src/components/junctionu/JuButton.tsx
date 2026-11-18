import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/components";

/**
 * JunctionU buttons.
 * - mint: the page's ONE main action (Mint fill, ground text).
 * - outline: every other button (1.5px Fern border and text).
 * - glass: a secondary hero action (Newsprint 12% fill).
 * - ground: on the Sage email band (ju-ground fill, Newsprint text).
 */
export type JuButtonVariant = "mint" | "outline" | "glass" | "ground";

const variants: Record<JuButtonVariant, string> = {
  mint: "bg-mint text-ju-ground hover:bg-newsprint",
  outline: "border-[1.5px] border-fern text-fern hover:bg-fern/12 hover:text-newsprint",
  glass: "bg-newsprint/12 text-newsprint hover:bg-newsprint/20",
  ground: "bg-ju-ground text-newsprint hover:bg-ju-moss",
};

export function JuButton({
  variant,
  href,
  type,
  className,
  children,
}: {
  variant: JuButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
}) {
  const classes = cx(
    "type-button inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-control border-0 px-6 no-underline transition-colors duration-150",
    variants[variant],
    className
  );
  if (href !== undefined) {
    return /^https?:\/\//.test(href) ? (
      <a href={href} className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
