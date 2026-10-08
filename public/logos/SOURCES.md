# Logo sources

Logos used by `LogoWall` (`src/components/ui/LogoWall.tsx`, data in `src/lib/logos.ts`). Every logo is rendered in one colour through a CSS mask, so only the file's alpha channel (its shape) matters.

- **Raster logos:** cropped to their visible content (transparent padding removed) so optical sizing measures the mark itself. Nothing else in the artwork was changed.
- **Fetched files:** only from each organization's own website (header/footer logo or brand/media kit), never from logo aggregators.

| File | Organization | Source | Date added |
|---|---|---|---|
| `destination-bc.png` | Destination BC | Existing repo asset `public/uploads/Destination BC logo.png` (2020×654 transparent PNG), cropped | 2026-10-08 |
| `travel-alberta.png` | Travel Alberta | Existing repo asset `public/assets/logo-travel-alberta.png` (1511×675 transparent PNG) | 2026-10-08 |
| `travel-yukon.svg` | Travel Yukon | Existing repo asset `public/uploads/yukon logo.svg`, unchanged | 2026-10-08 |
| `ontarios-southwest.png` | Ontario's Southwest (Southwest Ontario Tourism Corporation) | Existing repo asset `public/uploads/OSW Logo.webp` (300×110), converted to PNG and cropped | 2026-10-08 |
| `kootenay-rockies-tourism.png` | Kootenay Rockies Tourism | Existing repo asset `public/uploads/kootenay rockies logo.png` (145×136), cropped | 2026-10-08 |
| `indigenous-tourism-bc.png` | Indigenous Tourism BC | Existing repo asset `public/assets/logo-itbc.png` (495×102), cropped. Not currently used in a wall. | 2026-10-08 |

## Not yet sourced (shown as styled text in the wall)

These have to come from the organization's own site, but this session's network policy blocked outbound requests. Add the file here, then set `src` and `ratio` for the organization in `src/lib/logos.ts`.

- **Businesses:** Twin Lions Contracting, West Coast Homes, SMR Plumbing & Heating
- **Travel Maine:** Maine Office of Tourism, visitmaine.com
- **Visit Mississippi**
- **Oregon Destination Association (ODA)**
- **Northern BC Tourism**
- **4VI**
- **Tourism Red Deer**
- **Tourism Golden**
- **South Canadian Rockies Tourism**
- **Town of Okotoks**
