import type { Metadata } from "next";
import {
  Button,
  Container,
  QuoteCard,
  Section,
  TextLink,
} from "@/components";
import { CourseCatalogue, type Course } from "./CourseCatalogue";

export const metadata: Metadata = {
  title: "JunctionU",
  description:
    "Certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in something you can do today. 2,000+ people are in.",
};

const allCourses: Course[] = [
  {
    code: "JU 101",
    title: "Tourism Digital Marketing Essentials",
    kind: "Certificate",
    blurb:
      "The full foundation: website, Google profile, reviews, email and social, in plain language.",
    meta: "8 modules · 6 hrs",
    price: "$349",
  },
  {
    code: "JU 120",
    title: "AI for Tourism Operators",
    kind: "Certificate",
    blurb:
      "Where AI pays off in a small business, and where it wastes your month.",
    meta: "6 modules · 4 hrs",
    price: "$349",
  },
  {
    code: "JU 130",
    title: "Sustainable Tourism",
    kind: "Certificate",
    blurb:
      "A sustainability practice guests can feel and your marketing can honestly claim.",
    meta: "6 modules · 4 hrs",
    price: "$349",
  },
  {
    code: "WS 01",
    title: "Your Google Business Profile, Fixed",
    kind: "Workshop",
    blurb:
      "Ninety hands-on minutes. Leave with your profile complete and working for you.",
    meta: "Live · 90 min",
    price: "$79",
  },
  {
    code: "WS 02",
    title: "Email That Gets Opened",
    kind: "Workshop",
    blurb:
      "Welcome, pre-arrival, win-back: build all three in one working session.",
    meta: "Live · 2 hrs",
    price: "$79",
  },
  {
    code: "TT",
    title: "Tourism Talks",
    kind: "Free",
    blurb:
      "Candid conversations with marketers doing the work: Nimmo Bay, SuperNatural BC and more.",
    meta: "Video series",
    price: "Free",
  },
];

const filters = ["All", "Certificates", "Workshops", "Free"];

export default function JunctionUPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="forest" spacing="tight">
        <Container className="grid items-end gap-x-[72px] gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div>
            <h1 className="type-display m-0">
              Training that fits between two guest check-ins.
            </h1>
          </div>
          <div>
            <p className="type-lead m-0 mb-8">
              Certificate courses, workshops and free Tourism Talks, built for
              tourism professionals. Lessons run under an hour and every one
              ends in something you can do today. 2,000+ people are in.
            </p>
            <p className="type-small m-0 -mt-5 mb-8">Formerly eLearningU</p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="#catalogue">Start free</Button>
              <TextLink href="#catalogue">Browse the catalogue →</TextLink>
            </div>
            <p className="type-small m-0 mt-5">
              Free account: Tourism Talks plus a starter course. No card.
            </p>
          </div>
        </Container>
      </Section>

      {/* Catalogue */}
      <Section id="catalogue" className="scroll-mt-24">
        <Container>
          <CourseCatalogue
            courses={allCourses}
            filters={filters}
            heading={
              <div>
                <h2 className="type-h2 m-0">Pick a course.</h2>
              </div>
            }
          />
          <p className="type-small m-0 mt-7">
            Checkout happens right here. Card in, certificate out, no separate
            platform.
          </p>
        </Container>
      </Section>

      {/* For DMOs */}
      <Section>
        <Container className="grid items-center gap-x-20 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <h2 className="type-h2 m-0 mb-5">Fund seats for your whole region.</h2>
            <p className="type-body m-0 mb-8 max-w-[48ch]">
              Partners cover 25% to 100% of course costs for their operators. We
              handle delivery, support and progress reporting. Travel Yukon has
              run it for four years, and 300+ businesses came through.
            </p>
            <Button href="/programs">Become a partner</Button>
          </div>
          <QuoteCard
            quote={
              <>
                &quot;Functional, accessible, and personalized. Incredibly valuable
                education for our tourism sector.&quot;
              </>
            }
            caption="Avery Bramadat, Senior Tourism Development Advisor, Travel Yukon"
          />
        </Container>
      </Section>
    </>
  );
}
