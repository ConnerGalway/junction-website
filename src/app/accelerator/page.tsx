import type { Metadata } from "next";
import {
  Badge,
  Button,
  Chip,
  Card,
  Container,
  Placeholder,
  Section,
  Stat,
  TextLink,
  cx,
} from "@/components";
import { DashboardPreview } from "@/components/DashboardPreview";
import { CALENDLY_URL } from "@/lib/constants";
import { QuickScore } from "./QuickScore";
import { TaskChecklist, type Task } from "./TaskChecklist";
import { VideoPlayer } from "./VideoPlayer";

export const metadata: Metadata = {
  title: "The Accelerator",
  description:
    "We score your digital marketing, build the plan with you, and reassess along the way so you can see the score move.",
};

const deliverables = [
  {
    num: "01",
    title: "A scored digital assessment",
    description:
      "Your website, reviews, booking and conversion, social, customer experience and local visibility, each scored with specific findings.",
  },
  {
    num: "02",
    title: "A strategy built around your goal",
    description:
      "Positioning, objectives and the tactics that matter for your budget, worked out with you in a coaching session.",
  },
  {
    num: "03",
    title: "An interactive 90-day plan",
    description:
      "A 12-week roadmap with quick wins, how-to guides and checklists. Your progress saves automatically.",
  },
  {
    num: "04",
    title: "Three coaching touchpoints",
    description:
      "Time with your coach at the start, along the way and at the finish, to unstick what's stuck.",
  },
  {
    num: "05",
    title: "Reassessments that track progress",
    description:
      "We re-score your marketing so you can see exactly what moved, and show it to your partners or your board.",
  },
];

/** The six areas the assessment scores (chips on step 01). */
const scoredAreas = [
  "Website",
  "Reviews",
  "Booking",
  "Social",
  "Customer experience",
  "Local visibility",
];

const taskData: Task[] = [
  { label: "Filter bot traffic out of your analytics", meta: "20 min · You" },
  {
    label: "Mark real enquiries and bookings as conversions",
    meta: "20 min · You",
  },
  { label: "Take expired offers off your homepage", meta: "15 min · You" },
  {
    label: "Record a clean 30-day baseline",
    meta: "30 min · You or your developer",
  },
];

const touchpoints = [
  {
    day: "Day 1",
    title: "Assessment and strategy",
    description:
      "We walk through your score, agree the goal, and hand over your plan.",
  },
  {
    day: "Day 45",
    title: "Reassess and adjust",
    description:
      "A fresh score, a look at what's working, and changes to the plan where it isn't.",
  },
  {
    day: "Day 90",
    title: "Final score and what's next",
    description:
      "Before and after, side by side, plus a plan for keeping it going on your own.",
  },
];

const faqs = [
  {
    q: "Who is it for?",
    a: "Small businesses in any industry with a website, real customers, and no marketing team.",
  },
  {
    q: "How much time does it take?",
    a: "Plan on two to three hours a week. Each task tells you how long it takes and who should do it.",
  },
  {
    q: "What happens after day 90?",
    a: "You keep the plan, the guides and your progress. Many teams follow it with the AI Accelerator.",
  },
];

const phases = [
  { weeks: "Weeks 1–3", name: "Foundation" },
  { weeks: "Weeks 4–6", name: "Build" },
  { weeks: "Weeks 7–9", name: "Launch" },
  { weeks: "Weeks 10–12", name: "Scale" },
];

