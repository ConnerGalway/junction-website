import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cx } from "@/components";
import { COURSES, SHELF, courseSlug, type Course, type CourseVariant } from "@/lib/customCourses";

const variantStyle: Record<CourseVariant, { card: string; bar: string; meta: string }> = {
  newsprint: { card: "bg-newsprint text-carbon", bar: "bg-canopy", meta: "text-flint" },
  carbon: { card: "bg-carbon text-newsprint", bar: "bg-fern", meta: "text-newsprint-muted" },
  sage: { card: "bg-sage text-forest", bar: "bg-forest", meta: "text-forest/75" },
  gold: { card: "bg-accent-1 text-carbon", bar: "bg-carbon", meta: "text-carbon/75" },
};

/** A poster file for the course, if one has been added (checked at build time). */
function posterFor(course: Course) {
  if (course.poster) return course.poster;
  const rel = `/images/custom-training/posters/${courseSlug(course.title)}.jpg`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

function CoursePoster({ course }: { course: Course }) {
  const poster = posterFor(course);
  if (poster) {
    return (
      <div className="relative h-[300px] w-[250px] overflow-hidden rounded-card shadow-card">
        <Image src={poster} alt="" fill sizes="250px" className="object-cover" />
      </div>
    );
  }
  const s = variantStyle[course.variant];
  return (
    <div className={cx("flex h-[300px] w-[250px] flex-col justify-between rounded-card p-6 shadow-card", s.card)}>
      <div className="flex items-center justify-between gap-3">
        <span className={cx("text-[11px] font-medium tracking-[0.12em] uppercase", s.meta)}>Built for a client</span>
        <span className={cx("h-1 w-[18px] rounded-full", s.bar)} />
      </div>
      <div>
        <p className="m-0 font-display text-[28px] leading-[1.02] font-black tracking-[-0.03em]">{course.title}</p>
        <p className={cx("m-0 mt-3 text-[11px] font-medium tracking-[0.12em] uppercase", s.meta)}>Custom course</p>
      </div>
    </div>
  );
}

/**
 * Hero course shelf: a row of course posters that bleeds off the right edge
 * and drifts left in a seamless 40s loop (the set is duplicated). Static
 * with reduced motion. Display only: aria-hidden, not focusable, no hover;
 * a visually hidden sentence lists the course titles.
 */
export function CourseShelf({ className }: { className?: string }) {
  const set = (hidden?: boolean) =>
    SHELF.map((course, i) => (
      <li key={`${hidden ? "b" : "a"}-${i}`} className="shrink-0 pr-5">
        <CoursePoster course={course} />
      </li>
    ));
  return (
    <div className={className}>
      <p className="sr-only">
        Recent custom courses include {COURSES.slice(0, -1).join(", ")} and {COURSES.at(-1)}.
      </p>
      <div aria-hidden="true" className="course-shelf pointer-events-none overflow-hidden py-6 select-none">
        <ul className="course-shelf-track m-0 flex w-max list-none p-0">
          {set()}
          {set(true)}
        </ul>
      </div>
    </div>
  );
}
