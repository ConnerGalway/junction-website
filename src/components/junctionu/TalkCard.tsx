"use client";

import Image from "next/image";
import { useState } from "react";
import type { Talk } from "@/lib/junctionuTalks";
import { PlayBadge } from "./PlayBadge";

/**
 * Tourism Talk card with a lite embed: a 16:9 thumbnail with the corner play
 * button (PlayBadge); pressing it swaps the thumbnail for the youtube-nocookie player in
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
                className="ju-video-image object-cover"
              />
            )}
            <PlayBadge />
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
