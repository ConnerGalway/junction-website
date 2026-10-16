import type { Metadata } from "next";
import { JuHero } from "@/components/junctionu";

export const metadata: Metadata = {
  title: "JunctionU",
  description:
    "Certificate courses, workshops and free Tourism Talks, built for tourism professionals. Lessons run under an hour and every one ends in something you can do today. 2,000+ people are in.",
};

/**
 * JunctionU (sub-brand; see DESIGN_SYSTEM.md "JunctionU sub-brand").
 * One Mint button on the page (Start free); every other section has one action.
 */
export default function JunctionUPage() {
  return (
    <>
      <JuHero />
      {/* Anchor for "Start free" and Browse until the shelves land */}
      <div id="catalogue" className="scroll-mt-20" />
    </>
  );
}
