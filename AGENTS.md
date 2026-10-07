<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) before changing any UI. Build pages from the shared components in `src/components/ui` (exported from `@/components`) and the tokens and type classes in `src/app/globals.css`: no hex/rgba values, inline font styles or pure white in pages.
