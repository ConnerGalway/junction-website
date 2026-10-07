"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

const teams = ["Twin Lions Contracting", "West Coast Homes", "SMR Plumbing & Heating"];

const deliverables = [
  {
    num: "01",
    title: "A licensed, safe setup",
    description:
      "A shared AI workspace for your leadership team and a one-page AI use policy, in place before anyone loads company data.",
  },
  {
    num: "02",
    title: "Your business brain",
    description:
      "Price lists, terms, policies and the way you write to customers, loaded into one AI project the whole team draws from.",
  },
  {
    num: "03",
    title: "The main build, working",
    description:
      "One bottleneck automated and in daily use by session 4. This is the part we guarantee.",
  },
  {
    num: "04",
    title: "A second build, started",
    description:
      "The next tool underway, with your own people doing the building.",
  },
  {
    num: "05",
    title: "A roadmap for what's next",
    description:
      "The next opportunities to automate, ranked by time saved, so momentum doesn't stop on day 31.",
  },
];

const weeks = [
  {
    week: "Week 0",
    title: "Setup",
    description:
      "Accounts, access, and baseline numbers so we can measure what changes.",
  },
  {
    week: "Session 1",
    title: "Foundations",
    description:
      "On site where possible. Safe setup, your AI policy, and the first quick wins.",
  },
  {
    week: "Session 2",
    title: "Business brain",
    description: "Load what your company knows, so every answer sounds like you.",
  },
  {
    week: "Session 3",
    title: "Documents",
    description: "The quotes, invoices and paperwork that get keyed in by hand.",
  },
  {
    week: "Session 4",
    title: "Build and refine",
    description: "The main build goes live. Roadmap handed over.",
  },
];

const exampleTableData = [
  {
    area: "Collections",
    before: "Terms were 30 days, but only 65% was collected inside 30.",
    cost: "Cash was hard to plan, and the president got pulled into difficult accounts.",
  },
  {
    area: "Quotes",
    before:
      "Material lists arrived handwritten, by text or by email, and codes were typed in by hand.",
    cost: "Each quote took five minutes to a day.",
  },
  {
    area: "Receiving",
    before:
      "PO, supplier invoice and packing slip matched by hand, then keyed in.",
    cost: "The AP role spent its time on data entry.",
  },
  {
    area: "Leadership",
    before: "One person covering three senior roles.",
    cost: "No time left for customers or growth.",
  },
];

const metrics = [
  { label: "30-day collection rate", value: "65%" },
  { label: "Quote turnaround", value: "≤ 1 day" },
  { label: "Leaders using AI daily", value: "1" },
  { label: "Hours saved per leader, weekly", value: "0" },
];

