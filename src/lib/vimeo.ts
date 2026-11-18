import { cacheLife } from "next/cache";

/**
 * A Vimeo video's thumbnail from Vimeo's oEmbed endpoint (no API key),
 * fetched on the server at build time and cached for a week. `width` asks
 * for that size (Vimeo returns the largest it has up to it). Null if Vimeo
 * can't be reached or returns no thumbnail: callers show their own fallback.
 * Served through next/image (i.vimeocdn.com is allowed in next.config.ts).
 */
export async function getVimeoThumbnail(videoUrl: string, width = 1920): Promise<string | null> {
  "use cache";
  cacheLife("weeks");
  try {
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=${width}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url?.startsWith("https://i.vimeocdn.com/") ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}
