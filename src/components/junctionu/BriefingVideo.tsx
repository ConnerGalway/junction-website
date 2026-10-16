"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayBadge } from "./PlayBadge";

/**
 * A 16:9 video card with a lite embed: the thumbnail and the corner play
 * button; pressing it swaps in the player (an iframe, e.g. Descript) in
 * place. Nothing loads from the video host before the click.
 */
export function BriefingVideo({
  embed,
  thumbnail,
  title,
  byline,
}: {
  embed: string;
  thumbnail: string;
  title: string;
  byline: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-card bg-ju-deep">
      {playing ? (
        <iframe
          src={embed}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="ju-card group absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
        >
          <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="ju-video-image object-cover" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ju-deep/80 to-transparent" />
          <PlayBadge label={byline} />
        </button>
      )}
    </div>
  );
}
