import type { Metadata } from "next";
import { Button, Container, Section, TextLink } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
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
