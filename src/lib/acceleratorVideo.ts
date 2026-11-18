import { cacheLife } from "next/cache";

/**
 * The Accelerator's "See how it works" video (Vimeo). The page shows a lite
 * embed: a poster with the corner play button, and the Vimeo player loads
 * only when someone presses play, so nothing is requested from Vimeo before
 * that (the poster is served through next/image from our own domain).
 */
export const ACCELERATOR_VIDEO = {
  id: "1247379040",
  url: "https://vimeo.com/1247379040",
  /** dnt=1: no Vimeo tracking cookies. */
  embed: "https://player.vimeo.com/video/1247379040?autoplay=1&dnt=1",
  duration: "4:05",
  /** The play button's accessible name. */
  label: "Play: See how it works (4 minutes 5 seconds)",
  title: "See how it works",
};

/** Shown when Vimeo can't be reached at build time. */
const FALLBACK_POSTER = "/images/home-hero-team.jpg";

/**
 * The video's poster: Vimeo's thumbnail from its oEmbed endpoint (no API key),
 * fetched on the server and cached for a week, else our fallback still.
 */
export async function getAcceleratorPoster(): Promise<string> {
  "use cache";
  cacheLife("weeks");
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(ACCELERATOR_VIDEO.url)}&width=1280`
    );
    if (!res.ok) return FALLBACK_POSTER;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url?.startsWith("https://i.vimeocdn.com/") ? data.thumbnail_url : FALLBACK_POSTER;
  } catch {
    return FALLBACK_POSTER;
  }
}
