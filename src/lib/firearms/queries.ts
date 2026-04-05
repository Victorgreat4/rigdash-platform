import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database";

type AppSupabaseClient = SupabaseClient<Database>;

export type LinkedCountry = {
  id: string;
  name: string;
  slug: string;
  iso_alpha2: string | null;
};

export type LinkedManufacturer = {
  id: string;
  name: string;
  slug: string;
  website?: string | null;
};

export type CartridgeRecord = {
  id: string;
  name: string;
  slug: string;
  caliber: string;
  cartridge_type: string;
  casing_material: string | null;
  notes: string | null;
  created_at: string;
  manufacturer: LinkedManufacturer | null;
  country: LinkedCountry | null;
};

export type CompatibilityRecord = {
  id: string;
  compatibility_type: string;
  notes: string | null;
  created_at: string;
  weapon_id: string;
  cartridge: CartridgeRecord | null;
};

export type WeaponRecord = {
  id: string;
  name: string;
  slug: string;
  weapon_type: string;
  platform: string | null;
  action_type: string | null;
  barrel_length_mm: number | null;
  notes: string | null;
  created_at: string;
  manufacturer: LinkedManufacturer | null;
  country: LinkedCountry | null;
  compatibility: CompatibilityRecord[];
};

export type LearningPathEntrySummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  typeLabel: string;
  href: string;
};

export type LearningPathItemRecord = {
  id: string;
  item_order: number;
  entry_type: "cartridge" | "weapon";
  title_override: string | null;
  description: string | null;
  cartridge: CartridgeRecord | null;
  weapon: WeaponRecord | null;
};

export type LearningPathRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  estimated_minutes: number | null;
  created_at: string;
  items: LearningPathItemRecord[];
};

const CARTRIDGE_SELECT = `
  id,
  name,
  slug,
  caliber,
  cartridge_type,
  casing_material,
  notes,
  created_at,
  manufacturer:manufacturers (
    id,
    name,
    slug,
    website
  ),
  country:countries (
    id,
    name,
    slug,
    iso_alpha2
  )
`;

const WEAPON_SELECT = `
  id,
  name,
  slug,
  weapon_type,
  platform,
  action_type,
  barrel_length_mm,
  notes,
  created_at,
  manufacturer:manufacturers (
    id,
    name,
    slug,
    website
  ),
  country:countries (
    id,
    name,
    slug,
    iso_alpha2
  ),
  compatibility:weapon_cartridge_compatibility (
    id,
    weapon_id,
    compatibility_type,
    notes,
    created_at,
    cartridge:cartridges (
      id,
      name,
      slug,
      caliber,
      cartridge_type,
      casing_material,
      notes,
      created_at,
      manufacturer:manufacturers (
        id,
        name,
        slug,
        website
      ),
      country:countries (
        id,
        name,
        slug,
        iso_alpha2
      )
    )
  )
`;

const COMPATIBILITY_SELECT = `
  id,
  weapon_id,
  compatibility_type,
  notes,
  created_at,
  cartridge:cartridges (
    id,
    name,
    slug,
    caliber,
    cartridge_type,
    casing_material,
    notes,
    created_at,
    manufacturer:manufacturers (
      id,
      name,
      slug,
      website
    ),
    country:countries (
      id,
      name,
      slug,
      iso_alpha2
    )
  )
`;

const LEARNING_PATH_ITEM_SELECT = `
  id,
  item_order,
  entry_type,
  title_override,
  description,
  cartridge:cartridges (
    id,
    name,
    slug,
    caliber,
    cartridge_type,
    casing_material,
    notes,
    created_at,
    manufacturer:manufacturers (
      id,
      name,
      slug,
      website
    ),
    country:countries (
      id,
      name,
      slug,
      iso_alpha2
    )
  ),
  weapon:weapons (
    id,
    name,
    slug,
    weapon_type,
    platform,
    action_type,
    barrel_length_mm,
    notes,
    created_at,
    manufacturer:manufacturers (
      id,
      name,
      slug,
      website
    ),
    country:countries (
      id,
      name,
      slug,
      iso_alpha2
    ),
    compatibility:weapon_cartridge_compatibility (
      id,
      weapon_id,
      compatibility_type,
      notes,
      created_at,
      cartridge:cartridges (
        id,
        name,
        slug,
        caliber,
        cartridge_type,
        casing_material,
        notes,
        created_at,
        manufacturer:manufacturers (
          id,
          name,
          slug,
          website
        ),
        country:countries (
          id,
          name,
          slug,
          iso_alpha2
        )
      )
    )
  )
`;

