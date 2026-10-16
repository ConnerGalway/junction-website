"use client";

import { Suspense, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Input, ProgramThumb, Select, Textarea, type ProgramKey } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { SHOW_CONTACT_TILE_ART } from "@/lib/flags";

type FormType = "accelerator" | "ai" | "training" | "strategy" | "speaking" | "other";

/** The program tiles, in order (3 × 2). `thumb` picks the ProgramThumb art. */
const PROGRAMS: { type: FormType; title: string; line: string; thumb: ProgramKey }[] = [
  { type: "accelerator", title: "The Accelerator", line: "A plan you'll work", thumb: "accelerator" },
  { type: "ai", title: "Offload Program", line: "Automate a bottleneck", thumb: "offload" },
  { type: "training", title: "Custom Training", line: "Train your people", thumb: "training" },
  { type: "strategy", title: "Marketing strategy", line: "For destinations", thumb: "strategy" },
  { type: "speaking", title: "Speaking", line: "For your event", thumb: "speaking" },
  { type: "other", title: "Something else", line: "In your own words", thumb: "other" },
];

const validTypes = PROGRAMS.map((p) => p.type);

/**
 * Answers passed in from other pages: the Custom Training program sketcher
 * (audience, learners, sketch) and the Speaking availability card (org,
 * date, format, size, note).
 */
type Prefill = {
  audience?: string;
  learners?: string;
  sketch?: string;
  org?: string;
  date?: string;
  format?: string;
  size?: string;
  note?: string;
};

const speakingFormats = ["Keynote", "Workshop", "Panel or fireside", "Virtual", "Not sure yet"];

const sketchAudience: Record<string, string> = {
  operators: "Businesses or operators in our region",
  leadership: "Our leadership team",
  staff: "Our staff",
};

const sketchLearners: Record<string, string> = {
  "under-20": "Under 20",
  "20-100": "20–100",
  "100-500": "100–500",
  "500-plus": "500+",
};

