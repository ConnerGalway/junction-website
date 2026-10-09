"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { Button, Eyebrow, Input, cx } from "@/components";
import { DEFAULTS, HOURS, JOBS, PEOPLE, RATE, WEEKS_PER_YEAR, yearlyHours, type Range } from "@/lib/timeBack";

/*
 * "What is that job costing you?" calculator.
 *
 * TODO (before going live): FRONT-END DEMO ONLY. The email is only
 * format-checked in the browser; nothing is stored or sent. Needs approval,
 * a backend, the estimate email and a CASL check. Jobs and copy live in
 * src/lib/timeBack.ts (placeholders pending team approval).
 */

type Field = "hours" | "job" | "people" | "rate";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "error" | "sent">("idle");
  const id = useId();

  const totalHours = yearlyHours(hours, people);
  const totalCost = totalHours * rate;
  const shownHours = useCountTo(totalHours);
  const shownCost = useCountTo(totalCost);
  const current = JOBS[job];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setEmailState("error");
      return;
    }
    // TODO: send to the (not yet approved) backend. Nothing is stored or sent.
    setEmailState("sent");
  }

  const valueProps = (field: Field) => ({
    field,
    open: open === field,
    onOpen: () => setOpen(field),
    onClose: () => setOpen((f) => (f === field ? null : f)),
  });

  return (
    <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div>
        <h2 className="type-h2 m-0">What is that job costing you?</h2>
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
        <p className="m-0 mt-4 font-wordmark text-[clamp(72px,7.5vw,104px)] leading-[0.9] text-accent-1">
          {whole.format(shownHours)} h
        </p>
        <p className="m-0 mt-2 font-wordmark text-[52px] leading-none text-newsprint">{money.format(shownCost)}</p>
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
          <p className="type-small m-0 mt-1">{current.line}</p>
        </div>

        <div className="mt-7 border-t border-hairline-dark pt-6">
          {emailState === "sent" ? (
            <div>
              <Eyebrow className="m-0">Sent</Eyebrow>
              <p className="type-h4 m-0 mt-2">Check your inbox.</p>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <p className="type-h4 m-0 mb-3">Email me this estimate.</p>
              <div className="flex flex-wrap items-start gap-2.5 sm:flex-nowrap">
                <Input
                  label="Email address"
                  hideLabel
                  type="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailState === "error") setEmailState("idle");
                  }}
                  aria-invalid={emailState === "error" || undefined}
                  aria-describedby={emailState === "error" ? `${id}-error` : undefined}
                  className="min-w-0 flex-1 basis-56"
                />
                <Button type="submit" className="shrink-0">
                  Send
                </Button>
              </div>
              {emailState === "error" && (
                <p id={`${id}-error`} role="alert" className="type-small mt-2 mb-0 font-medium text-newsprint">
                  Enter a valid email address, like name@business.com
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * An editable value in the sentence: copper (an approved one-off for this
 * calculator), pink while its popover is open. The popover closes on
 * Escape or an outside click, and focus returns to the value.
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
  const [alignRight, setAlignRight] = useState(false);
  const popId = useId();

  // Focus returns to the value whenever its popover closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

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
  }, [open]);

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
          const rect = buttonRef.current?.getBoundingClientRect();
          setAlignRight(!!rect && rect.left + 300 > window.innerWidth - 16);
          onOpen();
        }}
        className={cx(
          "cursor-pointer border-0 bg-transparent p-0 font-display font-black underline decoration-[3px] underline-offset-[0.18em] transition-colors duration-150",
          open ? "text-break-on-light decoration-break-on-light" : "text-accent-2 decoration-accent-2"
        )}
      >
        {label}
      </button>
      {open && (
        <div
          ref={popRef}
          id={popId}
          role="dialog"
          aria-label={title}
          className={cx(
            "absolute top-full z-30 mt-3 w-[280px] max-w-[calc(100vw-40px)] rounded-card bg-newsprint p-5 font-sans text-[16px] leading-normal font-normal tracking-normal shadow-card-hover",
            alignRight ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
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
  const fill = ((value - range.min) / (range.max - range.min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[14px] font-medium text-carbon">
        <span>{label}</span>
        <span className="font-wordmark text-[24px] leading-none text-carbon">{format(value)}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
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
