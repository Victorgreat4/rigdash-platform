import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import DiscoveryLinkCard from "@/components/firearms/DiscoveryLinkCard";
import FeaturedItemCard from "@/components/firearms/FeaturedItemCard";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import SurfaceCard from "@/components/firearms/SurfaceCard";
import LearningPathCard from "@/components/firearms/LearningPathCard";
import {
  beginnerStartSections,
  getFeaturedCartridges,
  getFeaturedLearningPaths,
  getFeaturedWeapons,
} from "@/lib/firearms/discovery";
import {
  getCartridges,
  getLearningPaths,
  getWeapons,
} from "@/lib/firearms/queries";

export default async function FirearmCatalogPage() {
  noStore();

  const supabase = await createClient();
  const [weaponsResult, cartridgesResult, learningPathsResult] = await Promise.all([
    getWeapons(supabase),
    getCartridges(supabase),
    getLearningPaths(supabase),
  ]);

  const weapons = weaponsResult.data ?? [];
  const cartridges = cartridgesResult.data ?? [];
  const featuredWeapons = getFeaturedWeapons(weapons);
  const featuredCartridges = getFeaturedCartridges(cartridges);
  const featuredLearningPaths = getFeaturedLearningPaths(
    learningPathsResult.data ?? []
  );
  const hasSchemaIssue =
    Boolean(weaponsResult.error) ||
    Boolean(cartridgesResult.error) ||
    Boolean(learningPathsResult.error);

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <section className="space-y-5">
          <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            Firearm + ammunition learning hub
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Learn by following the links between cartridges, weapons, and use
            cases.
          </h1>

          <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            This is the discovery-first catalog. Instead of browsing rows, you
            can start with what matters, compare compatible entries, and follow
            recommended next steps that keep the learning flow moving.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <SurfaceCard>
            <div className="text-sm text-zinc-500">Weapons</div>
            <div className="mt-2 text-3xl font-semibold">{weapons.length}</div>
          </SurfaceCard>
          <SurfaceCard>
            <div className="text-sm text-zinc-500">Cartridges</div>
            <div className="mt-2 text-3xl font-semibold">{cartridges.length}</div>
          </SurfaceCard>
          <SurfaceCard>
            <div className="text-sm text-zinc-500">Learning model</div>
            <div className="mt-2 text-sm leading-6 text-zinc-300">
              Why it matters, related items, and recommended next on every key
              page.
            </div>
          </SurfaceCard>
        </section>

        {hasSchemaIssue ? (
          <section className="rounded-2xl border border-amber-800 bg-amber-950/40 p-5 text-amber-100">
            <h2 className="text-lg font-semibold">Schema not live yet</h2>
            <p className="mt-2 text-sm text-amber-200">
              The catalog page is ready, but the firearm data needs to be
              available in Supabase before discovery cards can load.
            </p>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {beginnerStartSections.map((section) => (
            <DiscoveryLinkCard
              key={section.title}
              eyebrow="Start here"
              title={section.title}
              description={section.description}
              href={section.href}
              cta="Open section"
            />
          ))}
        </section>

        <section id="featured-cartridges" className="space-y-5">
          <SectionIntro
            title="Featured cartridges"
            description="Cartridges are a strong starting point because they quickly teach terminology and create obvious paths into compatible weapon pages."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredCartridges.map((cartridge) => (
              <FeaturedItemCard
                key={cartridge.id}
                href={`/tools/firearm-catalog/cartridges/${cartridge.slug}`}
                title={cartridge.name}
                subtitle={`${cartridge.caliber} / ${cartridge.cartridge_type}`}
                description={
                  cartridge.notes ??
                  "Open the detail page for a clear explanation of why this round matters."
                }
                badges={[
                  cartridge.manufacturer?.name ?? "Unknown maker",
                  cartridge.country?.name ?? "Unknown country",
                ]}
              />
            ))}
          </div>
        </section>

        <section id="featured-weapons" className="space-y-5">
          <SectionIntro
            title="Featured weapons"
            description="Weapon pages connect platform choices back to ammunition, role, and neighboring entries for guided comparison."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredWeapons.map((weapon) => (
              <FeaturedItemCard
                key={weapon.id}
                href={`/tools/firearm-catalog/weapons/${weapon.slug}`}
                title={weapon.name}
                subtitle={[weapon.weapon_type, weapon.platform, weapon.action_type]
                  .filter(Boolean)
                  .join(" / ")}
                description={
                  weapon.notes ??
                  "Open the detail page for compatibility, related entries, and next-step guidance."
                }
                badges={[
                  weapon.manufacturer?.name ?? "Unknown maker",
                  `${weapon.compatibility.length} compatible links`,
                ]}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionIntro
            id="learning-paths"
            title="Recommended learning paths"
            description="Learning paths turn the catalog into a guided experience. The same structure can grow later into saved progress, completion tracking, mini quizzes, and future admin tooling."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredLearningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
          items={[
            {
              eyebrow: "Detail exploration",
              title: "Open a cartridge page",
              description:
                "Cartridge detail pages lead naturally into compatible weapons and neighboring rounds.",
              href: featuredCartridges[0]
                ? `/tools/firearm-catalog/cartridges/${featuredCartridges[0].slug}`
                : "/tools/firearm-catalog",
            },
            {
              eyebrow: "Platform exploration",
              title: "Open a weapon page",
              description:
                "Weapon detail pages explain role, compatibility, and the next useful comparison to make.",
              href: featuredWeapons[0]
                ? `/tools/firearm-catalog/weapons/${featuredWeapons[0].slug}`
                : "/tools/firearm-catalog",
            },
            {
              eyebrow: "Broader platform",
              title: "Browse all learning paths",
              description:
                "Open the dedicated paths index when you want guided sequences rather than free-form browsing.",
              href: "/paths",
            },
            {
              eyebrow: "Broader platform",
              title: "Visit the tools overview",
              description:
                "Keep the wider RigDash ecosystem in view, including the existing desktop page and the preserved beer ratings tool.",
              href: "/tools",
            },
          ]}
        />
      </div>
    </main>
  );
}
