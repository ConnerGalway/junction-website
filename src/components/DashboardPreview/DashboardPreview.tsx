"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "../ui/cx";
import { areas, phases, tactics, weeks, type GradeTone } from "./data";

/**
 * Interactive preview of the Accelerator dashboard (an example business).
 * A port of the approved prototype,
 * design/redesign/accelerator-dashboard-prototype-v3.html: same layout,
 * content and behaviour, with colours, fonts and radii mapped to the site
 * tokens (`.dp-*` in globals.css).
 *
 * Display only: the sidebar and the tactic tabs switch views; nothing
 * navigates, nothing saves and the checkboxes aren't interactive.
 *
 * It's drawn at its design size (1280×760) and scaled down with a CSS
 * transform to fit the width of its container.
 */
const DESIGN_W = 1280;
const DESIGN_H = 760;

type ViewId = "dash" | "assess" | "strat" | "t0" | "t1" | "t2" | "road";

const nav: { group: string; items: { id: ViewId; label: string; dot?: boolean; badge?: string }[] }[] = [
  { group: "Overview", items: [{ id: "dash", label: "Dashboard" }] },
  {
    group: "The thinking",
    items: [
      { id: "assess", label: "Assessment" },
      { id: "strat", label: "Strategy" },
    ],
  },
  {
    group: "The tactics",
    items: tactics.map((t, i) => ({ id: `t${i}` as ViewId, label: t.name, dot: true })),
  },
  { group: "Your plan", items: [{ id: "road", label: "90-day roadmap", dot: true, badge: "25%" }] },
];

const tabOrder = nav.flatMap((g) => g.items.map((item) => item.id));

const gradeBg: Record<GradeTone, string> = {
  gold: "bg-accent-1-on-light",
  canopy: "bg-canopy",
  copper: "bg-accent-2",
};

