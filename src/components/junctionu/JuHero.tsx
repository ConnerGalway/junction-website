import Image from "next/image";
import { SHOW_JU_TRAILER } from "@/lib/flags";
import { JU_HERO_VIDEO, JU_START_URL, JU_TRAILER_URL } from "@/lib/junctionu";
import { getVimeoThumbnail } from "@/lib/vimeo";
import { HeroVideo } from "./HeroVideo";
import { JuButton } from "./JuButton";

/**
 * eLearningU hero (cinematic): the Vimeo background video on the right 64%,
 * faded into the ground (solid to 36% of the width, clear by 82%, plus a
 * bottom fade), never behind the copy. On phones it sits on top, faded at
 * the bottom.
 *
 * Before the video plays (and with reduced motion, which loads no video) the
 * frame shows the video's own Vimeo thumbnail, fetched at build time; if
 * that can't be fetched, the plain eLearningU ground. The old course still
 * (images/junctionu/hero.png) is no longer used here.
 */
export async function JuHero() {
  const poster = await getVimeoThumbnail(JU_HERO_VIDEO.url);
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[600px] lg:items-center">
      {/* The video's thumbnail (or the plain ground) is the poster; the Vimeo
          background video fades in over it once playing (HeroVideo), with its
          unmute toggle bottom-left. */}
      <div className="relative aspect-[16/10] w-full bg-ju-ground lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[64%]">
        {poster && (
          <Image src={poster} alt="" fill priority sizes="(min-width: 1024px) 64vw, 100vw" className="object-cover" />
        )}
        <HeroVideo videoId={JU_HERO_VIDEO.id} title={JU_HERO_VIDEO.title} />
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
              eLearningU is Junction&apos;s online school for tourism: certificate courses, workshops and free
              Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in
              something you can do today.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <JuButton variant="mint" href={JU_START_URL}>
                Start free<span className="sr-only"> on the eLearningU site</span>
              </JuButton>
              {SHOW_JU_TRAILER && (
                <JuButton variant="glass" href={JU_TRAILER_URL}>
                  <span aria-hidden="true">▶</span> Watch the trailer
                </JuButton>
              )}
            </div>
            <p className="type-small mt-5 mb-0 text-newsprint-muted">
              Free account: Tourism Talks plus a starter course. No card. · 2,000+ people are in
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
