# Junction website

The website for Junction (wearejunction.com): the main site (programs, Work, About, The Brief, Contact) and the eLearningU storefront at `/elearningu`. Built with Next.js (App Router) and Tailwind CSS, deployed on Netlify.

## Branches

- **`main`**: the live site.
- **`redesign-one`**: the new site. Work lands here through pull requests.
- **PR #2** (`redesign-one` → `main`) is the launch PR: merging it puts the new site live.

## Preview

Every pull request gets a **Netlify deploy preview**; the link appears on the PR. That's the way to review a change before it's merged.

To run it locally (Node 22):

```bash
npm ci
npm run dev
```

`npm run build` and `npm run lint` must pass before a merge.

## Docs

- **`AGENTS.md`**: rules for anyone (or any agent) changing the code. Read it first.
- **`DESIGN_SYSTEM.md`**: colours, type, components and every page's structure, plus the content-to-supply list.
- **`public/images/README.md`**: which image goes where, with the exact filenames to upload.
- **`docs/archive/`**: old design references, kept for history; not used by the site.

## Flags

Hidden sections and soft-launch switches live in **`src/lib/flags.ts`**. Nothing is deleted: removed sections stay behind a flag (default `false`). Each flag is described there and in DESIGN_SYSTEM.md ("Flags and hidden sections").
