/**
 * The Brief: issue numbers. Pure functions with no imports, so
 * scripts/check-brief-numbers.mjs can run them with plain Node.
 */

/**
 * The issue number in a campaign name, or null. Only a 3-digit number that
 * directly follows "Brief", "Nº" (or "N°"), "No." or "#" counts:
 * "Brief 549", "The Brief #550", "Brief Nº 551", "2026.11.16 — Brief 549".
 * A 4-digit year (19xx/20xx) or any part of a date ("2026.11.16",
 * "2026-11-16") never does: those aren't 3 digits right after a marker.
 */
export function issueNumberFrom(name: string): number | null {
  const m = name.match(/(?:\bbrief\b|\bn[º°]|\bno\.|#)\s*(?:n[º°]|no\.|#)?\s*(\d{3})(?!\d|[.\-/]\d)/i);
  return m ? Number(m[1]) : null;
}

type Dated = { number: number | null; date: string };

/**
 * Numbers for new campaigns (in the order given), next to the issues already
 * known (the hand-entered ones). Each campaign has its parsed number (or
 * null) and its send date (yyyy-mm-dd). Returns one number per campaign, or
 * null when it would duplicate an issue already shown:
 *
 * 1. A campaign with a valid number keeps it, unless that number is taken.
 * 2. A campaign without one, oldest first: if an issue was already sent on
 *    that date it's the same issue (dropped); otherwise it becomes the next
 *    number after the issue sent before it (549 on Nov 16 → 550), skipping
 *    any number already taken.
 *
 * So no two issues ever share a number.
 */
export function numberCampaigns(known: Dated[], campaigns: Dated[]): (number | null)[] {
  const taken = new Set(known.map((k) => k.number).filter((n): n is number => n !== null));
  const placed: { number: number; date: string }[] = known.filter((k): k is { number: number; date: string } => k.number !== null);
  const result: (number | null)[] = campaigns.map(() => null);

  campaigns.forEach((c, i) => {
    if (c.number === null || taken.has(c.number)) return;
    taken.add(c.number);
    placed.push({ number: c.number, date: c.date });
    result[i] = c.number;
  });

  const unnumbered = campaigns
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.number === null)
    .sort((a, b) => a.c.date.localeCompare(b.c.date));
  for (const { c, i } of unnumbered) {
    if (placed.some((p) => p.date === c.date)) continue;
    const before = placed.filter((p) => p.date < c.date).map((p) => p.number);
    let n = (before.length ? Math.max(...before) : 0) + 1;
    while (taken.has(n)) n++;
    taken.add(n);
    placed.push({ number: n, date: c.date });
    result[i] = n;
  }
  return result;
}
