"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Section, cx } from "@/components";

export type Session = { day: number; label: string; title: string; line: string };

/** Fixed (compact) header height: the sticky scene sits just below it. */
const NAV = 64;
/** Column and row gap of the calendar, and the gap between row cards. */
const GAP = 8;
const COLS = 6;
const ROWS = 5;
const DAYS = 30;
const MIN_CELL_H = 64;
/** Session cards sit 4px inside their date cell, top and bottom. */
const CELL_INSET = 4;
/** Pinned travel: 70% of the viewport height. */
const TRAVEL = 0.7;
/** Smoothing: each frame the shown progress moves this share of the way to the scroll progress. */
const SMOOTHING = 0.14;
/** Below this difference the shown progress snaps to the scroll progress. */
const SNAP = 0.0005;
/**
 * The shown progress never trails the scroll progress by more than the
 * closing hold (1 − .72), so even after a fast fling the calendar is
 * complete when the sticky releases.
 */
const MAX_LAG = 0.28;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * Choreography (progress p: 0 when the section's top reaches the middle of
 * the viewport, 1 after the pinned travel):
 *   0–.08     hold on the row
 *   .08–.72   cards move and resize into their date cells (eased in-out).
 *             Position runs in two parts so no card crosses another: down
 *             to their calendar rows (.08–.40), then across into their
 *             columns (.40–.72). Size changes over the whole span.
 *   .08–.32   the row label and description fade out
 *   .42–.70   the "Day N" label fades in
 *   .27–.68   the empty day cells fade in
 *   .72–1     hold on the calendar; then the sticky releases
 */
const MOVE = [0.08, 0.72] as const;
const DOWN = [0.08, 0.4] as const;
const ACROSS = [0.4, 0.72] as const;
const ROW_TEXT_OUT = [0.08, 0.32] as const;
const DAY_IN = [0.42, 0.7] as const;
const CELLS_IN = [0.27, 0.68] as const;

type Geometry = {
  rowW: number;
  rowH: number;
  cellW: number;
  cellH: number;
};

/** Small caps label: DM Sans 500, 12px, +0.12em; copper (Carbon on gold). */
function labelClass(last: boolean) {
  return cx("block text-[12px] leading-[1.3] font-medium tracking-[0.12em] uppercase", last ? "text-carbon" : "text-accent-2");
}

const titleClass = "mt-1.5 block font-display text-[18px] leading-[1.2] font-semibold tracking-[-0.015em] text-carbon";

function cardBg(last: boolean) {
  return last ? "bg-accent-1" : "bg-newsprint";
}

function Heading({ heading, intro }: { heading: string; intro: string }) {
  return (
    <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
      <h2 className="type-h2 m-0">{heading}</h2>
      <p className="type-body m-0 max-w-[46ch]">{intro}</p>
    </div>
  );
}

/** Row-state card content: label, title, description (no day number). */
function RowText({ session, last }: { session: Session; last: boolean }) {
  return (
    <>
      <span className={labelClass(last)}>{session.label}</span>
      <span className={titleClass}>{session.title}</span>
      <span className={cx("mt-1.5 block text-[14px] leading-snug", last ? "text-carbon" : "text-ink-soft")}>
        {session.line}
      </span>
    </>
  );
}

/** Calendar-state card content: "Day N" in the label style, then the title. */
function DayText({ session, last }: { session: Session; last: boolean }) {
  return (
    <>
      <span className={labelClass(last)}>Day {session.day}</span>
      <span className={titleClass}>{session.title}</span>
    </>
  );
}

/** An empty day: a top hairline and the day number, no box. */
function EmptyDay({ day }: { day: number }) {
  return (
    <span className="block pt-1.5 font-wordmark text-[18px] leading-none text-newsprint/32">{day}</span>
  );
}

/**
 * "Thirty days, five steps."
 *
 * 768px+ wide and 640px+ tall (motion allowed): a pinned scene. The
 * section's track is the sticky stage height plus a travel of 70% of the
 * viewport; the sticky container (below the nav) holds the heading and the
 * stage. The five session cards sit in one row under the heading, then
 * move and resize into a 6 × 5 calendar that fits the stage, and the empty
 * days fade in. Reversible. Layouts are measured off-screen on mount, after
 * fonts load and on resize (debounced), never mid-animation. The shown
 * progress eases toward the scroll progress (× 0.14 per frame) in one rAF
 * loop that stops when it arrives.
 *
 * Reduced motion, or 768px+ but under 640px tall: the final calendar,
 * static. Under 768px: a vertical list of row-state cards.
 */
