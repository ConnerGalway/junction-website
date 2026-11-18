import { cacheLife } from "next/cache";
import { issueNumberFrom, numberCampaigns } from "./briefNumbers";

/**
 * The Brief: the only data source for /the-brief. The Brief runs on
 * MailerLite.
 *
 * Issues = the hand-entered issues below (549 back to 532) plus any newer
 * ones from MailerLite: sent campaigns whose NAME contains "Brief". The
 * issue number is a 3-digit number right after "Brief", "Nº", "No." or "#"
 * ("Brief 549", "The Brief #550", "Brief Nº 551"); never a year or a date.
 * A campaign without one is numbered by send date (the next number after the
 * issue sent before it); see src/lib/briefNumbers.ts. A
 * hand-entered issue keeps its curated headline, tagline and sections; a
 * MailerLite issue the list doesn't have is added from the campaign (subject
 * as the headline, the first sentence of its content as the tagline, and,
 * for the newest, its next two headings as sections).
 *
 * MailerLite is read server side with MAILERLITE_API_KEY (src/lib/mailerlite.ts).
 * Without the key, if the API fails, or if no campaign matches, the page
 * shows the hand-entered issues. It never breaks on a MailerLite error.
 *
 * Refresh: getIssues() is cached ("use cache") and revalidates hourly, so a
 * newly sent campaign appears on its own. A failed refresh serves the last
 * good result this server holds (or the hand-entered list) and retries
 * within minutes.
 */

export type Issue = {
  /** Issue number parsed from the campaign name ("Brief 544"); null hides the margin number. */
  number: number | null;
  /** Send date, ISO yyyy-mm-dd. */
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

/* ─── Issues ─────────────────────────────────────────────────────────────── */

/*
 * THE REAL ISSUES, entered by hand (newest first). They're always shown,
 * and win over MailerLite for the same issue number (curated copy). Newer
 * issues come from MailerLite (see the header comment).
 *
 * Headlines are in sentence case (brand names and months keep their
 * capitals). Taglines for 549–545 only; section headlines for 549–543.
 * [number, date, feature, tagline?, sections?]
 */
const ISSUES: [number, string, string, string?, [string, string]?][] = [
  [549, "2026-11-16", "You don't have to love AI. Your customers are using it anyway.", "ChatGPT now lets businesses claim their profile. Here's how I think about AI, even if you don't love it. Plus, Carnival turned a cruise ship into a video game.", ["Carnival turned a cruise ship into a video game", "Google is testing local listings with no call button"]],
  [548, "2026-11-09", "This year's hottest holiday ad feature: \"No AI was used\"", "The best holiday ads this year are bragging about being handmade. Plus, Reddit is putting up a wall.", ["Lands' End wants three or four big moments a year", "Reddit is putting up a wall"]],
  [547, "2026-11-02", "Instagram wants to be your TV", "A new 90-minute video format, and why the first accounts to use it get a head start. Plus, Lush hasn't posted on Instagram in five years.", ["Google is putting ads inside AI answers, everywhere", "Lush hasn't posted on Instagram in five years. Its content is still everywhere."]],
  [546, "2026-10-26", "One brand moved $1 million out of Meta. Here's what happened next.", "One brand pulled $1 million out of Meta and says its creator sales tripled in three months. Plus, your holiday shopper is already here.", ["Your holiday shopper showed up in October", "ChatGPT sends almost no traffic. The few visitors it sends actually buy."]],
  [545, "2026-10-19", "The best thing your marketing can do is let people go", "Pinterest's strangest advice this year might be its best. Plus, your ChatGPT traffic just went undercover.", ["Your customers will pay extra to change their minds", "Your ChatGPT traffic didn't disappear. It went undercover."]],
  [544, "2026-10-12", "Someone else is buying ads on your name", undefined, ["Apple just made your iPhone customers harder to see", "The Russian bots didn't disappear"]],
  [543, "2026-10-05", "McDonald's is getting ready for the recommendation era", undefined, ["Wyndham made 15x more ads with AI", "Influencer agencies are taking 30% off the top"]],
  [542, "2026-09-28", "The robots want to do your customers' shopping. Amazon just slammed the door."],
  [541, "2026-09-21", "The link in your bio now costs $50 a month"],
  [540, "2026-09-14", "Meta just launched the AI agent that nobody asked for"],
  [539, "2026-09-08", "Brands' new solution to anti-AI sentiment is to go older"],
  [538, "2026-08-31", "The AI traffic \"trade\" isn't a trade at all"],
  [537, "2026-08-24", "YouTube just made \"views\" a much weaker number"],
  [536, "2026-08-17", "Aéropostale made a six-episode show for less than one commercial costs"],
  [535, "2026-08-10", "I've spent two years telling clients not to build their website with AI. Last month I changed my mind."],
  [534, "2026-08-03", "Meta just let ChatGPT and Claude into your ad account. Here's what to actually try first."],
  [533, "2026-07-27", "Nobody's won AI search yet, but someone will"],
  [532, "2026-07-20", "The simplest way to increase your sales"],
];

/** The hand-entered issues (the name is from the sample era; also the page's fallback list). */
export const SAMPLE_ISSUES: Issue[] = ISSUES.map(([number, date, feature, tagline, sections]) => ({
  number,
  date,
  feature,
  ...(tagline ? { tagline } : {}),
  ...(sections ? { sections } : {}),
  topics: tagTopics([feature, ...(sections ?? [])]),
  url: null,
}));

/* ─── Parsing a campaign ─────────────────────────────────────────────────── */

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

/** A campaign is an issue of The Brief when its name says "Brief" (its number comes from briefNumbers.ts). */
const isBriefName = (name: string) => /\bbrief\b/i.test(name);

/**
 * A MailerLite date → yyyy-mm-dd. MailerLite sends "2026-11-16 13:00:00"
 * (the account's time zone): take the date as written. A full ISO time with
 * a zone is converted to Vancouver time so a Monday send stays Monday.
 */
function sendDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(value)) return value.slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value.slice(0, 10);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
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

