# Lead-gen redesign: design reference

These `.dc.html` files are the approved **design references** for the lead-gen version of wearejunction.com. To view one, open it in a browser from this folder (it needs `support.js` beside it). Don't ship these files. They exist so the Next.js app in `src/` can be matched to them exactly.

Pages:
- `LG Home`: the homepage. It routes visitors to the four offers.
- `LG AI Accelerator`: $5,000, 30 days, any industry. **No tourism references anywhere on this page.**
- `LG Accelerator`: $2,500, 90 days, 3 coaching touchpoints, interactive plan demo.
- `LG Custom Training`: for DMOs (operator courses) and for organizations training their leaders.
- `LG Speaking`: three topics, formats, a "Check availability" button. No fee shown.
- `LG Contact`: an enquiry form whose questions change with the offer. Reads `?type=ai|accelerator|training|speaking|other`.

Every style is inline, so exact values can be read from the markup. Colours and type match `src/app/globals.css`.

See `CLAUDE_CODE_PROMPT.md` at the repo root for the implementation brief.
