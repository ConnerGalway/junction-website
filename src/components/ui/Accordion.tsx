"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "./cx";

export type AccordionItem = { q: string; a: ReactNode };

/**
 * Questions accordion. Every question is a full-width button row
 * (aria-expanded, aria-controls), all collapsed by default; any number can
 * be open. A gold chevron on the right turns 180° when open, and the
 * answer opens with a 250ms height animation (instant with reduced motion).
 * The question text turns pink on hover, like any clickable element.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const baseId = useId();

  return (
    <div className={cx("border-t-2 border-(--tone-rule)", className)}>
      {items.map((item, i) => {
        const isOpen = open[i];
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.q} className="border-b border-(--tone-hairline)">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="accordion-trigger type-h4 flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-5 text-left text-(--tone-text)"
              >
                <span className="accordion-question transition-colors duration-150">{item.q}</span>
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className={cx(
                    "shrink-0 text-accent-1-on-light transition-transform duration-[250ms] ease-out",
                    isOpen && "rotate-180"
                  )}
                >
                  <path
                    d="M4.5 7.5 10 13l5.5-5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              data-open={isOpen || undefined}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="type-body max-w-[60ch] pb-6">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