const LEARNING_PATH_SELECT = `
  id,
  title,
  slug,
  description,
  level,
  estimated_minutes,
  created_at,
  items:learning_path_items (
    ${LEARNING_PATH_ITEM_SELECT}
  )
`;

export async function getCartridges(client: AppSupabaseClient) {
  return client
    .from("cartridges")
    .select(CARTRIDGE_SELECT)
    .order("name", { ascending: true })
    .returns<CartridgeRecord[]>();
}

export async function getWeapons(client: AppSupabaseClient) {
  return client
    .from("weapons")
    .select(WEAPON_SELECT)
    .order("name", { ascending: true })
    .returns<WeaponRecord[]>();
}

export async function getWeaponCartridgeCompatibility(client: AppSupabaseClient) {
  return client
    .from("weapon_cartridge_compatibility")
    .select(COMPATIBILITY_SELECT)
    .order("created_at", { ascending: true })
    .returns<CompatibilityRecord[]>();
}

export async function getCartridgeBySlug(
  client: AppSupabaseClient,
  slug: string
) {
  return client
    .from("cartridges")
    .select(CARTRIDGE_SELECT)
    .eq("slug", slug)
    .maybeSingle()
    .returns<CartridgeRecord | null>();
}

export async function getWeaponBySlug(client: AppSupabaseClient, slug: string) {
  return client
    .from("weapons")
    .select(WEAPON_SELECT)
    .eq("slug", slug)
    .maybeSingle()
    .returns<WeaponRecord | null>();
}

export async function getLearningPaths(client: AppSupabaseClient) {
  return client
    .from("learning_paths")
    .select(LEARNING_PATH_SELECT)
    .order("title", { ascending: true })
    .returns<LearningPathRecord[]>();
}

export async function getLearningPathBySlug(
  client: AppSupabaseClient,
  slug: string
) {
  return client
    .from("learning_paths")
    .select(LEARNING_PATH_SELECT)
    .eq("slug", slug)
    .maybeSingle()
    .returns<LearningPathRecord | null>();
}

export function getLearningPathItemSummary(
  item: LearningPathItemRecord
): LearningPathEntrySummary {
  if (item.entry_type === "cartridge" && item.cartridge) {
    return {
      id: item.cartridge.id,
      name: item.title_override ?? item.cartridge.name,
      slug: item.cartridge.slug,
      description:
        item.description ??
        item.cartridge.notes ??
        "Open this cartridge to continue the path.",
      typeLabel: `${item.cartridge.caliber} / ${item.cartridge.cartridge_type}`,
      href: `/tools/firearm-catalog/cartridges/${item.cartridge.slug}`,
    };
  }

  if (item.weapon) {
    return {
      id: item.weapon.id,
      name: item.title_override ?? item.weapon.name,
      slug: item.weapon.slug,
      description:
        item.description ??
        item.weapon.notes ??
        "Open this weapon to continue the path.",
      typeLabel: [item.weapon.weapon_type, item.weapon.platform, item.weapon.action_type]
        .filter(Boolean)
        .join(" / "),
      href: `/tools/firearm-catalog/weapons/${item.weapon.slug}`,
    };
  }

  return {
    id: item.id,
    name: item.title_override ?? "Unknown entry",
    slug: item.id,
    description: item.description ?? "Path item details are unavailable.",
    typeLabel: item.entry_type,
    href: "/paths",
  };
}
