import { geoConicConformal, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countries from "world-atlas/countries-110m.json";
import { CASE_STOPS, CLIENTS, FRAME, HUB, NEXT_STOPS, type LabelPlacement, type LonLat } from "@/lib/routeMap";

/** The map's drawing size (SVG viewBox). Everything scales with its width. */
export const MAP_W = 700;
export const MAP_H = 480;
/** How far an arc bows upward, as a share of its length. */
const LIFT = 0.22;

type Pt = { x: number; y: number };

export type RouteMapGeometry = {
  width: number;
  height: number;
  canada: string;
  usa: string;
  hub: Pt;
  stops: (Pt & { caseId: string; name: string; number: string; placement: LabelPlacement; arc: string })[];
  next: (Pt & { name: string; arc: string })[];
  clients: (Pt & { name: string; arc: string })[];
};

const round = (n: number) => Math.round(n * 10) / 10;

/** A quadratic arc from a to b, bowing upward by LIFT × its length. */
function arc(a: Pt, b: Pt) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // The perpendicular that points up the screen (negative y).
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0 || (ny === 0 && nx < 0)) {
    nx = -nx;
    ny = -ny;
  }
  const cx = (a.x + b.x) / 2 + nx * len * LIFT;
  const cy = (a.y + b.y) / 2 + ny * len * LIFT;
  return `M${round(a.x)} ${round(a.y)}Q${round(cx)} ${round(cy)} ${round(b.x)} ${round(b.y)}`;
}

/**
 * Builds the RouteMap's SVG paths and points at build time (server only):
 * Canada and the United States from Natural Earth (world-atlas 110m) in a
 * conic conformal projection fitted to FRAME.
 */
export function buildRouteMap(): RouteMapGeometry {
  const topo = countries as unknown as Topology<{ countries: GeometryCollection }>;
  const all = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;
  const byId = (id: string) => all.features.find((f) => String(f.id) === id) as Feature<Geometry>;

  const projection = geoConicConformal()
    .parallels([42, 68])
    .rotate([102, 0])
    .center([0, 52])
    .fitExtent(
      [
        [10, 10],
        [MAP_W - 10, MAP_H - 10],
      ],
      { type: "MultiPoint", coordinates: FRAME }
    );
  const path = geoPath(projection).digits(1);
  const at = (c: LonLat): Pt => {
    const [x, y] = projection(c)!;
    return { x: round(x), y: round(y) };
  };

  const hub = at(HUB.coords);
  return {
    width: MAP_W,
    height: MAP_H,
    canada: path(byId("124")) ?? "",
    usa: path(byId("840")) ?? "",
    hub,
    stops: CASE_STOPS.map((s) => {
      const p = at(s.coords);
      return { ...p, caseId: s.caseId, name: s.name, number: s.number, placement: s.placement, arc: arc(hub, p) };
    }),
    next: NEXT_STOPS.map((s) => {
      const p = at(s.coords);
      return { ...p, name: s.name, arc: arc(hub, p) };
    }),
    clients: CLIENTS.map((s) => {
      const p = at(s.coords);
      return { ...p, name: s.name, arc: arc(hub, p) };
    }),
  };
}
