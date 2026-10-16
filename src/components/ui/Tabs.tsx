"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "./cx";

export type TabItem = { id: string; label: string; panel: ReactNode };

/**
 * Underlined tabs: large titles (Epilogue 600, 22px) on a 1px rule. The
 * active tab is Carbon with a 3px Canopy underline; inactive tabs are
 * Flint and turn pink on hover. tablist / tab / tabpanel roles, arrow keys
 * (and Home / End) move between tabs. Panels cross-fade in 250ms (instant
 * with reduced motion). On narrow screens the tab row scrolls sideways.
 */
export function Tabs({ items, label, className }: { items: TabItem[]; label: string; className?: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent, i: number) {
    const n = items.length;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (i + 1) % n;
    else if (event.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = n - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="-mx-gutter flex gap-10 overflow-x-auto border-b border-hairline px-gutter [scrollbar-width:none] md:mx-0 md:px-0"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={cx(
                "shrink-0 cursor-pointer border-0 border-b-[3px] border-solid bg-transparent px-0 pt-1 pb-4 text-left font-display text-[22px] leading-tight font-semibold tracking-[-0.015em] whitespace-nowrap transition-colors duration-150",
                selected ? "border-canopy text-carbon" : "border-transparent text-flint hover:text-break-on-light"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid">
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <div
              key={item.id}
              id={`${baseId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${item.id}`}
              className={cx(
                "[grid-area:1/1]",
                selected
                  ? "visible opacity-100 [transition:opacity_250ms_ease-out,visibility_0s_linear_0s]"
                  : "invisible opacity-0 [transition:opacity_250ms_ease-out,visibility_0s_linear_250ms]"
              )}
            >
              {item.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
