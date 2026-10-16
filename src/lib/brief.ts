import { cacheLife } from "next/cache";

/**
 * The Brief: the only data source for /the-brief.
 *
 * Issues come from Mailchimp when three SERVER-ONLY env vars are set (never
 * read them in client code; nothing here is NEXT_PUBLIC_):
 *   MAILCHIMP_API_KEY         an API key (Account → Extras → API keys)
 *   MAILCHIMP_SERVER_PREFIX   the data centre, e.g. "us21" (the key's suffix)
 *   MAILCHIMP_BRIEF_LIST_ID   The Brief's audience ID
 * Without them (or if Mailchimp can't be reached and nothing was fetched
 * before) the page uses SAMPLE_ISSUES below.
 *
 * Refresh: getIssues() is cached ("use cache") and revalidates hourly, so a
 * newly sent campaign appears on its own. A failed refresh serves the last
 * good result this server holds (or the sample) and retries within minutes.
 */

export type Issue = {
  /** Issue number parsed from the campaign title ("Brief 544"); null hides the margin number. */
  number: number | null;
  /** Send date, ISO yyyy-mm-dd (Vancouver time). */
  date: string;
  /** The feature headline (the campaign subject line; never rewritten). */
  feature: string;
  /**
   * One line under the headline: the campaign's preview text, else the first
   * sentence of the feature (up to ~180 characters). Omitted when neither exists.
   */
  tagline?: string;
  /** The two section headlines. Fetched for the latest issue only. */
  sections?: [string, string];
  topics: string[];
  /** The campaign's archive page; null in sample mode (links go to the signup). */
  url: string | null;
};

/* ─── Topics ─────────────────────────────────────────────────────────────── */

/**
 * Topic rules, in tab order. An issue gets every topic with at least one
 * pattern matching its feature or section headlines (case-insensitive).
 * Edit freely; topics with no issues are hidden from the tabs.
 */
export const TOPIC_RULES: { topic: string; patterns: RegExp[] }[] = [
  {
    topic: "AI",
    patterns: [/\bAI\b/i, /\bChatGPT\b/i, /\bClaude\b/i, /\bGemini\b/i, /\bOpenAI\b/i, /\brobots?\b/i, /\bbots?\b/i],
  },
  {
    topic: "Search",
    patterns: [/\bsearch\b/i, /\bGoogle\b/i, /\brecommendations?\b/i, /\bSEO\b/i, /\brankings?\b/i],
  },
  {
    topic: "Social",
    patterns: [
      /\bInstagram\b/i,
      /\bLinkedIn\b/i,
      /\bTikTok\b/i,
      /\bYouTube\b/i,
      /\bReddit\b/i,
      /\bcreators?\b/i,
      /\binfluencers?\b/i,
      /\blink in (?:your |the )?bio\b/i,
      /\bsocial\b/i,
    ],
  },
  {
    topic: "Advertising",
    patterns: [/\bads?\b/i, /\badvertising\b/i, /\bad account\b/i, /\bcommercials?\b/i],
  },
  {
    topic: "Tourism",
    patterns: [/\btourism\b/i, /\btravel\b/i, /\btravell?ers?\b/i, /\bvisitors?\b/i, /\bholidays?\b/i, /\bhotels?\b/i],
  },
];

/** Topics for a set of headlines, in TOPIC_RULES order. */
export function tagTopics(headlines: string[]): string[] {
  const text = headlines.join(" \n ");
  return TOPIC_RULES.filter((rule) => rule.patterns.some((p) => p.test(text))).map((rule) => rule.topic);
}

/** The topics that have at least one issue, in TOPIC_RULES order. */
export function topicsIn(issues: Issue[]): string[] {
  const used = new Set(issues.flatMap((i) => i.topics));
  return TOPIC_RULES.map((r) => r.topic).filter((t) => used.has(t));
}

/* ─── Sample ─────────────────────────────────────────────────────────────── */

