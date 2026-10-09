"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Section, cx } from "@/components";

export type Session = { day: number; label: string; title: string; line: string };

/** Fixed (compact) header height: the sticky scene sits just below it. */
const NAV = 64;
const GAP = 16;
const COLS = 6;
const ROWS = 5;
const DAYS = 30;
const MIN_CELL_H = 72;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * Choreography (progress p = how far the pinned track has scrolled):
 *   0–.15     hold: heading + the five cards in one row, centred in the stage
 *   .15–.45   cards drop to their calendar rows and resize; descriptions fade
 *   .45–.70   cards slide sideways into their columns (two phases, so no card
 *             crosses another)
 *   .55–.95   the 25 empty days fade in
 *   .95–1     hold on the calendar; then the sticky releases
 */
const Y_FROM = 0.15;
const Y_TO = 0.45;
const X_FROM = 0.45;
const X_TO = 0.7;
const LINE_TO = 0.32;
const CELLS_FROM = 0.55;
const CELLS_TO = 0.95;

type Geometry = {
  rowW: number;
  rowH: number;
  rowY: number;
  cellW: number;
  cellH: number;
  /** Card background scale at the calendar (non-uniform: it's a plain box). */
  sx: number;
  sy: number;
  /** Card content scale at the calendar (uniform; fits day, label, title). */
  sc: number;
};

function Heading({ heading, intro }: { heading: string; intro: string }) {
  return (
    <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
      <h2 className="type-h2 m-0">{heading}</h2>
      <p className="type-body m-0 max-w-[46ch]">{intro}</p>
    </div>
  );
}

function cardColours(last: boolean) {
  return {
    bg: last ? "bg-accent-1" : "bg-newsprint",
    day: last ? "text-carbon" : "text-accent-1-on-light",
    label: last ? "text-carbon/75" : "text-flint",
    line: last ? "text-carbon" : "text-ink-soft",
  };
}

/** Day, small caps label and title (and, unless `compact`, the line). */
function CardText({
  session,
  last,
  compact,
  lineRef,
}: {
  session: Session;
  last: boolean;
  compact?: boolean;
  lineRef?: (el: HTMLSpanElement | null) => void;
}) {
  const c = cardColours(last);
  return (
    <>
      <span className={cx("block font-wordmark text-[36px] leading-none", c.day)}>Day {session.day}</span>
      <span className={cx("mt-3 block text-[12px] font-medium tracking-[0.12em] uppercase", c.label)}>
        {session.label}
      </span>
      <span className="type-h4 mt-1 block text-carbon">{session.title}</span>
      {!compact && (
        <span ref={lineRef} className={cx("mt-1.5 block text-[15px] leading-snug", c.line)}>
          {session.line}
        </span>
      )}
    </>
  );
}

/**
 * "Thirty days, five steps."
 *
 * 768px+ with a viewport at least 640px tall (and motion allowed): a pinned
 * scene. The section's track is about 150vh taller than the viewport; a
 * sticky container (below the nav) holds the heading and a fixed-height
 * stage. As the track scrolls, the five session cards move and resize from
 * one row into a 6 × 5 calendar that fits the stage, then the sticky
 * releases. Scrolling up reverses it. Only transform and opacity animate;
 * both layouts are measured off-screen on mount, after fonts load and on
 * resize (debounced), never during the animation.
 *
 * Shorter viewports and reduced motion: the final calendar, static. Under
 * 768px: a vertical list.
 */
