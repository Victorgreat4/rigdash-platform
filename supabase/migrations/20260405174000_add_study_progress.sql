create table if not exists public.study_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_type text not null,
  cartridge_id uuid references public.cartridges(id) on delete cascade,
  weapon_id uuid references public.weapons(id) on delete cascade,
  learned_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  constraint study_progress_user_entry_unique unique (user_id, entry_type, cartridge_id, weapon_id),
  constraint study_progress_entry_target_check check (
    (entry_type = 'cartridge' and cartridge_id is not null and weapon_id is null) or
    (entry_type = 'weapon' and weapon_id is not null and cartridge_id is null)
  )
);

create index if not exists study_progress_user_id_idx
  on public.study_progress (user_id);

create index if not exists study_progress_cartridge_id_idx
  on public.study_progress (cartridge_id);

create index if not exists study_progress_weapon_id_idx
  on public.study_progress (weapon_id);
