import { cx } from "@/components";

/**
 * The JunctionU video play button: a 44px Newsprint circle (92%) with a
 * Carbon ▶, 16px from the bottom-left corner of a video card, followed by
 * the length in Bebas (Newsprint 80%) when known, or another short label.
 * Put it inside a `group` card: on hover the circle scales to 1.08 (the card
 * brightens its image with `ju-video-image`). Decorative; the card is the
 * click target and carries the label.
 */
export function PlayBadge({ length, label, className }: { length?: string; label?: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cx("absolute bottom-4 left-4 flex items-center gap-3", className)}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-newsprint/92 transition-transform duration-200 ease-out group-hover:scale-[1.08] group-focus-visible:scale-[1.08] motion-reduce:transition-none">
        <svg width="14" height="16" viewBox="0 0 18 20" className="ml-0.5 fill-carbon">
          <path d="M0 0 18 10 0 20Z" />
        </svg>
      </span>
      {length && <span className="font-wordmark text-[22px] leading-none text-newsprint/80">{length}</span>}
      {label && <span className="type-small text-newsprint-muted">{label}</span>}
    </span>
  );
}
