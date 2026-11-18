"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayBadge } from "@/components/junctionu/PlayBadge";

/**
 * 16:9 lite video embed (radius 14). Shows the poster with the corner play
 * button (PlayBadge) and the duration in Bebas; pressing it swaps in the
 * embedded player in place (autoplay). Nothing loads from the video host
 * before that: the poster is served through next/image.
 */
export function VideoPlayer({
  embed,
  poster,
  duration,
  label,
  title,
}: {
  /** The player URL (iframe src), loaded on click. */
  embed: string;
  /** Poster image (a local path or an allowed remote image). */
  poster: string;
  /** Running time, e.g. "4:05". */
  duration?: string;
  /** The play button's accessible name, e.g. "Play: See how it works (4 minutes 5 seconds)". */
  label: string;
  /** The player's iframe title. */
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  // If the poster can't load, keep the Carbon frame and the play button.
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-carbon">
      {playing ? (
        <iframe
          src={embed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label}
          className="group absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
        >
          {!posterFailed && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              onError={() => setPosterFailed(true)}
              className="ju-video-image object-cover"
            />
          )}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-carbon/70 to-transparent" />
          <PlayBadge length={duration} />
        </button>
      )}
    </div>
  );
}
