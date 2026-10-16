export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };

// Program lists live in src/lib/programs.ts.

/** Top-level nav items after the Programs menu. */
export const primaryNav: Array<NavLink & { dot?: boolean }> = [
  { label: "Speaking", href: "/speaking" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "The Brief", href: "/the-brief", dot: true },
];
