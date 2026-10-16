"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Button, cx } from "@/components";
import type { Issue } from "@/lib/brief";
import { formatDay, formatMonth, issueHref } from "./format";

/** Issues shown before "Older issues" (when no filter or search is active). */
const PAGE = 10;

/**
 * The Brief archive: every issue but the latest, grouped by month.
 *
 * One header row on a 2px Carbon rule: "Archive", topic tabs (a real
 * tablist; ← → Home End), and a Search button that opens an inline field.
 * Topic and search combine; with either active, every match shows.
 * Otherwise the newest PAGE issues show, then "Older issues" loads more.
 */
export function BriefArchive({ issues, topics }: { issues: Issue[]; topics: string[] }) {
  const tabs = ["All", ...topics];
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const panelId = `${id}-panel`;
  const tabId = (t: string) => `${id}-tab-${t}`;

  const q = query.trim().toLowerCase();
  const filtering = topic !== "All" || q !== "";
  const matches = issues.filter(
    (issue) => (topic === "All" || issue.topics.includes(topic)) && (q === "" || issue.feature.toLowerCase().includes(q))
  );
  const visible = filtering ? matches : matches.slice(0, shown);

  // Group by month, keeping newest-first order; months with no matches never appear.
  const months: { label: string; issues: Issue[] }[] = [];
  for (const issue of visible) {
    const label = formatMonth(issue.date);
    if (months.at(-1)?.label === label) months.at(-1)!.issues.push(issue);
    else months.push({ label, issues: [issue] });
  }

  function select(i: number) {
    const next = (i + tabs.length) % tabs.length;
    setTopic(tabs[next]);
    tabRefs.current[next]?.focus();
  }

  function onTabKey(event: KeyboardEvent, i: number) {
    const keys: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  }

  function closeSearch() {
    setQuery("");
    setSearchOpen(false);
  }

  function clearFilters() {
    setTopic("All");
    closeSearch();
  }

  return (
    <section aria-labelledby={`${id}-heading`}>
      {/* Header row, sitting on the 2px Carbon rule */}
      <div className="flex items-end gap-x-6 border-b-2 border-carbon max-md:flex-wrap">
        <h2 id={`${id}-heading`} className="type-eyebrow m-0 shrink-0 pb-3 text-carbon">
          Archive
        </h2>

        <div
          role="tablist"
          aria-label="Filter the archive by topic"
          className="brief-tabs flex min-w-0 flex-1 gap-x-5 overflow-x-auto md:justify-center-safe max-md:order-3 max-md:basis-full"
        >
          {tabs.map((t, i) => {
            const active = t === topic;
            return (
              <button
                key={t}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(t)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => setTopic(t)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cx(
                  "relative shrink-0 cursor-pointer border-0 bg-transparent px-0 pt-1 pb-3 text-[16px] whitespace-nowrap",
                  active ? "font-semibold text-carbon" : "font-normal text-flint hover:text-break-on-light"
                )}
              >
                {t}
                {/* The active underline sits on the rule */}
                {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[2px] h-[3px] bg-canopy" />}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center pb-2">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                aria-label="Search issue headlines"
                placeholder="Search headlines"
                className="w-[min(170px,50vw)] rounded-control border border-flint bg-transparent px-3 py-1.5 text-[15px] text-carbon placeholder:text-flint focus-visible:border-canopy-text"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="cursor-pointer border-0 bg-transparent px-1 text-[20px] leading-none text-flint hover:text-break-on-light"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="cursor-pointer border-0 bg-transparent px-0 pt-1 pb-1 text-[16px] whitespace-nowrap text-flint hover:text-break-on-light"
            >
              <span aria-hidden="true">⌕ </span>Search
            </button>
          )}
        </div>
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(topic)}>
        <p aria-live="polite" className="sr-only">
          {filtering ? `${matches.length} ${matches.length === 1 ? "issue" : "issues"} match.` : ""}
        </p>

        {months.length === 0 ? (
          <div className="pt-12">
            <p className="type-body m-0 text-carbon">No issues match that yet.</p>
            <button type="button" onClick={clearFilters} className="link mt-3 cursor-pointer border-0 bg-transparent p-0 text-[16px]">
              Clear filters
            </button>
          </div>
        ) : (
          months.map((month) => (
            <div key={month.label} className="mt-12">
              <h3 className="type-eyebrow m-0 border-b border-carbon pb-2 text-accent-2">{month.label}</h3>
              <ul className="m-0 list-none p-0">
                {month.issues.map((issue) => (
                  <li key={`${issue.number}-${issue.date}`}>
                    <a href={issueHref(issue.url)} className="brief-row group relative block py-7">
                      {issue.number !== null && (
                        <>
                          {/* Sideways in the margin from 1024px; inline above the headline below that */}
                          <span aria-hidden="true" className="brief-margin-num top-7 text-[56px]">
                            {issue.number}
                          </span>
                          <span aria-hidden="true" className="mb-2 block font-wordmark text-[28px] leading-none text-carbon/30 lg:hidden">
                            Nº {issue.number}
                          </span>
                        </>
                      )}
                      <span className="block font-display text-[clamp(22px,2.2vw,26px)] leading-[1.15] font-black tracking-[-0.03em] text-carbon transition-colors duration-200 group-hover:text-break-on-light group-focus-visible:text-break-on-light">
                        {issue.feature}
                      </span>
                      <span className="sr-only">
                        {issue.number !== null ? `, issue ${issue.number}` : ""}, {formatDay(issue.date)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {!filtering && matches.length > shown && (
          <div className="mt-12">
            <Button variant="secondary" onClick={() => setShown((n) => n + PAGE)}>
              Older issues
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
