insert into public.countries (name, slug, iso_alpha2)
values
  ('United States', 'united-states', 'US'),
  ('Germany', 'germany', 'DE'),
  ('Austria', 'austria', 'AT'),
  ('Russia', 'russia', 'RU'),
  ('Belgium', 'belgium', 'BE')
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
  ),
  (
    'Kalashnikov Concern',
    'kalashnikov-concern',
    'https://kalashnikovgroup.ru',
    (select id from public.countries where slug = 'russia')
  ),
  (
    'Colt',
    'colt',
    'https://www.colt.com',
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'FN Herstal',
    'fn-herstal',
    'https://fnherstal.com',
    (select id from public.countries where slug = 'belgium')
  ),
  (
    'Remington',
    'remington',
    'https://www.remarms.com',
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'Molot',
    'molot',
    'https://molot.biz',
    (select id from public.countries where slug = 'russia')
  ),
  (
    'Tula Arms Plant',
    'tula-arms-plant',
    null,
    (select id from public.countries where slug = 'russia')
  ),
  (
    'Knight''s Armament Company',
    'knights-armament-company',
    'https://www.kacsr25.com',
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'KRISS',
    'kriss',
    'https://kriss-usa.com',
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'TsNIITochMash',
    'tsniitochmash',
    null,
    (select id from public.countries where slug = 'russia')
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
  ),
  (
    '5.45x39mm',
    '5-45x39mm',
    '5.45mm',
    'centerfire',
    'steel',
    'Light intermediate rifle cartridge strongly associated with the AK-74 family and common in Tarkov-style weapon lineups.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    '7.62x39mm',
    '7-62x39mm',
    '7.62mm',
    'centerfire',
    'steel',
    'Classic intermediate cartridge tied to the AKM, SKS, and other highly recognizable Eastern platforms.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    '7.62x51mm NATO',
    '7-62x51mm-nato',
    '7.62mm',
    'centerfire',
    'brass',
    'Full-power rifle cartridge common in battle rifles and DMRs such as the FAL, SCAR-H, and M110 families.',
    (select id from public.manufacturers where slug = 'federal-premium'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    '7.62x54R',
    '7-62x54r',
    '7.62mm',
    'centerfire',
    'steel',
    'Long-serving rimmed rifle cartridge best known through Mosin-Nagant rifles, PK-pattern machine guns, and marksman rifles.',
    (select id from public.manufacturers where slug = 'tula-arms-plant'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    '12x70mm',
    '12x70mm',
    '12 gauge',
    'shotshell',
    'plastic',
    'Standard 12-gauge shotgun shell family used by many pump-action and semi-automatic shotguns.',
    (select id from public.manufacturers where slug = 'federal-premium'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    '9x39mm',
    '9x39mm',
    '9mm',
    'centerfire',
    'steel',
    'Heavy subsonic rifle cartridge closely associated with suppressed Russian platforms like the VSS and AS VAL.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    '5.7x28mm',
    '5-7x28mm',
    '5.7mm',
    'centerfire',
    'brass',
    'High-velocity small-caliber cartridge linked to PDWs and pistols such as the P90 and Five-seveN.',
    (select id from public.manufacturers where slug = 'fn-herstal'),
    (select id from public.countries where slug = 'belgium')
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

insert into public.ammo_variants (
  cartridge_id,
  name,
  slug,
  variant_type,
  source_game,
  relative_penetration,
  relative_damage,
  notes
)
values
  (
    (select id from public.cartridges where slug = '5-45x39mm'),
    'PS',
    '5-45x39mm-ps',
    'ball',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'low',
    'medium',
    'Common baseline 5.45 loading that works well as an entry point before users compare BP and BS.'
  ),
  (
    (select id from public.cartridges where slug = '5-45x39mm'),
    'BP',
    '5-45x39mm-bp',
    'armor-piercing',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'high',
    'medium',
    'Named 5.45 round that players often recognize as a stronger penetration step above early loads.'
  ),
  (
    (select id from public.cartridges where slug = '5-45x39mm'),
    'BS',
    '5-45x39mm-bs',
    'armor-piercing',
    'Escape from Tarkov',
    'very high',
    'medium',
    'One of the best-known high-penetration Tarkov 5.45 loads.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x39mm'),
    'HP',
    '7-62x39mm-hp',
    'expanding',
    'Arena Breakout: Infinite',
    'low',
    'high',
    'Recognizable ABI 7.62x39 hunting-style round that contrasts well against PS, BP, and AP.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x39mm'),
    'PS',
    '7-62x39mm-ps',
    'ball',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'medium',
    'medium',
    'Baseline service-style 7.62x39 load and a good anchor for AKM and SKS study.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x39mm'),
    'BP',
    '7-62x39mm-bp',
    'armor-piercing',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'high',
    'medium',
    'Famous upgraded 7.62x39 load that many players use as the obvious comparison target.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x39mm'),
    'AP',
    '7-62x39mm-ap',
    'armor-piercing',
    'Arena Breakout: Infinite',
    'very high',
    'medium',
    'Top-end ABI-style 7.62x39 load that rounds out the caliber ladder clearly.'
  ),
  (
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'M855',
    '5-56x45mm-nato-m855',
    'ball',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'medium',
    'medium',
    'Recognizable baseline 5.56 load used for early comparisons.'
  ),
  (
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'M855A1',
    '5-56x45mm-nato-m855a1',
    'enhanced-penetrator',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'high',
    'medium',
    'One of the most famous named 5.56 loads in extraction-shooter communities.'
  ),
  (
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'M995',
    '5-56x45mm-nato-m995',
    'armor-piercing',
    'Escape from Tarkov',
    'very high',
    'low',
    'Classic high-penetration 5.56 endgame comparison point.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'UN',
    '7-62x51mm-nato-un',
    'ball',
    'Arena Breakout: Infinite',
    'low',
    'high',
    'Low-tier ABI 7.62x51 load that makes the jump to M80, M62, and M61 easier to understand.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'BPZ',
    '7-62x51mm-nato-bpz',
    'ball',
    'Arena Breakout: Infinite',
    'medium',
    'high',
    'Mid-tier ABI 7.62x51 load that fills the gap between entry ammo and the better-known M80 family.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'M80',
    '7-62x51mm-nato-m80',
    'ball',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'medium',
    'high',
    'Standard full-power rifle load that anchors most 7.62x51 comparisons.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'M62',
    '7-62x51mm-nato-m62',
    'tracer',
    'Escape from Tarkov',
    'high',
    'high',
    'Well-known upgraded 7.62x51 option often compared directly with M80 and M61.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'M61',
    '7-62x51mm-nato-m61',
    'armor-piercing',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'very high',
    'medium',
    'Top-end named 7.62x51 armor-piercing load with very high player recognition.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x54r'),
    'LPS',
    '7-62x54r-lps',
    'ball',
    'Escape from Tarkov',
    'medium',
    'high',
    'Classic Mosin starting round and a useful baseline before SNB or 7N37.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x54r'),
    'SNB',
    '7-62x54r-snb',
    'armor-piercing',
    'Escape from Tarkov',
    'high',
    'medium',
    'Famous upgraded 7.62x54R load for marksman and bolt-action comparisons.'
  ),
  (
    (select id from public.cartridges where slug = '7-62x54r'),
    '7N37',
    '7-62x54r-7n37',
    'armor-piercing',
    'Escape from Tarkov',
    'very high',
    'medium',
    'Top-end armor-piercing 7.62x54R round with strong Tarkov recognition.'
  ),
  (
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'Pst gzh',
    '9x19mm-nato-pst-gzh',
    'ball',
    'Escape from Tarkov',
    'low',
    'medium',
    'Common baseline 9x19 round that sets up AP 6.3 and 7N31 comparisons.'
  ),
  (
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'AP 6.3',
    '9x19mm-nato-ap-6-3',
    'armor-piercing',
    'Escape from Tarkov',
    'medium',
    'medium',
    'One of the best-known named 9mm upgraded loads in Tarkov.'
  ),
  (
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'PBP gzh',
    '9x19mm-nato-pbp-gzh',
    'armor-piercing',
    'Escape from Tarkov',
    'high',
    'medium',
    'Another well-known late-tier Tarkov 9x19 option that helps the Vector and MP5 family feel more complete.'
  ),
  (
    (select id from public.cartridges where slug = '9x19mm-nato'),
    '7N31',
    '9x19mm-nato-7n31',
    'armor-piercing',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'high',
    'medium',
    'High-recognition 9x19 armor-piercing load for SMGs and pistols.'
  ),
  (
    (select id from public.cartridges where slug = '45-acp'),
    'FMJ',
    '45-acp-fmj',
    'ball',
    'Escape from Tarkov / Arena Breakout: Infinite',
    'low',
    'high',
    'Common .45 ACP baseline load that helps frame the UMP and USP as heavy-hitting but lower-penetration choices.'
  ),
  (
    (select id from public.cartridges where slug = '45-acp'),
    'AP',
    '45-acp-ap',
    'armor-piercing',
    'Escape from Tarkov',
    'medium',
    'medium',
    'Named upgraded .45 ACP load that gives the caliber a stronger progression arc.'
  ),
  (
    (select id from public.cartridges where slug = '12x70mm'),
    '8.5mm Buckshot',
    '12x70mm-8-5mm-buckshot',
    'buckshot',
    'Escape from Tarkov',
    'low',
    'very high',
    'Classic close-range shotgun load that players recognize immediately.'
  ),
  (
    (select id from public.cartridges where slug = '12x70mm'),
    'Flechette',
    '12x70mm-flechette',
    'flechette',
    'Escape from Tarkov',
    'medium',
    'high',
    'Very recognizable specialty shotgun loading in Tarkov-style discussions.'
  ),
  (
    (select id from public.cartridges where slug = '12x70mm'),
    'AP-20 Slug',
    '12x70mm-ap-20-slug',
    'slug',
    'Escape from Tarkov',
    'high',
    'high',
    'Named slug option that gives 12-gauge pages a clear precision-vs-spread contrast.'
  ),
  (
    (select id from public.cartridges where slug = '9x39mm'),
    'SP-5',
    '9x39mm-sp-5',
    'subsonic',
    'Escape from Tarkov',
    'medium',
    'high',
    'Foundational VSS and VAL round that explains why 9x39 feels distinct from ordinary rifle ammo.'
  ),
  (
    (select id from public.cartridges where slug = '9x39mm'),
    'SP-6',
    '9x39mm-sp-6',
    'armor-piercing',
    'Escape from Tarkov',
    'high',
    'medium',
    'Most famous upgraded 9x39 load and an essential named round for VSS study.'
  ),
  (
    (select id from public.cartridges where slug = '9x39mm'),
    '7N12 BP',
    '9x39mm-7n12-bp',
    'armor-piercing',
    'Escape from Tarkov',
    'very high',
    'medium',
    'Top-end 9x39 armor-piercing round with strong recognition among Tarkov players.'
  ),
  (
    (select id from public.cartridges where slug = '5-7x28mm'),
    'SS197SR',
    '5-7x28mm-ss197sr',
    'sporting',
    'Escape from Tarkov',
    'low',
    'medium',
    'Common P90-family load that helps newer users understand the lower end of the 5.7 ladder.'
  ),
  (
    (select id from public.cartridges where slug = '5-7x28mm'),
    'SS190',
    '5-7x28mm-ss190',
    'armor-piercing',
    'Escape from Tarkov',
    'high',
    'medium',
    'Signature P90 / Five-seveN load and the easiest named 5.7 round for users to recognize.'
  ),
  (
    (select id from public.cartridges where slug = '5-7x28mm'),
    'SB193',
    '5-7x28mm-sb193',
    'subsonic',
    'Escape from Tarkov',
    'medium',
    'medium',
    'Subsonic 5.7 option that makes the P90 cartridge family feel more varied than simple AP-vs-damage choices.'
  ),
  (
    (select id from public.cartridges where slug = '5-7x28mm'),
    'L191',
    '5-7x28mm-l191',
    'tracer',
    'Escape from Tarkov',
    'medium',
    'medium',
    'Recognizable tracer variant that helps show the family has more than one common identity.'
  ),
  (
    (select id from public.cartridges where slug = '5-7x28mm'),
    'SS198LF',
    '5-7x28mm-ss198lf',
    'hollow-point',
    'Escape from Tarkov',
    'low',
    'high',
    'High-damage 5.7 load that contrasts nicely with SS190 on a cartridge detail page.'
  )
