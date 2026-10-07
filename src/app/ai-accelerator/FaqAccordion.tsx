"use client";

import { useId, useState } from "react";

export type Faq = { q: string; a: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const baseId = useId();

  return (
    <div className="border-t-2 border-(--tone-rule)">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={i} className="border-b border-(--tone-hairline)">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="type-h4 flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-5 text-left text-(--tone-text)"
              >
                <span>{faq.q}</span>
                <span aria-hidden="true" className="type-h3 text-(--tone-numeral)">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="type-body text-muted m-0 mb-6 max-w-[60ch]">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
