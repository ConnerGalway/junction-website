import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, cx } from "@/components";
import { getPrivacyPolicy, type Block, type Inline } from "@/lib/privacyPolicy";
import { PolicyToc } from "./PolicyToc";

export const metadata: Metadata = {
  title: { absolute: "Privacy policy — Junction" },
  description: "How Junction collects, uses and discloses your personal information.",
};

function Runs({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((r, i) =>
        r.email ? (
          <a key={i} href={`mailto:${r.text}`} className="link">
            {r.text}
          </a>
        ) : r.bold ? (
          <strong key={i} className="font-semibold text-carbon">
            {r.text}
          </strong>
        ) : (
          <span key={i}>{r.text}</span>
        )
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i): ReactNode => {
        if (b.type === "h3") {
          return (
            <h3 key={i} className="type-h4 mt-10 mb-0 text-carbon">
              {b.text}
            </h3>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {b.items.map((item, j) => (
                <li key={j} className="relative pl-6">
                  <span aria-hidden="true" className="absolute top-[0.66em] left-1 size-1.5 rounded-full bg-canopy" />
                  <Runs runs={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="m-0 mt-5">
            <Runs runs={b.content} />
          </p>
        );
      })}
    </>
  );
}

/**
 * Privacy policy: content/privacy-policy.md rendered as written (see
 * src/lib/privacyPolicy.ts). A Newsprint page: the H1 at H2 scale with the
 * "Last updated" line, then from 1024px a sticky table of contents beside a
 * 620px reading column in DM Sans 300, 17px, line-height 1.65 (about 70
 * characters a line; DM Sans's wide "0" makes 68ch read longer). The Contact
 * section sits in a sage-25 box. Below 1024px the contents collapse into
 * "On this page" at the top.
 */
export default function PrivacyPolicyPage() {
  const policy = getPrivacyPolicy();
  const items = policy.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="px-gutter pt-section-tight pb-section">
      <Container>
        <header className="max-w-[620px] lg:ml-[calc(240px+64px)]">
          <h1 className="type-h2 m-0">{policy.title}</h1>
          {policy.updated && <p className="type-small m-0 mt-4">{policy.updated}</p>}
        </header>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[240px_minmax(0,620px)] lg:gap-16">
          <div className="min-w-0">
            <PolicyToc items={items} />
          </div>

          <article className="policy-text min-w-0 text-[17px] leading-[1.65] font-light text-ink-soft">
            <div className="[&>p:first-child]:mt-0">
              <Blocks blocks={policy.intro} />
            </div>
            {policy.sections.map((section, i) => {
              const isContact = i === policy.sections.length - 1 && /^contact/i.test(section.title);
              return (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-h`}
                  className={cx("scroll-mt-28", isContact ? "mt-16 rounded-card bg-sage-25 p-[clamp(20px,3vw,32px)] text-forest" : "mt-16")}
                >
                  <h2 id={`${section.id}-h`} className={cx("type-h3 m-0", isContact ? "text-forest" : "text-carbon")}>
                    {section.title}
                  </h2>
                  <Blocks blocks={section.blocks} />
                </section>
              );
            })}
          </article>
        </div>
      </Container>
    </div>
  );
}
