import Link from "next/link";
import { SubBrandWordmark } from "@/components";
import { JU_NAV } from "@/lib/junctionu";

/** JunctionU footer (ju-deep): the wordmark, the nav links and a way back to the main site. */
export function JuFooter() {
  return (
    <footer className="bg-ju-deep px-gutter py-14">
      <div className="mx-auto flex max-w-wide flex-wrap items-start justify-between gap-x-12 gap-y-8">
        <SubBrandWordmark suffix="U" className="text-[30px] text-newsprint" />
        <nav aria-label="JunctionU footer" className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
          {JU_NAV.map((l) => (
            <Link key={l.label} href={l.href} className="text-newsprint-muted no-underline hover:text-break-on-dark">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="text-[15px] font-medium text-fern hover:text-break-on-dark">
          Part of Junction →
        </Link>
      </div>
    </footer>
  );
}
