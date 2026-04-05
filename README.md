# RigDash Platform

RigDash Platform is a Next.js + TypeScript app with Supabase-backed data for a mobile-first firearm and ammunition catalog, plus a private beer ratings tool.

## Current App Areas

- Firearm catalog
- Beer ratings
- Profile and account settings
- RigDash desktop tool page

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Storage, and Postgres

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Start the app:

```bash
npm run dev
```

## Supabase Workflow

This repo uses a Supabase CLI-style structure:

- [supabase/config.toml](c:/Users/victo/rigdash-platform/supabase/config.toml)
- [supabase/migrations/20260405133000_initial_firearms_schema.sql](c:/Users/victo/rigdash-platform/supabase/migrations/20260405133000_initial_firearms_schema.sql)
- [supabase/migrations/20260405143000_drop_quiz_and_leaderboard_tables.sql](c:/Users/victo/rigdash-platform/supabase/migrations/20260405143000_drop_quiz_and_leaderboard_tables.sql)
- [supabase/seed.sql](c:/Users/victo/rigdash-platform/supabase/seed.sql)

The firearms schema includes:

- `countries`
- `manufacturers`
- `cartridges`
- `weapons`
- `weapon_cartridge_compatibility`

Seed data is included for a small sample catalog.

## Important Note

The cleanup migration that drops old quiz and leaderboard tables has been added to the repo, but it still needs to be applied to the live Supabase database.
