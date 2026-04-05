import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import SurfaceCard from "@/components/firearms/SurfaceCard";
import WhyItMattersSection from "@/components/firearms/WhyItMattersSection";
import {
  getRecommendedNextForCartridge,
  getSimilarCartridges,
} from "@/lib/firearms/discovery";
import { createClient } from "@/lib/supabase/server";
import {
  getCartridgeBySlug,
  getCartridges,
  getWeapons,
} from "@/lib/firearms/queries";

type CartridgePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CartridgeDetailPage({
  params,
}: CartridgePageProps) {
  noStore();

  const { slug } = await params;
  const supabase = await createClient();
  const [cartridgeResult, cartridgesResult, weaponsResult] = await Promise.all([
    getCartridgeBySlug(supabase, slug),
    getCartridges(supabase),
    getWeapons(supabase),
  ]);

  if (cartridgeResult.error || !cartridgeResult.data) {
    notFound();
  }

  const cartridge = cartridgeResult.data;
  const allCartridges = cartridgesResult.data ?? [];
  const allWeapons = weaponsResult.data ?? [];

  const compatibleWeapons = allWeapons.filter((weapon) =>
    weapon.compatibility.some(
      (compatibility) => compatibility.cartridge?.slug === cartridge.slug
    )
  );

  const similarCartridges = getSimilarCartridges(cartridge, allCartridges);
  const recommendedNext = getRecommendedNextForCartridge(
    cartridge,
    compatibleWeapons,
    similarCartridges
  );

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
                Cartridge detail
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {cartridge.name}
              </h1>
              <p className="text-base leading-7 text-zinc-400 sm:text-lg">
                {cartridge.caliber} / {cartridge.cartridge_type}
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
                  {cartridge.manufacturer?.name ?? "Unknown maker"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Country
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {cartridge.country?.name ?? "Unknown country"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Casing
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {cartridge.casing_material ?? "Not listed"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Compatible weapons
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {compatibleWeapons.length}
                </div>
              </div>
            </div>
          </SurfaceCard>
        </section>

        <WhyItMattersSection
          title={`${cartridge.name} matters because cartridges shape the rest of the discovery journey.`}
          body={
            cartridge.notes ??
            "A cartridge page is often the easiest way for beginners to understand how caliber, type, and platform compatibility fit together."
          }
          points={[
            "It gives a simple starting point for learning names and categories.",
            "It reveals which weapons connect to the round and why those links matter.",
            "It creates an easy path into related rounds for side-by-side comparison.",
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <SectionIntro
              title="Compatible weapons"
              description="Follow these connections to see how this cartridge shows up in specific platforms and roles."
            />

            <div className="grid gap-4">
              {compatibleWeapons.length > 0 ? (
                compatibleWeapons.map((weapon) => (
                  <SurfaceCard key={weapon.id} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {weapon.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {[weapon.weapon_type, weapon.platform, weapon.action_type]
                            .filter(Boolean)
                            .join(" / ")}
                        </p>
                      </div>

                      <Link
                        href={`/tools/firearm-catalog/weapons/${weapon.slug}`}
                        className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                      >
                        View weapon
                      </Link>
                    </div>

                    {weapon.notes ? (
                      <p className="text-sm leading-6 text-zinc-400">{weapon.notes}</p>
                    ) : null}
                  </SurfaceCard>
                ))
              ) : (
                <SurfaceCard>
                  <p className="text-sm leading-6 text-zinc-400">
                    No compatible weapons are listed yet for this cartridge.
                  </p>
                </SurfaceCard>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <SectionIntro
              title="Related or similar entries"
              description="Use related cartridges to build comparison habits and understand families of similar rounds."
            />

            <div className="grid gap-4">
              {similarCartridges.map((item) => (
                <SurfaceCard key={item.id} className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {item.caliber} / {item.cartridge_type}
                    </p>
                  </div>
                  <Link
                    href={`/tools/firearm-catalog/cartridges/${item.slug}`}
                    className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    Compare this cartridge
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
