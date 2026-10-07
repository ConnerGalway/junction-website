"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

type FormType = "ai" | "accelerator" | "training" | "speaking" | "other";

const typeLabels: Record<FormType, string> = {
  ai: "AI Accelerator",
  accelerator: "The Accelerator",
  training: "Custom Training",
  speaking: "Speaking",
  other: "Something else",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as FormType) || "ai";
  const validTypes: FormType[] = ["ai", "accelerator", "training", "speaking", "other"];
  const [selectedType, setSelectedType] = useState<FormType>(
    validTypes.includes(initialType) ? initialType : "ai"
  );
  const [sent, setSent] = useState(false);
  const [firstName, setFirstName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  if (sent) {
    return (
      <div className="flex flex-col gap-4" style={{ padding: "12px 0" }}>
        <div className="text-eyebrow text-accent-shade">Got it</div>
        <div
          className="font-epilogue"
          style={{
            fontWeight: 900,
            fontSize: "clamp(30px, 3.4vw, 44px)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
          }}
        >
          Thanks, {firstName}. Want to skip the back-and-forth?
        </div>
        <p
          style={{
            fontSize: "17px",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "rgba(28, 28, 26, 0.76)",
            margin: 0,
          }}
        >
          Conner will reply by email. If you&apos;d like to move faster, pick a time
          for a 20-minute call now.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
          style={{ padding: "17px 28px" }}
        >
          Book a 20-min call
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Type selector */}
      <div>
        <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "12px" }}>
          What are you interested in?
        </div>
        <div className="flex flex-wrap gap-2">
          {validTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              className="font-dm-sans cursor-pointer rounded-[3px]"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                padding: "11px 16px",
                background: selectedType === t ? "#1C1C1A" : "#FFFFFF",
                color: selectedType === t ? "#F4F0E8" : "#1C1C1A",
                border: `1.5px solid ${
                  selectedType === t ? "#1C1C1A" : "rgba(28, 28, 26, 0.25)"
                }`,
              }}
            >
              {typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Name and Email */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "16px",
        }}
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Name
          <input
            name="name"
            required
            className="font-dm-sans rounded-[3px]"
            style={{
              padding: "13px 14px",
              border: "1px solid rgba(28, 28, 26, 0.25)",
              fontSize: "16px",
              background: "#FFFFFF",
              color: "#1C1C1A",
            }}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Work email
          <input
            name="email"
            type="email"
            required
            className="font-dm-sans rounded-[3px]"
            style={{
              padding: "13px 14px",
              border: "1px solid rgba(28, 28, 26, 0.25)",
              fontSize: "16px",
              background: "#FFFFFF",
              color: "#1C1C1A",
            }}
          />
        </label>
      </div>

      {/* Organization */}
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        {orgLabel}
        <input
          name="org"
          className="font-dm-sans rounded-[3px]"
          style={{
            padding: "13px 14px",
            border: "1px solid rgba(28, 28, 26, 0.25)",
            fontSize: "16px",
            background: "#FFFFFF",
            color: "#1C1C1A",
          }}
        />
      </label>

      {/* AI Accelerator fields */}
      {selectedType === "ai" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            How many people would take part?
            <select
              name="team"
              className="font-dm-sans rounded-[3px]"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                background: "#FFFFFF",
                color: "#1C1C1A",
              }}
            >
              <option>1–3</option>
              <option>4–8</option>
              <option>9–15</option>
              <option>16+</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            What&apos;s eating your team&apos;s week?
            <textarea
              name="bottleneck"
              rows={3}
              placeholder="e.g. quotes typed in by hand, chasing invoices, weekly reports"
              className="font-dm-sans rounded-[3px] resize-y"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                color: "#1C1C1A",
              }}
            />
          </label>
        </div>
      )}

      {/* Accelerator fields */}
      {selectedType === "accelerator" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Website
            <input
              name="website"
              placeholder="yourbusiness.com"
              className="font-dm-sans rounded-[3px]"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                color: "#1C1C1A",
              }}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            What should marketing do for you in the next 90 days?
            <textarea
              name="goal"
              rows={3}
              className="font-dm-sans rounded-[3px] resize-y"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                color: "#1C1C1A",
              }}
            />
          </label>
          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="partner"
              style={{ width: "18px", height: "18px", accentColor: "#1A4D2E" }}
            />
            My association or region may cover part of the cost
          </label>
        </div>
      )}

      {/* Training fields */}
      {selectedType === "training" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Who&apos;s the training for?
            <select
              name="audience"
              className="font-dm-sans rounded-[3px]"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                background: "#FFFFFF",
                color: "#1C1C1A",
              }}
            >
              <option>Businesses or operators in our region</option>
              <option>Our leadership team</option>
              <option>Our staff</option>
              <option>Our members</option>
            </select>
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: "16px",
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Roughly how many learners?
              <input
                name="learners"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "13px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  color: "#1C1C1A",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Ideal timing
              <input
                name="timing"
                placeholder="e.g. spring 2027"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "13px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  color: "#1C1C1A",
                }}
              />
            </label>
          </div>
        </div>
      )}

      {/* Speaking fields */}
      {selectedType === "speaking" && (
        <div className="flex flex-col gap-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: "16px",
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Event date
              <input
                name="date"
                type="date"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  color: "#1C1C1A",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              City or virtual
              <input
                name="location"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "13px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  color: "#1C1C1A",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Audience size
              <input
                name="size"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "13px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  color: "#1C1C1A",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Format
              <select
                name="format"
                className="font-dm-sans rounded-[3px]"
                style={{
                  padding: "13px 14px",
                  border: "1px solid rgba(28, 28, 26, 0.25)",
                  fontSize: "16px",
                  background: "#FFFFFF",
                  color: "#1C1C1A",
                }}
              >
                <option>Keynote</option>
                <option>Workshop</option>
                <option>Panel or fireside</option>
                <option>Virtual</option>
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Topic you&apos;re interested in
            <select
              name="topic"
              className="font-dm-sans rounded-[3px]"
              style={{
                padding: "13px 14px",
                border: "1px solid rgba(28, 28, 26, 0.25)",
                fontSize: "16px",
                background: "#FFFFFF",
                color: "#1C1C1A",
              }}
            >
              <option>AI and the work only people can do</option>
              <option>Marketing trends worth acting on</option>
              <option>Tourism strategy and marketing</option>
              <option>Not sure yet</option>
            </select>
          </label>
        </div>
      )}

      {/* Other fields */}
      {selectedType === "other" && (
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          What can we help with?
          <textarea
            name="message"
            rows={4}
            className="font-dm-sans rounded-[3px] resize-y"
            style={{
              padding: "13px 14px",
              border: "1px solid rgba(28, 28, 26, 0.25)",
              fontSize: "16px",
              color: "#1C1C1A",
            }}
          />
        </label>
      )}

      <button
        type="submit"
        className="self-start text-button bg-forest text-newsprint rounded-[3px] cursor-pointer border-0 font-dm-sans transition-colors hover:bg-canopy"
        style={{ padding: "17px 28px" }}
      >
        {submitLabel}
      </button>
    </form>
  );
}

