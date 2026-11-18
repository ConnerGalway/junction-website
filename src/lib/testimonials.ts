/**
 * Testimonials. VERIFIED quotes only, in the exact wording supplied (an
 * ellipsis marks a trim). Pages wrap `text` in quotation marks.
 *
 * Unverified quotes are kept in UNVERIFIED and show only with
 * SHOW_UNVERIFIED_QUOTES (src/lib/flags.ts).
 */

export type Testimonial = { text: string; caption: string };

export const QUOTES = {
  genevieve: {
    text: "Junction Consulting has been an invaluable partner… Their dedication has enabled hundreds of ITAC businesses to leverage their platform.",
    caption: "Genevieve Huneault, Development Manager, Indigenous Tourism Association of Canada",
  },
  chrisTait: {
    text: "The result is a practical and realistic plan rooted in respect for the Klahoose story, values, and guest experience.",
    caption: "Chris Tait, Klahoose Wilderness Resort",
  },
  monicaFrost: {
    text: "Thank you so much for presenting at our conference. Your sessions are always so well attended and super interesting.",
    caption: "Monica Frost, BC Craft Brewers Association",
  },
  savannah: {
    text: "The implementation plan gave structure to ideas that had been living in my head for a long time.",
    caption: "Savannah Swaisland, Grape Savvy",
  },
  joanneWolnik: {
    text: "Conner stands out as a leader in the tourism industry as he regularly anticipates needs and matches strategic and reasonable solutions to support sustainable growth throughout the sector.",
    caption: "Joanne Wolnik, Ontario's Southwest Tourism Association",
  },
  kellyJosephson: {
    text: "We were so thrilled to have you at the conference — yours was our #1 session. In addition, in response to which sessions they want next year many people mentioned bringing you back.",
    caption: "Kelly Josephson, Wines of BC",
  },
  robynGillespie: {
    text: "eLearningU is timely, approachable, and provides education in bite sized bits that are easily taken in by working individuals.",
    caption: "Robyn Gillespie, Big Bear Donair, Whitehorse",
  },
} satisfies Record<string, Testimonial>;

/**
 * eLearningU learner quotes (verified). Not used yet: the eLearningU page has
 * no testimonial spot. For Moss cards if one is added.
 */
export const ELU_QUOTES: Testimonial[] = [
  {
    text: "By the end of the course, I had a clear roadmap to confidently plan, prioritize, and execute my own strategies with success.",
    caption: "Rebecca Henn, Brand Strategist, Rhenn & co.",
  },
  {
    text: "…as an Indigenous business owner this has been a fantastic resource and really helped to identify our marketing challenges and implement strategies to correct them.",
    caption: "Alex Chafe, Wild Gros Morne",
  },
  {
    text: "It allowed me to reflect on what we are doing now that is or is not working and adjust accordingly.",
    caption: "Walter Jerome, Gesgapegiag Tourism",
  },
];

/** Not verified: shown only with SHOW_UNVERIFIED_QUOTES. */
export const UNVERIFIED = {
  kathyCooperHome: {
    text: "We are a stronger, smarter organization today thanks to the work we did with Junction.",
    caption: "Kathy Cooper, CEO, Kootenay Rockies Tourism",
  },
  kathyCooperWork: {
    text: "We are a stronger, smarter tourism organization today thanks to the work we did with Junction.",
    caption: "Kathy Cooper, CEO, Kootenay Rockies Tourism",
  },
  averyTraining: {
    text: "Functional, accessible, and personalized. Incredibly valuable education for our tourism sector.",
    caption: "Avery Bramadat, Travel Yukon",
  },
  averyWork: {
    text: "Incredibly valuable insights and education for our tourism sector.",
    caption: "Avery Bramadat, Travel Yukon",
  },
  joanneShort: {
    text: "Invaluable support to our region, our DMOs and our operators.",
    caption: "Joanne Wolnik, Ontario's Southwest",
  },
} satisfies Record<string, Testimonial>;

/** "text" in quotation marks, as the site sets quotes. */
export const quoted = (t: Testimonial) => `"${t.text}"`;
