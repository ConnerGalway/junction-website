/**
 * Illustrations for the "What you leave with" carousel (example business:
 * Conner's Cabins). Static and aria-hidden: the label under each card
 * carries the content.
 */

function TextLines({ widths }: { widths: number[] }) {
  return (
    <div className="flex flex-col gap-2">
      {widths.map((w, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-carbon/10" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

export function PolicyArtifact() {
  return (
    <div className="mx-auto flex h-full w-[78%] flex-col gap-3 rounded-control bg-newsprint px-5 pt-5 shadow-card">
      <div>
        <p className="m-0 font-display text-[16px] leading-tight font-black tracking-[-0.02em] text-carbon">AI use policy</p>
        <p className="m-0 mt-1 text-[12px] text-flint">Conner&apos;s Cabins · 1 page</p>
      </div>
      <span className="block h-0.5 w-8 rounded-full bg-canopy" />
      <TextLines widths={[100, 92, 96, 70]} />
      <TextLines widths={[100, 88, 60]} />
    </div>
  );
}

export function BrainArtifact() {
  const files = ["Price list 2026", "Terms and policies", "How we write", "Past quotes (48)"];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-control bg-newsprint shadow-card">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-2 rounded-full bg-carbon/15" />
          <span className="size-2 rounded-full bg-carbon/15" />
          <span className="size-2 rounded-full bg-carbon/15" />
        </span>
        <span className="ml-2 text-[13px] font-medium text-carbon">Business brain</span>
      </div>
      <ul className="m-0 flex list-none flex-col gap-0.5 px-3 py-2">
        {files.map((f) => (
          <li key={f} className="flex items-center gap-2.5 px-2 py-1 text-[13px] text-ink-soft">
            <span className="h-3.5 w-3 shrink-0 rounded-[2px] border-[1.5px] border-canopy" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MainBuildArtifact() {
  return (
    <div className="tone-carbon flex h-full flex-col gap-2 rounded-control px-4 py-3">
      <p className="m-0 text-[11px] font-medium tracking-[0.1em] whitespace-nowrap text-fern uppercase">
        Main build · Quote generator
      </p>
      <p className="m-0 text-[12px] leading-snug text-newsprint-muted">
        &ldquo;Re-stain two cabin decks, about 400 sq ft&rdquo;
      </p>
      <ul className="m-0 list-none p-0">
        {[
          ["Deck stain, 4 gal", "$212.00"],
          ["Labour, 1.5 days", "$1,020.00"],
        ].map(([label, price]) => (
          <li key={label} className="flex items-baseline justify-between border-b border-hairline-dark py-1 text-[13px] text-newsprint">
            <span>{label}</span>
            <span className="font-wordmark text-[20px] leading-none text-price-on-dark">{price}</span>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-auto flex items-center gap-2 text-[13px] font-medium text-newsprint">
        <span className="size-2 rounded-full bg-fern" />
        In daily use
      </p>
    </div>
  );
}

export function SecondBuildArtifact() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-control border-[1.5px] border-dashed border-carbon/30 px-5 py-4">
      <p className="m-0 text-[12px] font-medium tracking-[0.08em] text-flint uppercase">In progress</p>
      <p className="m-0 font-display text-[18px] leading-tight font-black tracking-[-0.02em] text-carbon">
        Collections assistant
      </p>
      <span className="block h-1.5 overflow-hidden rounded-full bg-sage-25">
        <span className="block h-full w-[45%] rounded-full bg-accent-1-on-light" />
      </span>
      <p className="m-0 mt-auto text-[13px] text-ink-soft">Built by your team</p>
    </div>
  );
}

export function RoadmapArtifact() {
  const items = [
    ["Invoice matching", "4"],
    ["Guest follow-ups", "3"],
    ["Weekly report", "2"],
  ];
  return (
    <div className="flex h-full flex-col rounded-control bg-newsprint px-5 py-4 shadow-card">
      <p className="m-0 font-display text-[16px] leading-tight font-black tracking-[-0.02em] text-carbon">What&apos;s next</p>
      <ul className="m-0 mt-2 list-none p-0">
        {items.map(([label, hours]) => (
          <li key={label} className="flex items-baseline justify-between border-b border-hairline py-2 text-[13px] text-ink-soft last:border-b-0">
            <span>{label}</span>
            <span className="font-wordmark text-[24px] leading-none text-accent-1-on-light">
              {hours} h/wk
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
