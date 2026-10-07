import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Placeholder,
  Section,
  TextLink,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Keynotes, workshops and virtual sessions on AI, marketing trends and tourism strategy.",
};

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
      {/* Hero */}
      <Section tone="carbon" spacing="tight">
        <Container className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <Eyebrow className="mb-[22px]">Speaking · Conner Galway</Eyebrow>
            <h1 className="type-display m-0">
              Talks that send the room home with a plan.
            </h1>
            <p className="type-lead mt-7 mb-9">
              Keynotes, workshops and virtual sessions on AI, marketing trends
              and tourism strategy. Every talk ends with actions people can take
              that week.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/contact?type=speaking">
                Check availability for your date
              </Button>
              <TextLink href={CALENDLY_URL} className="whitespace-nowrap">
                Book a 20-min call →
              </TextLink>
            </div>
          </div>

          {/* Video placeholder */}
          <Placeholder aspectRatio="16/9">
            [ video: 60-second speaker reel ]
          </Placeholder>
        </Container>

        {/* Recent stages */}
        <Container className="mt-14 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-hairline-dark pt-6">
          <Eyebrow as="span">Recent stages</Eyebrow>
          {stages.map((s) => (
            <span key={s} className="type-body font-medium">
              {s}
            </span>
          ))}
        </Container>
      </Section>

      {/* Topics */}
      <Section>
        <Container>
          <Eyebrow className="mb-4">Topics</Eyebrow>
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
      <Section tone="carbon">
        <Container className="grid items-center gap-x-20 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          <Placeholder aspectRatio="4/5">[ photo: Conner on stage ]</Placeholder>
          <div>
            <Eyebrow className="mb-[18px]">Your speaker</Eyebrow>
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
      <Section id="start" tone="forest" className="scroll-mt-24">
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
