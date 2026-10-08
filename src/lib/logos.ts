/**
 * Organizations shown in logo walls. `src` points at a file in public/logos
 * (see public/logos/SOURCES.md); without one, the wall shows the name as
 * styled text. `ratio` is the file's width / height (after cropping), used
 * for optical sizing. `scale` fine-tunes a logo by eye (1 = default).
 */
export type Logo = {
  name: string;
  src?: string;
  ratio?: number;
  scale?: number;
};

const logo = {
  twinLions: { name: "Twin Lions Contracting" },
  westCoastHomes: { name: "West Coast Homes" },
  smr: { name: "SMR Plumbing & Heating" },
  destinationBC: { name: "Destination BC", src: "/logos/destination-bc.png", ratio: 3.846 },
  travelAlberta: { name: "Travel Alberta", src: "/logos/travel-alberta.png", ratio: 2.239 },
  travelYukon: { name: "Travel Yukon", src: "/logos/travel-yukon.svg", ratio: 1.963 },
  travelMaine: { name: "Travel Maine" },
  visitMississippi: { name: "Visit Mississippi" },
  oregonDestination: { name: "Oregon Destination Association" },
  ontariosSouthwest: {
    name: "Southwest Ontario Tourism Corporation",
    src: "/logos/ontarios-southwest.png",
    ratio: 3.087,
  },
  northernBC: { name: "Northern BC Tourism" },
  fourVI: { name: "4VI" },
  kootenayRockies: {
    name: "Kootenay Rockies Tourism",
    src: "/logos/kootenay-rockies-tourism.png",
    ratio: 1.109,
  },
  tourismRedDeer: { name: "Tourism Red Deer" },
  tourismGolden: { name: "Tourism Golden" },
  southCanadianRockies: { name: "South Canadian Rockies Tourism" },
  okotoks: { name: "Town of Okotoks" },
} satisfies Record<string, Logo>;

/** Home page: "Organizations we work with". */
export const homeLogos: Logo[] = [
  logo.twinLions,
  logo.westCoastHomes,
  logo.smr,
  logo.destinationBC,
  logo.travelAlberta,
  logo.travelMaine,
  logo.visitMississippi,
];

/** Offload Program (AI Accelerator): "Teams who've been through it". */
export const teamLogos: Logo[] = [logo.twinLions, logo.westCoastHomes, logo.smr];

/** Custom Training: "Organizations we've trained". */
export const clientLogos: Logo[] = [
  logo.destinationBC,
  logo.travelAlberta,
  logo.travelYukon,
  logo.travelMaine,
  logo.visitMississippi,
  logo.oregonDestination,
  logo.ontariosSouthwest,
  logo.northernBC,
  logo.fourVI,
  logo.kootenayRockies,
  logo.tourismRedDeer,
  logo.tourismGolden,
  logo.southCanadianRockies,
  logo.okotoks,
];
