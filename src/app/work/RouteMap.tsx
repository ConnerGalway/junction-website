"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import { cx } from "@/components";
import type { LabelPlacement } from "@/lib/routeMap";
import type { RouteMapGeometry } from "./routeMapGeometry";
import { useRevealCase } from "./WorkFilter";

type Tip = { key: string; x: number; y: number; name: string; note?: string; href?: string };

/** Label offsets from the stop's centre, per placement. */
const labelPlace: Record<LabelPlacement, string> = {
  "above-left": "-translate-x-[calc(100%+6px)] -translate-y-[calc(100%+4px)] text-right items-end",
  "right-above": "translate-x-[14px] -translate-y-[calc(100%-2px)]",
  "below-right": "translate-x-[8px] translate-y-[8px]",
  right: "translate-x-[14px] -translate-y-1/2",
};

/** Map units within which a client dot counts as under a case stop. */
const UNDER_STOP = 16;

const isNarrow = () => window.matchMedia("(max-width: 767px)").matches;

/** Land fades (px): ramp past the intro text, and the share of the viewport faded at its edges. */
const FADE_LEFT_RAMP = 160;
const FADE_EDGE = 0.1;
/** Top fade ends this far into the map box; the bottom fade runs from 78% to 100% of it. */
const FADE_TOP_END = 0.15;
const FADE_BOTTOM_START = 0.78;

/**
 * Work hero map: Canada and the United States (paths built at build time),
 * flight-route arcs from the Vancouver hub to each case, the next stop and
 * other clients.
 *
 * Case stops are links to their chapters (smooth scroll; the dot fills pink
 * on hover and focus). Other clients and the next stop show their names in a
 * tooltip on hover or tap. Under 768px the case names are hidden (numbers
 * stay) and the first tap on a stop shows its name as a link to the chapter.
 * A jump first clears a service filter that would hide the chapter.
 */
