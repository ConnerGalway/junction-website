import type { Metadata } from "next";
import { Button, Callout, Container, Section, TextLink } from "@/components";
import { WORK_CASES } from "@/lib/workCases";
import { CaseChapter } from "./CaseChapter";
import { RouteMap } from "./RouteMap";
import { buildRouteMap } from "@/lib/routeMapGeometry";
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
      {/* overflow-x-clip: the map's land reaches the viewport edge without a sideways scroll */}
      <Section spacing="tight" flush="bottom" className="overflow-x-clip">
        <Container className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
          <div data-map-avoid className="relative z-10">
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
          {/* From 1024px the map overflows its column to the left: its column's
              width at 1024, growing to 60vw at 1280 and up, where it's anchored
              to the viewport's right edge (the right offset grows with it). */}
          <RouteMap
            geo={routeMap}
            className="lg:mr-[calc((100vw-1024px)*-0.2)] lg:w-[min(60vw,calc(107.4vw-607px))] lg:justify-self-end xl:mr-[calc(-1*max(var(--spacing-gutter),(100vw-var(--container-wide))/2))]"
          />
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

      {/* More on the way */}
      <Section spacing="tight">
        <Container>
          <Callout className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <p className="type-body m-0">
              More case studies are on the way, including the Okotoks visitor
              economy series and its $900,000 in identified local spend.
            </p>
            {/* The JunctionU email band (TODO: its signup isn't wired to a list yet). */}
            <TextLink href="/junctionu#email">
              Get them first: join the JunctionU list →
            </TextLink>
          </Callout>
        </Container>
      </Section>

      {/* Closing CTA */}
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
