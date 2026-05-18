import { unstable_noStore as noStore } from "next/cache";
import LearningPathCard from "@/components/firearms/LearningPathCard";
import PageHero from "@/components/firearms/PageHero";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import { createClient } from "@/lib/supabase/server";
import { getLearningPaths } from "@/lib/firearms/queries";

export default async function CatalogLearningPage() {
  noStore();

  const supabase = await createClient();
  const learningPathsResult = await getLearningPaths(supabase);
  const learningPaths = learningPathsResult.data ?? [];

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <PageHero
          backHref="/tools/firearm-catalog"
          backLabel="Back to catalogs"
          eyebrow="Guided journey"
          title="Choose a learning journey through the firearm catalog."
          description="Pick a guided route when you want the catalog, study mode, and next-step suggestions to work together."
        />

        {learningPathsResult.error ? (
          <section className="rounded-2xl border border-amber-800 bg-amber-950/40 p-5 text-amber-100">
            <h2 className="text-lg font-semibold">Learning paths unavailable</h2>
            <p className="mt-2 text-sm text-amber-200">
              The path interface is ready, but the learning path schema needs to
              be present in Supabase before entries can load here.
            </p>
          </section>
        ) : null}

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Choose a route"
            title="Available journeys"
            description="Pick a route based on your current goal. Each journey stays connected to the firearm and ammunition catalog."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
          title="Keep exploring"
          items={[
            {
              eyebrow: "Catalogs",
              title: "Open the firearm catalog",
              description:
                "Switch from guided paths into the wider catalog when you want a more open exploration mode.",
              href: "/tools/firearm-catalog",
            },
            {
              eyebrow: "Study mode",
              title: "Start from a catalog entry",
              description:
                "Open a cartridge or weapon page when you want the learning flow to begin from a specific reference page.",
              href: "/tools/firearm-catalog#featured-cartridges",
            },
            {
              eyebrow: "Tools",
              title: "Visit RigDash Desktop",
              description:
                "Keep the existing RigDash Desktop page close at hand while the educational side of the platform grows.",
              href: "/tools/rigdash-desktop",
            },
          ]}
        />
      </div>
    </main>
  );
}
