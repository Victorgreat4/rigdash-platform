import type {
  CartridgeRecord,
  LearningPathRecord,
  WeaponRecord,
} from "@/lib/firearms/queries";

export type HomepageComparison = {
  title: string;
  description: string;
  reason: string;
  left: {
    title: string;
    subtitle: string;
    href: string;
  };
  right: {
    title: string;
    subtitle: string;
    href: string;
  };
};

export type HighlightedEntry = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
};

type SortableHighlightedEntry = HighlightedEntry & {
  createdAt: string;
};

export type ContinueLearningLink = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

export function getRecentHighlightedEntries(
  cartridges: CartridgeRecord[],
  weapons: WeaponRecord[]
) {
  const entries: SortableHighlightedEntry[] = [
    ...cartridges.map((cartridge) => ({
      eyebrow: "Highlighted cartridge",
      title: cartridge.name,
      subtitle: `${cartridge.caliber} / ${cartridge.cartridge_type}`,
      description:
        cartridge.notes ??
        "A cartridge page is a strong place to start because it quickly connects terminology with compatible platforms.",
      href: `/tools/firearm-catalog/cartridges/${cartridge.slug}`,
      createdAt: cartridge.created_at,
    })),
    ...weapons.map((weapon) => ({
      eyebrow: "Highlighted weapon",
      title: weapon.name,
      subtitle: [weapon.weapon_type, weapon.platform, weapon.action_type]
        .filter(Boolean)
        .join(" / "),
      description:
        weapon.notes ??
        "A weapon page helps translate abstract specs into platform choices and compatibility context.",
      href: `/tools/firearm-catalog/weapons/${weapon.slug}`,
      createdAt: weapon.created_at,
    })),
  ];

  return entries
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4)
    .map((entry) => ({
      eyebrow: entry.eyebrow,
      title: entry.title,
      subtitle: entry.subtitle,
      description: entry.description,
      href: entry.href,
    }));
}

export function getHomepageComparisons(
  cartridges: CartridgeRecord[],
  weapons: WeaponRecord[]
) {
  const comparisons: HomepageComparison[] = [];

  if (cartridges.length >= 2) {
    comparisons.push({
      title: "Compare neighboring handgun rounds",
      description:
        "Start with two recognizable cartridges to learn how family, caliber, and intended role create useful comparisons.",
      reason: "Same family or related family",
      left: {
        title: cartridges[0].name,
        subtitle: `${cartridges[0].caliber} / ${cartridges[0].cartridge_type}`,
        href: `/tools/firearm-catalog/cartridges/${cartridges[0].slug}`,
      },
      right: {
        title: cartridges[1].name,
        subtitle: `${cartridges[1].caliber} / ${cartridges[1].cartridge_type}`,
        href: `/tools/firearm-catalog/cartridges/${cartridges[1].slug}`,
      },
    });
  }

  if (weapons.length >= 2) {
    comparisons.push({
      title: "Compare two service-style sidearms",
      description:
        "Use platform and action labels to understand how similar categories branch into different learning paths.",
      reason: "Similar type/category",
      left: {
        title: weapons[0].name,
        subtitle: [weapons[0].weapon_type, weapons[0].platform, weapons[0].action_type]
          .filter(Boolean)
          .join(" / "),
        href: `/tools/firearm-catalog/weapons/${weapons[0].slug}`,
      },
      right: {
        title: weapons[1].name,
        subtitle: [weapons[1].weapon_type, weapons[1].platform, weapons[1].action_type]
          .filter(Boolean)
          .join(" / "),
        href: `/tools/firearm-catalog/weapons/${weapons[1].slug}`,
      },
    });
  }

  const rifleCartridge = cartridges.find((item) =>
    item.name.toLowerCase().includes("5.56")
  );
  const rifleWeapon = weapons.find((item) =>
    item.name.toLowerCase().includes("mr556")
  );

  if (rifleCartridge && rifleWeapon) {
    comparisons.push({
      title: "Trace a cartridge into a platform",
      description:
        "Follow the compatibility relationship from a cartridge into a weapon page to see how the encyclopedia is designed to teach.",
      reason: "Compatibility relationship",
      left: {
        title: rifleCartridge.name,
        subtitle: `${rifleCartridge.caliber} / ${rifleCartridge.cartridge_type}`,
        href: `/tools/firearm-catalog/cartridges/${rifleCartridge.slug}`,
      },
      right: {
        title: rifleWeapon.name,
        subtitle: [rifleWeapon.weapon_type, rifleWeapon.platform, rifleWeapon.action_type]
          .filter(Boolean)
          .join(" / "),
        href: `/tools/firearm-catalog/weapons/${rifleWeapon.slug}`,
      },
    });
  }

  return comparisons.slice(0, 3);
}

export function getContinueLearningLinks(
  learningPaths: LearningPathRecord[],
  cartridges: CartridgeRecord[],
  weapons: WeaponRecord[]
): ContinueLearningLink[] {
  const links: ContinueLearningLink[] = [];

  if (learningPaths[0]) {
    links.push({
      eyebrow: "Continue with a path",
      title: learningPaths[0].title,
      description:
        "Return to a guided sequence when you want the platform to set the order of study for you.",
      href: `/paths/${learningPaths[0].slug}`,
    });
  }

  if (cartridges[0]) {
    links.push({
      eyebrow: "Continue with study mode",
      title: `Review ${cartridges[0].name}`,
      description:
        "Open a cartridge in study mode for a calmer summary, fact highlights, and a short self-check.",
      href: `/tools/firearm-catalog/cartridges/${cartridges[0].slug}?study=1`,
    });
  }

  if (weapons[0]) {
    links.push({
      eyebrow: "Continue with comparison",
      title: `Open ${weapons[0].name}`,
      description:
        "Jump back into a weapon page when you want to continue learning through compatibility and related entries.",
      href: `/tools/firearm-catalog/weapons/${weapons[0].slug}`,
    });
  }

  return links;
}
