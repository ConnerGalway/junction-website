export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };

/** Flagship program, shown as the feature card in the Programs menu. */
export const flagshipProgram = {
  eyebrow: "Flagship · 90 days",
  title: "The Accelerator",
  description: "A 90-day marketing plan you'll actually work.",
  href: "/accelerator",
};

/** Program groups shared by the Programs dropdown, mobile menu and footer. */
export const programGroups: NavGroup[] = [
  {
    title: "AI and speaking",
    links: [
      { label: "Offload Program (AI Accelerator)", href: "/ai-accelerator" },
      { label: "Speaking", href: "/speaking" },
    ],
  },
  {
    title: "Strategy",
    links: [
      { label: "Marketing strategy", href: "/programs#marketing-strategy" },
      { label: "Destination partnerships", href: "/programs#destination-partnerships" },
    ],
  },
  {
    title: "Training",
    links: [
      { label: "Custom Training", href: "/custom-training" },
      { label: "JunctionU", href: "/junctionu" },
    ],
  },
];

/** Top-level nav items after the Programs menu. */
export const primaryNav: Array<NavLink & { dot?: boolean }> = [
  { label: "Speaking", href: "/speaking" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "The Brief", href: "/the-brief", dot: true },
];
