create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  description text not null,
  level text not null default 'beginner',
  estimated_minutes integer,
  created_at timestamptz not null default timezone('utc', now()),
  constraint learning_paths_slug_key unique (slug)
);

create table if not exists public.learning_path_items (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references public.learning_paths(id) on delete cascade,
  item_order integer not null,
  entry_type text not null,
  cartridge_id uuid references public.cartridges(id) on delete cascade,
  weapon_id uuid references public.weapons(id) on delete cascade,
  title_override text,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint learning_path_items_learning_path_id_item_order_key unique (learning_path_id, item_order),
  constraint learning_path_items_entry_target_check check (
    (entry_type = 'cartridge' and cartridge_id is not null and weapon_id is null) or
    (entry_type = 'weapon' and weapon_id is not null and cartridge_id is null)
  )
);

create index if not exists learning_path_items_learning_path_id_idx
  on public.learning_path_items (learning_path_id);

create index if not exists learning_path_items_cartridge_id_idx
  on public.learning_path_items (cartridge_id);

create index if not exists learning_path_items_weapon_id_idx
  on public.learning_path_items (weapon_id);
