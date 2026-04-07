create table if not exists public.ammo_variants (
  id uuid primary key default gen_random_uuid(),
  cartridge_id uuid not null references public.cartridges(id) on delete cascade,
  name text not null,
  slug text not null,
  variant_type text not null,
  source_game text not null,
  relative_penetration text,
  relative_damage text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint ammo_variants_slug_key unique (slug),
  constraint ammo_variants_cartridge_id_name_key unique (cartridge_id, name)
);

create index if not exists ammo_variants_cartridge_id_idx
  on public.ammo_variants (cartridge_id);
