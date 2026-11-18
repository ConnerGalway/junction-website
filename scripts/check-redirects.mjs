// Spot-check the redirects (src/lib/redirects.ts) against a running site.
// Usage: npm run check:redirects -- <base URL>   (default http://localhost:3000)
// e.g.   npm run check:redirects -- https://deploy-preview-15--<site>.netlify.app
// Each line: path → expected; it checks the first response only (one hop),
// and that a redirect's destination answers 200 without another redirect.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

/** [path, expected destination | "200" (a page, no redirect) | "no-redirect" (any non-redirect status), method?] */
const CASES = [
  ["/about-us/", "/about"],
  ["/our-services/", "/programs"],
  ["/contact-us/", "/contact"],
  ["/articles/", "/the-brief"],
  ["/the-newsfeed-is-dead/", "/the-brief"],
  ["/you-dont-have-to-love-ai-your-customers-are-using-it-anyway/", "/the-brief"],
  ["/category/digital/", "/the-brief"],
  ["/author/conner/", "/about"],
  ["/accelerator", "200"],
  ["/elearningu", "200"],
  ["/work", "200"],
  ["/favicon.ico", "no-redirect"],
  ["/api/brief-subscribe", "no-redirect"],
  // Extras
  ["/about-us", "/about"],
  ["/our-clients", "/work"],
  ["/the-brief/", "/the-brief"],
  ["/privacy-policy/", "/privacy-policy"],
  ["/elearningu/industry-scan/", "/elearningu/industry-scan"],
  ["/junctionu", "/elearningu"],
  ["/junctionu/", "/elearningu"],
  ["/tag/marketing/", "/the-brief"],
  ["/page/2/", "/the-brief"],
  ["/feed/", "/the-brief"],
  ["/the-newsfeed-is-dead/feed/", "/the-brief"],
  ["/comments/feed/", "/the-brief"],
  ["/wp-login.php", "/"],
  ["/wp-admin/", "/"],
  ["/xmlrpc.php", "/"],
  ["/wp-content/uploads/2023/01/photo.jpg", "no-redirect"],
  ["/", "200"],
  ["/robots.txt", "200"],
  ["/sitemap.xml", "200"],
  ["/__forms.html", "200"],
  ["/images/home-hero-team.jpg", "200"],
];

let failed = 0;
for (const [path, expected] of CASES) {
  const res = await fetch(base + path, { redirect: "manual" });
  const loc = res.headers.get("location");
  const dest = loc ? new URL(loc, base).pathname : null;
  let ok;
  let detail = `${res.status}${dest ? ` → ${dest}` : ""}`;
  if (expected === "200") ok = res.status === 200;
  else if (expected === "no-redirect") ok = res.status < 300 || res.status >= 400;
  else {
    ok = [301, 308].includes(res.status) && dest === expected;
    if (ok) {
      const next = await fetch(base + dest, { redirect: "manual" });
      if (next.status !== 200) {
        ok = false;
        detail += ` (destination answered ${next.status}: more than one hop)`;
      }
    }
  }
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"}  ${path.padEnd(64)} expected ${expected.padEnd(12)} got ${detail}`);
}
console.log(failed ? `\n${failed} failed` : `\nAll ${CASES.length} checks passed.`);
process.exit(failed ? 1 : 0);
