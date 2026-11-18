import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * /sitemap.xml: every public page on the new site. Hidden sections are parts
 * of these pages (behind flags), not pages of their own, so nothing hidden is
 * listed. Add a page here when a new route goes live.
 */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/programs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/accelerator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-accelerator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/custom-training", priority: 0.8, changeFrequency: "monthly" },
  { path: "/marketing-strategy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/speaking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/the-brief", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/elearningu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elearningu/industry-scan", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: p.path === "/" ? SITE_URL : `${SITE_URL}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
