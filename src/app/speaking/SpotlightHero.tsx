"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** How far the beam moves toward the cursor each frame. */
const LERP = 0.12;
/** Distance (px) over which "with a plan." brightens as the beam nears. */
const FALLOFF = 380;
/** Resting opacity of the dimmed words. */
const DIM = 0.35;

/**
 * The Speaking hero's spotlight. A soft radial light (Newsprint 16% at the
 * centre, gone by ~420px) and a faint cone from the top, both centred on a
 * point that follows the cursor with a smooth lag (rAF only while moving).
 * When the cursor leaves, the point drifts back to rest just right of the
 * dimmed words ([data-spot-target]); as the beam nears them their opacity
 * rises from 35% to 100%.
 *
 * Touch / no fine pointer / reduced motion: a static beam resting near the
 * headline, the words at 35%.
 */
export function SpotlightHero({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const coneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const cone = coneRef.current;
    if (!root || !glow || !cone) return;
    const target = root.querySelector<HTMLElement>("[data-spot-target]");
    const live = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");

    const pos = { x: 0, y: 0 };
    const goal = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    function restPoint() {
      const r = root!.getBoundingClientRect();
      if (!target) return { x: r.width * 0.55, y: r.height * 0.35 };
      const t = target.getBoundingClientRect();
      return { x: t.right - r.left + 120, y: t.top - r.top + t.height / 2 };
    }

    function draw() {
      glow!.style.transform = `translate3d(${pos.x - 420}px, ${pos.y - 420}px, 0)`;
      cone!.style.transform = `translate3d(${pos.x - 260}px, 0, 0)`;
      cone!.style.height = `${Math.max(0, pos.y + 160)}px`;
      if (!target) return;
      if (!live.matches) {
        target.style.opacity = String(DIM);
        return;
      }
      const r = root!.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      // Distance from the beam to the nearest point of the words.
      const dx = Math.max(t.left - r.left - pos.x, 0, pos.x - (t.right - r.left));
      const dy = Math.max(t.top - r.top - pos.y, 0, pos.y - (t.bottom - r.top));
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / FALLOFF);
      target.style.opacity = String(DIM + (1 - DIM) * near);
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

    function rest(snap: boolean) {
      const p = restPoint();
      goal.x = p.x;
      goal.y = p.y;
      if (snap) {
        pos.x = p.x;
        pos.y = p.y;
        draw();
      } else {
        kick();
      }
    }

    function onMove(event: PointerEvent) {
      if (!live.matches || event.pointerType === "touch") return;
      const r = root!.getBoundingClientRect();
      goal.x = event.clientX - r.left;
      goal.y = event.clientY - r.top;
      kick();
    }
    const onLeave = () => live.matches && rest(false);
    const onResize = () => rest(true);
    const onModeChange = () => rest(true);

    rest(true);
    document.fonts?.ready.then(() => rest(true));
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    live.addEventListener("change", onModeChange);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      live.removeEventListener("change", onModeChange);
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {/* Beam layers (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={coneRef} className="spot-cone absolute top-0 left-0 w-[520px] will-change-transform" />
        <div ref={glowRef} className="spot-glow absolute top-0 left-0 size-[840px] will-change-transform" />
      </div>
      {children}
    </div>
  );
}
