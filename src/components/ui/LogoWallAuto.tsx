"use client";

import { useEffect, useRef, useState } from "react";
import type { Logo } from "@/lib/logos";
import { cx } from "./cx";
import { LogoItem, LogoList } from "./logoParts";

/**
 * LogoWall variant="auto": one static row while the logos fit the width;
 * the slow marquee only when they overflow. A hidden copy of the row is
 * measured (never the visible one), so the switch can't oscillate.
 */
export function LogoWallAuto({
  logos,
  label,
  className,
  marqueeClassName,
}: {
  logos: Logo[];
  label: string;
  className?: string;
  marqueeClassName?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return;
    const update = () => setOverflow(measure.scrollWidth > box.clientWidth + 1);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(box);
    observer.observe(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={cx("relative", className, overflow && marqueeClassName)}>
      {/* Natural single-row width, measured off-screen. The clipping box
          keeps the wide copy from widening the page. */}
      <div aria-hidden="true" className="pointer-events-none invisible absolute inset-0 overflow-hidden">
        <div ref={measureRef} className="logo-wall logo-wall-auto-measure h-0 w-max overflow-hidden">
          <LogoList logos={logos} />
        </div>
      </div>

      {overflow ? (
        <div role="region" aria-label={label} tabIndex={0} className="logo-wall logo-wall-marquee">
          <div className="logo-marquee-track">
            <LogoList logos={logos} />
            <LogoList logos={logos} hidden />
          </div>
        </div>
      ) : (
        <div className="logo-wall logo-wall-single">
          <ul className="logo-wall-list" aria-label={label}>
            {logos.map((logo) => (
              <li key={logo.name} className="logo-wall-item">
                <LogoItem logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
