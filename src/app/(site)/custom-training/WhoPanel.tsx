import Image from "next/image";
import { Button, Eyebrow, cx } from "@/components";

export type WhoCardRow = { title: string; line: string };

/**
 * One "Who it's for" panel: text and features on the left, and the visual
 * on the right: a photo (radius 14) set 70px down and 40px in from the
 * right, with a small Newsprint card in the top-right corner overlapping
 * the top of the photo.
 */
export function WhoPanel({
  tone,
  title,
  line,
  features,
  button,
  photo,
  cardMeta,
  cardRows,
}: {
  tone: "carbon" | "forest";
  title: string;
  line: string;
  features: string[];
  button: { label: string; href: string };
  photo: { src: string; alt: string };
  cardMeta: string;
  cardRows: WhoCardRow[];
}) {
  return (
    <div
      className={cx(
        `tone-${tone}`,
        "grid items-start gap-x-12 gap-y-10 rounded-card p-[clamp(24px,4vw,48px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
      )}
    >
      <div className="flex h-full flex-col">
        <h3 className="type-h3 m-0">{title}</h3>
        <p className="type-body m-0 mt-4 max-w-[46ch]">{line}</p>
        <ul className="m-0 mt-8 grid list-none gap-x-8 gap-y-4 p-0 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={cx("mt-1 shrink-0", tone === "carbon" ? "text-accent-1" : "text-sage")}
              >
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="type-body text-(--tone-text)">{f}</span>
            </li>
          ))}
        </ul>
        <Button href={button.href} className="mt-10 self-start">
          {button.label}
        </Button>
      </div>

      {/* 1024px+: the card overlaps the photo's top-right corner; below, it sits under the photo */}
      <div className="relative lg:pt-[70px] lg:pr-[40px]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
        </div>
        <div className="tone-newsprint relative mt-4 rounded-card px-5 py-4 shadow-card-hover lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:w-[300px]">
          <Eyebrow className="m-0 text-[11px] whitespace-nowrap">{cardMeta}</Eyebrow>
          <ol className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0">
            {cardRows.map((row, i) => (
              <li key={row.title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-2">
                <span className="font-wordmark text-[24px] leading-none text-accent-1-on-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[14px] leading-snug font-medium text-carbon">{row.title}</span>
                  <span className="block text-[12px] leading-snug text-flint">{row.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
