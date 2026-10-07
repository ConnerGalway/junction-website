import Link from "next/link";
import { Header, Footer, Placeholder } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

const stuckItems = [
  {
    num: "01",
    title: "Online booking",
    description: "Enquiries that should have been bookings",
  },
  {
    num: "02",
    title: "Website and search",
    description: "Customers who can't find you, or can't find the answer",
  },
  {
    num: "03",
    title: "Social media",
    description: "Posting when someone has a spare minute",
  },
  {
    num: "04",
    title: "Internal systems",
    description: "The same data keyed in twice, reports built by hand",
  },
  {
    num: "05",
    title: "AI",
    description: "Admin eating the week of your best people",
  },
];

const organizations = [
  "Twin Lions Contracting",
  "West Coast Homes",
  "SMR Plumbing & Heating",
  "Destination BC",
  "Travel Alberta",
  "Travel Maine",
  "Visit Mississippi",
];

const programs = [
  {
    num: "01",
    title: "AI Accelerator",
    meta: "$5,000 · 30 days",
    tagline: "For any business losing hours to admin.",
    description:
      "Four sessions with your leadership team on your real work. One bottleneck automated by day 30, guaranteed.",
    href: "/ai-accelerator",
    linkText: "See the AI Accelerator →",
  },
  {
    num: "02",
    title: "The Accelerator",
    meta: "$2,500 · 90 days",
    tagline: "For small businesses that need a marketing plan they'll work.",
    description:
      "A scored digital assessment, an interactive 90-day plan, three coaching sessions and reassessments that show your progress.",
    href: "/accelerator",
    linkText: "See the Accelerator →",
  },
  {
    num: "03",
    title: "Custom Training",
    meta: "Scoped to you",
    tagline: "For organizations training their members or their leaders.",
    description:
      "Courses, workshops and series built around your people, with delivery and progress reporting handled for you.",
    href: "/custom-training",
    linkText: "See Custom Training →",
  },
  {
    num: "04",
    title: "Speaking",
    meta: "Keynote · Workshop · Virtual",
    tagline: "For event organizers who want the room to leave with a plan.",
    description:
      "Keynotes and workshops on AI, marketing trends and strategy. Every talk ends with actions people can take that week.",
    href: "/speaking",
    linkText: "See speaking topics →",
  },
];

const aiExampleSteps = [
  {
    num: "01",
    title: "A collections assistant",
    description:
      "Reads the aging report, suggests the next step for each account, and drafts reminders and call notes in the company's voice.",
  },
  {
    num: "02",
    title: "A material list converter",
    description:
      "Turns a photo, text or email of a handwritten list into clean line items for their ERP, and flags anything to confirm.",
  },
  {
    num: "03",
    title: "A business brain",
    description:
      "Price lists, account terms, policies and house style, loaded into one shared AI workspace the whole team uses.",
  },
  {
    num: "04",
    title: "A roadmap for what's next",
    description:
      "Takeoffs, invoice matching and system integration, prioritized for after the program.",
  },
];

