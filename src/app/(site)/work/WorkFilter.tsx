"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "@/components";
import { SERVICES, type Service } from "@/lib/workCases";

type Filter = Service | "All";

const FILTERS: Filter[] = ["All", ...SERVICES];
/** Grounds in visible order: Forest, Newsprint, Carbon, Newsprint, then repeat. */
const TONES = ["forest", "newsprint", "carbon", "newsprint"] as const;
const FADE_MS = 200;

const FilterContext = createContext<{
  /** The pressed chip. */
  filter: Filter;
  /** The filter the chapter list currently shows (lags `filter` during the fade). */
  shown: Filter;
  fading: boolean;
  choose: (f: Filter) => void;
  /** Make sure a chapter is visible (clears a filter that hides it), instantly. */
  reveal: (caseId: string) => void;
  services: Record<string, Service>;
} | null>(null);

function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("Work filter components need <WorkFilterProvider>.");
  return ctx;
}

export function WorkFilterProvider({
  services,
  children,
}: {
  /** Each chapter's service, by chapter id. */
  services: Record<string, Service>;
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [shown, setShown] = useState<Filter>("All");
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function apply(f: Filter, animate: boolean) {
    if (timer.current) clearTimeout(timer.current);
    setFilter(f);
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(f);
      setFading(false);
      return;
    }
    // Fade the chapters out, swap the set (and its grounds), fade back in.
    setFading(true);
    timer.current = setTimeout(() => {
      setShown(f);
      setFading(false);
    }, FADE_MS);
  }

  const value = {
    filter,
    shown,
    fading,
    services,
    choose: (f: Filter) => f !== filter && apply(f, true),
    reveal: (caseId: string) => {
      if (filter !== "All" && services[caseId] !== filter) apply("All", false);
    },
  };
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

/** "Filter by service" and the toggle chips (buttons with aria-pressed). */
export function ServiceFilter({ className }: { className?: string }) {
  const { filter, choose } = useFilter();
  return (
    <div className={cx("flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      <span id="work-filter-label" className="type-small text-flint">
        Filter by service
      </span>
      <div role="group" aria-labelledby="work-filter-label" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => choose(f)}
              className={cx(
                "inline-flex min-h-11 cursor-pointer items-center rounded-control border-0 px-4 text-[15px] font-medium transition-colors duration-150",
                active ? "bg-carbon text-newsprint" : "bg-newsprint-hover text-carbon hover:text-break-on-light"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The case chapters. Hides the ones the filter excludes (200ms fade, instant
 * with reduced motion) and gives the visible ones their ground and side by
 * visible position: Forest, Newsprint, Carbon, Newsprint, …; odd chapters
 * put the stat on the left, even ones on the right.
 */
export function ChapterList({ chapters }: { chapters: { id: string; node: ReactNode }[] }) {
  const { shown, fading, services } = useFilter();
  const visibleIds = chapters.map((c) => c.id).filter((id) => shown === "All" || services[id] === shown);
  return (
    <div className={cx("transition-opacity duration-200 motion-reduce:transition-none", fading && "opacity-0")}>
      {chapters.map(({ id, node }) => {
        const visibleIndex = visibleIds.indexOf(id);
        const visible = visibleIndex >= 0;
        const tone = TONES[Math.max(visibleIndex, 0) % TONES.length];
        return (
          <section
            key={id}
            id={id}
            hidden={!visible}
            data-flip={visible && visibleIndex % 2 === 1 ? "true" : undefined}
            className={cx(
              "work-chapter scroll-mt-24 px-gutter py-section-tight",
              `tone-${tone}`,
              tone === "newsprint" && "bg-transparent"
            )}
          >
            {node}
          </section>
        );
      })}
    </div>
  );
}

/** Lets the route map reveal a filtered-out chapter before jumping to it (no-op outside the provider). */
export function useRevealCase() {
  return useContext(FilterContext)?.reveal;
}
