import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canAccessBeerRatings } from "@/lib/beerRatingsAccess";
import DiscoveryLinkCard from "@/components/firearms/DiscoveryLinkCard";
import FeaturedItemCard from "@/components/firearms/FeaturedItemCard";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
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

export default async function Home() {
  noStore();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canSeeBeerRatings = user
    ? canAccessBeerRatings(user.id, user.email)
    : false;

  const [cartridgesResult, weaponsResult, learningPathsResult] = await Promise.all([
    getCartridges(supabase),
    getWeapons(supabase),
    getLearningPaths(supabase),
  ]);

  const cartridges = cartridgesResult.data ?? [];
  const weapons = weaponsResult.data ?? [];
  const featuredCartridges = getFeaturedCartridges(cartridges);
  const featuredWeapons = getFeaturedWeapons(weapons);
  const featuredLearningPaths = getFeaturedLearningPaths(
    learningPathsResult.data ?? []
  );
  const hasSchemaIssue =
    Boolean(cartridgesResult.error) ||
    Boolean(weaponsResult.error) ||
    Boolean(learningPathsResult.error);

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-14">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
              Educational discovery platform
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Learn ammunition and firearms through relationships, not random
              lists.
            </h1>

            <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
              RigDash now guides people from cartridge basics into compatible
              weapons, similar entries, and clear next steps. It is built to
              feel calm for beginners, but still structured enough for deeper
              exploration.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/firearm-catalog"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Start learning
              </Link>

              <Link
                href="/tools/rigdash-desktop"
                className="rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-100 transition hover:border-zinc-500"
              >
                RigDash Desktop
              </Link>

              {canSeeBeerRatings ? (
                <Link
                  href="/tools/beer-ratings"
                  className="rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-100 transition hover:border-zinc-500"
                >
                  Dad&apos;s Beer Ratings
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-sm text-zinc-500">Featured cartridges</div>
              <div className="mt-2 text-3xl font-semibold">
                {featuredCartridges.length}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-sm text-zinc-500">Featured weapons</div>
              <div className="mt-2 text-3xl font-semibold">
                {featuredWeapons.length}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-sm text-zinc-500">Learning mode</div>
              <div className="mt-2 text-sm leading-6 text-zinc-300">
                Start simple, then follow recommended next links through the
                catalog.
              </div>
            </div>
          </div>
        </section>

        {hasSchemaIssue ? (
          <section className="rounded-2xl border border-amber-800 bg-amber-950/40 p-5 text-amber-100">
            <h2 className="text-lg font-semibold">Catalog data is unavailable</h2>
            <p className="mt-2 text-sm text-amber-200">
              The educational catalog is wired up, but the firearm pages need
              the Supabase schema available before featured entries can load.
            </p>
          </section>
        ) : null}

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Start here"
            title="A beginner-friendly first look"
            description="If you are not sure what to study first, start with a cartridge, move to a compatible weapon, then compare a related entry. Each step is designed to reveal the next useful thing to look at."
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

        <section id="featured-cartridges" className="space-y-5">
          <SectionIntro
            eyebrow="Featured cartridges"
            title="Start with the round, then follow where it leads"
            description="Featured cartridges make a good entry point because they quickly explain caliber, cartridge type, and how those choices affect compatible weapon platforms."
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
            title="See how platforms connect back to ammunition choices"
            description="Featured weapons help learners understand how platform, action type, and compatibility shape what each entry is useful for."
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
            eyebrow="Recommended learning paths"
            title="Follow a path instead of guessing"
            description="These Supabase-backed paths guide users step by step and keep the structure ready for saved progress, completion tracking, mini quizzes, and later admin workflows."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredLearningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
          title="Where to go next"
          description="The platform should always suggest the next useful move. These links keep RigDash Desktop and Dad&apos;s Beer Ratings intact while the learning catalog grows."
          items={[
            {
              eyebrow: "Primary learning hub",
              title: "Browse the firearm catalog",
              description:
                "Open the educational catalog hub to compare featured entries, browse by type, and move into detail pages.",
              href: "/tools/firearm-catalog",
            },
            {
              eyebrow: "Always intact",
              title: "Explore learning paths",
              description:
                "Use guided sequences instead of raw browsing when you want the platform to tell you what to study next.",
              href: "/paths",
            },
            {
              eyebrow: "Always intact",
              title: "Visit RigDash Desktop",
              description:
                "Keep the platform side of the project visible with the existing RigDash download and release page.",
              href: "/tools/rigdash-desktop",
            },
            {
              eyebrow: "Always intact",
              title: "Open Dad&apos;s Beer Ratings",
              description:
                "The private beer ratings experience stays untouched and available as part of the broader platform.",
              href: canSeeBeerRatings ? "/tools/beer-ratings" : "/login",
            },
          ]}
        />
      </div>
    </main>
  );
}