/*
 * SAMPLE CONTENT — replaced automatically once the Mailchimp env vars are set.
 * Newest first. Sections are kept for every issue, though only the latest
 * one's are shown.
 */
const SAMPLE: [number, string, string, string, string, string?][] = [
  [544, "2026-10-12", "Someone else is buying ads on your name", "Apple just made your iPhone customers harder to see", "The Russian bots didn't disappear", "1.1 million ads hijacked hotel searches in one month. Here's the 30-second check."],
  [543, "2026-10-05", "McDonald's is getting ready for the recommendation era", "Wyndham made 15x more ads with AI", "Influencer agencies are taking 30% off the top", "Why the best-marketed brand on earth is backing away from promos."],
  [542, "2026-09-28", "The robots want to do your customers' shopping. Amazon just slammed the door.", "ChatGPT isn't the only AI you need to worry about anymore", "You're spending more on Meta ads. Are you getting more?", "The first real fight over who gets to shop for your customers."],
  [541, "2026-09-21", "The link in your bio now costs $50 a month", "Content marketing just posted its worst year in twelve", "People will take a robot's recommendation, if a human is behind it", "$50 a month to put a link in your own post."],
  [538, "2026-08-31", "The AI traffic \"trade\" isn't a trade at all", "LinkedIn's \"AI slop\" button got a million clicks in two weeks", "Google called its August update routine. The ranking data disagrees.", "54 advertisers lost 10.5% of their organic search traffic. AI search sent back 1.3% of it."],
  [536, "2026-08-17", "Aéropostale made a six-episode show for less than one commercial costs", "Turning your staff into creators is harder than the LinkedIn posts make it sound", "Instagram redesigned its wordmark and everyone read it as Instagzam", "And the reason it worked was sitting in their HR department."],
  [535, "2026-08-10", "I've spent two years telling clients not to build their website with AI. Last month I changed my mind.", "AI shopping assistants just got their ads, and way faster than anyone expected", "Four holiday-shopping reports just told me four different stories about AI", "What actually changed my mind, and where I'd still pump the brakes."],
  // 534–532 have no tagline: the line is simply omitted.
  [534, "2026-08-03", "Meta just let ChatGPT and Claude into your ad account — here's what to actually try first.", "LinkedIn just added a \"seems like AI slop\" button, and honestly, take my money", "2x. That's the number AI skeptics have been waiting for."],
  [533, "2026-07-27", "Nobody's won AI search yet — but someone will", "The AI backlash isn't coming. It's already here.", "Reddit built you a free analytics dashboard. Most brands don't know it exists."],
  [532, "2026-07-20", "The simplest way to increase your sales", "Do people care if your content is AI-generated?", "Google and Meta are hiding AI labels on ads"],
];

export const SAMPLE_ISSUES: Issue[] = SAMPLE.map(([number, date, feature, a, b, tagline]) => ({
  number,
  date,
  feature,
  ...(tagline ? { tagline } : {}),
  sections: [a, b],
  topics: tagTopics([feature, a, b]),
  url: null,
}));

/* ─── Mailchimp ──────────────────────────────────────────────────────────── */

/**
 * Where the two section headlines sit in a campaign's HTML. The parser
 * collects the text of every `tags` heading in order, drops empty ones and
 * any matching `ignore` (template furniture), finds the feature (the first
 * heading that matches the subject line, or else the first heading), then
 * takes the next two. Adjust these to the real template if extraction
 * misses; if it finds fewer than two, the page simply hides "Also in this
 * issue".
 */
export const SECTION_PARSER = {
  tags: ["h1", "h2", "h3"],
  ignore: [/^the brief\b/i, /^this week\b/i, /^also in this issue\b/i, /^nº?\s*\d+$/i, /^read (more|on)\b/i, /^subscribe\b/i],
  minLength: 8,
  /** Tagline fallback: the first sentence after the feature heading, cut at a word beyond this many characters. */
  leadMaxLength: 180,
};

