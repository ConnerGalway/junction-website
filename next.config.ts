import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Tourism Talk thumbnails (eLearningU page), served through next/image so the
    // browser loads nothing from YouTube before a talk is played.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return [
      { source: "/services", destination: "/programs", permanent: true },
      { source: "/ideas", destination: "/the-brief", permanent: true },
      // The learning brand on this site is eLearningU (JunctionU is on hold).
      { source: "/junctionu", destination: "/elearningu", permanent: true },
      { source: "/junctionu/industry-scan", destination: "/elearningu/industry-scan", permanent: true },
    ];
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
