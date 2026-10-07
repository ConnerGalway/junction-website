import type { Metadata } from "next";
import {
  Button,
  Container,
  Eyebrow,
  QuoteCard,
  Section,
  Stat,
  TextLink,
} from "@/components";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four engagements, told with the actual results. Each one links to the service that produced it. Soon you'll be able to flip through the deliverables too.",
};

const caseGrid =
  "grid gap-x-[72px] gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]";

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container className="grid items-end gap-x-[72px] gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div>
            <Eyebrow className="mb-6">Work</Eyebrow>
            <h1 className="type-display m-0">Real regions. Real numbers.</h1>
          </div>
          <p className="type-body text-muted m-0 max-w-[46ch]">
            Four engagements, told with the actual results. Each one links to
            the service that produced it. Soon you&apos;ll be able to flip through
            the deliverables too.
          </p>
        </Container>
      </Section>

      {/* Travel Yukon */}
      <Section spacing="tight" flush="top">
        <Container className={`${caseGrid} border-t-2 border-(--tone-rule) pt-section-tight`}>
          <div>
            <Eyebrow className="mb-4">Travel Yukon · Training · 4 years</Eyebrow>
            <Stat
                            value="300+"
              label="Businesses through the Go Digital program"
            />
          </div>
          <div className="flex flex-col justify-end gap-7">
            <h2 className="type-h3 m-0">Go Digital program</h2>
            <p className="type-body text-muted m-0 max-w-[52ch]">
              A territory-wide digital capacity program, from Whitehorse to
              Dawson City. 300+ businesses came through in four years, and
              alumni now lead the program themselves.
            </p>
            <QuoteCard
              quote={
                <>
                  &quot;Incredibly valuable insights and education for our tourism
                  sector.&quot;
                </>
              }
              caption="Avery Bramadat, Travel Yukon"
            />
          </div>
        </Container>
      </Section>

      {/* ITBC */}
      <Section tone="carbon" spacing="tight">
        <Container className={caseGrid}>
          <div>
            <Eyebrow className="mb-4">
              Indigenous Tourism BC · Accelerator · 3 months
            </Eyebrow>
            <Stat value="+300%" label="Past engagement goal" />
          </div>
          <div className="flex flex-col items-start justify-end gap-7">
            <h2 className="type-h3 m-0">Accelerator across ITBC members</h2>
            <p className="type-body text-muted m-0 max-w-[52ch]">
              Assessments, one-to-one coaching and implementation plans,
              subsidised by ITBC for its member businesses. Engagement landed
              300% past goal, with bookings up across the province inside three
              months.
            </p>
            <TextLink href="/programs">About the Accelerator →</TextLink>
          </div>
        </Container>
      </Section>

      {/* Ontario's Southwest */}
      <Section spacing="tight">
        <Container className={caseGrid}>
          <div>
            <Eyebrow className="mb-4">
              Ontario&apos;s Southwest · Research · 2025–26
            </Eyebrow>
            <Stat
                            value="2026"
              label="Tourism strategy driven by our findings"
            />
          </div>
          <div className="flex flex-col justify-end gap-7">
            <h2 className="type-h3 m-0">Traveller Insights Study</h2>
            <p className="type-body text-muted m-0 max-w-[52ch]">
              Region-wide research into who visits Southwest Ontario, why they
              come, and what brings them back. The findings now drive the
              region&apos;s 2026 tourism strategy.
            </p>
            <QuoteCard
              quote={
                <>
                  &quot;Invaluable support to our region, our DMOs and our
                  operators.&quot;
                </>
              }
              caption="Joanne Wolnik, Ontario's Southwest"
            />
          </div>
        </Container>
      </Section>

      {/* Kootenay Rockies */}
      <Section tone="carbon" spacing="tight">
        <Container className={`${caseGrid} items-end`}>
          <div>
            <Eyebrow className="mb-4">Kootenay Rockies · Strategy</Eyebrow>
            <figure className="m-0">
              <blockquote className="type-quote m-0 mb-5 text-fern">
                &quot;We are a stronger, smarter tourism organization today thanks
                to the work we did with Junction.&quot;
              </blockquote>
              <figcaption>
                <cite className="type-small not-italic">
                  Kathy Cooper, CEO, Kootenay Rockies Tourism
                </cite>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="type-h3 m-0">A region running its own playbook</h2>
            <p className="type-body text-muted m-0 max-w-[52ch]">
              Destination marketing strategy. Marketing operations restructured
              around the activities with the most impact, with new investment
              redirected into responsible travel.
            </p>
          </div>
        </Container>
      </Section>

      {/* Note */}
      <section className="px-gutter py-10">
        <Container>
          <p className="type-body text-muted m-0 max-w-none">
            More case studies are on the way, including the Okotoks visitor
            economy series and its $900,000 in identified local spend.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            Your region could be the next one here.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
