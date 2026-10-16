/**
 * Every Junction program, once. The Programs dropdown, the mobile menu, the
 * footer and the /programs page all read from here, so they can't disagree.
 * Destination partnerships isn't a program entry: it lives in Custom Training.
 */

export type DropdownGroup = "accelerators" | "training" | "learn";
export type PageGroup = "businesses" | "destinations" | "learn";

export type Program = {
  id: string;
  /** The program page's name. */
  name: string;
  href: string;
  /** One-line promise: the program page's own headline. */
  promise: string;
  dropdownGroup: DropdownGroup;
  pageGroup: PageGroup;
  /**
   * Dropdown-only name for the Accelerators group (temporary): the short name
   * leads, with the page name after it in Flint as a bridge. Once the team
   * settles the copy, these names change site-wide and the bridge goes.
   */
  dropdownName?: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "accelerator",
    name: "The Accelerator",
    href: "/accelerator",
    promise: "A 90-day marketing plan you'll actually work.",
    dropdownGroup: "accelerators",
    pageGroup: "businesses",
    dropdownName: "Marketing",
  },
  {
    id: "offload",
    name: "Offload Program",
    href: "/ai-accelerator",
    promise: "We automate one of your bottlenecks in 30 days.",
    dropdownGroup: "accelerators",
    pageGroup: "businesses",
    dropdownName: "AI",
  },
  {
    id: "custom-training",
    name: "Custom Training",
    href: "/custom-training",
    promise: "Training built around your people.",
    dropdownGroup: "training",
    pageGroup: "destinations",
  },
  {
    id: "marketing-strategy",
    name: "Marketing strategy",
    href: "/marketing-strategy",
    promise: "Marketing strategy your team can run.",
    dropdownGroup: "training",
    pageGroup: "destinations",
  },
  {
    id: "speaking",
    name: "Speaking",
    href: "/speaking",
    promise: "Talks that send the room home with a plan.",
    dropdownGroup: "training",
    pageGroup: "destinations",
  },
  {
    id: "junctionu",
    name: "JunctionU",
    href: "/junctionu",
    promise: "Training that fits between two guest check-ins.",
    dropdownGroup: "learn",
    pageGroup: "learn",
  },
  {
    id: "industry-scan",
    name: "Industry Scan",
    href: "/junctionu/industry-scan",
    promise: "Every industry report, read for you.",
    dropdownGroup: "learn",
    pageGroup: "learn",
  },
];

/** Dropdown, mobile menu and footer groups, in order. */
export const DROPDOWN_GROUPS: { id: DropdownGroup; label: string }[] = [
  { id: "accelerators", label: "Accelerators" },
  { id: "training", label: "Training and strategy" },
  { id: "learn", label: "Learn" },
];

/** /programs page groups, in order, each with its one line. */
export const PAGE_GROUPS: { id: PageGroup; label: string; line: string }[] = [
  {
    id: "businesses",
    label: "For businesses",
    line: "For owners and teams who want results they can run themselves.",
  },
  {
    id: "destinations",
    label: "For destinations and organizations",
    line: "For DMOs, associations and anyone training a group.",
  },
  { id: "learn", label: "Learn on your own", line: "Self-paced, any time, at your own speed." },
];

export const programsIn = (group: DropdownGroup) => PROGRAMS.filter((p) => p.dropdownGroup === group);
export const programsOnPage = (group: PageGroup) => PROGRAMS.filter((p) => p.pageGroup === group);
