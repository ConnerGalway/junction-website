"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components";
import type { TeamMember } from "@/lib/about";

/** Card width: 240px at 1440, 200px at 1024, proportional between; never under 160px. */
const cardWidthFor = (vw: number) => Math.min(240, Math.max(200, 200 + ((vw - 1024) * 40) / 416));
const CARD_MIN_W = 160;
/** Space the card keeps from the names and the roles on each side. */
const CARD_GAP = 24;
/** Portrait aspect (height / width). */
const CARD_RATIO = 1.25;

/**
 * "Who we are" names (About page, on Carbon), in Fraunces 900 italic.
 *
 * Fine pointer: one portrait card that never moves, centred in the gap
 * between the names and the roles and vertically centred on the list
 * (greyscale, -1.5°, radius 14, soft shadow, above the dividers). One person
 * is active: Conner at rest, or whoever is hovered or focused. The active
 * name is full Newsprint, its role Fern, the others 45%; the card's image
 * cross-fades to the active person (250ms, instant with reduced motion).
 * If the gap is narrow, the card shrinks to fit it (down to 160px wide).
 *
 * Touch or coarse pointer (CSS decides, so there's no flash): names at full
 * Newsprint, a small portrait beside each, no card.
 */
export function TeamList({ team }: { team: TeamMember[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [card, setCard] = useState<{ x: number; y: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const active = hovered ?? 0;

  // Size and place the card from the layout: centred between the widest name
  // and the leftmost role, and on the list's vertical centre.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    function measure() {
      const l = list!.getBoundingClientRect();
      const names = [...list!.querySelectorAll("[data-name]")].map((n) => n.getBoundingClientRect().right);
      const roles = [...list!.querySelectorAll("[data-role]")].map((r) => r.getBoundingClientRect().left);
      const left = Math.max(...names);
      const right = Math.min(...roles);
      const w = Math.max(CARD_MIN_W, Math.min(cardWidthFor(window.innerWidth), right - left - 2 * CARD_GAP));
      setCard({ x: (left + right) / 2 - w / 2 - l.left, y: l.height / 2 - (w * CARD_RATIO) / 2, w });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="team-list relative m-0 list-none p-0"
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(null);
        }}
      >
        {team.map((m, i) => (
          <li
            key={m.name}
            tabIndex={0}
            data-active={active === i ? "" : undefined}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            onFocus={() => setHovered(i)}
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

      {/* The portrait card (fine pointer only; decorative). It never moves; only
          the image changes. All portraits load up front, so the swap never flashes. */}
      <div
        aria-hidden="true"
        className={cx(
          "team-card pointer-events-none absolute top-0 left-0 z-10 -rotate-[1.5deg] overflow-hidden rounded-card shadow-card",
          !card && "invisible"
        )}
        style={card ? { left: card.x, top: card.y, width: card.w, height: card.w * CARD_RATIO } : undefined}
      >
        {team.map((m, i) => (
          <Image
            key={m.name}
            src={m.portrait}
            alt=""
            fill
            loading="eager"
            sizes="240px"
            className={cx(
              "object-cover object-top grayscale transition-opacity duration-[250ms] ease-out motion-reduce:transition-none",
              active === i ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
    </div>
  );
}
