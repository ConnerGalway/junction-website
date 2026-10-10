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
  Tabs,
  TextLink,
  LogoWall,
} from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { clientLogos } from "@/lib/logos";
import { COURSES } from "@/lib/customCourses";
import { CourseShelf } from "./CourseShelf";
import { WhoPanel } from "./WhoPanel";

export const metadata: Metadata = {
  title: "Custom Training",
  description:
    "Custom courses for the operators in your region, and programs for the leaders in your organization. We design it, deliver it, and report on what changed.",
};

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

export default function CustomTrainingPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="forest" spacing="tight" className="overflow-hidden">
        <Container className="grid items-end gap-x-[72px] gap-y-8 lg:grid-cols-2">
          {/* Three lines at most from 1280px (explicit breaks, desktop only) */}
          <h1 className="type-display m-0">
            <span className="xl:whitespace-nowrap">Training built</span>
            <br className="hidden xl:inline" /> <span className="xl:whitespace-nowrap">around your</span>
            <br className="hidden xl:inline" /> <span className="xl:whitespace-nowrap">people.</span>
          </h1>
          <div>
            <p className="type-lead m-0 mb-8 text-newsprint/88">
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
        {/* Full-bleed: the row drifts left past both screen edges */}
        <CourseShelf className="-mx-gutter mt-[72px]" />
      </Section>

      {/* Who it's for */}
      <Section>
        <Container>
          <h2 className="type-h2 m-0 mb-9">Who it&apos;s for.</h2>
          <Tabs
            label="Who it's for"
            items={[
              {
                id: "dmos",
                label: "For DMOs and tourism organizations",
                panel: (
                  <WhoPanel
                    tone="carbon"
                    title="Custom courses for your operators."
                    line="Your operators learn from courses built for your region, and you see who is progressing."
                    features={dmoFeatures}
                    button={{ label: "Scope a course program", href: "/contact?type=training" }}
                    photo={{ src: "/images/custom-training/who-dmos.jpg", alt: "A Junction workshop for tourism operators" }}
                    cardMeta="Custom courses · on JunctionU"
                    cardRows={COURSES.map((title) => ({ title, line: "[ x ] operators enrolled" }))}
                  />
                ),
              },
              {
                id: "leadership",
                label: "For leadership teams",
                panel: (
                  <WhoPanel
                    tone="forest"
                    title="Leadership training on AI and marketing."
                    line="Sessions built on your strategy and real decisions, with homework that ships between them."
                    features={leadershipFeatures}
                    button={{ label: "Scope a leadership program", href: "/contact?type=training" }}
                    photo={{ src: "/images/custom-training/who-leadership.jpg", alt: "A Junction leadership session" }}
                    cardMeta="Leadership program · 4 sessions"
                    cardRows={[
                      { title: "Where AI fits in your organization", line: "Homework: one use case per leader" },
                      { title: "Your data, your decisions", line: "Homework: a shared dashboard" },
                      { title: "Policy and guardrails", line: "Homework: a draft AI policy" },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Container>
      </Section>

      {/* Clients */}
      <Section flush="top">
        <Container>
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="type-h3 m-0">Organizations we&apos;ve trained.</h2>
            <span className="type-small">Across Canada and the US</span>
          </div>
          <LogoWall variant="grid" logos={clientLogos} label="Organizations we've trained" />
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
          <h2 className="type-h2 m-0 mb-9">Formats</h2>
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
