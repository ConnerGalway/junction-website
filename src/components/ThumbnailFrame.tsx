"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "./ui/cx";

/**
 * A static program-card thumbnail: its children are drawn at a fixed design
 * size (default 640 × 400, the 16:10 slot) and scaled to fill the slot's
 * width, top-aligned. Not interactive at all (inert, aria-hidden, no pointer
 * events): the card around it carries the name and the link.
 */
export function ThumbnailFrame({
  children,
  width = 640,
  height = 400,
  className,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
  /** Classes for the slot, e.g. its ground colour. */
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      inert
      className={cx("pointer-events-none relative size-full overflow-hidden select-none", className)}
    >
      <div
        className={cx(
          "absolute top-0 left-0 origin-top-left overflow-hidden transition-opacity duration-300",
          !scale && "opacity-0"
        )}
        style={{ width, height, transform: `scale(${scale ?? 1})` }}
      >
        {children}
      </div>
    </div>
  );
}
