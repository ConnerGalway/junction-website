"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, ReactNode } from "react";
import { Eyebrow, LeadCapture, Stat, cx } from "@/components";
import { FORM_NAMES } from "@/lib/forms";
import { shown } from "@/lib/placeholders";
import { DEFAULTS, HOURS, JOBS, PEOPLE, RATE, WEEKS_PER_YEAR, yearlyHours, type Range } from "@/lib/timeBack";

/*
 * Time-back calculator ("See how many hours a week you could get back.").
 *
 * The result is worked out and shown in the browser. The result card ends
 * with an email capture (LeadCapture) that submits every input and figure
 * to the Netlify form "lead-time-back"; we reply by hand. Jobs and copy live
 * in src/lib/timeBack.ts.
 */

type Field = "hours" | "job" | "people" | "rate";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const whole = new Intl.NumberFormat("en-US");

/** Counts to a new value in 300ms (instant with reduced motion). */
function useCountTo(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const t0 = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - t0) / 300);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(start + (target - start) * eased);
      from.current = v;
      setValue(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export function TimeBackCalculator() {
  const [hours, setHours] = useState(DEFAULTS.hours);
  const [people, setPeople] = useState(DEFAULTS.people);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [job, setJob] = useState(DEFAULTS.job);
  const [open, setOpen] = useState<Field | null>(null);

  const totalHours = yearlyHours(hours, people);
  const totalCost = totalHours * rate;
  const shownHours = useCountTo(totalHours);
  const shownCost = useCountTo(totalCost);
  const current = JOBS[job];

  /** Everything the lead form sends: each input and every figure shown. */
  const leadData = () => ({
    job: current.label,
    hours_per_week_per_person: String(hours),
    people: String(people),
    hourly_cost: "$" + rate,
    hours_per_week_total: String(hours * people),
    hours_per_year: whole.format(totalHours),
    cost_per_year: money.format(totalCost),
    what_we_would_build: current.build,
  });

  const valueProps = (field: Field) => ({
    field,
    open: open === field,
    onOpen: () => setOpen(field),
    onClose: () => setOpen((f) => (f === field ? null : f)),
  });

  return (
    <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div>
        <h2 className="type-h2 m-0">See how many hours a week you could get back.</h2>
        {/* A div, not a <p>: the popovers inside are block content. */}
        <div className="mt-8 font-display text-[clamp(26px,3.1vw,44px)] leading-[1.4] font-semibold tracking-[-0.025em] text-carbon">
          My team spends{" "}
          <Value {...valueProps("hours")} label={`${hours} hours`} title="Hours a week, per person">
            <Slider range={HOURS} value={hours} onChange={setHours} label="Hours a week, per person" format={(v) => `${v} h`} />
          </Value>{" "}
          a week on{" "}
          <Value {...valueProps("job")} label={`${current.label.toLowerCase()} ▾`} title="The job">
            {
              <ul className="m-0 flex list-none flex-col p-0" role="listbox" aria-label="The job">
                {JOBS.map((j, i) => (
                  <li key={j.label} role="option" aria-selected={i === job}>
                    <button
                      type="button"
                      data-autofocus={i === job || undefined}
                      onClick={() => {
                        setJob(i);
                        setOpen(null);
                      }}
                      className={cx(
                        "w-full cursor-pointer rounded-control border-0 px-3 py-2 text-left text-[16px]",
                        i === job ? "bg-sage font-medium text-forest" : "bg-transparent text-carbon hover:bg-newsprint-hover"
                      )}
                    >
                      {j.label}
                    </button>
                  </li>
                ))}
              </ul>
            }
          </Value>
          . That&apos;s{" "}
          <Value {...valueProps("people")} label={`${people} ${people === 1 ? "person" : "people"}`} title="People doing it">
            <Slider range={PEOPLE} value={people} onChange={setPeople} label="People doing it" format={(v) => `${v}`} />
          </Value>{" "}
          at about{" "}
          <Value {...valueProps("rate")} label={`$${rate}`} title="Hourly cost, including overhead">
            <Slider range={RATE} value={rate} onChange={setRate} label="Hourly cost, including overhead" format={(v) => `$${v}`} />
          </Value>{" "}
          an hour.
        </div>
      </div>

      {/* Result */}
      <div className="tone-carbon card-pad rounded-card">
        <Eyebrow className="m-0">{current.label} cost your team, every year</Eyebrow>
        {/* Stat fits the numbers to the card (up to 104,000 h and $31,200,000). */}
        <Stat value={`${whole.format(shownHours)} h`} maxSize="clamp(72px, 7.5vw, 104px)" className="mt-4" />
        <Stat value={money.format(shownCost)} maxSize="52px" valueClassName="text-newsprint" className="mt-2" />
        <p className="type-small m-0 mt-3">
          {hours} h × {people} {people === 1 ? "person" : "people"} × {WEEKS_PER_YEAR} weeks × ${rate} an hour
        </p>
        <p className="sr-only" aria-live="polite">
          {`${current.label}: ${whole.format(totalHours)} hours, ${money.format(totalCost)} a year.`}
        </p>

        <div className="mt-6 rounded-control bg-newsprint/6 px-5 py-4">
          <p className="type-small m-0">What we&apos;d build</p>
          <p className="m-0 mt-1 font-display text-[22px] leading-tight font-black tracking-[-0.02em] text-newsprint">
            {current.build}
          </p>
          {/* Draft lines are "[ … ]" placeholders: shown only with SHOW_PLACEHOLDERS. */}
          {shown(current.line) && <p className="type-small m-0 mt-1">{current.line}</p>}
        </div>

        <LeadCapture
          formName={FORM_NAMES.timeBack}
          leadMagnet="Time-back calculator"
          prompt="Want to see what we'd build for you? Leave your email and we'll get back to you personally."
          data={leadData}
          className="mt-7 border-t border-hairline-dark pt-6"
        />
      </div>
    </div>
  );
}

/** Under 640px the value popovers open as a bottom sheet. */
const SHEET_QUERY = "(max-width: 639.98px)";
/** Popover width and the gap it keeps from the viewport edges. */
const POP_WIDTH = 280;
const EDGE = 16;

function useIsSheet() {
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(SHEET_QUERY);
    const update = () => setSheet(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return sheet;
}

/**
 * An editable value in the sentence: copper (an approved one-off for this
 * calculator), pink while its popover is open. The popover closes on
 * Escape or an outside click, and focus returns to the value.
 *
 * Placement: from 640px a 280px popover under its word, shifted so it always
 * stays 16px inside the viewport, and flipped above the word when there's
 * no room below. Under 640px a bottom sheet instead (full width, Newsprint,
 * rounded top, a dimmed backdrop; closes on select, a tap outside or
 * Escape), rendered in a portal so nothing on the page can clip it.
 */
function Value({
  field,
  label,
  title,
  open,
  onOpen,
  onClose,
  children,
}: {
  field: Field;
  label: string;
  title: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{ left: number; up: boolean }>({ left: 0, up: false });
  const sheet = useIsSheet();
  const popId = useId();

  // Focus returns to the value whenever its popover closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Keep the popover inside the viewport: shift it sideways, flip it above if needed.
  useLayoutEffect(() => {
    if (!open || sheet) return;
    function measure() {
      const btn = buttonRef.current?.getBoundingClientRect();
      const pop = popRef.current;
      if (!btn || !pop) return;
      const vw = document.documentElement.clientWidth;
      const width = Math.min(POP_WIDTH, vw - EDGE * 2);
      const viewportLeft = Math.min(Math.max(btn.left, EDGE), vw - EDGE - width);
      const height = pop.offsetHeight;
      const below = window.innerHeight - btn.bottom;
      const up = below < height + 12 + EDGE && btn.top > below;
      setPlace({ left: viewportLeft - btn.left, up });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, sheet]);

  useEffect(() => {
    if (!open) return;
    // Focus the first control (or the selected option) in the popover.
    const target =
      popRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
      popRef.current?.querySelector<HTMLElement>("input, button");
    target?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    // "click", not "pointerdown": the browser moves focus on mousedown, so
    // closing on click lets focus return to the value afterwards.
    function onOutside(event: MouseEvent) {
      const t = event.target as Node;
      if (popRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      onClose();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sheet]);

  const panelClass = "rounded-card bg-newsprint p-5 font-sans text-[16px] leading-normal font-normal tracking-normal";

  return (
    <span className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popId : undefined}
        aria-label={`${title}: ${label.replace(" ▾", "")}`}
        data-field={field}
        onClick={() => {
          if (open) {
            onClose();
            return;
          }
          setPlace({ left: 0, up: false });
          onOpen();
        }}
        className={cx(
          "cursor-pointer border-0 bg-transparent p-0 font-display font-black underline decoration-[3px] underline-offset-[0.18em] transition-colors duration-150",
          open ? "text-break-on-light decoration-break-on-light" : "text-accent-2 decoration-accent-2"
        )}
      >
        {label}
      </button>
      {open &&
        (sheet ? (
          createPortal(
            <>
              <div aria-hidden="true" className="fixed inset-0 z-[60] bg-carbon/45" />
              <div
                ref={popRef}
                id={popId}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cx(
                  panelClass,
                  "fixed inset-x-0 bottom-0 z-[61] max-h-[80vh] overflow-y-auto rounded-b-none px-5 pt-3 pb-[max(20px,env(safe-area-inset-bottom))] text-carbon shadow-card-hover"
                )}
              >
                <span aria-hidden="true" className="mx-auto mb-4 block h-1 w-10 rounded-full bg-carbon/20" />
                <p className="m-0 mb-3 text-[14px] font-medium text-flint">{title}</p>
                {children}
              </div>
            </>,
            document.body
          )
        ) : (
          <div
            ref={popRef}
            id={popId}
            role="dialog"
            aria-label={title}
            style={{ left: place.left, width: `min(${POP_WIDTH}px, calc(100vw - ${EDGE * 2}px))` }}
            className={cx(panelClass, "absolute z-30 shadow-card-hover", place.up ? "bottom-full mb-3" : "top-full mt-3")}
          >
            {children}
          </div>
        ))}
    </span>
  );
}

/** Styled native range: sage-25 track, Canopy fill (pink while dragging). */
function Slider({
  range,
  value,
  onChange,
  label,
  format,
}: {
  range: Range;
  value: number;
  onChange: (v: number) => void;
  label: string;
  format: (v: number) => string;
}) {
  const [dragging, setDragging] = useState(false);
  // What's typed in the number field; null shows the current value.
  const [draft, setDraft] = useState<string | null>(null);
  const fill = ((Math.min(Math.max(value, range.min), range.max) - range.min) / (range.max - range.min)) * 100;
  const clamp = (n: number) => Math.min(range.max, Math.max(range.min, Math.round(n)));

  function commit() {
    if (draft !== null && draft.trim() !== "" && !Number.isNaN(Number(draft))) onChange(clamp(Number(draft)));
    setDraft(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[14px] font-medium text-carbon">
        <span>{label}</span>
        {/* Exact value: any whole number in the range, kept in sync with the slider. */}
        <input
          type="number"
          inputMode="numeric"
          aria-label={`${label}, exact value`}
          min={range.min}
          max={range.max}
          step={1}
          value={draft ?? String(value)}
          onChange={(event) => {
            const text = event.target.value;
            setDraft(text);
            const n = Number(text);
            if (text.trim() !== "" && Number.isInteger(n) && n >= range.min && n <= range.max) onChange(n);
          }}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit();
            }
          }}
          className="tb-number w-20 rounded-control border-[1.5px] border-flint bg-newsprint px-2 py-1 text-right font-sans text-[16px] text-carbon"
        />
      </div>
      <input
        type="range"
        aria-label={label}
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(event) => {
          setDraft(null);
          onChange(Number(event.target.value));
        }}
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onBlur={() => setDragging(false)}
        data-active={dragging || undefined}
        className="tb-range mt-3"
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div className="mt-1 flex justify-between text-[12px] text-flint" aria-hidden="true">
        <span>{format(range.min)}</span>
        <span>{format(range.max)}</span>
      </div>
    </div>
  );
}
