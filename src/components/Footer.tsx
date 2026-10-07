import Link from "next/link";
import { CALENDLY_URL } from "@/lib/constants";

const footerSections = [
  {
    title: "Programs",
    links: [
      { label: "AI Accelerator", href: "/ai-accelerator" },
      { label: "The Accelerator", href: "/accelerator" },
      { label: "Custom Training", href: "/custom-training" },
      { label: "Speaking", href: "/speaking" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Talk to us",
    links: [
      { label: "Book a 20-min call", href: CALENDLY_URL, external: true },
      { label: "conner@wearejunction.com", href: "mailto:conner@wearejunction.com" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="bg-carbon text-newsprint"
      style={{ padding: "64px clamp(20px, 4vw, 48px) 32px" }}
    >
      <div
        className="content-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "40px",
        }}
      >
        {/* Logo */}
        <div className="flex items-start gap-3">
          <span
            className="font-bebas leading-none"
            style={{ fontSize: "30px", letterSpacing: "0.08em" }}
          >
            JUNCTION
          </span>
          <span
            className="font-light"
            style={{
              fontSize: "10px",
              lineHeight: "1.25",
              letterSpacing: "0.06em",
              color: "rgba(244, 240, 232, 0.78)",
              borderLeft: "1px solid rgba(244, 240, 232, 0.2)",
              paddingLeft: "12px",
              marginTop: "2px",
            }}
          >
            Strategy &<br />
            Capacity Building
          </span>
        </div>

        {/* Footer sections */}
        {footerSections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-2.5 text-sm font-light"
          >
            <span
              className="text-accent mb-1"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </span>
            {section.links.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fern"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-fern"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="content-container flex justify-between gap-4 flex-wrap text-sm"
        style={{
          marginTop: "56px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(244, 240, 232, 0.12)",
          color: "rgba(244, 240, 232, 0.78)",
        }}
      >
        <span>© Junction Consulting 2026</span>
        <Link href="#" className="hover:text-newsprint transition-colors">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
