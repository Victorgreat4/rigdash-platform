import { unstable_noStore as noStore } from "next/cache";
import LearningPathCard from "@/components/firearms/LearningPathCard";
import PageHero from "@/components/firearms/PageHero";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import { createClient } from "@/lib/supabase/server";
import { getLearningPaths } from "@/lib/firearms/queries";

export default async function PathsPage() {
  noStore();

  const supabase = await createClient();
  const learningPathsResult = await getLearningPaths(supabase);
  const learningPaths = learningPathsResult.data ?? [];

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <PageHero
          eyebrow="Guided paths"
          title="Follow a path when you want the platform to choose the next step."
          description="Learning paths keep the encyclopedia, study mode, and next-step guidance tied together. They work well for beginners, but also help returning users continue in a clear order."
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
            eyebrow="Choose a path"
            title="Available learning paths"
            description="Pick a guided route based on your current goal. Each path stays readable on mobile and obvious on desktop."
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
              eyebrow: "Keep exploring",
              title: "Return to the homepage",
              description:
                "Go back to the discovery-focused homepage for featured cartridges, featured weapons, and beginner start points.",
              href: "/",
            },
            {
              eyebrow: "Browse freely",
              title: "Open the firearm catalog",
              description:
                "Switch from guided paths into the wider catalog when you want a more open exploration mode.",
              href: "/tools/firearm-catalog",
            },
            {
              eyebrow: "Always intact",
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