type MailchimpCampaign = {
  id: string;
  send_time: string;
  archive_url: string;
  settings: { subject_line: string; title: string; preview_text?: string };
};

const PAGE_SIZE = 100;
const MAX_CAMPAIGNS = 1000;

function mailchimpConfig() {
  const key = process.env.MAILCHIMP_API_KEY;
  const prefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const list = process.env.MAILCHIMP_BRIEF_LIST_ID;
  return key && prefix && list ? { key, prefix, list } : null;
}

async function mailchimpGet<T>(cfg: { key: string; prefix: string }, path: string): Promise<T> {
  const res = await fetch(`https://${cfg.prefix}.api.mailchimp.com/3.0${path}`, {
    headers: { Authorization: `Basic ${Buffer.from(`brief:${cfg.key}`).toString("base64")}` },
  });
  if (!res.ok) throw new Error(`Mailchimp ${path.split("?")[0]} responded ${res.status}`);
  return (await res.json()) as T;
}

/**
 * "Brief 544" → 544. Prefers the number right after "Brief" (so a year
 * elsewhere in the title isn't taken for it), else the first 3–4 digit number.
 */
export function issueNumberFrom(title: string): number | null {
  const m = title.match(/brief\s*(?:n[ºo.]?\s*)?#?\s*(\d{3,4})(?!\d)/i) ?? title.match(/(?<!\d)(\d{3,4})(?!\d)/);
  return m ? Number(m[1]) : null;
}

/** Send time → yyyy-mm-dd in Vancouver time (so a Monday send stays Monday). */
function sendDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘",
  rdquo: "”", ldquo: "“", mdash: "—", ndash: "–", hellip: "…", ordm: "º",
};

/** Heading text: tags stripped, entities decoded, whitespace collapsed. */
function textOf(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

/** The two section headlines after the feature, or undefined (see SECTION_PARSER). */
export function extractSections(html: string, subject: string): [string, string] | undefined {
  const tags = SECTION_PARSER.tags.join("|");
  const headings = [...html.matchAll(new RegExp(`<(${tags})\\b[^>]*>([\\s\\S]*?)</\\1>`, "gi"))]
    .map((m) => textOf(m[2]))
    .filter((t) => t.length >= SECTION_PARSER.minLength && !SECTION_PARSER.ignore.some((re) => re.test(t)));
  const subj = normalize(subject);
  const featureAt = Math.max(0, headings.findIndex((h) => normalize(h) === subj || normalize(h).includes(subj)));
  const next = headings.slice(featureAt + 1, featureAt + 3);
  return next.length === 2 ? [next[0], next[1]] : undefined;
}

/** "First sentence…" of a text, cut at a word (with "…") if longer than `max`. */
function firstSentence(text: string, max: number) {
  const sentence = (text.match(/^.+?[.!?](?=["”’)]*(?:\s|$))["”’)]*/)?.[0] ?? text).trim();
  if (sentence.length <= max) return sentence;
  const cut = sentence.slice(0, max + 1).replace(/\s+\S*$/, "").replace(/[\s,;:–—-]+$/, "");
  return `${cut}…`;
}

/**
 * Tagline fallback: the first sentence of the feature's body, i.e. the text
 * between the feature heading (see SECTION_PARSER) and the next heading.
 * Undefined if the feature heading isn't found or has no text after it.
 */
export function extractLead(html: string, subject: string): string | undefined {
  const tags = SECTION_PARSER.tags.join("|");
  const headings = [...html.matchAll(new RegExp(`<(${tags})\\b[^>]*>([\\s\\S]*?)</\\1>`, "gi"))];
  const subj = normalize(subject);
  const i = headings.findIndex((m) => {
    const t = normalize(textOf(m[2]));
    return t.length > 0 && (t === subj || t.includes(subj));
  });
  if (i < 0) return undefined;
  const start = headings[i].index! + headings[i][0].length;
  const end = headings[i + 1]?.index ?? html.length;
  const body = textOf(html.slice(start, end).replace(/<(style|script)\b[\s\S]*?<\/\1>/gi, " "));
  return body ? firstSentence(body, SECTION_PARSER.leadMaxLength) : undefined;
}

/** Run `fn` over `items`, at most `limit` at a time. */
async function mapLimit<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) await fn(items[next++]);
    })
  );
}

