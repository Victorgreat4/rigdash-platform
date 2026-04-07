import type { CartridgeRecord, WeaponRecord } from "@/lib/firearms/queries";

export type DiscoveryStep = {
  title: string;
  description: string;
  href: string;
};

export type RecommendedNextItem = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  reasons?: string[];
};

const FEATURED_CARTRIDGE_SLUGS = [
  "5-56x45mm-nato",
  "7-62x39mm",
  "5-45x39mm",
  "7-62x51mm-nato",
  "9x19mm-nato",
  "12x70mm",
];

const FEATURED_WEAPON_SLUGS = [
  "akm",
  "ak-74n",
  "m4a1-carbine",
  "hk416a5",
  "sks",
  "mp5",
];

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

export function getFeaturedLearningPaths<T extends { items: unknown[] }>(
  paths: T[],
  limit = 3
) {
  return [...paths]
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, limit);
}

export function getFeaturedCartridges(cartridges: CartridgeRecord[]) {
  return [...cartridges]
    .sort((a, b) => {
      const aPriority = FEATURED_CARTRIDGE_SLUGS.indexOf(a.slug);
      const bPriority = FEATURED_CARTRIDGE_SLUGS.indexOf(b.slug);
      const normalizedAPriority =
        aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
      const normalizedBPriority =
        bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

      return normalizedAPriority - normalizedBPriority || a.name.localeCompare(b.name);
    })
    .slice(0, 3);
}

export function getFeaturedWeapons(weapons: WeaponRecord[]) {
  return [...weapons]
    .sort((a, b) => {
      const aPriority = FEATURED_WEAPON_SLUGS.indexOf(a.slug);
      const bPriority = FEATURED_WEAPON_SLUGS.indexOf(b.slug);
      const normalizedAPriority =
        aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
      const normalizedBPriority =
        bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

      return normalizedAPriority - normalizedBPriority || a.name.localeCompare(b.name);
    })
    .slice(0, 3);
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
