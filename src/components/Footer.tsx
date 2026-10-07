import Link from "next/link";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Marketing strategy", href: "/services" },
      { label: "Training", href: "/services" },
      { label: "AI training", href: "/services" },
      { label: "Speaking", href: "/services" },
    ],
  },
  {
    title: "JunctionU",
    links: [
      { label: "Courses", href: "/junctionu" },
      { label: "Tourism Talks", href: "/junctionu" },
      { label: "For DMOs", href: "/junctionu" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Ideas", href: "/ideas" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "conner@wearejunction.com", href: "mailto:conner@wearejunction.com" },
      { label: "Instagram", href: "#" },
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
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
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
              color: "rgba(244, 240, 232, 0.6)",
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
            {section.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-fern"
              >
                {link.label}
              </Link>
            ))}
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
          color: "rgba(244, 240, 232, 0.6)",
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
