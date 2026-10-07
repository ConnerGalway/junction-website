"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

const scoreData = [
  { label: "Website & technical", value: 78 },
  { label: "Reviews & reputation", value: 71 },
  { label: "Booking & conversion", value: 80 },
  { label: "Social media & content", value: 62 },
  { label: "Customer experience", value: 84 },
  { label: "Local visibility", value: 81 },
];

const deliverables = [
  {
    num: "01",
    title: "A scored digital assessment",
    description:
      "Your website, reviews, booking and conversion, social, customer experience and local visibility, each scored with specific findings.",
  },
  {
    num: "02",
    title: "A strategy built around your goal",
    description:
      "Positioning, objectives and the tactics that matter for your budget, worked out with you in a coaching session.",
  },
  {
    num: "03",
    title: "An interactive 90-day plan",
    description:
      "A 12-week roadmap with quick wins, how-to guides and checklists. Your progress saves automatically.",
  },
  {
    num: "04",
    title: "Three coaching touchpoints",
    description:
      "Time with your coach at the start, along the way and at the finish, to unstick what's stuck.",
  },
  {
    num: "05",
    title: "Reassessments that track progress",
    description:
      "We re-score your marketing so you can see exactly what moved, and show it to your partners or your board.",
  },
];

const taskData = [
  { label: "Filter bot traffic out of your analytics", meta: "20 min · You" },
  {
    label: "Mark real enquiries and bookings as conversions",
    meta: "20 min · You",
  },
  { label: "Take expired offers off your homepage", meta: "15 min · You" },
  {
    label: "Record a clean 30-day baseline",
    meta: "30 min · You or your developer",
  },
];

const touchpoints = [
  {
    label: "Touchpoint 1 · Start",
    title: "Assessment and strategy",
    description:
      "We walk through your score, agree the goal, and hand over your plan.",
  },
  {
    label: "Touchpoint 2 · Midway",
    title: "Reassess and adjust",
    description:
      "A fresh score, a look at what's working, and changes to the plan where it isn't.",
  },
  {
    label: "Touchpoint 3 · Day 90",
    title: "Final score and what's next",
    description:
      "Before and after, side by side, plus a plan for keeping it going on your own.",
  },
];

