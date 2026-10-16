import Image from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/components";

/** Text-line widths for the abstract page copy (percent of the column). */
const LINES = [92, 100, 84, 96, 70];

/**
 * Sample deliverable pages under a case chapter's story: a report cover
 * (Forest, small JUNCTION_ wordmark, the case title) and two inside spreads
 * (abstract text lines, one Bebas figure, a few bars; the second spread's
 * figures are blurred). Decorative: aria-hidden, with the caption as the
 * only text. Each page scales with its own width (container units), so the
 * row fits any column. Real page images (cover, spread, spread) replace the
 * drawings when the case data has `deliverables.images`.
 *
 * Not interactive yet. Planned: clicking "flip through" expands the pages in
 * place to fill the chapter (no modal, no new page); to be designed.
 */
export function DeliverablesPreview({
  title,
  figure,
  images,
  className,
}: {
  title: string;
  figure: string;
  images?: [string, string, string];
  className?: string;
}) {
  const drawn = [<Cover key="c" title={title} />, <Spread key="a" figure={figure} />, <Spread key="b" figure={figure} redacted />];
  return (
    <figure className={cx("m-0", className)}>
      <div aria-hidden="true" className="flex items-start gap-3">
        {drawn.map((page, i) => (
          <Page key={i} cover={i === 0}>
            {images ? <Image src={images[i]} alt="" fill sizes="240px" className="object-cover" /> : page}
          </Page>
        ))}
      </div>
      <figcaption className="type-small mt-3 text-muted">
        Sample pages · client details changed for privacy · flip through →
      </figcaption>
    </figure>
  );
}

/** A page slot: the cover is 3:4, a spread 3:2; widths share the row so heights match. */
function Page({ cover, children }: { cover?: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "@container relative min-w-0 basis-0 overflow-hidden rounded-control shadow-(--tone-card-shadow) [border:var(--tone-card-border)]",
        cover ? "aspect-[3/4] grow-[3]" : "aspect-[3/2] grow-[6] bg-newsprint"
      )}
    >
      {children}
    </div>
  );
}

function Cover({ title }: { title: string }) {
  return (
    <div className="flex size-full flex-col justify-between bg-forest p-[9cqw]">
      <span className="type-wordmark text-[12cqw] leading-none text-newsprint">
        JUNCTION<span className="text-canopy">_</span>
      </span>
      <div>
        <span className="mb-[5cqw] block h-[1.6cqw] w-[22%] rounded-full bg-fern" />
        <p className="m-0 font-display text-[10.5cqw] leading-[1.02] font-black tracking-[-0.03em] text-newsprint">{title}</p>
      </div>
    </div>
  );
}

/** An inside spread: copy on one page, a figure and bars on the other. */
function Spread({ figure, redacted }: { figure: string; redacted?: boolean }) {
  const copy = (
    <div className="flex flex-col gap-[2.2cqw] p-[5cqw]">
      <span className="mb-[1.5cqw] h-[2.6cqw] w-[60%] rounded-full bg-carbon/35" />
      {LINES.map((w, i) => (
        <span
          key={i}
          className={cx("h-[1.4cqw] rounded-full", redacted && i === 2 ? "bg-carbon" : "bg-carbon/12")}
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
  const chart = (
    <div className={cx("flex h-full flex-col justify-between p-[5cqw]", redacted && "blur-[2px]")}>
      <span className="font-wordmark text-[11cqw] leading-none text-accent-1-on-light">{figure}</span>
      <div className="flex h-[38%] items-end gap-[2cqw]">
        {[45, 70, 55, 100].map((h, i) => (
          <span key={i} className={cx("flex-1 rounded-t-[1cqw]", i === 3 ? "bg-canopy" : "bg-sage")} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="grid size-full grid-cols-2">
      <div className="border-r border-hairline">{redacted ? chart : copy}</div>
      <div>{redacted ? copy : chart}</div>
    </div>
  );
}
