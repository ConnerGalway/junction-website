import type { Metadata } from "next";
import { Button, Container, Section, TextLink } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { ENGAGEMENT_LINE, PHASES } from "@/lib/marketingStrategy";
import { DeliverablesShelf } from "./DeliverablesShelf";

export const metadata: Metadata = {
  title: "Marketing strategy",
  description:
    "Research-led strategy for destinations and the organizations behind them. Traveller research, positioning, investment priorities, and an operating model your team runs after handover.",
};

/**
 * Marketing strategy: the DMO-facing program page, sister of Custom
 * Training (same hero and section family). Content: src/lib/marketingStrategy.ts.
 */
export default function MarketingStrategyPage() {
  return (
    <>
      {/* Hero: the pitch, then the deliverables shelf bleeding off the right edge */}
      <Section tone="forest" spacing="tight" className="overflow-hidden">
        <Container className="grid items-end gap-x-[72px] gap-y-8 lg:grid-cols-2">
          <h1 className="type-display m-0 max-w-[13ch]">Marketing strategy your team can run.</h1>
          <div>
            <p className="type-lead m-0 mb-8 text-newsprint/88">
              Research-led strategy for destinations and the organizations behind them. Traveller research, positioning,
              investment priorities, and an operating model your team runs after handover.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={CALENDLY_URL}>Book a 20-min call</Button>
              <TextLink href="/work" className="whitespace-nowrap">
                See our work →
              </TextLink>
            </div>
          </div>
        </Container>
        <DeliverablesShelf className="-mx-gutter mt-[72px]" />
      </Section>

      {/* How a strategy engagement works: a four-phase timeline (vertical on phones) */}
      <Section>
        <Container>
          <h2 className="type-h2 m-0 mb-14">How a strategy engagement works</h2>
          <ol className="m-0 grid list-none border-l-2 border-canopy p-0 md:grid-cols-4 md:gap-x-8 md:border-t-2 md:border-l-0">
            {PHASES.map((phase, i) => {
              const last = i === PHASES.length - 1;
              return (
                <li key={phase.title} className="relative pb-12 pl-8 last:pb-0 md:pt-10 md:pb-0 md:pl-0">
                  {/* The stop: Newsprint with a Canopy ring; the last is copper */}
                  <span
                    aria-hidden="true"
                    className={
                      last
                        ? "absolute top-1 -left-[9px] size-4 rounded-full bg-accent-2 md:-top-[9px] md:left-0"
                        : "absolute top-1 -left-[9px] size-4 rounded-full border-[3px] border-canopy bg-newsprint md:-top-[9px] md:left-0"
                    }
                  />
                  <p className="type-price m-0 text-[24px]">Phase {i + 1}</p>
                  <h3 className="type-h4 mt-3 mb-0">{phase.title}</h3>
                  <p className="type-body mt-2 mb-0">{phase.line}</p>
                  <div className="mt-5 rounded-control bg-sage-25 p-4 text-forest">
                    <p className="m-0 text-[11px] font-medium tracking-[0.14em] uppercase">Output</p>
                    <p className="m-0 mt-1.5 text-[15px] leading-snug">{phase.output}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="type-price m-0 mt-14 text-[28px]">{ENGAGEMENT_LINE}</p>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[14ch]">Let&apos;s talk about your region.</h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href={CALENDLY_URL}>Book a 20-min call</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
