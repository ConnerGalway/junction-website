"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "@/components";

/**
 * A horizontal JunctionU shelf: the title (Oswald 700) on the left; on the
 * right ‹ › (Fern) that scroll the row by one page, and "See all →". The row
 * starts at the content edge and bleeds off the right edge of the viewport,
 * with scroll-snap. Cards are links, so Tab moves through them (and scrolls
 * them into view); touch and trackpads scroll natively.
 */
export function Shelf({
  id,
  title,
  seeAll,
  children,
}: {
  id: string;
  title: ReactNode;
  seeAll: { href: string; label?: string };
  /** The cards, each wrapped in <li> by the caller. */
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function page(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // One page = the visible width minus the left inset.
    const inset = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollBy({ left: dir * Math.max(200, track.clientWidth - inset - 40), behavior: reduce ? "auto" : "smooth" });
  }

  const arrow = (dir: 1 | -1, disabled: boolean) => (
    <button
      type="button"
      onClick={() => page(dir)}
      disabled={disabled}
      aria-label={dir === -1 ? "Scroll back" : "Scroll forward"}
      aria-controls={`${id}-track`}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-fern/60 bg-transparent text-fern transition-colors duration-150 hover:border-fern hover:text-newsprint disabled:cursor-default disabled:opacity-35 disabled:hover:border-fern/60 disabled:hover:text-fern"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === -1 ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"} />
      </svg>
    </button>
  );

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 py-10">
      <div className="px-gutter">
        <div className="mx-auto flex max-w-wide items-end justify-between gap-6">
          <h2 id={headingId} className="ju-title m-0 text-[clamp(24px,2.2vw,30px)]">
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              {arrow(-1, atStart)}
              {arrow(1, atEnd)}
            </div>
            <a href={seeAll.href} className="link ml-2 text-[15px] whitespace-nowrap">
              {seeAll.label ?? "See all →"}
            </a>
          </div>
        </div>
      </div>
      <ul
        ref={trackRef}
        id={`${id}-track`}
        className={cx("ju-shelf m-0 mt-5 flex list-none gap-5 overflow-x-auto py-3")}
        onFocus={(e) => {
          // Keyboard: bring a focused card fully into view (snap alone can leave it half off-screen).
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          (e.target as HTMLElement).closest("li")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "nearest" });
        }}
      >
        {children}
      </ul>
    </section>
  );
}
