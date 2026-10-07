"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";

const allArticles = [
  {
    title: "Maybe the algorithm isn't the problem",
    cat: "Marketing",
    date: "Jul 14",
    teaser:
      "Before you blame the platform, check the three things the algorithm actually rewards.",
  },
  {
    title: "The year of the creator economy",
    cat: "Trends",
    date: "Jul 6",
    teaser:
      "What tourism brands should copy from creators, and what to leave alone.",
  },
  {
    title: "The four phases of AI adoption",
    cat: "AI",
    date: "Jun 8",
    teaser:
      "Most teams stall at phase two. Here is what the jump to three looks like.",
  },
  {
    title: "The hidden 80% of your visitor economy",
    cat: "Tourism",
    date: "May 26",
    teaser:
      "The businesses that never call themselves tourism businesses, and why they matter most.",
  },
  {
    title: "They remember the interaction",
    cat: "Marketing",
    date: "May 12",
    teaser:
      "What 4,500 visitors taught one small town about word of mouth.",
  },
  {
    title: "Your Google profile is your homepage now",
    cat: "Marketing",
    date: "Apr 28",
    teaser:
      "More travellers see it than your website. Sixty minutes fixes it.",
  },
  {
    title: "What a DMO can actually promise its board",
    cat: "Tourism",
    date: "Apr 14",
    teaser: "Capacity built is measurable. Here is how partners report it.",
  },
];

const filters = ["All", "Marketing", "AI", "Tourism", "Trends"];

export default function IdeasPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles =
    activeFilter === "All"
      ? allArticles
      : allArticles.filter((a) => a.cat === activeFilter);

  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(56px, 8vw, 112px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 64px)",
        }}
      >
        <div
          className="content-container two-col-grid"
          style={{ gap: "40px 72px", alignItems: "end" }}
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
              Ideas · 100+ articles
            </div>
            <h1 className="text-h1 m-0">Thinking you can use by Friday.</h1>
          </div>

          {/* Newsletter panel */}
          <div
            className="bg-carbon text-newsprint rounded"
            style={{ padding: "clamp(24px, 3vw, 36px)" }}
          >
            <div
              className="text-accent"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              The Brief · weekly
            </div>
            <div
              className="font-epilogue"
              style={{
                fontWeight: 900,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Start every week knowing something your competitors don't.
            </div>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="you@yourbusiness.com"
                className="flex-1 rounded-[3px] font-dm-sans"
                style={{
                  minWidth: "180px",
                  padding: "13px 15px",
                  border: "1px solid rgba(244, 240, 232, 0.3)",
                  background: "transparent",
                  color: "#F4F0E8",
                  fontSize: "15px",
                }}
              />
              <button
                className="text-button bg-fern text-carbon rounded-[3px] cursor-pointer transition-colors hover:bg-sage"
                style={{ padding: "13px 20px", border: 0 }}
              >
                Subscribe
              </button>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(244, 240, 232, 0.66)",
                marginTop: "12px",
              }}
            >
              Award-winning. Free. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div className="content-container">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap" style={{ marginBottom: "28px" }}>
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

          {/* Articles */}
          <div style={{ borderTop: "2px solid #1C1C1A" }}>
            {filteredArticles.map((article) => (
              <Link
                key={article.title}
                href="#"
                className="block transition-colors hover:bg-[rgba(196,150,58,0.08)]"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "8px 48px",
                  alignItems: "baseline",
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                }}
              >
                <div
                  className="text-accent-shade"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {article.date} · {article.cat}
                </div>
                <div
                  className="font-epilogue"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {article.title}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: "rgba(28, 28, 26, 0.74)",
                  }}
                >
                  {article.teaser}
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
              maxWidth: "72ch",
            }}
          >
            Every article ends with one next step matched to its topic: a
            course, a tool, or a conversation. The full archive lands here at
            launch.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
