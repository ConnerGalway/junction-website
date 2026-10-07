import Link from "next/link";
import { CALENDLY_URL } from "@/lib/constants";
import { flagshipProgram, programGroups, type NavGroup } from "@/lib/navigation";
import { Container, NewsletterSignup, Wordmark } from "./ui";

const footerGroups: NavGroup[] = [
  {
    title: "Flagship",
    links: [
      { label: flagshipProgram.title, href: flagshipProgram.href },
      { label: "See all programs", href: "/programs" },
    ],
  },
  ...programGroups,
  {
    title: "Company",
    links: [
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
  // TODO: add the Junction LinkedIn URL.
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="tone-carbon px-gutter pb-8 pt-section-tight">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <div className="flex items-start gap-4">
            <Wordmark className="text-[34px]" />
            <span className="border-l border-hairline-dark pl-3 text-[11px] font-light leading-[1.3] tracking-[0.06em] text-newsprint-muted">
              Strategy &amp;
              <br />
              Capacity Building
            </span>
          </div>
          <NewsletterSignup className="max-w-[520px]" />
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]"
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
                    className="link-plain break-words"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="type-small flex flex-wrap justify-between gap-4 border-t border-hairline-dark pt-5">
          <span>© Junction Consulting 2026</span>
          {/* TODO: link the privacy policy once it exists. */}
          <a href="#" className="link-plain">
            Privacy
          </a>
        </div>
      </Container>
    </footer>
  );
}
