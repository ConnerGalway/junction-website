"use client";

import Image from "next/image";
import Link from "next/link";
import { Header, Footer, useCountUp, formatStat } from "@/components";
import { useEffect, useState } from "react";

// Stats component with count-up animation
function StatStrip() {
  const [statPros, prosRef] = useCountUp(2000);
  const [statBiz, bizRef] = useCountUp(300);
  const [statEng, engRef] = useCountUp(300);
  const [statYrs, yrsRef] = useCountUp(14);

  return (
    <section
      style={{
        borderTop: "1px solid rgba(28, 28, 26, 0.12)",
        borderBottom: "1px solid rgba(28, 28, 26, 0.12)",
      }}
    >
      <div
        className="content-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <div
          ref={prosRef}
          style={{
            padding: "28px clamp(20px, 3vw, 40px)",
            borderRight: "1px solid rgba(28, 28, 26, 0.1)",
          }}
        >
          <div
            className="font-bebas text-accent"
            style={{
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: "0.9",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatStat(statPros, "", "+")}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.62)",
              marginTop: "8px",
            }}
          >
            Professionals trained
          </div>
        </div>

        <div
          ref={bizRef}
          style={{
            padding: "28px clamp(20px, 3vw, 40px)",
            borderRight: "1px solid rgba(28, 28, 26, 0.1)",
          }}
        >
          <div
            className="font-bebas text-accent"
            style={{
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: "0.9",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatStat(statBiz, "", "+")}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.62)",
              marginTop: "8px",
            }}
          >
            Yukon businesses, 4 years
          </div>
        </div>

        <div
          ref={engRef}
          style={{
            padding: "28px clamp(20px, 3vw, 40px)",
            borderRight: "1px solid rgba(28, 28, 26, 0.1)",
          }}
        >
          <div
            className="font-bebas text-accent"
            style={{
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: "0.9",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatStat(statEng, "+", "%")}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.62)",
              marginTop: "8px",
            }}
          >
            Past ITBC engagement goals
          </div>
        </div>

        <div ref={yrsRef} style={{ padding: "28px clamp(20px, 3vw, 40px)" }}>
          <div
            className="font-bebas text-accent"
            style={{
              fontSize: "clamp(48px, 5vw, 72px)",
              lineHeight: "0.9",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {statYrs}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.62)",
              marginTop: "8px",
            }}
          >
            Years in the visitor economy
          </div>
        </div>
      </div>
    </section>
  );
}

// JunctionU card with animated progress bar
function JunctionUCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(62), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-newsprint rounded"
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        maxWidth: "520px",
        width: "100%",
        justifySelf: "end",
      }}
    >
      <div className="flex justify-between items-center gap-3">
        <span
          className="font-bebas text-accent-shade"
          style={{ fontSize: "22px", letterSpacing: "0.06em" }}
        >
          JU 101
        </span>
        <span
          className="bg-forest text-newsprint"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "5px 10px 4px",
            borderRadius: "2px",
          }}
        >
          In progress
        </span>
      </div>
      <div
        className="font-epilogue"
        style={{
          fontWeight: 900,
          fontSize: "28px",
          lineHeight: "1.02",
          letterSpacing: "-0.02em",
        }}
      >
        Tourism Digital Marketing Essentials
      </div>
      <div style={{ fontSize: "14px", color: "rgba(28, 28, 26, 0.66)" }}>
        8 modules · 6 hrs · Certificate
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(28, 28, 26, 0.14)",
          paddingTop: "18px",
        }}
      >
        <div
          className="flex justify-between text-sm mb-2.5"
          style={{ marginBottom: "10px" }}
        >
          <span>Lesson 3 · Your Google Business Profile</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div
          style={{
            height: "6px",
            background: "rgba(28, 28, 26, 0.1)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            className="bg-canopy"
            style={{
              height: "100%",
              width: `${progress}%`,
              transition: "width 1.2s cubic-bezier(0.2, 0.7, 0.2, 1)",
            }}
          />
        </div>
      </div>
      <div className="text-forest" style={{ fontSize: "14px", fontWeight: 500 }}>
        Continue →
      </div>
    </div>
  );
}

