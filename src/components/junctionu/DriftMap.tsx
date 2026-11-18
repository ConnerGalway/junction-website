"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/** Share of the scroll the map lags behind (it moves at 85% speed), like the homepage HeroWordmark. */
const DRIFT = 0.15;
/** The drift stays within this distance (px) of the anchored position. */
const MAX_SHIFT = 160;

/**
 * The North America land layer from the Work RouteMap (no dots, no arcs),
 * behind the JunctionU DMO panel: Canada Fern 38%, the US Fern 16%. Larger
 * than its section and allowed to spill above and below it; a radial mask
 * (closest-side, solid to 55%) fades it to nothing before any edge. It drifts
 * slightly slower than the page, anchored where the section is centred in
 * the viewport; static with reduced motion. Decorative.
 */
export function DriftMap({ viewBox, canada, usa }: { viewBox: string; canada: string; usa: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const anchor = useRef(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, (v - anchor.current) * DRIFT)));

  useEffect(() => {
    function measure() {
      const section = ref.current?.parentElement;
      if (!section) return;
      const r = section.getBoundingClientRect();
      // The scroll position at which the section's centre meets the viewport's.
      anchor.current = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[max(760px,190vw)] -translate-1/2 select-none md:w-[max(900px,110vw)] lg:w-[max(1000px,74vw)]"
    >
      <motion.svg
        viewBox={viewBox}
        style={reduce ? undefined : { y }}
        className="block h-auto w-full [mask-image:radial-gradient(closest-side,black_55%,transparent)]"
      >
        <path d={canada} className="fill-fern/38" />
        <path d={usa} className="fill-fern/16" />
      </motion.svg>
    </div>
  );
}
