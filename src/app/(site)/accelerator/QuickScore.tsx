"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Button, Eyebrow, LeadCapture, LEAD_SUCCESS, cx } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { FORM_NAMES } from "@/lib/forms";
import {
  QUESTIONS,
  answersFor,
  scoreQuickCheck,
  type QuickScoreResult,
  type ScoreBand,
} from "@/lib/quickScore";

/*
 * Free quick check: a deck of three cards (question → score → thanks).
 *
 * The score is worked out and shown in the browser. The score card ends
 * with an email capture (LeadCapture) that submits the answers and scores
 * to the Netlify form "lead-quick-score"; we reply by hand (no automated
 * report).
 */

type Step = "question" | "score" | "inbox";

const EASE = [0.22, 1, 0.36, 1] as const;

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

  /** Everything the lead form sends: each question with the chosen answer, and the scores. */
  function leadData(): Record<string, string> {
    if (!result) return {};
    return {
      score: `${result.overall} / 100`,
      area_scores: result.areas.map((a) => `${a.area}: ${a.score} / 100 (${a.grade})`).join("\n"),
      biggest_gaps: result.gaps.join(", "),
      answers: QUESTIONS.map((q, i) => `${q.text} — ${answersFor(q)[answers[i] ?? -1]?.label ?? "(no answer)"}`).join("\n"),
    };
  }

  function retake() {
    setAnswers(QUESTIONS.map(() => null));
    setIndex(0);
    setMissing(false);
    setResult(null);
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
            <ScoreCard result={result} titleRef={titleRef} leadData={leadData} onSent={() => setStep("inbox")} />
          )}
          {step === "inbox" && (
            <div className="tone-carbon card-pad rounded-card" role="status" aria-live="polite">
              <Eyebrow className="m-0">Got it</Eyebrow>
              <p ref={titleRef} tabIndex={-1} className="type-h3 m-0 mt-3 focus:outline-none">
                {LEAD_SUCCESS}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button variant="secondary" href={CALENDLY_URL}>
                  Book a 20-min call
                </Button>
                <button type="button" onClick={retake} className="link type-button cursor-pointer border-0 bg-transparent p-0">
                  Retake the check
                </button>
              </div>
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
  leadData,
  onSent,
}: {
  result: QuickScoreResult;
  titleRef: React.RefObject<HTMLParagraphElement | null>;
  leadData: () => Record<string, string>;
  onSent: () => void;
}) {
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

      <LeadCapture
        formName={FORM_NAMES.quickScore}
        leadMagnet="Quick Score"
        prompt="Want the full breakdown? Leave your email and we'll send it to you personally."
        data={leadData}
        onSent={onSent}
        className="mt-7 border-t border-hairline pt-6"
      />
    </div>
  );
}
