import type { Metadata } from "next";
import { Button, Container, Eyebrow, Section } from "@/components";
import { BELIEFS, STATEMENT, TEAM } from "@/lib/about";
import { TeamList } from "./TeamList";

export const metadata: Metadata = {
  title: "About",
  description:
    "Junction sits where organizations and technology meet, and where consulting meets training.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero: the headline at the large end of display type, the lead beside its last line */}
      <Section>
        <Container className="relative">
          <h1 className="type-display m-0 text-[clamp(52px,8vw,116px)] leading-[0.9]">
            <span className="lg:whitespace-nowrap">A junction is where</span>
            <br className="hidden lg:inline" /> <span className="lg:whitespace-nowrap">routes meet.</span>
            <br className="hidden lg:inline" /> <span className="text-canopy-text">So are we.</span>
          </h1>
          <p className="type-lead m-0 mt-8 max-w-[36ch] lg:absolute lg:right-0 lg:bottom-[0.2em] lg:mt-0">
            Where organizations meet technology, and consulting meets training.
            Fourteen years in the visitor economy.
          </p>
        </Container>
      </Section>

      {/* Statement (placeholder until the team writes the line) */}
      <Section spacing="tight" flush="top">
        <Container>
          <figure className="m-0 text-center">
            <blockquote className="type-quote mx-auto m-0 max-w-[22ch] text-[clamp(36px,4.4vw,64px)] leading-[1.08] text-forest">
              {STATEMENT.quote}
            </blockquote>
            <figcaption className="mt-6">
              <Eyebrow as="span">{STATEMENT.attribution}</Eyebrow>
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* What we believe */}
      <Section>
        <Container>
          <h2 className="type-h2 m-0 mb-8">What we believe</h2>
          <div className="grid gap-x-12 gap-y-10 border-t-2 border-(--tone-rule) pt-10 md:grid-cols-3">
            {BELIEFS.map((belief) => (
              <div key={belief.num}>
                <p className="type-numeral m-0 mb-4">{belief.num}</p>
                <h3 className="type-h3 m-0 mb-3 text-[28px]">{belief.title}</h3>
                <p className="type-body m-0">{belief.line}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who we are */}
      <Section tone="carbon">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 className="type-h2 m-0">Who we are</h2>
            <p className="type-body m-0 text-newsprint-muted">
              A small team in Vancouver, working across North America.
            </p>
          </div>
          <TeamList team={TEAM} />
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[18ch]">
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
