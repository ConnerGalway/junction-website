"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Placeholder, cx } from "@/components";
import { CASE_AREAS, CASE_DEFAULT_AREA } from "@/lib/buildingSupplyCase";

/**
 * Case study switcher (on Forest): four area tabs, each with its Bebas
 * number, and a Newsprint panel with the before, the cost and what we
 * built. A vertical list beside the panel on desktop, a horizontal row
 * above it on mobile.
 */
export function CaseSwitcher() {
  const [active, setActive] = useState(() => Math.max(0, CASE_AREAS.findIndex((a) => a.id === CASE_DEFAULT_AREA)));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const area = CASE_AREAS[active];

  function onKeyDown(event: KeyboardEvent, i: number) {
    const n = CASE_AREAS.length;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (i + 1) % n;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = n - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="Where they started, by area"
        className="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {CASE_AREAS.map((a, i) => {
          const selected = i === active;
          return (
            <button
              key={a.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${a.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={cx(
                "group flex shrink-0 cursor-pointer items-baseline justify-between gap-6 rounded-control border-0 px-5 py-4 text-left text-[17px] font-medium transition-colors duration-150",
                selected ? "bg-newsprint text-carbon" : "bg-transparent text-newsprint"
              )}
            >
              <span className={cx(!selected && "group-hover:text-break-on-dark")}>{a.area}</span>
              <span
                className={cx(
                  "font-wordmark text-[32px] leading-none font-normal",
                  selected ? "text-accent-1-on-light" : "text-newsprint/50"
                )}
              >
                {a.number}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${area.id}`}
        className="tone-newsprint card-pad rounded-card"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-wordmark text-[clamp(64px,7vw,96px)] leading-[0.9] text-accent-1-on-light">
            {area.number}
          </span>
          <span className="type-body">{area.numberLabel}</span>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="type-eyebrow m-0 mb-2">Before</p>
            <p className="type-body m-0">{area.before}</p>
          </div>
          <div>
            <p className="type-eyebrow m-0 mb-2">What it cost</p>
            <p className="type-body m-0">{area.cost}</p>
          </div>
        </div>

        {area.outcome.kind === "built" ? (
          <div className="tone-callout mt-7 grid gap-5 rounded-control p-5 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div>
              <p className="type-eyebrow m-0 mb-2">What we built</p>
              <p className="m-0 font-display text-[22px] leading-tight font-black tracking-[-0.02em]">{area.outcome.name}</p>
              <p className="type-body m-0 mt-1.5">{area.outcome.line}</p>
            </div>
            <div>
              <p className="type-eyebrow m-0 mb-2">After</p>
              <Placeholder className="w-fit px-3 py-1.5">[ result ]</Placeholder>
            </div>
          </div>
        ) : (
          <div className="mt-7 rounded-control bg-newsprint-hover p-5">
            <p className="type-eyebrow m-0 mb-2">Next</p>
            <p className="m-0 font-display text-[22px] leading-tight font-black tracking-[-0.02em] text-carbon">
              {area.outcome.name}
            </p>
            <p className="type-body m-0 mt-1.5">{area.outcome.line}</p>
          </div>
        )}
      </div>
    </div>
  );
}
