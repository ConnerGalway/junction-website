"use client";

import Image from "next/image";
import { useState } from "react";
import type { Talk } from "@/lib/junctionuTalks";

/**
 * Tourism Talk card with a lite embed: a 16:9 thumbnail with a Newsprint play
 * button; pressing it swaps the thumbnail for the youtube-nocookie player in
 * place (autoplay). Nothing loads from YouTube before that.
 */
export function TalkCard({ talk }: { talk: Talk }) {
  const [playing, setPlaying] = useState(false);
  // If the thumbnail can't load, keep the dark frame and play button only.
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <div className="w-[min(360px,78vw)]">
      <div className="relative aspect-video overflow-hidden rounded-card bg-ju-deep">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${talk.id}?autoplay=1&rel=0`}
            title={talk.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${talk.title}`}
            className="ju-card group absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
          >
            {!thumbFailed && (
              <Image
                src={talk.thumbnail}
                alt=""
                fill
                sizes="360px"
                onError={() => setThumbFailed(true)}
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            )}
            <span aria-hidden="true" className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full bg-newsprint">
              <svg width="18" height="20" viewBox="0 0 18 20" className="ml-1 fill-ju-ground">
                <path d="M0 0 18 10 0 20Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <h3 className="ju-title mt-4 mb-0 text-[19px] text-newsprint">{talk.title}</h3>
      <p className="type-small mt-2 mb-0 flex items-center gap-2 text-newsprint-muted">
        <span className="rounded-control bg-sage px-2 py-0.5 text-[11px] leading-none font-medium tracking-[0.12em] text-ju-ground uppercase">
          Free
        </span>
        Tourism Talk
      </p>
    </div>
  );
}
