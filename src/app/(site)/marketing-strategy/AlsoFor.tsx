import Link from "next/link";
import type { ReactNode } from "react";
import { SubBrandWordmark } from "@/components";

/**
 * "Also for destinations": three linked items under 2px Canopy rules, each
 * with a 96px designed thumbnail (no faces), a title with "→" and one line.
 * The whole item is the link; the title turns pink on hover and focus.
 */
const ITEMS: { href: string; title: string; line: string; thumb: ReactNode }[] = [
  {
    href: "/custom-training",
    title: "Custom Training",
    line: "Courses and live sessions for your operators, with funded seats.",
    thumb: (
      <span className="relative block size-full bg-forest">
        <span className="absolute top-[22px] left-[16px] h-[44px] w-[34px] -rotate-6 rounded-[5px] bg-newsprint" />
        <span className="absolute top-[26px] left-[34px] h-[44px] w-[34px] rotate-2 rounded-[5px] bg-carbon" />
        <span className="absolute top-[30px] left-[52px] h-[44px] w-[34px] rotate-6 rounded-[5px] bg-sage" />
      </span>
    ),
  },
  {
    href: "/junctionu",
    title: "JunctionU",
    line: "Self-paced courses and free Tourism Talks for operators.",
    thumb: (
      <span className="ju flex size-full items-end p-3">
        <SubBrandWordmark suffix="U" className="text-[13px] text-newsprint" />
      </span>
    ),
  },
  {
    href: "/speaking",
    title: "Speaking",
    line: "Keynotes and workshops for your conference or AGM.",
    thumb: (
      <span className="relative block size-full overflow-hidden bg-stage">
        <span className="spot-pool absolute -top-6 left-1/2 size-[110px] -translate-x-1/2" />
        <span className="absolute top-[38px] left-1/2 flex h-[30px] w-[46px] -translate-x-1/2 flex-col justify-center gap-1.5 rounded-[3px] bg-newsprint px-2">
          <span className="h-[3px] w-full rounded-full bg-carbon/40" />
          <span className="h-[3px] w-2/3 rounded-full bg-carbon/25" />
        </span>
      </span>
    ),
  },
];

export function AlsoFor() {
  return (
    <ul className="m-0 grid list-none gap-8 p-0">
      {ITEMS.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="group flex items-start gap-5 border-t-2 border-canopy pt-5 no-underline">
            <span aria-hidden="true" className="size-24 shrink-0 overflow-hidden rounded-[12px]">
              {item.thumb}
            </span>
            <span className="block pt-1">
              <span className="block font-display text-[22px] leading-tight font-semibold tracking-[-0.015em] text-carbon transition-colors duration-150 group-hover:text-break-on-light group-focus-visible:text-break-on-light">
                {item.title} →
              </span>
              <span className="type-body mt-1.5 block">{item.line}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
