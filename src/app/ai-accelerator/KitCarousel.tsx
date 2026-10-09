"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { ChevronButton, cx } from "@/components";

export type KitItem = {
  num: string;
  title: string;
  description: string;
  /** The illustration in the box on top (aria-hidden). */
  artifact: ReactNode;
};

/** Mouse-drag distance that counts as one step. */
const DRAG_STEP_PX = 40;

/**
 * "What you leave with": a horizontal scroll-snap track of cards. The card
 * in the spotlight (nearest the centre) is larger and at full opacity with
 * a Canopy line above its label; the others sit at 50% (an approved
 * exception: they're previews, and the live region announces the
 * spotlight). Drag, swipe, trackpad scroll and the arrow keys move one
 * card; clicking a side card brings it to the spotlight. No looping.
 */
export function KitCarousel({
  items,
  label,
  initial = 0,
}: {
  items: KitItem[];
  label: string;
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const liveId = useId();
  const count = items.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  function scrollTo(index: number, smooth = true) {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: smooth && !reduce ? "smooth" : "instant",
    });
  }

  function goTo(index: number) {
    const next = Math.max(0, Math.min(count - 1, index));
    setActive(next);
    scrollTo(next);
  }

  // Start with the initial card centred, before the first paint.
  useLayoutEffect(() => {
    scrollTo(initial, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The spotlight follows native scrolling (touch, trackpad, scroll snap).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const t = trackRef.current;
        if (!t) return;
        const centre = t.scrollLeft + t.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  }

  // Mouse drag (touch and trackpads scroll natively).
  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    drag.current = { x: event.clientX, moved: false };
  }
  function onPointerMove(event: PointerEvent) {
    const d = drag.current;
    if (!d || d.moved) return;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) >= DRAG_STEP_PX) {
      d.moved = true;
      suppressClick.current = true;
      goTo(active + (dx < 0 ? 1 : -1));
    }
  }
  function endDrag() {
    drag.current = null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-card focus-visible:outline-offset-8"
    >
      <p id={liveId} aria-live="polite" className="sr-only">
        {`${pad(active + 1)} of ${pad(count)}: ${items[active].title}`}
      </p>

      <div
        ref={trackRef}
        className="kit-track relative flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overscroll-x-contain py-2 select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-active={isActive || undefined}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
              className={cx("kit-card w-[min(320px,78vw)] shrink-0 snap-center", !isActive && "cursor-pointer")}
            >
              <div aria-hidden="true" className="kit-artifact rounded-card bg-newsprint-hover p-5">
                {item.artifact}
              </div>
              <div className="kit-label mt-5 border-t-2 pt-4">
                <span className="type-numeral block text-[40px]">{item.num}</span>
                <h3 className="type-h4 mt-2 mb-1.5">{item.title}</h3>
                <p className="type-body m-0">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <ChevronButton
          direction="prev"
          aria-label="Previous item"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        />
        <p className="m-0 font-wordmark text-[28px] leading-none tracking-[0.02em]" aria-hidden="true">
          <span className="text-carbon">{pad(active + 1)}</span>
          <span className="text-carbon/45"> / {pad(count)}</span>
        </p>
        <ChevronButton
          direction="next"
          aria-label="Next item"
          disabled={active === count - 1}
          onClick={() => goTo(active + 1)}
        />
      </div>
    </div>
  );
}
