import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Placeholder,
  QuoteCard,
  Section,
  TextLink,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Junction | Strategy & Capacity Building" },
  description:
    "When growth stalls, the cause is usually technology that isn't pulling its weight yet: online booking, social media, internal systems, AI.",
};

const stuckItems = [
  {
    num: "01",
    title: "Online booking",
    description: "Enquiries that should have been bookings",
  },
  {
    num: "02",
    title: "Website and search",
    description: "Customers who can't find you, or can't find the answer",
  },
  {
    num: "03",
    title: "Social media",
    description: "Posting when someone has a spare minute",
  },
  {
    num: "04",
    title: "Internal systems",
    description: "The same data keyed in twice, reports built by hand",
  },
  {
    num: "05",
    title: "AI",
    description: "Admin eating the week of your best people",
  },
];

const organizations = [
  "Twin Lions Contracting",
  "West Coast Homes",
  "SMR Plumbing & Heating",
  "Destination BC",
  "Travel Alberta",
  "Travel Maine",
  "Visit Mississippi",
];

const programs = [
  {
    num: "01",
    title: "Offload Program (AI Accelerator)",
    meta: "$5,000 · 30 days",
    tagline: "For any business losing hours to admin.",
    description:
      "Four sessions with your leadership team on your real work. One bottleneck automated by day 30, guaranteed.",
    href: "/ai-accelerator",
    linkText: "See the AI Accelerator →",
  },
  {
    num: "02",
    title: "The Accelerator",
    meta: "$2,500 · 90 days",
    tagline: "For small businesses that need a marketing plan they'll work.",
    description:
      "A scored digital assessment, an interactive 90-day plan, three coaching sessions and reassessments that show your progress.",
    href: "/accelerator",
    linkText: "See the Accelerator →",
  },
  {
    num: "03",
    title: "Custom Training",
    meta: "Scoped to you",
    tagline: "For organizations training their members or their leaders.",
    description:
      "Courses, workshops and series built around your people, with delivery and progress reporting handled for you.",
    href: "/custom-training",
    linkText: "See Custom Training →",
  },
  {
    num: "04",
    title: "Speaking",
    meta: "Keynote · Workshop · Virtual",
    tagline: "For event organizers who want the room to leave with a plan.",
    description:
      "Keynotes and workshops on AI, marketing trends and strategy. Every talk ends with actions people can take that week.",
    href: "/speaking",
    linkText: "See speaking topics →",
  },
];

const aiExampleSteps = [
  {
    num: "01",
    title: "A collections assistant",
    description:
      "Reads the aging report, suggests the next step for each account, and drafts reminders and call notes in the company's voice.",
  },
  {
    num: "02",
    title: "A material list converter",
    description:
      "Turns a photo, text or email of a handwritten list into clean line items for their ERP, and flags anything to confirm.",
  },
  {
    num: "03",
    title: "A business brain",
    description:
      "Price lists, account terms, policies and house style, loaded into one shared AI workspace the whole team uses.",
  },
  {
    num: "04",
    title: "A roadmap for what's next",
    description:
      "Takeoffs, invoice matching and system integration, prioritized for after the program.",
  },
];

