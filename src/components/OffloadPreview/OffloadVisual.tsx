import { cx } from "../ui/cx";

/**
 * The Offload Program visual: the 30-day journey and a Session 3 build (a
 * quote generator) for the example business, Conner's Cabins. Static
 * illustration; OffloadPreview wraps it (hero or thumbnail).
 */
const journey = [
  { num: "01", title: "Foundations", state: "done" },
  { num: "02", title: "Business brain", state: "done" },
  { num: "03", title: "Documents", state: "current" },
  { num: "04", title: "Go live", state: "upcoming" },
] as const;

const barColour = {
  done: "bg-canopy",
  current: "bg-fern",
  upcoming: "bg-sage-25",
} as const;

const lineItems = [
  { label: "Deck stain, 4 gal", price: "$212.00" },
  { label: "Prep and wash", price: "$180.00" },
  { label: "Labour, 1.5 days", price: "$1,020.00" },
];

export function OffloadVisual() {
  return (
    <div className="flex flex-col gap-4 select-none">
      {/* (a) Journey track */}
      <div className="card px-6 py-5">
        <ol className="m-0 grid list-none grid-cols-4 gap-3 p-0">
          {journey.map((step) => (
            <li key={step.num} className="flex flex-col gap-2">
              <span className="font-wordmark text-[28px] leading-none text-accent-1-on-light">{step.num}</span>
              <span className="mb-1 text-[14px] leading-tight font-medium text-carbon">{step.title}</span>
              <span className={cx("mt-auto h-1.5 rounded-full", barColour[step.state])} />
            </li>
          ))}
        </ol>
      </div>

      {/* (b) Session 3 build */}
      <div className="card px-6 py-5">
        <p className="type-eyebrow m-0">Session 3 build · Quote generator</p>
        <div className="mt-4 rounded-control border-[1.5px] border-hairline bg-newsprint px-4 py-3 text-[15px] leading-snug">
          <span className="text-flint">Describe the job… </span>
          <span className="text-carbon">&ldquo;Re-stain two cabin decks, about 400 sq ft&rdquo;</span>
        </div>
        <ul className="m-0 mt-4 list-none p-0">
          {lineItems.map((item) => (
            <li
              key={item.label}
              className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5 text-[15px] text-carbon"
            >
              <span>{item.label}</span>
              <span className="type-price text-[24px]">{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
          <span className="type-small">Drafted in your format · ready to send</span>
          <span className="type-price text-[32px]">$1,412.00</span>
        </div>
      </div>
    </div>
  );
}
