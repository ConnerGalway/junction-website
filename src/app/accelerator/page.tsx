import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  Stat,
  TextLink,
  cx,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { TaskChecklist, type Task } from "./TaskChecklist";

export const metadata: Metadata = {
  title: "The Accelerator",
  description:
    "We score your digital marketing, build the plan with you, and reassess along the way so you can see the score move.",
};

const scoreData = [
  { label: "Website & technical", value: 78 },
  { label: "Reviews & reputation", value: 71 },
  { label: "Booking & conversion", value: 80 },
  { label: "Social media & content", value: 62 },
  { label: "Customer experience", value: 84 },
  { label: "Local visibility", value: 81 },
];

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
    label: "Touchpoint 1 · Start",
    title: "Assessment and strategy",
    description:
      "We walk through your score, agree the goal, and hand over your plan.",
  },
  {
    label: "Touchpoint 2 · Midway",
    title: "Reassess and adjust",
    description:
      "A fresh score, a look at what's working, and changes to the plan where it isn't.",
  },
  {
    label: "Touchpoint 3 · Day 90",
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

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid items-center gap-3 type-small text-(--tone-text) [grid-template-columns:minmax(0,1.3fr)_minmax(0,1fr)_34px]">
      <span>{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-hairline" aria-hidden="true">
        <div
          className={cx("h-full rounded-full", value < 70 ? "bg-break" : "bg-canopy")}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

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
      <Section spacing="tight">
        <Container className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <Eyebrow className="mb-5">
              The Accelerator · 90 days · small businesses
            </Eyebrow>
            <h1 className="type-display m-0">
              A 90-day marketing plan you&apos;ll actually work.
            </h1>
            <p className="type-lead text-muted mt-7 mb-8">
              We score your digital marketing, build the plan with you, and
              reassess along the way so you can see the score move. The plan
              lives online: a week-by-week roadmap, step-by-step guides, and
              checklists that save as you go.
            </p>
            <div className="mb-2.5">
              <p className="type-price m-0">$2,500</p>
              <p className="type-small m-0 mt-2">3 coaching sessions · 90-day plan</p>
            </div>
            <p className="type-small mt-0 mb-7">
              Some industry and regional partners cover 25–100%. Ask on the call.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="#plan" className="whitespace-nowrap">
                Try a week of the plan ↓
              </TextLink>
            </div>
          </div>

          {/* Assessment Preview */}
          <Card className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow as="span">Your digital assessment</Eyebrow>
              <span className="type-small">Sample client</span>
            </div>
            <div className="flex items-end gap-4">
              <span className="type-stat text-[clamp(72px,7vw,112px)]">74</span>
              <span className="type-small pb-1.5">/ 100 overall</span>
            </div>
            <div className="flex flex-col gap-3">
              {scoreData.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
            <p className="tone-sage type-small m-0 rounded-card px-4 py-3.5">
              <strong className="font-medium">Next step · Week 1:</strong>{" "}
              clean up your analytics before spending anything on ads.
            </p>
          </Card>
        </Container>
      </Section>

      {/* What you get */}
      <Section className="border-t border-hairline">
        <Container className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <Eyebrow className="mb-4">What you get</Eyebrow>
            <h2 className="type-h2 mt-0 mb-6">
              A plan with your name on every task.
            </h2>
            <p className="type-body text-muted m-0 max-w-[42ch]">
              Every task says how long it takes, who does it, and how to do it.
              If a step needs a contractor, the plan includes the brief and a
              price range.
            </p>
          </div>
          <div className="border-t-2 border-(--tone-rule)">
            {deliverables.map((item) => (
              <div
                key={item.num}
                className="grid grid-cols-[56px_1fr] border-b border-hairline py-[22px]"
              >
                <span className="type-numeral">{item.num}</span>
                <div>
                  <h3 className="type-h4 mt-0 mb-1.5">{item.title}</h3>
                  <p className="type-body text-muted m-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Plan Demo */}
      <Section id="plan" tone="carbon" className="scroll-mt-24">
        <Container className="grid items-center gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <Eyebrow className="mb-[18px]">Try it</Eyebrow>
            <h2 className="type-h2 mt-0 mb-6">
              This is what week one looks like.
            </h2>
            <p className="type-body text-muted mt-0 mb-7 max-w-[42ch]">
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
          <Eyebrow className="mb-4">How the 90 days run</Eyebrow>
          <h2 className="type-h2 mt-0 mb-9">
            Three touchpoints. One score that moves.
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
            {touchpoints.map((tp) => (
              <Card key={tp.label}>
                <p className="type-eyebrow m-0">{tp.label}</p>
                <h3 className="type-h4 mt-2.5 mb-2">{tp.title}</h3>
                <p className="type-body text-muted m-0">{tp.description}</p>
              </Card>
            ))}
          </div>
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
        <Container className="grid gap-x-12 gap-y-8 border-t-2 border-(--tone-rule) pt-9 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <p className="type-h4 mt-0 mb-2">{faq.q}</p>
              <p className="type-body text-muted m-0">{faq.a}</p>
            </div>
          ))}
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
