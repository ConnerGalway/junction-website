import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Card,
  Container,
  Placeholder,
  Section,
  TextLink,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { SHOW_SPEAKING_REEL } from "@/lib/flags";
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
  { title: "Keynote", description: "30 to 60 minutes, main stage" },
  { title: "Workshop", description: "Half or full day, hands-on" },
  { title: "Panel or fireside", description: "Moderator or panellist" },
  { title: "Virtual", description: "Live online, any time zone" },
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

      {/* Topics */}
      <Section>
        <Container>
          <h2 className="type-h2 mt-0 mb-9">
            Three talks, tailored to your room.
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            {topics.map((t) => (
              <Card key={t.num} className="flex flex-col gap-3.5">
                <span className="type-numeral">{t.num}</span>
                <h3 className="type-h3 m-0">{t.title}</h3>
                <p className="type-body m-0">{t.description}</p>
                <p className="type-small mt-auto mb-0 pt-2.5">{t.audience}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Formats */}
      <Section flush="top">
        <Container className="grid border-t-2 border-(--tone-rule) [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {formats.map((f) => (
            <div key={f.title} className="border-b border-hairline py-6 pr-6">
              <p className="type-h4 mt-0 mb-1.5">{f.title}</p>
              <p className="type-small m-0">{f.description}</p>
            </div>
          ))}
        </Container>
      </Section>

      {/* About Conner */}
      <Section tone="forest">
        <Container className="grid items-center gap-x-20 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          <Placeholder aspectRatio="4/5">[ photo: Conner on stage ]</Placeholder>
          <div>
            <h2 className="type-h2 mt-0 mb-6">Conner Galway</h2>
            <p className="type-body mt-0 mb-7 max-w-[52ch]">
              Founder of Junction. Fourteen years advising organizations on
              marketing and technology, 2,000+ people trained, and a Business in
              Vancouver 40 Under 40. He writes The Brief, a weekly newsletter for
              marketers, and he still runs the programs he talks about.
            </p>
            <Placeholder>[ Event organizer testimonial ]</Placeholder>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            Got a date? Let&apos;s check it.
          </h2>
          <p className="type-body mt-6 mb-0 max-w-[46ch]">
            Send your event, date and audience. You&apos;ll hear back with availability
            and a fee for your format.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-7">
            <Button href="/contact?type=speaking">Check availability</Button>
            <TextLink href="mailto:conner@wearejunction.com">
              conner@wearejunction.com
            </TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
