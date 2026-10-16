import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./cx";

type ChevronButtonProps = {
  direction: "prev" | "next";
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "type">;

/**
 * Carousel previous / next control: a thin 20px chevron (1.6px rounded
 * stroke) with no box, in the tone's text colour at 70%. Hover and focus
 * turn it the tone's pink; disabled (at the ends of a non-looping carousel)
 * it dims to 40%. Pass an aria-label.
 */
export function ChevronButton({ direction, className, ...rest }: ChevronButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-control border-0 bg-transparent p-0 text-(--tone-text)/70 transition-colors duration-150 ease-out hover:text-(--tone-link-hover) focus-visible:text-(--tone-link-hover)",
        "disabled:cursor-default disabled:opacity-40 disabled:hover:text-(--tone-text)/70",
        className
      )}
      {...rest}
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d={direction === "prev" ? "M12.5 4 6.5 10l6 6" : "M7.5 4l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
