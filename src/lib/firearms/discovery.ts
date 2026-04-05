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
