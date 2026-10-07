"use client";

import { Suspense, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Eyebrow, Input, Select, Textarea, cx } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

type FormType = "ai" | "accelerator" | "training" | "speaking" | "other";

const validTypes: FormType[] = ["ai", "accelerator", "training", "speaking", "other"];

const typeLabels: Record<FormType, string> = {
  ai: "AI Accelerator",
  accelerator: "The Accelerator",
  training: "Custom Training",
  speaking: "Speaking",
  other: "Something else",
};

function ContactFormFields({ initialType }: { initialType: FormType }) {
  const typeLabelId = useId();
  const [selectedType, setSelectedType] = useState<FormType>(initialType);
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
      : selectedType === "training"
      ? "Organization"
      : "Company";

  const submitLabel =
    selectedType === "speaking"
      ? "Check availability"
      : selectedType === "training"
      ? "Scope my program"
      : "Send";

  return (
    <>
      {/* Live region stays mounted so the confirmation is announced. */}
      <div role="status" aria-live="polite">
        {sent && (
          <div className="flex flex-col gap-4 py-3">
            <Eyebrow>Got it</Eyebrow>
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
          <input type="hidden" name="type" value={selectedType} />

          {/* Type selector */}
          <div>
            <p id={typeLabelId} className="m-0 mb-3 text-[15px] font-medium">
              What are you interested in?
            </p>
            <div role="group" aria-labelledby={typeLabelId} className="flex flex-wrap gap-2">
              {validTypes.map((t) => {
                const active = selectedType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedType(t)}
                    className={cx(
                      "inline-flex min-h-11 cursor-pointer items-center rounded-control border-[1.5px] border-forest px-4 text-[15px] font-medium",
                      active ? "bg-forest text-newsprint" : "bg-transparent text-forest hover:bg-sage"
                    )}
                  >
                    {typeLabels[t]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name and Email */}
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
            <Input label="Name" name="name" required autoComplete="name" />
            <Input label="Work email" name="email" type="email" required autoComplete="email" />
          </div>

          {/* Organization */}
          <Input label={orgLabel} name="org" autoComplete="organization" />

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
              <Select label="Who's the training for?" name="audience">
                <option>Businesses or operators in our region</option>
                <option>Our leadership team</option>
                <option>Our staff</option>
                <option>Our members</option>
              </Select>
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                <Input label="Roughly how many learners?" name="learners" />
                <Input label="Ideal timing" name="timing" placeholder="e.g. spring 2027" />
              </div>
            </div>
          )}

          {/* Speaking fields */}
          {selectedType === "speaking" && (
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
                <Input label="Event date" name="date" type="date" />
                <Input label="City or virtual" name="location" />
                <Input label="Audience size" name="size" />
                <Select label="Format" name="format">
                  <option>Keynote</option>
                  <option>Workshop</option>
                  <option>Panel or fireside</option>
                  <option>Virtual</option>
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

          {/* Other fields */}
          {selectedType === "other" && (
            <Textarea label="What can we help with?" name="message" rows={4} />
          )}

          <Button type="submit" className="self-start">
            {submitLabel}
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
  const initialType = param && validTypes.includes(param) ? param : "ai";
  return <ContactFormFields initialType={initialType} />;
}

/**
 * Contact form. useSearchParams needs a Suspense boundary for prerendering;
 * the fallback is the same form with the default type.
 */
export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFields initialType="ai" />}>
      <ContactFormFromParams />
    </Suspense>
  );
}