const faqs = [
  {
    q: "Do we need technical people?",
    a: "No. If your team uses email and spreadsheets, they can do this. We pick tools that fit the people in the room, and they do the building with us beside them.",
  },
  {
    q: "Which AI tools do you use?",
    a: "A licensed business AI workspace, chosen in Week 0 to fit your systems, budget and security needs. You own the accounts.",
  },
  {
    q: "Is our company data safe?",
    a: "Session 1 sets up a licensed workspace and a written AI use policy before anyone loads company information.",
  },
  {
    q: "Who should be in the room?",
    a: "The owner or leader who sponsors it, plus the people closest to the bottleneck. Most teams bring four to eight people, and not everyone needs every session.",
  },
  {
    q: "On site or remote?",
    a: "Session 1 runs on site where possible. Sessions 2 to 4 run on site or on Zoom, whichever suits your team.",
  },
  {
    q: "What does it cost?",
    a: "$5,000 per team for the 30 days, including the dashboard, prompt library and roadmap.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div style={{ borderTop: "2px solid #1C1C1A" }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid rgba(28, 28, 26, 0.14)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full flex justify-between items-center gap-4 bg-transparent border-0 cursor-pointer text-left font-dm-sans text-carbon"
            style={{ padding: "20px 0", fontSize: "18px", fontWeight: 500 }}
          >
            <span>{faq.q}</span>
            <span
              className="font-bebas text-accent"
              style={{ fontSize: "26px", lineHeight: 1 }}
            >
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <p
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.78)",
                margin: "0 0 22px",
                maxWidth: "60ch",
              }}
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AIAcceleratorPage() {
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
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="flex items-center gap-3 flex-wrap"
              style={{ marginBottom: "22px" }}
            >
              <span className="text-eyebrow text-accent-shade">
                AI Accelerator · 30 days · any industry
              </span>
              <span
                className="bg-break text-white"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 9px 3px",
                  borderRadius: "2px",
                }}
              >
                New
              </span>
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(46px, 6.6vw, 100px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              We automate one of your bottlenecks in 30 days. Guaranteed.
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                maxWidth: "46ch",
                margin: "28px 0 32px",
              }}
            >
              A hands-on program for leadership teams. Four one-hour sessions on
              your real work. You leave with AI tools already running, and a team
              that knows how to build the next one.
            </p>
            <div
              className="flex items-baseline gap-3.5 flex-wrap"
              style={{ marginBottom: "28px" }}
            >
              <span
                className="font-bebas text-forest"
                style={{ fontSize: "64px", lineHeight: 0.85 }}
              >
                $5,000
              </span>
              <span style={{ fontSize: "15px", color: "rgba(28, 28, 26, 0.7)" }}>
                per team · on site or Zoom
              </span>
            </div>
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
                href="#example"
                className="font-medium whitespace-nowrap"
                style={{
                  fontSize: "15px",
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                See a real program ↓
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div
            className="bg-carbon text-newsprint rounded flex flex-col gap-5"
            style={{ padding: "clamp(24px, 3vw, 36px)" }}
          >
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <span
                className="text-accent"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Your program dashboard
              </span>
              <span
                style={{ fontSize: "13px", color: "rgba(244, 240, 232, 0.7)" }}
              >
                3 of 4 sessions done
              </span>
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(244, 240, 232, 0.14)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                className="bg-fern"
                style={{ height: "100%", width: "75%" }}
              />
            </div>
            <div className="flex flex-col">
              {[
                { label: "Week 0 · Setup", status: "Done" },
                { label: "Session 1 · Foundations", status: "Done" },
                { label: "Session 2 · Business brain", status: "Done" },
                { label: "Session 3 · Documents", status: "Done" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5"
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(244, 240, 232, 0.1)",
                  }}
                >
                  <span
                    className="bg-fern rounded-sm flex-shrink-0"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span style={{ fontSize: "15px", flex: 1 }}>{item.label}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(244, 240, 232, 0.6)",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
              <div
                className="flex items-center gap-3.5"
                style={{ padding: "12px 0" }}
              >
                <span
                  className="flex-shrink-0 rounded-sm"
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "1.5px solid #7FC99A",
                  }}
                />
                <span style={{ fontSize: "15px", flex: 1 }}>
                  Session 4 · Build and refine
                </span>
                <span className="text-fern" style={{ fontSize: "12px" }}>
                  Next
                </span>
              </div>
            </div>
            <div
              className="rounded-[3px] flex justify-between gap-3 flex-wrap"
              style={{
                background: "rgba(127, 201, 154, 0.12)",
                padding: "14px 16px",
                fontSize: "14px",
              }}
            >
              <span>Main build: Collections assistant</span>
              <span className="text-fern font-medium">Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* Teams strip */}
      <section
        style={{
          borderTop: "1px solid rgba(28, 28, 26, 0.12)",
          borderBottom: "1px solid rgba(28, 28, 26, 0.12)",
          padding: "24px clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "12px 32px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.6)",
            }}
          >
            Teams who&apos;ve been through it
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 32px",
              fontSize: "17px",
              fontWeight: 500,
            }}
          >
            {teams.map((team) => (
              <span key={team}>{team}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          <div>
            <div className="text-eyebrow text-accent-shade mb-4">
              What you leave with
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
              Tools that run on Monday morning.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                margin: 0,
                maxWidth: "42ch",
              }}
            >
              Your team learns AI by building with it on the jobs that eat their
              week: quotes, collections, paperwork, admin. Plus a custom dashboard
              and prompt library you keep.
            </p>
          </div>
          <div style={{ borderTop: "2px solid #1C1C1A" }}>
            {deliverables.map((item) => (
              <div
                key={item.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                }}
              >
                <span
                  className="font-bebas text-accent"
                  style={{ fontSize: "28px" }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "19px",
                      fontWeight: 500,
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "rgba(28, 28, 26, 0.76)",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 30 Days */}
      <section
        className="bg-forest text-newsprint"
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            className="text-fern"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            How the 30 days run
          </div>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 4.6vw, 64px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              margin: "0 0 44px",
              maxWidth: "18ch",
            }}
          >
            Four one-hour sessions. One a week.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "2px",
            }}
          >
            {weeks.map((w) => (
              <div
                key={w.week}
                style={{
                  background: "rgba(244, 240, 232, 0.06)",
                  padding: "24px",
                }}
              >
                <div
                  className="font-bebas text-fern"
                  style={{ fontSize: "22px", letterSpacing: "0.04em" }}
                >
                  {w.week}
                </div>
                <div
                  style={{ fontSize: "18px", fontWeight: 500, margin: "8px 0" }}
                >
                  {w.title}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: "rgba(244, 240, 232, 0.8)",
                  }}
                >
                  {w.description}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 240, 232, 0.78)",
              margin: "28px 0 0",
            }}
          >
            We schedule around your busiest hours, so customers aren&apos;t left
            waiting.
          </p>
        </div>
      </section>

      {/* Example Program */}
      <section
        id="example"
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
              marginBottom: "40px",
            }}
          >
            <div>
              <div className="text-eyebrow text-accent-shade mb-4">
                Example program · building supply · 7 people
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
                Where they started.
              </h2>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                margin: 0,
                maxWidth: "46ch",
              }}
            >
              A family-owned supplier whose president was also covering GM and CFO
              duties. His goal: &quot;Assistant capacity for me without a new hire.&quot;
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded overflow-hidden">
            <div
              className="bg-carbon text-newsprint"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(120px, 0.6fr) minmax(0, 1.4fr) minmax(0, 1fr)",
                gap: "20px",
                padding: "16px 24px",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span>Area</span>
              <span>What happened before</span>
              <span>What it cost</span>
            </div>
            {exampleTableData.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(120px, 0.6fr) minmax(0, 1.4fr) minmax(0, 1fr)",
                  gap: "20px",
                  padding: "20px 24px",
                  borderBottom:
                    i < exampleTableData.length - 1
                      ? "1px solid rgba(28, 28, 26, 0.1)"
                      : "none",
                  fontSize: "16px",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ fontWeight: 500 }}>{row.area}</strong>
                <span style={{ fontWeight: 300 }}>{row.before}</span>
                <span style={{ fontWeight: 300 }}>{row.cost}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <h3
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              margin: "56px 0 24px",
            }}
          >
            What we measured.
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "16px",
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{ borderTop: "2px solid #1C1C1A", paddingTop: "16px" }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(28, 28, 26, 0.7)",
                    marginBottom: "10px",
                  }}
                >
                  {m.label}
                </div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span
                    className="font-bebas"
                    style={{ fontSize: "44px", lineHeight: 0.9 }}
                  >
                    {m.value}
                  </span>
                  <span className="text-accent">→</span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "rgba(28, 28, 26, 0.6)",
                      border: "1.5px dashed rgba(28, 28, 26, 0.3)",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    [ result ]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "20px",
          }}
        >
          {teams.map((team) => (
            <div
              key={team}
              className="rounded flex flex-col justify-between gap-6"
              style={{
                border: "1.5px dashed rgba(28, 28, 26, 0.3)",
                padding: "28px",
                minHeight: "200px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(28, 28, 26, 0.58)",
                }}
              >
                [ Testimonial + result ]
              </div>
              <div style={{ fontSize: "15px", fontWeight: 500 }}>{team}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee & FAQ */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "40px 80px",
            alignItems: "start",
          }}
        >
          {/* Guarantee */}
          <div
            className="rounded"
            style={{
              border: "2px solid #E0176A",
              padding: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B0104F",
                marginBottom: "16px",
              }}
            >
              The guarantee
            </div>
            <div
              className="font-epilogue"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                marginBottom: "18px",
              }}
            >
              One bottleneck automated and working by day 30.
            </div>
            <p
              style={{
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.78)",
                margin: "0 0 18px",
              }}
            >
              We agree on the bottleneck together in Week 0, with a clear
              definition of &quot;working.&quot;
            </p>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "rgba(28, 28, 26, 0.6)",
                border: "1.5px dashed rgba(28, 28, 26, 0.3)",
                padding: "12px 14px",
                borderRadius: "3px",
              }}
            >
              [ Guarantee terms: what happens if it isn&apos;t, e.g. we keep working
              at no cost until it is ]
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="text-eyebrow text-accent-shade mb-3">Questions</div>
            <FAQAccordion />
          </div>
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
            What&apos;s eating your team&apos;s week?
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(244, 240, 232, 0.84)",
              margin: "24px 0 0",
              maxWidth: "46ch",
            }}
          >
            Bring it to a 20-minute call. We&apos;ll tell you whether it&apos;s a good
            first build, and what 30 days would look like.
          </p>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "36px" }}
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
              href="/contact?type=ai"
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