// Case study section with animated stat
function CaseStudySection() {
  const [bigStat, bigRef] = useCountUp(900000);

  return (
    <section ref={bigRef} className="bg-forest text-newsprint section-padding">
      <div
        className="content-container two-col-grid"
        style={{ gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}
      >
        <div>
          <div
            className="text-fern"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "22px",
            }}
          >
            Case study · Town of Okotoks
          </div>
          <div
            className="font-bebas text-fern"
            style={{
              fontSize: "clamp(84px, 12vw, 184px)",
              lineHeight: "0.85",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ${bigStat.toLocaleString()}+
          </div>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              margin: "24px 0 18px",
              maxWidth: "20ch",
            }}
          >
            What one small town's visitors were worth.
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(244, 240, 232, 0.82)",
              margin: "0 0 32px",
              maxWidth: "48ch",
            }}
          >
            Potential local spend we identified for Okotoks businesses ahead of
            4,500 visitors. Then we turned it into a checklist every operator
            could act on in under an hour.
          </p>
          <Link
            href="/work"
            className="inline-block bg-newsprint text-forest rounded-[3px] text-button transition-colors hover:bg-sage"
            style={{ padding: "15px 24px" }}
          >
            See the work
          </Link>
        </div>
        <Image
          src="/assets/photo-townscape.png"
          alt="Okotoks main street"
          width={640}
          height={480}
          className="w-full rounded object-cover"
          style={{ aspectRatio: "4/3" }}
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 64px)",
        }}
      >
        <div
          className="content-container two-col-grid"
          style={{ gap: "clamp(32px, 5vw, 72px)", alignItems: "end" }}
        >
          <div>
            <div
              className="text-accent-shade"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "22px",
              }}
            >
              Destination marketing · Training · AI
            </div>
            <h1 className="text-h1 m-0" style={{ textWrap: "balance" }}>
              Technology should serve your goals. We make sure it does.
            </h1>
            <p
              className="text-body"
              style={{
                color: "rgba(28, 28, 26, 0.74)",
                maxWidth: "46ch",
                margin: "28px 0 36px",
                textWrap: "pretty",
              }}
            >
              Junction is where organizations and technology meet. We build
              marketing strategy for destinations, and we train the people who
              deliver it. 2,000+ of them so far.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <Link
                href="#start"
                className="text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
                style={{ padding: "16px 26px" }}
              >
                Start a conversation
              </Link>
              <Link
                href="/junctionu"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                Explore JunctionU →
              </Link>
            </div>
          </div>
          <Image
            src="/assets/photo-mountains.png"
            alt="Mountain town at dusk"
            width={640}
            height={800}
            className="w-full rounded object-cover"
            style={{ aspectRatio: "4/5", maxHeight: "640px" }}
          />
        </div>
      </section>

      {/* Stats */}
      <StatStrip />

      {/* Client logos */}
      <section style={{ padding: "44px clamp(20px, 4vw, 48px)" }}>
        <div className="content-container">
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(28, 28, 26, 0.6)",
              marginBottom: "24px",
            }}
          >
            Clients include
          </div>
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "32px 64px" }}
          >
            <Image
              src="/uploads/Destination BC logo.png"
              alt="Destination British Columbia"
              width={200}
              height={62}
              style={{ height: "62px", width: "auto" }}
            />
            <Image
              src="/uploads/yukon logo.svg"
              alt="Travel Yukon"
              width={200}
              height={56}
              style={{ height: "56px", width: "auto" }}
            />
            <Image
              src="/uploads/OSW Logo.webp"
              alt="Ontario's Southwest"
              width={200}
              height={62}
              style={{ height: "62px", width: "auto" }}
            />
            <Image
              src="/uploads/kootenay rockies logo.png"
              alt="Kootenay Rockies Tourism"
              width={200}
              height={72}
              style={{ height: "72px", width: "auto" }}
            />
            <Image
              src="/assets/logo-itbc.png"
              alt="Indigenous Tourism BC"
              width={200}
              height={56}
              style={{ height: "56px", width: "auto" }}
            />
            <Image
              src="/assets/logo-travel-alberta.png"
              alt="Travel Alberta"
              width={200}
              height={72}
              style={{ height: "72px", width: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Services section */}
      <section
        id="services"
        className="section-padding"
        style={{ borderTop: "1px solid rgba(28, 28, 26, 0.12)" }}
      >
        <div className="content-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: "24px 72px",
              alignItems: "end",
              marginBottom: "48px",
            }}
          >
            <div>
              <div
                className="text-accent-shade"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                What we do
              </div>
              <h2 className="text-h2 m-0">Two ways to work with us.</h2>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.74)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              We only do strategy and training, so every recommendation is there
              because it works. No websites, no ad buying, no commissions.
            </p>
          </div>

          <div
            className="two-col-grid"
            style={{ borderTop: "2px solid #1C1C1A" }}
          >
            <Link
              href="/services"
              className="flex flex-col gap-4 transition-colors hover:bg-[rgba(196,150,58,0.08)]"
              style={{
                padding: "36px clamp(0px, 3vw, 40px) 40px 0",
                borderBottom: "1px solid rgba(28, 28, 26, 0.15)",
              }}
            >
              <div
                className="font-bebas text-accent"
                style={{ fontSize: "28px", letterSpacing: "0.04em" }}
              >
                01
              </div>
              <h3
                className="font-epilogue m-0"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(26px, 2.6vw, 36px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Marketing strategy
              </h3>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(28, 28, 26, 0.74)",
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                Research-led strategy for destinations and the organizations
                behind them, built around what actually drives visitation. Your
                team runs it after we hand it over.
              </p>
              <span
                className="text-accent-shade mt-auto"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                How we work →
              </span>
            </Link>

            <Link
              href="/junctionu"
              className="flex flex-col gap-4 transition-colors hover:bg-[rgba(196,150,58,0.08)]"
              style={{
                padding: "36px clamp(0px, 3vw, 40px) 40px",
                borderBottom: "1px solid rgba(28, 28, 26, 0.15)",
                borderLeft: "1px solid rgba(28, 28, 26, 0.15)",
              }}
            >
              <div
                className="font-bebas text-accent"
                style={{ fontSize: "28px", letterSpacing: "0.04em" }}
              >
                02
              </div>
              <h3
                className="font-epilogue m-0"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(26px, 2.6vw, 36px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Training that sticks
              </h3>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(28, 28, 26, 0.74)",
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                Workshops, the Accelerator, AI training and the JunctionU
                platform. Everything we teach is doable in under an hour, by the
                person doing the work on Tuesday.
              </p>
              <span
                className="text-accent-shade mt-auto"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Explore training →
              </span>
            </Link>
          </div>

          {/* DMO callout */}
          <Link
            href="/services"
            className="flex items-center justify-between gap-5 flex-wrap mt-8 rounded transition-colors hover:bg-[rgba(224,23,106,0.04)]"
            style={{
              padding: "22px 26px",
              border: "1.5px solid #E0176A",
            }}
          >
            <span style={{ fontSize: "17px" }}>
              <strong className="font-medium">Run a destination?</strong>{" "}
              <span
                className="font-light"
                style={{ color: "rgba(28, 28, 26, 0.78)" }}
              >
                Fund training for every operator in your region, from 25% to
                fully covered.
              </span>
            </span>
            <span
              style={{ fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}
            >
              Destination partnerships →
            </span>
          </Link>
        </div>
      </section>

      {/* Case Study */}
      <CaseStudySection />

      {/* AI Training */}
      <section id="ai" className="section-padding">
        <div
          className="content-container two-col-grid"
          style={{ gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}
        >
          <div>
            <div
              className="flex items-center gap-3"
              style={{ marginBottom: "20px" }}
            >
              <span
                className="text-accent-shade"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                AI training · 30 days
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
            <h2 className="text-h2 mb-6" style={{ textWrap: "balance" }}>
              We automate one of your bottlenecks before day 30. Guaranteed.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.74)",
                margin: "0 0 32px",
                maxWidth: "46ch",
              }}
            >
              A 30-day program for marketing teams, in and beyond tourism. Your
              team learns AI on your real work and leaves with systems already
              running.
            </p>
            <Link
              href="/services"
              className="inline-block text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
              style={{ padding: "15px 24px" }}
            >
              Bring it to your team
            </Link>
          </div>

          <div style={{ borderTop: "2px solid #1C1C1A" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(28, 28, 26, 0.6)",
                padding: "18px 0 6px",
              }}
            >
              In the 30 days
            </div>
            {[
              { num: "01", text: "4 live training sessions with your team" },
              { num: "02", text: "A custom training dashboard" },
              { num: "03", text: "A prompt library your team keeps" },
              { num: "04", text: "A 90-day implementation plan" },
              {
                num: "05",
                text: "At least one business bottleneck, automated",
                bold: true,
              },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  alignItems: "baseline",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                }}
              >
                <span
                  className="font-bebas text-accent"
                  style={{ fontSize: "26px" }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: item.bold ? 500 : 300,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Receipts */}
      <section
        id="work"
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          className="content-container"
          style={{
            borderTop: "1px solid rgba(28, 28, 26, 0.12)",
            paddingTop: "clamp(56px, 7vw, 96px)",
          }}
        >
          <div
            className="flex items-end justify-between gap-6 flex-wrap"
            style={{ marginBottom: "40px" }}
          >
            <div>
              <div
                className="text-accent-shade"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                Work
              </div>
              <h2 className="text-h2 m-0">The receipts.</h2>
            </div>
            <Link
              href="/work"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                borderBottom: "2px solid #C4963A",
                paddingBottom: "3px",
              }}
            >
              All case studies →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                stat: "300+",
                label: "Travel Yukon · Go Digital",
                text: "Businesses through the program in four years. Alumni now lead it.",
              },
              {
                stat: "+300%",
                label: "Indigenous Tourism BC · Accelerator",
                text: "Past engagement goals, with bookings up inside three months.",
              },
              {
                stat: "2026",
                label: "Ontario's Southwest · Research",
                text: "Our Traveller Insights Study drives the region's 2026 tourism strategy.",
              },
            ].map((card) => (
              <Link
                key={card.stat}
                href="/work"
                className="flex flex-col gap-2.5 bg-white rounded transition-colors hover:bg-sage"
                style={{ padding: "28px" }}
              >
                <div
                  className="font-bebas text-accent"
                  style={{ fontSize: "72px", lineHeight: "0.9" }}
                >
                  {card.stat}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(28, 28, 26, 0.62)",
                    marginTop: "6px",
                  }}
                >
                  {card.label}
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {card.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JunctionU section */}
      <section id="junctionu" className="bg-sage section-padding">
        <div
          className="content-container two-col-grid"
          style={{ gap: "clamp(32px, 5vw, 80px)", alignItems: "center" }}
        >
          <div>
            <div
              className="text-forest"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              JunctionU · formerly eLearningU
            </div>
            <h2 className="text-h2 mb-6" style={{ textWrap: "balance" }}>
              Training that fits between two guest check-ins.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.8)",
                margin: "0 0 32px",
                maxWidth: "46ch",
              }}
            >
              Certificate courses, workshops and free Tourism Talks, built for
              tourism professionals. A free account gets you the Talks and a
              starter course.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <Link
                href="/junctionu"
                className="text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-carbon"
                style={{ padding: "15px 24px" }}
              >
                Start free
              </Link>
              <Link
                href="/junctionu"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "2px solid #1A4D2E",
                  paddingBottom: "3px",
                }}
              >
                Browse courses →
              </Link>
            </div>
          </div>
          <JunctionUCard />
        </div>
      </section>

      {/* Ideas section */}
      <section id="ideas" className="section-padding">
        <div
          className="content-container two-col-grid"
          style={{ gap: "clamp(40px, 5vw, 80px)", alignItems: "start" }}
        >
          <div>
            <div
              className="text-accent-shade"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Ideas
            </div>
            <div style={{ borderTop: "2px solid #1C1C1A" }}>
              {[
                {
                  date: "JUL 14",
                  category: "MARKETING",
                  title: "Maybe the algorithm isn't the problem",
                },
                {
                  date: "JUL 6",
                  category: "TRENDS",
                  title: "The year of the creator economy",
                },
                {
                  date: "JUN 8",
                  category: "AI",
                  title: "The four phases of AI adoption",
                },
              ].map((article) => (
                <Link
                  key={article.title}
                  href="/ideas"
                  className="block transition-colors hover:bg-[rgba(196,150,58,0.08)]"
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(28, 28, 26, 0.6)",
                      marginBottom: "6px",
                    }}
                  >
                    {article.date} · {article.category}
                  </div>
                  <div
                    className="font-epilogue"
                    style={{
                      fontWeight: 900,
                      fontSize: "24px",
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {article.title}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/ideas"
              className="inline-block mt-6"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                borderBottom: "2px solid #C4963A",
                paddingBottom: "3px",
              }}
            >
              All 100+ articles →
            </Link>
          </div>

          {/* Newsletter */}
          <div
            className="bg-carbon text-newsprint rounded"
            style={{ padding: "clamp(28px, 4vw, 48px)" }}
          >
            <div
              className="text-accent"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              The Brief · weekly
            </div>
            <h3
              className="font-epilogue"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                margin: "0 0 16px",
              }}
            >
              Start every week knowing something your competitors don't.
            </h3>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.78)",
                margin: "0 0 28px",
              }}
            >
              The award-winning newsletter for tourism marketers. Free, weekly,
              unsubscribe anytime.
            </p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="you@yourbusiness.com"
                className="flex-1 rounded-[3px] font-dm-sans"
                style={{
                  minWidth: "200px",
                  padding: "14px 16px",
                  border: "1px solid rgba(244, 240, 232, 0.3)",
                  background: "transparent",
                  color: "#F4F0E8",
                  fontSize: "15px",
                }}
              />
              <button
                className="text-button bg-fern text-carbon rounded-[3px] cursor-pointer transition-colors hover:bg-sage"
                style={{
                  padding: "14px 22px",
                  border: 0,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        id="start"
        className="bg-forest text-newsprint section-padding-cta"
      >
        <div className="content-container">
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(44px, 6.6vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Tell us the goal. We'll be straight with you about the rest.
          </h2>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "40px" }}
          >
            <Link
              href="#"
              className="text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
              style={{ padding: "17px 28px" }}
            >
              Start a conversation
            </Link>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 300,
                color: "rgba(244, 240, 232, 0.82)",
                maxWidth: "40ch",
              }}
            >
              A few questions, then the call books itself. Thirty minutes, no
              pitch deck.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
