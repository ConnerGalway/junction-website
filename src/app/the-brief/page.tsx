import type { Metadata } from "next";
import { Card, Container, Eyebrow, NewsletterSignup, Section } from "@/components";
import { ArticleList, type Article } from "./ArticleList";

export const metadata: Metadata = {
  title: "The Brief",
  description: "Thinking you can use by Friday. Weekly ideas on marketing, AI and tourism.",
};

const allArticles: Article[] = [
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

export default function TheBriefPage() {
  return (
    <>
      {/* Hero + newsletter signup */}
      <Section spacing="tight">
        <Container className="grid items-end gap-x-[72px] gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div>
            <Eyebrow className="mb-6">The Brief · 100+ articles</Eyebrow>
            <h1 className="type-display m-0">Thinking you can use by Friday.</h1>
          </div>

          <Card tone="carbon">
            <Eyebrow className="mb-3">The Brief · weekly</Eyebrow>
            <p className="type-h3 m-0 mb-6">
              Start every week knowing something your competitors don&apos;t.
            </p>
            <NewsletterSignup />
            <p className="type-small m-0 mt-3">Award-winning. Free. Unsubscribe anytime.</p>
          </Card>
        </Container>
      </Section>

      {/* Article list */}
      <Section flush="top">
        <Container>
          <ArticleList articles={allArticles} filters={filters} />
          <p className="type-small m-0 mt-7 max-w-body">
            Every article ends with one next step matched to its topic: a
            course, a tool, or a conversation. The full archive lands here at
            launch.
          </p>
        </Container>
      </Section>
    </>
  );
}
