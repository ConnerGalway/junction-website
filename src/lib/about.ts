/**
 * About page content (src/app/about/).
 *
 * Team portraits are swappable: upload a file with the same name to
 * public/images/team/ (any size; it fills a 220 × 280 card, cropped from
 * the top). For now all three are copies of Conner's portrait.
 */

/** The statement under the hero. PLACEHOLDER until the team writes the line. */
export const STATEMENT = {
  quote: "[ One line we stand by ]",
  attribution: "[ Attribution or context ]",
};

export const BELIEFS = [
  {
    num: "01",
    title: "The best engagement is one you never have to repeat.",
    line: "Every plan is built for handover, every program to be owned by the people who run it.",
  },
  {
    num: "02",
    title: "Independence keeps advice honest.",
    line: "We only do strategy and training. Nothing we recommend earns us a commission.",
  },
  {
    num: "03",
    title: "Plain language, always.",
    line: "If a busy operator can't follow it between two check-ins, it needs more work.",
  },
];

export type TeamMember = { name: string; role: string; portrait: string };

export const TEAM: TeamMember[] = [
  { name: "Conner Galway", role: "Founder & Principal", portrait: "/images/team/conner.jpg" },
  { name: "Brooke Traynor", role: "Partner Success Manager", portrait: "/images/team/brooke.jpg" },
  { name: "Andrea Hernández", role: "Creative Lead", portrait: "/images/team/andrea.jpg" },
];
