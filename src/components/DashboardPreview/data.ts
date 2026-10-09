/**
 * Example content for the Accelerator dashboard preview (an example
 * business, Conner's Cabins). Copied from the approved prototype,
 * design/redesign/accelerator-dashboard-prototype-v3.html.
 */

export type Tactic = {
  name: string;
  n: number;
  kind: string;
  status: string;
  pct: number;
  done: string;
  desc: string;
  what: string;
  pillars: [string, string][];
  heard: string;
  why: string;
  time: string;
  steps: string[];
  metrics: [string, string][];
  tips: string[];
};

export const tactics: Tactic[] = [
  {
    name: "Content system",
    n: 1,
    kind: "Foundation",
    status: "In progress",
    pct: 30,
    done: "3 of 10 done",
    desc: "A weekly filming and posting rhythm.",
    what: "One filming session a week gives you a week of posts.",
    pillars: [
      ["The stay", "Interiors, morning light, the details"],
      ["The lake", "Docks, paddles, sunsets"],
      ["The people", "Hosts and short talking heads"],
      ["The season", "What's on, what's changing"],
    ],
    heard: "“We have the photos, we just never post them.”",
    why: "Steady posting builds reach and feeds your ads.",
    time: "About 1 hour a week",
    steps: [
      "Write down your four content pillars",
      "Book a weekly one-hour filming slot",
      "Film your first session",
      "Edit and schedule three posts",
      "Review what worked after week four",
    ],
    metrics: [
      ["Posts a week", "3"],
      ["Missed weeks", "0"],
      ["Reach vs. last quarter", "+40%"],
    ],
    tips: [
      "Film everything in one session, post through the week.",
      "Talking heads under 30 seconds do best.",
      "Reuse your best post as an ad in week three.",
    ],
  },
  {
    name: "Paid social",
    n: 2,
    kind: "Growth",
    status: "In progress",
    pct: 44,
    done: "4 of 9 done",
    desc: "Paid reach behind posts that already work.",
    what: "A small weekly budget behind your best posts.",
    pillars: [
      ["Audience", "Within 150 km of the lake"],
      ["Creative", "Your two best organic posts"],
      ["Budget", "Small, steady, every week"],
      ["Tracking", "Pixel installed before spending"],
    ],
    heard: "“Boosting never seemed to do anything.”",
    why: "The cheapest way to fill midweek stays.",
    time: "About 30 min a week",
    steps: [
      "Set up the ad account and payment",
      "Install the tracking pixel",
      "Pick two proven posts",
      "Launch and check after 24 hours",
      "Note your baseline cost per booking",
    ],
    metrics: [
      ["Cost per booking", "Baseline"],
      ["Weekly budget", "Fixed"],
      ["Bookings from ads", "Tracked"],
    ],
    tips: [
      "Never change more than one thing at a time.",
      "Give a campaign a week before judging it.",
      "Refresh creative every month.",
    ],
  },
  {
    name: "Google and reviews",
    n: 3,
    kind: "Trust",
    status: "Up next",
    pct: 0,
    done: "0 of 9 done",
    desc: "Be easy to find and easy to trust.",
    what: "A complete profile and a steady flow of reviews.",
    pillars: [
      ["Profile", "Photos, hours, amenities"],
      ["Replies", "Answer every review"],
      ["The ask", "A link in the checkout email"],
      ["Q&A", "Check it twice a month"],
    ],
    heard: "“Guests love it, but never write it down.”",
    why: "Recent reviews lift you in local search.",
    time: "About 20 min a week",
    steps: [
      "Finish every field in the profile",
      "Upload ten fresh photos",
      "Reply to the unanswered reviews",
      "Add a review link to the checkout email",
      "Set a goal of 60 reviews",
    ],
    metrics: [
      ["Reviews", "60+"],
      ["Reply time", "Under 2 days"],
      ["Profile complete", "100%"],
    ],
    tips: [
      "Ask in person first, then send the link.",
      "Reply to bad reviews calmly and quickly.",
      "Add new photos every season.",
    ],
  },
];

/** Grade band colours in the product: gold, canopy or copper. */
export type GradeTone = "gold" | "canopy" | "copper";

export const areas: { grade: string; name: string; note: string; tone: GradeTone }[] = [
  { grade: "C", name: "Website and technical", note: "Fast on desktop, slow on phones.", tone: "gold" },
  { grade: "B+", name: "Reviews and reputation", note: "Strong rating, too few reviews.", tone: "canopy" },
  { grade: "B−", name: "Social media and content", note: "Great photos, no rhythm.", tone: "canopy" },
  { grade: "B", name: "Customer experience", note: "Guests love the stay.", tone: "canopy" },
  { grade: "D+", name: "Local visibility", note: "Google profile half finished.", tone: "copper" },
];

export type Week = { id: string; title: string; done: number; tasks: string[]; checked: boolean[] };

export const weeks: Week[] = [
  {
    id: "W1",
    title: "Set up foundations",
    done: 4,
    tasks: [
      "Write down your four content pillars",
      "Build a content calendar",
      "Set up the ad account",
      "Install the tracking pixel",
      "Photograph every cabin",
      "Book a weekly filming slot",
      "Claim the Google profile",
    ],
    checked: [true, false, true, true, false, true, false],
  },
  {
    id: "W2",
    title: "Start the content rhythm",
    done: 2,
    tasks: [
      "Choose your posting days",
      "Set the weekly ad budget",
      "Film your first weekly content session",
      "Schedule your first three posts",
      "Share one behind-the-scenes story",
      "Reply to comments within a day",
      "Check your first week of reach",
    ],
    checked: [true, true, false, false, false, false, false],
  },
  { id: "W3", title: "Launch the first ads", done: 1, tasks: [], checked: [] },
  { id: "W4", title: "Ask for reviews every stay", done: 0, tasks: [], checked: [] },
];

export const phases = [
  { weeks: "Weeks 1–4", name: "Setup and launch" },
  { weeks: "Weeks 5–8", name: "Rhythm" },
  { weeks: "Weeks 9–12", name: "Refine" },
  { weeks: "After", name: "Sustained" },
];
