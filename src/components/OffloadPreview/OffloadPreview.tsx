"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "../ui/cx";
import { OffloadVisual } from "./OffloadVisual";

/** Width the thumbnail is drawn at before it's scaled to its slot. */
const THUMB_DESIGN_W = 560;

/**
 * The Offload Program visual (journey track + Session 3 quote generator).
 *
 * hero: at its natural size (the Offload hero's right column).
 * thumbnail: drawn at 560px and scaled to fill its container's width,
 * top-aligned with a faded bottom. Not interactive at all (inert,
 * aria-hidden, no pointer events): the card around it carries the name.
 * Both are illustrations and hidden from assistive tech.
 */
export function OffloadPreview({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "thumbnail";
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    if (variant !== "thumbnail") return;
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / THUMB_DESIGN_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [variant]);

  if (variant === "hero") {
    return (
      <div aria-hidden="true" className={className}>
        <OffloadVisual />
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      inert
      className={cx(
        "fade-out-bottom pointer-events-none relative size-full overflow-hidden bg-newsprint-hover select-none",
        className
      )}
    >
      <div
        className={cx(
          "absolute top-0 left-0 origin-top-left p-6 transition-opacity duration-300",
          !scale && "opacity-0"
        )}
        style={{ width: THUMB_DESIGN_W, transform: `scale(${scale ?? 1})` }}
      >
        <OffloadVisual />
      </div>
    </div>
  );
}
