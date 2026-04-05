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