export function RouteMap({ geo, className }: { geo: RouteMapGeometry; className?: string }) {
  // Clears a service filter that would hide the chapter we're jumping to.
  const reveal = useRevealCase();
  const [tip, setTip] = useState<Tip | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const landRef = useRef<HTMLDivElement>(null);
  // Shrinks dots and lines when the map is drawn wider than its grid column,
  // so they keep the pixel size they had there.
  const [u, setU] = useState(1);
  const { width: W, height: H, landPad: pad } = geo;
  const LW = W + pad.l + pad.r;
  const LH = H + pad.t + pad.b;
  // A client dot under a case stop's dot gets no tooltip target, so it never
  // blocks the stop (e.g. Hamilton next to London, ON).
  const underStop = (c: { x: number; y: number }) => geo.stops.some((s) => Math.hypot(s.x - c.x, s.y - c.y) < UNDER_STOP);
  const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

  // Land fades, measured from the layout: the land is transparent before it reaches
  // the intro text (or, when the map sits under the intro, its bottom and the
  // viewport's left edge), fades over the last 10% of the viewport on the right,
  // from the hero's top and toward the bottom of the map.
  useEffect(() => {
    const root = rootRef.current;
    const land = landRef.current;
    if (!root || !land) return;
    const section = root.closest("section");
    const avoid = section?.querySelector<HTMLElement>("[data-map-avoid]");

    function measure() {
      const box = root!.getBoundingClientRect();
      const layer = land!.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      // Dots and lines keep the pixel size they had when the map filled its grid column.
      const parent = root!.parentElement;
      const track = parent ? parseFloat(getComputedStyle(parent).gridTemplateColumns.split(" ").pop() ?? "") : NaN;
      setU(Number.isFinite(track) && box.width > 0 ? Math.min(1, track / box.width) : 1);

      let left0 = -layer.left;
      let left1 = left0 + vw * FADE_EDGE;
      let top0 = (section?.getBoundingClientRect().top ?? layer.top) - layer.top;
      if (avoid) {
        const a = avoid.getBoundingClientRect();
        if (a.bottom > box.top + 1) {
          // Beside the map: clear of the widest line of the copy.
          const right = Math.max(a.right, ...[...avoid.querySelectorAll("*")].map((el) => el.getBoundingClientRect().right));
          left0 = right + 16 - layer.left;
          left1 = left0 + FADE_LEFT_RAMP;
        } else {
          // Above the map (phones): clear of the intro's bottom.
          top0 = Math.max(top0, a.bottom + 8 - layer.top);
        }
      }
      const top1 = Math.max(top0 + 40, box.top + box.height * FADE_TOP_END - layer.top);
      const right1 = vw - layer.left;
      const vars: Record<string, number> = {
        "--fl0": left0,
        "--fl1": left1,
        "--fr0": right1 - vw * FADE_EDGE,
        "--fr1": right1,
        "--ft0": top0,
        "--ft1": top1,
        "--fb0": box.top + box.height * FADE_BOTTOM_START - layer.top,
        "--fb1": box.bottom - layer.top,
      };
      for (const [k, v] of Object.entries(vars)) land!.style.setProperty(k, `${Math.round(v)}px`);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    if (avoid) observer.observe(avoid);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [W]);

  // Close a tapped tooltip on any tap outside the map.
  useEffect(() => {
    if (!tip) return;
    const close = (e: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setTip(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [tip]);

  function jump(caseId: string) {
    reveal?.(caseId);
    setTip(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Let a revealed chapter render before scrolling to it.
    requestAnimationFrame(() => {
      document.getElementById(caseId)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${caseId}`);
    });
  }

  function onStopClick(event: MouseEvent, stop: RouteMapGeometry["stops"][number]) {
    event.preventDefault();
    // Narrow screens: the first tap names the stop; the tooltip links on.
    if (isNarrow() && tip?.key !== stop.caseId) {
      setTip({ key: stop.caseId, x: stop.x, y: stop.y, name: stop.name, href: `#${stop.caseId}` });
      return;
    }
    jump(stop.caseId);
  }

  // Hover tooltips for mouse; taps toggle them.
  const hoverTip = (t: Tip) => ({
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setTip(t),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setTip((cur) => (cur?.key === t.key ? null : cur)),
    onClick: () => setTip((cur) => (cur?.key === t.key ? null : t)),
  });

  const tipAlign = tip ? (tip.x / W < 0.22 ? "-translate-x-[24px]" : tip.x / W > 0.78 ? "-translate-x-[calc(100%-24px)]" : "-translate-x-1/2") : "";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Map: routes from Junction in Vancouver to each case study"
      className={cx("relative select-none", className)}
    >
      <p className="sr-only">
        Next stop: {geo.next.map((n) => n.name).join(", ")}. Other clients include{" "}
        {geo.clients.map((c) => c.name).join(", ")}.
      </p>

      {/* Land, other-client routes and dots: a layer larger than the map box (so
          no shape is cut off), with soft fades on every side (.work-map-land). */}
      <div
        ref={landRef}
        aria-hidden="true"
        className="work-map-land pointer-events-none absolute"
        style={{
          left: `${(-pad.l / W) * 100}%`,
          top: `${(-pad.t / H) * 100}%`,
          width: `${(LW / W) * 100}%`,
          height: `${(LH / H) * 100}%`,
          // Until measured: fade at the map box's own edges.
          ...({
            "--fl0": `${(pad.l / LW) * 100}%`,
            "--fl1": `${((pad.l + W * FADE_EDGE) / LW) * 100}%`,
            "--fr0": `${((pad.l + W * (1 - FADE_EDGE)) / LW) * 100}%`,
            "--fr1": `${((pad.l + W) / LW) * 100}%`,
            "--ft0": `${(pad.t / LH) * 100}%`,
            "--ft1": `${((pad.t + H * FADE_TOP_END) / LH) * 100}%`,
            "--fb0": `${((pad.t + H * FADE_BOTTOM_START) / LH) * 100}%`,
            "--fb1": `${((pad.t + H) / LH) * 100}%`,
          } as CSSProperties),
        }}
      >
        <svg viewBox={`${-pad.l} ${-pad.t} ${LW} ${LH}`} className="block size-full overflow-visible">
          <path d={geo.canada} className="fill-carbon/5" />
          <path d={geo.usa} className="fill-carbon/[0.035]" />
          <g className="fill-none stroke-canopy/14" strokeWidth={1.2 * u}>
            {geo.clients.map((c) => (
              <path key={c.name} d={c.arc} />
            ))}
          </g>
          <g className="fill-canopy/40">
            {geo.clients.map((c) => (
              <circle key={c.name} cx={c.x} cy={c.y} r={3 * u} />
            ))}
          </g>
        </svg>
      </div>

      {/* Routes and stops */}
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="pointer-events-none relative block h-auto w-full overflow-visible">
        {geo.next.map((n) => (
          <path key={n.name} d={n.arc} className="fill-none stroke-canopy" strokeWidth={1.4 * u} strokeDasharray={`${4 * u} ${4 * u}`} strokeLinecap="round" />
        ))}
        {geo.stops.map((s) => (
          <path key={s.caseId} d={s.arc} className="fill-none stroke-canopy" strokeWidth={2.4 * u} strokeLinecap="round" />
        ))}
        {geo.next.map((n) => (
          <circle key={n.name} cx={n.x} cy={n.y} r={7 * u} className="fill-newsprint stroke-canopy" strokeWidth={2 * u} strokeDasharray={`${3 * u} ${2.6 * u}`} />
        ))}
        {geo.stops.map((s) => (
          <circle
            key={s.caseId}
            cx={s.x}
            cy={s.y}
            r={7 * u}
            strokeWidth={3 * u}
            className={cx("stroke-canopy transition-colors duration-150", hot === s.caseId ? "fill-break" : "fill-newsprint")}
          />
        ))}
        {/* The hub: decorative, not a link */}
        <circle cx={geo.hub.x} cy={geo.hub.y} r={14 * u} className="fill-none stroke-break/50" strokeWidth={2 * u} />
        <circle cx={geo.hub.x} cy={geo.hub.y} r={7 * u} className="fill-break" />
      </svg>

      {/* Hub label, to the left of the hub */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute flex -translate-x-[calc(100%+20px)] -translate-y-1/2 flex-col items-end"
        style={pos(geo.hub.x, geo.hub.y)}
      >
        <span className="font-wordmark text-[20px] leading-none tracking-[0.04em] text-carbon">JUNCTION</span>
        <span className="mt-0.5 text-[10px] font-medium tracking-[0.14em] text-flint uppercase">Vancouver</span>
      </div>

      {/* Tooltip targets: other clients and the next stop. Small, and above the
          case links, so a nearby case stop's hit area doesn't cover them. */}
      {[...geo.clients.filter((c) => !underStop(c)).map((c) => ({ ...c, note: undefined })), ...geo.next.map((n) => ({ ...n, note: "Next stop" }))].map((c) => (
        <span
          key={c.name}
          aria-hidden="true"
          data-tip-target
          className={cx("absolute z-20 -translate-1/2 cursor-default rounded-full", c.note ? "size-[14px]" : "size-3")}
          style={pos(c.x, c.y)}
          {...hoverTip({ key: c.name, x: c.x, y: c.y, name: c.name, note: c.note })}
        />
      ))}

      {/* Case stops: links to their chapters */}
      {geo.stops.map((s) => (
        <a
          key={s.caseId}
          href={`#${s.caseId}`}
          aria-label={`${s.name}: ${s.number}. Go to the case study`}
          onClick={(e) => onStopClick(e, s)}
          onPointerEnter={() => setHot(s.caseId)}
          onPointerLeave={() => setHot(null)}
          onFocus={() => setHot(s.caseId)}
          onBlur={() => setHot(null)}
          className="absolute z-10 size-8 -translate-1/2 rounded-full"
          style={pos(s.x, s.y)}
        >
          <span
            aria-hidden="true"
            className={cx("absolute top-1/2 left-1/2 flex flex-col", labelPlace[s.placement])}
          >
            <span className="font-wordmark text-[24px] leading-[0.95] whitespace-nowrap text-accent-1-on-light">{s.number}</span>
            <span className="text-[11.5px] leading-tight font-medium whitespace-nowrap text-carbon max-md:hidden">{s.name}</span>
          </span>
        </a>
      ))}

      {/* Tooltip */}
      {tip && (
        <div
          role={tip.href ? undefined : "tooltip"}
          className={cx(
            "absolute z-30 -translate-y-[calc(100%+14px)] rounded-control bg-newsprint px-3 py-2 text-[13px] leading-snug whitespace-nowrap text-carbon shadow-card",
            tip.href ? "pointer-events-auto" : "pointer-events-none",
            tipAlign
          )}
          style={pos(tip.x, tip.y)}
        >
          {tip.href ? (
            <a
              href={tip.href}
              onClick={(e) => {
                e.preventDefault();
                jump(tip.key);
              }}
              className="link font-medium"
            >
              {tip.name} →
            </a>
          ) : (
            <>
              <span className="font-medium">{tip.name}</span>
              {tip.note && <span className="block text-[12px] text-flint">{tip.note}</span>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
