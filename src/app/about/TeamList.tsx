"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components";
import type { TeamMember } from "@/lib/about";

/** Portrait card size (px). */
const CARD_W = 180;
const CARD_H = 225;
/** Space the card keeps from the name (and from the role, when centred in the gap). */
const CARD_GAP = 24;

/**
 * "Who we are" names (About page, on Carbon), in Fraunces 900 italic.
 *
 * Fine pointer: names rest at Newsprint 45%; the hovered or focused one goes
 * to full Newsprint and its role to Fern, and a greyscale portrait card (-3°)
 * sits in that row, centred in the gap between the name and the role (just
 * right of the name when the gap is too narrow). Moving between names, it
 * glides to the new row (300ms ease-out) and the image cross-fades (200ms);
 * entering the list it fades and scales in (0.96 → 1, 200ms); leaving, it
 * fades out (150ms). With reduced motion it appears in place, without
 * transitions.
 *
 * Touch or coarse pointer (CSS decides, so there's no flash): names at full
 * Newsprint, a small portrait beside each, no card.
 */
export function TeamList({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState<number | null>(null);
  // The card's portrait; kept while the card fades out.
  const [portrait, setPortrait] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const placeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const live = useRef(false);
  const reduce = useRef(false);
  const visible = useRef(false);
  const activeRow = useRef<HTMLLIElement | null>(null);

  /** Where the card goes for a row (list coordinates). */
  function spotFor(row: HTMLLIElement) {
    const list = listRef.current!.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    const name = row.querySelector("[data-name]")!.getBoundingClientRect();
    const role = row.querySelector("[data-role]")!.getBoundingClientRect();
    const sameLine = role.top < name.bottom && role.left > name.right;
    const gap = sameLine ? role.left - name.right : 0;
    const x =
      gap >= CARD_W + 2 * CARD_GAP
        ? (name.right + role.left) / 2 - CARD_W / 2 // centred in the gap
        : name.right + CARD_GAP; // just right of the name
    return {
      x: Math.min(Math.max(x - list.left, 0), Math.max(0, list.width - CARD_W)),
      y: r.top - list.top + r.height / 2 - CARD_H / 2,
    };
  }

  /** Move the card to a row: glide if it's showing, else appear there (fade + scale in). */
  function place(row: HTMLLIElement, animate: boolean) {
    const holder = placeRef.current;
    const card = cardRef.current;
    if (!holder || !card) return;
    const { x, y } = spotFor(row);
    const motion = animate && !reduce.current;
    if (visible.current) {
      holder.style.transition = motion ? "transform 300ms ease-out" : "none";
      holder.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      return;
    }
    // Appear: jump to the row with no transition, then fade and scale in.
    holder.style.transition = "none";
    holder.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    card.style.transition = "none";
    card.style.opacity = "0";
    card.style.transform = "rotate(-3deg) scale(0.96)";
    void card.offsetWidth; // apply the start state before transitioning
    card.style.transition = motion ? "opacity 200ms ease-out, transform 200ms ease-out" : "none";
    card.style.opacity = "1";
    card.style.transform = "rotate(-3deg) scale(1)";
    visible.current = true;
  }

  function hide() {
    setActive(null);
    activeRow.current = null;
    const card = cardRef.current;
    if (!card || !visible.current) return;
    visible.current = false;
    card.style.transition = reduce.current ? "none" : "opacity 150ms ease-out";
    card.style.opacity = "0";
  }

  function activate(i: number, row: HTMLLIElement) {
    if (!live.current) return;
    setActive(i);
    setPortrait(i);
    activeRow.current = row;
    place(row, true);
  }

  // Latest place/hide for the listeners below.
  const handlers = useRef({ place, hide });
  useEffect(() => {
    handlers.current = { place, hide };
  });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      live.current = fine.matches;
      reduce.current = still.matches;
      if (!fine.matches) handlers.current.hide();
    };
    // Keep the card on its row when the layout changes.
    const onResize = () => {
      if (activeRow.current && visible.current) handlers.current.place(activeRow.current, false);
    };
    update();
    fine.addEventListener("change", update);
    still.addEventListener("change", update);
    window.addEventListener("resize", onResize);
    return () => {
      fine.removeEventListener("change", update);
      still.removeEventListener("change", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="team-list relative m-0 list-none p-0"
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
        }}
      >
        {team.map((m, i) => (
          <li
            key={m.name}
            tabIndex={0}
            data-active={active === i ? "" : undefined}
            onPointerEnter={(e) => e.pointerType === "mouse" && activate(i, e.currentTarget)}
            onFocus={(e) => activate(i, e.currentTarget)}
            className="team-row flex items-center gap-x-5 py-6 outline-offset-4 not-last:border-b not-last:border-sage"
          >
            <span className="team-thumb relative h-[70px] w-14 shrink-0 overflow-hidden rounded-control">
              <Image src={m.portrait} alt="" fill sizes="56px" className="object-cover object-top grayscale" />
            </span>
            <span className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-1">
              <span data-name className="team-name font-quote text-[clamp(32px,4.6vw,64px)] leading-[1.05] font-black italic">
                {m.name}
              </span>
              <span data-role className="team-role text-[13px] font-medium tracking-[0.14em] uppercase">
                {m.role}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* The portrait card (fine pointer only; decorative). The holder moves
          between rows; the card inside fades, scales and holds the tilt. */}
      <div
        ref={placeRef}
        aria-hidden="true"
        className="team-card pointer-events-none absolute top-0 left-0 z-10"
        style={{ width: CARD_W, height: CARD_H }}
      >
        <div
          ref={cardRef}
          className="relative size-full overflow-hidden rounded-card shadow-card"
          style={{ opacity: 0, transform: "rotate(-3deg) scale(0.96)" }}
        >
          {team.map((m, i) => (
            <Image
              key={m.name}
              src={m.portrait}
              alt=""
              fill
              sizes={`${CARD_W}px`}
              className={cx(
                "object-cover object-top grayscale transition-opacity duration-200 ease-out motion-reduce:transition-none",
                portrait === i ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
