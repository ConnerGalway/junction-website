import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { PAGE_GROUPS, programsOnPage } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Every Junction program in one place. Not sure which fits? Book a 20-min call and we'll point you to the right one.",
};

/**
 * Programs: an editorial index of src/lib/programs.ts in its page groups. No
 * prices, no images, and no lines between rows (padding only).
 */
export default function ProgramsPage() {
  return (
    <>
      {/* Intro */}
      <Section spacing="tight">
        <Container className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
          <h1 className="type-display m-0">Every way we work together.</h1>
          <p className="type-lead m-0">
            Every Junction program in one place. Not sure which fits?{" "}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="link">
              Book a 20-min call
            </a>{" "}
            and we&apos;ll point you to the right one.
          </p>
        </Container>
      </Section>

      {/* Groups */}
      <Section flush="top">
        <Container className="flex flex-col gap-16">
          {PAGE_GROUPS.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`group-${group.id}`}
              className="grid gap-x-12 gap-y-6 border-t-2 border-canopy pt-8 lg:grid-cols-[300px_minmax(0,1fr)]"
            >
              <div>
                <h2 id={`group-${group.id}`} className="type-h3 m-0 lg:text-[32px]">
                  {group.label}
                </h2>
                <p className="type-body m-0 mt-3 max-w-[32ch]">{group.line}</p>
              </div>
              <ul className="m-0 flex list-none flex-col p-0 lg:-mt-5">
                {programsOnPage(group.id).map((program) => (
                  <li key={program.id} id={program.id} className="scroll-mt-28">
                    <Link
                      href={program.href}
                      className="row-link group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 py-5"
                    >
                      <span className="grid gap-x-8 gap-y-1.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-baseline">
                        <span className="row-title type-h3">{program.name}</span>
                        <span className="type-body text-ink-soft">{program.promise}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="row-title text-[22px] transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
