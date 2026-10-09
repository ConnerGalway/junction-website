"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/components";

export type Session = { day: number; label: string; title: string; line: string };

const GAP = 16;
const COLS = 6;
const DAYS = 30;

/** Progress runs 0 → 1 as the section's top moves from 80% to 30% of the viewport (eased). */
const START = 0.8;
const END = 0.3;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Geometry = {
  rowW: number;
  rowH: number;
  calH: number;
  scale: number;
  cellW: number;
  cellH: number;
  /** Row slot x per session. */
  rowX: number[];
  /** Calendar cell x/y per day (index = day - 1). */
  cellX: number[];
  cellY: number[];
};

function SessionCard({ session, last, className }: { session: Session; last: boolean; className?: string }) {
  return (
    <div
      className={cx(
        "flex h-full flex-col rounded-card p-5",
        last ? "bg-accent-1 text-carbon" : "bg-newsprint text-carbon",
        className
      )}
    >
      <span className={cx("font-wordmark text-[36px] leading-none", last ? "text-carbon" : "text-accent-1-on-light")}>
        Day {session.day}
      </span>
      <span
        className={cx(
          "mt-3 text-[12px] font-medium tracking-[0.12em] uppercase",
          last ? "text-carbon/75" : "text-flint"
        )}
      >
        {session.label}
      </span>
      <span className="type-h4 mt-1">{session.title}</span>
      <span className={cx("mt-1.5 text-[15px] leading-snug", last ? "text-carbon" : "text-ink-soft")}>
        {session.line}
      </span>
    </div>
  );
}

/**
 * "Thirty days, five steps": the five session cards start in one row and
 * collapse into a 30-day calendar as the section scrolls into view
 * (768px+). The wrapper's height follows the progress (the page makes
 * room as it grows); the cards move and scale with transforms only; the
 * 25 other days fade in. Scrolling back reverses it exactly.
 *
 * Both layouts are computed from one hidden, static row of cards (never
 * from the animating ones) on mount, after fonts load and on resize. The
 * calendar cell is the row slot scaled down uniformly, so cards keep their
 * proportions. Reduced motion shows the final calendar. Below 768px: a
 * plain vertical list.
 */
export function ThirtyDays({ sessions }: { sessions: Session[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geo = useRef<Geometry | null>(null);
  const [ready, setReady] = useState(false);
  const sessionDays = new Set(sessions.map((s) => s.day));
  const lastIndex = sessions.length - 1;

  const apply = useCallback(() => {
    const g = geo.current;
    const wrap = wrapRef.current;
    if (!g || !wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Linear progress r; the moves are eased per axis.
    let r = 1;
    if (!reduce) {
      const section = wrap.closest("section") ?? wrap;
      const top = section.getBoundingClientRect().top;
      const vh = window.innerHeight;
      r = Math.min(1, Math.max(0, (START * vh - top) / ((START - END) * vh)));
    }
    // Two phases, so no card crosses another: first every card drops to its
    // calendar row and shrinks (r 0 → .65), then slides sideways into its
    // column (r .35 → 1). Cards leaving the first row have cleared it
    // before the Day 6 card slides right along it.
    const py = easeInOut(Math.min(1, r / 0.65));
    const px = easeInOut(Math.min(1, Math.max(0, (r - 0.35) / 0.65)));
    const s = lerp(1, g.scale, py);
    let bottom = 0;
    sessions.forEach((session, i) => {
      const el = cardRefs.current[i];
      const x = lerp(g.rowX[i], g.cellX[session.day - 1], px);
      const y = lerp(0, g.cellY[session.day - 1], py);
      bottom = Math.max(bottom, y + g.rowH * s);
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    });
    // The wrapper follows the lowest card, so it only ever grows with r.
    wrap.style.height = `${Math.max(bottom, lerp(g.rowH, g.calH, py))}px`;
    // Empty days fade in through the second half of the move.
    const cellOpacity = String(Math.min(1, Math.max(0, (r - 0.35) / 0.65)));
    cellRefs.current.forEach((cell) => {
      if (cell) cell.style.opacity = cellOpacity;
    });
  }, [sessions]);

  const measure = useCallback(() => {
    const row = measureRef.current;
    if (!row) return;
    const W = row.clientWidth;
    if (W === 0) return; // hidden (mobile)
    const n = sessions.length;
    const rowW = (W - GAP * (n - 1)) / n;
    const rowH = Math.max(...Array.from(row.children).map((c) => (c as HTMLElement).offsetHeight));
    const cellW = (W - GAP * (COLS - 1)) / COLS;
    const scale = cellW / rowW;
    const cellH = rowH * scale;
    const rows = Math.ceil(DAYS / COLS);
    const cellX: number[] = [];
    const cellY: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      cellX.push((d % COLS) * (cellW + GAP));
      cellY.push(Math.floor(d / COLS) * (cellH + GAP));
    }
    geo.current = {
      rowW,
      rowH,
      calH: rows * cellH + (rows - 1) * GAP,
      scale,
      cellW,
      cellH,
      rowX: sessions.map((_, i) => i * (rowW + GAP)),
      cellX,
      cellY,
    };
    // Static sizes (never animated).
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.style.width = `${rowW}px`;
      el.style.height = `${rowH}px`;
    });
    cellRefs.current.forEach((cell, d) => {
      if (!cell) return;
      cell.style.width = `${cellW}px`;
      cell.style.height = `${cellH}px`;
      cell.style.transform = `translate3d(${cellX[d]}px, ${cellY[d]}px, 0)`;
    });
    setReady(true);
    apply();
  }, [sessions, apply]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    if (measureRef.current) observer.observe(measureRef.current);
    document.fonts?.ready.then(() => measure());
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [apply, measure]);

  return (
    <>
      {/* 768px+: row → calendar */}
      <div ref={wrapRef} className="relative hidden md:block">
        {/* Hidden static row: the source of both layouts' measurements */}
        <ol
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-x-0 top-0 m-0 flex list-none p-0"
          style={{ gap: GAP }}
        >
          {sessions.map((session, i) => (
            <li key={session.day} className="min-w-0 flex-1">
              <SessionCard session={session} last={i === lastIndex} />
            </li>
          ))}
        </ol>

        {/* Empty days */}
        {Array.from({ length: DAYS }, (_, d) =>
          sessionDays.has(d + 1) ? null : (
            <div
              key={d}
              ref={(el) => {
                cellRefs.current[d] = el;
              }}
              aria-hidden="true"
              className={cx(
                "absolute top-0 left-0 rounded-card border border-hairline-dark bg-newsprint/4 p-4",
                !ready && "hidden"
              )}
              style={{ opacity: 0 }}
            >
              <span className="font-wordmark text-[28px] leading-none text-newsprint/25">{d + 1}</span>
            </div>
          )
        )}

        {/* Session cards: a static row until measured, then positioned */}
        <ol className={cx("m-0 list-none p-0", !ready && "flex")} style={ready ? undefined : { gap: GAP }}>
          {sessions.map((session, i) => (
            <li
              key={session.day}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={cx(ready ? "absolute top-0 left-0 origin-top-left will-change-transform" : "min-w-0 flex-1")}
            >
              <SessionCard session={session} last={i === lastIndex} />
            </li>
          ))}
        </ol>
      </div>

      {/* Below 768px: a plain list */}
      <ol className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
        {sessions.map((session, i) => (
          <li key={session.day}>
            <SessionCard session={session} last={i === lastIndex} />
          </li>
        ))}
      </ol>
    </>
  );
}
