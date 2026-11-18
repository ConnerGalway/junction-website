"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/components";

const PLAYER_ORIGIN = "https://player.vimeo.com";

/**
 * eLearningU hero background video (Vimeo background-player mode: muted,
 * looping, autoplay, no controls). It sits over the hero still (the poster
 * and fallback) and fades in only once Vimeo reports it's playing, so if
 * Vimeo can't be reached the still simply stays. With reduced motion it
 * isn't loaded at all. A small toggle (bottom-left; on phones it sits above
 * the headline's overlap) unmutes it through the Vimeo player API
 * (postMessage).
 *
 * The iframe covers its box like object-fit: cover (a 16:9 frame scaled to
 * the larger of the box's width or height; the box is a size container).
 */
export function HeroVideo({ videoId, title }: { videoId: string; title: string }) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const frame = useRef<HTMLIFrameElement>(null);

  // Only load the player when motion is allowed.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const post = (method: string, value?: unknown) =>
    frame.current?.contentWindow?.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), PLAYER_ORIGIN);

  // Vimeo's postMessage API: on "ready", subscribe to "play"; show the video on the first play.
  useEffect(() => {
    if (!enabled) return;
    function onMessage(event: MessageEvent) {
      if (event.origin !== PLAYER_ORIGIN || event.source !== frame.current?.contentWindow) return;
      let data: { event?: string };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (data.event === "ready") post("addEventListener", "play");
      if (data.event === "play") setPlaying(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [enabled]);

  function toggleSound() {
    const next = !muted;
    setMuted(next);
    post("setMuted", next);
    post("setVolume", next ? 0 : 1);
  }

  if (!enabled) return null;

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden [container-type:size]">
        <iframe
          ref={frame}
          src={`${PLAYER_ORIGIN}/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
          title={title}
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
          className={cx(
            "pointer-events-none absolute top-1/2 left-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-1/2 border-0 transition-opacity duration-700 motion-reduce:transition-none",
            playing ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      {playing && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Unmute the background video" : "Mute the background video"}
          className="absolute bottom-4 left-4 z-10 flex size-11 max-lg:bottom-14 cursor-pointer items-center justify-center rounded-full border-0 bg-ju-ground/70 text-newsprint transition-colors duration-150 hover:bg-ju-ground hover:text-fern focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fern"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
            {muted ? (
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            ) : (
              <>
                <path d="M16 9a4.2 4.2 0 0 1 0 6" />
                <path d="M18.6 6.5a7.8 7.8 0 0 1 0 11" />
              </>
            )}
          </svg>
        </button>
      )}
    </>
  );
}
