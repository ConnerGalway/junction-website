import Image from "next/image";
import type { JuCourse } from "@/lib/junctionu";

/** The small tag on JunctionU cards ("Certificate", "Workshop"): Fern on Fern 18%. */
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-control bg-fern/18 px-2.5 py-1 text-[11px] leading-none font-medium tracking-[0.12em] text-fern uppercase">
      {children}
    </span>
  );
}

/**
 * Course card ("Start here"): a 16:9 still (a placeholder gradient until the
 * course has one) with its length in Bebas, then the Certificate tag and the
 * price, the title and the module count. The whole card is the link.
 */
export function CourseCard({ course, index }: { course: JuCourse; index: number }) {
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
        <span className="ju-still-label absolute top-3 left-4 font-wordmark text-[22px] leading-none text-newsprint">
          {course.length}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Tag>Certificate</Tag>
        <span className="font-wordmark text-[22px] leading-none text-newsprint">{course.price}</span>
      </div>
      <h3 className="ju-title mt-3 mb-0 text-[24px] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
        {course.title}
      </h3>
      {course.modules && <p className="type-small mt-1.5 mb-0 text-newsprint-muted">{course.modules} modules</p>}
    </a>
  );
}

/**
 * Workshop card (poster, 240 × 360, ju-moss): the length in Fern Bebas and
 * the Workshop tag on top, a big ghost number behind, the title in Oswald
 * capitals at the bottom over a Fern-35% rule with "Workshop" and the price.
 */
export function WorkshopCard({ workshop, index }: { workshop: JuCourse; index: number }) {
  return (
    <a
      href={workshop.url}
      className="ju-card group relative flex h-[360px] w-[240px] flex-col overflow-hidden rounded-card bg-ju-moss p-5 no-underline"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-2 top-14 font-wordmark text-[180px] leading-none text-fern/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex items-start justify-between gap-3">
        <span className="font-wordmark text-[22px] leading-none text-fern">{workshop.length}</span>
        <Tag>Workshop</Tag>
      </div>
      <h3 className="ju-display relative mt-auto mb-0 text-[26px] leading-[1.02] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
        {workshop.title}
      </h3>
      <div className="relative mt-4 flex items-center justify-between border-t border-fern/35 pt-3">
        <span className="type-small text-newsprint-muted">Workshop</span>
        <span className="font-wordmark text-[22px] leading-none text-newsprint">{workshop.price}</span>
      </div>
    </a>
  );
}
