import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** /robots.txt: everything public is crawlable; the API and the forms file aren't; the sitemap is listed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/__forms.html"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
