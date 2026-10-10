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
  twinLions: {
    name: "Twin Lions Contracting",
    src: "/logos/twin-lions-contracting.png",
    ratio: 4.882,
    scale: 1.15,
  },
  westCoastHomes: { name: "West Coast Homes" },
  smr: { name: "SMR Plumbing & Heating", src: "/logos/smr-plumbing-heating.png", ratio: 2.202 },
  destinationBC: {
    name: "Destination BC",
    src: "/logos/destination-bc.png",
    ratio: 3.846,
    scale: 1.2,
  },
  travelAlberta: { name: "Travel Alberta", src: "/logos/travel-alberta.png", ratio: 2.239 },
  travelYukon: { name: "Travel Yukon", src: "/logos/travel-yukon.svg", ratio: 1.963 },
  travelMaine: { name: "Travel Maine", src: "/logos/travel-maine.png", ratio: 2.464, scale: 0.85 },
  visitMississippi: {
    name: "Visit Mississippi",
    src: "/logos/visit-mississippi.png",
    ratio: 2.47,
    scale: 1.1,
  },
  oregonDestination: {
    name: "Oregon Destination Association",
    src: "/logos/oregon-destination-association.png",
    ratio: 2.706,
    scale: 1.1,
  },
  ontariosSouthwest: {
    name: "Southwest Ontario Tourism Corporation",
    src: "/logos/ontarios-southwest.png",
    ratio: 3.129,
    scale: 1.15,
  },
  northernBC: {
    name: "Northern BC Tourism",
    src: "/logos/northern-bc-tourism.png",
    ratio: 1,
  },
  fourVI: { name: "4VI", src: "/logos/4vi.png", ratio: 2.549, scale: 0.8 },
  kootenayRockies: {
    name: "Kootenay Rockies Tourism",
    src: "/logos/kootenay-rockies-tourism.png",
    ratio: 1.109,
    scale: 1.1,
  },
  tourismRedDeer: {
    name: "Tourism Red Deer",
    src: "/logos/tourism-red-deer.png",
    ratio: 3.762,
    scale: 0.9,
  },
  tourismGolden: { name: "Tourism Golden", src: "/logos/tourism-golden.png", ratio: 2.536 },
  southCanadianRockies: {
    name: "South Canadian Rockies Tourism",
    src: "/logos/south-canadian-rockies-tourism.png",
    ratio: 0.755,
    scale: 1.1,
  },
  okotoks: { name: "Town of Okotoks", src: "/logos/town-of-okotoks.png", ratio: 3.453 },
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
