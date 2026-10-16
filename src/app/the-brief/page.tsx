import type { Metadata } from "next";
import { Eyebrow, NewsletterSignup, TextLink } from "@/components";
import { getIssues, type Issue } from "@/lib/brief";
import { formatDay, issueHref } from "./format";

export const metadata: Metadata = {
  title: "The Brief",
  description: "Thinking you can use by Friday. Weekly ideas on marketing, AI and tourism.",
};

/**
 * The Brief: one centred reading column on Newsprint, issue numbers in the
 * left margin. All data comes from src/lib/brief.ts (Mailchimp, or sample
 * issues until it's configured).
 */
export default async function TheBriefPage() {
  const issues = await getIssues();
  const [latest] = issues;

  return (
    <div className="px-gutter pt-section-tight pb-section">
      {/* Top: the wordmark, headline, lead and signup are the subscribe block */}
      <header className="mx-auto max-w-[900px] text-center">
        <p className="m-0 font-wordmark text-[30px] leading-none tracking-[0.16em] text-carbon">The Brief</p>
        <h1 className="type-display mx-auto mt-6 mb-0 text-[clamp(48px,6.1vw,88px)] text-balance">
          Thinking you can use by Friday.
        </h1>
        <p className="type-lead mx-auto mt-6 mb-0 max-w-[34ch]">
          Weekly ideas on marketing, AI and tourism. One feature, two short reads, every Monday.
        </p>
        <div id="subscribe" className="mx-auto mt-9 max-w-[520px] scroll-mt-32">
          <NewsletterSignup
            centered
            hideLabel
            helper={<span className="text-flint">Free · award-winning · 500+ articles · unsubscribe anytime</span>}
          />
        </div>
      </header>

      <div className="relative mx-auto mt-[clamp(72px,9vw,128px)] max-w-[720px]">
        {latest && <ThisWeek issue={latest} />}
      </div>
    </div>
  );
}

/** "Nº 544", or nothing without a number. */
const no = (n: number | null) => (n === null ? null : `Nº ${n}`);

function ThisWeek({ issue }: { issue: Issue }) {
  const meta = [no(issue.number), formatDay(issue.date)].filter(Boolean).join(" · ");
  return (
    <section aria-labelledby="this-week" className="relative">
      {issue.number !== null && (
        <span aria-hidden="true" className="brief-margin-num top-0 text-[clamp(110px,10.4vw,150px)]">
          {no(issue.number)}
        </span>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-carbon pt-4">
        <h2 id="this-week" className="type-eyebrow m-0 text-carbon">
          This week
        </h2>
        <p className="type-small m-0 text-flint">{meta}</p>
      </div>
      <h3 className="mt-8 mb-0 font-display text-[clamp(34px,4.2vw,54px)] leading-[1.02] font-black tracking-[-0.035em] text-balance text-carbon">
        {issue.feature}
      </h3>
      {issue.sections && (
        <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-carbon pt-6 md:grid-cols-2">
          {issue.sections.map((section) => (
            <div key={section}>
              <Eyebrow className="m-0">Also in this issue</Eyebrow>
              <p className="m-0 mt-2 font-display text-[21px] leading-[1.2] font-semibold tracking-[-0.015em] text-carbon">
                {section}
              </p>
            </div>
          ))}
        </div>
      )}
      <TextLink href={issueHref(issue.url)} className="mt-8 inline-block">
        Read this issue →
      </TextLink>
    </section>
  );
}
