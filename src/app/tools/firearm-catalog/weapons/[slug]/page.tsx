import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import SurfaceCard from "@/components/firearms/SurfaceCard";
import WhyItMattersSection from "@/components/firearms/WhyItMattersSection";
import {
  getRecommendedNextForWeapon,
  getSimilarWeapons,
} from "@/lib/firearms/discovery";
import { createClient } from "@/lib/supabase/server";
import { getWeaponBySlug, getWeapons } from "@/lib/firearms/queries";

type WeaponPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatBarrelLength(length: number | null) {
  if (length === null) {
    return "Barrel length not listed";
  }

  return `${length} mm barrel`;
}

export default async function WeaponDetailPage({ params }: WeaponPageProps) {
  noStore();

  const { slug } = await params;
  const supabase = await createClient();
  const [weaponResult, weaponsResult] = await Promise.all([
    getWeaponBySlug(supabase, slug),
    getWeapons(supabase),
  ]);

  if (weaponResult.error || !weaponResult.data) {
    notFound();
  }

  const weapon = weaponResult.data;
  const allWeapons = weaponsResult.data ?? [];
  const similarWeapons = getSimilarWeapons(weapon, allWeapons);
  const recommendedNext = getRecommendedNextForWeapon(weapon, similarWeapons);

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Link
              href="/tools/firearm-catalog"
              className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300 transition hover:border-zinc-500"
            >
              Back to firearm catalog
            </Link>

            <div className="space-y-3">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Weapon detail
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {weapon.name}
              </h1>
              <p className="text-base leading-7 text-zinc-400 sm:text-lg">
                {[weapon.weapon_type, weapon.platform, weapon.action_type]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
            </div>
          </div>

          <SurfaceCard className="space-y-4">
            <div className="text-sm text-zinc-500">Quick context</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Manufacturer
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {weapon.manufacturer?.name ?? "Unknown maker"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Country
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {weapon.country?.name ?? "Unknown country"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Platform
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {weapon.platform ?? "General platform"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Barrel
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {formatBarrelLength(weapon.barrel_length_mm)}
                </div>
              </div>
            </div>
          </SurfaceCard>
        </section>

        <WhyItMattersSection
          title={`${weapon.name} matters because it turns abstract specs into platform decisions.`}
          body={
            weapon.notes ??
            "Use this page to connect a recognizable weapon platform with the cartridge relationships and role-based comparisons around it."
          }
          points={[
            "It shows how a platform and action type affect what users should compare next.",
            "It gives a concrete path from one weapon into compatible cartridges and similar entries.",
            "It helps beginners move from names they recognize into broader understanding.",
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <SectionIntro
              title="Compatible cartridges"
              description="Compatibility is the core relationship on the page. Follow these links to understand the ammunition side of this weapon."
            />

            <div className="grid gap-4">
              {weapon.compatibility.length > 0 ? (
                weapon.compatibility.map((link) => (
                  <SurfaceCard key={link.id} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {link.cartridge?.name ?? "Unknown cartridge"}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {link.cartridge
                            ? `${link.cartridge.caliber} / ${link.cartridge.cartridge_type}`
                            : "Compatibility link"}
                        </p>
                      </div>

                      {link.cartridge ? (
                        <Link
                          href={`/tools/firearm-catalog/cartridges/${link.cartridge.slug}`}
                          className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                        >
                          View cartridge
                        </Link>
                      ) : null}
                    </div>

                    {link.notes ? (
                      <p className="text-sm leading-6 text-zinc-400">{link.notes}</p>
                    ) : null}
                  </SurfaceCard>
                ))
              ) : (
                <SurfaceCard>
                  <p className="text-sm leading-6 text-zinc-400">
                    No compatibility links are listed yet for this weapon.
                  </p>
                </SurfaceCard>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <SectionIntro
              title="Related or similar entries"
              description="Use related entries to compare neighboring platforms instead of starting a new search from scratch."
            />

            <div className="grid gap-4">
              {similarWeapons.map((item) => (
                <SurfaceCard key={item.id} className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {[item.weapon_type, item.platform, item.action_type]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                  </div>
                  <Link
                    href={`/tools/firearm-catalog/weapons/${item.slug}`}
                    className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    Compare this weapon
                  </Link>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </section>

        <RecommendedNextSection items={recommendedNext} />
      </div>
    </main>
  );
}
