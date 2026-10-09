"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent, PointerEvent, ReactNode, WheelEvent } from "react";
import { Card, Placeholder, cx } from "@/components";

export type OrbitProgram = {
  title: string;
  /** One-line audience description ("For …"). */
  description: string;
  /** Price / duration line, set in Bebas. */
  price: string;
  href: string;
  /** Label for the image/mockup placeholder. */
  media: string;
};

/** Minimum time between two steps, so every input moves exactly one stop. */
const STEP_LOCK_MS = 520;
/** Horizontal wheel/trackpad distance that counts as one step. */
const WHEEL_STEP_PX = 40;
/** Touch or drag distance that counts as one step. */
const DRAG_STEP_PX = 50;

/**
 * Where a card sits relative to the active one: 0 = front, -1 = previous,
 * 1 = next, anything else = hidden behind the front card. Works for any
 * number of programs.
 */
function offsetOf(index: number, active: number, count: number) {
  let d = (index - active) % count;
  if (d < 0) d += count;
  if (d > count / 2) d -= count;
  return d;
}

type Slot = "front" | "prev" | "next" | "hidden";

function slotOf(d: number): Slot {
  if (d === 0) return "front";
  if (d === -1) return "prev";
  if (d === 1) return "next";
  return "hidden";
}

/** Transforms per slot. The front card has none at all, so its text stays crisp. */
const slotTransform: Record<Slot, string> = {
  front: "none",
  prev: "translateX(-68%) translateZ(-160px) rotateY(14deg)",
  next: "translateX(68%) translateZ(-160px) rotateY(-14deg)",
  hidden: "translateZ(-420px) scale(0.7)",
};

export function ProgramOrbit({
  programs,
  heading,
  headingId,
}: {
  programs: OrbitProgram[];
  /** The section heading, shown above the stage. */
  heading: ReactNode;
  headingId: string;
}) {
  const count = programs.length;
  const [active, setActive] = useState(0);
  const lockUntil = useRef(0);
  const wheelAccum = useRef(0);
  const wheelReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const liveId = useId();

  /** Move to an index, at most one change per STEP_LOCK_MS. */
  function moveTo(next: (current: number) => number) {
    const now = performance.now();
    if (now < lockUntil.current) return;
    lockUntil.current = now + STEP_LOCK_MS;
    setActive((a) => (next(a) + count) % count);
  }
  const step = (dir: 1 | -1) => moveTo((a) => a + dir);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  // Horizontal wheel / trackpad: accumulate deltaX, step once past the
  // threshold; mostly-vertical scrolls are ignored.
  function onWheel(event: WheelEvent) {
    if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) return;
    wheelAccum.current += event.deltaX;
    if (wheelReset.current) clearTimeout(wheelReset.current);
    wheelReset.current = setTimeout(() => (wheelAccum.current = 0), 180);
    if (Math.abs(wheelAccum.current) >= WHEEL_STEP_PX) {
      step(wheelAccum.current > 0 ? 1 : -1);
      wheelAccum.current = 0;
    }
  }

  // Touch / drag: one step once the pointer has travelled DRAG_STEP_PX.
  function onPointerDown(event: PointerEvent) {
    drag.current = { x: event.clientX, moved: false };
  }
  function onPointerMove(event: PointerEvent) {
    const d = drag.current;
    if (!d || d.moved) return;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) >= DRAG_STEP_PX) {
      d.moved = true;
      suppressClick.current = true;
      step(dx < 0 ? 1 : -1);
    }
  }
  function endDrag() {
    drag.current = null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-card focus-visible:outline-offset-8"
    >
      <div className="mb-10">{heading}</div>

      <p id={liveId} aria-live="polite" className="sr-only">
        {`${programs[active].title}, ${active + 1} of ${count}`}
      </p>

      {/* Stage */}
      <div
        className="orbit-stage relative h-[480px] touch-pan-y select-none md:h-[520px]"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(event) => {
          // A drag that stepped the carousel shouldn't also click a card.
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {programs.map((program, i) => {
          const slot = slotOf(offsetOf(i, active, count));
          const isFront = slot === "front";
          return (
            <Card
              key={program.href}
              tone="newsprint"
              padded={false}
              href={program.href}
              tabIndex={isFront ? undefined : -1}
              aria-hidden={isFront ? undefined : true}
              draggable={false}
              onClick={(event: MouseEvent) => {
                // Side cards only come to the centre; only the front card navigates.
                if (!isFront) {
                  event.preventDefault();
                  if (slot === "prev") step(-1);
                  else if (slot === "next") step(1);
                }
              }}
              style={{ transform: slotTransform[slot] } as CSSProperties}
              data-slot={slot}
              className={cx(
                "orbit-card absolute top-0 left-1/2 -ml-[min(220px,39vw)] flex h-[460px] w-[min(440px,78vw)] flex-col overflow-hidden md:h-[500px]",
                !isFront && "max-md:invisible"
              )}
            >
              <div className="p-3 pb-0">
                <Placeholder className="aspect-[16/10] w-full">[ {program.media} ]</Placeholder>
              </div>
              <div className="card-pad flex flex-1 flex-col gap-3">
                <h3 className="type-h3 m-0">{program.title}</h3>
                <p className="type-body m-0">{program.description}</p>
                <p className="type-price m-0 mt-auto">{program.price}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stops, with the previous / next arrows at either end */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <OrbitArrow direction="prev" onClick={() => step(-1)} />
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3" role="group" aria-label="Programs">
          {programs.map((program, i) => {
            const isActive = i === active;
            return (
              <button
                key={program.href}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => moveTo(() => i)}
                className={cx(
                  "cursor-pointer border-0 bg-transparent px-0 py-1.5 text-[16px] font-medium underline-offset-[10px] hover:text-break-on-dark",
                  isActive
                    ? "text-newsprint underline decoration-fern decoration-2"
                    : "text-price-on-dark"
                )}
              >
                {program.title}
              </button>
            );
          })}
        </div>
        <OrbitArrow direction="next" onClick={() => step(1)} />
      </div>
    </div>
  );
}

/** Previous / next arrow: a thin chevron with no box. Pink on hover and focus. */
function OrbitArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous program" : "Next program"}
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-control border-0 bg-transparent p-0 text-newsprint/70 transition-colors duration-150 ease-out hover:text-break-on-dark focus-visible:text-break-on-dark"
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
