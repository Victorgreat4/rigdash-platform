import type {
  CartridgeRecord,
  WeaponRecord,
} from "@/lib/firearms/queries";
import type { RecommendedNextItem } from "@/lib/firearms/discovery";

type RecommendationCandidate = RecommendedNextItem & {
  score: number;
};

function extractEraSignals(value: string | null | undefined) {
  const source = value ?? "";
  const signals: string[] = [];
  const generationMatch = source.match(/gen\s*(\d+)/i);
  const revisionMatch = source.match(/\b(a\d+)\b/i);
  const natoMatch = source.match(/\bnato\b/i);

  if (generationMatch) {
    signals.push(`gen-${generationMatch[1]}`);
  }

  if (revisionMatch) {
    signals.push(revisionMatch[1].toLowerCase());
  }

  if (natoMatch) {
    signals.push("nato-era");
  }

  return signals;
}

function uniqueReasons(reasons: string[]) {
  return [...new Set(reasons)];
}

function scoreRelatedWeapon(
  current: WeaponRecord,
  candidate: WeaponRecord
): RecommendationCandidate {
  let score = 0;
  const reasons: string[] = [];

  if (candidate.platform && candidate.platform === current.platform) {
    score += 6;
    reasons.push("Same family");
  }

  if (
    candidate.manufacturer?.slug &&
    candidate.manufacturer.slug === current.manufacturer?.slug
  ) {
    score += 4;
    reasons.push("Historically related maker lineage");
  }

  if (candidate.weapon_type === current.weapon_type) {
    score += 3;
    reasons.push("Similar type/category");
  }

  const currentEraSignals = extractEraSignals(
    `${current.name} ${current.notes ?? ""}`
  );
  const candidateEraSignals = extractEraSignals(
    `${candidate.name} ${candidate.notes ?? ""}`
  );

  if (candidateEraSignals.some((signal) => currentEraSignals.includes(signal))) {
    score += 2;
    reasons.push("Same era signal");
  }

  const currentCartridgeSlugs = new Set(
    current.compatibility.map((item) => item.cartridge?.slug).filter(Boolean)
  );
  const candidateCartridgeSlugs = candidate.compatibility
    .map((item) => item.cartridge?.slug)
    .filter(Boolean);

  if (candidateCartridgeSlugs.some((slug) => currentCartridgeSlugs.has(slug))) {
    score += 4;
    reasons.push("Compatibility relationship");
  }

  return {
    title: `Compare with ${candidate.name}`,
    description:
      "Use this neighboring weapon page to compare platform choices, lineage, and ammunition relationships.",
    href: `/tools/firearm-catalog/weapons/${candidate.slug}`,
    eyebrow: "Related weapon",
    reasons: uniqueReasons(reasons),
    score,
  };
}

function scoreRelatedCartridge(
  current: CartridgeRecord,
  candidate: CartridgeRecord
): RecommendationCandidate {
  let score = 0;
  const reasons: string[] = [];

  if (candidate.caliber === current.caliber) {
    score += 6;
    reasons.push("Same family");
  }

  if (candidate.cartridge_type === current.cartridge_type) {
    score += 4;
    reasons.push("Similar type/category");
  }

  if (
    candidate.manufacturer?.slug &&
    candidate.manufacturer.slug === current.manufacturer?.slug
  ) {
    score += 2;
    reasons.push("Historically related maker lineage");
  }

  const currentEraSignals = extractEraSignals(`${current.name} ${current.notes ?? ""}`);
  const candidateEraSignals = extractEraSignals(
    `${candidate.name} ${candidate.notes ?? ""}`
  );

  if (candidateEraSignals.some((signal) => currentEraSignals.includes(signal))) {
    score += 2;
    reasons.push("Same era signal");
  }

  return {
    title: `Compare with ${candidate.name}`,
    description:
      "Use this related cartridge to build a side-by-side understanding of family, category, and usage differences.",
    href: `/tools/firearm-catalog/cartridges/${candidate.slug}`,
    eyebrow: "Related cartridge",
    reasons: uniqueReasons(reasons),
    score,
  };
}

