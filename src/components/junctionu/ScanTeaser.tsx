import Image from "next/image";
import { JU_SCAN_URL } from "@/lib/junctionu";
import { JU_SCAN_THUMBNAIL } from "@/lib/junctionuImages";
import { JuButton } from "./JuButton";
import { PlayBadge } from "./PlayBadge";

/**
 * Industry Scan teaser: the Scan thumbnail (images/junctionu/
 * industry-scan-thumbnail.jpg) as a card (the card is the link) and the
 * pitch with one Fern outline action. The month and line are placeholders
 * for team review.
 */
export function ScanTeaser() {
  return (
    <section aria-labelledby="scan-heading" className="px-gutter py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto grid max-w-wide items-center gap-x-16 gap-y-10 lg:grid-cols-2">
        <a href={JU_SCAN_URL} className="ju-card group relative block aspect-video overflow-hidden rounded-card no-underline">
          <Image
            src={JU_SCAN_THUMBNAIL}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="ju-video-image object-cover"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ju-deep/80 to-transparent" />
          {/* The thumbnail already says "Tourism Industry Scan": just the byline beside the play button */}
          <PlayBadge label="Conner Galway · [ Month Year ]" />
          <span className="sr-only">This month&apos;s Industry Scan</span>
        </a>
        <div>
          <p className="type-eyebrow m-0 text-fern">Industry Scan</p>
          <h2 id="scan-heading" className="ju-display mt-4 mb-0 text-[clamp(32px,3.2vw,44px)]">
            Watch the briefing. Read the scan. Brief your board.
          </h2>
          <p className="type-body mt-6 mb-8 max-w-[48ch] text-newsprint-muted">
            Every month: a video briefing plus a full report of trends, stats and actions, synthesized from eight
            industry sources.
          </p>
          <JuButton variant="outline" href={JU_SCAN_URL}>
            Try a month free
          </JuButton>
        </div>
      </div>
    </section>
  );
}
