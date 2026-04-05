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
