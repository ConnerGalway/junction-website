import Link from "next/link";
import { SocialLinks } from "@/components";
import { ELEARNINGU_SOCIALS } from "@/lib/constants";
import { JU_NAV } from "@/lib/junctionu";
import { EluWordmark } from "./EluWordmark";

/** eLearningU footer (ju-deep): the wordmark, the nav links and a way back to the main site. */
export function JuFooter({ logo }: { logo?: string | null }) {
  return (
    <footer className="bg-ju-deep px-gutter py-14">
      <div className="mx-auto flex max-w-wide flex-wrap items-start justify-between gap-x-12 gap-y-8">
        <div className="flex flex-col gap-4">
          <EluWordmark logo={logo} className="text-[30px] text-newsprint" />
          <SocialLinks links={[...ELEARNINGU_SOCIALS]} label="eLearningU on social media" />
        </div>
        <nav aria-label="eLearningU footer" className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
          {JU_NAV.map((l) => (
            <Link key={l.label} href={l.href} className="text-newsprint-muted no-underline hover:text-break-on-dark">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-2">
          <Link href="/" className="text-[15px] font-medium text-fern hover:text-break-on-dark">
            Part of Junction →
          </Link>
          <Link href="/privacy-policy" className="text-[13px] text-newsprint-muted hover:text-break-on-dark">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
