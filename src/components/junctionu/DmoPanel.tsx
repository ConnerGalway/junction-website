import { buildRouteMap } from "@/lib/routeMapGeometry";
import { DriftMap } from "./DriftMap";
import { JuButton } from "./JuButton";

/**
 * For DMOs: a glass panel (Newsprint 7%, blur 14px, saturate 160%, inset
 * 1px Newsprint-18% border, a 1px bright top highlight, soft shadow) over the
 * drifting North America land layer. Two columns: the pitch with one Fern
 * outline action, then (after a thin divider) the Travel Yukon number.
 */
export function DmoPanel() {
  const geo = buildRouteMap();
  const { l, t, r, b } = geo.landPad;
  return (
    <section id="dmos" aria-labelledby="dmos-heading" className="relative scroll-mt-16 px-gutter py-[clamp(96px,12vw,170px)]">
      <DriftMap viewBox={`${-l} ${-t} ${geo.width + l + r} ${geo.height + t + b}`} canada={geo.canada} usa={geo.usa} />
      <div className="ju-glass mx-auto grid max-w-wide gap-x-14 gap-y-10 rounded-[20px] p-[clamp(28px,4.5vw,64px)] lg:grid-cols-[minmax(0,1.5fr)_1px_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="type-eyebrow m-0 text-fern">For DMOs and associations</p>
          <h2 id="dmos-heading" className="ju-display mt-4 mb-0 max-w-[16ch] text-[clamp(34px,3.6vw,50px)]">
            Fund seats for your whole region.
          </h2>
          <p className="type-body mt-6 mb-8 max-w-[52ch] text-newsprint-muted">
            Partners cover 25% to 100% of course costs for their operators. We handle delivery, support and progress
            reporting. Travel Yukon has run it for four years, and 300+ businesses came through.
          </p>
          <JuButton variant="outline" href="/contact?type=training&from=region">
            Talk to us about a region
          </JuButton>
        </div>
        <span aria-hidden="true" className="hidden h-full min-h-40 bg-newsprint/18 lg:block" />
        <div className="border-t border-newsprint/18 pt-8 lg:border-0 lg:pt-0">
          <p className="m-0 font-wordmark text-[clamp(84px,8vw,116px)] leading-[0.85] text-fern">300+</p>
          <p className="type-body mt-4 mb-0 max-w-[26ch] text-newsprint">
            businesses through Travel Yukon&apos;s program in four years.
          </p>
        </div>
      </div>
    </section>
  );
}
