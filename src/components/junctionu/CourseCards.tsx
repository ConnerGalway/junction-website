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
 * Course card ("Start here"), linking out to the course's eLearningU page.
 *
 * Image slot (16:9): the still from courses/<slug>.<ext> when one exists
 * (resolved at build by withStills), otherwise a designed title card
 * (TitleCard). Either way the course type sits top-left in Fern small caps.
 * Under the slot: the length and price in Bebas (each only when set), then
 * the title.
 */
export function CourseCard({ course, index }: { course: JuCourse & { still?: string }; index: number }) {
  const length = shown(course.length);
  const price = shown(course.price);
  return (
    <a href={course.url} className="ju-card group relative block w-[min(400px,78vw)] no-underline">
      <div className="ju-card-frame relative aspect-video overflow-hidden rounded-card">
        {course.still ? (
          <>
            <Image
              src={course.still}
              alt=""
              fill
              sizes="400px"
              className="object-cover"
            />
            {course.type && (
              <span className="ju-still-label absolute top-4 left-5 text-[11px] leading-none font-medium tracking-[0.12em] text-fern uppercase">
                {course.type}
              </span>
            )}
          </>
        ) : (
          <TitleCard title={course.title} type={course.type} variant={index % 3} />
        )}
      </div>
      {(length || price) && (
        <div className="mt-4 flex items-center justify-between gap-4">
          {length ? <span className="font-wordmark text-[22px] leading-none text-fern">{length}</span> : <span />}
          {price && <span className="font-wordmark text-[22px] leading-none text-newsprint">{price}</span>}
        </div>
      )}
      <h3 className="ju-title mt-3 mb-0 text-[24px] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
        {course.title}
        <ExternalNote />
      </h3>
    </a>
  );
}

/**
 * The designed title card for a course without a still (decorative; the
 * card's h3 carries the title). Three grounds by position (data-variant):
 * ju-moss, ju-deep, and ju-ground with a soft Fern glow from the top-right.
 * The type top-left in Fern small caps; at the bottom-left a Fern bar
 * (28 × 4, the eLearningU mark's bar) over the title in Oswald capitals,
 * Newsprint, sized to the card (container units, up to 34px) and held to
 * three lines. No ghost numbers, photo or play icon, so it never reads as a
 * Workshop poster.
 */
function TitleCard({ title, type, variant }: { title: string; type?: string; variant: number }) {
  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      className="ju-title-card absolute inset-0 flex flex-col justify-between p-[clamp(16px,5.5cqw,24px)] [container-type:inline-size]"
    >
      {type ? (
        <span className="text-[11px] leading-none font-medium tracking-[0.12em] text-fern uppercase">{type}</span>
      ) : (
        <span />
      )}
      <div>
        <span className="mb-3 block h-1 w-7 rounded-full bg-fern" />
        <p className="ju-display m-0 line-clamp-3 text-[clamp(18px,9.6cqw,34px)] leading-none text-newsprint">{title}</p>
      </div>
    </div>
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
      className="ju-card ju-card-frame group relative flex h-[360px] w-[240px] flex-col overflow-hidden rounded-card bg-ju-moss p-5 no-underline"
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
