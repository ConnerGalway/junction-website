/**
 * Work page RouteMap data: Junction's hub, the case stops (each links to its
 * chapter), the next stop and other clients. Coordinates are [longitude,
 * latitude]. Destination BC and the Vancouver clients sit at the hub.
 */

import { WORK_CASES } from "./workCases";

export type LonLat = [number, number];

/** Where a case stop's label sits relative to its dot. */
export type LabelPlacement = "above-left" | "right-above" | "below-right" | "right";

export const HUB: { name: string; coords: LonLat } = {
  name: "Vancouver",
  coords: [-123.12, 49.28],
};

const statOf = (id: string) => WORK_CASES.find((c) => c.id === id)?.stat?.value;

export const CASE_STOPS: {
  caseId: string;
  name: string;
  coords: LonLat;
  number: string;
  placement: LabelPlacement;
}[] = [
  { caseId: "case-yukon", name: "Travel Yukon", coords: [-135.06, 60.72], number: statOf("case-yukon")!, placement: "above-left" },
  // Central BC: deliberately north of Vancouver so it doesn't crowd the hub.
  { caseId: "case-itbc", name: "Indigenous Tourism BC", coords: [-122.14, 52.13], number: statOf("case-itbc")!, placement: "right-above" },
  // TODO: Kootenay Rockies has no stat yet; the map number is a placeholder.
  { caseId: "case-kootenay", name: "Kootenay Rockies", coords: [-115.77, 49.51], number: "[ # ]", placement: "below-right" },
  { caseId: "case-osw", name: "Ontario's Southwest", coords: [-81.25, 42.98], number: statOf("case-osw")!, placement: "right" },
];

/** Upcoming cases: dashed ring and arc, name in a tooltip, no chapter yet. */
export const NEXT_STOPS: { name: string; coords: LonLat }[] = [
  { name: "Town of Okotoks", coords: [-113.98, 50.73] },
];

/** Other clients: faint dots with their names in a tooltip. */
export const CLIENTS: { name: string; coords: LonLat }[] = [
  { name: "Victoria (4VI)", coords: [-123.37, 48.43] },
  { name: "Northern BC Tourism – Prince George", coords: [-122.75, 53.92] },
  { name: "Prince Rupert", coords: [-130.32, 54.31] },
  { name: "Thompson Okanagan – Kelowna", coords: [-119.5, 49.89] },
  { name: "Revelstoke", coords: [-118.2, 51.0] },
  { name: "Tourism Golden", coords: [-116.97, 51.3] },
  { name: "Tourism Fernie", coords: [-115.06, 49.5] },
  { name: "Travel Alberta – Calgary", coords: [-114.07, 51.05] },
  { name: "South Canadian Rockies – Canmore", coords: [-115.36, 51.09] },
  { name: "Tourism Red Deer", coords: [-113.81, 52.27] },
  { name: "Grande Prairie", coords: [-118.8, 55.17] },
  { name: "Hamilton Halton Brant", coords: [-79.87, 43.26] },
  { name: "Indigenous Tourism Association of Canada – Ottawa", coords: [-75.7, 45.42] },
  { name: "Travel Maine – Augusta", coords: [-69.78, 44.31] },
  { name: "Visit Mississippi – Jackson", coords: [-90.18, 32.3] },
  { name: "Oregon Destination Association – Salem", coords: [-123.03, 44.94] },
];

/** Points the projection is fitted to, so the framing matches the design. */
export const FRAME: LonLat[] = [
  [-141, 69],
  [-141, 40],
  [-55, 47],
  [-66, 44],
  [-123, 31],
  [-80, 30],
  [-95, 72],
];
