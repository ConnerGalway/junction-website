import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Callout,
  Container,
  Placeholder,
  QuoteCard,
  Section,
  TextLink,
  LogoWall,
} from "@/components";
import { HeroWordmark } from "@/components/HeroWordmark";
import { CALENDLY_URL } from "@/lib/constants";
import { SHOW_HERO_WORDMARK } from "@/lib/flags";
import { homeLogos } from "@/lib/logos";
import { ProgramOrbit, type OrbitProgram } from "./ProgramOrbit";
import { CourseShelfThumbnail } from "./custom-training/CourseShelf";
import { StageThumbnail } from "./speaking/StageThumbnail";

export const metadata: Metadata = {
  title: { absolute: "Junction | Strategy & Capacity Building" },
  description:
    "When growth stalls, the cause is usually technology that isn't pulling its weight yet: online booking, social media, internal systems, AI.",
};

const stuckItems = [
  {
    num: "01",
    title: "Strategy",
    description: "Are you moving in the right direction?",
  },
  {
    num: "02",
    title: "Online booking",
    description: "Enquiries that should have been bookings",
  },
  {
    num: "03",
    title: "Website and search",
    description: "Customers who can't find you, or can't find the answer",
  },
  {
    num: "04",
    title: "Social media",
    description: "Posting when someone has a spare minute",
  },
  {
    num: "05",
    title: "Internal systems",
    description: "The same data keyed in twice, reports built by hand",
  },
  {
    num: "06",
    title: "AI",
    description: "Admin eating the week of your best people",
  },
];

/** Find your program: same order as the Programs submenu. */
const programs: OrbitProgram[] = [
  {
    title: "The Accelerator",
    description: "For small businesses that need a marketing plan they'll work.",
    href: "/accelerator",
    media: "Accelerator dashboard",
    thumbnail: "dashboard",
  },
  {
    // Carousel only for now; the page title and elsewhere keep "Offload Program" until the name is confirmed.
    title: "AI Training",
    description: "For any business losing hours to admin.",
    href: "/ai-accelerator",
    media: "Offload Program mockup",
    thumbnail: "offload",
  },
  {
    title: "Speaking",
    description: "For event organizers who want the room to leave with a plan.",
    price: "Keynote · Workshop · Virtual",
    href: "/speaking",
    media: "Speaking photo",
    preview: <StageThumbnail />,
  },
  {
    title: "Custom Training",
    description: "For organizations training their members or their leaders.",
    price: "Scoped to you",
    href: "/custom-training",
    media: "Custom Training photo",
    preview: <CourseShelfThumbnail />,
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
          <ol className="mt-9 mb-0 grid list-none gap-x-8 gap-y-10 border-t-2 border-(--tone-rule) p-0 pt-9 sm:grid-cols-2 lg:grid-cols-3">
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
