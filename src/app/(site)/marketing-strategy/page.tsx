import type { Metadata } from "next";
import { Button, Container, Section } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

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
