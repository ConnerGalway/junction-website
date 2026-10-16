"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { FocusEvent, KeyboardEvent, PointerEvent } from "react";
import { CALENDLY_URL } from "@/lib/constants";
import { primaryNav } from "@/lib/navigation";
import { DROPDOWN_GROUPS, PROGRAMS, programsIn, type Program } from "@/lib/programs";
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

/** A program's name in the dropdown and mobile menu: the short Accelerators name with the page name after it in Flint (temporary bridge). */
function MenuName({ program }: { program: Program }) {
  if (!program.dropdownName) return <>{program.name}</>;
  return (
    <>
      {program.dropdownName}
      <span className="text-flint"> · {program.name}</span>
    </>
  );
}

/**
 * The Programs dropdown: three short columns from src/lib/programs.ts and a
 * footer row. Links are reached with the arrow keys (tabIndex -1, so Tab
 * moves on to the next nav item and the panel closes).
 */
function ProgramsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(3,max-content)] gap-x-4">
        {DROPDOWN_GROUPS.map((group) => (
          <div key={group.id} className="flex flex-col gap-1.5">
            <p className="type-eyebrow m-0 px-3 pt-1">{group.label}</p>
            <ul className="m-0 flex list-none flex-col p-0">
              {programsIn(group.id).map((program) => (
                <li key={program.id}>
                  <Link href={program.href} onClick={onNavigate} tabIndex={-1} data-menu-item className="menu-link">
                    <MenuName program={program} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-6 px-3 pb-1 text-[15px]">
        <Link href="/programs" onClick={onNavigate} tabIndex={-1} data-menu-item className="menu-foot-link">
          All programs →
        </Link>
        <span className="text-ink-soft">
          Not sure?{" "}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" tabIndex={-1} data-menu-item className="menu-foot-link">
            Book a 20-min call
          </a>
        </span>
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
  const programsLinkRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  function clearHoverTimer() {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  // Hover: open after a 120ms intent delay, close 120ms after the pointer
  // leaves the item and its panel (the panel is inside the item, so moving
  // into it keeps it open).
  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setProgramsOpen(true), 120);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setProgramsOpen(false), 120);
  }

  const menuItems = () =>
    Array.from(panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? []);

  function focusItem(index: number) {
    const items = menuItems();
    if (!items.length) return;
    items[(index + items.length) % items.length].focus();
  }

  function onProgramsKeyDown(event: KeyboardEvent) {
    const items = menuItems();
    const current = items.indexOf(document.activeElement as HTMLElement);
    const inPanel = current !== -1;
    switch (event.key) {
      case "Escape":
        if (!programsOpen) return;
        event.stopPropagation();
        setProgramsOpen(false);
        chevronRef.current?.focus();
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (!inPanel && event.key === "ArrowRight") return;
        event.preventDefault();
        flushSync(() => setProgramsOpen(true));
        focusItem(inPanel ? current + 1 : 0);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (!inPanel) return;
        event.preventDefault();
        focusItem(current - 1);
        break;
      case "Home":
      case "End":
        if (!inPanel) return;
        event.preventDefault();
        focusItem(event.key === "Home" ? 0 : -1);
        break;
    }
  }

  // Focusing the trigger opens the panel; focus leaving the item closes it.
  function onProgramsFocus(event: FocusEvent) {
    if (event.target === programsLinkRef.current && programsLinkRef.current?.matches(":focus-visible")) {
      setProgramsOpen(true);
    }
  }

  function onProgramsBlur(event: FocusEvent) {
    if (!programsRef.current?.contains(event.relatedTarget as Node | null)) {
      setProgramsOpen(false);
    }
  }

  function onMobileKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && mobileOpen) setMobileOpen(false);
  }

  const isActive = (href: string) => pathname === href;
  const programsActive = pathname === "/programs" || PROGRAMS.some((p) => p.href === pathname);

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
            <ul className="m-0 flex list-none items-center gap-5 p-0 text-[17px] font-normal whitespace-nowrap text-carbon xl:gap-7">
              <li
                ref={programsRef}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onKeyDown={onProgramsKeyDown}
                onFocus={onProgramsFocus}
                onBlur={onProgramsBlur}
                className="relative"
              >
                <div className="flex items-center gap-1">
                  <Link
                    ref={programsLinkRef}
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
                  ref={panelRef}
                  hidden={!programsOpen}
                  className="absolute -left-[30px] top-full pt-2"
                >
                  <div className="tone-newsprint rounded-card bg-newsprint p-[18px] shadow-card">
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
              {DROPDOWN_GROUPS.map((group) => (
                <div key={group.id} className="flex flex-col gap-2">
                  <p className="type-eyebrow m-0">{group.label}</p>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {programsIn(group.id).map((program) => (
                      <li key={program.id}>
                        <Link href={program.href} className="link-plain block py-2 text-[17px]">
                          <MenuName program={program} />
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
