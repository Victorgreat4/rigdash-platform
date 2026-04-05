insert into public.countries (name, slug, iso_alpha2)
values
  ('United States', 'united-states', 'US'),
  ('Germany', 'germany', 'DE'),
  ('Austria', 'austria', 'AT')
on conflict (slug) do update
set
  name = excluded.name,
  iso_alpha2 = excluded.iso_alpha2;

insert into public.manufacturers (name, slug, website, country_id)
values
  (
    'Glock',
    'glock',
    'https://eu.glock.com',
    (select id from public.countries where slug = 'austria')
  ),
  (
    'Heckler & Koch',
    'heckler-koch',
    'https://www.heckler-koch.com',
    (select id from public.countries where slug = 'germany')
  ),
  (
    'Federal Premium',
    'federal-premium',
    'https://www.federalpremium.com',
    (select id from public.countries where slug = 'united-states')
  )
on conflict (slug) do update
set
  name = excluded.name,
  website = excluded.website,
  country_id = excluded.country_id;

insert into public.cartridges (
  name,
  slug,
  caliber,
  cartridge_type,
  casing_material,
  notes,
  manufacturer_id,
  country_id
)
values
  (
    '9x19mm NATO',
    '9x19mm-nato',
    '9mm',
    'centerfire',
    'brass',
    'Common service pistol cartridge with broad platform support.',
    (select id from public.manufacturers where slug = 'federal-premium'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    '.45 ACP',
    '45-acp',
    '.45',
    'centerfire',
    'brass',
    'Subsonic-friendly pistol cartridge with heavy bullet weights.',
    (select id from public.manufacturers where slug = 'federal-premium'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    '5.56x45mm NATO',
    '5-56x45mm-nato',
    '5.56mm',
    'centerfire',
    'brass',
    'Standard intermediate rifle cartridge for AR-platform rifles.',
    (select id from public.manufacturers where slug = 'federal-premium'),
    (select id from public.countries where slug = 'united-states')
  )
on conflict (slug) do update
set
  name = excluded.name,
  caliber = excluded.caliber,
  cartridge_type = excluded.cartridge_type,
  casing_material = excluded.casing_material,
  notes = excluded.notes,
  manufacturer_id = excluded.manufacturer_id,
  country_id = excluded.country_id;

insert into public.weapons (
  name,
  slug,
  weapon_type,
  platform,
  action_type,
  barrel_length_mm,
  notes,
  manufacturer_id,
  country_id
)
values
  (
    'Glock 17 Gen5',
    'glock-17-gen5',
    'pistol',
    'Glock',
    'striker-fired',
    114,
    'Full-size duty pistol.',
    (select id from public.manufacturers where slug = 'glock'),
    (select id from public.countries where slug = 'austria')
  ),
  (
    'HK USP .45',
    'hk-usp-45',
    'pistol',
    'USP',
    'recoil-operated',
    112,
    'Full-size .45 ACP service pistol.',
    (select id from public.manufacturers where slug = 'heckler-koch'),
    (select id from public.countries where slug = 'germany')
  ),
  (
    'MR556 A1',
    'mr556-a1',
    'rifle',
    'AR-15',
    'gas-operated',
    419,
    'Civilian 5.56 NATO rifle based on HK416 lineage.',
    (select id from public.manufacturers where slug = 'heckler-koch'),
    (select id from public.countries where slug = 'germany')
  )
on conflict (slug) do update
set
  name = excluded.name,
  weapon_type = excluded.weapon_type,
  platform = excluded.platform,
  action_type = excluded.action_type,
  barrel_length_mm = excluded.barrel_length_mm,
  notes = excluded.notes,
  manufacturer_id = excluded.manufacturer_id,
  country_id = excluded.country_id;

insert into public.weapon_cartridge_compatibility (
  weapon_id,
  cartridge_id,
  compatibility_type,
  notes
)
values
  (
    (select id from public.weapons where slug = 'glock-17-gen5'),
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'supported',
    'Factory chambering.'
  ),
  (
    (select id from public.weapons where slug = 'hk-usp-45'),
    (select id from public.cartridges where slug = '45-acp'),
    'supported',
    'Factory chambering.'
  ),
  (
    (select id from public.weapons where slug = 'mr556-a1'),
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'supported',
    'Optimized for 5.56 NATO pressure loads.'
  )
on conflict (weapon_id, cartridge_id) do update
set
  compatibility_type = excluded.compatibility_type,
  notes = excluded.notes;

insert into public.learning_paths (
  title,
  slug,
  description,
  level,
  estimated_minutes
)
values
  (
    'First steps with service pistols',
    'first-steps-service-pistols',
    'Start with a common pistol cartridge, move into two compatible sidearms, and learn how platform comparisons work.',
    'beginner',
    12
  ),
  (
    'Understanding rifle compatibility',
    'understanding-rifle-compatibility',
    'Follow one rifle cartridge into a compatible platform so the relationship between round and weapon feels concrete.',
    'beginner',
    10
  ),
  (
    'Compare common defensive handgun rounds',
    'compare-defensive-handgun-rounds',
    'Use neighboring pistol cartridges and compatible handguns to build side-by-side intuition.',
    'intermediate',
    14
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  level = excluded.level,
  estimated_minutes = excluded.estimated_minutes;

insert into public.learning_path_items (
  learning_path_id,
  item_order,
  entry_type,
  cartridge_id,
  weapon_id,
  title_override,
  description
)
values
  (
    (select id from public.learning_paths where slug = 'first-steps-service-pistols'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '9x19mm-nato'),
    null,
    'Start with 9x19mm NATO',
    'Learn the round first so the later weapon pages have context.'
  ),
  (
    (select id from public.learning_paths where slug = 'first-steps-service-pistols'),
    2,
    'weapon',
    null,
    (select id from public.weapons where slug = 'glock-17-gen5'),
    'See a full-size striker-fired pistol',
    'Connect the cartridge to a widely recognized sidearm platform.'
  ),
  (
    (select id from public.learning_paths where slug = 'first-steps-service-pistols'),
    3,
    'weapon',
    null,
    (select id from public.weapons where slug = 'hk-usp-45'),
    'Contrast against another service pistol',
    'Notice what changes when the cartridge and operating feel shift.'
  ),
  (
    (select id from public.learning_paths where slug = 'understanding-rifle-compatibility'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    null,
    'Meet a common rifle cartridge',
    'Use the cartridge as the anchor before stepping into the platform.'
  ),
  (
    (select id from public.learning_paths where slug = 'understanding-rifle-compatibility'),
    2,
    'weapon',
    null,
    (select id from public.weapons where slug = 'mr556-a1'),
    'Move into a compatible rifle',
    'See how compatibility turns a cartridge spec into a real platform choice.'
  ),
  (
    (select id from public.learning_paths where slug = 'compare-defensive-handgun-rounds'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '9x19mm-nato'),
    null,
    'Review 9x19mm NATO',
    'Start with a common baseline for modern handguns.'
  ),
  (
    (select id from public.learning_paths where slug = 'compare-defensive-handgun-rounds'),
    2,
    'cartridge',
    (select id from public.cartridges where slug = '45-acp'),
    null,
    'Compare with .45 ACP',
    'Use a second cartridge to make tradeoffs and family differences easier to notice.'
  ),
  (
    (select id from public.learning_paths where slug = 'compare-defensive-handgun-rounds'),
    3,
    'weapon',
    null,
    (select id from public.weapons where slug = 'glock-17-gen5'),
    'See the 9mm platform pairing',
    'Connect the first cartridge to a representative sidearm.'
  ),
  (
    (select id from public.learning_paths where slug = 'compare-defensive-handgun-rounds'),
    4,
    'weapon',
    null,
    (select id from public.weapons where slug = 'hk-usp-45'),
    'See the .45 platform pairing',
    'Finish by comparing two cartridge-to-weapon relationships side by side.'
  )
on conflict (learning_path_id, item_order) do update
set
  entry_type = excluded.entry_type,
  cartridge_id = excluded.cartridge_id,
  weapon_id = excluded.weapon_id,
  title_override = excluded.title_override,
  description = excluded.description;