export default function AcceleratorPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight" className="overflow-hidden">
        <Container className="grid items-center gap-x-[clamp(32px,5vw,72px)] gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <h1 className="type-display m-0">
              A 90-day marketing plan you&apos;ll actually work.
            </h1>
            <p className="type-lead mt-7 mb-8">
              We score your digital marketing, build the plan with you, and
              reassess along the way so you can see the score move.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="type-price m-0 text-[56px]">$2,500</p>
              <p className="type-price m-0 text-[28px]">90 days · small businesses</p>
            </div>
            <p className="type-small mt-3 mb-8 max-w-[44ch]">
              3 coaching sessions · 90-day plan. Some industry and regional
              partners cover 25–100%. Ask on the call.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="#quick-score" className="whitespace-nowrap">
                Get your free score in 3 minutes ↓
              </TextLink>
            </div>
          </div>

          {/*
            Product preview. 1024px+: bleeds off the right edge (clipped by the
            section). 768–1023px: under the text at full container width.
            Hidden below 768px. The padding keeps the shadow inside the
            bottom-fade mask.
          */}
          <div className="hidden md:block">
            <div className="fade-out-bottom -m-10 p-10 lg:w-[calc(max(100%,min(62vw,920px))+80px)]">
              <DashboardPreview />
            </div>
          </div>
        </Container>
      </Section>

      {/* Video */}
      <Section flush="top">
        <Container className="grid items-center gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* TODO: pass src, poster and duration once the video is ready. */}
          <VideoPlayer duration="[ 0:00 ]" label="See how it works" />
          <div>
            <h2 className="type-h3 m-0 mb-3">See how it works.</h2>
            <p className="type-body m-0">[ One line about what the video shows ]</p>
          </div>
        </Container>
      </Section>

      {/* Steps + quick score */}
      <Section id="quick-score" className="scroll-mt-24">
        <Container className="grid items-start gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div>
            <h2 className="type-h2 m-0 mb-6">A plan with your name on every task.</h2>
            <p className="type-body m-0 max-w-[42ch]">
              Every task says how long it takes, who does it, and how to do it.
              If a step needs a contractor, the plan includes the brief and a
              price range.
            </p>
            <ol className="m-0 mt-9 list-none border-t-2 border-(--tone-rule) p-0">
              {deliverables.map((item, i) => (
                // Focusable so keyboard users can bring a dimmed row forward.
                <li
                  key={item.num}
                  tabIndex={0}
                  className="dim-row grid grid-cols-[64px_minmax(0,1fr)] border-b border-hairline py-6"
                >
                  <span className="type-numeral">{item.num}</span>
                  <div>
                    <h3 className="type-h4 mt-0 mb-1.5">{item.title}</h3>
                    <p className="type-body m-0">{item.description}</p>
                    {i === 0 && (
                      <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Areas scored">
                        {scoredAreas.map((area) => (
                          <li key={area}>
                            <Chip>{area}</Chip>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sticky while the steps scroll past */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="type-h4 m-0">Get your free quick score</h3>
              <Badge>Quick check · a general snapshot</Badge>
            </div>
            <QuickScore />
          </div>
        </Container>
      </Section>

      {/* Plan Demo */}
      <Section id="plan" tone="forest" className="scroll-mt-24">
        <Container className="grid items-center gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <h2 className="type-h2 mt-0 mb-6">
              This is what week one looks like.
            </h2>
            <p className="type-body mt-0 mb-7 max-w-[42ch]">
              Tick the tasks off. In the real plan, every week works like this,
              and your coach sees your progress before each session.
            </p>
            <div className="type-small grid grid-cols-2 gap-0.5 overflow-hidden rounded-card sm:grid-cols-4">
              {phases.map((phase, i) => (
                <div
                  key={phase.weeks}
                  className={cx(
                    "p-3",
                    i === 0 ? "bg-fern text-carbon" : "bg-hairline-dark text-newsprint"
                  )}
                >
                  <div className="font-medium">{phase.weeks}</div>
                  <div>{phase.name}</div>
                </div>
              ))}
            </div>
          </div>
          <TaskChecklist tasks={taskData} />
        </Container>
      </Section>

      {/* Touchpoints */}
      <Section>
        <Container>
          <h2 className="type-h2 mt-0 mb-9">Three touchpoints along the way.</h2>
          <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {touchpoints.map((tp, i) => (
              <li key={tp.day} className="flex">
                <Card
                  tone={i === 2 ? "carbon" : "default"}
                  className="relative flex w-full flex-col overflow-hidden"
                >
                  {/* Ghost numeral, clipped by the card */}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "pointer-events-none absolute -top-10 right-2 font-wordmark text-[240px] leading-none select-none",
                      i === 2 ? "text-newsprint/7" : "text-carbon/6"
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className="type-numeral relative m-0 text-[40px]">{tp.day}</p>
                  <h3 className="type-h4 relative mt-4 mb-2">{tp.title}</h3>
                  <p className="type-body relative m-0">{tp.description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Proof */}
      <Section flush="top">
        <Container className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <Card tone="carbon" className="flex flex-col gap-2.5">
            <Stat value="+300%" />
            <p className="type-h4 m-0">Past the engagement goal</p>
            <p className="type-small m-0">
              Accelerator rolled out across a provincial association&apos;s member
              businesses, with bookings up inside three months.
            </p>
          </Card>
          <Placeholder className="min-h-[220px] flex-col gap-6">
            <span>[ Score change from a recent client, e.g. 58 → 81 ]</span>
            <span>[ Business name · industry ]</span>
          </Placeholder>
          <Placeholder className="min-h-[220px] flex-col gap-6">
            <span>[ Testimonial ]</span>
            <span>[ Owner name · business ]</span>
          </Placeholder>
        </Container>
      </Section>

      {/* FAQ */}
      <Section flush="top">
        <Container className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 className="type-h2 m-0">Questions.</h2>
          <div className="divide-y divide-hairline border-t-2 border-(--tone-rule)">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="type-h4 mt-0 mb-2">{faq.q}</h3>
                <p className="type-body m-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            Find out your score in the first week.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href={CALENDLY_URL}>Book a 20-min call</Button>
            <TextLink href="/contact?type=accelerator">
              Or send us the details →
            </TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
