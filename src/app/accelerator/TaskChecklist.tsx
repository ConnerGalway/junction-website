"use client";

import { useState } from "react";
import { cx } from "@/components";

export type Task = { label: string; meta: string };

/** Week-one demo checklist. Each task is a toggle with checkbox semantics. */
export function TaskChecklist({ tasks }: { tasks: Task[] }) {
  const [done, setDone] = useState<boolean[]>(() => tasks.map(() => false));
  const total = tasks.length;
  const doneCount = done.filter(Boolean).length;
  const pct = total ? (doneCount / total) * 100 : 0;
  const allDone = total > 0 && doneCount === total;

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="tone-newsprint card-pad rounded-card">
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-3">
        <span className="type-h4">Week 1 · Tracking setup</span>
        <span className="type-small font-medium text-(--tone-text)" aria-live="polite">
          {doneCount} / {total}
        </span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-hairline" aria-hidden="true">
        <div
          className="h-full rounded-full bg-canopy transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {tasks.map((task, i) => (
        <button
          key={task.label}
          type="button"
          role="checkbox"
          aria-checked={done[i]}
          onClick={() => toggle(i)}
          className="flex w-full cursor-pointer items-start gap-3.5 border-b border-hairline bg-transparent py-4 text-left text-(--tone-text)"
        >
          <span
            aria-hidden="true"
            className={cx(
              "mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-control border-[1.5px] border-canopy text-sm font-medium text-newsprint",
              done[i] ? "bg-canopy" : "bg-transparent"
            )}
          >
            {done[i] ? "✓" : ""}
          </span>
          <span className="flex flex-col gap-1">
            <span className={cx("type-body font-medium", done[i] && "line-through")}>
              {task.label}
            </span>
            <span className="type-small">{task.meta}</span>
          </span>
        </button>
      ))}
      {allDone && (
        <p className="type-small mt-4 mb-0 font-medium text-canopy-text">
          Week 1 done. That&apos;s how it feels. →
        </p>
      )}
    </div>
  );
}
