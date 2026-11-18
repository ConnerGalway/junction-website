import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cx } from "@/components";
import { SHELF, type ShelfCover, type ShelfSpread } from "@/lib/marketingStrategy";

const LINES = [100, 92, 96, 70];

/** A designed image for shelf item n (1-based), if one has been added. */
function imageFor(n: number) {
  const rel = `/images/marketing-strategy/${n}.jpg`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

/**
 * Hero shelf for Marketing strategy: report covers (230 × 310) alternating
 * with inside spreads (420 × 290), in one row that starts at the content
 * edge and bleeds off the right edge. Static and decorative (aria-hidden);
 * the content is illustrative. Any item becomes a designed image when
 * public/images/marketing-strategy/<n>.jpg exists.
 */
export function DeliverablesShelf({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx("deliverables-shelf overflow-hidden select-none", className)}>
      <ul className="m-0 flex w-max list-none items-end gap-5 p-0">
        {SHELF.map((item, i) => {
          const image = imageFor(i + 1);
          const size = item.kind === "cover" ? "h-[310px] w-[230px]" : "h-[290px] w-[420px]";
          return (
            <li key={i} className={cx("relative shrink-0 overflow-hidden rounded-control", size)}>
              {image ? (
                <Image src={image} alt="" fill sizes={item.kind === "cover" ? "230px" : "420px"} className="object-cover" />
              ) : item.kind === "cover" ? (
                <Cover item={item} />
              ) : (
                <Spread item={item} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const coverTone: Record<ShelfCover["tone"], { box: string; meta: string; bar: string }> = {
  newsprint: { box: "bg-newsprint text-carbon", meta: "text-flint", bar: "text-canopy" },
  gold: { box: "bg-accent-1 text-carbon", meta: "text-carbon/70", bar: "text-carbon" },
  carbon: { box: "bg-carbon text-newsprint", meta: "text-newsprint-muted", bar: "text-canopy" },
};

function Cover({ item }: { item: ShelfCover }) {
  const t = coverTone[item.tone];
  return (
    <div className={cx("flex size-full flex-col justify-between p-5", t.box)}>
      <span className="type-wordmark text-[18px] leading-none">
        JUNCTION<span className={t.bar}>_</span>
      </span>
      <div>
        <p className={cx("m-0 text-[10px] font-medium tracking-[0.14em] uppercase", t.meta)}>{item.meta}</p>
        <p className="m-0 mt-2 font-display text-[24px] leading-[1.02] font-black tracking-[-0.03em]">{item.title}</p>
      </div>
    </div>
  );
}

function Spread({ item }: { item: ShelfSpread }) {
  return (
    <div className="grid size-full grid-cols-2 bg-newsprint text-carbon">
      <div className="flex flex-col border-r border-hairline p-5">
        <p className="m-0 text-[9px] font-medium tracking-[0.14em] text-accent-2 uppercase">{item.meta}</p>
        <p className="m-0 mt-2 font-display text-[15px] leading-[1.1] font-black tracking-[-0.02em]">{item.title}</p>
        <div className="mt-4 flex flex-col gap-2">
          {LINES.map((w, j) => (
            <span key={j} className="h-[5px] rounded-full bg-carbon/12" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end p-5">
        {"chart" in item.right ? (
          <div className="flex h-[70%] items-end gap-2">
            {item.right.chart.map((h, j, all) => (
              <span
                key={j}
                className={cx("flex-1 rounded-t-[3px]", j === all.indexOf(Math.max(...all)) ? "bg-canopy" : "bg-sage")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        ) : (
          <div>
            <span className="block font-wordmark text-[96px] leading-[0.85] text-accent-1-on-light">{item.right.figure}</span>
            <span className="mt-2 block text-[11px] leading-snug text-ink-soft">{item.right.caption}</span>
          </div>
        )}
      </div>
    </div>
  );
}
