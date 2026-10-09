/**
 * The building-supply case study (Offload Program). One source for the
 * full story on /ai-accelerator#case-study and the homepage teaser, so
 * every fact matches.
 */

export const CASE_META = "Offload Program · Building supply · 7 people";

export const CASE_INTRO =
  "A family-owned supply yard brought seven people, from the president to accounts payable. Here is where they started, and what they left with.";

export type CaseArea = {
  id: string;
  area: string;
  /** The headline number (Bebas) and its label. */
  number: string;
  numberLabel: string;
  before: string;
  cost: string;
  /** What we built, or (kind "next") what's on the roadmap. */
  outcome: { kind: "built" | "next"; name: string; line: string };
};

export const CASE_AREAS: CaseArea[] = [
  {
    id: "collections",
    area: "Collections",
    number: "65%",
    numberLabel: "collected inside 30 days",
    before: "Terms were 30 days, but only 65% was collected inside 30.",
    cost: "Cash was hard to plan, and the president got pulled into difficult accounts.",
    outcome: {
      kind: "built",
      name: "Collections assistant",
      line: "Reads the aging report and drafts reminders in the company's voice.",
    },
  },
  {
    id: "quotes",
    area: "Quotes",
    number: "1 day",
    numberLabel: "for a single quote",
    before: "Material lists arrived handwritten, by text or by email, and codes were typed in by hand.",
    cost: "Each quote took five minutes to a day.",
    outcome: {
      kind: "built",
      name: "Material list converter",
      line: "Turns a photo or email into clean line items for the ERP.",
    },
  },
  {
    id: "invoices",
    area: "Invoices",
    number: "3 docs",
    numberLabel: "matched by hand",
    before: "PO, supplier invoice and packing slip matched by hand, then keyed in.",
    cost: "The AP role spent its time on data entry.",
    outcome: {
      kind: "next",
      name: "Invoice matching",
      line: "On the roadmap, prioritized for after the program.",
    },
  },
  {
    id: "leadership",
    area: "Leadership",
    number: "3 roles",
    numberLabel: "one person",
    before: "One person covering three senior roles.",
    cost: "No time left for customers or growth.",
    outcome: {
      kind: "built",
      name: "Business brain",
      line: "Prices, terms and policies in one workspace the whole team uses.",
    },
  },
];

/** The area shown first in the switcher. */
export const CASE_DEFAULT_AREA = "quotes";

/** "What we measured" (results pending). */
export const CASE_MEASURES = [
  "Leaders using AI daily",
  "Hours saved per leader, weekly",
  "Quote turnaround",
];

/** The homepage teaser's tool row. */
export const CASE_TOOLS = [
  { name: "A collections assistant", line: CASE_AREAS[0].outcome.line },
  { name: "A material list converter", line: CASE_AREAS[1].outcome.line },
  { name: "A business brain", line: CASE_AREAS[3].outcome.line },
  { name: "A roadmap for what's next", line: "Invoice matching, prioritized for after the program." },
];