export function DashboardPreview({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / DESIGN_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      role="region"
      aria-label="Interactive Accelerator dashboard preview, example business"
      className={cx("relative aspect-[1280/760] w-full", className)}
    >
      <div
        className={cx(
          "absolute top-0 left-0 origin-top-left transition-opacity duration-300",
          scale === null && "opacity-0"
        )}
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale ?? 1})` }}
      >
        <DashboardApp />
      </div>
    </div>
  );
}

function DashboardApp() {
  const [view, setView] = useState<ViewId>("dash");
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<ViewId, HTMLButtonElement | null>>>({});
  const baseId = useId();
  const tabId = (id: ViewId) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  function show(id: ViewId) {
    setView(id);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  function onTabKeyDown(event: KeyboardEvent, id: ViewId) {
    const i = tabOrder.indexOf(id);
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (i + 1) % tabOrder.length;
    else if (event.key === "ArrowUp") next = (i - 1 + tabOrder.length) % tabOrder.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabOrder.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = tabOrder[next];
    tabRefs.current[target]?.focus();
    show(target);
  }

  const tacticIndex = view[0] === "t" && view.length === 2 ? Number(view[1]) : null;

  return (
    <div className="dp-app">
      <aside className="dp-aside">
        <div className="dp-tracker">
          <div className="flex items-center gap-3">
            <Ring size={44} r={18} width={5} pct={25} track="stroke-sage-25" fill="stroke-canopy" />
            <div>
              <b className="block font-wordmark text-[24px] leading-none font-normal">7 of 28</b>
              <small className="text-[12px] text-flint">tasks checked off</small>
            </div>
          </div>
          <small className="text-[12px] text-flint">Day 10 of 90 · week 2</small>
        </div>
        <div role="tablist" aria-orientation="vertical" aria-label="Dashboard sections" className="flex flex-col">
          {nav.map((group) => (
            <div key={group.group} className="contents">
              <p className="dp-grp" aria-hidden="true">
                {group.group}
              </p>
              {group.items.map((item) => {
                const selected = item.id === view;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[item.id] = el;
                    }}
                    id={tabId(item.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => show(item.id)}
                    onKeyDown={(event) => onTabKeyDown(event, item.id)}
                    className="dp-tab"
                  >
                    {item.dot && <span className="dp-dot" aria-hidden="true" />}
                    {item.label}
                    {item.badge && <span className="dp-badge">{item.badge}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="dp-side-foot" aria-hidden="true">
          ? &nbsp;Replay welcome tour
        </div>
      </aside>

      <div className="dp-main">
        <div
          ref={scrollRef}
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(view)}
          tabIndex={0}
          className="dp-scroll"
        >
          <section key={view} className="dp-view">
            {view === "dash" && <DashboardView />}
            {view === "assess" && <AssessmentView />}
            {view === "strat" && <StrategyView />}
            {view === "road" && <RoadmapView />}
            {tacticIndex !== null && <TacticView index={tacticIndex} />}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared pieces ─── */

function Ring({
  size,
  width,
  pct,
  r = (size - width) / 2,
  track = "stroke-newsprint-hover",
  fill = "stroke-fern",
}: {
  size: number;
  width: number;
  pct: number;
  r?: number;
  track?: string;
  fill?: string;
}) {
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="shrink-0">
      <circle cx={mid} cy={mid} r={r} fill="none" strokeWidth={width} className={track} />
      <circle
        cx={mid}
        cy={mid}
        r={r}
        fill="none"
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={c.toFixed(1)}
        strokeDashoffset={(c * (1 - pct / 100)).toFixed(1)}
        transform={`rotate(-90 ${mid} ${mid})`}
        className={fill}
      />
    </svg>
  );
}

function Task({ children, state, onDark }: { children: ReactNode; state?: "open" | "done"; onDark?: boolean }) {
  return (
    <div className={cx("dp-task", onDark && "text-newsprint")} data-state={state}>
      <span className="dp-chk" data-on={state === "done" ? "" : undefined} aria-hidden="true" />
      {children}
      {state === "done" && <span className="sr-only"> (done)</span>}
    </div>
  );
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className={cx("dp-bar", className)} aria-hidden="true">
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ─── Views ─── */

function DashboardView() {
  return (
    <>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="dp-meta">Day 10 of 90</p>
          <p className="dp-h1">Good to see you, Conner&apos;s Cabins</p>
        </div>
      </div>

      <div className="dp-card grid grid-cols-[150px_minmax(0,1fr)] items-center gap-7 !px-6 !py-[22px]">
        <div className="relative size-[150px]">
          <Ring size={150} r={64} width={13} pct={25} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="dp-num text-[44px] text-carbon">25%</span>
            <span className="dp-small">7 of 28 tasks</span>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <p className="dp-h2">The rhythm is holding.</p>
          <div>
            <p className="dp-meta mb-1.5">The 90 days</p>
            <div className="relative h-0.5 bg-hairline">
              <span className="absolute top-0 left-0 h-0.5 w-1/4 bg-canopy" />
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-3">
              {phases.map((phase, i) => (
                <div key={phase.weeks}>
                  <p className="dp-meta">{phase.weeks}</p>
                  <p className={cx("dp-h4 mt-[3px]", i === 0 ? "text-canopy-text" : "text-flint")}>{phase.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dp-dark grid grid-cols-[minmax(0,1fr)_190px] gap-0 overflow-hidden !p-0">
        <div className="flex flex-col gap-3 px-6 py-[22px]">
          <p className="dp-meta">Your next step · Week 2 · Content system</p>
          <p className="dp-h2 max-w-[22ch] !text-[24px]">Film your first weekly content session</p>
          <div className="flex flex-col gap-0.5">
            <Task onDark>Shoot the cabins at golden hour</Task>
            <Task onDark>Edit three short clips</Task>
            <Task onDark>Write captions from your content pillars</Task>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 border-l border-hairline-dark px-5 py-[22px]">
          <div>
            <p className="dp-meta">Tactic</p>
            <p className="dp-h4 mt-1">Content system</p>
          </div>
          <div>
            <p className="dp-meta">Time needed</p>
            <p className="dp-h4 mt-1">45 min</p>
          </div>
          <div>
            <p className="dp-meta">Who</p>
            <p className="dp-h4 mt-1">You + one teammate</p>
          </div>
          <div className="mt-auto">
            <div className="dp-small flex justify-between text-newsprint/70">
              <span>Week 2 tasks</span>
              <span>2 of 7</span>
            </div>
            <Bar pct={29} className="mt-1.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tactics.map((t) => (
          <div key={t.name} className="dp-card flex flex-col gap-2.5">
            <Ring size={40} width={5} pct={t.pct} />
            <p className="dp-h4">{t.name}</p>
            <p className="dp-small m-0">{t.done}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function AssessmentView() {
  return (
    <>
      <p className="dp-meta">Your assessment · example</p>

      <div className="dp-dark grid grid-cols-[150px_minmax(0,1fr)] items-center gap-[26px]">
        <div className="relative size-[140px]">
          <Ring size={140} r={60} width={12} pct={64} track="stroke-hairline-dark" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span className="dp-num text-[46px] text-newsprint">64</span>
            <span className="dp-small text-newsprint/65">out of 100</span>
            <span className="dp-pill min-h-[18px] bg-fern px-2 text-[11px] text-carbon">C+</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="dp-h2 !text-[24px]">Where you&apos;re starting from</p>
          <p className="dp-p">Great reviews, held back by hard-to-find booking.</p>
        </div>
      </div>

      <div className="dp-card flex flex-col gap-2.5 border-l-[3px] !border-l-canopy">
        <div className="flex items-center gap-2.5">
          <span className="dp-grade size-[22px] rounded-full bg-canopy text-[13px]">1</span>
          <p className="dp-meta">The number one priority</p>
        </div>
        <p className="dp-h3 !text-[18px]">Put booking in the main menu.</p>
        <span className="dp-pill self-start bg-accent-2/12 text-accent-2">Booking · 20 min · high impact</span>
      </div>

      <div className="flex flex-col gap-2.5 rounded-card bg-sage-25 px-5 py-[18px]">
        <p className="dp-h3 text-forest">Quick wins</p>
        {[
          ["Add booking to your Instagram bio", "5 min"],
          ["Reply to unanswered reviews", "20 min"],
        ].map(([task, time], i) => (
          <div key={task} className="dp-card flex items-center gap-3 !px-3.5 !py-3">
            <span className="dp-grade size-5 rounded-full bg-canopy text-[12px]">{i + 1}</span>
            <p className="dp-h4 flex-1">{task}</p>
            <span className="dp-small">{time}</span>
          </div>
        ))}
      </div>

      <p className="dp-h3">The six areas</p>
      <div className="dp-card flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <span className="dp-grade bg-accent-2">D</span>
          <p className="dp-h3 flex-1">Booking and conversion</p>
          <span className="dp-small" aria-hidden="true">
            ⌃
          </span>
        </div>
        <p className="dp-p">Booking is three clicks deep and slow on phones.</p>
        <div className="grid grid-cols-4 overflow-hidden rounded-control border border-hairline">
          {[
            ["Mobile speed", "41/100", "text-accent-2"],
            ["Desktop speed", "68/100", "text-accent-1-on-light"],
            ["Clicks to book", "3", "text-accent-2"],
            ["Security", "Passing", "text-canopy-text"],
          ].map(([label, value, tone], i) => (
            <div key={label} className={cx("flex flex-col gap-1.5 px-4 py-3", i > 0 && "border-l border-hairline")}>
              <p className="dp-meta !text-[10px]">{label}</p>
              <span className={cx("dp-num text-[26px]", tone)}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {areas.map((area) => (
          <div key={area.name} className="dp-card flex items-center gap-3 !px-3.5 !py-3">
            <span className={cx("dp-grade", gradeBg[area.tone])}>{area.grade}</span>
            <p className="dp-h4 flex-1">{area.name}</p>
            <span className="dp-small" aria-hidden="true">
              ⌄
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function StrategyView() {
  const objectives = [
    { title: "A steady posting rhythm", measure: "no missed weeks", rule: "!border-l-sage" },
    { title: "Ads behind proven posts", measure: "cost per booking", rule: "!border-l-canopy" },
    { title: "More recent reviews", measure: "60+ reviews", rule: "!border-l-forest" },
  ];
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <p className="dp-meta">Your strategy</p>
        <p className="dp-h1">The 90-day thesis</p>
      </div>

      <div className="dp-card flex flex-col gap-2 border-l-[3px] !border-l-sage !px-6 !py-[22px]">
        <p className="dp-meta">The goal</p>
        <p className="dp-h2 max-w-[24ch] !text-[24px] !leading-[1.15]">Fill midweek stays in the shoulder season.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="dp-card flex flex-col gap-1.5">
          <p className="dp-h3">Positioning</p>
          <p className="dp-p">Lead with the lake and the quiet mornings.</p>
        </div>
        <div className="dp-card flex flex-col gap-1.5 !border-transparent !bg-newsprint-hover">
          <p className="dp-h3">What we&apos;re not doing</p>
          <p className="dp-p">No new channels, no website rebuild.</p>
        </div>
      </div>

      <p className="dp-h3">Three objectives</p>
      <div className="grid grid-cols-3 gap-3">
        {objectives.map((o, i) => (
          <div key={o.title} className={cx("dp-card relative flex flex-col gap-2.5 border-l-[3px]", o.rule)}>
            <span className="dp-ghost" aria-hidden="true">
              {i + 1}
            </span>
            <p className="dp-h3 max-w-[12ch]">{o.title}</p>
            <p className="dp-small m-0">
              <b className="font-medium text-carbon">Measured by</b> · {o.measure}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function RoadmapView() {
  return (
    <>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="dp-meta">Weeks 1–4 · your action plan</p>
          <p className="dp-h1">Week by week</p>
          <p className="dp-small m-0">Check things off as you go. Everything saves itself.</p>
        </div>
        <div className="text-right">
          <span className="dp-num text-[40px]">7</span>
          <span className="dp-num text-[22px] text-flint">/28</span>
          <p className="dp-small m-0">roadmap tasks done</p>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_220px] items-start gap-4">
        <div className="grid gap-2.5">
          {weeks.map((week) => (
            <div key={week.id} className="dp-card flex flex-col gap-2 !px-4 !py-3.5">
              <div className="flex items-center gap-3">
                <span className="dp-wk">{week.id}</span>
                <p className="dp-h3 flex-1">{week.title}</p>
                <span className="dp-small">{week.done} / 7</span>
                <Bar pct={(week.done / 7) * 100} className="w-20" />
              </div>
              {week.tasks.length > 0 && (
                <div className="flex flex-col gap-1">
                  {week.tasks.map((task, i) => (
                    <Task key={task} state={week.checked[i] ? "done" : "open"}>
                      {task}
                    </Task>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="dp-dark flex flex-col gap-2">
            <p className="dp-meta">Right now</p>
            <p className="dp-h3">W2 · Start the content rhythm</p>
            <Bar pct={29} />
            <p className="dp-small m-0 text-newsprint/70">2 of 7 tasks done</p>
          </div>
          <div className="dp-card flex flex-col gap-2.5">
            <p className="dp-meta">The 90 days</p>
            {phases.map((phase) => (
              <div key={phase.weeks} className="border-t border-hairline pt-2">
                <p className="dp-meta !text-[10px]">{phase.weeks}</p>
                <p className="dp-h4">{phase.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const tacticTabs = ["Overview", "Implementation steps", "Success metrics", "Tips and resources"];

function TacticView({ index }: { index: number }) {
  // Keyed by index (via the view key), so the inner tab resets per tactic.
  const t = tactics[index];
  const [tab, setTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent, k: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (k + 1) % tacticTabs.length;
    else if (event.key === "ArrowLeft") next = (k - 1 + tacticTabs.length) % tacticTabs.length;
    if (next === null) return;
    event.preventDefault();
    tabRefs.current[next]?.focus();
    setTab(next);
  }

  return (
    <>
      <div className="dp-dark flex flex-col gap-2.5 !bg-forest !px-6 !pt-[22px] !pb-0">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <p className="dp-meta">
                Tactic {t.n} · {t.kind}
              </p>
              <span className="dp-pill min-h-5 bg-fern text-[11px] text-carbon">{t.status}</span>
            </div>
            <p className="dp-h1 text-newsprint">{t.name}</p>
            <p className="dp-p max-w-[52ch]">{t.desc}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Ring size={72} width={8} pct={t.pct} track="stroke-hairline-dark" />
            <div>
              <span className="dp-num text-[30px]">{t.pct}%</span>
              <p className="dp-small m-0 text-newsprint/65">of this tactic</p>
            </div>
          </div>
        </div>
        <div role="tablist" aria-label="Tactic sections" className="mt-1.5 flex gap-1">
          {tacticTabs.map((name, k) => (
            <button
              key={name}
              ref={(el) => {
                tabRefs.current[k] = el;
              }}
              id={`${baseId}-tab-${k}`}
              type="button"
              role="tab"
              aria-selected={k === tab}
              aria-controls={`${baseId}-panel-${k}`}
              tabIndex={k === tab ? 0 : -1}
              onClick={() => setTab(k)}
              onKeyDown={(event) => onKeyDown(event, k)}
              className="dp-ttab"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div id={`${baseId}-panel-${tab}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`}>
        {tab === 0 && (
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3">
            <div className="grid gap-3">
              <div className="dp-card">
                <p className="dp-meta">What this is</p>
                <p className="dp-p mt-2 !text-[15px] !text-carbon">{t.what}</p>
              </div>
              <div className="dp-card">
                <p className="dp-meta">The four pillars</p>
                <div className="mt-2.5 grid grid-cols-2 gap-3">
                  {t.pillars.map(([title, note]) => (
                    <div key={title} className="dp-tile">
                      <p className="dp-h4">{title}</p>
                      <p className="dp-small m-0 mt-[3px]">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid content-start gap-3">
              <div className="dp-dark !bg-forest">
                <p className="dp-meta">What we heard from you</p>
                <p className="dp-p mt-2 !text-newsprint">{t.heard}</p>
              </div>
              <div className="dp-card">
                <p className="dp-meta">Why it matters</p>
                <p className="dp-p mt-2">{t.why}</p>
              </div>
              <div className="dp-card">
                <p className="dp-meta">Time commitment</p>
                <p className="dp-h4 mt-1.5">{t.time}</p>
              </div>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className="grid gap-2">
            {t.steps.map((step, k) => (
              <div key={step} className="dp-card flex items-center gap-3.5 !px-4 !py-3.5">
                <span className="dp-num w-[30px] text-[26px] text-accent-1-on-light">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <p className="dp-h4 flex-1">{step}</p>
                <span className="dp-chk" aria-hidden="true" />
              </div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div className="grid grid-cols-3 gap-3">
            {t.metrics.map(([label, value]) => (
              <div key={label} className="dp-card">
                <p className="dp-meta">{label}</p>
                <span className="dp-num mt-2 block text-[40px] text-accent-1-on-light">{value}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 3 && (
          <div className="grid gap-2">
            {t.tips.map((tip) => (
              <div key={tip} className="dp-card !px-4 !py-3.5">
                <p className="dp-p !text-carbon">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
