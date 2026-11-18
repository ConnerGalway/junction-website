import { cacheLife } from "next/cache";
import { TALK_IDS } from "./junctionu";

export type Talk = { id: string; title: string; thumbnail: string };

/** The Tourism Talks YouTube playlist: every video in it shows on /elearningu. */
export const TALKS_PLAYLIST_ID = "PLUvaA_x2Z8df8djNodScqE1XZTFz8a16f";

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${TALKS_PLAYLIST_ID}`;

/** Thumbnails always go through i.ytimg.com (the host allowed for next/image), whatever mirror the feed names. */
const thumbFor = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

/**
 * The playlist's videos from YouTube's public playlist RSS feed (no API key),
 * in feed order. The feed lists at most the 15 most recent videos. Returns
 * null if the feed can't be read.
 */
async function fromPlaylistFeed(): Promise<Talk[] | null> {
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) return null;
    const xml = await res.text();
    const talks = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
      return id ? [{ id, title: title ? decode(title) : "Tourism Talk", thumbnail: thumbFor(id) }] : [];
    });
    return talks.length ? talks : null;
  } catch {
    return null;
  }
}

/** The fallback: the four original talks, titles from YouTube's oEmbed (or a generic title). */
async function fromFallbackIds(): Promise<Talk[]> {
  return Promise.all(
    TALK_IDS.map(async (id) => {
      const fallback = { id, title: "Tourism Talk", thumbnail: thumbFor(id) };
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
        );
        if (!res.ok) return fallback;
        const data = (await res.json()) as { title?: string };
        return { ...fallback, title: data.title?.trim() || fallback.title };
      } catch {
        return fallback;
      }
    })
  );
}

/**
 * Tourism Talks: every video in the playlist (TALKS_PLAYLIST_ID), titles and
 * thumbnails from its RSS feed, fetched on the server and revalidated daily.
 * If the feed is unreachable, the four original talks (TALK_IDS). Thumbnails
 * are served through next/image, so visitors' browsers load nothing from
 * YouTube until they press play.
 */
export async function getTalks(): Promise<Talk[]> {
  "use cache";
  cacheLife("days");
  return (await fromPlaylistFeed()) ?? (await fromFallbackIds());
}
