"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "@/components";
import {
  SCAN_ACTIONS,
  SCAN_INSIGHTS,
  SCAN_ISSUE,
  SCAN_OVERVIEW,
  SCAN_READING,
  SCAN_STATS,
  SCAN_TABS,
  SCAN_TRENDS,
  type ScanTab,
} from "@/lib/industryScan";

/**
 * ScanPreview: a display-only replica of the current Industry Scan (like the
 * Accelerator DashboardPreview): a Newsprint window with a slim browser bar,
 * the issue's meta and title, and tabs that switch the panel (tablist,
 * ← → Home End, 200ms fade). It bleeds off the right edge (set by the page)
 * and fades out at the bottom. Under 768px it shows the Overview only, no
 * tabs. As a product mock it keeps its own colour coding (Forest numbers on
 * sage-25 tiles). Content: src/lib/industryScan.ts.
 */
export function ScanPreview({ className }: { className?: string }) {
  const [tab, setTab] = useState<ScanTab>("Overview");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function onKey(e: KeyboardEvent, i: number) {
    const keys: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: SCAN_TABS.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const n = (keys[e.key] + SCAN_TABS.length) % SCAN_TABS.length;
    setTab(SCAN_TABS[n]);
    refs.current[n]?.focus();
  }

  return (
    <div
      role="region"
      aria-label={`Preview of the ${SCAN_ISSUE.title}`}
      className={cx("scan-preview overflow-hidden rounded-card bg-newsprint text-carbon shadow-[0_30px_80px_-30px_var(--ju-deep)]", className)}
    >
      {/* Browser bar */}
      <div aria-hidden="true" className="flex items-center gap-4 border-b border-hairline bg-newsprint-hover px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-carbon/20" />
          <span className="size-2.5 rounded-full bg-carbon/20" />
          <span className="size-2.5 rounded-full bg-carbon/20" />
        </span>
        <span className="flex-1 truncate text-center text-[12px] text-flint">{SCAN_ISSUE.title}</span>
        <span className="rounded-control border border-hairline px-2 py-0.5 text-[11px] text-flint">⌘K Search</span>
      </div>

      <div className="px-[clamp(20px,3vw,36px)] pt-6 pb-16">
        <p className="m-0 text-[11px] font-medium tracking-[0.12em] text-canopy-text uppercase">{SCAN_ISSUE.meta}</p>
        <p className="ju-display mt-2 mb-0 text-[clamp(22px,2.2vw,30px)] text-carbon">{SCAN_ISSUE.title}</p>

        <div role="tablist" aria-label="Scan sections" className="mt-5 hidden gap-5 border-b border-hairline md:flex">
          {SCAN_TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={tab === t}
              aria-controls={`${id}-panel`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onKey(e, i)}
              className={cx(
                "relative -mb-px cursor-pointer border-0 bg-transparent px-0 pb-2.5 text-[13px] whitespace-nowrap",
                tab === t ? "font-medium text-carbon" : "text-flint hover:text-break-on-light"
              )}
            >
              {t}
              {tab === t && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-canopy" />}
            </button>
          ))}
        </div>

        <div
          key={tab}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${SCAN_TABS.indexOf(tab)}`}
          className="scan-panel mt-5"
        >
          {/* Phones always show the Overview */}
          <div className="md:hidden">
            <Overview />
          </div>
          <div className="hidden md:block">{panel(tab)}</div>
        </div>
      </div>
    </div>
  );
}

function panel(tab: ScanTab) {
  switch (tab) {
    case "Overview":
      return <Overview />;
    case "Key trends":
      return <Numbered items={SCAN_TRENDS} />;
    case "Insights":
      return (
        <ul className="m-0 list-none divide-y divide-hairline p-0">
          {SCAN_INSIGHTS.map((s) => (
            <li key={s.value} className="flex items-baseline gap-4 py-2.5">
              <span className="w-[4.5em] shrink-0 font-wordmark text-[26px] leading-none text-forest">{s.value}</span>
              <span className="text-[14px] text-ink-soft">{s.label}</span>
            </li>
          ))}
        </ul>
      );
    case "Stats":
      return <Tiles tiles={SCAN_STATS} />;
    case "Actions":
      return <Numbered items={SCAN_ACTIONS} />;
    case "Reading":
      return (
        <ul className="m-0 list-none divide-y divide-hairline p-0">
          {SCAN_READING.map((r) => (
            <li key={r} className="py-2 text-[14px] text-ink-soft">
              {r}
            </li>
          ))}
        </ul>
      );
  }
}

function Overview() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div>
        <p className="m-0 text-[15px] font-semibold text-carbon">{SCAN_OVERVIEW.heading}</p>
        <ul className="m-0 mt-3 list-none space-y-3 p-0">
          {SCAN_OVERVIEW.items.map((item) => (
            <li key={item.label}>
              <span className="block text-[11px] font-medium tracking-[0.12em] text-canopy-text uppercase">{item.label}</span>
              <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <Tiles tiles={SCAN_OVERVIEW.tiles} />
    </div>
  );
}

function Tiles({ tiles }: { tiles: { value: string; label: string }[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-2.5 self-start p-0">
      {tiles.map((t) => (
        <li key={t.value} className="rounded-control bg-sage-25 p-3">
          <span className="block font-wordmark text-[30px] leading-none text-forest">{t.value}</span>
          <span className="mt-1.5 block text-[12px] leading-snug text-ink-soft">{t.label}</span>
        </li>
      ))}
    </ul>
  );
}

function Numbered({ items }: { items: string[] }) {
  return (
    <ol className="m-0 list-none divide-y divide-hairline p-0">
      {items.map((item, i) => (
        <li key={item} className="flex items-baseline gap-4 py-2.5">
          <span className="w-6 shrink-0 font-wordmark text-[20px] leading-none text-forest">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-[14px] leading-snug text-carbon">{item}</span>
        </li>
      ))}
    </ol>
  );
}
