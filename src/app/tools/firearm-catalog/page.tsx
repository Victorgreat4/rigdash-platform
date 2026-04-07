import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import DiscoveryLinkCard from "@/components/firearms/DiscoveryLinkCard";
import FeaturedItemCard from "@/components/firearms/FeaturedItemCard";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import SurfaceCard from "@/components/firearms/SurfaceCard";
import LearningPathCard from "@/components/firearms/LearningPathCard";
import PageHero from "@/components/firearms/PageHero";
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
  const ammoVariantCount = cartridges.reduce(
    (total, cartridge) => total + cartridge.ammo_variants.length,
    0
  );
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
        <PageHero
          eyebrow="Firearm + ammunition learning hub"
          title="Learn by following the links between cartridges, weapons, and use cases."
          description="This catalog is designed for guided exploration. Start with a round, move into a compatible platform, compare a related entry, and use the recommended next cards to keep going."
        />

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
            <div className="text-sm text-zinc-500">Named ammo variants</div>
            <div className="mt-2 text-3xl font-semibold">{ammoVariantCount}</div>
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

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Start here"
            title="Begin with one clear route"
            description="These starting points make the catalog feel less like a list and more like a guided learning space."
          />

          <div className="grid gap-4 md:grid-cols-3">
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
          </div>
        </section>

        <section id="featured-cartridges" className="space-y-5">
          <SectionIntro
            eyebrow="Featured cartridges"
            title="Featured cartridges"
            description="Cartridge pages are often the clearest first step because they build vocabulary quickly and open direct paths into compatible weapons."
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
            eyebrow="Featured weapons"
            title="Featured weapons"
            description="Weapon pages help users connect platform choices back to ammunition, role, and nearby entries worth comparing next."
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
            eyebrow="Guided paths"
            id="learning-paths"
            title="Learning paths"
            description="Paths turn the catalog into a step-by-step study experience and tie together encyclopedia reading, study mode, and next-step guidance."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredLearningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
          title="Keep exploring"
          items={[
            {
              eyebrow: "Detail exploration",
              title: "Open a cartridge page",
              description:
                "Cartridge pages lead naturally into linked weapons and neighboring rounds.",
              href: featuredCartridges[0]
                ? `/tools/firearm-catalog/cartridges/${featuredCartridges[0].slug}`
                : "/tools/firearm-catalog",
            },
            {
              eyebrow: "Platform exploration",
              title: "Open a weapon page",
              description:
                "Weapon pages explain role, compatibility, and the next useful comparison to make.",
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
