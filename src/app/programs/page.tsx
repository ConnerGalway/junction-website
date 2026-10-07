import type { Metadata } from "next";
import {
  Badge,
  Button,
  Container,
  Eyebrow,
  Section,
} from "@/components";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Every Junction program in one place: The Accelerator, the Offload Program (AI Accelerator), Custom Training, Speaking, Marketing strategy, Destination partnerships and JunctionU.",
};

type Program = {
  id: string;
  title: string;
  description: string;
  href?: string;
  price?: string;
  isNew?: boolean;
};

const programs: Program[] = [
  {
    id: "accelerator",
    title: "The Accelerator",
    description:
      "A full digital assessment, a one-to-one coaching session, and a three-page plan you can start Monday. 25–100% covered through a destination partnership.",
    href: "/accelerator",
    price: "$2,500",
  },
  {
    id: "offload-program",
    title: "Offload Program (AI Accelerator)",
    description:
      "The 30-day program: 4 live sessions, a custom dashboard, a prompt library, a 90-day plan, and at least one bottleneck automated before day 30. Open to teams beyond tourism.",
    href: "/ai-accelerator",
    price: "30 days",
    isNew: true,
  },
  {
    id: "custom-training",
    title: "Custom Training",
    description:
      "Workshops, webinar series and custom programs. Plain language, and every action doable in under an hour, like the Okotoks series that prepped a town for 4,500 visitors.",
    href: "/custom-training",
  },
  {
    id: "speaking",
    title: "Speaking",
    description:
      "Keynotes, workshops, conference sessions and virtual talks on AI, tourism innovation and marketing trends. Recent stages: Northern BC Tourism Summit, TIABC, Yukon Go Digital Summit.",
    href: "/speaking",
  },
  {
    id: "marketing-strategy",
    title: "Marketing strategy",
    description:
      "Research-led strategy for destinations and the organizations behind them. Traveller research, positioning, investment priorities, and an operating model your team runs after handover.",
  },
  {
    id: "destination-partnerships",
    title: "Destination partnerships",
    description:
      "Fund JunctionU seats for every operator in your region, from 25% to fully covered. We handle delivery, support and reporting, so your board sees exactly what capacity you built.",
  },
  {
    id: "junctionu",
    title: "JunctionU",
    description:
      "Certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in something you can do today. 2,000+ people are in.",
    href: "/junctionu",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="tight">
        <Container
          className="grid items-end gap-x-[72px] gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
        >
          <div>
            <Eyebrow className="mb-6">Services</Eyebrow>
            <h1 className="type-display m-0">We build the plan. We train the people.</h1>
          </div>
          <p className="type-body text-muted m-0">
            Every engagement ends with your team holding the keys. We only do
            strategy and training, so no websites, ad buying or social
            management. Every recommendation is there because it works for you.
          </p>
        </Container>
      </Section>

      {/* Program list */}
      <Section flush="top">
        <Container as="ol" className="m-0 list-none border-t-2 border-canopy p-0">
          {programs.map((program, i) => (
            <li
              key={program.id}
              id={program.id}
              className="grid scroll-mt-28 gap-x-12 gap-y-3 border-b border-hairline py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.5fr)]"
            >
              <div className="flex flex-col gap-3">
                <span className="type-h4 text-accent-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="type-h3 m-0">
                  {program.href ? (
                    <Link href={program.href} className="link-plain">
                      {program.title}
                    </Link>
                  ) : (
                    program.title
                  )}
                </h2>
                {program.isNew && (
                  <Badge variant="filled" className="self-start">
                    New
                  </Badge>
                )}
              </div>
              <p className="type-body text-muted m-0">{program.description}</p>
              <p className="type-h4 m-0 text-canopy-text">{program.price}</p>
            </li>
          ))}
        </Container>
      </Section>

      {/* CTA */}
      <Section id="start" tone="forest">
        <Container>
          <h2 className="type-h2 m-0 max-w-[15ch]">
            Not sure which route? That&apos;s what the call is for.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href="/contact">Start a conversation</Button>
            <span className="type-small">Thirty minutes, no pitch deck.</span>
          </div>
        </Container>
      </Section>
    </>
  );
}
