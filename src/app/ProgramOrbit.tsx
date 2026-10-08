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

/**
 * Where a card sits relative to the active one: 0 = front, ±1 = beside it,
 * further away = behind the front card. Works for any number of cards.
 */
function offsetOf(index: number, active: number, count: number) {
  let d = (index - active) % count;
  if (d < 0) d += count;
  if (d > count / 2) d -= count;
  return d;
}

function placement(d: number, count: number) {
  const abs = Math.abs(d);
  if (abs === 0) return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, z: 30 };
  if (abs === 1) return { x: d * 82, y: 0, scale: 0.78, rotate: -d * 30, opacity: 0.9, z: 20 };
  // Behind the front card: the one directly opposite sits centred, others
  // slightly to their side. Anything further than two stops is hidden.
  const opposite = count % 2 === 0 && abs === count / 2;
  return {
    x: opposite ? 0 : Math.sign(d) * 30,
    y: -32,
    scale: 0.6,
    rotate: 0,
    opacity: abs === 2 ? 0.3 : 0,
    z: 10 - abs,
  };
}

export function ProgramOrbit({
  programs,
  heading,
  headingId,
}: {
  programs: OrbitProgram[];
  /** The section heading, shown top left with the arrows top right. */
  heading: ReactNode;
  headingId: string;
}) {
  const count = programs.length;
  const [active, setActive] = useState(0);
  const wheelLock = useRef(0);
  const swipeStart = useRef<number | null>(null);
  const liveId = useId();

  const go = (step: number) => setActive((a) => (a + step + count) % count);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  // Horizontal trackpad / wheel: one stop per gesture.
  function onWheel(event: WheelEvent) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12) return;
    const now = performance.now();
    if (now < wheelLock.current) return;
    wheelLock.current = now + 650;
    go(event.deltaX > 0 ? 1 : -1);
  }

  // Touch swipe: one stop per swipe.
  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  }
  function onPointerUp(event: PointerEvent) {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
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
      <div className="mb-10 flex items-end justify-between gap-6">
        {heading}
        <div className="flex shrink-0 gap-3">
          <OrbitArrow direction="prev" onClick={() => go(-1)} />
          <OrbitArrow direction="next" onClick={() => go(1)} />
        </div>
      </div>
      <p id={liveId} aria-live="polite" className="sr-only">
        {`${programs[active].title}, ${active + 1} of ${count}`}
      </p>

      {/* Stage */}
      <div
        className="relative h-[480px] touch-pan-y [perspective:1600px] md:h-[520px]"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        {programs.map((program, i) => {
          const d = offsetOf(i, active, count);
          const p = placement(d, count);
          const isActive = d === 0;
          const hidden = p.opacity === 0;
          const style = {
            transform: `translateX(-50%) translate(${p.x}%, ${p.y}%) scale(${p.scale}) rotateY(${p.rotate}deg)`,
            opacity: p.opacity,
            zIndex: p.z,
          } as CSSProperties;
          return (
            <Card
              key={program.href}
              tone="newsprint"
              padded={false}
              href={program.href}
              tabIndex={hidden ? -1 : undefined}
              aria-hidden={hidden || undefined}
              aria-label={isActive ? undefined : `${program.title}: show this program`}
              onFocus={() => !isActive && setActive(i)}
              onClick={(event: MouseEvent) => {
                // A side card first comes to the front; the front card navigates.
                if (!isActive) {
                  event.preventDefault();
                  setActive(i);
                }
              }}
              style={style}
              className={cx(
                "absolute top-0 left-1/2 flex h-[460px] w-[min(400px,86vw)] flex-col overflow-hidden transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none md:h-[500px] md:w-[420px]",
                d === -1 && "fade-out-left",
                d === 1 && "fade-out-right",
                !isActive && "max-md:invisible max-md:opacity-0"
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

      {/* Stops */}
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3" role="group" aria-label="Programs">
        {programs.map((program, i) => {
          const isActive = i === active;
          return (
            <button
              key={program.href}
              type="button"
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(i)}
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
    </div>
  );
}

/** Previous / next arrow button. */
function OrbitArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous program" : "Next program"}
      className="btn btn-secondary size-12 min-h-0 p-0"
    >
      <span aria-hidden="true">{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}
