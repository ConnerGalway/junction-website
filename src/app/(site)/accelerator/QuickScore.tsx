"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Eyebrow, Input, cx } from "@/components";
import {
  QUESTIONS,
  answersFor,
  scoreQuickCheck,
  type QuickScoreResult,
  type ScoreBand,
} from "@/lib/quickScore";

/*
 * Free quick check: a deck of three cards (question → score → inbox).
 *
 * TODO (before going live): FRONT-END DEMO ONLY. Needs approval, the real
 * questions and scoring from Conner (src/lib/quickScore.ts), backend
 * scoring and storage, a report email and a CASL check. Right now the email
 * is only format-checked in the browser; nothing is stored or sent.
 */

type Step = "question" | "score" | "inbox";

const EASE = [0.22, 1, 0.36, 1] as const;
// Loose format check only (something@something.tld).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const bandBar: Record<ScoreBand, string> = {
  healthy: "bg-canopy",
  middling: "bg-accent-1-on-light",
  weak: "bg-accent-2",
};

const bandText: Record<ScoreBand, string> = {
  healthy: "text-canopy-text",
  middling: "text-accent-1-on-light",
  weak: "text-accent-2",
};

export function QuickScore() {
  const [step, setStep] = useState<Step>("question");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  const [missing, setMissing] = useState(false);
  const [result, setResult] = useState<QuickScoreResult | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLParagraphElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new front card's title when the card changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    titleRef.current?.focus();
  }, [step]);

  function pick(answer: number) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? answer : a)));
    setMissing(false);
  }

  function next() {
    if (answers[index] === null) {
      setMissing(true);
      return;
    }
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      setResult(scoreQuickCheck(answers as number[]));
      setStep("score");
    }
  }

  function back() {
    setMissing(false);
    setIndex((i) => Math.max(0, i - 1));
  }

  function submitEmail(event: FormEvent) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setEmailError(true);
      return;
    }
    // TODO: send to the (not yet approved) backend. Nothing is stored or sent.
    setEmailError(false);
    setStep("inbox");
  }

  function retake() {
    setAnswers(QUESTIONS.map(() => null));
    setIndex(0);
    setMissing(false);
    setResult(null);
    setEmail("");
    setEmailError(false);
    setStep("question");
  }

  // The shell directly behind hints at the next card.
  const nextTint = step === "score" ? "bg-carbon" : "bg-newsprint-hover";

  return (
    <div className="relative ml-auto w-full max-w-[500px] pt-8">
      {/* Card shells peeking out above the front card */}
      <div aria-hidden="true" className="absolute inset-x-9 top-0 bottom-8 rounded-card bg-newsprint shadow-card" />
      <div
        aria-hidden="true"
        className={cx(
          "absolute inset-x-[18px] top-4 bottom-4 rounded-card shadow-card transition-colors duration-300",
          nextTint
        )}
      />

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={step}
          className="relative"
          initial={{ opacity: 0, y: -16, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1, zIndex: 1 }}
          exit={{ opacity: 0, y: 48, zIndex: 2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE }}
        >
          {step === "question" && (
            <QuestionCard
              index={index}
              selected={answers[index]}
              missing={missing}
              onPick={pick}
              onNext={next}
              onBack={back}
            />
          )}
          {step === "score" && result && (
            <ScoreCard
              result={result}
              titleRef={titleRef}
              email={email}
              emailError={emailError}
              onEmail={(value) => {
                setEmail(value);
                setEmailError(false);
              }}
              onSubmit={submitEmail}
            />
          )}
          {step === "inbox" && (
            <div className="tone-carbon card-pad rounded-card">
              <Eyebrow className="m-0">Report sent</Eyebrow>
              <p ref={titleRef} tabIndex={-1} className="type-h3 m-0 mt-3 focus:outline-none">
                Check your inbox.
              </p>
              <p className="type-body mt-3 mb-7">
                Your quick score report is on its way to{" "}
                <span className="font-medium text-newsprint [overflow-wrap:anywhere]">{email.trim()}</span>.
              </p>
              <Button variant="secondary" onClick={retake}>
                Retake the check
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function QuestionCard({
  index,
  selected,
  missing,
  onPick,
  onNext,
  onBack,
}: {
  index: number;
  selected: number | null;
  missing: boolean;
  onPick: (answer: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const question = QUESTIONS[index];
  const total = QUESTIONS.length;
  const id = useId();

  return (
    <div className="card card-pad">
      <div className="flex items-baseline justify-between gap-4">
        <Eyebrow as="span">
          Question {index + 1} of {total}
        </Eyebrow>
        <span className="type-small">About 3 minutes</span>
      </div>
      <div className="mt-3 flex gap-1" aria-hidden="true">
        {QUESTIONS.map((q, i) => (
          <span key={q.text} className={cx("h-1.5 flex-1 rounded-full", i < index ? "bg-canopy" : "bg-sage-25")} />
        ))}
      </div>

      <fieldset
        key={index}
        className="m-0 mt-6 min-w-0 border-0 p-0"
        aria-describedby={missing ? `${id}-missing` : undefined}
      >
        <legend className="type-h3 m-0 mb-5 p-0">{question.text}</legend>
        <div className="flex flex-col gap-2">
          {answersFor(question).map((answer, i) => {
            const isSelected = selected === i;
            return (
              <label
                key={answer.label}
                className={cx(
                  "flex cursor-pointer items-center gap-3 rounded-control px-4 py-3 text-[16px] leading-snug transition-colors duration-150",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--tone-focus) has-[:focus-visible]:outline-solid",
                  isSelected ? "bg-sage font-medium text-forest" : "bg-newsprint-hover text-carbon hover:bg-sage/50"
                )}
              >
                <input
                  type="radio"
                  name={`${id}-answer`}
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onPick(i)}
                />
                <span
                  aria-hidden="true"
                  className={cx(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-forest bg-forest" : "border-carbon/40"
                  )}
                >
                  {isSelected && <span className="size-2 rounded-full bg-newsprint" />}
                </span>
                {answer.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {missing && (
        <p id={`${id}-missing`} role="alert" className="type-small mt-4 mb-0 font-medium text-carbon">
          Pick an answer to continue
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        {index > 0 ? (
          <button type="button" onClick={onBack} className="link type-button cursor-pointer border-0 bg-transparent p-0">
            ← Back
          </button>
        ) : (
          <span />
        )}
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

function ScoreCard({
  result,
  titleRef,
  email,
  emailError,
  onEmail,
  onSubmit,
}: {
  result: QuickScoreResult;
  titleRef: React.RefObject<HTMLParagraphElement | null>;
  email: string;
  emailError: boolean;
  onEmail: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  const id = useId();
  const size = 112;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="card card-pad">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-sage-25" />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - result.overall / 100)}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="stroke-canopy"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-wordmark text-[44px] leading-none text-carbon">{result.overall}</span>
            <span className="text-[12px] text-flint">out of 100</span>
          </div>
        </div>
        <div>
          <p ref={titleRef} tabIndex={-1} className="type-h3 m-0 focus:outline-none">
            Your quick score<span className="sr-only">: {result.overall} out of 100</span>
          </p>
          <p className="type-small mt-1.5 mb-0">Based on 8 answers. A full assessment goes much deeper.</p>
        </div>
      </div>

      <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
        {result.areas.map((a) => (
          <li key={a.area} className="grid grid-cols-[minmax(0,10em)_minmax(0,1fr)_2em] items-center gap-3">
            <span className="text-[15px] text-carbon">{a.area}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-sage-25" aria-hidden="true">
              <span className={cx("block h-full rounded-full", bandBar[a.band])} style={{ width: `${Math.max(a.score, 3)}%` }} />
            </span>
            <span className={cx("text-right font-wordmark text-[24px] leading-none", bandText[a.band])}>
              <span className="sr-only">{a.score} out of 100, grade </span>
              {a.grade}
            </span>
          </li>
        ))}
      </ul>

      <p className="type-body mt-5 mb-0">
        Your biggest gaps: <span className="font-medium text-accent-2">{result.gaps[0]}</span> and{" "}
        <span className="font-medium text-accent-2">{result.gaps[1]}</span>
      </p>

      <form noValidate onSubmit={onSubmit} className="mt-7 border-t border-hairline pt-6">
        <p className="type-h4 m-0 mb-3">Get your quick score report by email</p>
        <div className="flex flex-wrap items-start gap-2.5 sm:flex-nowrap">
          <Input
            label="Email address"
            hideLabel
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            value={email}
            onChange={(event) => onEmail(event.target.value)}
            aria-invalid={emailError || undefined}
            aria-describedby={emailError ? `${id}-email-error` : undefined}
            className="min-w-0 flex-1 basis-56"
          />
          <Button type="submit" className="shrink-0">
            Email my report
          </Button>
        </div>
        {emailError && (
          <p id={`${id}-email-error`} role="alert" className="type-small mt-2 mb-0 font-medium text-carbon">
            Enter a valid email address, like name@business.com
          </p>
        )}
        <p className="type-small mt-3 mb-0">
          [ What they&apos;ll receive: the quick score report and info about the program ]
        </p>
      </form>
    </div>
  );
}
