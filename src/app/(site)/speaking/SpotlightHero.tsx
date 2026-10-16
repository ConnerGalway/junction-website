"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** How far the light moves toward the cursor each frame. */
const LERP = 0.12;
/** Distance (px) over which each dimmed word brightens as the light nears its centre. */
const WORD_FALLOFF = 240;
/** Resting opacity of the dimmed words. */
const DIM = 0.35;
/** Distance (px) over which the lit cutout fades in as the light nears Conner's face. */
const FACE_FALLOFF = 520;
/** Conner's face, as a fraction of the cutout's box. */
const FACE = { x: 0.53, y: 0.32 };
/** Radius of the light pool (px); matches .spot-pool's size. */
const POOL_R = 300;

/**
 * The Speaking hero's light: one round, diffused pool (.spot-pool) centred on
 * a point that follows the cursor with a smooth lag (rAF only while moving).
 * The point starts just right of the dimmed words ([data-spot-target]); when
 * the cursor leaves it stays where it was, and glides back on re-entry.
 *
 * On the same tick it lights:
 * - each [data-spot-word]: 35% → 100% as the light nears that word's centre;
 * - the cutout ([data-spot-figure]): the brightened copy ([data-spot-lit]) is
 *   masked to the pool (--mx / --my in the image's own coordinates) and fades
 *   in as the light nears Conner's face.
 *
 * Touch / no fine pointer / reduced motion: a static pool at the rest point,
 * the base cutout only, the words at 35%.
 */
export function SpotlightHero({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pool = poolRef.current;
    if (!root || !pool) return;
    const target = root.querySelector<HTMLElement>("[data-spot-target]");
    const words = [...root.querySelectorAll<HTMLElement>("[data-spot-word]")];
    const figure = root.querySelector<HTMLElement>("[data-spot-figure]");
    const lit = root.querySelector<HTMLElement>("[data-spot-lit]");
    const live = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");

    const pos = { x: 0, y: 0 };
    const goal = { x: 0, y: 0 };
    let frame = 0;
    let running = false;
    // Until the cursor first moves over the hero, the light sits at the rest point.
    let moved = false;

    function restPoint() {
      const r = root!.getBoundingClientRect();
      if (!target) return { x: r.width * 0.55, y: r.height * 0.35 };
      const t = target.getBoundingClientRect();
      return { x: t.right - r.left + 120, y: t.top - r.top + t.height / 2 };
    }

    function draw() {
      pool!.style.transform = `translate3d(${pos.x - POOL_R}px, ${pos.y - POOL_R}px, 0)`;
      if (!live.matches) {
        for (const w of words) w.style.opacity = String(DIM);
        if (lit) lit.style.opacity = "0";
        return;
      }
      const r = root!.getBoundingClientRect();
      const lx = r.left + pos.x;
      const ly = r.top + pos.y;
      for (const w of words) {
        const b = w.getBoundingClientRect();
        const d = Math.hypot(lx - (b.left + b.width / 2), ly - (b.top + b.height / 2));
        w.style.opacity = String(DIM + (1 - DIM) * Math.max(0, 1 - d / WORD_FALLOFF));
      }
      if (figure && lit) {
        const f = figure.getBoundingClientRect();
        figure.style.setProperty("--mx", `${lx - f.left}px`);
        figure.style.setProperty("--my", `${ly - f.top}px`);
        const d = Math.hypot(lx - (f.left + f.width * FACE.x), ly - (f.top + f.height * FACE.y));
        lit.style.opacity = String(Math.max(0, 1 - d / FACE_FALLOFF));
      }
    }

    function step() {
      pos.x += (goal.x - pos.x) * LERP;
      pos.y += (goal.y - pos.y) * LERP;
      draw();
      if (Math.abs(goal.x - pos.x) > 0.5 || Math.abs(goal.y - pos.y) > 0.5) {
        frame = requestAnimationFrame(step);
      } else {
        running = false;
      }
    }

    function kick() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(step);
    }

    function snapToRest() {
      const p = restPoint();
      goal.x = pos.x = p.x;
      goal.y = pos.y = p.y;
      draw();
    }

    // Layout changed: re-place the light if it's still resting, else just redraw.
    const relayout = () => (moved && live.matches ? draw() : snapToRest());

    function onMove(event: PointerEvent) {
      if (!live.matches || event.pointerType === "touch") return;
      const r = root!.getBoundingClientRect();
      goal.x = event.clientX - r.left;
      goal.y = event.clientY - r.top;
      moved = true;
      kick();
    }
    const onModeChange = () => {
      moved = false;
      snapToRest();
    };

    snapToRest();
    document.fonts?.ready.then(relayout);
    root.addEventListener("pointermove", onMove);
    window.addEventListener("resize", relayout);
    live.addEventListener("change", onModeChange);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", relayout);
      live.removeEventListener("change", onModeChange);
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {/* The light pool (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={poolRef} className="spot-pool absolute top-0 left-0 size-[600px] will-change-transform" />
      </div>
      {children}
    </div>
  );
}
