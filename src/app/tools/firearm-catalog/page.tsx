import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  getCartridges,
  getWeaponCartridgeCompatibility,
  getWeapons,
} from "@/lib/firearms/queries";

function formatBarrelLength(length: number | null) {
  if (length === null) {
    return "Unknown barrel length";
  }

  return `${length} mm barrel`;
}

export default async function FirearmCatalogPage() {
  noStore();

  const supabase = await createClient();
  const [weaponsResult, cartridgesResult, compatibilityResult] =
    await Promise.all([
      getWeapons(supabase),
      getCartridges(supabase),
      getWeaponCartridgeCompatibility(supabase),
    ]);

  const hasSchemaIssue =
    Boolean(weaponsResult.error) ||
    Boolean(cartridgesResult.error) ||
    Boolean(compatibilityResult.error);

  const weapons = weaponsResult.data ?? [];
  const cartridges = cartridgesResult.data ?? [];
  const compatibility = compatibilityResult.data ?? [];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-4">
          <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            Firearm + Ammunition
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Supabase Catalog
          </h1>

          <p className="max-w-3xl text-base text-zinc-400 sm:text-lg">
            Browse the first-pass schema for manufacturers, countries,
            cartridges, weapons, and compatibility links. The layout is tuned
            for mobile first, with wider grids on desktop.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-sm text-zinc-500">Weapons</div>
            <div className="mt-2 text-3xl font-semibold">{weapons.length}</div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-sm text-zinc-500">Cartridges</div>
            <div className="mt-2 text-3xl font-semibold">
              {cartridges.length}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-sm text-zinc-500">Compatibility Links</div>
            <div className="mt-2 text-3xl font-semibold">
              {compatibility.length}
            </div>
          </div>
        </section>

        {hasSchemaIssue ? (
          <section className="rounded-2xl border border-amber-800 bg-amber-950/40 p-5 text-amber-100">
            <h2 className="text-lg font-semibold">Schema not live yet</h2>
            <p className="mt-2 text-sm text-amber-200">
              The app is wired for Supabase, but the remote database still
              needs the new migration and seed applied before this page can load
              real rows.
            </p>
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Weapons</h2>
              <span className="text-sm text-zinc-500">with cartridge links</span>
            </div>

            <div className="grid gap-4">
              {weapons.map((weapon) => (
                <article
                  key={weapon.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{weapon.name}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {[weapon.weapon_type, weapon.platform, weapon.action_type]
                          .filter(Boolean)
                          .join(" / ")}
                      </p>
                    </div>

                    <div className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      {formatBarrelLength(weapon.barrel_length_mm)}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
                    {weapon.manufacturer ? (
                      <span className="rounded-full border border-zinc-700 px-3 py-1">
                        {weapon.manufacturer.name}
                      </span>
                    ) : null}
                    {weapon.country ? (
                      <span className="rounded-full border border-zinc-700 px-3 py-1">
                        {weapon.country.name}
                      </span>
                    ) : null}
                  </div>

                  {weapon.notes ? (
                    <p className="mt-4 text-sm text-zinc-400">{weapon.notes}</p>
                  ) : null}

                  <div className="mt-5 space-y-2">
                    <div className="text-sm font-medium text-zinc-300">
                      Compatible cartridges
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {weapon.compatibility.length > 0 ? (
                        weapon.compatibility.map((link) => (
                          <span
                            key={link.id}
                            className="rounded-full border border-emerald-800 bg-emerald-950/50 px-3 py-1 text-xs text-emerald-200"
                          >
                            {link.cartridge?.name ?? "Unknown cartridge"}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-zinc-500">
                          No compatibility rows yet.
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Cartridges</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {cartridges.map((cartridge) => (
                <article
                  key={cartridge.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{cartridge.name}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {cartridge.caliber} / {cartridge.cartridge_type}
                      </p>
                    </div>

                    {cartridge.casing_material ? (
                      <div className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                        {cartridge.casing_material}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
                    {cartridge.manufacturer ? (
                      <span className="rounded-full border border-zinc-700 px-3 py-1">
                        {cartridge.manufacturer.name}
                      </span>
                    ) : null}
                    {cartridge.country ? (
                      <span className="rounded-full border border-zinc-700 px-3 py-1">
                        {cartridge.country.name}
                      </span>
                    ) : null}
                  </div>

                  {cartridge.notes ? (
                    <p className="mt-4 text-sm text-zinc-400">
                      {cartridge.notes}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