export function ThirtyDays({ sessions, heading, intro }: { sessions: Session[]; heading: string; intro: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowMeasureRef = useRef<HTMLOListElement>(null);
  const compactMeasureRef = useRef<HTMLOListElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geo = useRef<Geometry | null>(null);
  const [ready, setReady] = useState(false);
  const lastIndex = sessions.length - 1;
  const sessionDays = new Set(sessions.map((s) => s.day));

  const cellPos = useCallback((day: number, g: Geometry) => {
    const d = day - 1;
    return { x: (d % COLS) * (g.cellW + GAP), y: Math.floor(d / COLS) * (g.cellH + GAP) };
  }, []);

  const apply = useCallback(() => {
    const g = geo.current;
    const track = trackRef.current;
    if (!g || !track) return;
    const rect = track.getBoundingClientRect();
    const travel = track.offsetHeight - (window.innerHeight - NAV);
    const p = travel > 0 ? clamp01((NAV - rect.top) / travel) : 0;

    const py = ease(seg(p, Y_FROM, Y_TO));
    const px = ease(seg(p, X_FROM, X_TO));
    const lineOpacity = String(1 - seg(p, Y_FROM, LINE_TO));
    sessions.forEach((session, i) => {
      const target = cellPos(session.day, g);
      const x = lerp(i * (g.rowW + GAP), target.x, px);
      const y = lerp(g.rowY, target.y, py);
      const bg = bgRefs.current[i];
      const card = cardRefs.current[i];
      const line = lineRefs.current[i];
      if (bg) bg.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${lerp(1, g.sx, py)}, ${lerp(1, g.sy, py)})`;
      if (card) card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${lerp(1, g.sc, py)})`;
      if (line) line.style.opacity = lineOpacity;
    });
    const cellOpacity = String(ease(seg(p, CELLS_FROM, CELLS_TO)));
    cellRefs.current.forEach((cell) => {
      if (cell) cell.style.opacity = cellOpacity;
    });
  }, [sessions, cellPos]);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const rowList = rowMeasureRef.current;
    const compactList = compactMeasureRef.current;
    if (!stage || !rowList || !compactList) return;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (W === 0 || H === 0) return; // not the pinned layout at this size
    const n = sessions.length;
    const rowW = (W - GAP * (n - 1)) / n;
    const rowH = Math.max(...Array.from(rowList.children).map((c) => (c as HTMLElement).offsetHeight));
    const compactH = Math.max(...Array.from(compactList.children).map((c) => (c as HTMLElement).offsetHeight));
    const cellW = (W - GAP * (COLS - 1)) / COLS;
    const cellH = Math.max(MIN_CELL_H, (H - GAP * (ROWS - 1)) / ROWS);
    const g: Geometry = {
      rowW,
      rowH,
      rowY: Math.max(0, (H - rowH) / 2),
      cellW,
      cellH,
      sx: cellW / rowW,
      sy: cellH / rowH,
      sc: Math.min(cellW / rowW, cellH / compactH),
    };
    geo.current = g;
    // Static sizes and positions (never animated).
    sessions.forEach((_, i) => {
      const bg = bgRefs.current[i];
      const card = cardRefs.current[i];
      if (bg) {
        bg.style.width = `${rowW}px`;
        bg.style.height = `${rowH}px`;
      }
      if (card) card.style.width = `${rowW}px`;
    });
    cellRefs.current.forEach((cell, d) => {
      if (!cell) return;
      const pos = cellPos(d + 1, g);
      cell.style.width = `${cellW}px`;
      cell.style.height = `${cellH}px`;
      cell.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    });
    setReady(true);
    apply();
  }, [sessions, apply, cellPos]);

  useEffect(() => {
    let frame = 0;
    let pending = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    // One rAF-driven update per frame.
    const onScroll = () => {
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(() => {
        pending = false;
        apply();
      });
    };
    // Re-measure on resize, debounced (the stage size only depends on the viewport).
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    });
    if (stageRef.current) observer.observe(stageRef.current);
    document.fonts?.ready.then(() => measure());
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [apply, measure]);

  return (
    <Section tone="carbon">
      <Container>
        {/* Pinned scene (768px+, 640px+ tall, motion allowed) */}
        <div ref={trackRef} className="td-pinned relative h-[calc(100svh-64px+150vh)]">
          <div className="sticky top-16 flex h-[calc(100svh-64px)] flex-col pt-8 pb-8">
            <Heading heading={heading} intro={intro} />
            <div ref={stageRef} className="relative mt-8 min-h-0 flex-1">
              {/* Off-screen measuring copies: full cards in a row, and the
                  compact (calendar) content at row width. */}
              <ol
                ref={rowMeasureRef}
                aria-hidden="true"
                className="pointer-events-none invisible absolute inset-x-0 top-0 m-0 flex list-none p-0"
                style={{ gap: GAP }}
              >
                {sessions.map((session, i) => (
                  <li key={session.day} className="min-w-0 flex-1 rounded-card p-5">
                    <CardText session={session} last={i === lastIndex} />
                  </li>
                ))}
              </ol>
              <ol
                ref={compactMeasureRef}
                aria-hidden="true"
                className="pointer-events-none invisible absolute inset-x-0 top-0 m-0 flex list-none p-0"
                style={{ gap: GAP }}
              >
                {sessions.map((session, i) => (
                  <li key={session.day} className="min-w-0 flex-1 p-5">
                    <CardText session={session} last={i === lastIndex} compact />
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
                      "absolute top-0 left-0 rounded-card border border-hairline-dark bg-newsprint/4 px-4 py-3",
                      !ready && "hidden"
                    )}
                    style={{ opacity: 0 }}
                  >
                    <span className="font-wordmark text-[24px] leading-none text-newsprint/25">{d + 1}</span>
                  </div>
                )
              )}

              {/* Card backgrounds (plain boxes, so they can scale non-uniformly) */}
              {sessions.map((session, i) => (
                <div
                  key={session.day}
                  ref={(el) => {
                    bgRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className={cx(
                    "absolute top-0 left-0 origin-top-left rounded-card will-change-transform",
                    cardColours(i === lastIndex).bg,
                    !ready && "hidden"
                  )}
                />
              ))}

              {/* Card content (uniform scale; the line fades out) */}
              <ol
                className={cx(
                  "m-0 list-none p-0",
                  !ready && "absolute inset-0 flex items-center"
                )}
                style={ready ? undefined : { gap: GAP }}
              >
                {sessions.map((session, i) => (
                  <li
                    key={session.day}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={cx(
                      "p-5",
                      ready
                        ? "absolute top-0 left-0 origin-top-left will-change-transform"
                        : cx("min-w-0 flex-1 rounded-card", cardColours(i === lastIndex).bg)
                    )}
                  >
                    <CardText
                      session={session}
                      last={i === lastIndex}
                      lineRef={(el) => {
                        lineRefs.current[i] = el;
                      }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Static calendar (768px+ but short viewport, or reduced motion) */}
        <div className="td-static">
          <Heading heading={heading} intro={intro} />
          <ol className="m-0 mt-10 grid list-none grid-cols-6 gap-4 p-0">
            {Array.from({ length: DAYS }, (_, d) => {
              const i = sessions.findIndex((s) => s.day === d + 1);
              if (i === -1) {
                return (
                  <li
                    key={d}
                    aria-hidden="true"
                    className="min-h-[72px] rounded-card border border-hairline-dark bg-newsprint/4 px-4 py-3"
                  >
                    <span className="font-wordmark text-[24px] leading-none text-newsprint/25">{d + 1}</span>
                  </li>
                );
              }
              return (
                <li key={d} className={cx("min-h-[72px] rounded-card p-4", cardColours(i === lastIndex).bg)}>
                  <CardText session={sessions[i]} last={i === lastIndex} compact />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Under 768px: a vertical list */}
        <div className="md:hidden">
          <Heading heading={heading} intro={intro} />
          <ol className="m-0 mt-10 flex list-none flex-col gap-3 p-0">
            {sessions.map((session, i) => (
              <li key={session.day} className={cx("rounded-card p-5", cardColours(i === lastIndex).bg)}>
                <CardText session={session} last={i === lastIndex} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
