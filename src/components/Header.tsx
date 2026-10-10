"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { CALENDLY_URL } from "@/lib/constants";
import { flagshipProgram, primaryNav, programGroups } from "@/lib/navigation";
import { DashboardPreview } from "./DashboardPreview";
import { Button, Dot, LogoLockup, cx } from "./ui";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={cx("transition-transform duration-150", open && "rotate-180")}
    >
      <path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Static content of the Programs menu (desktop dropdown). */
function ProgramsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      <Link
        href={flagshipProgram.href}
        onClick={onNavigate}
        className="tone-carbon group flex flex-col gap-3 rounded-card p-6"
      >
        <span className="type-price text-[28px]">{flagshipProgram.meta}</span>
        <span className="type-h3 group-hover:text-(--tone-link-hover)">
          {flagshipProgram.title}
        </span>
        <span className="type-small">{flagshipProgram.description}</span>
        <span className="mt-2 block aspect-[16/9] overflow-hidden rounded-control">
          <DashboardPreview variant="thumbnail" />
        </span>
      </Link>
      <div className="flex flex-col justify-between gap-6">
        <div className="grid grid-cols-3 gap-6">
          {programGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="type-eyebrow m-0">{group.title}</p>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="link-plain -mx-2 block rounded-control px-2 py-2 text-[16px] leading-snug hover:bg-sage/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Link href="/programs" onClick={onNavigate} className="link type-button">
            See all programs →
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Scroll positions for the compact header (hysteresis band 16–48px). */
const COMPACT_ENTER_Y = 48;
const COMPACT_EXIT_Y = 16;

export function Header() {
  const pathname = usePathname();
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const programsRef = useRef<HTMLLIElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const mobileId = useId();

  // Close menus when the route changes (adjusting state during render).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setProgramsOpen(false);
    setMobileOpen(false);
  }

  // Close the dropdown on a pointer press outside it (touch and mouse).
  useEffect(() => {
    if (!programsOpen) return;
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!programsRef.current?.contains(event.target as Node)) {
        setProgramsOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [programsOpen]);

  // Seamless at the top; compact + frosted once the page has scrolled.
  // Hysteresis: go compact past 48px, expand again only under 16px, and
  // keep the current state in between. The header is fixed over a spacer
  // that never changes size, so the shrink can't move the page content.
  useEffect(() => {
    let frame = 0;
    let ticking = false;
    function update() {
      ticking = false;
      const y = window.scrollY;
      setScrolled((compact) => (compact ? y >= COMPACT_EXIT_Y : y > COMPACT_ENTER_Y));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    setProgramsOpen(true);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = setTimeout(() => setProgramsOpen(false), 120);
  }

  function onProgramsKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && programsOpen) {
      event.stopPropagation();
      setProgramsOpen(false);
      chevronRef.current?.focus();
    }
  }

  function onProgramsBlur(event: React.FocusEvent) {
    if (!programsRef.current?.contains(event.relatedTarget as Node | null)) {
      setProgramsOpen(false);
    }
  }

  function onMobileKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && mobileOpen) setMobileOpen(false);
  }

  const isActive = (href: string) => pathname === href;
  const programsActive =
    pathname === "/programs" ||
    pathname === flagshipProgram.href ||
    programGroups.some((g) => g.links.some((l) => l.href === pathname));

  return (
    <>
      {/* Holds the header's expanded height in the page flow; never resizes. */}
      <div aria-hidden="true" className="h-[84px]" />
      <header
        className={cx(
          "tone-newsprint fixed inset-x-0 top-0 z-50 px-gutter transition-[background-color,box-shadow] duration-200",
          scrolled && !mobileOpen
            ? "bg-newsprint/92 shadow-[0_6px_24px_-12px_color-mix(in_srgb,var(--color-carbon)_25%,transparent)] backdrop-blur-md"
            : "bg-newsprint"
        )}
        onKeyDown={onMobileKeyDown}
      >
        <div
          className={cx(
            "relative mx-auto flex max-w-wide items-center justify-between gap-6 transition-[min-height] duration-200",
            scrolled ? "min-h-16" : "min-h-[84px]"
          )}
        >
          <LogoLockup collapseOnSmall />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-7 p-0 text-[17px] font-normal text-carbon">
              <li
                ref={programsRef}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onKeyDown={onProgramsKeyDown}
                onBlur={onProgramsBlur}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href="/programs"
                    aria-current={pathname === "/programs" ? "page" : undefined}
                    className={cx(
                      "link-plain py-2",
                      programsActive && "underline decoration-canopy decoration-2 underline-offset-[0.4em]"
                    )}
                  >
                    Programs
                  </Link>
                  <button
                    ref={chevronRef}
                    type="button"
                    aria-expanded={programsOpen}
                    aria-controls={panelId}
                    aria-label="Show programs"
                    onClick={() => setProgramsOpen((open) => !open)}
                    className="link-plain -mr-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-control border-0 bg-transparent p-0"
                  >
                    <Chevron open={programsOpen} />
                  </button>
                </div>
                <div
                  id={panelId}
                  hidden={!programsOpen}
                  className="absolute right-0 top-full pt-2"
                >
                  <div className="tone-newsprint w-[min(920px,calc(100vw-2*var(--spacing-gutter)))] rounded-card border border-hairline p-6 shadow-[0_24px_48px_-24px_color-mix(in_srgb,var(--color-carbon)_35%,transparent)]">
                    <ProgramsPanel onNavigate={() => setProgramsOpen(false)} />
                  </div>
                </div>
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "link-plain inline-flex items-center gap-2 py-2",
                      isActive(item.href) &&
                        "underline decoration-canopy decoration-2 underline-offset-[0.4em]"
                    )}
                  >
                    {item.label}
                    {item.dot && <Dot />}
                  </Link>
                </li>
              ))}
              <li>
                <Button href={CALENDLY_URL} size="sm">
                  Book a 20-min call
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((open) => !open)}
            className="btn btn-secondary min-h-11 px-4 lg:hidden"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile navigation */}
        <nav
          id={mobileId}
          aria-label="Main"
          hidden={!mobileOpen}
          className="max-h-[calc(100dvh-76px)] overflow-y-auto pb-8 lg:hidden"
        >
          <div className="mx-auto flex max-w-wide flex-col gap-8 pt-6">
            <div className="flex flex-col gap-5">
              <Link href="/programs" className="link-plain type-h4">
                Programs
              </Link>
              <Link
                href={flagshipProgram.href}
                className="tone-carbon flex flex-col gap-2 rounded-card p-5"
              >
                <span className="type-price text-[28px]">{flagshipProgram.meta}</span>
                <span className="type-h4">{flagshipProgram.title}</span>
                <span className="type-small">{flagshipProgram.description}</span>
              </Link>
              {programGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-2">
                  <p className="type-eyebrow m-0">{group.title}</p>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="link-plain block py-2 text-[17px]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/programs" className="link type-button self-start">
                See all programs →
              </Link>
            </div>
            <ul className="m-0 flex list-none flex-col border-t border-hairline p-0 pt-4">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="link-plain inline-flex items-center gap-2 py-2.5 text-[18px]"
                  >
                    {item.label}
                    {item.dot && <Dot />}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={CALENDLY_URL} className="self-start">
              Book a 20-min call
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
