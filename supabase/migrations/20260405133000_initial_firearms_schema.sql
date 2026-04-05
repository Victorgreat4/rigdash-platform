create extension if not exists pgcrypto;

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  iso_alpha2 char(2),
  created_at timestamptz not null default timezone('utc', now()),
  constraint countries_name_key unique (name),
  constraint countries_slug_key unique (slug),
  constraint countries_iso_alpha2_key unique (iso_alpha2)
);

create table if not exists public.manufacturers (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete set null,
  name text not null,
  slug text not null,
  website text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint manufacturers_name_key unique (name),
  constraint manufacturers_slug_key unique (slug)
);

create table if not exists public.cartridges (
  id uuid primary key default gen_random_uuid(),
  manufacturer_id uuid references public.manufacturers(id) on delete set null,
  country_id uuid references public.countries(id) on delete set null,
  name text not null,
  slug text not null,
  caliber text not null,
  cartridge_type text not null,
  casing_material text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint cartridges_slug_key unique (slug),
  constraint cartridges_name_key unique (name)
);

create table if not exists public.weapons (
  id uuid primary key default gen_random_uuid(),
  manufacturer_id uuid references public.manufacturers(id) on delete set null,
  country_id uuid references public.countries(id) on delete set null,
  name text not null,
  slug text not null,
  weapon_type text not null,
  platform text,
  action_type text,
  barrel_length_mm numeric(6, 2),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint weapons_slug_key unique (slug)
);

create table if not exists public.weapon_cartridge_compatibility (
  id uuid primary key default gen_random_uuid(),
  weapon_id uuid not null references public.weapons(id) on delete cascade,
  cartridge_id uuid not null references public.cartridges(id) on delete cascade,
  compatibility_type text not null default 'supported',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint weapon_cartridge_compatibility_weapon_id_cartridge_id_key unique (weapon_id, cartridge_id)
);

create index if not exists manufacturers_country_id_idx
  on public.manufacturers (country_id);

create index if not exists cartridges_manufacturer_id_idx
  on public.cartridges (manufacturer_id);

create index if not exists cartridges_country_id_idx
  on public.cartridges (country_id);

create index if not exists weapons_manufacturer_id_idx
  on public.weapons (manufacturer_id);

create index if not exists weapons_country_id_idx
  on public.weapons (country_id);

create index if not exists weapon_cartridge_compatibility_weapon_id_idx
  on public.weapon_cartridge_compatibility (weapon_id);

create index if not exists weapon_cartridge_compatibility_cartridge_id_idx
  on public.weapon_cartridge_compatibility (cartridge_id);