export function ThirtyDays({ sessions, heading, intro }: { sessions: Session[]; heading: string; intro: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rowTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dayTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geo = useRef<Geometry | null>(null);
  const [ready, setReady] = useState(false);
  const lastIndex = sessions.length - 1;
  const sessionDays = new Set(sessions.map((s) => s.day));

  const cellPos = useCallback((day: number, g: Geometry) => {
    const d = day - 1;
    return { x: (d % COLS) * (g.cellW + GAP), y: Math.floor(d / COLS) * (g.cellH + GAP) };
  }, []);

  /** Scroll-derived (target) progress. */
  const targetProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;
    const vh = window.innerHeight;
    const start = 0.5 * vh;
    const distance = start - NAV + TRAVEL * vh;
    return clamp01((start - section.getBoundingClientRect().top) / distance);
  }, []);

  /** Draws every visual value from a progress value (the smoothed "current"). */
  const render = useCallback((p: number) => {
    const g = geo.current;
    if (!g) return;

    const size = easeInOut(seg(p, ...MOVE));
    const down = easeInOut(seg(p, ...DOWN));
    const across = easeInOut(seg(p, ...ACROSS));
    const rowTextOpacity = String(1 - seg(p, ...ROW_TEXT_OUT));
    const dayOpacity = String(seg(p, ...DAY_IN));
    sessions.forEach((session, i) => {
      const card = cardRefs.current[i];
      if (card) {
        const target = cellPos(session.day, g);
        const x = lerp(i * (g.rowW + GAP), target.x, across);
        const y = lerp(0, target.y + CELL_INSET, down);
        // Whole pixels keep the text crisp at rest.
        card.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        card.style.width = `${lerp(g.rowW, g.cellW, size)}px`;
        card.style.height = `${lerp(g.rowH, g.cellH - 2 * CELL_INSET, size)}px`;
      }
      const rowText = rowTextRefs.current[i];
      const dayText = dayTextRefs.current[i];
      if (rowText) rowText.style.opacity = rowTextOpacity;
      if (dayText) dayText.style.opacity = dayOpacity;
    });
    const cellOpacity = String(seg(p, ...CELLS_IN));
    cellRefs.current.forEach((cell) => {
      if (cell) cell.style.opacity = cellOpacity;
    });
  }, [sessions, cellPos]);

  // The shown ("current") progress eases toward the scroll ("target")
  // progress, one step per animation frame; the loop stops once it
  // arrives (no idle loop).
  const current = useRef<number | null>(null);
  const frame = useRef(0);
  const running = useRef(false);

  const kick = useCallback(() => {
    if (running.current || !geo.current) return;
    running.current = true;
    const step = () => {
      const target = targetProgress();
      const now = Math.min(target + MAX_LAG, Math.max(target - MAX_LAG, current.current ?? target));
      const diff = target - now;
      const next = Math.abs(diff) < SNAP ? target : now + diff * SMOOTHING;
      current.current = next;
      render(next);
      if (next !== target) frame.current = requestAnimationFrame(step);
      else running.current = false;
    };
    frame.current = requestAnimationFrame(step);
  }, [targetProgress, render]);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const list = measureRef.current;
    if (!stage || !list) return;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (W === 0 || H === 0) return; // not the pinned layout at this size
    const n = sessions.length;
    const rowW = (W - GAP * (n - 1)) / n;
    // Row cards: 128–150px with the viewport height, never less than the
    // tallest card's content (measured off-screen at the row width).
    const needed = Math.max(...Array.from(list.children).map((c) => (c as HTMLElement).offsetHeight));
    const rowH = Math.max(needed, Math.min(150, Math.max(128, window.innerHeight * 0.17)));
    const cellW = (W - GAP * (COLS - 1)) / COLS;
    const cellH = Math.max(MIN_CELL_H, (H - GAP * (ROWS - 1)) / ROWS);
    const g: Geometry = { rowW, rowH, cellW, cellH };
    geo.current = g;
    cellRefs.current.forEach((cell, d) => {
      if (!cell) return;
      const pos = cellPos(d + 1, g);
      cell.style.width = `${cellW}px`;
      cell.style.height = `${cellH}px`;
      cell.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    });
    setReady(true);
    // First layout: start at the scroll position (no catch-up animation).
    if (current.current === null) current.current = targetProgress();
    render(current.current);
    kick();
  }, [sessions, cellPos, targetProgress, render, kick]);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => kick();
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    });
    if (stageRef.current) observer.observe(stageRef.current);
    document.fonts?.ready.then(() => measure());
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      running.current = false;
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [kick, measure]);

  const headingGap = "mt-[clamp(28px,5.5svh,48px)]";

  return (
    <Section tone="carbon" flush="top">
      <Container>
        {/* Pinned scene: 768px+ wide, 640px+ tall, motion allowed */}
        <div ref={sectionRef} className="td-pinned relative h-[calc(170svh-64px)]">
          <div className="sticky top-16 flex h-[calc(100svh-64px)] flex-col pt-[clamp(32px,6svh,64px)] pb-[clamp(16px,3svh,32px)]">
            <Heading heading={heading} intro={intro} />
            <div ref={stageRef} className={cx("relative min-h-0 flex-1", headingGap)}>
              {/* Off-screen copy at the row width, to measure the row cards */}
              <ol
                ref={measureRef}
                aria-hidden="true"
                className="pointer-events-none invisible absolute inset-x-0 top-0 m-0 flex list-none items-start p-0"
                style={{ gap: GAP }}
              >
                {sessions.map((session, i) => (
                  <li key={session.day} className="min-w-0 flex-1 p-4">
                    <RowText session={session} last={i === lastIndex} />
                  </li>
                ))}
              </ol>

              {/* Empty days: a top hairline and the number */}
              {Array.from({ length: DAYS }, (_, d) =>
                sessionDays.has(d + 1) ? null : (
                  <div
                    key={d}
                    ref={(el) => {
                      cellRefs.current[d] = el;
                    }}
                    aria-hidden="true"
                    className={cx("absolute top-0 left-0 border-t border-newsprint/14", !ready && "hidden")}
                    style={{ opacity: 0 }}
                  >
                    <EmptyDay day={d + 1} />
                  </div>
                )
              )}

              {/* Session cards: a plain row until measured, then positioned */}
              <ol className={cx("m-0 list-none p-0", !ready && "flex items-start")} style={ready ? undefined : { gap: GAP }}>
                {sessions.map((session, i) => {
                  const last = i === lastIndex;
                  return (
                    <li
                      key={session.day}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      className={cx(
                        "overflow-hidden rounded-card",
                        cardBg(last),
                        ready ? "absolute top-0 left-0 will-change-transform" : "relative min-h-[128px] min-w-0 flex-1"
                      )}
                    >
                      <div
                        ref={(el) => {
                          rowTextRefs.current[i] = el;
                        }}
                        className="p-4"
                      >
                        <RowText session={session} last={last} />
                      </div>
                      {/* "Day N" in the label style, in the label's position */}
                      <div
                        ref={(el) => {
                          dayTextRefs.current[i] = el;
                        }}
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 p-4"
                        style={{ opacity: 0 }}
                      >
                        <DayText session={session} last={last} />
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Static calendar: reduced motion, or 768px+ but under 640px tall */}
        <div className="td-static pt-section">
          <Heading heading={heading} intro={intro} />
          <ol className={cx("m-0 grid list-none grid-cols-6 p-0", headingGap)} style={{ gap: GAP }}>
            {Array.from({ length: DAYS }, (_, d) => {
              const i = sessions.findIndex((s) => s.day === d + 1);
              if (i === -1) {
                return (
                  <li key={d} aria-hidden="true" className="min-h-[64px] border-t border-newsprint/14">
                    <EmptyDay day={d + 1} />
                  </li>
                );
              }
              const last = i === lastIndex;
              return (
                <li key={d} className="min-h-[64px] py-1">
                  <div className={cx("h-full rounded-card p-4", cardBg(last))}>
                    <DayText session={sessions[i]} last={last} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Under 768px: a vertical list of row-state cards */}
        <div className="pt-section md:hidden">
          <Heading heading={heading} intro={intro} />
          <ol className={cx("m-0 flex list-none flex-col p-0", headingGap)} style={{ gap: GAP }}>
            {sessions.map((session, i) => (
              <li key={session.day} className={cx("rounded-card p-4", cardBg(i === lastIndex))}>
                <RowText session={session} last={i === lastIndex} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
