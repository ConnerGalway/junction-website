import type { Metadata } from "next";
import { CourseCard, DmoPanel, EmailBand, JuHero, ScanTeaser, Shelf, TalkCard, WorkshopCard } from "@/components/junctionu";
import { COURSES, JU_SEE_ALL, WORKSHOPS } from "@/lib/junctionu";
import { SHOW_ELU_EMAIL_BAND } from "@/lib/flags";
import { withStills } from "@/lib/junctionuImages";
import { getTalks } from "@/lib/junctionuTalks";

export const metadata: Metadata = {
  title: "eLearningU",
  description:
    "eLearningU is Junction's online school for tourism: certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in something you can do today.",
};

/**
 * eLearningU storefront (/elearningu; sub-brand, see DESIGN_SYSTEM.md
 * "eLearningU sub-brand"). Every product links out to its eLearningU page.
 * One Mint button on the page (Start free); every other section has one action.
 * Code names (JunctionUPage, Ju* components, ju-* tokens) stay.
 */
export default async function JunctionUPage() {
  const talks = await getTalks();
  return (
    <>
      <JuHero />
      {/* The catalogue: "Start free" and Browse land here */}
      <div id="catalogue" className="scroll-mt-16 pt-6">
        <Shelf id="courses" title="Start here" seeAll={{ href: JU_SEE_ALL.courses }}>
          {withStills(COURSES).map((course, i) => (
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
        <Shelf
          id="talks"
          title={
            <>
              Tourism Talks <span className="text-sage">· free</span>
            </>
          }
          seeAll={{ href: JU_SEE_ALL.talks }}
        >
          {talks.map((talk) => (
            <li key={talk.id}>
              <TalkCard talk={talk} />
            </li>
          ))}
        </Shelf>
      </div>

      <DmoPanel />
      <ScanTeaser />
      {/* Hidden: SHOW_ELU_EMAIL_BAND (its signup isn't wired to a list yet) */}
      {SHOW_ELU_EMAIL_BAND && <EmailBand />}
    </>
  );
}
