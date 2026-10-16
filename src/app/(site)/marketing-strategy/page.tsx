import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Eyebrow, Section, Stat, TextLink } from "@/components";
import { JuButton } from "@/components/junctionu";
import { CALENDLY_URL } from "@/lib/constants";
import { JU_SCAN_THUMBNAIL } from "@/lib/junctionuImages";
import { ENGAGEMENT_LINE, MONTHS, PHASES, PROOF, YEAR_LEGEND, type YearPhase } from "@/lib/marketingStrategy";
import { DeliverablesShelf } from "./DeliverablesShelf";

export const metadata: Metadata = {
  title: "Marketing strategy",
  description:
    "Research-led strategy for destinations and the organizations behind them. Traveller research, positioning, investment priorities, and an operating model your team runs after handover.",
};

/** Year-bar colours: research Canopy, board reporting gold, season Fern, funding copper. */
const phaseColor: Record<YearPhase, string> = {
  research: "bg-canopy",
  board: "bg-accent-1",
  season: "bg-fern",
  funding: "bg-accent-2",
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

      {/* Built around your year: a 12-month bar and its legend */}
      <Section tone="carbon">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <h2 className="type-h2 m-0">Built around your year</h2>
            <p className="type-small m-0">Timing shown is typical; we fit your fiscal year.</p>
          </div>
          {/* Scrolls sideways inside its container on narrow screens */}
          <div className="relative mt-12 overflow-x-auto pb-2">
            <ol aria-label="A typical year, month by month" className="m-0 grid min-w-[600px] list-none grid-cols-12 gap-1.5 p-0">
              {MONTHS.map((m) => (
                <li key={m.label}>
                  <span className="type-eyebrow block text-newsprint-muted">{m.label}</span>
                  <span aria-hidden="true" className={`mt-2.5 block h-1.5 rounded-full ${phaseColor[m.phase]}`} />
                  <span className="sr-only">: {YEAR_LEGEND.find((l) => l.phase === m.phase)?.title}</span>
                </li>
              ))}
            </ol>
          </div>
          <ul className="m-0 mt-12 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {YEAR_LEGEND.map((l) => (
              <li key={l.phase}>
                <span aria-hidden="true" className={`block h-1.5 w-10 rounded-full ${phaseColor[l.phase]}`} />
                <h3 className="type-h4 mt-4 mb-0">{l.title}</h3>
                <p className="type-body mt-2 mb-0">{l.line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Real regions. Real numbers. (unboxed stat list: no boxes, no ghost numbers) */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 className="type-h2 m-0">Real regions. Real numbers.</h2>
            <TextLink href="/work">All our work →</TextLink>
          </div>
          <ul className="m-0 mt-12 grid list-none gap-x-12 gap-y-12 p-0 md:grid-cols-3">
            {PROOF.map((p) => (
              <li key={p.meta} className="min-w-0">
                <Eyebrow className="m-0 mb-4">{p.meta}</Eyebrow>
                <Stat value={p.value} label={p.line} maxSize="120px" />
                <TextLink href={p.href} className="mt-4 inline-block">
                  Read the case →
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Scan entry: a pointer to JunctionU's Industry Scan, in the JunctionU colours (.ju) with main-site type */}
      <Section spacing="tight" flush="top">
        <Container>
          <div className="ju grid items-center gap-x-12 gap-y-8 rounded-[18px] p-[clamp(24px,4vw,56px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="relative aspect-video overflow-hidden rounded-[12px]">
              <Image src={JU_SCAN_THUMBNAIL} alt="The Tourism Industry Scan" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow className="m-0">Not ready for a strategy yet?</Eyebrow>
              <h2 className="type-h2 mt-4 mb-0 text-newsprint">Start with the Industry Scan.</h2>
              <p className="type-body mt-5 mb-7 max-w-[46ch] text-newsprint-muted">
                A monthly briefing for DMO leaders: the trends, stats and actions worth taking. First month free.
              </p>
              <JuButton variant="outline" href="/junctionu/industry-scan">
                Try a month free
              </JuButton>
            </div>
          </div>
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
