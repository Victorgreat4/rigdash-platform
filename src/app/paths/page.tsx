import { unstable_noStore as noStore } from "next/cache";
import LearningPathCard from "@/components/firearms/LearningPathCard";
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
        <section className="space-y-5">
          <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            Learning paths
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Guided paths for learning one step at a time
          </h1>

          <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            Choose a path when you want the platform to guide the order of
            study. Each path supports both cartridge and weapon entries and is
            structured to expand later into saved progress, completion
            tracking, and mini quizzes.
          </p>
        </section>

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
            title="Available paths"
            description="Pick a guided route based on your current goal. Each path keeps the sequence readable on mobile and obvious on desktop."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </section>

        <RecommendedNextSection
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
