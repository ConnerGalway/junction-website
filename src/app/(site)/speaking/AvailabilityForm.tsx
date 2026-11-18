"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Button, Eyebrow, FormError, Honeypot, Input, Select } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { EMAIL_RE, FORM_NAMES, pageUrl, submitNetlifyForm } from "@/lib/forms";

const FORMATS = ["Keynote", "Workshop", "Panel or fireside", "Virtual", "Not sure yet"];
const AUDIENCES = ["Under 50", "50–100", "100–300", "300+"];

/**
 * "Check availability" card (hidden while SHOW_SPEAKING_AVAILABILITY is off).
 * Event, date, format, audience, name and email in a 2-column grid; submits
 * to the Netlify form "speaking-availability" (see src/lib/forms.ts). The
 * event name and a valid email are required (checked in the browser and
 * announced). States: sending, thanks (with a call link), error (mailto).
 */
export function AvailabilityForm() {
  const id = useId();
  const [errors, setErrors] = useState<{ event?: boolean; email?: boolean }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [bot, setBot] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const next = { event: !get("event"), email: !EMAIL_RE.test(get("email")) };
    setErrors(next);
    if (next.event || next.email) {
      (form.elements.namedItem(next.event ? "event" : "email") as HTMLInputElement | null)?.focus();
      return;
    }
    setState("sending");
    try {
      await submitNetlifyForm(FORM_NAMES.speaking, {
        event: get("event"),
        date: get("date"),
        format: get("format"),
        audience: get("audience"),
        name: get("name"),
        email: get("email"),
        page: pageUrl(),
        "bot-field": bot,
      });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="card card-pad" role="status" aria-live="polite">
        <Eyebrow className="m-0">Check availability</Eyebrow>
        <p className="type-h3 m-0 mt-4">Thanks — it&apos;s with us. We&apos;ll reply soon.</p>
        <Button variant="secondary" href={CALENDLY_URL} className="mt-6">
          Book a 20-min call
        </Button>
      </div>
    );
  }

  return (
    <div className="card card-pad">
      <Eyebrow className="m-0">Check availability</Eyebrow>
      <form noValidate onSubmit={submit} className="mt-5" aria-busy={state === "sending"}>
        <Honeypot value={bot} onChange={setBot} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Event"
            name="event"
            required
            aria-required="true"
            aria-invalid={errors.event || undefined}
            aria-describedby={errors.event ? `${id}-event` : undefined}
            onChange={() => errors.event && setErrors((e) => ({ ...e, event: false }))}
          />
          <Input label="Date" name="date" type="date" />
          <Select label="Format" name="format" defaultValue="Keynote">
            {FORMATS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </Select>
          <Select label="Audience" name="audience" defaultValue="100–300">
            {AUDIENCES.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </Select>
          <Input label="Your name" name="name" autoComplete="name" />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email || undefined}
            aria-describedby={errors.email ? `${id}-email` : undefined}
            onChange={() => errors.email && setErrors((e) => ({ ...e, email: false }))}
          />
        </div>
        <div aria-live="polite">
          {errors.event && (
            <p id={`${id}-event`} role="alert" className="type-small mt-3 mb-0 font-medium text-carbon">
              Add the event name so we know what to check.
            </p>
          )}
          {errors.email && (
            <p id={`${id}-email`} role="alert" className="type-small mt-3 mb-0 font-medium text-carbon">
              Enter a valid email address, like name@business.com
            </p>
          )}
          {state === "error" && <FormError className="mt-3" />}
        </div>
        <Button type="submit" disabled={state === "sending"} className="mt-6">
          {state === "sending" ? "Sending…" : "Check availability"}
        </Button>
        <p className="type-small m-0 mt-3">
          You&apos;ll hear back with availability and a fee for your format.{" "}
          <a href="/privacy-policy" className="link">
            Privacy policy
          </a>
        </p>
      </form>
    </div>
  );
}
