"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Large faded JUNCTION_ behind the homepage hero. Self-contained: it's
 * absolutely positioned against the page, sits on the lowest layer and takes
 * no space, so removing it changes nothing else. Switched by
 * SHOW_HERO_WORDMARK in src/lib/flags.ts.
 *
 * All sizes are in em of the wordmark's own font size, measured for Bebas
 * Neue with letter-spacing .04em and line-height 1.
 */
const BAR_W = 0.42; // underscore width
const BAR_H = 0.11; // underscore height
const BAR_GAP = 0.04; // gap before the underscore (the tracking after the last letter)
/** Advance width of "JUNCTION" (with .04em tracking, trailing tracking removed). */
const WORD_EM = 3.14;
/** Advance width of "J" alone. */
const J_EM = 0.265;
/** Distance from the top of the line box to the baseline (line-height 1). */
const BASELINE_EM = 0.8;

/** Share of the scroll the wordmark lags behind (it moves at 85% speed). */
const DRIFT = 0.15;

const vars = {
  "--hw-full": WORD_EM + BAR_GAP + BAR_W,
  "--hw-j": J_EM + BAR_GAP + BAR_W,
  // Baseline (= underscore bottom) at 100svh + 2/3 of the underscore height.
  "--hw-top": `${(2 / 3) * BAR_H - BASELINE_EM}em`,
} as CSSProperties;

export function HeroWordmark() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Stop drifting once the wordmark has scrolled out of view.
  const limit = useRef(Infinity);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => Math.min(v, limit.current) * DRIFT);

  useEffect(() => {
    function measure() {
      const el = ref.current;
      if (!el) return;
      // Untransformed bottom edge, in page coordinates.
      const bottom = el.getBoundingClientRect().bottom + window.scrollY - y.get();
      // At 85% speed it leaves the top of the viewport after bottom / (1 - DRIFT).
      limit.current = Math.ceil(bottom / (1 - DRIFT)) + 1;
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [y]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 px-gutter select-none"
      style={vars}
    >
      <div className="relative mx-auto max-w-wide [container-type:inline-size]">
        <motion.div
          ref={ref}
          style={reduceMotion ? undefined : { y }}
          className="absolute right-0 top-[calc(100svh+var(--hw-top))] font-wordmark text-[calc(45vw/var(--hw-j))] leading-none tracking-[0.04em] whitespace-nowrap text-carbon/10 md:text-[calc(100cqw/var(--hw-full))]"
        >
          J<span className="max-md:hidden">UNCTION</span>
          {/* The tracking after the last letter is the 0.04em gap. An empty
              inline-block's bottom sits on the baseline, like the logo's. */}
          <span className="inline-block h-[0.11em] w-[0.42em] bg-canopy" />
        </motion.div>
      </div>
    </div>
  );
}
