This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

### The Brief (Mailchimp)

`/the-brief` lists issues of The Brief from Mailchimp. Set these three in Netlify (Site configuration → Environment variables), then redeploy. All three are **server-only**; never prefix them with `NEXT_PUBLIC_`.

| Variable | Value |
|---|---|
| `MAILCHIMP_API_KEY` | A Mailchimp API key (Profile → Extras → API keys → Create a key). |
| `MAILCHIMP_SERVER_PREFIX` | The data centre, e.g. `us21`: the part after the dash at the end of the API key, or the subdomain when you're logged in (`us21.admin.mailchimp.com`). |
| `MAILCHIMP_BRIEF_LIST_ID` | The Brief's audience ID (Audience → Settings → Audience name and defaults → Audience ID). |

Until all three are set, the page shows sample issues (`src/lib/brief.ts`). Once they're set, it reads sent campaigns for that audience, refreshes hourly, and falls back to the last good result (or the sample) if Mailchimp can't be reached. Issue numbers come from the campaign name (e.g. "Brief 544"). The latest issue's two section headlines are parsed from its HTML; if they don't show up, adjust `SECTION_PARSER` in `src/lib/brief.ts` to the real template.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
