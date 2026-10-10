"use client";

import { useState } from "react";

/**
 * 16:9 inline video player. Shows a poster (or a Carbon placeholder) with a
 * round play button and a Bebas duration label; clicking play swaps in the
 * <video> with visible controls, muted, playing inline.
 *
 * TODO: the Accelerator video isn't ready. Pass `src` (and `poster`,
 * `duration`) once it is; until then the play button is disabled.
 */
export function VideoPlayer({
  src,
  poster,
  duration,
  label,
}: {
  src?: string;
  poster?: string;
  /** Running time, e.g. "2:40". */
  duration: string;
  /** What the video is, for the play button's accessible name. */
  label: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && src) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        muted
        autoPlay
        playsInline
        className="aspect-video w-full rounded-card bg-carbon"
      />
    );
  }

  return (
    <div
      className="tone-carbon relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-card bg-cover bg-center"
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      <button
        type="button"
        onClick={() => setPlaying(true)}
        disabled={!src}
        aria-label={src ? `Play video: ${label}` : `Video coming soon: ${label}`}
        className="flex size-20 cursor-pointer items-center justify-center rounded-full bg-newsprint text-carbon hover:bg-sage disabled:cursor-default disabled:hover:bg-newsprint"
      >
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26">
          <path d="M8 4.5v17l14-8.5z" fill="currentColor" />
        </svg>
      </button>
      <span className="type-price absolute right-5 bottom-4 text-[28px]">{duration}</span>
    </div>
  );
}
