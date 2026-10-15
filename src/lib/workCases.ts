/**
 * Work page case chapters (src/app/work/). One entry per chapter, in page
 * order. The RouteMap's case stops link to these ids; the service filter
 * reads `service`.
 *
 * Deliverables: each chapter shows three sample pages (a cover and two
 * spreads), drawn in code until real images are added. To swap them, set
 * `deliverables.images` to three paths under /public (cover, spread 1,
 * spread 2); they fill the same slots.
 */

import { CASE_AREAS, CASE_META, CASE_SUMMARY, CASE_TITLE } from "./buildingSupplyCase";

export const SERVICES = ["Training", "Accelerator", "Research", "Strategy"] as const;
export type Service = (typeof SERVICES)[number];

export type WorkCase = {
  /** Chapter anchor (#case-…). */
  id: string;
  service: Service;
  /** Meta line, e.g. "Travel Yukon · Training · 4 years". */
  meta: string;
  /** The big number and its label. Without one, the quote leads the chapter. */
  stat?: { value: string; label: string };
  title: string;
  description: string;
  quote?: { text: string; caption: string };
  link?: { label: string; href: string };
  deliverables: {
    /** The figure set in Bebas on the first sample spread. */
    figure: string;
    /** Real page images (cover, spread, spread). Optional. */
    images?: [string, string, string];
  };
};

const collections = CASE_AREAS.find((a) => a.id === "collections")!;

export const WORK_CASES: WorkCase[] = [
  {
    id: "case-yukon",
    service: "Training",
    meta: "Travel Yukon · Training · 4 years",
    stat: { value: "300+", label: "Businesses through the Go Digital program" },
    title: "Go Digital program",
    description:
      "A territory-wide digital capacity program, from Whitehorse to Dawson City. 300+ businesses came through in four years, and alumni now lead the program themselves.",
    quote: {
      text: '"Incredibly valuable insights and education for our tourism sector."',
      caption: "Avery Bramadat, Travel Yukon",
    },
    link: { label: "About Custom Training →", href: "/custom-training" },
    deliverables: { figure: "300+" },
  },
  {
    id: "case-itbc",
    service: "Accelerator",
    meta: "Indigenous Tourism BC · Accelerator · 3 months",
    stat: { value: "+300%", label: "Past engagement goal" },
    title: "Accelerator across ITBC members",
    description:
      "Assessments, one-to-one coaching and implementation plans, subsidised by ITBC for its member businesses. Engagement landed 300% past goal, with bookings up across the province inside three months.",
    link: { label: "About the Accelerator →", href: "/accelerator" },
    deliverables: { figure: "+300%" },
  },
  {
    id: "case-supplier",
    service: "Accelerator",
    meta: CASE_META,
    stat: { value: collections.number, label: `${collections.numberLabel}, before` },
    title: CASE_TITLE,
    description: CASE_SUMMARY,
    link: { label: "See the full story →", href: "/ai-accelerator#case-study" },
    deliverables: { figure: collections.number },
  },
  {
    id: "case-osw",
    service: "Research",
    meta: "Ontario's Southwest · Research · 2025–26",
    stat: { value: "2026", label: "Tourism strategy driven by our findings" },
    title: "Traveller Insights Study",
    description:
      "Region-wide research into who visits Southwest Ontario, why they come, and what brings them back. The findings now drive the region's 2026 tourism strategy.",
    quote: {
      text: '"Invaluable support to our region, our DMOs and our operators."',
      caption: "Joanne Wolnik, Ontario's Southwest",
    },
    deliverables: { figure: "2026" },
  },
  {
    id: "case-kootenay",
    service: "Strategy",
    meta: "Kootenay Rockies · Strategy",
    title: "A region running its own playbook",
    description:
      "Destination marketing strategy. Marketing operations restructured around the activities with the most impact, with new investment redirected into responsible travel.",
    quote: {
      text: '"We are a stronger, smarter tourism organization today thanks to the work we did with Junction."',
      caption: "Kathy Cooper, CEO, Kootenay Rockies Tourism",
    },
    deliverables: { figure: "[ # ]" },
  },
];
