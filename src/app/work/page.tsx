import type { Metadata } from "next";
import { Button, Container, Section } from "@/components";
import { WORK_CASES } from "@/lib/workCases";
import { CaseChapter } from "./CaseChapter";
import { RouteMap } from "./RouteMap";
import { buildRouteMap } from "./routeMapGeometry";
import { ChapterList, ServiceFilter, WorkFilterProvider } from "./WorkFilter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four engagements, told with the actual results. Each one links to the service that produced it. Soon you'll be able to flip through the deliverables too.",
};

const routeMap = buildRouteMap();

export default function WorkPage() {
  return (
    <WorkFilterProvider services={Object.fromEntries(WORK_CASES.map((c) => [c.id, c.service]))}>
      {/* Hero: headline and intro, with the route map */}
      <Section spacing="tight" flush="bottom">
        <Container className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
          <div>
            {/* Exactly two lines from 1024px (explicit break) */}
            <h1 className="type-display m-0">
              <span className="lg:whitespace-nowrap">Real regions.</span>
              <br className="hidden lg:inline" /> <span className="lg:whitespace-nowrap">Real numbers.</span>
            </h1>
            <p className="type-lead mt-7 mb-0">
              Four engagements, told with the actual results. Each one links to
              the service that produced it. Soon you&apos;ll be able to flip through
              the deliverables too.
            </p>
          </div>
          <RouteMap geo={routeMap} />
        </Container>
      </Section>

      {/* Service filter */}
      <div className="px-gutter pt-8 pb-14">
        <Container>
          <ServiceFilter />
        </Container>
      </div>

      {/* Case chapters */}
      <ChapterList
        chapters={WORK_CASES.map((item) => ({ id: item.id, node: <CaseChapter item={item} /> }))}
      />

      {/* Note */}
      <section className="px-gutter py-10">
        <Container>
          <p className="type-body m-0 max-w-none">
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
    </WorkFilterProvider>
  );
}
