import type { ReactNode } from "react";
import { cx } from "./cx";

export type SocialNetwork = "instagram" | "linkedin" | "youtube" | "tiktok";
export type SocialLink = { network: SocialNetwork; href: string; /** e.g. "Junction on Instagram" */ label: string };

/** 20px line icons (currentColor, 1.75 stroke), drawn for this site. */
const ICONS: Record<SocialNetwork, ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16.5" />
      <circle cx="8" cy="7.6" r="0.6" fill="currentColor" />
      <path d="M11.5 16.5V10.5M11.5 13.2a2.6 2.6 0 0 1 5.2 0v3.3" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4v5.2l4.5-2.6z" fill="currentColor" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 3.5v11.25a3.75 3.75 0 1 1-3.75-3.75" />
      <path d="M14 3.5c.4 2.6 2.4 4.5 5 4.6" />
    </>
  ),
};

/**
 * A row of social icon links: Newsprint 70% on dark grounds (pass a colour
 * class to change it), break-on-dark on hover and focus. Each is a 44px touch
 * target with an aria-label ("Junction on Instagram"), and opens in a new
 * tab (rel="noopener noreferrer").
 */
export function SocialLinks({
  links,
  label,
  className,
  linkClassName = "text-newsprint/70 hover:text-break-on-dark focus-visible:text-break-on-dark",
}: {
  links: SocialLink[];
  /** The list's accessible name, e.g. "Junction on social media". */
  label: string;
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul aria-label={label} className={cx("m-0 -ml-3 flex list-none flex-wrap p-0", className)}>
      {links.map((link) => (
        <li key={link.network}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cx(
              "flex size-11 items-center justify-center rounded-control no-underline transition-colors duration-150",
              linkClassName
            )}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[link.network]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
