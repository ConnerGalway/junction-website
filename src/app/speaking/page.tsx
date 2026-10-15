import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  Stat,
  TextLink,
  cx,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { SHOW_SPEAKING_REEL } from "@/lib/flags";
import { AvailabilityForm } from "./AvailabilityForm";
import { ReelPill } from "./ReelPill";
import { SpotlightHero } from "./SpotlightHero";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Keynotes, workshops and virtual sessions on AI, marketing trends and tourism strategy.",
};

/** The 60-second reel: shown only with the flag on and the file in place. */
const REEL = "/images/speaking/reel.mp4";
const showReel = SHOW_SPEAKING_REEL && fs.existsSync(path.join(process.cwd(), "public", REEL));

/** Talk posters (1600×900): public/images/speaking/talk-01.jpg … talk-03.jpg, used once they exist. */
function talkImage(n: number) {
  const rel = `/images/speaking/talk-${String(n).padStart(2, "0")}.jpg`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

const stages = [
  "Northern BC Tourism Summit",
  "TIABC",
  "Yukon Go Digital Summit",
  "BC Craft Beer Conference",
];

const topics = [
  {
    num: "01",
    title: "AI and the work only people can do",
    description:
      "How AI takes the admin so people can spend more time on what they're best at. Real examples from contractors, suppliers and service businesses.",
    audience: "Any industry · leadership teams, associations, conferences",
  },
  {
    num: "02",
    title: "Marketing trends worth acting on",
    description:
      "What's changing in search, social, AI assistants and the creator economy, and which changes deserve a slice of your budget this year.",
    audience: "Marketers, business owners, chambers",
  },
  {
    num: "03",
    title: "Tourism strategy and marketing",
    description:
      "Where visitor demand comes from, what travellers actually search for, and how a region builds marketing capacity that outlasts a campaign.",
    audience: "DMOs, tourism summits, operator events",
  },
];

const formats = [
  { title: "Keynote", length: "30–60 min", description: "30 to 60 minutes, main stage" },
  { title: "Workshop", length: "½ or full day", description: "Half or full day, hands-on" },
  // TODO: confirm the panel / fireside length.
  { title: "Panel or fireside", length: "[ length ]", description: "Moderator or panellist" },
  { title: "Virtual", length: "Any time zone", description: "Live online, any time zone" },
];

export default function SpeakingPage() {
  return (
    <>
      {/* Hero: the spotlight stage */}
      <section className="tone-stage relative overflow-hidden">
        <SpotlightHero className="relative flex min-h-[max(620px,calc(100svh-84px))] flex-col">
          {/* Conner at the podium: bottom-anchored, cropped by the section */}
          <Image
            src="/images/speaking/hero-conner-stage.webp"
            alt="Conner Galway speaking at a podium"
            width={1436}
            height={960}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="speaking-conner pointer-events-none absolute w-auto max-w-none select-none"
          />
          {/* Mobile: a dark wash behind the copy */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[80%] bg-gradient-to-b from-stage via-stage/85 to-transparent md:hidden" />

          <div className="relative z-10 flex-1 px-gutter pt-[clamp(48px,11svh,128px)] pb-[clamp(48px,9svh,96px)]">
            <Container>
              <div className="max-w-[600px]">
                {/* Three lines from 1280px (explicit breaks) */}
                <h1 className="type-display m-0 text-newsprint">
                  <span className="xl:whitespace-nowrap">Talks that send</span>
                  <br className="hidden xl:inline" /> <span className="xl:whitespace-nowrap">the room home</span>
                  <br className="hidden xl:inline" />{" "}
                  <span data-spot-target className="xl:whitespace-nowrap" style={{ opacity: 0.35 }}>
                    with a plan.
                  </span>
                </h1>
                <p className="type-lead mt-7 mb-9 max-w-[38ch] text-newsprint/85">
                  Keynotes, workshops and virtual sessions on AI, marketing trends
                  and tourism strategy. Every talk ends with actions people can take
                  that week.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <Button href="/contact?type=speaking">Check availability for your date</Button>
                  <TextLink href={CALENDLY_URL} className="whitespace-nowrap">
                    Book a 20-min call →
                  </TextLink>
                  {showReel && <ReelPill href={REEL} />}
                </div>
              </div>
            </Container>
          </div>

          {/* Recent stages, pinned to the bottom of the hero */}
          <div className="relative z-10 border-t border-newsprint/10 bg-gradient-to-t from-stage to-stage/70 px-gutter py-5">
            <Container className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="text-[12px] font-medium tracking-[0.14em] text-newsprint/55 uppercase">Recent stages</span>
              <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-3 gap-y-1 p-0 text-[16px] font-medium text-newsprint">
                {stages.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-3">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-newsprint/40">
                        ·
                      </span>
                    )}
                    {s}
                  </li>
                ))}
              </ul>
            </Container>
          </div>
        </SpotlightHero>
      </section>

      {/* Three talks */}
      <Section>
        <Container>
          <h2 className="type-h2 m-0 mb-12">Three talks, tailored to your room.</h2>
          <ol className="m-0 list-none p-0">
            {topics.map((t, i) => {
              const image = talkImage(i + 1);
              return (
                <li
                  key={t.num}
                  className={cx(
                    "grid items-start gap-x-12 gap-y-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]",
                    i === 0 ? "border-t-2 border-(--tone-rule)" : "border-t border-hairline"
                  )}
                >
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[88px_minmax(0,1fr)]">
                    <span className="type-numeral text-[64px] leading-[0.85]">{t.num}</span>
                    <div>
                      <h3 className="m-0 font-display text-[clamp(28px,3vw,40px)] leading-[1.05] font-black tracking-[-0.035em]">
                        {t.title}
                      </h3>
                      <p className="type-body m-0 mt-4 max-w-[52ch]">{t.description}</p>
                      <Eyebrow className="m-0 mt-5">{t.audience}</Eyebrow>
                    </div>
                  </div>
                  {image ? (
                    <div className="relative aspect-video overflow-hidden rounded-card shadow-card">
                      <Image src={image} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                    </div>
                  ) : (
                    <Placeholder aspectRatio="16/9">[ talk poster ]</Placeholder>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Formats: one centred row, no dividers */}
      <Section flush="top">
        <Container>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-[88px] gap-y-8 p-0 text-center">
            {formats.map((f) => (
              <li key={f.title}>
                <p className="type-price m-0 text-[44px]">{f.length}</p>
                <h3 className="type-h4 m-0 mt-3">{f.title}</h3>
                <p className="type-small m-0 mt-1 text-flint">{f.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Conner */}
      <Section tone="forest">
        <Container className="grid grid-cols-1 items-center gap-x-20 gap-y-10 lg:grid-cols-2">
          <div className="relative h-[clamp(420px,52vw,620px)] overflow-hidden rounded-card">
            <Image
              src="/images/speaking/conner-portrait.jpg"
              alt="Conner Galway"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <div>
            <h2 className="type-h2 mt-0 mb-6">Conner Galway</h2>
            <p className="type-body mt-0 mb-0 max-w-[52ch] text-newsprint/88">
              Founder of Junction. Fourteen years advising organizations on
              marketing and technology, 2,000+ people trained, and a Business in
              Vancouver 40 Under 40. He writes The Brief, a weekly newsletter for
              marketers, and he still runs the programs he talks about.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-t border-newsprint/18 pt-5">
                <Stat value="14" label="years advising organizations" maxSize="clamp(56px, 6vw, 88px)" />
              </div>
              <div className="border-t border-newsprint/18 pt-5">
                <Stat value="2,000+" label="people trained" maxSize="clamp(56px, 6vw, 88px)" />
              </div>
            </div>
            <Placeholder className="mt-10">[ Event organizer testimonial ]</Placeholder>
          </div>
        </Container>
      </Section>

      {/* Got a date? */}
      <Section id="start" className="scroll-mt-24">
        <Container className="grid grid-cols-1 items-start gap-x-20 gap-y-12 lg:grid-cols-2">
          <div>
            <h2 className="type-display m-0">
              Got a date?
              <br /> Let&apos;s check it.
            </h2>
            <p className="type-body mt-6 mb-0 max-w-[46ch]">
              Send your event, date and audience. You&apos;ll hear back with availability
              and a fee for your format.
            </p>
            <TextLink href="mailto:conner@wearejunction.com" className="mt-8 inline-block">
              conner@wearejunction.com
            </TextLink>
          </div>
          <AvailabilityForm />
        </Container>
      </Section>
    </>
  );
}
