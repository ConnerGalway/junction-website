"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components";

const DESIGN_W = 600;
const DESIGN_H = 340;
const MODULES = 6;

/**
 * Decorative course player for the "Custom course" format (aria-hidden):
 * a Newsprint frame with a 220px sidebar (Forest header: "Course", the
 * title, a thin Fern progress bar; then Modules 1–6, module 2 highlighted)
 * and a video area with a slim control bar. Drawn at 600×340 and scaled to
 * its container's width.
 *
 * If `videoSrc` is set (formats-custom-course.mp4 exists), it plays muted,
 * looped and inline with the jpg as its poster; with reduced motion it
 * shows the still image only.
 */
export function CoursePlayer({ videoSrc, className }: { videoSrc?: string; className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / DESIGN_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const onMotion = () => setMotionOk(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  const still = "/images/custom-training/formats-custom-course.jpg";

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={cx("pointer-events-none relative w-full select-none", className)}
      style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
    >
      <div
        className={cx(
          "absolute top-0 left-0 grid origin-top-left grid-cols-[220px_minmax(0,1fr)] overflow-hidden rounded-card bg-newsprint shadow-card-hover",
          !scale && "opacity-0"
        )}
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale ?? 1})` }}
      >
        {/* Sidebar */}
        <div className="flex flex-col border-r border-hairline">
          <div className="bg-forest px-4 py-3.5">
            <p className="m-0 text-[10px] font-medium tracking-[0.12em] text-fern uppercase">Course</p>
            <p className="m-0 mt-1 font-display text-[18px] leading-tight font-black tracking-[-0.02em] text-newsprint">
              Export readiness
            </p>
            <span className="mt-2.5 block h-1 overflow-hidden rounded-full bg-newsprint/15">
              <span className="block h-full w-[34%] rounded-full bg-fern" />
            </span>
          </div>
          <ol className="m-0 flex list-none flex-col gap-0.5 p-2">
            {Array.from({ length: MODULES }, (_, i) => (
              <li
                key={i}
                className={cx(
                  "flex items-center gap-2.5 rounded-control px-2.5 py-1.5 text-[13px] text-carbon",
                  i === 1 && "bg-sage-25 font-medium"
                )}
              >
                <span className="w-5 font-wordmark text-[18px] leading-none text-accent-1-on-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                Module {i + 1}
              </li>
            ))}
          </ol>
        </div>

        {/* Video */}
        <div className="relative bg-carbon">
          {videoSrc && motionOk ? (
            <video src={videoSrc} poster={still} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
          ) : (
            <Image src={still} alt="" fill sizes="380px" className="object-cover" />
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-carbon/80 px-3 py-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-newsprint">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 1.5v7l5.5-3.5z" fill="currentColor" className="text-carbon" />
              </svg>
            </span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-newsprint/20">
              <span className="block h-full w-[41%] rounded-full bg-fern" />
            </span>
            <span className="font-wordmark text-[15px] leading-none text-newsprint">2:42 / 6:34</span>
          </div>
        </div>
      </div>
    </div>
  );
}