const callSteps = [
  {
    num: "01",
    title: "Pick a time",
    description: "Twenty minutes with Conner. No prep, no forms.",
  },
  {
    num: "02",
    title: "Talk about the goal",
    description: "What you want to change, and what's in the way right now.",
  },
  {
    num: "03",
    title: "Get a straight answer",
    description:
      "Which program fits, what it costs, and when it could start. If none fits, we'll say so.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div className="text-eyebrow text-accent-2 mb-5">
              Strategy & capacity building
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(48px, 7.2vw, 112px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              Feeling stuck? Let&apos;s get your organization moving.
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                maxWidth: "46ch",
                margin: "28px 0 36px",
              }}
            >
              When growth stalls, the cause is usually technology that isn&apos;t
              pulling its weight yet: online booking, social media, internal
              systems, AI. We find the bottleneck, put the right tools to work,
              and get your people confident running them.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
                style={{ padding: "17px 28px" }}
              >
                Book a 20-min call
              </a>
              <a
                href="#programs"
                className="font-medium whitespace-nowrap"
                style={{
                  fontSize: "15px",
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                Find your program ↓
              </a>
            </div>
          </div>

          {/* Where organizations get stuck panel */}
          <div
            className="bg-carbon text-newsprint rounded"
            style={{ padding: "clamp(26px, 3.2vw, 40px)" }}
          >
            <div
              className="text-accent-1"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Where organizations get stuck
            </div>
            <div style={{ borderTop: "1px solid rgba(244, 240, 232, 0.2)" }}>
              {stuckItems.map((item) => (
                <div
                  key={item.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px minmax(0, 1fr)",
                    gap: "0 4px",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(244, 240, 232, 0.12)",
                  }}
                >
                  <span
                    className="font-bebas text-accent-1"
                    style={{ fontSize: "24px", lineHeight: 1 }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: 500,
                        marginBottom: "3px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(244, 240, 232, 0.74)",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "15px", lineHeight: 1.55, marginTop: "20px" }}>
              <span className="text-fern font-medium">
                We start with the one costing you most
              </span>
              <span style={{ fontWeight: 300, color: "rgba(244, 240, 232, 0.8)" }}>
                , fix it, and build from there.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations strip */}
      <section
        style={{
          borderTop: "1px solid rgba(28, 28, 26, 0.12)",
          borderBottom: "1px solid rgba(28, 28, 26, 0.12)",
          padding: "28px clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "14px 40px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.72)",
            }}
          >
            Organizations we work with
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 32px",
              fontSize: "17px",
              fontWeight: 500,
              color: "rgba(28, 28, 26, 0.82)",
            }}
          >
            {organizations.map((org) => (
              <span key={org}>{org}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section
        id="programs"
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: "20px 72px",
              alignItems: "end",
              marginBottom: "44px",
            }}
          >
            <div>
              <div className="text-eyebrow text-accent-2 mb-4">
                Four ways in
              </div>
              <h2
                className="font-epilogue m-0"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.03em",
                }}
              >
                Find your program.
              </h2>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              Each one ends with something your team owns: a working tool, a
              plan, a course, or a room full of people with next steps.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
              gap: "20px",
            }}
          >
            {programs.map((program) => (
              <Link
                key={program.num}
                href={program.href}
                className="flex flex-col gap-3.5 bg-newsprint rounded transition-colors hover:bg-sage"
                style={{
                  padding: "clamp(26px, 3vw, 38px)",
                  borderTop: "4px solid #1A4D2E",
                }}
              >
                <div className="flex justify-between items-center gap-3">
                  <span
                    className="font-bebas text-accent-1"
                    style={{ fontSize: "28px" }}
                  >
                    {program.num}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(28, 28, 26, 0.72)",
                    }}
                  >
                    {program.meta}
                  </span>
                </div>
                <h3
                  className="font-epilogue m-0"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(28px, 2.8vw, 38px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {program.title}
                </h3>
                <div
                  className="text-forest"
                  style={{ fontSize: "15px", fontWeight: 500 }}
                >
                  {program.tagline}
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "rgba(28, 28, 26, 0.76)",
                    margin: 0,
                  }}
                >
                  {program.description}
                </p>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    marginTop: "auto",
                    paddingTop: "8px",
                  }}
                >
                  {program.linkText}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Example */}
      <section
        className="bg-carbon text-newsprint"
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          <div>
            <div
              className="text-accent-1"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Inside an AI Accelerator
            </div>
            <h2
              className="font-epilogue"
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 4.6vw, 64px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                margin: "0 0 22px",
              }}
            >
              A building supplier&apos;s 30 days.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.8)",
                margin: "0 0 32px",
                maxWidth: "44ch",
              }}
            >
              A family-owned supply yard brought seven people, from the president
              to accounts payable. Only 65% of invoices were collected inside 30
              days, and quotes took anywhere from five minutes to a day. Here&apos;s
              what they left with.
            </p>

            {/* Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  border: "1px solid rgba(244, 240, 232, 0.18)",
                  borderRadius: "4px",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(244, 240, 232, 0.78)",
                    marginBottom: "8px",
                  }}
                >
                  Collected in 30 days
                </div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    className="font-bebas"
                    style={{ fontSize: "40px", lineHeight: 0.9 }}
                  >
                    65%
                  </span>
                  <span className="text-accent-1">→</span>
                  <Placeholder className="text-newsprint">[ result ]</Placeholder>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid rgba(244, 240, 232, 0.18)",
                  borderRadius: "4px",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(244, 240, 232, 0.78)",
                    marginBottom: "8px",
                  }}
                >
                  Quote turnaround
                </div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    className="font-bebas"
                    style={{ fontSize: "40px", lineHeight: 0.9 }}
                  >
                    Up to 1 day
                  </span>
                  <span className="text-accent-1">→</span>
                  <Placeholder className="text-newsprint">[ result ]</Placeholder>
                </div>
              </div>
            </div>

            <Link
              href="/ai-accelerator#example"
              className="text-fern font-medium"
              style={{
                fontSize: "15px",
                borderBottom: "2px solid #7FC99A",
                paddingBottom: "3px",
              }}
            >
              See the full program →
            </Link>
          </div>

          {/* Steps */}
          <div style={{ borderTop: "1px solid rgba(244, 240, 232, 0.25)" }}>
            {aiExampleSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(244, 240, 232, 0.14)",
                }}
              >
                <span
                  className="font-bebas text-accent-1"
                  style={{ fontSize: "26px" }}
                >
                  {step.num}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "6px",
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "rgba(244, 240, 232, 0.76)",
                    }}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="text-eyebrow text-accent-2 mb-7">
            What clients say
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            <div
              className="rounded flex flex-col justify-between gap-6"
              style={{
                border: "1.5px dashed rgba(28, 28, 26, 0.3)",
                padding: "28px",
                minHeight: "220px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(28, 28, 26, 0.72)",
                }}
              >
                [ Testimonial + result ]
              </div>
              <div style={{ fontSize: "15px", fontWeight: 500 }}>
                Twin Lions Contracting · AI Accelerator
              </div>
            </div>
            <div
              className="rounded flex flex-col justify-between gap-6"
              style={{
                border: "1.5px dashed rgba(28, 28, 26, 0.3)",
                padding: "28px",
                minHeight: "220px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(28, 28, 26, 0.72)",
                }}
              >
                [ Testimonial + result ]
              </div>
              <div style={{ fontSize: "15px", fontWeight: 500 }}>
                West Coast Homes · AI Accelerator
              </div>
            </div>
            <blockquote
              className="m-0 bg-newsprint rounded flex flex-col justify-between gap-6"
              style={{ padding: "28px", minHeight: "220px" }}
            >
              <p
                className="font-fraunces italic text-forest m-0"
                style={{
                  fontWeight: 900,
                  fontSize: "24px",
                  lineHeight: 1.2,
                }}
              >
                &quot;We are a stronger, smarter organization today thanks to the work
                we did with Junction.&quot;
              </p>
              <cite style={{ fontStyle: "normal", fontSize: "15px", fontWeight: 500 }}>
                Kathy Cooper, CEO, Kootenay Rockies Tourism
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* The Call */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            borderTop: "2px solid #1C1C1A",
            paddingTop: "44px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "36px 48px",
          }}
        >
          <div>
            <div className="text-eyebrow text-accent-2 mb-3.5">
              The first step
            </div>
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              What happens on the call.
            </h2>
          </div>
          {callSteps.map((step) => (
            <div key={step.num}>
              <div
                className="font-bebas text-accent-1"
                style={{ fontSize: "32px", marginBottom: "8px" }}
              >
                {step.num}
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: 500, marginBottom: "6px" }}
              >
                {step.title}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: "rgba(28, 28, 26, 0.76)",
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Not ready banner */}
        <div
          className="bg-sage rounded"
          style={{
            maxWidth: "1320px",
            margin: "40px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            padding: "20px 24px",
          }}
        >
          <span style={{ fontSize: "16px" }}>
            <strong style={{ fontWeight: 500 }}>Not ready for a call?</strong>{" "}
            <span style={{ fontWeight: 300 }}>
              Watch a free training session and see how we teach.
            </span>
          </span>
          <Link
            href="/junctionu"
            className="font-medium whitespace-nowrap"
            style={{
              fontSize: "14px",
              borderBottom: "2px solid #1A4D2E",
              paddingBottom: "2px",
            }}
          >
            Watch free →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        id="start"
        className="bg-forest text-newsprint"
        style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(44px, 6.6vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: "15ch",
            }}
          >
            Twenty minutes. A straight answer on what fits.
          </h2>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "40px" }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
              style={{ padding: "17px 28px" }}
            >
              Book a 20-min call
            </a>
            <Link
              href="/contact"
              className="font-medium text-fern"
              style={{
                fontSize: "15px",
                borderBottom: "2px solid #7FC99A",
                paddingBottom: "3px",
              }}
            >
              Or send us the details →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
