import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Callout,
  Card,
  Chip,
  Container,
  Eyebrow,
  Placeholder,
  QuoteCard,
  Section,
  Stat,
  TextLink,
  LogoWall,
} from "@/components";
import { HeroWordmark } from "@/components/HeroWordmark";
import { CALENDLY_URL } from "@/lib/constants";
import { SHOW_HERO_WORDMARK } from "@/lib/flags";
import { homeLogos } from "@/lib/logos";
import { ProgramOrbit, type OrbitProgram } from "./ProgramOrbit";

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

/** Find your program: same order as the Programs submenu. */
const programs: OrbitProgram[] = [
  {
    title: "The Accelerator",
    description: "For small businesses that need a marketing plan they'll work.",
    price: "$2,500 · 90 days",
    href: "/accelerator",
    media: "Accelerator dashboard",
    thumbnail: "dashboard",
  },
  {
    title: "Offload Program (AI Accelerator)",
    description: "For any business losing hours to admin.",
    price: "$5,000 · 30 days",
    href: "/ai-accelerator",
    media: "Offload Program mockup",
  },
  {
    title: "Speaking",
    description: "For event organizers who want the room to leave with a plan.",
    price: "Keynote · Workshop · Virtual",
    href: "/speaking",
    media: "Speaking photo",
  },
  {
    title: "Custom Training",
    description: "For organizations training their members or their leaders.",
    price: "Scoped to you",
    href: "/custom-training",
    media: "Custom Training photo",
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

/** Existing metrics from the AI example; results to come. */
const caseStats = [
  { value: "65%", label: "Collected in 30 days" },
  { value: "Up to 1 day", label: "Quote turnaround" },
];

const TRAINING_PLAYLIST_URL =
  "https://youtube.com/playlist?list=PLUvaA_x2Z8df8djNodScqE1XZTFz8a16f";

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
      {SHOW_HERO_WORDMARK && <HeroWordmark />}

      {/* Hero */}
      <section className="relative overflow-hidden pb-section-tight">
        <div className="relative pt-[clamp(72px,9vw,128px)]">
          <div className="px-gutter">
            {/* 1024px+: text and photo side by side, at least 48px apart (56px
                gap, which allows for the photo's tilt); the photo shrinks
                rather than overlapping the headline. */}
            <Container className="lg:flex lg:items-center lg:gap-14">
              <div className="lg:shrink-0">
                {/* 10.3em holds the headline to three lines at display size */}
                <h1 className="type-display m-0 max-w-[10.3em]">
                  Feeling stuck? Let&apos;s get your organization moving.
                </h1>
                <p className="type-lead mt-7 mb-10 max-w-[40ch]">
                  We find the bottleneck, put the right tools to work, and get your
                  people confident running them.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <Button href={CALENDLY_URL}>Book a 20-min call</Button>
                  <TextLink href="#programs" className="whitespace-nowrap">
                    Find your program ↓
                  </TextLink>
                </div>
              </div>

              {/* Team photo: in the flow under the buttons below 1024px */}
              <div className="lg:flex lg:min-w-0 lg:flex-1 lg:justify-end lg:pr-[4%] xl:pr-[1%]">
                <div className="relative mt-14 ml-auto h-[240px] w-[200px] -rotate-[1.5deg] overflow-hidden rounded-card shadow-card lg:mt-0 lg:ml-0 lg:aspect-[5/6] lg:h-auto lg:w-full lg:max-w-[220px] xl:max-w-[300px]">
                  <Image
                    src="/images/home-hero-team.jpg"
                    alt="The Junction team working around a table"
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 220px, 200px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Organizations strip: logos fade out behind the label */}
      <section className="px-gutter py-8">
        <Container className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          <span className="shrink-0 text-[15px] font-medium text-flint md:pr-2">
            Organizations we work with
          </span>
          <LogoWall
            variant="marquee"
            logos={homeLogos}
            label="Organizations we work with"
            className="min-w-0 flex-1 [-webkit-mask-image:linear-gradient(to_right,transparent,black_16%,black_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_16%,black_94%,transparent)]"
          />
        </Container>
      </section>

      {/* Where organizations get stuck */}
      <Section>
        <Container>
          <h2 className="type-h2 m-0">Where organizations get stuck.</h2>
          <p className="type-lead m-0 mt-4 max-w-[44ch]">
            Usually, it&apos;s technology that isn&apos;t pulling its weight yet.
          </p>
          <ol className="mt-9 mb-0 grid list-none gap-x-8 gap-y-10 border-t-2 border-(--tone-rule) p-0 pt-9 sm:grid-cols-2 lg:grid-cols-5">
            {stuckItems.map((item) => (
              <li key={item.num}>
                <span className="type-numeral">{item.num}</span>
                <h3 className="type-h4 mt-3 mb-2">{item.title}</h3>
                <p className="type-body m-0">{item.description}</p>
              </li>
            ))}
          </ol>
          <Callout className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="type-body m-0 font-medium">
              We start with the one costing you most, fix it, and build from there.
            </p>
            <TextLink href="#programs" className="whitespace-nowrap">
              Find your program →
            </TextLink>
          </Callout>
        </Container>
      </Section>

      {/* Find your program: orbit carousel */}
      <Section id="programs" tone="carbon" className="scroll-mt-24 overflow-hidden">
        <Container>
          <ProgramOrbit
            programs={programs}
            headingId="programs-heading"
            heading={
              <h2 id="programs-heading" className="type-h2 m-0">
                Find your program.
              </h2>
            }
          />
        </Container>
      </Section>

      {/* Case study */}
      <Section tone="forest">
        <Container>
          <div className="grid items-start gap-x-20 gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Chip variant="fern-outline">Case study</Chip>
                <Eyebrow as="span">Offload Program · Building supply · 7 people</Eyebrow>
              </div>
              <h2 className="type-h2 m-0 mb-6">A building supplier&apos;s 30 days.</h2>
              <p className="type-body m-0 mb-12">
                A family-owned supply yard brought seven people, from the president
                to accounts payable. Only 65% of invoices were collected inside 30
                days, and quotes took anywhere from five minutes to a day. Here&apos;s
                what they left with.
              </p>

              <div className="flex flex-wrap gap-x-14 gap-y-10">
                {caseStats.map((stat) => (
                  <div key={stat.label}>
                    <Stat value={stat.value} label={stat.label} maxSize="clamp(64px, 6vw, 88px)" />
                    <Placeholder className="mt-4 w-fit px-3 py-1.5">[ result ]</Placeholder>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Placeholder aspectRatio="16/10" className="mb-10">
                [ Animated demo: handwritten list → clean line items ]
              </Placeholder>
              <ul className="m-0 grid list-none gap-x-8 gap-y-8 p-0 sm:grid-cols-2">
                {aiExampleSteps.map((step) => (
                  <li key={step.num}>
                    <span className="type-numeral">{step.num}</span>
                    <h3 className="type-h4 mt-3 mb-1.5">{step.title}</h3>
                    <p className="type-small m-0">{step.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <TextLink href="/ai-accelerator" className="mt-14 inline-block">
            See the Offload Program →
          </TextLink>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section aria-label="What clients say">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <QuoteCard
            className="flex min-h-[340px] flex-col justify-between"
            quote={
              <>
                &quot;We are a stronger, smarter organization today thanks to
                the work we did with Junction.&quot;
              </>
            }
            caption="Kathy Cooper, CEO, Kootenay Rockies Tourism"
          />
          <div className="flex flex-col gap-6">
            <Placeholder className="min-h-[158px] flex-1 flex-col items-start justify-between gap-6 text-left">
              <span>[ Testimonial + result ]</span>
              <span className="normal-case tracking-normal text-(--tone-text)">
                Twin Lions Contracting · AI Accelerator
              </span>
            </Placeholder>
            <Placeholder className="min-h-[158px] flex-1 flex-col items-start justify-between gap-6 text-left">
              <span>[ Testimonial + result ]</span>
              <span className="normal-case tracking-normal text-(--tone-text)">
                West Coast Homes · AI Accelerator
              </span>
            </Placeholder>
          </div>
        </Container>
      </Section>

      {/* What happens on the call */}
      <Section>
        <Container className="grid items-start gap-x-16 gap-y-12 border-t-2 border-(--tone-rule) pt-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h2 className="type-h2 m-0 mb-10">What happens on the call.</h2>
            <ol className="m-0 grid list-none gap-x-10 gap-y-9 p-0 md:grid-cols-3">
              {callSteps.map((step) => (
                <li key={step.num}>
                  <span className="type-numeral mb-3 block">{step.num}</span>
                  <h3 className="type-h4 m-0 mb-1.5">{step.title}</h3>
                  <p className="type-body m-0">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Not ready for a call: free training sessions on YouTube */}
          <Card
            tone="carbon"
            href={TRAINING_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Not ready for a call? Watch a free training session (opens YouTube in a new tab)"
            className="flex flex-col gap-4"
          >
            <div className="relative flex aspect-video w-full items-center justify-center rounded-control border-[1.5px] border-dashed border-hairline-dark">
              <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" className="text-newsprint">
                <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 13.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </div>
            <p className="type-body m-0 text-newsprint">
              <span className="font-medium text-fern">Not ready for a call?</span>{" "}
              Watch a free training session and see how we teach.
            </p>
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
