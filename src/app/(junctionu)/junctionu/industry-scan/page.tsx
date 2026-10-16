import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Industry Scan · JunctionU" };

/**
 * TODO: the Industry Scan page (video briefing + monthly report). Placeholder
 * until it's built. Use JU_SCAN_THUMBNAIL (src/lib/junctionuImages.ts) as the
 * video's poster.
 */
export default function IndustryScanPage() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto max-w-wide">
        <p className="type-eyebrow m-0 text-fern">Industry Scan</p>
        <h1 className="ju-display mt-4 mb-0 max-w-[16ch] text-[clamp(40px,5vw,72px)]">Coming soon.</h1>
        <p className="type-body mt-6 mb-0 max-w-[48ch] text-newsprint-muted">
          [ The Industry Scan page: every month, a video briefing plus a full report of trends, stats and actions. ]
        </p>
        <Link href="/junctionu" className="link mt-8 inline-block text-[16px]">
          ← Back to JunctionU
        </Link>
      </div>
    </section>
  );
}
