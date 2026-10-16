"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubBrandWordmark, cx } from "@/components";
import { JU_NAV, JU_SIGN_IN_URL } from "@/lib/junctionu";

/**
 * JunctionU top bar: JUNCTION_U and "← Junction" on the left, the section
 * links in the middle, Sign in on the right; a 1px Fern-20% rule under it.
 * The link for the section in view (or the current page) is Newsprint with a
 * 2px Fern underline. Under 1024px the links collapse into a menu button.
 */
export function JuNav() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Scrollspy on /junctionu: the section nearest the top of the viewport.
  useEffect(() => {
    if (pathname !== "/junctionu") return;
    const ids = JU_NAV.map((l) => l.section).filter((s): s is NonNullable<typeof s> => !!s);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const update = () => {
      let current: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= 120) current = el.id;
      setSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isActive = (l: (typeof JU_NAV)[number]) => (l.section ? pathname === "/junctionu" && section === l.section : pathname === l.href);

  const links = (onClick?: () => void) =>
    JU_NAV.map((l) => (
      <Link
        key={l.label}
        href={l.href}
        onClick={onClick}
        aria-current={isActive(l) ? "true" : undefined}
        className={cx(
          "ju-nav-link whitespace-nowrap transition-colors duration-150 hover:text-break-on-dark",
          isActive(l) ? "text-newsprint" : "text-newsprint-muted"
        )}
      >
        {l.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-40 border-b border-fern/20 bg-ju-ground px-gutter">
      <div className="mx-auto flex h-16 max-w-wide items-center gap-6">
        <div className="flex shrink-0 items-baseline gap-4">
          <Link href="/junctionu" aria-label="JunctionU home" className="text-newsprint no-underline">
            <SubBrandWordmark suffix="U" className="text-[26px]" />
          </Link>
          <Link href="/" className="text-[13px] text-newsprint-muted no-underline hover:text-break-on-dark">
            ← Junction
          </Link>
        </div>

        <nav aria-label="JunctionU" className="mx-auto hidden items-center gap-7 text-[15px] lg:flex">
          {links()}
        </nav>

        <a href={JU_SIGN_IN_URL} className="ml-auto hidden text-[15px] font-medium text-newsprint no-underline hover:text-break-on-dark lg:ml-0 lg:inline">
          Sign in
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="ju-menu"
          onClick={() => setOpen((o) => !o)}
          className="ml-auto cursor-pointer rounded-control border-[1.5px] border-fern bg-transparent px-4 py-2 text-[15px] font-medium text-newsprint lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="ju-menu" aria-label="JunctionU" className="mx-auto flex max-w-wide flex-col gap-4 pt-2 pb-6 text-[18px] lg:hidden">
          {links(() => setOpen(false))}
          <a href={JU_SIGN_IN_URL} className="font-medium text-newsprint no-underline hover:text-break-on-dark">
            Sign in
          </a>
        </nav>
      )}
    </header>
  );
}
