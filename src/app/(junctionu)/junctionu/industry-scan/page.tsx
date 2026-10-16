import type { Metadata } from "next";
import { Accordion } from "@/components";
import { BriefingVideo, JuButton, ScanPreview } from "@/components/junctionu";
import {
  SCAN_FAQ,
  SCAN_FEATURES,
  SCAN_LATEST,
  SCAN_PRICE,
  SCAN_SUBSCRIBE_URL,
  SCAN_VIDEO,
} from "@/lib/industryScan";
import { JU_SCAN_THUMBNAIL } from "@/lib/junctionuImages";

export const metadata: Metadata = {
  title: "Tourism Industry Scan · JunctionU",
  description:
    "Every month, the industry reports you don't have time to read, synthesized into the trends, stats and actions that matter for your next board meeting.",
};

/**
 * Tourism Industry Scan landing page (JunctionU sub-brand). The one main
 * action is "Start your free month" (Mint; it repeats in Pricing). Content
 * and links: src/lib/industryScan.ts.
 */
export default function IndustryScanPage() {
  return (
    <>
      {/* Hero: the pitch, and the ScanPreview bleeding off the right edge */}
      <section className="px-gutter pt-[clamp(56px,7vw,104px)] pb-[clamp(56px,7vw,96px)]">
        <div className="mx-auto grid max-w-wide items-center gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
          <div>
            <p className="type-eyebrow m-0 text-fern">Monthly · for Canadian DMO leaders</p>
            <h1 className="ju-display mt-5 mb-0 max-w-[9ch] text-[clamp(48px,5.8vw,84px)]">Tourism Industry Scan</h1>
            <p className="type-lead mt-7 mb-0 max-w-[40ch] text-newsprint-muted">
              Every month, the industry reports you don&apos;t have time to read, synthesized into the trends, stats and
              actions that matter for your next board meeting.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <JuButton variant="mint" href={SCAN_SUBSCRIBE_URL}>
                Start your free month
              </JuButton>
              <a href={SCAN_LATEST.href} className="link text-[16px]">
                {SCAN_LATEST.label}
              </a>
            </div>
            <p className="type-small mt-5 mb-0 text-newsprint-muted">First month free, then {SCAN_PRICE} a month. Cancel anytime.</p>
          </div>
          <ScanPreview className="h-[560px] lg:mr-[calc(-1*max(var(--spacing-gutter),(100vw-var(--container-wide))/2))] lg:rounded-r-none" />
        </div>
      </section>

      {/* The briefing */}
      <section aria-labelledby="briefing-heading" className="px-gutter py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto grid max-w-wide items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <BriefingVideo
            embed={SCAN_VIDEO.embed}
            thumbnail={JU_SCAN_THUMBNAIL}
            title="Industry Scan executive briefing"
            byline={SCAN_VIDEO.byline}
          />
          <div>
            <p className="type-eyebrow m-0 text-fern">Executive briefing</p>
            <h2 id="briefing-heading" className="ju-display mt-4 mb-0 text-[clamp(32px,3.2vw,44px)]">
              Short on time? Watch it.
            </h2>
            <p className="type-body mt-6 mb-0 max-w-[48ch] text-newsprint-muted">
              Every issue opens with a video briefing from Conner Galway: the month&apos;s biggest shifts, explained in
              plain language, ready to share with your team.
            </p>
          </div>
        </div>
      </section>

      {/* Built for the boardroom */}
      <section aria-labelledby="boardroom-heading" className="px-gutter py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto max-w-wide">
          <h2 id="boardroom-heading" className="ju-display m-0 text-[clamp(32px,3.6vw,50px)]">
            Built for the boardroom
          </h2>
          <ul className="m-0 mt-10 grid list-none gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {SCAN_FEATURES.map((f) => (
              <li key={f.title} className="border-t border-fern/35 pt-5">
                {/* Same box for every mark, so the titles line up */}
                <span aria-hidden="true" className="flex h-9 items-end">
                  <span
                    className={
                      f.numeric
                        ? "font-wordmark text-[34px] leading-none text-fern"
                        : "ju-title text-[28px] leading-none text-fern"
                    }
                  >
                    {f.mark}
                  </span>
                </span>
                <h3 className="ju-title mt-4 mb-0 text-[22px] text-newsprint">{f.title}</h3>
                <p className="type-body mt-2 mb-0 text-newsprint-muted">{f.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section aria-labelledby="pricing-heading" className="px-gutter py-[clamp(40px,5vw,72px)]">
        <div className="mx-auto grid max-w-wide items-center gap-x-12 gap-y-8 rounded-[18px] bg-ju-moss p-[clamp(28px,4.5vw,64px)] lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 id="pricing-heading" className="ju-display m-0 text-[clamp(38px,4vw,56px)]">
              First month free.
            </h2>
            <p className="type-body mt-4 mb-0 max-w-[46ch] text-newsprint-muted">
              Then a simple monthly subscription. Cancel anytime. Team and association pricing available.
            </p>
          </div>
          <div className="lg:text-right">
            <p className="m-0 flex items-baseline gap-3 font-wordmark leading-none lg:justify-end">
              <span className="text-[clamp(72px,7vw,96px)] text-newsprint">{SCAN_PRICE}</span>
              <span className="text-[28px] text-newsprint/60">/ MONTH</span>
            </p>
            <div className="mt-6 flex flex-col gap-4 lg:items-end">
              <JuButton variant="mint" href={SCAN_SUBSCRIBE_URL} className="self-start lg:self-end">
                Start your free month
              </JuButton>
              {/* TODO: team and association pricing */}
              <a href="/contact" className="link text-[15px]">
                Buying for a team or association? Talk to us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-heading" className="px-gutter py-[clamp(56px,7vw,104px)]">
        <div className="mx-auto grid max-w-wide gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 id="faq-heading" className="ju-display m-0 text-[clamp(32px,3.6vw,50px)]">
            Questions
          </h2>
          <Accordion items={SCAN_FAQ} single chevronClassName="text-fern" />
        </div>
      </section>
    </>
  );
}
