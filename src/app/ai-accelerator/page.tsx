import type { Metadata } from "next";
import {
  Badge,
  Button,
  Card,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  TextLink,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { FaqAccordion, type Faq } from "./FaqAccordion";

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

const faqs: Faq[] = [
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

const tableCols =
  "[grid-template-columns:minmax(88px,0.6fr)_minmax(0,1.4fr)_minmax(0,1fr)]";

export default function AIAcceleratorPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Eyebrow as="span">
                Offload Program (AI Accelerator) · 30 days · any industry
              </Eyebrow>
              <Badge variant="filled">New</Badge>
            </div>
            <h1 className="type-display m-0">
              We automate one of your bottlenecks in 30 days. Guaranteed.
            </h1>
            <p className="type-lead text-muted mt-7 mb-8">
              A hands-on program for leadership teams. Four one-hour sessions on
              your real work. You leave with AI tools already running, and a team
              that knows how to build the next one.
            </p>
            <div className="mb-8">
              <p className="type-price m-0">$5,000</p>
              <p className="type-small m-0 mt-2">per team · on site or Zoom</p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="#example" className="whitespace-nowrap">
                See a real program ↓
              </TextLink>
            </div>
          </div>

          {/* Dashboard Preview */}
          <Card tone="carbon" className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow as="span">Your program dashboard</Eyebrow>
              <span className="type-small">3 of 4 sessions done</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-hairline-dark">
              <div className="h-full rounded-full bg-fern" style={{ width: "75%" }} />
            </div>
            <div className="flex flex-col">
              {[
                { label: "Week 0 · Setup", status: "Done" },
                { label: "Session 1 · Foundations", status: "Done" },
                { label: "Session 2 · Business brain", status: "Done" },
                { label: "Session 3 · Documents", status: "Done" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 border-b border-(--tone-hairline) py-3"
                >
                  <span className="size-[18px] shrink-0 rounded-sm bg-fern" />
                  <span className="type-small flex-1 text-newsprint">{item.label}</span>
                  <span className="type-small">{item.status}</span>
                </div>
              ))}
              <div className="flex items-center gap-3.5 py-3">
                <span className="size-[18px] shrink-0 rounded-sm border-[1.5px] border-fern" />
                <span className="type-small flex-1 text-newsprint">
                  Session 4 · Build and refine
                </span>
                <span className="type-small text-fern">Next</span>
              </div>
            </div>
            <div className="type-small flex flex-wrap justify-between gap-3 rounded-control bg-fern/12 px-4 py-3.5 text-newsprint">
              <span>Main build: Collections assistant</span>
              <span className="font-medium text-fern">Live</span>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Teams strip */}
      <section className="border-y border-hairline px-gutter py-7">
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="type-eyebrow text-muted">Teams who&apos;ve been through it</span>
          <div className="type-button flex flex-wrap gap-x-8 gap-y-2.5">
            {teams.map((team) => (
              <span key={team}>{team}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <Section>
        <Container className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <Eyebrow className="mb-4">What you leave with</Eyebrow>
            <h2 className="type-h2 m-0 mb-6">Tools that run on Monday morning.</h2>
            <p className="type-body text-muted m-0 max-w-[42ch]">
              Your team learns AI by building with it on the jobs that eat their
              week: quotes, collections, paperwork, admin. Plus a custom dashboard
              and prompt library you keep.
            </p>
          </div>
          <div className="border-t-2 border-(--tone-rule)">
            {deliverables.map((item) => (
              <div
                key={item.num}
                className="grid grid-cols-[56px_1fr] border-b border-(--tone-hairline) py-[22px]"
              >
                <span className="type-numeral">{item.num}</span>
                <div>
                  <h3 className="type-h4 m-0 mb-1.5">{item.title}</h3>
                  <p className="type-body text-muted m-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 30 Days */}
      <Section tone="carbon">
        <Container>
          <Eyebrow className="mb-6">How the 30 days run</Eyebrow>
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
            <p className="type-body text-muted m-0 max-w-[46ch]">
              A family-owned supplier whose president was also covering GM and CFO
              duties. His goal: &quot;Assistant capacity for me without a new hire.&quot;
            </p>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-card border border-hairline">
            <div
              className={`type-eyebrow grid gap-3 bg-carbon px-4 py-4 text-newsprint [overflow-wrap:anywhere] sm:gap-5 sm:px-6 ${tableCols}`}
            >
              <span>Area</span>
              <span>What happened before</span>
              <span>What it cost</span>
            </div>
            {exampleTableData.map((row, i) => (
              <div
                key={i}
                className={`type-body grid max-w-none gap-3 px-4 py-5 text-[15px] leading-normal [overflow-wrap:anywhere] sm:gap-5 sm:px-6 sm:text-[18px] sm:leading-[1.8] ${tableCols} ${
                  i < exampleTableData.length - 1 ? "border-b border-hairline" : ""
                }`}
              >
                <strong className="font-medium">{row.area}</strong>
                <span>{row.before}</span>
                <span>{row.cost}</span>
              </div>
            ))}
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
            <p className="type-body text-muted m-0 mb-[18px]">
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
            <Eyebrow as="h2" className="m-0 mb-3">
              Questions
            </Eyebrow>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            What&apos;s eating your team&apos;s week?
          </h2>
          <p className="type-body text-muted m-0 mt-6 max-w-[46ch]">
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