const callSteps = [
  {
    num: "01",
    title: "Pick a time",
    description: "Twenty minutes with Conner. No prep, no forms.",
  },
  {
    num: "02",
    title: "Talk about the goal",
    description: "What you want to change, and what's in the way right now.",
  },
  {
    num: "03",
    title: "Get a straight answer",
    description:
      "Which program fits, what it costs, and when it could start. If none fits, we'll say so.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <Eyebrow className="mb-5">Strategy &amp; capacity building</Eyebrow>
            <h1 className="type-display m-0">
              Feeling stuck? Let&apos;s get your organization moving.
            </h1>
            <p className="type-lead mt-7 mb-9">
              When growth stalls, the cause is usually technology that isn&apos;t
              pulling its weight yet: online booking, social media, internal
              systems, AI. We find the bottleneck, put the right tools to work,
              and get your people confident running them.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="#programs" className="whitespace-nowrap">
                Find your program ↓
              </TextLink>
            </div>
          </div>

          {/* Where organizations get stuck panel */}
          <Card tone="carbon">
            <Eyebrow className="mb-3">Where organizations get stuck</Eyebrow>
            <div className="border-t border-(--tone-hairline)">
              {stuckItems.map((item) => (
                <div
                  key={item.num}
                  className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-1 border-b border-(--tone-hairline) py-4"
                >
                  <span className="type-numeral">{item.num}</span>
                  <div>
                    <p className="type-h4 m-0 mb-1">{item.title}</p>
                    <p className="type-small m-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="type-small mb-0 mt-5">
              <span className="font-medium text-fern">
                We start with the one costing you most
              </span>
              , fix it, and build from there.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Organizations strip */}
      <section className="px-gutter py-7 border-y border-hairline">
        <Container className="flex flex-wrap items-center gap-x-10 gap-y-3.5">
          <span className="type-eyebrow text-muted">Organizations we work with</span>
          <div className="type-button flex flex-wrap gap-x-8 gap-y-2.5">
            {organizations.map((org) => (
              <span key={org}>{org}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Programs */}
      <Section id="programs" className="scroll-mt-24">
        <Container>
          <div className="mb-9 grid items-end gap-x-[72px] gap-y-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
            <div>
              <Eyebrow className="mb-4">Four ways in</Eyebrow>
              <h2 className="type-h2 m-0">Find your program.</h2>
            </div>
            <p className="type-body m-0">
              Each one ends with something your team owns: a working tool, a
              plan, a course, or a room full of people with next steps.
            </p>
          </div>

          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]">
            {programs.map((program) => (
              <Card key={program.num} href={program.href}>
                <div className="flex h-full flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="type-numeral">{program.num}</span>
                    <span
                      className={
                        program.meta.startsWith("$") ? "type-price" : "type-eyebrow text-muted"
                      }
                    >
                      {program.meta}
                    </span>
                  </div>
                  <h3 className="type-h3 m-0">{program.title}</h3>
                  <p className="type-small m-0 font-medium text-canopy-text">
                    {program.tagline}
                  </p>
                  <p className="type-body m-0">{program.description}</p>
                  <span className="link type-button mt-auto self-start pt-2 group-hover:text-break-on-light">
                    {program.linkText}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI Example */}
      <Section tone="carbon">
        <Container className="grid items-start gap-[clamp(40px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <Eyebrow className="mb-5">
              Inside an Offload Program (AI Accelerator)
            </Eyebrow>
            <h2 className="type-h2 m-0 mb-6">
              A building supplier&apos;s 30 days.
            </h2>
            <p className="type-body m-0 mb-8">
              A family-owned supply yard brought seven people, from the president
              to accounts payable. Only 65% of invoices were collected inside 30
              days, and quotes took anywhere from five minutes to a day. Here&apos;s
              what they left with.
            </p>

            {/* Metrics */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="card p-5">
                <p className="type-eyebrow text-muted m-0 mb-2">
                  Collected in 30 days
                </p>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="type-numeral">65%</span>
                  <span className="text-(--tone-numeral)" aria-hidden="true">→</span>
                  <Placeholder className="text-newsprint">[ result ]</Placeholder>
                </div>
              </div>
              <div className="card p-5">
                <p className="type-eyebrow text-muted m-0 mb-2">
                  Quote turnaround
                </p>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="type-numeral">Up to 1 day</span>
                  <span className="text-(--tone-numeral)" aria-hidden="true">→</span>
                  <Placeholder className="text-newsprint">[ result ]</Placeholder>
                </div>
              </div>
            </div>

            <TextLink href="/ai-accelerator#example">
              See the full program →
            </TextLink>
          </div>

          {/* Steps */}
          <div className="border-t border-(--tone-hairline)">
            {aiExampleSteps.map((step) => (
              <div
                key={step.num}
                className="grid grid-cols-[48px_1fr] border-b border-(--tone-hairline) py-6"
              >
                <span className="type-numeral">{step.num}</span>
                <div>
                  <h3 className="type-h4 m-0 mb-1.5">{step.title}</h3>
                  <p className="type-small m-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <Eyebrow className="mb-9">What clients say</Eyebrow>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            <Placeholder className="min-h-[220px] flex-col items-start justify-between gap-6 text-left">
              <span>[ Testimonial + result ]</span>
              <span className="normal-case tracking-normal text-(--tone-text)">
                Twin Lions Contracting · AI Accelerator
              </span>
            </Placeholder>
            <Placeholder className="min-h-[220px] flex-col items-start justify-between gap-6 text-left">
              <span>[ Testimonial + result ]</span>
              <span className="normal-case tracking-normal text-(--tone-text)">
                West Coast Homes · AI Accelerator
              </span>
            </Placeholder>
            <QuoteCard
              className="flex min-h-[220px] flex-col justify-between"
              quote={
                <>
                  &quot;We are a stronger, smarter organization today thanks to
                  the work we did with Junction.&quot;
                </>
              }
              caption="Kathy Cooper, CEO, Kootenay Rockies Tourism"
            />
          </div>
        </Container>
      </Section>

      {/* The Call */}
      <Section flush="top">
        <Container className="grid gap-x-12 gap-y-9 border-t-2 border-(--tone-rule) pt-11 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          <div>
            <Eyebrow className="mb-3.5">The first step</Eyebrow>
            <h2 className="type-h3 m-0">What happens on the call.</h2>
          </div>
          {callSteps.map((step) => (
            <div key={step.num}>
              <p className="type-numeral m-0 mb-2">{step.num}</p>
              <h3 className="type-h4 m-0 mb-1.5">{step.title}</h3>
              <p className="type-body m-0">{step.description}</p>
            </div>
          ))}
        </Container>

        {/* Not ready banner */}
        <Container className="mt-10">
          <Card className="flex flex-wrap items-center justify-between gap-4">
            <p className="type-body m-0">
              <strong className="font-medium">Not ready for a call?</strong>{" "}
              Watch a free training session and see how we teach.
            </p>
            <TextLink href="/junctionu" className="whitespace-nowrap">
              Watch free →
            </TextLink>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            Twenty minutes. A straight answer on what fits.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href={CALENDLY_URL}>Book a 20-min call</Button>
            <TextLink href="/contact">Or send us the details →</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
