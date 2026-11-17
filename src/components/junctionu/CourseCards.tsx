import Image from "next/image";
import type { JuCourse } from "@/lib/junctionu";
import { shown } from "@/lib/placeholders";

/** Screen-reader note on every product card: each one links out to eLearningU. */
function ExternalNote() {
  return <span className="sr-only"> (opens its page on the eLearningU site)</span>;
}

/** The small tag on eLearningU cards ("Certificate", "Workshop"): Fern on Fern 18%. */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-control bg-fern/18 px-2.5 py-1 text-[11px] leading-none font-medium tracking-[0.12em] text-fern uppercase">
      {children}
    </span>
  );
}

/**
 * Course card ("Start here"): a 16:9 still (courses/<slug>.jpg, resolved by
 * withStills; a placeholder gradient until the file exists) with its length in Bebas, then the Certificate tag and the
 * price, the title and the module count. The whole card is the link, out to
 * the course's eLearningU landing page. Placeholder labels ("[ $ ]") show only
 * with SHOW_PLACEHOLDERS.
 */
export function CourseCard({ course, index }: { course: JuCourse & { still?: string }; index: number }) {
  const length = shown(course.length);
  const price = shown(course.price);
  return (
    <a href={course.url} className="ju-card group block w-[min(400px,78vw)] no-underline">
      <div className="ju-still relative aspect-video overflow-hidden rounded-card" data-variant={index % 3}>
        {course.still && (
          <Image
            src={course.still}
            alt=""
            fill
            sizes="400px"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        )}
        {length && (
          <span className="ju-still-label absolute top-3 left-4 font-wordmark text-[22px] leading-none text-newsprint">
            {length}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Tag>Certificate</Tag>
        {price && <span className="font-wordmark text-[22px] leading-none text-newsprint">{price}</span>}
      </div>
      <h3 className="ju-title mt-3 mb-0 text-[24px] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
        {course.title}
        <ExternalNote />
      </h3>
      {course.modules && <p className="type-small mt-1.5 mb-0 text-newsprint-muted">{course.modules} modules</p>}
    </a>
  );
}

/**
 * Workshop card (poster, 240 × 360, ju-moss): the length in Fern Bebas and
 * the Workshop tag on top, a big ghost number behind, the title in Oswald
 * capitals at the bottom over a Fern-35% rule with "Workshop" and the price.
 * Links out to the workshop's eLearningU page. Placeholder lengths
 * ("[ x HRS ]") show only with SHOW_PLACEHOLDERS; the tag stays top right.
 */
export function WorkshopCard({ workshop, index }: { workshop: JuCourse; index: number }) {
  const length = shown(workshop.length);
  const price = shown(workshop.price);
  return (
    <a
      href={workshop.url}
      className="ju-card group relative flex h-[360px] w-[240px] flex-col overflow-hidden rounded-card bg-ju-moss p-5 no-underline"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-2 top-14 font-wordmark text-[180px] leading-none text-fern/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex items-start justify-between gap-3">
        {length && <span className="font-wordmark text-[22px] leading-none text-fern">{length}</span>}
        <span className="ml-auto">
          <Tag>Workshop</Tag>
        </span>
      </div>
      <h3 className="ju-display relative mt-auto mb-0 text-[26px] leading-[1.02] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
        {workshop.title}
        <ExternalNote />
      </h3>
      <div className="relative mt-4 flex items-center justify-between border-t border-fern/35 pt-3">
        <span className="type-small text-newsprint-muted">Workshop</span>
        {price && <span className="font-wordmark text-[22px] leading-none text-newsprint">{price}</span>}
      </div>
    </a>
  );
}