function ContactFormFields({ initialType, prefill }: { initialType: FormType | null; prefill?: Prefill }) {
  const typeLabelId = useId();
  const [selectedType, setSelectedType] = useState<FormType | null>(initialType);
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up contact form submission
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    setFirstName(name?.split(" ")[0] || "there");
    setSent(true);
  };

  const orgLabel =
    selectedType === "speaking"
      ? "Event or organization"
      : selectedType === "training" || selectedType === "strategy"
      ? "Organization"
      : "Company";

  return (
    <>
      {/* Live region stays mounted so the confirmation is announced. */}
      <div role="status" aria-live="polite">
        {sent && (
          <div className="flex flex-col gap-4 py-3">
            <h2 className="type-h3 m-0">
              Thanks, {firstName}. Want to skip the back-and-forth?
            </h2>
            <p className="type-body m-0">
              Conner will reply by email. If you&apos;d like to move faster, pick a
              time for a 20-minute call now.
            </p>
            <Button href={CALENDLY_URL} className="self-start">
              Book a 20-min call
            </Button>
          </div>
        )}
      </div>

      {!sent && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* 1 · Program tiles: a radio group (arrow keys move between them), required */}
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend id={typeLabelId} className="m-0 mb-4 p-0 type-eyebrow">
              1 · What are you interested in?
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {PROGRAMS.map((p) => (
                <label key={p.type} className="contact-tile flex cursor-pointer items-center gap-3 rounded-[12px] p-2.5">
                  <input
                    type="radio"
                    name="type"
                    value={p.type}
                    required
                    checked={selectedType === p.type}
                    onChange={() => setSelectedType(p.type)}
                    className="sr-only"
                  />
                  {SHOW_CONTACT_TILE_ART && <ProgramThumb program={p.thumb} />}
                  <span className="min-w-0">
                    <span className="contact-tile-title block font-display text-[15.5px] leading-tight font-semibold text-carbon">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-flint">{p.line}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Name and Email */}
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
            <Input label="Name" name="name" required autoComplete="name" />
            <Input label="Work email" name="email" type="email" required autoComplete="email" />
          </div>

          {/* Organization */}
          <Input label={orgLabel} name="org" autoComplete="organization" defaultValue={prefill?.org} />

          {/* AI Accelerator fields */}
          {selectedType === "ai" && (
            <div className="flex flex-col gap-4">
              <Select label="How many people would take part?" name="team">
                <option>1–3</option>
                <option>4–8</option>
                <option>9–15</option>
                <option>16+</option>
              </Select>
              <Textarea
                label="What's eating your team's week?"
                name="bottleneck"
                rows={3}
                placeholder="e.g. quotes typed in by hand, chasing invoices, weekly reports"
              />
            </div>
          )}

          {/* Accelerator fields */}
          {selectedType === "accelerator" && (
            <div className="flex flex-col gap-4">
              <Input label="Website" name="website" placeholder="yourbusiness.com" />
              <Textarea
                label="What should marketing do for you in the next 90 days?"
                name="goal"
                rows={3}
              />
              <label className="flex cursor-pointer items-center gap-2.5 text-[15px]">
                <input
                  type="checkbox"
                  name="partner"
                  className="size-[18px] shrink-0 accent-canopy-text"
                />
                My association or region may cover part of the cost
              </label>
            </div>
          )}

          {/* Training fields */}
          {selectedType === "training" && (
            <div className="flex flex-col gap-4">
              {/* TODO: the training form has no message field, so the sketch title
                  (prefill.sketch) isn't shown yet; add one if the form gets it. */}
              {prefill?.sketch && <input type="hidden" name="sketch" value={prefill.sketch} />}
              <Select label="Who's the training for?" name="audience" defaultValue={prefill?.audience}>
                <option>Businesses or operators in our region</option>
                <option>Our leadership team</option>
                <option>Our staff</option>
                <option>Our members</option>
              </Select>
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                <Input label="Roughly how many learners?" name="learners" defaultValue={prefill?.learners} />
                <Input label="Ideal timing" name="timing" placeholder="e.g. spring 2027" />
              </div>
            </div>
          )}

          {/* Speaking fields */}
          {selectedType === "speaking" && (
            <div className="flex flex-col gap-4">
              {/* TODO: no notes field for speaking; answers without a field
                  (e.g. a format not in the list) ride along hidden for now. */}
              {prefill?.note && <input type="hidden" name="note" value={prefill.note} />}
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                <Input label="Event date" name="date" type="date" defaultValue={prefill?.date} />
                <Input label="City or virtual" name="location" />
                <Input label="Audience size" name="size" defaultValue={prefill?.size} />
                <Select label="Format" name="format" defaultValue={prefill?.format}>
                  {speakingFormats.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </Select>
              </div>
              <Select label="Topic you're interested in" name="topic">
                <option>AI and the work only people can do</option>
                <option>Marketing trends worth acting on</option>
                <option>Tourism strategy and marketing</option>
                <option>Not sure yet</option>
              </Select>
            </div>
          )}

          {/* Marketing strategy fields */}
          {selectedType === "strategy" && (
            <div className="flex flex-col gap-4">
              <Input label="Region" name="region" placeholder="e.g. Kootenay Rockies" />
              <Textarea label="What do you want your strategy to solve?" name="goal" rows={3} />
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                <Select label="Ideal timing" name="timing">
                  <option>Before our next fiscal year</option>
                  <option>In the next 3 months</option>
                  <option>In the next 6 months</option>
                  <option>Just exploring</option>
                </Select>
                <Select label="Budget range (optional)" name="budget" defaultValue="">
                  <option value="">Choose a range</option>
                  <option>Under $25K</option>
                  <option>$25K–$50K</option>
                  <option>$50K–$100K</option>
                  <option>$100K+</option>
                  <option>Not sure yet</option>
                </Select>
              </div>
            </div>
          )}

          {/* Other fields */}
          {selectedType === "other" && (
            <Textarea label="What can we help with?" name="message" rows={4} />
          )}

          <Button type="submit" className="self-start">
            Send
          </Button>
        </form>
      )}
    </>
  );
}

/** Reads ?type= from the URL to preselect the program. */
function ContactFormFromParams() {
  const searchParams = useSearchParams();
  const param = searchParams.get("type") as FormType | null;
  const initialType = param && validTypes.includes(param) ? param : null;
  const get = (key: string) => searchParams.get(key) ?? undefined;
  const format = get("format");
  const prefill: Prefill =
    initialType === "speaking"
      ? {
          org: get("event"),
          date: get("date"),
          format: format && speakingFormats.includes(format) ? format : undefined,
          size: get("audience"),
          note: format && !speakingFormats.includes(format) ? `Format: ${format}` : undefined,
        }
      : {
          audience: sketchAudience[get("who") ?? ""],
          learners: sketchLearners[get("size") ?? ""],
          sketch: get("sketch"),
        };
  return <ContactFormFields initialType={initialType} prefill={prefill} />;
}

/**
 * Contact form. useSearchParams needs a Suspense boundary for prerendering;
 * the fallback is the same form with the default type.
 */
export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFields initialType={null} />}>
      <ContactFormFromParams />
    </Suspense>
  );
}
