import type { NextConfig } from "next";
import { siteRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Trailing slashes are handled by our own redirects (src/lib/redirects.ts),
  // so every old URL ("/about-us/") reaches its page in one hop.
  skipTrailingSlashRedirect: true,
  images: {
    // Tourism Talk thumbnails (eLearningU page), served through next/image so the
    // browser loads nothing from YouTube before a talk is played.
    // The Accelerator video poster (Vimeo's thumbnail), the same way.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "i.vimeocdn.com", pathname: "/video/**" },
    ],
  },
  // All redirects (the old WordPress site, earlier renames, trailing slashes)
  // live in src/lib/redirects.ts.
  async redirects() {
    return siteRedirects();
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
