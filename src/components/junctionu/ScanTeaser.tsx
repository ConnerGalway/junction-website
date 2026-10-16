import Image from "next/image";
import { JU_SCAN_URL } from "@/lib/junctionu";
import { JU_SCAN_THUMBNAIL } from "@/lib/junctionuImages";
import { JuButton } from "./JuButton";

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
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ju-deep/90 via-ju-deep/20 to-transparent" />
          <span aria-hidden="true" className="absolute top-[38%] left-1/2 flex size-12 -translate-1/2 items-center justify-center rounded-full bg-newsprint sm:top-1/2 sm:size-16">
            <svg width="20" height="22" viewBox="0 0 18 20" className="ml-1 fill-ju-ground">
              <path d="M0 0 18 10 0 20Z" />
            </svg>
          </span>
          <span className="absolute inset-x-6 bottom-5 block">
            <span className="ju-display block text-[clamp(20px,2vw,26px)] text-newsprint transition-colors duration-150 group-hover:text-break-on-dark group-focus-visible:text-break-on-dark">
              This month&apos;s Industry Scan
            </span>
            <span className="type-small mt-1 block text-newsprint-muted">Conner Galway · [ Month Year ]</span>
          </span>
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
