import type { Metadata } from "next";
import {
  Accordion,
  type AccordionItem,
  Badge,
  Button,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  TextLink,
  LogoWall,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { teamLogos } from "@/lib/logos";
import {
  BrainArtifact,
  MainBuildArtifact,
  PolicyArtifact,
  RoadmapArtifact,
  SecondBuildArtifact,
} from "./KitArtifacts";
import { KitCarousel, type KitItem } from "./KitCarousel";
import { OffloadHeroVisual } from "./OffloadHeroVisual";

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

const weeks = [
  {
    week: "Week 0",
    title: "Setup",
    description:
      "Accounts, access, and baseline numbers so we can measure what changes.",
  },
  {
    week: "Session 1",
    title: "Foundations",
    description:
      "On site where possible. Safe setup, your AI policy, and the first quick wins.",
  },
  {
    week: "Session 2",
    title: "Business brain",
    description: "Load what your company knows, so every answer sounds like you.",
  },
  {
    week: "Session 3",
    title: "Documents",
    description: "The quotes, invoices and paperwork that get keyed in by hand.",
  },
  {
    week: "Session 4",
    title: "Build and refine",
    description: "The main build goes live. Roadmap handed over.",
  },
];

const exampleTableData = [
  {
    area: "Collections",
    before: "Terms were 30 days, but only 65% was collected inside 30.",
    cost: "Cash was hard to plan, and the president got pulled into difficult accounts.",
  },
  {
    area: "Quotes",
    before:
      "Material lists arrived handwritten, by text or by email, and codes were typed in by hand.",
    cost: "Each quote took five minutes to a day.",
  },
  {
    area: "Receiving",
    before:
      "PO, supplier invoice and packing slip matched by hand, then keyed in.",
    cost: "The AP role spent its time on data entry.",
  },
  {
    area: "Leadership",
    before: "One person covering three senior roles.",
    cost: "No time left for customers or growth.",
  },
];

const metrics = [
  { label: "30-day collection rate", value: "65%" },
  { label: "Quote turnaround", value: "≤ 1 day" },
  { label: "Leaders using AI daily", value: "1" },
  { label: "Hours saved per leader, weekly", value: "0" },
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

      {/* 30 Days */}
      <Section tone="forest">
        <Container>
          <h2 className="type-h2 m-0 mb-9 max-w-[18ch]">
            Four one-hour sessions. One a week.
          </h2>
          <div className="grid gap-0.5 overflow-hidden rounded-card [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
            {weeks.map((w) => (
              <div key={w.week} className="bg-newsprint/6 p-6">
                <p className="type-eyebrow m-0">{w.week}</p>
                <h3 className="type-h4 my-2">{w.title}</h3>
                <p className="type-small m-0">{w.description}</p>
              </div>
            ))}
          </div>
          <p className="type-small m-0 mt-7">
            We schedule around your busiest hours, so customers aren&apos;t left
            waiting.
          </p>
        </Container>
      </Section>

      {/* Example Program */}
      <Section id="example" className="scroll-mt-24">
        <Container>
          <div className="mb-10 grid items-end gap-x-[72px] gap-y-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
            <div>
              <Eyebrow className="mb-4">
                Example program · building supply · 7 people
              </Eyebrow>
              <h2 className="type-h2 m-0">Where they started.</h2>
            </div>
            <p className="type-body m-0 max-w-[46ch]">
              A family-owned supplier whose president was also covering GM and CFO
              duties. His goal: &quot;Assistant capacity for me without a new hire.&quot;
            </p>
          </div>

          {/* Table */}
          <div className="data-table-frame">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">What happened before</th>
                  <th scope="col">What it cost</th>
                </tr>
              </thead>
              <tbody>
                {exampleTableData.map((row) => (
                  <tr key={row.area}>
                    <th scope="row">{row.area}</th>
                    <td>{row.before}</td>
                    <td>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Metrics */}
          <h3 className="type-h3 m-0 mt-14 mb-6">What we measured.</h3>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {metrics.map((m) => (
              <div key={m.label} className="border-t-2 border-(--tone-rule) pt-4">
                <p className="type-small m-0 mb-2.5">{m.label}</p>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="type-numeral">{m.value}</span>
                  <span aria-hidden="true" className="text-(--tone-numeral)">
                    →
                  </span>
                  <Placeholder className="rounded-control! px-2! py-1!">
                    [ result ]
                  </Placeholder>
                </div>
              </div>
            ))}
          </div>
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
