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
  TextLink,
  LogoWall,
} from "@/components";
import { HeroWordmark } from "@/components/HeroWordmark";
import { CASE_AREAS, CASE_INTRO, CASE_META, CASE_TOOLS } from "@/lib/buildingSupplyCase";
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

/** Existing metrics from the AI example; results to come. */
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

      {/* Case study (teaser; the full story is on /ai-accelerator#case-study) */}
      <Section tone="forest">
        <Container>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Chip variant="fern-outline">Case study</Chip>
            <Eyebrow as="span">{CASE_META}</Eyebrow>
          </div>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-2">
            <h2 className="type-h2 m-0">A building supplier&apos;s 30 days.</h2>
            <p className="type-body m-0 max-w-[50ch]">{CASE_INTRO}</p>
          </div>

          <ul className="m-0 mt-14 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {CASE_AREAS.map((area) => (
              <li key={area.id} className="border-t-2 border-fern pt-4">
                <p className="m-0 text-[12px] font-medium tracking-[0.14em] text-newsprint/65 uppercase">
                  {area.area}
                </p>
                <p className="m-0 mt-3 font-wordmark text-[clamp(56px,5vw,72px)] leading-[0.9] text-newsprint">
                  {area.number}
                </p>
                <p className="type-body m-0 mt-2">{area.numberLabel}</p>
              </li>
            ))}
          </ul>

          <ul className="m-0 mt-14 grid list-none gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {CASE_TOOLS.map((tool) => (
              <li key={tool.name} className="border-t border-newsprint/40 pt-4">
                <h3 className="type-h4 m-0 mb-1.5">{tool.name}</h3>
                <p className="type-small m-0">{tool.line}</p>
              </li>
            ))}
          </ul>

          <TextLink href="/ai-accelerator#case-study" className="mt-12 inline-block">
            See the full story →
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
            padded="sm"
            className="flex flex-col gap-4"
          >
            {/* Cover image: swap public/images/tourism-talks-cover.png on GitHub
                to change it (keep the path and filename; any 16:9 size). */}
            <div className="relative aspect-video w-full overflow-hidden rounded-control">
              <Image
                src="/images/tourism-talks-cover.png"
                alt="Tourism Talks playlist"
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
              <svg
                aria-hidden="true"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="absolute bottom-3 left-3 text-newsprint"
              >
                <circle cx="20" cy="20" r="19" strokeWidth="1.5" className="fill-carbon/40 stroke-current" />
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