/** All sent campaigns for The Brief's audience, newest first. Throws on any API error. */
async function fetchFromMailchimp(cfg: { key: string; prefix: string; list: string }): Promise<Issue[]> {
  const campaigns: MailchimpCampaign[] = [];
  const fields =
    "campaigns.id,campaigns.send_time,campaigns.archive_url,campaigns.settings.subject_line,campaigns.settings.title,campaigns.settings.preview_text,total_items";
  for (let offset = 0; offset < MAX_CAMPAIGNS; offset += PAGE_SIZE) {
    const page = await mailchimpGet<{ campaigns: MailchimpCampaign[]; total_items: number }>(
      cfg,
      `/campaigns?status=sent&list_id=${encodeURIComponent(cfg.list)}&sort_field=send_time&sort_dir=DESC&count=${PAGE_SIZE}&offset=${offset}&fields=${fields}`
    );
    campaigns.push(...page.campaigns);
    if (page.campaigns.length < PAGE_SIZE || campaigns.length >= page.total_items) break;
  }

  const issues: Issue[] = campaigns.map((c) => ({
    number: issueNumberFrom(c.settings.title ?? ""),
    date: sendDate(c.send_time),
    feature: c.settings.subject_line,
    ...(c.settings.preview_text?.trim() ? { tagline: c.settings.preview_text.trim() } : {}),
    topics: [],
    url: c.archive_url || null,
  }));

  // Campaign HTML: for the latest issue's sections, and for the tagline of any
  // issue without preview text. Each fetch is optional: a failure only drops
  // that issue's sections or tagline, never the page.
  const content = (id: string) =>
    mailchimpGet<{ html?: string }>(cfg, `/campaigns/${id}/content?fields=html`).then((c) => c.html ?? "", () => "");
  await mapLimit(
    campaigns.map((c, i) => ({ c, i })).filter(({ i }) => i === 0 || !issues[i].tagline),
    5,
    async ({ c, i }) => {
      const html = await content(c.id);
      if (!html) return;
      if (i === 0) issues[0].sections = extractSections(html, c.settings.subject_line);
      if (!issues[i].tagline) {
        const lead = extractLead(html, c.settings.subject_line);
        if (lead) issues[i].tagline = lead;
      }
    }
  );

  for (const issue of issues) issue.topics = tagTopics([issue.feature, ...(issue.sections ?? [])]);
  return issues;
}

/** The last good Mailchimp result this server instance fetched (fallback for failed refreshes). */
let lastGood: Issue[] | null = null;

/** Every issue, newest first. Cached; revalidates hourly. */
export async function getIssues(): Promise<Issue[]> {
  "use cache";
  const cfg = mailchimpConfig();
  if (!cfg) {
    cacheLife("hours");
    return SAMPLE_ISSUES;
  }
  try {
    const issues = await fetchFromMailchimp(cfg);
    if (issues.length === 0) throw new Error("Mailchimp returned no sent campaigns");
    lastGood = issues;
    cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
    return issues;
  } catch (error) {
    console.error("[the-brief] Mailchimp fetch failed; serving cached or sample issues.", error);
    // Retry soon rather than holding the fallback for an hour.
    cacheLife("minutes");
    return lastGood ?? SAMPLE_ISSUES;
  }
}

/** The newest issue (shown as "This week"). */
export async function getLatestIssue(): Promise<Issue | undefined> {
  return (await getIssues())[0];
}

/** True when the page is showing SAMPLE_ISSUES (Mailchimp not configured). */
export function isSampleMode() {
  return mailchimpConfig() === null;
}
