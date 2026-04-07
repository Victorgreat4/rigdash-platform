import type { CartridgeRecord, WeaponRecord } from "@/lib/firearms/queries";

export type StudyFact = {
  label: string;
  value: string;
};

export type SelfCheckPrompt = {
  question: string;
  hint: string;
};

export type StudySummary = {
  title: string;
  description: string;
};

export function getCartridgeStudyFacts(
  cartridge: CartridgeRecord,
  compatibleWeaponCount: number
): StudyFact[] {
  return [
    { label: "Caliber", value: cartridge.caliber },
    { label: "Cartridge type", value: cartridge.cartridge_type },
    { label: "Casing", value: cartridge.casing_material ?? "Not listed" },
    { label: "Named loads", value: String(cartridge.ammo_variants.length) },
    { label: "Compatible weapons", value: String(compatibleWeaponCount) },
  ];
}

export function getWeaponStudyFacts(weapon: WeaponRecord): StudyFact[] {
  return [
    { label: "Weapon type", value: weapon.weapon_type },
    { label: "Platform", value: weapon.platform ?? "General platform" },
    { label: "Action type", value: weapon.action_type ?? "Not listed" },
    {
      label: "Compatible cartridges",
      value: String(weapon.compatibility.length),
    },
  ];
}

export function getCartridgeStudySummary(
  cartridge: CartridgeRecord,
  compatibleWeaponCount: number
): StudySummary {
  return {
    title: "Simplified summary",
    description: `${cartridge.name} is a ${cartridge.cartridge_type} cartridge in ${cartridge.caliber}. In this encyclopedia it connects to ${compatibleWeaponCount} compatible weapon${compatibleWeaponCount === 1 ? "" : "s"} and ${cartridge.ammo_variants.length} named load${cartridge.ammo_variants.length === 1 ? "" : "s"}, making it a good anchor for cartridge-first study.`,
  };
}

export function getWeaponStudySummary(weapon: WeaponRecord): StudySummary {
  return {
    title: "Simplified summary",
    description: `${weapon.name} is a ${weapon.weapon_type}${weapon.platform ? ` on the ${weapon.platform} platform` : ""}${weapon.action_type ? ` with a ${weapon.action_type} action` : ""}. This page is most useful for learning how one weapon connects back to ammunition and nearby platform choices.`,
  };
}

export function getCartridgeSelfCheckPrompts(
  cartridge: CartridgeRecord
): SelfCheckPrompt[] {
  return [
    {
      question: `What two labels help you identify ${cartridge.name} fastest?`,
      hint: "Look at caliber and cartridge type first.",
    },
    {
      question: `Why would ${cartridge.name} be a good starting point for studying compatible weapons?`,
      hint: "Think about how cartridges anchor the rest of the relationship map.",
    },
    {
      question: `What should you compare next after reading this page?`,
      hint: "Choose either a compatible weapon or a similar cartridge.",
    },
  ];
}

export function getWeaponSelfCheckPrompts(
  weapon: WeaponRecord
): SelfCheckPrompt[] {
  return [
    {
      question: `Which three labels best frame ${weapon.name} at a glance?`,
      hint: "Use weapon type, platform, and action type.",
    },
    {
      question: `Why does compatibility matter on this weapon page?`,
      hint: "It links the platform back to the ammunition side.",
    },
    {
      question: `What would be the smartest next comparison after this page?`,
      hint: "Pick either a compatible cartridge or a similar weapon.",
    },
  ];
}
