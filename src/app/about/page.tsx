import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  TextLink,
} from "@/components";

export const metadata: Metadata = {
  title: "About",
  description:
    "Junction sits where organizations and technology meet, and where consulting meets training.",
};

const beliefs = [
  {
    num: "01",
    title: "The best engagement is one you never have to repeat.",
    description:
      "Every plan is built for handover. Every program is built to be owned by the people who run it. Your team should need us less every month.",
  },
  {
    num: "02",
    title: "Independence keeps advice honest.",
    description:
      "We only do strategy and training. Nothing we recommend earns us a commission, so everything we recommend is there on merit.",
  },
  {
    num: "03",
    title: "Plain language, always.",
    description:
      "If an idea can't be explained to a busy operator between two guest check-ins, it needs more work. Jargon usually means someone's hiding.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container>
          <h1 className="type-display m-0 max-w-[14ch]">
            A junction is where routes meet. So are we.
          </h1>
          <div className="mt-[clamp(40px,5vw,64px)] grid items-start gap-x-[72px] gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div className="overflow-hidden rounded-card">
              <Image
                src="/assets/photo-mountains.png"
                alt="Mountain town"
                width={800}
                height={533}
                className="w-full object-cover"
                style={{ aspectRatio: "3/2" }}
              />
            </div>
            <p className="type-lead m-0">
              Junction sits where organizations and technology meet, and where
              consulting meets training. We&apos;ve spent fourteen years in the
              visitor economy, helping destinations and the businesses inside
              them get measurably better at marketing. In 2026 our training
              platform, eLearningU, became JunctionU and moved under one roof.
            </p>
          </div>
        </Container>
      </Section>

      {/* Beliefs */}
      <Section tone="carbon">
        <Container>
          <Eyebrow as="h2" className="m-0 mb-10">
            What we believe
          </Eyebrow>
          <div className="grid gap-x-12 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            {beliefs.map((belief) => (
              <div key={belief.num} className="border-t border-(--tone-hairline) pt-6">
                <p className="type-numeral m-0 mb-3.5">{belief.num}</p>
                <h3 className="type-h3 m-0 mb-3.5">{belief.title}</h3>
                <p className="type-body m-0">{belief.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <div className="grid items-start gap-x-[72px] gap-y-8 border-t-2 border-(--tone-rule) pt-9 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            {/* Initials placeholder */}
            <Card
              tone="forest"
              aria-hidden="true"
              className="flex max-w-[420px] items-end"
              style={{ aspectRatio: "4/5" }}
            >
              <span className="type-display text-fern">CG</span>
            </Card>

            <div>
              <h2 className="type-h2 m-0 mb-2">Conner Galway</h2>
              <Eyebrow className="mb-6">Founder &amp; Principal</Eyebrow>
              <p className="type-body m-0 mb-7">
                Fourteen years advising destinations, operators and the
                organizations behind them. Business in Vancouver 40 Under 40.
                He&apos;s spoken at the Northern BC Tourism Summit, TIABC, Yukon&apos;s Go
                Digital Summit and the BC Craft Beer Conference, and writes The
                Brief every week.
              </p>
              <TextLink href="/programs">Book Conner to speak →</TextLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[16ch]">
            Tell us the goal. We&apos;ll be straight with you about the rest.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