export function getRecommendedNextForWeaponPage(
  weapon: WeaponRecord,
  allWeapons: WeaponRecord[],
  allCartridges: CartridgeRecord[]
): RecommendedNextItem[] {
  const candidates: RecommendationCandidate[] = [];
  const currentCompatibleCartridges = weapon.compatibility
    .map((item) => item.cartridge)
    .filter((item): item is CartridgeRecord => Boolean(item));

  for (const cartridge of currentCompatibleCartridges) {
    candidates.push({
      title: `Trace ${cartridge.name}`,
      description:
        "Follow the most direct ammunition relationship from this weapon into a cartridge page.",
      href: `/tools/firearm-catalog/cartridges/${cartridge.slug}`,
      eyebrow: "Compatibility first",
      reasons: ["Compatibility relationship", "Same family"],
      score: 12,
    });
  }

  for (const candidate of allWeapons) {
    if (candidate.slug === weapon.slug) {
      continue;
    }

    const scored = scoreRelatedWeapon(weapon, candidate);
    if (scored.score > 0) {
      candidates.push(scored);
    }
  }

  for (const candidate of allCartridges) {
    if (
      currentCompatibleCartridges.some(
        (compatible) => compatible.slug === candidate.slug
      )
    ) {
      continue;
    }

    if (
      currentCompatibleCartridges.some(
        (compatible) =>
          compatible.caliber === candidate.caliber ||
          compatible.cartridge_type === candidate.cartridge_type
      )
    ) {
      candidates.push({
        title: `Branch into ${candidate.name}`,
        description:
          "Move from direct compatibility into a neighboring cartridge family to keep the learning chain going.",
        href: `/tools/firearm-catalog/cartridges/${candidate.slug}`,
        eyebrow: "Expand the ammo family",
        reasons: ["Same family", "Similar type/category"],
        score: 5,
      });
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .filter(
      (candidate, index, array) =>
        array.findIndex((item) => item.href === candidate.href) === index
    )
    .slice(0, 3)
    .map((candidate) => ({
      title: candidate.title,
      description: candidate.description,
      href: candidate.href,
      eyebrow: candidate.eyebrow,
      reasons: candidate.reasons,
    }));
}

export function getRecommendedNextForCartridgePage(
  cartridge: CartridgeRecord,
  compatibleWeapons: WeaponRecord[],
  allCartridges: CartridgeRecord[],
  allWeapons: WeaponRecord[]
): RecommendedNextItem[] {
  const candidates: RecommendationCandidate[] = [];

  for (const weapon of compatibleWeapons) {
    candidates.push({
      title: `See ${weapon.name} in context`,
      description:
        "Start with the strongest link first by opening a weapon that directly matches this cartridge.",
      href: `/tools/firearm-catalog/weapons/${weapon.slug}`,
      eyebrow: "Compatibility first",
      reasons: ["Compatibility relationship", "Similar type/category"],
      score: 12,
    });
  }

  for (const candidate of allCartridges) {
    if (candidate.slug === cartridge.slug) {
      continue;
    }

    const scored = scoreRelatedCartridge(cartridge, candidate);
    if (scored.score > 0) {
      candidates.push(scored);
    }
  }

  const familyWeapons = allWeapons.filter(
    (weapon) =>
      !compatibleWeapons.some((candidate) => candidate.slug === weapon.slug) &&
      weapon.compatibility.some(
        (link) =>
          link.cartridge?.caliber === cartridge.caliber ||
          link.cartridge?.cartridge_type === cartridge.cartridge_type
      )
  );

  for (const weapon of familyWeapons) {
    candidates.push({
      title: `Explore ${weapon.name}`,
      description:
        "Use a related platform to see how this cartridge family shows up outside the direct compatibility list.",
      href: `/tools/firearm-catalog/weapons/${weapon.slug}`,
      eyebrow: "Related platform",
      reasons: ["Same family", "Historically related entries"],
      score: 5,
    });
  }

  return candidates
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .filter(
      (candidate, index, array) =>
        array.findIndex((item) => item.href === candidate.href) === index
    )
    .slice(0, 3)
    .map((candidate) => ({
      title: candidate.title,
      description: candidate.description,
      href: candidate.href,
      eyebrow: candidate.eyebrow,
      reasons: candidate.reasons,
    }));
}
