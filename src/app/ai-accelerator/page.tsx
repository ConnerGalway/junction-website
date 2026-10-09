import type { Metadata } from "next";
import {
  Accordion,
  type AccordionItem,
  Badge,
  Button,
  Chip,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  TextLink,
  LogoWall,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { CASE_INTRO, CASE_MEASURES, CASE_META } from "@/lib/buildingSupplyCase";
import { teamLogos } from "@/lib/logos";
import { CaseSwitcher } from "./CaseSwitcher";
import {
  BrainArtifact,
  MainBuildArtifact,
  PolicyArtifact,
  RoadmapArtifact,
  SecondBuildArtifact,
} from "./KitArtifacts";
import { KitCarousel, type KitItem } from "./KitCarousel";
import { OffloadHeroVisual } from "./OffloadHeroVisual";
import { ThirtyDays, type Session } from "./ThirtyDays";
import { TimeBackCalculator } from "./TimeBackCalculator";

export const metadata: Metadata = {
  title: "Offload Program (AI Accelerator)",
  description:
    "A hands-on program for leadership teams. Four one-hour sessions on your real work. You leave with AI tools already running, and a team that knows how to build the next one.",
};

const teams = ["Twin Lions Contracting", "West Coast Homes", "SMR Plumbing & Heating"];

const deliverables = [
  {
    num: "01",
    title: "A licensed, safe setup",
    description:
      "A shared AI workspace for your leadership team and a one-page AI use policy, in place before anyone loads company data.",
  },
  {
    num: "02",
    title: "Your business brain",
    description:
      "Price lists, terms, policies and the way you write to customers, loaded into one AI project the whole team draws from.",
  },
  {
    num: "03",
    title: "The main build, working",
    description:
      "One bottleneck automated and in daily use by session 4. This is the part we guarantee.",
  },
  {
    num: "04",
    title: "A second build, started",
    description:
      "The next tool underway, with your own people doing the building.",
  },
  {
    num: "05",
    title: "A roadmap for what's next",
    description:
      "The next opportunities to automate, ranked by time saved, so momentum doesn't stop on day 31.",
  },
];

const artifacts = [
  <PolicyArtifact key="1" />,
  <BrainArtifact key="2" />,
  <MainBuildArtifact key="3" />,
  <SecondBuildArtifact key="4" />,
  <RoadmapArtifact key="5" />,
];

const kitItems: KitItem[] = deliverables.map((d, i) => ({ ...d, artifact: artifacts[i] }));

const sessions: Session[] = [
  { day: 1, label: "Week 0", title: "Setup", line: "Accounts, access, baseline numbers." },
  { day: 6, label: "Session 1", title: "Foundations", line: "Safe setup, AI policy, first wins." },
  { day: 13, label: "Session 2", title: "Business brain", line: "Load what your company knows." },
  { day: 20, label: "Session 3", title: "Documents", line: "The paperwork keyed in by hand." },
  { day: 27, label: "Session 4", title: "Build and refine", line: "The main build goes live." },
];

const faqs: AccordionItem[] = [
  {
    q: "Do we need technical people?",
    a: "No. If your team uses email and spreadsheets, they can do this. We pick tools that fit the people in the room, and they do the building with us beside them.",
  },
  {
    q: "Which AI tools do you use?",
    a: "A licensed business AI workspace, chosen in Week 0 to fit your systems, budget and security needs. You own the accounts.",
  },
  {
    q: "Is our company data safe?",
    a: "Session 1 sets up a licensed workspace and a written AI use policy before anyone loads company information.",
  },
  {
    q: "Who should be in the room?",
    a: "The owner or leader who sponsors it, plus the people closest to the bottleneck. Most teams bring four to eight people, and not everyone needs every session.",
  },
  {
    q: "On site or remote?",
    a: "Session 1 runs on site where possible. Sessions 2 to 4 run on site or on Zoom, whichever suits your team.",
  },
  {
    q: "What does it cost?",
    a: "$5,000 per team for the 30 days, including the dashboard, prompt library and roadmap.",
  },
];

export default function AIAcceleratorPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight" className="overflow-hidden">
        <Container className="grid items-center gap-x-[clamp(32px,5vw,72px)] gap-y-14 lg:grid-cols-2 xl:items-start">
          <div>
            <Badge variant="filled" className="mb-6">
              New
            </Badge>
            {/* Three lines from 1280px (explicit breaks). The two long lines
                run over the visual, which starts below the second line. */}
            <h1 className="type-display m-0">
              <span className="xl:whitespace-nowrap">We automate one of your</span>
              <br className="hidden xl:inline" />{" "}
              <span className="xl:whitespace-nowrap">bottlenecks in 30 days.</span>
              <br className="hidden xl:inline" /> <span className="xl:whitespace-nowrap">Guaranteed.</span>
            </h1>
            <p className="type-lead mt-7 mb-8">
              Your team learns AI by building with it on the jobs that eat their
              week: quotes, collections, paperwork, admin.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="type-price m-0 text-[56px]">$5,000</p>
              <p className="type-price m-0 text-[28px]">30 days · any industry</p>
            </div>
            <p className="type-small mt-3 mb-8">Per team · on site or Zoom.</p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="#case-study" className="whitespace-nowrap">
                See a real build ↓
              </TextLink>
            </div>
          </div>

          {/* Badge row (about 50px) + two display lines + a gap */}
          <div className="xl:mt-[calc(var(--hero-line)*2+74px)]">
            <OffloadHeroVisual />
          </div>
        </Container>
      </Section>

      {/* Teams who've been through it */}
      <section className="px-gutter py-8">
        <Container className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <span className="shrink-0 text-[15px] font-medium text-flint">
            Teams who&apos;ve been through it
          </span>
          <LogoWall
            variant="auto"
            logos={teamLogos}
            label="Teams who've been through it"
            className="min-w-0 flex-1"
            marqueeClassName="[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_92%,transparent)]"
          />
        </Container>
      </section>

      {/* What you leave with */}
      <Section className="overflow-hidden">
        <Container>
          <div className="mb-12 grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <h2 className="type-h2 m-0">What you leave with.</h2>
            <p className="type-body m-0 max-w-[46ch]">
              Everything is yours on day 30: the accounts, the tools, the prompts
              and the plan.
            </p>
          </div>
          <KitCarousel items={kitItems} label="What you leave with" initial={2} />
        </Container>
      </Section>

      {/* Calculator */}
      <Section id="calculator" className="scroll-mt-24">
        <Container>
          <TimeBackCalculator />
        </Container>
      </Section>

      {/* Case study */}
      <Section id="case-study" tone="forest" className="scroll-mt-24">
        <Container>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Chip variant="fern-outline">Case study</Chip>
            <Eyebrow as="span">{CASE_META}</Eyebrow>
          </div>
          <div className="mb-12 grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <h2 className="type-h2 m-0">Where they started.</h2>
            <p className="type-body m-0 max-w-[50ch]">{CASE_INTRO}</p>
          </div>

          <CaseSwitcher />

          <h3 className="type-h3 m-0 mt-16 mb-6">What we measured</h3>
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
            {CASE_MEASURES.map((label) => (
              <li key={label} className="border-t-2 border-(--tone-rule) pt-4">
                <p className="type-small m-0 mb-3">{label}</p>
                <p className="m-0 font-wordmark text-[56px] leading-none text-newsprint">[ — ]</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Thirty days */}
      <Section tone="carbon">
        <Container>
          <div className="mb-12 grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <h2 className="type-h2 m-0">Thirty days, five steps.</h2>
            <p className="type-body m-0 max-w-[46ch]">
              Sessions are an hour each. Everything between is your team using
              what we built.
            </p>
          </div>
          <ThirtyDays sessions={sessions} />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section flush="top">
        <Container className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          {teams.map((team) => (
            <Placeholder
              key={team}
              className="min-h-[200px] flex-col items-start! justify-between! gap-6 p-7! text-left!"
            >
              <span>[ Testimonial + result ]</span>
              <span className="type-button text-(--tone-text)">{team}</span>
            </Placeholder>
          ))}
        </Container>
      </Section>

      {/* Guarantee & FAQ */}
      <Section flush="top">
        <Container className="grid items-start gap-x-20 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          {/* Guarantee */}
          <div className="card-pad rounded-card border-2 border-break">
            <Eyebrow variant="highlight" className="mb-4">
              The guarantee
            </Eyebrow>
            <h2 className="type-h3 m-0 mb-[18px]">
              One bottleneck automated and working by day 30.
            </h2>
            <p className="type-body m-0 mb-[18px]">
              We agree on the bottleneck together in Week 0, with a clear
              definition of &quot;working.&quot;
            </p>
            <Placeholder className="justify-start! px-3.5! py-3! text-left!">
              [ Guarantee terms: what happens if it isn&apos;t, e.g. we keep working
              at no cost until it is ]
            </Placeholder>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="type-h2 m-0 mb-6">Questions</h2>
            <Accordion items={faqs} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            What&apos;s eating your team&apos;s week?
          </h2>
          <p className="type-body m-0 mt-6 max-w-[46ch]">
            Bring it to a 20-minute call. We&apos;ll tell you whether it&apos;s a good
            first build, and what 30 days would look like.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-7">
            <Button href={CALENDLY_URL}>Book a 20-min call</Button>
            <TextLink href="/contact?type=ai">Or send us the details →</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