/* ─── MailerLite ─────────────────────────────────────────────────────────── */

type MailerLiteEmail = { subject?: string; content?: string; preheader?: string; preview_text?: string };
type MailerLiteCampaign = {
  id: string;
  name: string;
  status?: string;
  finished_at?: string | null;
  started_at?: string | null;
  scheduled_for?: string | null;
  queued_at?: string | null;
  created_at?: string | null;
  emails?: MailerLiteEmail[];
};

const MAX_PAGES = 20;

const sentAt = (c: MailerLiteCampaign) => c.finished_at ?? c.started_at ?? c.scheduled_for ?? c.queued_at ?? c.created_at ?? "";

/** Every sent campaign that is an issue of The Brief, newest first. Throws on an API error. */
async function briefCampaigns(): Promise<MailerLiteCampaign[]> {
  const { mailerlite } = await import("./mailerlite");
  const all: MailerLiteCampaign[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await mailerlite<{ data: MailerLiteCampaign[]; meta?: { last_page?: number } }>(
      `/campaigns?filter[status]=sent&limit=100&page=${page}`
    );
    all.push(...res.data);
    if (!res.meta?.last_page || page >= res.meta.last_page || res.data.length === 0) break;
  }
  return all
    .filter((c) => isBriefName(c.name ?? ""))
    .sort((a, b) => sentAt(b).localeCompare(sentAt(a)));
}

/** One campaign's email HTML (the list doesn't always include it). Optional: "" on any failure. */
async function campaignHtml(c: MailerLiteCampaign): Promise<string> {
  if (c.emails?.[0]?.content) return c.emails[0].content;
  try {
    const { mailerlite } = await import("./mailerlite");
    const res = await mailerlite<{ data: MailerLiteCampaign }>(`/campaigns/${encodeURIComponent(c.id)}`);
    return res.data.emails?.[0]?.content ?? "";
  } catch {
    return "";
  }
}

/**
 * The issues MailerLite adds, newest first: campaigns that aren't already
 * hand-entered, numbered by numberCampaigns (a valid number from the name,
 * else by send date; never a duplicate). Each needs a subject; the tagline is the email's preview text if the API
 * gives one, else the first sentence of its content; the newest gets its
 * sections. Content fetches are optional: a failure only drops a tagline or
 * the sections.
 */
async function fetchFromMailerLite(): Promise<Issue[]> {
  const all = (await briefCampaigns()).filter((c) => c.emails?.[0]?.subject);
  const numbers = numberCampaigns(
    SAMPLE_ISSUES,
    all.map((c) => ({ number: issueNumberFrom(c.name), date: sendDate(sentAt(c)) }))
  );
  const campaigns = all.map((c, i) => ({ c, number: numbers[i] })).filter((x): x is { c: MailerLiteCampaign; number: number } => x.number !== null);
  return Promise.all(
    campaigns.map(async ({ c, number }, i) => {
      const email = c.emails![0];
      const subject = email.subject!.trim();
      const preview = (email.preheader ?? email.preview_text ?? "").trim();
      const needsHtml = i === 0 || !preview;
      const html = needsHtml ? await campaignHtml(c) : "";
      const tagline = preview || (html ? extractLead(html, subject) : undefined);
      const sections = i === 0 && html ? extractSections(html, subject) : undefined;
      return {
        number,
        date: sendDate(sentAt(c)),
        feature: subject,
        ...(tagline ? { tagline } : {}),
        ...(sections ? { sections } : {}),
        topics: tagTopics([subject, ...(sections ?? [])]),
        url: null,
      } satisfies Issue;
    })
  );
}

/** Hand-entered and MailerLite issues together, newest first. */
function merged(fromMailerLite: Issue[]): Issue[] {
  return [...fromMailerLite, ...SAMPLE_ISSUES].sort((a, b) => (b.number ?? 0) - (a.number ?? 0) || b.date.localeCompare(a.date));
}

/** The last good MailerLite result this server instance fetched (fallback for failed refreshes). */
let lastGood: Issue[] | null = null;

/** Every issue, newest first. Cached; revalidates hourly. */
export async function getIssues(): Promise<Issue[]> {
  "use cache";
  if (!process.env.MAILERLITE_API_KEY?.trim()) {
    cacheLife("hours");
    return SAMPLE_ISSUES;
  }
  try {
    const issues = merged(await fetchFromMailerLite());
    lastGood = issues;
    cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
    return issues;
  } catch (error) {
    console.error("[the-brief] MailerLite fetch failed; serving cached or hand-entered issues.", String(error));
    // Retry soon rather than holding the fallback for an hour.
    cacheLife("minutes");
    return lastGood ?? SAMPLE_ISSUES;
  }
}


