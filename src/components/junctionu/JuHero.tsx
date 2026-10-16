import Image from "next/image";
import { SHOW_JU_TRAILER } from "@/lib/flags";
import { JU_START_URL, JU_TRAILER_URL } from "@/lib/junctionu";
import { JU_HERO_IMAGE } from "@/lib/junctionuImages";
import { JuButton } from "./JuButton";

/**
 * JunctionU hero (cinematic): the hero still (public/images/junctionu/hero.jpg
 * if it exists, else the custom course still) on the right 64%, faded into
 * the ground (solid to 36% of the width, clear by 82%, plus a bottom fade),
 * never behind the copy. On phones the still sits on top, faded at the bottom.
 */
export function JuHero() {
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[600px] lg:items-center">
      {/* The still */}
      <div aria-hidden="true" className="relative aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[64%]">
        <Image
          src={JU_HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[60%_30%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ju-ground to-transparent lg:h-1/3" />
      </div>
      {/* Left-to-right fade across the whole hero: ground solid to 36%, clear by 82% */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,var(--ju-ground)_36%,transparent_82%)] lg:block" />

      <div className="relative w-full px-gutter pb-16 max-lg:-mt-10 lg:py-20">
        <div className="mx-auto max-w-wide">
          <div className="max-w-[640px] lg:max-w-[min(640px,46vw)]">
            <h1 className="ju-display m-0 text-[clamp(42px,5.6vw,80px)]">
              Training that fits between two guest check-ins.
            </h1>
            <p className="type-lead mt-7 mb-0 max-w-[40ch] text-newsprint-muted">
              Certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run
              under an hour and every one ends in something you can do today.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <JuButton variant="mint" href={JU_START_URL}>
                Start free
              </JuButton>
              {SHOW_JU_TRAILER && (
                <JuButton variant="glass" href={JU_TRAILER_URL}>
                  <span aria-hidden="true">▶</span> Watch the trailer
                </JuButton>
              )}
            </div>
            <p className="type-small mt-5 mb-0 text-newsprint-muted">
              Free account: Tourism Talks plus a starter course. No card. · 2,000+ people are in · Formerly eLearningU
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
