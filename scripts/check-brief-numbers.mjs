// Check The Brief's issue-number logic (src/lib/briefNumbers.ts).
// Run: npm run check:brief
import assert from "node:assert/strict";
import { issueNumberFrom, numberCampaigns } from "../src/lib/briefNumbers.ts";

const names = [
  ["2026.11.16 — Brief 549", 549],
  ["Brief 550", 550],
  ["The Brief #551", 551],
  ["Brief Nº 552", 552],
  ["The Brief No. 553", 553],
  ["Brief 549.", 549],
  ["The Brief 2026.11.23", null],
  ["Brief 2026-11-23", null],
  ["Brief 2026", null],
  ["2026.11.30", null],
];
for (const [name, want] of names) {
  assert.equal(issueNumberFrom(name), want, `issueNumberFrom(${JSON.stringify(name)})`);
}

// Hand-entered 548 and 549; MailerLite sends a numbered 551 later and three unnumbered ones.
const known = [
  { number: 549, date: "2026-11-16" },
  { number: 548, date: "2026-11-09" },
];
const campaigns = [
  { number: null, date: "2026-11-23" }, // date only → 550 (next after 549)
  { number: 549, date: "2026-11-16" }, // already hand-entered → dropped
  { number: null, date: "2026-11-16" }, // same day as 549 → the same issue, dropped
  { number: 551, date: "2026-11-30" }, // valid number → kept
  { number: null, date: "2026-12-07" }, // after 551 → 552
];
assert.deepEqual(numberCampaigns(known, campaigns), [550, null, null, 551, 552]);

// Never two issues with the same number: a date-numbered issue skips a taken number.
assert.deepEqual(numberCampaigns(known, [{ number: 550, date: "2026-12-14" }, { number: null, date: "2026-11-23" }]), [550, 551]);

console.log(`check-brief-numbers: ${names.length} names and the numbering rules pass.`);
