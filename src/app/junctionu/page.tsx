"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";

const allCourses = [
  {
    code: "JU 101",
    title: "Tourism Digital Marketing Essentials",
    kind: "Certificate",
    blurb:
      "The full foundation: website, Google profile, reviews, email and social, in plain language.",
    meta: "8 modules · 6 hrs",
    price: "$349",
  },
  {
    code: "JU 120",
    title: "AI for Tourism Operators",
    kind: "Certificate",
    blurb:
      "Where AI pays off in a small business, and where it wastes your month.",
    meta: "6 modules · 4 hrs",
    price: "$349",
  },
  {
    code: "JU 130",
    title: "Sustainable Tourism",
    kind: "Certificate",
    blurb:
      "A sustainability practice guests can feel and your marketing can honestly claim.",
    meta: "6 modules · 4 hrs",
    price: "$349",
  },
  {
    code: "WS 01",
    title: "Your Google Business Profile, Fixed",
    kind: "Workshop",
    blurb:
      "Ninety hands-on minutes. Leave with your profile complete and working for you.",
    meta: "Live · 90 min",
    price: "$79",
  },
  {
    code: "WS 02",
    title: "Email That Gets Opened",
    kind: "Workshop",
    blurb:
      "Welcome, pre-arrival, win-back: build all three in one working session.",
    meta: "Live · 2 hrs",
    price: "$79",
  },
  {
    code: "TT",
    title: "Tourism Talks",
    kind: "Free",
    blurb:
      "Candid conversations with marketers doing the work: Nimmo Bay, SuperNatural BC and more.",
    meta: "Video series",
    price: "Free",
  },
];

const filters = ["All", "Certificates", "Workshops", "Free"];

const tagStyles: Record<string, { bg: string; fg: string }> = {
  Certificate: { bg: "#1A4D2E", fg: "#F4F0E8" },
  Workshop: { bg: "#C8E8D4", fg: "#1A4D2E" },
  Free: { bg: "#E0176A", fg: "#FFFFFF" },
};

export default function JunctionUPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses =
    activeFilter === "All"
      ? allCourses
      : allCourses.filter((c) => {
          if (activeFilter === "Certificates") return c.kind === "Certificate";
          if (activeFilter === "Workshops") return c.kind === "Workshop";
          return c.kind === activeFilter;
        });

  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        className="bg-forest text-newsprint"
        style={{ padding: "clamp(56px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          className="content-container two-col-grid"
          style={{ gap: "32px 72px", alignItems: "end" }}
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
              JunctionU · formerly eLearningU
            </div>
            <h1 className="text-h1 m-0" style={{ textWrap: "balance" }}>
              Training that fits between two guest check-ins.
            </h1>
          </div>
          <div>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.84)",
                margin: "0 0 32px",
                maxWidth: "46ch",
              }}
            >
              Certificate courses, workshops and free Tourism Talks, built for
              tourism professionals. Lessons run under an hour and every one
              ends in something you can do today. 2,000+ people are in.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <Link
                href="#catalogue"
                className="text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
                style={{ padding: "16px 26px" }}
              >
                Start free
              </Link>
              <Link
                href="#catalogue"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "2px solid #7FC99A",
                  paddingBottom: "3px",
                }}
              >
                Browse the catalogue →
              </Link>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(244, 240, 232, 0.7)",
                marginTop: "20px",
              }}
            >
              Free account: Tourism Talks plus a starter course. No card.
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section
        id="catalogue"
        style={{ padding: "clamp(56px, 7vw, 96px) clamp(20px, 4vw, 48px)" }}
      >
        <div className="content-container">
          <div
            className="flex items-end justify-between gap-6 flex-wrap"
            style={{ marginBottom: "36px" }}
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
                The catalogue
              </div>
              <h2 className="text-h2 m-0">Pick a course.</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="font-dm-sans cursor-pointer transition-colors"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "10px 16px",
                    borderRadius: "3px",
                    background:
                      activeFilter === filter ? "#1C1C1A" : "transparent",
                    color: activeFilter === filter ? "#F4F0E8" : "#1C1C1A",
                    border:
                      activeFilter === filter
                        ? "1px solid #1C1C1A"
                        : "1px solid rgba(28, 28, 26, 0.3)",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            {filteredCourses.map((course) => (
              <Link
                key={course.code}
                href="#"
                className="flex flex-col bg-white rounded transition-colors hover:bg-sage"
                style={{ padding: "26px", minHeight: "280px", gap: "14px" }}
              >
                <div className="flex justify-between items-center gap-3">
                  <span
                    className="font-bebas text-accent-shade"
                    style={{ fontSize: "22px", letterSpacing: "0.06em" }}
                  >
                    {course.code}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "5px 10px 4px",
                      borderRadius: "2px",
                      background: tagStyles[course.kind].bg,
                      color: tagStyles[course.kind].fg,
                    }}
                  >
                    {course.kind}
                  </span>
                </div>
                <h3
                  className="font-epilogue m-0"
                  style={{
                    fontWeight: 900,
                    fontSize: "26px",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: "rgba(28, 28, 26, 0.74)",
                    margin: 0,
                  }}
                >
                  {course.blurb}
                </p>
                <div
                  className="mt-auto flex justify-between items-baseline gap-3"
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(28, 28, 26, 0.12)",
                  }}
                >
                  <span
                    style={{ fontSize: "14px", color: "rgba(28, 28, 26, 0.66)" }}
                  >
                    {course.meta}
                  </span>
                  <span
                    className="font-bebas text-forest"
                    style={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    {course.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(28, 28, 26, 0.7)",
              margin: "28px 0 0",
            }}
          >
            Checkout happens right here. Card in, certificate out, no separate
            platform.
          </p>
        </div>
      </section>

      {/* For DMOs */}
      <section
        className="bg-sage"
        style={{ padding: "clamp(56px, 7vw, 96px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          className="content-container two-col-grid"
          style={{ gap: "40px 80px", alignItems: "center" }}
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
              For DMOs
            </div>
            <h2 className="text-h2 mb-5">Fund seats for your whole region.</h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.8)",
                margin: "0 0 30px",
                maxWidth: "48ch",
              }}
            >
              Partners cover 25% to 100% of course costs for their operators. We
              handle delivery, support and progress reporting. Travel Yukon has
              run it for four years, and 300+ businesses came through.
            </p>
            <Link
              href="/services"
              className="inline-block text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-carbon"
              style={{ padding: "15px 24px" }}
            >
              Become a partner
            </Link>
          </div>
          <blockquote
            className="m-0"
            style={{ borderLeft: "3px solid #1A4D2E", paddingLeft: "26px" }}
          >
            <p
              className="font-fraunces text-forest"
              style={{
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "clamp(26px, 3vw, 40px)",
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              "Functional, accessible, and personalized. Incredibly valuable
              education for our tourism sector."
            </p>
            <cite
              style={{
                fontStyle: "normal",
                fontSize: "14px",
                color: "rgba(28, 28, 26, 0.72)",
              }}
            >
              Avery Bramadat, Senior Tourism Development Advisor, Travel Yukon
            </cite>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
}
