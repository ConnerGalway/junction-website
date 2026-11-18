import { cacheLife } from "next/cache";
import { issueNumberFrom, numberCampaigns } from "./briefNumbers";
import { USE_MAILERLITE_ARCHIVE } from "./flags";

/**
 * The Brief: the only data source for /the-brief.
 *
 * THE ARCHIVE AND "THIS WEEK" ARE THE HAND-ENTERED ISSUES BELOW (ISSUES),
 * added by hand, roughly weekly, from Conner's Google Doc (the site may run a
 * week behind). "This week" is the newest by date; the archive is sorted by
 * date, newest first. MailerLite is used only for the signup
 * (/api/brief-subscribe), not for the archive.
 *
 * Kept for later, off: with USE_MAILERLITE_ARCHIVE (src/lib/flags.ts) on and
 * MAILERLITE_API_KEY set, newer issues are added from MailerLite: sent
 * campaigns whose NAME contains "Brief", numbered by src/lib/briefNumbers.ts
 * (a 3-digit number after "Brief", "Nº", "No." or "#", else by send date);
 * hand-entered issues keep their curated copy; any MailerLite error falls
 * back to the hand-entered list. With the flag off, no MailerLite call is
 * made at all.
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
 * THE ISSUES, entered by hand from Conner's Google Doc. NEWEST GOES AT THE TOP.
 *
 * To add an issue, copy this line to the top of the list and fill it in:
 *
 *   [550, "2026-11-23", "Feature headline in sentence case", "Optional one-line tagline.", ["First section headline", "Second section headline"]],
 *
 *   - number: the issue number (3 digits);
 *   - date: the send date, yyyy-mm-dd;
 *   - feature: the headline, in sentence case (keep brand names and months capitalized);
 *   - tagline (optional): one line; leave it out (or use undefined) if there isn't one;
 *   - sections (optional): the two "Also in this issue" headlines; only the newest issue shows them.
 *
 * Without a tagline or sections, stop after the headline:
 *   [550, "2026-11-23", "Feature headline in sentence case"],
 * Sections without a tagline:
 *   [550, "2026-11-23", "Feature headline in sentence case", undefined, ["First section", "Second section"]],
 *
 * Quotation marks inside a headline need a backslash: "This year's \"No AI was used\" ads".
 * [number, date, feature, tagline?, sections?]
 */
const ISSUES: [number, string, string, string?, [string, string]?][] = [
  [549, "2026-11-16", "You don't have to love AI. Your customers are using it anyway.", "ChatGPT now lets businesses claim their profile. Here's how I think about AI, even if you don't love it. Plus, Carnival turned a cruise ship into a video game.", ["Carnival turned a cruise ship into a video game", "Google is testing local listings with no call button"]],
  [548, "2026-11-09", "This year's hottest holiday ad feature: \"No AI was used\"", "The best holiday ads this year are bragging about being handmade. Plus, Reddit is putting up a wall.", ["Lands' End wants three or four big moments a year", "Reddit is putting up a wall"]],
  [547, "2026-11-02", "Instagram wants to be your TV", "A new 90-minute video format, and why the first accounts to use it get a head start. Plus, Lush hasn't posted on Instagram in five years.", ["Google is putting ads inside AI answers, everywhere", "Lush hasn't posted on Instagram in five years. Its content is still everywhere."]],
  [546, "2026-10-26", "One brand moved $1 million out of Meta. Here's what happened next.", "One brand pulled $1 million out of Meta and says its creator sales tripled in three months. Plus, your holiday shopper is already here.", ["Your holiday shopper showed up in October", "ChatGPT sends almost no traffic. The few visitors it sends actually buy."]],
  [545, "2026-10-19", "The best thing your marketing can do is let people go", "Pinterest's strangest advice this year might be its best. Plus, your ChatGPT traffic just went undercover.", ["Your customers will pay extra to change their minds", "Your ChatGPT traffic didn't disappear. It went undercover."]],
  [544, "2026-10-12", "Someone else is buying ads on your name", "1.1 million ads hijacked hotel searches in one month. Here’s the 30-second check.", ["Apple just made your iPhone customers harder to see", "The Russian bots didn't disappear"]],
  [543, "2026-10-05", "McDonald's is getting ready for the recommendation era", "Why the best-marketed brand on earth is backing away from promos.", ["Wyndham made 15x more ads with AI", "Influencer agencies are taking 30% off the top"]],
  [542, "2026-09-28", "The robots want to do your customers' shopping. Amazon just slammed the door.", "The first real fight over who gets to shop for your customers."],
  [541, "2026-09-21", "The link in your bio now costs $50 a month", "$50 a month to put a link in your own post."],
  [540, "2026-09-14", "Meta just launched the AI agent that nobody asked for", "Muse can learn from your entire social history, and act on your behalf."],
  [539, "2026-09-08", "Brands' new solution to anti-AI sentiment is to go older", "Lived experience is becoming the new proof of authenticity."],
  [538, "2026-08-31", "The AI traffic \"trade\" isn't a trade at all", "54 advertisers lost 10.5% of their organic search traffic. AI search sent back 1.3% of it."],
  [537, "2026-08-24", "YouTube just made \"views\" a much weaker number", "Here’s what to ask creators for instead, starting today."],
  [536, "2026-08-17", "Aéropostale made a six-episode show for less than one commercial costs", "And the reason it worked was sitting in their HR department."],
  [535, "2026-08-10", "I've spent two years telling clients not to build their website with AI. Last month I changed my mind.", "What actually changed my mind, and where I’d still pump the brakes."],
  [534, "2026-08-03", "Meta just let ChatGPT and Claude into your ad account. Here's what to actually try first.", "Last week I spent twenty minutes in Ads Manager building a report that should’ve taken two."],
  [533, "2026-07-27", "Nobody's won AI search yet, but someone will", "I keep hearing from business leaders who’ve written off AI search already, like ChatGPT and Perplexity picked their winners months ago."],
  [532, "2026-07-20", "The simplest way to increase your sales", "This past week I reviewed many of the 100+ businesses we’ve worked with in our Accelerator program over the past year, and something jumped off the page."],
];

/** The hand-entered issues, newest first: the archive and "This week" (the name is from the sample era). */
export const SAMPLE_ISSUES: Issue[] = ISSUES.map(([number, date, feature, tagline, sections]) => ({
  number,
  date,
  feature,
  ...(tagline ? { tagline } : {}),
  ...(sections ? { sections } : {}),
  topics: tagTopics([feature, ...(sections ?? [])]),
  url: null,
}))
  // Newest first by date (then number), whatever order the list is in.
  .sort((a, b) => b.date.localeCompare(a.date) || (b.number ?? 0) - (a.number ?? 0));

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

/** Hand-entered and MailerLite issues together, newest first by date (only with USE_MAILERLITE_ARCHIVE). */
function merged(fromMailerLite: Issue[]): Issue[] {
  return [...fromMailerLite, ...SAMPLE_ISSUES].sort((a, b) => b.date.localeCompare(a.date) || (b.number ?? 0) - (a.number ?? 0));
}

/** The last good MailerLite result this server instance fetched (fallback for failed refreshes). */
let lastGood: Issue[] | null = null;

/**
 * Every issue, newest first by date. Now: the hand-entered issues only, with
 * no MailerLite call. With USE_MAILERLITE_ARCHIVE on (and the key set), newer
 * MailerLite issues are merged in; cached and revalidated hourly.
 */
export async function getIssues(): Promise<Issue[]> {
  "use cache";
  if (!USE_MAILERLITE_ARCHIVE || !process.env.MAILERLITE_API_KEY?.trim()) {
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


