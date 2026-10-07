"use client";

import { useState } from "react";
import { cx } from "@/components";

export type Article = {
  title: string;
  cat: string;
  date: string;
  teaser: string;
};

/** Filterable article list. Filter pills are toggle buttons (aria-pressed). */
export function ArticleList({ articles, filters }: { articles: Article[]; filters: string[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles =
    activeFilter === "All" ? articles : articles.filter((a) => a.cat === activeFilter);

  return (
    <>
      <div role="group" aria-label="Filter articles by topic" className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveFilter(filter)}
              className={cx(
                "inline-flex min-h-11 cursor-pointer items-center rounded-control border-[1.5px] border-forest px-4 text-[15px] font-medium",
                active ? "bg-forest text-newsprint" : "bg-transparent text-forest hover:bg-sage"
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <ul className="m-0 list-none border-t-2 border-canopy p-0">
        {filteredArticles.map((article) => (
          <li key={article.title} className="border-b border-hairline">
            {/* TODO: link each article once the archive is live. */}
            <a
              href="#"
              className="group grid items-baseline gap-x-12 gap-y-2 py-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]"
            >
              <span className="type-eyebrow">
                {article.date} · {article.cat}
              </span>
              <h2 className="type-h3 m-0 group-hover:text-break-on-light">{article.title}</h2>
              <span className="type-small text-[16px]">{article.teaser}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
