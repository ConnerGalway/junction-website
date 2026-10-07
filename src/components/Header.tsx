"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALENDLY_URL } from "@/lib/constants";

const navLinks = [
  { href: "/ai-accelerator", label: "AI Accelerator" },
  { href: "/accelerator", label: "Accelerator" },
  { href: "/custom-training", label: "Custom Training" },
  { href: "/speaking", label: "Speaking" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-3.5 flex-wrap bg-newsprint"
      style={{
        padding: "14px clamp(20px, 4vw, 48px)",
        borderBottom: "1px solid rgba(28, 28, 26, 0.1)",
      }}
    >
      <Link href="/" className="flex items-center gap-3">
        <span
          className="font-bebas text-carbon leading-none"
          style={{ fontSize: "30px", letterSpacing: "0.08em", paddingTop: "3px" }}
        >
          JUNCTION
        </span>
        <span
          className="font-light whitespace-nowrap"
          style={{
            fontSize: "10px",
            lineHeight: "1.25",
            letterSpacing: "0.06em",
            color: "rgba(28, 28, 26, 0.72)",
            borderLeft: "1px solid rgba(28, 28, 26, 0.2)",
            paddingLeft: "12px",
          }}
        >
          Strategy &<br />
          Capacity Building
        </span>
      </Link>

      <nav
        className="flex items-center flex-wrap text-sm whitespace-nowrap"
        style={{ gap: "10px 22px" }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-forest ${isActive ? "font-medium" : ""}`}
              style={
                isActive
                  ? { borderBottom: "2px solid #C4963A", paddingBottom: "2px" }
                  : undefined
              }
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-button bg-forest text-newsprint rounded-[3px] whitespace-nowrap transition-colors hover:bg-canopy"
          style={{ padding: "11px 18px" }}
        >
          Book a 20-min call
        </a>
      </nav>
    </header>
  );
}
