"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Button, Eyebrow, FormError, Honeypot, Input, TextLink, cx } from "@/components";
import { EMAIL_RE, FORM_NAMES, pageUrl, submitNetlifyForm } from "@/lib/forms";
import { CALENDLY_URL } from "@/lib/constants";
import { DEFAULTS, HOW, SIZE, WHO, sketchProgram, sketchSummary, type How, type Size, type Who } from "@/lib/programSketch";

/**
 * A select on Forest: Newsprint 8% fill, 1px Newsprint 16% border, small
 * caps label (Newsprint 60%) above the value (Epilogue 600, 18px), Fern
 * chevron. A native <select> underneath, so it's keyboard and screen-reader
 * friendly.
 */
function SketchSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <div className="relative rounded-control border border-newsprint/16 bg-newsprint/8 transition-colors focus-within:border-fern hover:border-newsprint/30">
      <label htmlFor={id} className="block px-4 pt-3 text-[11px] font-medium tracking-[0.12em] text-newsprint/60 uppercase">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="sketch-select w-full cursor-pointer appearance-none border-0 bg-transparent px-4 pt-1 pb-3 pr-10 font-display text-[18px] font-semibold tracking-[-0.01em] text-newsprint focus-visible:outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" className="pointer-events-none absolute right-4 bottom-4 text-fern">
        <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * Program sketcher (on Forest): three answers and a result card that
 * updates instantly (a soft 200ms fade on the text). Under it, name, email
 * and organization send the sketch to the Netlify form "training-sketch"
 * (see src/lib/forms.ts); "add more details" still opens the contact page
 * pre-filled with the answers and the sketch.
 * Rules live in src/lib/programSketch.ts (placeholders).
 */
export function ProgramSketcher() {
  const [who, setWho] = useState<Who>(DEFAULTS.who);
  const [how, setHow] = useState<How>(DEFAULTS.how);
  const [size, setSize] = useState<Size>(DEFAULTS.size);
  const sketch = sketchProgram(who, how);
  const summary = sketchSummary(sketch, who, size);
  const key = `${who}-${how}-${size}`;

  const params = new URLSearchParams({ type: "training", who, how, size, sketch: sketch.title });
  const href = `/contact?${params.toString()}`;

  const id = useId();
  const [state, setState] = useState<"idle" | "invalid" | "sending" | "sent" | "error">("idle");
  const [bot, setBot] = useState("");

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!EMAIL_RE.test(get("email"))) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      await submitNetlifyForm(FORM_NAMES.trainingSketch, {
        name: get("name"),
        email: get("email"),
        org: get("org"),
        who: WHO.find((w) => w.id === who)?.label ?? who,
        how: HOW.find((h) => h.id === how)?.label ?? how,
        size: SIZE.find((z) => z.id === size)?.label ?? size,
        sketch: sketch.title,
        sketch_summary: summary,
        page: pageUrl(),
        "bot-field": bot,
      });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        <SketchSelect label="Who needs training?" value={who} options={WHO} onChange={setWho} />
        <SketchSelect label="How do they learn best?" value={how} options={HOW} onChange={setHow} />
        <SketchSelect label="How many people?" value={size} options={SIZE} onChange={setSize} />
      </div>

      <div className="tone-newsprint card-pad mt-4 rounded-card" aria-live="polite">
        <Eyebrow className="m-0">Your program, sketched</Eyebrow>
        <div key={key} className="sketch-fade">
          <p className="m-0 mt-3 font-display text-[clamp(24px,2.4vw,28px)] leading-[1.1] font-black tracking-[-0.03em] text-carbon">
            {sketch.title}
          </p>
          <ol className="m-0 mt-6 flex list-none gap-1 p-0 sm:gap-1.5" aria-label="Weeks">
            {Array.from({ length: sketch.weeks }, (_, i) => {
              const live = sketch.live.includes(i + 1);
              return (
                <li
                  key={i}
                  className={cx(
                    "flex h-10 min-w-0 flex-1 items-end overflow-hidden rounded-[6px] px-1 pb-1.5 text-[10px] font-medium sm:px-2 sm:text-[11px]",
                    live ? "bg-canopy text-newsprint" : "bg-sage text-forest"
                  )}
                >
                  <span className="sr-only">{live ? "Live session, " : ""}</span>W{i + 1}
                </li>
              );
            })}
          </ol>
          <p className="type-small m-0 mt-3">{summary}</p>
        </div>
        {state === "sent" ? (
          <p role="status" className="type-h4 m-0 mt-7 border-t border-hairline pt-6">
            Thanks — it&apos;s with us. We&apos;ll reply soon.
          </p>
        ) : (
          <form noValidate onSubmit={send} className="mt-7 border-t border-hairline pt-6" aria-busy={state === "sending"}>
            <p className="type-h4 m-0 mb-4">Send this sketch to us</p>
            <Honeypot value={bot} onChange={setBot} />
            <div className="grid gap-3 sm:grid-cols-3">
              <Input label="Name" name="name" autoComplete="name" />
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={state === "invalid" || undefined}
                aria-describedby={state === "invalid" ? `${id}-email` : undefined}
                onChange={() => state === "invalid" && setState("idle")}
              />
              <Input label="Organization" name="org" autoComplete="organization" />
            </div>
            <div aria-live="polite">
              {state === "invalid" && (
                <p id={`${id}-email`} role="alert" className="type-small mt-2 mb-0 font-medium text-carbon">
                  Enter a valid email address, like name@business.com
                </p>
              )}
              {state === "error" && <FormError className="mt-2" />}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send this sketch to us"}
              </Button>
              <TextLink href={href}>Or add more details →</TextLink>
            </div>
            <p className="type-small m-0 mt-3">
              <a href="/privacy-policy" className="link">
                Privacy policy
              </a>
            </p>
          </form>
        )}
      </div>

      <TextLink href={CALENDLY_URL} className="mt-8 inline-block">
        Or book a 20-min call →
      </TextLink>
    </div>
  );
}