on conflict (slug) do update
set
  cartridge_id = excluded.cartridge_id,
  name = excluded.name,
  variant_type = excluded.variant_type,
  source_game = excluded.source_game,
  relative_penetration = excluded.relative_penetration,
  relative_damage = excluded.relative_damage,
  notes = excluded.notes;

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
  ),
  (
    'AKM',
    'akm',
    'assault rifle',
    'AK',
    'gas-operated',
    415,
    'Iconic 7.62x39 rifle platform and one of the most recognizable weapons across Tarkov-style extraction shooters.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'AK-74N',
    'ak-74n',
    'assault rifle',
    'AK-74',
    'gas-operated',
    415,
    'Standard 5.45x39 AK-pattern rifle that gives the catalog a classic Eastern service rifle anchor.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'AKS-74U',
    'aks-74u',
    'carbine',
    'AK-74',
    'gas-operated',
    206,
    'Compact AK-pattern carbine widely recognized through games for close-quarters use and strong platform identity.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'M4A1 Carbine',
    'm4a1-carbine',
    'assault rifle',
    'AR-15',
    'gas-operated',
    368,
    'Baseline 5.56 platform for modern western rifles and one of the clearest comparison anchors in the catalog.',
    (select id from public.manufacturers where slug = 'colt'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'HK416A5',
    'hk416a5',
    'assault rifle',
    'AR-15',
    'gas-operated',
    368,
    'Premium 5.56 rifle platform with strong recognition among players who compare AR-pattern variants.',
    (select id from public.manufacturers where slug = 'heckler-koch'),
    (select id from public.countries where slug = 'germany')
  ),
  (
    'FN SCAR-L',
    'fn-scar-l',
    'assault rifle',
    'SCAR',
    'gas-operated',
    360,
    'Modern modular 5.56 rifle that helps users compare western assault-rifle families.',
    (select id from public.manufacturers where slug = 'fn-herstal'),
    (select id from public.countries where slug = 'belgium')
  ),
  (
    'FN SCAR-H',
    'fn-scar-h',
    'battle rifle',
    'SCAR',
    'gas-operated',
    406,
    '7.62x51 SCAR variant that makes caliber-to-platform comparisons more obvious than spec sheets alone.',
    (select id from public.manufacturers where slug = 'fn-herstal'),
    (select id from public.countries where slug = 'belgium')
  ),
  (
    'SKS',
    'sks',
    'carbine',
    'SKS',
    'gas-operated',
    520,
    'Semiautomatic 7.62x39 carbine that gives the catalog a familiar bridge between older military rifles and modern game loadouts.',
    (select id from public.manufacturers where slug = 'tula-arms-plant'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'MP5',
    'mp5',
    'submachine gun',
    'MP5',
    'roller-delayed blowback',
    225,
    'Classic 9x19 submachine gun and an easy entry point for players learning common SMG families.',
    (select id from public.manufacturers where slug = 'heckler-koch'),
    (select id from public.countries where slug = 'germany')
  ),
  (
    'UMP 45',
    'ump-45',
    'submachine gun',
    'UMP',
    'blowback',
    200,
    'Simple, recognizable .45 ACP submachine gun platform that rounds out early SMG comparisons.',
    (select id from public.manufacturers where slug = 'heckler-koch'),
    (select id from public.countries where slug = 'germany')
  ),
  (
    'Remington Model 870',
    'remington-model-870',
    'shotgun',
    'Model 870',
    'pump-action',
    470,
    'Foundational 12-gauge pump shotgun that helps users understand one of the most standard shotgun patterns in games.',
    (select id from public.manufacturers where slug = 'remington'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'Mosin-Nagant Infantry Rifle',
    'mosin-nagant-infantry-rifle',
    'bolt-action rifle',
    'Mosin-Nagant',
    'bolt-action',
    730,
    'Historic 7.62x54R rifle that remains highly recognizable in extraction shooters and survival games.',
    (select id from public.manufacturers where slug = 'tula-arms-plant'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'VSS Vintorez',
    'vss-vintorez',
    'marksman rifle',
    'VSS',
    'gas-operated',
    200,
    'Suppressed 9x39 platform with unusually strong identity in Tarkov-style ecosystems.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'RPK-16',
    'rpk-16',
    'light machine gun',
    'AK-12',
    'gas-operated',
    370,
    'Support-leaning 5.45 platform that extends AK-family learning into squad automatic roles.',
    (select id from public.manufacturers where slug = 'kalashnikov-concern'),
    (select id from public.countries where slug = 'russia')
  ),
  (
    'FN FAL',
    'fn-fal',
    'battle rifle',
    'FAL',
    'gas-operated',
    533,
    'Iconic 7.62x51 battle rifle and one of the easiest second-wave additions for users who know extraction shooters.',
    (select id from public.manufacturers where slug = 'fn-herstal'),
    (select id from public.countries where slug = 'belgium')
  ),
  (
    'M110',
    'm110',
    'marksman rifle',
    'SR-25 / M110',
    'gas-operated',
    508,
    'Semiautomatic 7.62x51 marksman rifle that gives the catalog a modern DMR anchor beyond the SCAR-H and Mosin.',
    (select id from public.manufacturers where slug = 'knights-armament-company'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'FN P90',
    'fn-p90',
    'submachine gun',
    'P90',
    'blowback',
    264,
    'High-recognition 5.7x28 PDW that players instantly associate with compact high-rate-of-fire builds.',
    (select id from public.manufacturers where slug = 'fn-herstal'),
    (select id from public.countries where slug = 'belgium')
  ),
  (
    'KRISS Vector 9x19',
    'kriss-vector-9x19',
    'submachine gun',
    'Vector',
    'delayed blowback',
    140,
    'Fast-firing 9mm Vector variant that rounds out the catalog''s high-control close-quarters weapon family.',
    (select id from public.manufacturers where slug = 'kriss'),
    (select id from public.countries where slug = 'united-states')
  ),
  (
    'AS VAL',
    'as-val',
    'assault rifle',
    'AS VAL',
    'gas-operated',
    200,
    'Suppressed 9x39 special-purpose rifle that pairs naturally with the VSS while still feeling like a distinct platform.',
    (select id from public.manufacturers where slug = 'tsniitochmash'),
    (select id from public.countries where slug = 'russia')
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
  ),
  (
    (select id from public.weapons where slug = 'akm'),
    (select id from public.cartridges where slug = '7-62x39mm'),
    'supported',
    'Standard chambering for the classic AKM pattern.'
  ),
  (
    (select id from public.weapons where slug = 'ak-74n'),
    (select id from public.cartridges where slug = '5-45x39mm'),
    'supported',
    'Standard chambering for the AK-74 family.'
  ),
  (
    (select id from public.weapons where slug = 'aks-74u'),
    (select id from public.cartridges where slug = '5-45x39mm'),
    'supported',
    'Compact AKS-74U configuration built around 5.45x39.'
  ),
  (
    (select id from public.weapons where slug = 'm4a1-carbine'),
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'supported',
    'Baseline 5.56 chambering for the M4 family.'
  ),
  (
    (select id from public.weapons where slug = 'hk416a5'),
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'supported',
    'Common 5.56 chambering for the HK416 family.'
  ),
  (
    (select id from public.weapons where slug = 'fn-scar-l'),
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    'supported',
    'Standard SCAR-L chambering.'
  ),
  (
    (select id from public.weapons where slug = 'fn-scar-h'),
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'supported',
    'Standard SCAR-H battle rifle chambering.'
  ),
  (
    (select id from public.weapons where slug = 'sks'),
    (select id from public.cartridges where slug = '7-62x39mm'),
    'supported',
    'Classic SKS chambering.'
  ),
  (
    (select id from public.weapons where slug = 'mp5'),
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'supported',
    'Standard MP5 chambering.'
  ),
  (
    (select id from public.weapons where slug = 'ump-45'),
    (select id from public.cartridges where slug = '45-acp'),
    'supported',
    'Standard UMP .45 chambering.'
  ),
  (
    (select id from public.weapons where slug = 'remington-model-870'),
    (select id from public.cartridges where slug = '12x70mm'),
    'supported',
    'Standard 12-gauge shell family for the Model 870.'
  ),
  (
    (select id from public.weapons where slug = 'mosin-nagant-infantry-rifle'),
    (select id from public.cartridges where slug = '7-62x54r'),
    'supported',
    'Classic Mosin-Nagant chambering.'
  ),
  (
    (select id from public.weapons where slug = 'vss-vintorez'),
    (select id from public.cartridges where slug = '9x39mm'),
    'supported',
    'Signature subsonic cartridge pairing for the VSS.'
  ),
  (
    (select id from public.weapons where slug = 'rpk-16'),
    (select id from public.cartridges where slug = '5-45x39mm'),
    'supported',
    'AK-derived support weapon chambered in 5.45x39.'
  ),
  (
    (select id from public.weapons where slug = 'fn-fal'),
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'supported',
    'Classic FN FAL chambering.'
  ),
  (
    (select id from public.weapons where slug = 'm110'),
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    'supported',
    'Standard M110 marksman rifle chambering.'
  ),
  (
    (select id from public.weapons where slug = 'fn-p90'),
    (select id from public.cartridges where slug = '5-7x28mm'),
    'supported',
    'Signature P90 chambering.'
  ),
  (
    (select id from public.weapons where slug = 'kriss-vector-9x19'),
    (select id from public.cartridges where slug = '9x19mm-nato'),
    'supported',
    'Standard Vector 9mm chambering.'
  ),
  (
    (select id from public.weapons where slug = 'as-val'),
    (select id from public.cartridges where slug = '9x39mm'),
    'supported',
    'Signature AS VAL chambering.'
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
  ),
  (
    'Recognize iconic extraction-shooter rifle platforms',
    'recognize-iconic-extraction-shooter-rifle-platforms',
    'Start with the best-known rifle cartridges and then move through AK and AR-pattern platforms that players immediately recognize from Tarkov and ABI-style loadouts.',
    'beginner',
    18
  ),
  (
    'Learn iconic Eastern weapon families',
    'learn-iconic-eastern-weapon-families',
    'Follow the relationship between 7.62x39, 5.45x39, 7.62x54R, and the Russian weapon families that make those rounds memorable.',
    'intermediate',
    20
  ),
  (
    'Study second-wave iconic special weapons',
    'study-second-wave-iconic-special-weapons',
    'Move beyond the first-wave staples into famous battle rifles, DMRs, PDWs, and suppressed special-purpose platforms.',
    'intermediate',
    22
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
  ),
  (
    (select id from public.learning_paths where slug = 'recognize-iconic-extraction-shooter-rifle-platforms'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '5-56x45mm-nato'),
    null,
    'Start with 5.56x45mm NATO',
    'Use the most familiar western rifle cartridge as your first anchor.'
  ),
  (
    (select id from public.learning_paths where slug = 'recognize-iconic-extraction-shooter-rifle-platforms'),
    2,
    'weapon',
    null,
    (select id from public.weapons where slug = 'm4a1-carbine'),
    'Move into the M4A1',
    'See the baseline AR-pattern rifle most players already recognize.'
  ),
  (
    (select id from public.learning_paths where slug = 'recognize-iconic-extraction-shooter-rifle-platforms'),
    3,
    'weapon',
    null,
    (select id from public.weapons where slug = 'hk416a5'),
    'Compare against the HK416A5',
    'Use a second 5.56 platform to make rifle-family differences easier to notice.'
  ),
  (
    (select id from public.learning_paths where slug = 'recognize-iconic-extraction-shooter-rifle-platforms'),
    4,
    'weapon',
    null,
    (select id from public.weapons where slug = 'fn-scar-l'),
    'Finish with the SCAR-L',
    'Round out the path with another famous modern rifle family.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '7-62x39mm'),
    null,
    'Start with 7.62x39mm',
    'This round explains why the AKM and SKS feel like a shared family.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    2,
    'weapon',
    null,
    (select id from public.weapons where slug = 'akm'),
    'Meet the AKM',
    'Use the most recognizable Eastern rifle platform as the first concrete weapon.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    3,
    'weapon',
    null,
    (select id from public.weapons where slug = 'sks'),
    'Compare with the SKS',
    'Notice how the same cartridge appears in a different rifle format.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    4,
    'cartridge',
    (select id from public.cartridges where slug = '5-45x39mm'),
    null,
    'Shift to 5.45x39mm',
    'Use a neighboring rifle cartridge to understand the AK-74 branch.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    5,
    'weapon',
    null,
    (select id from public.weapons where slug = 'ak-74n'),
    'See the AK-74N',
    'This keeps the family resemblance while changing the cartridge and role.'
  ),
  (
    (select id from public.learning_paths where slug = 'learn-iconic-eastern-weapon-families'),
    6,
    'weapon',
    null,
    (select id from public.weapons where slug = 'mosin-nagant-infantry-rifle'),
    'End with the Mosin-Nagant',
    'Finish by contrasting the AK family with a classic 7.62x54R bolt-action rifle.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    1,
    'cartridge',
    (select id from public.cartridges where slug = '7-62x51mm-nato'),
    null,
    'Start with 7.62x51mm NATO',
    'Use one strong battle-rifle and DMR cartridge family as the backbone of the path.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    2,
    'weapon',
    null,
    (select id from public.weapons where slug = 'fn-fal'),
    'Meet the FN FAL',
    'Add one of the most famous battle rifles before moving into a more precision-oriented platform.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    3,
    'weapon',
    null,
    (select id from public.weapons where slug = 'm110'),
    'Compare with the M110',
    'See how the same cartridge family appears in a modern marksman rifle role.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    4,
    'cartridge',
    (select id from public.cartridges where slug = '5-7x28mm'),
    null,
    'Shift into 5.7x28mm',
    'Use a distinctive PDW cartridge family to reset the comparison lens.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    5,
    'weapon',
    null,
    (select id from public.weapons where slug = 'fn-p90'),
    'See the FN P90',
    'Pair the cartridge with one of the most instantly recognizable PDWs in games.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    6,
    'cartridge',
    (select id from public.cartridges where slug = '9x39mm'),
    null,
    'Finish with 9x39mm',
    'End on a suppressed special-purpose cartridge family before opening its signature rifle.'
  ),
  (
    (select id from public.learning_paths where slug = 'study-second-wave-iconic-special-weapons'),
    7,
    'weapon',
    null,
    (select id from public.weapons where slug = 'as-val'),
    'Close on the AS VAL',
    'Use the final step to contrast a compact suppressed rifle against the other second-wave categories.'
  )
on conflict (learning_path_id, item_order) do update
set
  entry_type = excluded.entry_type,
  cartridge_id = excluded.cartridge_id,
  weapon_id = excluded.weapon_id,
  title_override = excluded.title_override,
  description = excluded.description;
