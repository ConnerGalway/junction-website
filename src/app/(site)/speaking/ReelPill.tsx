/**
 * "Watch the reel": a frosted pill with a round play button that opens the
 * 60-second speaker reel. Not shown yet: the page renders it only when
 * SHOW_SPEAKING_REEL (src/lib/flags.ts) is true and
 * public/images/speaking/reel.mp4 exists.
 */
export function ReelPill({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-newsprint/20 bg-newsprint/10 py-1.5 pr-5 pl-1.5 text-[15px] font-medium text-newsprint backdrop-blur-md transition-colors hover:border-newsprint/40"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-newsprint text-carbon">
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
          <path d="M3.5 1.8v8.4L10 6z" fill="currentColor" />
        </svg>
      </span>
      <span className="group-hover:text-break-on-dark">Watch the reel</span>
    </a>
  );
}
