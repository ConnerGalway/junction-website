"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { PointerEvent } from "react";
import { cx } from "@/components";
import { CoursePlayer } from "./CoursePlayer";

export type Format = {
  id: string;
  name: string;
  /** Short duration, set in Bebas. */
  duration: string;
  description: string;
  /** Photo for the open state; omit for the course player. */
  image?: string;
};

/**
 * Formats: four panels in one row (520px tall, 12px gaps, radius 14). One
 * panel is open at a time (flex 3 vs 1); hover (pointer devices), click,
 * tap or Enter opens a panel; 450ms ease-out, instant with reduced motion.
 * Closed panels alternate Carbon and Forest with the duration at the top
 * and the name set vertically. Open panels show their photo (or the course
 * player on Forest) with the duration, the name and the description.
 * Below 768px: a vertical accordion.
 */
export function FormatsAccordion({ formats, videoSrc }: { formats: Format[]; videoSrc?: string }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  function onPointerEnter(event: PointerEvent, i: number) {
    if (event.pointerType === "mouse") setOpen(i);
  }

  return (
    <>
      {/* 768px+: a row of panels */}
      <div className="hidden h-[520px] gap-3 md:flex">
        {formats.map((f, i) => {
          const isOpen = i === open;
          const closedBg = i % 2 === 0 ? "bg-carbon" : "bg-forest";
          return (
            <div
              key={f.id}
              onPointerEnter={(event) => onPointerEnter(event, i)}
              className={cx(
                "relative min-w-0 overflow-hidden rounded-card transition-[flex-grow] duration-[450ms] ease-out",
                isOpen ? "grow-[3]" : "grow",
                "basis-0",
                closedBg
              )}
            >
              {/* Open state */}
              <div
                id={`${baseId}-${f.id}`}
                aria-hidden={!isOpen}
                className={cx(
                  "absolute inset-0 transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0",
                  !f.image && "bg-forest"
                )}
              >
                {f.image ? (
                  <Image src={f.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-x-12 top-12">
                    <CoursePlayer videoSrc={videoSrc} />
                  </div>
                )}
                {/* Dark bottom gradient for the text on photos (the player sits on plain Forest) */}
                {f.image && <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/35 to-transparent" />}
                <div className="absolute inset-x-0 bottom-0 w-[min(100%,560px)] p-8">
                  <p className="m-0 font-wordmark text-[24px] leading-none text-newsprint/70">{f.duration}</p>
                  <h3 className="m-0 mt-2 font-display text-[clamp(30px,3vw,40px)] leading-none font-black tracking-[-0.035em] text-newsprint">
                    {f.name}
                  </h3>
                  <p className="type-body m-0 mt-3 text-newsprint-muted">{f.description}</p>
                </div>
              </div>

              {/* Closed state */}
              <div
                aria-hidden="true"
                className={cx(
                  "absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-300",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
              >
                <p className="m-0 font-wordmark text-[22px] leading-none text-price-on-dark">{f.duration}</p>
                <p className="m-0 rotate-180 font-display text-[30px] leading-none font-black tracking-[-0.03em] whitespace-nowrap text-newsprint [writing-mode:vertical-rl]">
                  {f.name}
                </p>
              </div>

              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${f.id}`}
                onClick={() => setOpen(i)}
                className="absolute inset-0 z-10 cursor-pointer rounded-card border-0 bg-transparent p-0 focus-visible:outline-offset-[-4px]"
              >
                <span className="sr-only">{f.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Below 768px: a vertical accordion */}
      <div className="flex flex-col gap-3 md:hidden">
        {formats.map((f, i) => {
          const isOpen = i === open;
          return (
            <div key={f.id} className={cx("overflow-hidden rounded-card text-newsprint", i % 2 === 0 ? "bg-carbon" : "bg-forest")}>
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-m-${f.id}`}
                  onClick={() => setOpen(i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-4 text-left text-newsprint"
                >
                  <span className="font-display text-[22px] leading-tight font-black tracking-[-0.02em]">{f.name}</span>
                  <span className="shrink-0 font-wordmark text-[20px] leading-none text-price-on-dark">{f.duration}</span>
                </button>
              </h3>
              <div id={`${baseId}-m-${f.id}`} hidden={!isOpen}>
                <div className={cx("relative h-[220px]", !f.image && "flex items-center bg-forest px-5")}>
                  {f.image ? (
                    <Image src={f.image} alt="" fill sizes="100vw" className="object-cover" />
                  ) : (
                    <CoursePlayer videoSrc={videoSrc} />
                  )}
                </div>
                <p className="type-body m-0 px-5 py-4 text-newsprint-muted">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
