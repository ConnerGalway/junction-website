import { cacheLife } from "next/cache";
import { TALK_IDS } from "./junctionu";

export type Talk = { id: string; title: string; thumbnail: string };

/**
 * Tourism Talks: each video's title and thumbnail from YouTube's oEmbed
 * endpoint (no API key), fetched on the server and cached for a week. If
 * YouTube can't be reached, the talk still shows, with a generic title and
 * YouTube's standard thumbnail URL. Thumbnails are served through next/image,
 * so visitors' browsers load nothing from YouTube until they press play.
 */
export async function getTalks(): Promise<Talk[]> {
  "use cache";
  cacheLife("weeks");
  return Promise.all(
    TALK_IDS.map(async (id) => {
      const fallback = { id, title: "Tourism Talk", thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
        );
        if (!res.ok) return fallback;
        const data = (await res.json()) as { title?: string; thumbnail_url?: string };
        return {
          id,
          title: data.title?.trim() || fallback.title,
          thumbnail: data.thumbnail_url?.startsWith("https://i.ytimg.com/") ? data.thumbnail_url : fallback.thumbnail,
        };
      } catch {
        return fallback;
      }
    })
  );
}
