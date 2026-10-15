"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent } from "react";
import { cx } from "@/components";
import type { TeamMember } from "@/lib/about";

/** How far the portrait moves toward the cursor each frame. */
const LERP = 0.16;
/** Portrait card size (px) and its offset from the cursor. */
const CARD_W = 220;
const CARD_H = 280;
const OFFSET_X = 32;

/**
 * "Who we are" names (About page, on Carbon), in Fraunces 900 italic.
 *
 * Fine pointer, motion allowed: names rest at Newsprint 45%; the hovered or
 * focused one goes to full Newsprint, its role to Fern, and a greyscale
 * portrait card (-3°) appears and follows the cursor with a smooth lag
 * (rAF only while moving). Keyboard focus puts the card next to the name.
 * Leaving the list hides it (150ms fade).
 *
 * Touch, coarse pointer or reduced motion (CSS decides, so there's no flash):
 * names at full Newsprint, a small portrait beside each, no floating card.
 */
export function TeamList({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState<number | null>(null);
  // The card's portrait; kept while the card fades out.
  const [portrait, setPortrait] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const live = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const goal = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const running = useRef(false);
  const shown = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      live.current = mq.matches;
      if (!mq.matches) setActive(null);
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  function draw() {
    const card = cardRef.current;
    if (card) card.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(-3deg)`;
  }

  function step() {
    const p = pos.current;
    const g = goal.current;
    p.x += (g.x - p.x) * LERP;
    p.y += (g.y - p.y) * LERP;
    draw();
    if (Math.abs(g.x - p.x) > 0.5 || Math.abs(g.y - p.y) > 0.5) {
      frame.current = requestAnimationFrame(step);
    } else {
      running.current = false;
    }
  }

  /** Move the card's top-left toward (x, y) in list coordinates; snap if it was hidden. */
  function moveTo(rawX: number, y: number) {
    // Keep the card inside the list's width so it never causes a sideways scroll.
    const maxX = Math.max(0, listRef.current!.clientWidth - CARD_W);
    const x = Math.min(Math.max(rawX, 0), maxX);
    goal.current = { x, y };
    if (!shown.current) {
      pos.current = { x, y };
      shown.current = true;
      draw();
      return;
    }
    if (!running.current) {
      running.current = true;
      frame.current = requestAnimationFrame(step);
    }
  }

  function onMove(event: PointerEvent) {
    if (!live.current || event.pointerType !== "mouse") return;
    const r = listRef.current!.getBoundingClientRect();
    moveTo(event.clientX - r.left + OFFSET_X, event.clientY - r.top - CARD_H / 2);
  }

  function activate(i: number) {
    setActive(i);
    setPortrait(i);
  }

  function hide() {
    setActive(null);
    shown.current = false;
  }

  function onFocus(i: number, event: FocusEvent<HTMLLIElement>) {
    if (!live.current) return;
    activate(i);
    // Keyboard: the card sits next to the name, not at the cursor.
    const list = listRef.current!.getBoundingClientRect();
    const name = event.currentTarget.querySelector("[data-name]")!.getBoundingClientRect();
    const row = event.currentTarget.getBoundingClientRect();
    shown.current = false;
    moveTo(name.right - list.left + OFFSET_X, row.top - list.top + row.height / 2 - CARD_H / 2);
  }

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="team-list relative m-0 list-none p-0"
        onPointerMove={onMove}
        onPointerLeave={hide}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
        }}
      >
        {team.map((m, i) => (
          <li
            key={m.name}
            tabIndex={0}
            data-active={active === i ? "" : undefined}
            onPointerEnter={(e) => live.current && e.pointerType === "mouse" && activate(i)}
            onFocus={(e) => onFocus(i, e)}
            className="team-row flex items-center gap-x-5 py-6 outline-offset-4 not-last:border-b not-last:border-sage"
          >
            <span className="team-thumb relative h-[70px] w-14 shrink-0 overflow-hidden rounded-control">
              <Image src={m.portrait} alt="" fill sizes="56px" className="object-cover object-top grayscale" />
            </span>
            <span className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-1">
              <span data-name className="team-name font-quote text-[clamp(32px,4.6vw,64px)] leading-[1.05] font-black italic">
                {m.name}
              </span>
              <span className="team-role text-[13px] font-medium tracking-[0.14em] uppercase">{m.role}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* The floating portrait (fine pointer only; decorative) */}
      <div
        ref={cardRef}
        aria-hidden="true"
        className={cx(
          "team-card pointer-events-none absolute top-0 left-0 z-10 overflow-hidden rounded-card shadow-card transition-opacity duration-150",
          active === null ? "opacity-0" : "opacity-100"
        )}
        style={{ width: CARD_W, height: CARD_H }}
      >
        {team.map((m, i) => (
          <Image
            key={m.name}
            src={m.portrait}
            alt=""
            fill
            sizes={`${CARD_W}px`}
            className={cx("object-cover object-top grayscale", portrait === i ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
    </div>
  );
}