function ContactFormWrapper() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "40px 0", textAlign: "center" }}>Loading...</div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Main */}
      <section
        style={{
          padding:
            "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div>
            <div className="text-eyebrow text-accent-shade mb-5">
              Start a conversation
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(46px, 6.4vw, 96px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
              }}
            >
              Tell us what you&apos;re after.
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                maxWidth: "42ch",
                margin: "28px 0 40px",
              }}
            >
              Pick a program and answer a few questions. Conner reads every one
              and replies personally.
            </p>

            {/* Rather just talk card */}
            <div
              className="bg-forest text-newsprint rounded flex flex-col gap-3.5"
              style={{ padding: "28px", maxWidth: "460px" }}
            >
              <div
                className="font-epilogue"
                style={{
                  fontWeight: 900,
                  fontSize: "26px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Rather just talk?
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: "rgba(244, 240, 232, 0.84)",
                  margin: 0,
                }}
              >
                Book 20 minutes with Conner. No forms, no prep.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
                style={{ padding: "14px 22px" }}
              >
                Book a 20-min call
              </a>
            </div>

            <div
              style={{
                marginTop: "24px",
                fontSize: "15px",
                color: "rgba(28, 28, 26, 0.72)",
              }}
            >
              Or email{" "}
              <a
                href="mailto:conner@wearejunction.com"
                className="text-carbon font-medium"
                style={{ borderBottom: "2px solid #C4963A" }}
              >
                conner@wearejunction.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div
            className="bg-white rounded"
            style={{ padding: "clamp(24px, 3.5vw, 44px)" }}
          >
            <ContactFormWrapper />
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer
        className="bg-carbon text-newsprint"
        style={{ padding: "40px clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "13px",
            color: "rgba(244, 240, 232, 0.7)",
          }}
        >
          <span>© Junction Consulting 2026</span>
          <div className="flex gap-6 flex-wrap">
            <Link href="/" className="hover:text-newsprint transition-colors">
              Home
            </Link>
            <Link href="/work" className="hover:text-newsprint transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-newsprint transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-newsprint transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
