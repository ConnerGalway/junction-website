/** First focusable element on every page; jumps past the nav to <main>. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable btn btn-primary fixed left-4 top-4 z-[100]"
    >
      Skip to content
    </a>
  );
}
