import Link from "next/link";
import { CALENDLY_URL, JUNCTION_SOCIALS } from "@/lib/constants";
import type { NavGroup } from "@/lib/navigation";
import { DROPDOWN_GROUPS, footerProgramsIn } from "@/lib/programs";
import { Container, LogoLockup, NewsletterSignup, SocialLinks } from "./ui";

/** Program columns from the shared list (page names), then Company. */
const footerGroups: NavGroup[] = [
  ...DROPDOWN_GROUPS.map((group) => ({
    title: group.label,
    links: footerProgramsIn(group.id).map((p) => ({ label: p.name, href: p.href })),
  })),
  {
    title: "Company",
    links: [
      { label: "All programs", href: "/programs" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "The Brief", href: "/the-brief" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const talkLinks = [
  { label: "Book a 20-min call", href: CALENDLY_URL, external: true },
  { label: "conner@wearejunction.com", href: "mailto:conner@wearejunction.com" },
  { label: "LinkedIn", href: JUNCTION_SOCIALS[1].href, external: true },
];

export function Footer() {
  return (
    <footer className="tone-carbon px-gutter pb-8 pt-section-tight">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <div className="flex flex-col gap-5">
            <LogoLockup />
            <SocialLinks links={[...JUNCTION_SOCIALS]} label="Junction on social media" />
          </div>
          <NewsletterSignup className="max-w-[520px]" />
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]"
        >
          {footerGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="type-eyebrow m-0">{group.title}</p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-plain">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <p className="type-eyebrow m-0">Talk to us</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
              {talkLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-plain"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {/* Let the email address wrap after the @, never mid-word. */}
                    {link.label.includes("@") ? (
                      <>
                        {link.label.split("@")[0]}@<wbr />
                        {link.label.split("@")[1]}
                      </>
                    ) : (
                      link.label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="type-small flex flex-wrap justify-between gap-4 border-t border-hairline-dark pt-5">
          <span>© Junction Consulting 2026</span>
          <Link href="/privacy-policy" className="link-plain">
            Privacy policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
