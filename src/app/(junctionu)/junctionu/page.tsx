import type { Metadata } from "next";
import { CourseCard, JuHero, Shelf, WorkshopCard } from "@/components/junctionu";
import { COURSES, JU_SEE_ALL, WORKSHOPS } from "@/lib/junctionu";

export const metadata: Metadata = {
  title: "JunctionU",
  description:
    "Certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in something you can do today. 2,000+ people are in.",
};

/**
 * JunctionU (sub-brand; see DESIGN_SYSTEM.md "JunctionU sub-brand").
 * One Mint button on the page (Start free); every other section has one action.
 */
export default function JunctionUPage() {
  return (
    <>
      <JuHero />
      {/* The catalogue: "Start free" and Browse land here */}
      <div id="catalogue" className="scroll-mt-16 pt-6">
        <Shelf id="courses" title="Start here" seeAll={{ href: JU_SEE_ALL.courses }}>
          {COURSES.map((course, i) => (
            <li key={course.title}>
              <CourseCard course={course} index={i} />
            </li>
          ))}
        </Shelf>
        <Shelf id="workshops" title="Workshops" seeAll={{ href: JU_SEE_ALL.workshops }}>
          {WORKSHOPS.map((workshop, i) => (
            <li key={workshop.title}>
              <WorkshopCard workshop={workshop} index={i} />
            </li>
          ))}
        </Shelf>
      </div>
    </>
  );
}
