/**
 * Redirects, including everything from the old WordPress site (pages, ~350
 * posts at single-segment URLs like /the-newsfeed-is-dead/, and WordPress
 * leftovers). Used by next.config.ts (build time only: this file reads the
 * file system) and scripts/check-redirects.mjs.
 *
 * Every redirect takes ONE hop: next.config.ts sets skipTrailingSlashRedirect,
 * so Next doesn't strip a trailing slash first; each rule matches both
 * "/x" and "/x/", and a final rule strips the slash from real routes
 * ("/about/" → "/about").
 *
 * Never redirected: the site's own top-level routes (found automatically in
 * src/app, through route groups), /api, /_next, anything in public/, and any
 * path with a file extension (images, fonts, favicon.ico, robots.txt,
 * sitemap.xml, __forms.html for Netlify Forms). /wp-content/* isn't
 * redirected either: it 404s.
 */
import fs from "node:fs";
import path from "node:path";

type Redirect = { source: string; destination: string; statusCode: 301 | 308 };

const ROOT = process.cwd();

/** Top-level names on the new site: app routes (through route groups), public/ entries, and reserved prefixes. */
export function topLevelRoutes(): string[] {
  const names = new Set<string>(["api", "_next"]);
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const n = entry.name;
      if (n.startsWith("(") && n.endsWith(")")) walk(path.join(dir, n)); // route group: its children are top-level
      else if (!n.startsWith("_") && !n.startsWith("@")) names.add(n);
    }
  };
  walk(path.join(ROOT, "src", "app"));
  for (const n of fs.readdirSync(path.join(ROOT, "public"))) names.add(n);
  return [...names].sort();
}

const both = (from: string, to: string, statusCode: 301 | 308 = 301): Redirect[] => [
  { source: from, destination: to, statusCode },
  { source: `${from}/`, destination: to, statusCode },
];

/** "/category", "/category/", "/category/anything/…" → `to`. */
const prefix = (from: string, to: string): Redirect[] => [
  { source: from, destination: to, statusCode: 301 },
  { source: `${from}/:rest(.*)`, destination: to, statusCode: 301 },
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function siteRedirects(): Redirect[] {
  const reserved = topLevelRoutes()
    .filter((n) => !n.includes("."))
    .map(escape)
    .join("|");
  // One path segment, no dot, that isn't a route on the new site.
  // The lookahead sees the rest of the path, so a real route counts whether or not a slash follows it.
  const oldPost = `:slug((?!(?:${reserved})(?:/|$))[^/.]+)`;

  return [
    // This site's own earlier renames (kept as they were: 308).
    ...both("/services", "/programs", 308),
    ...both("/ideas", "/the-brief", 308),
    ...both("/junctionu", "/elearningu", 308),
    ...both("/junctionu/industry-scan", "/elearningu/industry-scan", 308),

    // Old WordPress pages.
    ...both("/about-us", "/about"),
    ...both("/our-services", "/programs"),
    ...both("/our-clients", "/work"),
    ...both("/articles", "/the-brief"),
    ...both("/contact-us", "/contact"),

    // WordPress leftovers.
    ...prefix("/category", "/the-brief"),
    ...prefix("/tag", "/the-brief"),
    ...prefix("/page", "/the-brief"),
    ...both("/feed", "/the-brief"),
    ...both("/comments/feed", "/the-brief"),
    ...both("/:slug/feed", "/the-brief"),
    ...prefix("/author", "/about"),
    ...prefix("/wp-admin", "/"),
    ...both("/wp-login.php", "/"),
    ...both("/xmlrpc.php", "/"),

    // Old blog posts: any other single segment (with or without the slash) → The Brief.
    { source: `/${oldPost}`, destination: "/the-brief", statusCode: 301 },
    { source: `/${oldPost}/`, destination: "/the-brief", statusCode: 301 },

    // A real route with a trailing slash → without it ("/about/" → "/about"; "/the-brief/" → "/the-brief").
    // Not for /api, /_next or /wp-content (which 404s).
    { source: "/:path((?!api/|_next/|wp-content/).+)/", destination: "/:path", statusCode: 308 },
  ];
}
