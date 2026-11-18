"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components";

type Item = { id: string; title: string };

/** The section nearest the top of the viewport (120px from the top), for the highlight. */
function useCurrentSection(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const update = () => {
      let now: string | null = els[0]?.id ?? null;
      for (const el of els) if (el.getBoundingClientRect().top <= 120) now = el.id;
      // At the very bottom, the last section is current even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) now = els.at(-1)?.id ?? now;
      setCurrent(now);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);
  return current;
}

/**
 * Privacy policy table of contents. From 1024px: a sticky list beside the
 * text, the current section in Canopy. Below 1024px: a collapsible "On this
 * page" list at the top. Links jump to the sections (smooth scroll unless
 * reduced motion, via the page's scroll-margin).
 */
export function PolicyToc({ items }: { items: Item[] }) {
  const ids = items.map((i) => i.id);
  const current = useCurrentSection(ids);

  const list = (onPick?: () => void) => (
    <ol className="m-0 flex list-none flex-col p-0">
      {items.map((item) => {
        const active = item.id === current;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onPick}
              aria-current={active ? "true" : undefined}
              className={cx(
                "-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-snug no-underline transition-colors duration-150 hover:text-break-on-light",
                active ? "border-canopy font-medium text-canopy-text" : "border-transparent text-flint"
              )}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* 1024px+: sticky beside the text */}
      <nav aria-label="On this page" className="hidden h-full lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-hairline">{list()}</div>
      </nav>

      {/* Below 1024px: collapsible at the top */}
      <details className="policy-toc-mobile rounded-card bg-newsprint-hover lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[15px] font-medium text-carbon">
          On this page
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" className="policy-toc-chevron shrink-0 transition-transform duration-150">
            <path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <nav aria-label="On this page" className="border-t border-hairline px-5 pt-2 pb-4">
          {list()}
        </nav>
      </details>
    </>
  );
}
