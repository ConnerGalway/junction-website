"use client";

import { useState, type ReactNode } from "react";
import { Badge, Card, Chip, cx } from "@/components";

export type Course = {
  code: string;
  title: string;
  kind: "Certificate" | "Workshop" | "Free";
  blurb: string;
  meta: string;
  price: string;
};

function KindTag({ kind }: { kind: Course["kind"] }) {
  if (kind === "Free") return <Badge variant="outline">{kind}</Badge>;
  return <Chip variant={kind === "Certificate" ? "sage" : "outline"}>{kind}</Chip>;
}

/** Filterable course grid. Filter pills are toggle buttons (aria-pressed). */
export function CourseCatalogue({
  courses,
  filters,
  heading,
}: {
  courses: Course[];
  filters: string[];
  heading: ReactNode;
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => {
          if (activeFilter === "Certificates") return c.kind === "Certificate";
          if (activeFilter === "Workshops") return c.kind === "Workshop";
          return c.kind === activeFilter;
        });

  return (
    <>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        {heading}
        <div role="group" aria-label="Filter courses by type" className="flex flex-wrap gap-2">
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
      </div>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
        {filteredCourses.map((course) => (
          // TODO: link each course to its page once the catalogue is live.
          <Card
            key={course.code}
            href="#"
            className="flex min-h-[280px] flex-col gap-3.5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="type-eyebrow">{course.code}</span>
              <KindTag kind={course.kind} />
            </div>
            <h3 className="type-h3 m-0 group-hover:text-break-on-light">{course.title}</h3>
            <p className="type-body text-muted m-0">{course.blurb}</p>
            <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-hairline pt-4">
              <span className="type-small">{course.meta}</span>
              <span className="type-h4 text-canopy-text">{course.price}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