const faqs = [
  {
    q: "Who is it for?",
    a: "Small businesses in any industry with a website, real customers, and no marketing team.",
  },
  {
    q: "How much time does it take?",
    a: "Plan on two to three hours a week. Each task tells you how long it takes and who should do it.",
  },
  {
    q: "What happens after day 90?",
    a: "You keep the plan, the guides and your progress. Many teams follow it with the AI Accelerator.",
  },
];

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value < 70 ? "#E0176A" : "#2E7D4F";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) 34px",
        gap: "12px",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      <span>{label}</span>
      <div
        style={{
          height: "6px",
          background: "rgba(28, 28, 26, 0.1)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ height: "100%", width: `${value}%`, background: color }}
        />
      </div>
      <span style={{ fontWeight: 500, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function TaskChecklist() {
  const [done, setDone] = useState([false, false, false, false]);
  const doneCount = done.filter(Boolean).length;
  const pct = (doneCount / 4) * 100;
  const allDone = doneCount === 4;

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div
      className="bg-newsprint text-carbon rounded"
      style={{ padding: "clamp(24px, 3vw, 36px)" }}
    >
      <div
        className="flex justify-between items-baseline gap-3 flex-wrap"
        style={{ marginBottom: "6px" }}
      >
        <span
          className="font-bebas text-accent-shade"
          style={{ fontSize: "26px", letterSpacing: "0.04em" }}
        >
          Week 1 · Tracking setup
        </span>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>
          {doneCount} / 4
        </span>
      </div>
      <div
        style={{
          height: "6px",
          background: "rgba(28, 28, 26, 0.1)",
          borderRadius: "3px",
          overflow: "hidden",
          marginBottom: "12px",
        }}
      >
        <div
          className="bg-canopy"
          style={{
            height: "100%",
            width: `${pct}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      </div>
      {taskData.map((task, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className="w-full flex items-start gap-3.5 border-0 bg-transparent cursor-pointer text-left font-dm-sans text-carbon"
          style={{
            padding: "16px 0",
            borderBottom: "1px solid rgba(28, 28, 26, 0.12)",
          }}
        >
          <span
            className="flex-shrink-0 rounded-[3px] flex items-center justify-center"
            style={{
              width: "22px",
              height: "22px",
              marginTop: "1px",
              fontSize: "14px",
              fontWeight: 500,
              background: done[i] ? "#2E7D4F" : "transparent",
              border: "1.5px solid #2E7D4F",
              color: "#F4F0E8",
            }}
          >
            {done[i] ? "✓" : ""}
          </span>
          <span className="flex flex-col gap-1">
            <span
              style={{
                fontSize: "16px",
                fontWeight: 500,
                textDecoration: done[i] ? "line-through" : "none",
              }}
            >
              {task.label}
            </span>
            <span style={{ fontSize: "13px", color: "rgba(28, 28, 26, 0.72)" }}>
              {task.meta}
            </span>
          </span>
        </button>
      ))}
      {allDone && (
        <div
          className="text-forest font-medium"
          style={{ marginTop: "16px", fontSize: "15px" }}
        >
          Week 1 done. That&apos;s how it feels. →
        </div>
      )}
    </div>
  );
}

export default function AcceleratorPage() {
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
            <div className="text-eyebrow text-accent-shade mb-5">
              The Accelerator · 90 days · small businesses
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(46px, 6.8vw, 104px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              A 90-day marketing plan you&apos;ll actually work.
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
              We score your digital marketing, build the plan with you, and
              reassess along the way so you can see the score move. The plan
              lives online: a week-by-week roadmap, step-by-step guides, and
              checklists that save as you go.
            </p>
            <div
              className="flex items-baseline gap-3.5 flex-wrap"
              style={{ marginBottom: "10px" }}
            >
              <span
                className="font-bebas text-forest"
                style={{ fontSize: "64px", lineHeight: 0.85 }}
              >
                $2,500
              </span>
              <span style={{ fontSize: "15px", color: "rgba(28, 28, 26, 0.7)" }}>
                3 coaching sessions · 90-day plan
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(28, 28, 26, 0.7)",
                marginBottom: "28px",
              }}
            >
              Some industry and regional partners cover 25–100%. Ask on the call.
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
                href="#plan"
                className="font-medium whitespace-nowrap"
                style={{
                  fontSize: "15px",
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                Try a week of the plan ↓
              </a>
            </div>
          </div>

          {/* Assessment Preview */}
          <div
            className="bg-white rounded flex flex-col gap-5"
            style={{ padding: "clamp(24px, 3vw, 36px)" }}
          >
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <span className="text-eyebrow text-accent-shade">
                Your digital assessment
              </span>
              <span style={{ fontSize: "12px", color: "rgba(28, 28, 26, 0.72)" }}>
                Sample client
              </span>
            </div>
            <div className="flex items-end gap-4">
              <span
                className="font-bebas text-forest"
                style={{ fontSize: "96px", lineHeight: 0.8 }}
              >
                74
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "rgba(28, 28, 26, 0.7)",
                  paddingBottom: "6px",
                }}
              >
                / 100 overall
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {scoreData.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
            <div
              className="bg-sage rounded-[3px]"
              style={{
                padding: "14px 16px",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ fontWeight: 500 }}>Next step · Week 1:</strong>{" "}
              clean up your analytics before spending anything on ads.
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section
        style={{
          padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)",
          borderTop: "1px solid rgba(28, 28, 26, 0.12)",
        }}
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
              What you get
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
              A plan with your name on every task.
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
              Every task says how long it takes, who does it, and how to do it.
              If a step needs a contractor, the plan includes the brief and a
              price range.
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

      {/* Plan Demo */}
      <section
        id="plan"
        className="bg-forest text-newsprint"
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
            alignItems: "center",
          }}
        >
          <div>
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
              Try it
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
              This is what week one looks like.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.84)",
                margin: "0 0 28px",
                maxWidth: "42ch",
              }}
            >
              Tick the tasks off. In the real plan, every week works like this,
              and your coach sees your progress before each session.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "2px",
                fontSize: "13px",
              }}
            >
              <div
                className="bg-fern text-carbon"
                style={{ padding: "12px" }}
              >
                <div style={{ fontWeight: 500 }}>Weeks 1–3</div>
                <div>Foundation</div>
              </div>
              <div
                style={{
                  background: "rgba(244, 240, 232, 0.1)",
                  padding: "12px",
                }}
              >
                <div style={{ fontWeight: 500 }}>Weeks 4–6</div>
                <div>Build</div>
              </div>
              <div
                style={{
                  background: "rgba(244, 240, 232, 0.1)",
                  padding: "12px",
                }}
              >
                <div style={{ fontWeight: 500 }}>Weeks 7–9</div>
                <div>Launch</div>
              </div>
              <div
                style={{
                  background: "rgba(244, 240, 232, 0.1)",
                  padding: "12px",
                }}
              >
                <div style={{ fontWeight: 500 }}>Weeks 10–12</div>
                <div>Scale</div>
              </div>
            </div>
          </div>
          <TaskChecklist />
        </div>
      </section>

      {/* Touchpoints */}
      <section
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="text-eyebrow text-accent-shade mb-4">
            How the 90 days run
          </div>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 4.6vw, 64px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              margin: "0 0 44px",
            }}
          >
            Three touchpoints. One score that moves.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "20px",
            }}
          >
            {touchpoints.map((tp) => (
              <div
                key={tp.label}
                className="bg-white rounded-b"
                style={{
                  borderTop: "4px solid #1A4D2E",
                  padding: "28px",
                }}
              >
                <div
                  className="font-bebas text-accent"
                  style={{ fontSize: "24px", letterSpacing: "0.04em" }}
                >
                  {tp.label}
                </div>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 500,
                    margin: "10px 0 8px",
                  }}
                >
                  {tp.title}
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
                  {tp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
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
          <div
            className="bg-carbon text-newsprint rounded flex flex-col gap-2.5"
            style={{ padding: "28px" }}
          >
            <div
              className="font-bebas text-accent"
              style={{ fontSize: "80px", lineHeight: 0.85 }}
            >
              +300%
            </div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>
              Past the engagement goal
            </div>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "rgba(244, 240, 232, 0.78)",
                margin: 0,
              }}
            >
              Accelerator rolled out across a provincial association&apos;s member
              businesses, with bookings up inside three months.
            </p>
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
              [ Score change from a recent client, e.g. 58 → 81 ]
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500 }}>
              [ Business name · industry ]
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
              [ Testimonial ]
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500 }}>
              [ Owner name · business ]
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "32px 48px",
            borderTop: "2px solid #1C1C1A",
            paddingTop: "36px",
          }}
        >
          {faqs.map((faq) => (
            <div key={faq.q}>
              <div
                style={{ fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}
              >
                {faq.q}
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
                {faq.a}
              </p>
            </div>
          ))}
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
            Find out your score in the first week.
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
              href="/contact?type=accelerator"
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
