import type { CartridgeRecord, WeaponRecord } from "@/lib/firearms/queries";

export type DiscoveryStep = {
  title: string;
  description: string;
  href: string;
};

export type LearningPath = {
  title: string;
  description: string;
  href: string;
  steps: string[];
};

export type RecommendedNextItem = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
};

export const beginnerStartSections: DiscoveryStep[] = [
  {
    title: "Start with cartridges",
    description:
      "Learn how caliber, cartridge type, and common use cases shape everything else in the catalog.",
    href: "/tools/firearm-catalog#featured-cartridges",
  },
  {
    title: "Then compare weapon families",
    description:
      "See how pistols and rifles connect to supported cartridges and why those pairings matter.",
    href: "/tools/firearm-catalog#featured-weapons",
  },
  {
    title: "Follow compatibility links",
    description:
      "Use relationship cards to move from a cartridge to a compatible weapon, then into similar entries.",
    href: "/tools/firearm-catalog#learning-paths",
  },
];

export const learningPathPatterns: LearningPath[] = [
  {
    title: "Beginner safety and terminology",
    description:
      "Build a calm baseline understanding of cartridge names, platforms, and common categories.",
    href: "/tools/firearm-catalog",
    steps: [
      "Read a featured cartridge card",
      "Open a compatible weapon page",
      "Use the recommended next links to compare similar entries",
    ],
  },
  {
    title: "Platform-first exploration",
    description:
      "Start from a weapon you recognize, then work outward into cartridge fit, role, and related choices.",
    href: "/tools/firearm-catalog#featured-weapons",
    steps: [
      "Choose a featured weapon",
      "Check why it matters",
      "Follow compatible cartridges and similar entries",
    ],
  },
  {
    title: "Cartridge-first exploration",
    description:
      "Start with a round, learn where it shows up, and understand why compatibility drives platform choices.",
    href: "/tools/firearm-catalog#featured-cartridges",
    steps: [
      "Pick a featured cartridge",
      "Review compatible weapons",
      "Use recommended next to branch into neighboring calibers or platforms",
    ],
  },
];

export function getFeaturedLearningPaths<T extends { items: unknown[] }>(
  paths: T[],
  limit = 3
) {
  return [...paths]
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, limit);
}

export function getFeaturedCartridges(cartridges: CartridgeRecord[]) {
  return cartridges.slice(0, 3);
}

export function getFeaturedWeapons(weapons: WeaponRecord[]) {
  return weapons.slice(0, 3);
}

export function getSimilarWeapons(
  weapon: WeaponRecord,
  weapons: WeaponRecord[],
  limit = 3
) {
  return weapons
    .filter((candidate) => candidate.slug !== weapon.slug)
    .sort((a, b) => {
      const aScore =
        Number(a.weapon_type === weapon.weapon_type) * 3 +
        Number(a.manufacturer?.slug === weapon.manufacturer?.slug) * 2 +
        Number(a.platform === weapon.platform);
      const bScore =
        Number(b.weapon_type === weapon.weapon_type) * 3 +
        Number(b.manufacturer?.slug === weapon.manufacturer?.slug) * 2 +
        Number(b.platform === weapon.platform);

      return bScore - aScore || a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

export function getSimilarCartridges(
  cartridge: CartridgeRecord,
  cartridges: CartridgeRecord[],
  limit = 3
) {
  return cartridges
    .filter((candidate) => candidate.slug !== cartridge.slug)
    .sort((a, b) => {
      const aScore =
        Number(a.cartridge_type === cartridge.cartridge_type) * 3 +
        Number(a.caliber === cartridge.caliber) * 2 +
        Number(a.manufacturer?.slug === cartridge.manufacturer?.slug);
      const bScore =
        Number(b.cartridge_type === cartridge.cartridge_type) * 3 +
        Number(b.caliber === cartridge.caliber) * 2 +
        Number(b.manufacturer?.slug === cartridge.manufacturer?.slug);

      return bScore - aScore || a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

export function getRecommendedNextForWeapon(
  weapon: WeaponRecord,
  similarWeapons: WeaponRecord[]
): RecommendedNextItem[] {
  const items: RecommendedNextItem[] = [];

  if (weapon.compatibility[0]?.cartridge) {
    items.push({
      title: `Trace ${weapon.compatibility[0].cartridge.name}`,
      description:
        "Follow this cartridge into a detail page to understand how ammunition choices shape platform fit.",
      href: `/tools/firearm-catalog/cartridges/${weapon.compatibility[0].cartridge.slug}`,
      eyebrow: "Follow the ammo relationship",
    });
  }

  if (similarWeapons[0]) {
    items.push({
      title: `Compare with ${similarWeapons[0].name}`,
      description:
        "Contrast platform, action type, and intended role to build intuition about neighboring options.",
      href: `/tools/firearm-catalog/weapons/${similarWeapons[0].slug}`,
      eyebrow: "Compare a similar weapon",
    });
  }

  items.push({
    title: "Return to the learning hub",
    description:
      "Use the catalog homepage to pick a new beginner path, browse featured entries, or start from a different angle.",
    href: "/tools/firearm-catalog",
    eyebrow: "Zoom back out",
  });

  return items.slice(0, 3);
}

export function getRecommendedNextForCartridge(
  cartridge: CartridgeRecord,
  compatibleWeapons: WeaponRecord[],
  similarCartridges: CartridgeRecord[]
): RecommendedNextItem[] {
  const items: RecommendedNextItem[] = [];

  if (compatibleWeapons[0]) {
    items.push({
      title: `See ${compatibleWeapons[0].name} in context`,
      description:
        "Open a compatible weapon to connect cartridge specs with real platform choices and intended roles.",
      href: `/tools/firearm-catalog/weapons/${compatibleWeapons[0].slug}`,
      eyebrow: "Move into platform context",
    });
  }

  if (similarCartridges[0]) {
    items.push({
      title: `Compare with ${similarCartridges[0].name}`,
      description:
        "Use a neighboring cartridge to understand how type, caliber, and use case create families of similar rounds.",
      href: `/tools/firearm-catalog/cartridges/${similarCartridges[0].slug}`,
      eyebrow: "Compare a related round",
    });
  }

  items.push({
    title: "Go back to the catalog guide",
    description:
      "Pick a recommended learning path or browse a featured weapon to keep discovery moving without guesswork.",
    href: "/tools/firearm-catalog",
    eyebrow: "Keep learning",
  });

  return items.slice(0, 3);
}
