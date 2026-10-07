import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Placeholder,
  QuoteCard,
  Section,
  Stat,
  TextLink,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Training",
  description:
    "Custom courses for the operators in your region, and programs for the leaders in your organization. We design it, deliver it, and report on what changed.",
};

const clients = [
  "Destination BC",
  "Travel Alberta",
  "Travel Yukon",
  "Travel Maine",
  "Visit Mississippi",
  "Ontario Destination Association",
  "Southwest Ontario Tourism Corporation",
  "Northern BC Tourism",
  "4VI",
  "Kootenay Rockies Tourism",
  "Tourism Red Deer",
  "Tourism Golden",
  "South Canadian Rockies Tourism",
  "Town of Okotoks",
];

const dmoFeatures = [
  "Courses on JunctionU, branded for your region",
  "Live workshops and webinar series",
  "Delivery, learner support and progress reporting",
  "You fund 25% to 100% of seats",
];

const leadershipFeatures = [
  "Workshops for leadership teams and boards",
  "Multi-session programs with homework that ships",
  "Built around your goals and your data",
  "Measured against outcomes you set at the start",
];

const formats = [
  {
    num: "01",
    title: "Live workshop",
    description: "Ninety minutes to a full day, in person or virtual.",
  },
  {
    num: "02",
    title: "Webinar series",
    description: "Short sessions over several weeks, each with homework.",
  },
  {
    num: "03",
    title: "Custom course",
    description: "Self-paced on JunctionU, with certificates and reporting.",
  },
  {
    num: "04",
    title: "Leadership program",
    description: "Multi-session, built on your strategy and real decisions.",
  },
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-none border-t border-(--tone-hairline) p-0">
      {items.map((f) => (
        <li key={f} className="type-body border-b border-(--tone-hairline) py-3.5 last:border-b-0">
          {f}
        </li>
      ))}
    </ul>
  );
}

export default function CustomTrainingPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container className="grid items-end gap-x-[72px] gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div>
            <Eyebrow className="mb-6">Custom training</Eyebrow>
            <h1 className="type-display m-0">Training built around your people.</h1>
          </div>
          <div>
            <p className="type-lead m-0 mb-8">
              Custom courses for the operators in your region, and programs for
              the leaders in your organization. We design it, deliver it, and
              report on what changed.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/contact?type=training">Scope a program</Button>
              <TextLink href={CALENDLY_URL} className="whitespace-nowrap">
                Or book a 20-min call →
              </TextLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Two Audiences */}
      <Section flush="top">
        <Container className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr))]">
          {/* DMO Card */}
          <Card tone="forest" className="flex flex-col gap-4">
            <Eyebrow>For DMOs and tourism organizations</Eyebrow>
            <h2 className="type-h3 m-0">Custom courses for your operators.</h2>
            <p className="type-body m-0">
              Give every business in your region training that fits their week.
              Your board gets a report showing the capacity you built.
            </p>
            <FeatureList items={dmoFeatures} />
            <TextLink href="/contact?type=training" className="mt-auto self-start">
              Scope a regional program →
            </TextLink>
          </Card>

          {/* Leadership Card */}
          <Card tone="carbon" className="flex flex-col gap-4">
            <Eyebrow>For organizations training their leaders</Eyebrow>
            <h2 className="type-h3 m-0">Leadership training on AI and marketing.</h2>
            <p className="type-body m-0">
              High-quality sessions for senior teams who need to make good
              decisions about AI and marketing, using your strategy and your real
              work.
            </p>
            <FeatureList items={leadershipFeatures} />
            <TextLink href="/contact?type=training" className="mt-auto self-start">
              Scope a leadership program →
            </TextLink>
          </Card>
        </Container>
      </Section>

      {/* Clients */}
      <Section flush="top">
        <Container>
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="type-h3 m-0">Organizations we&apos;ve trained.</h2>
            <span className="type-small">Across Canada and the US</span>
          </div>
          <div className="card overflow-hidden">
            {/* -mr/-mb hide the outer cell borders under the card's edge. */}
            <ul className="-mr-px -mb-px m-0 grid list-none p-0 [grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))]">
              {clients.map((c) => (
                <li
                  key={c}
                  className="border-r border-b border-hairline px-5 py-[22px] text-[17px] font-medium"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Proof */}
      <Section>
        <Container className="grid items-center gap-x-20 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div>
            <Eyebrow className="mb-4">Town of Okotoks · webinar series</Eyebrow>
            <Stat value="$900,000+" />
            <p className="type-body m-0 mt-5 max-w-[44ch]">
              In potential local spend identified for businesses ahead of 4,500
              visitors. Then we turned it into a three-part series where every
              action took under an hour.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <Stat
                            value="300+"
              label={
                <>
                  businesses through Travel Yukon&apos;s program in four years, now
                  led by alumni
                </>
              }
            />
            <QuoteCard
              quote={
                <>
                  &quot;Functional, accessible, and personalized. Incredibly
                  valuable education for our tourism sector.&quot;
                </>
              }
              caption="Avery Bramadat, Travel Yukon"
            />
            <Placeholder>[ Leadership training testimonial ]</Placeholder>
          </div>
        </Container>
      </Section>

      {/* Formats */}
      <Section>
        <Container>
          <Eyebrow as="h2" className="m-0 mb-4">
            Formats
          </Eyebrow>
          <ol className="m-0 grid list-none border-t-2 border-(--tone-rule) p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {formats.map((f) => (
              <li key={f.num} className="border-b border-hairline py-6 pr-6">
                <span className="type-numeral">{f.num}</span>
                <h3 className="type-h4 m-0 my-1.5">{f.title}</h3>
                <p className="type-small m-0">{f.description}</p>
              </li>
            ))}
          </ol>
          <Card className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="type-body m-0">
              <strong className="font-medium">See how we teach first.</strong>{" "}
              <span className="text-muted">
                Watch a free Tourism Talk or a sample lesson.
              </span>
            </p>
            <TextLink href="/junctionu" className="whitespace-nowrap">
              Watch free →
            </TextLink>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest" className="scroll-mt-24">
        <Container>
          <h2 className="type-display m-0 max-w-[15ch]">
            Tell us who needs training. We&apos;ll sketch the program.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href="/contact?type=training">Scope a program</Button>
            <TextLink href={CALENDLY_URL}>Or book a 20-min call →</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
