"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Button, Eyebrow, Input, Select } from "@/components";

const FORMATS = ["Keynote", "Workshop", "Panel or fireside", "Virtual", "Not sure yet"];
const AUDIENCES = ["Under 50", "50–100", "100–300", "300+"];

/**
 * "Check availability" card. A 2×2 form (event, date, format, audience);
 * submitting opens /contact?type=speaking with the answers in the URL,
 * which pre-fill the speaking form. The event name is required (checked
 * in the browser).
 */
export function AvailabilityForm() {
  const router = useRouter();
  const [missing, setMissing] = useState(false);
  const id = useId();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("event") ?? "").trim();
    if (!name) {
      setMissing(true);
      (event.currentTarget.elements.namedItem("event") as HTMLInputElement | null)?.focus();
      return;
    }
    const params = new URLSearchParams({ type: "speaking", event: name });
    for (const key of ["date", "format", "audience"]) {
      const value = String(data.get(key) ?? "");
      if (value) params.set(key, value);
    }
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <div className="card card-pad">
      <Eyebrow className="m-0">Check availability</Eyebrow>
      <form noValidate onSubmit={submit} className="mt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Event"
            name="event"
            required
            aria-required="true"
            aria-invalid={missing || undefined}
            aria-describedby={missing ? `${id}-missing` : undefined}
            onChange={() => missing && setMissing(false)}
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
        </div>
        {missing && (
          <p id={`${id}-missing`} role="alert" className="type-small mt-3 mb-0 font-medium text-carbon">
            Add the event name so we know what to check.
          </p>
        )}
        <Button type="submit" className="mt-6">
          Check availability
        </Button>
        <p className="type-small m-0 mt-3">You&apos;ll hear back with availability and a fee for your format.</p>
      </form>
    </div>
  );
}
