import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canAccessBeerRatings } from "@/lib/beerRatingsAccess";
import DiscoveryLinkCard from "@/components/firearms/DiscoveryLinkCard";
import FeaturedItemCard from "@/components/firearms/FeaturedItemCard";
import LearningPathCard from "@/components/firearms/LearningPathCard";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import HomeComparisonCard from "@/components/home/HomeComparisonCard";
import HomeContinueCard from "@/components/home/HomeContinueCard";
import HomeHero from "@/components/home/HomeHero";
import HomeHighlightedEntryCard from "@/components/home/HomeHighlightedEntryCard";
import {
  beginnerStartSections,
  getFeaturedCartridges,
  getFeaturedLearningPaths,
  getFeaturedWeapons,
} from "@/lib/firearms/discovery";
import {
  getContinueLearningLinks,
  getHomepageComparisons,
  getRecentHighlightedEntries,
} from "@/lib/firearms/homepage";
import {
  getCartridges,
  getLearningPaths,
  getWeapons,
} from "@/lib/firearms/queries";

export default async function Home() {
  noStore();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canSeeBeerRatings = user
    ? canAccessBeerRatings(user.id, user.email)
    : false;

  const [cartridgesResult, weaponsResult, learningPathsResult] =
    await Promise.all([
      getCartridges(supabase),
      getWeapons(supabase),
      getLearningPaths(supabase),
    ]);

  const cartridges = cartridgesResult.data ?? [];
  const weapons = weaponsResult.data ?? [];
  const learningPaths = learningPathsResult.data ?? [];

  const featuredCartridges = getFeaturedCartridges(cartridges);
  const featuredWeapons = getFeaturedWeapons(weapons);
  const featuredLearningPaths = getFeaturedLearningPaths(learningPaths);
  const suggestedComparisons = getHomepageComparisons(cartridges, weapons);
  const highlightedEntries = getRecentHighlightedEntries(cartridges, weapons);
  const continueLearningLinks = getContinueLearningLinks(
    learningPaths,
    cartridges,
    weapons
  );

  const hasSchemaIssue =
    Boolean(cartridgesResult.error) ||
    Boolean(weaponsResult.error) ||
    Boolean(learningPathsResult.error);

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-14">
        <HomeHero canSeeBeerRatings={canSeeBeerRatings} />

        {hasSchemaIssue ? (
          <section className="rounded-2xl border border-amber-800 bg-amber-950/40 p-5 text-amber-100">
            <h2 className="text-lg font-semibold">Catalog data is unavailable</h2>
            <p className="mt-2 text-sm text-amber-200">
              The homepage structure is ready, but featured entries and learning
              content need the Supabase schema available before they can load.
            </p>
          </section>
        ) : null}

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Start here for beginners"
            title="Three simple starting points"
            description="If this is your first visit, these routes give you an easy way in: start with a cartridge, move into a compatible weapon, then let the site guide the next comparison."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {beginnerStartSections.map((section) => (
              <DiscoveryLinkCard
                key={section.title}
                eyebrow="Beginner path"
                title={section.title}
                description={section.description}
                href={section.href}
                cta="Start here"
              />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Continue learning"
            title="For returning learners"
            description="These links are designed for people who already know the basics and want a quick way back into study mode, a learning path, or a useful comparison."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {continueLearningLinks.map((item) => (
              <HomeContinueCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section id="featured-cartridges" className="space-y-5">
          <SectionIntro
            eyebrow="Featured cartridges"
            title="Start with the round"
            description="Cartridge pages are a strong first stop because they build vocabulary fast and naturally connect into weapon pages."
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
                  "Open this cartridge to understand where it fits and what to compare next."
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
            title="Then move into platforms"
            description="Weapon pages help users translate names and specs into clearer ideas about role, compatibility, and platform families."
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
                  "Open this weapon to see why it matters, what it supports, and what to compare next."
                }
                badges={[
                  weapon.manufacturer?.name ?? "Unknown maker",
                  `${weapon.compatibility.length} linked cartridges`,
                ]}
              />
            ))}
          </div>
        </section>

        <section id="learning-paths" className="space-y-5">
          <SectionIntro
            eyebrow="Learning paths preview"
            title="Follow a guided path when you do not want to guess"
            description="Paths preview the guided side of the platform. They work especially well for beginners, but also help returning users pick up a topic in the right order."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredLearningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Suggested comparisons"
            title="Useful side-by-side comparisons"
            description="Comparison prompts keep the homepage from feeling static. They give users a natural next move instead of leaving them at a dead end."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {suggestedComparisons.map((comparison) => (
              <HomeComparisonCard
                key={comparison.title}
                comparison={comparison}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Recent or highlighted entries"
            title="Good places to jump back in"
            description="This section helps the homepage feel alive even without complex visuals. It gives new visitors something concrete to open and returning users something fresh to continue with."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {highlightedEntries.map((entry) => (
              <HomeHighlightedEntryCard key={entry.href} entry={entry} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
          title="What to do next"
          description="The homepage should always end with obvious next moves. These links keep the study platform, RigDash Desktop, and Dad&apos;s Beer Ratings all intact."
          items={[
            {
              eyebrow: "Open exploration",
              title: "Browse the firearm catalog",
              description:
                "Use the encyclopedia view when you want to explore entries freely and let recommendations guide the next page.",
              href: "/tools/firearm-catalog",
            },
            {
              eyebrow: "Guided learning",
              title: "Open all learning paths",
              description:
                "Choose a path when you want the platform to handle the study order for you.",
              href: "/paths",
            },
            {
              eyebrow: "Always intact",
              title: "Visit RigDash Desktop",
              description:
                "Keep the existing RigDash desktop page visible as part of the broader platform.",
              href: "/tools/rigdash-desktop",
            },
            {
              eyebrow: "Always intact",
              title: "Open Dad&apos;s Beer Ratings",
              description:
                "The private beer ratings tool remains available without changing its role in the app.",
              href: canSeeBeerRatings ? "/tools/beer-ratings" : "/login",
            },
          ]}
        />
      </div>
    </main>
  );
}
