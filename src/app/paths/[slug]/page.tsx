import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import LearningPathSequence from "@/components/firearms/LearningPathSequence";
import PageHero from "@/components/firearms/PageHero";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import SectionIntro from "@/components/firearms/SectionIntro";
import SurfaceCard from "@/components/firearms/SurfaceCard";
import { createClient } from "@/lib/supabase/server";
import {
  getLearningPathBySlug,
  getLearningPathItemSummary,
} from "@/lib/firearms/queries";

type PathDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    step?: string;
  }>;
};

function clampStep(rawStep: string | undefined, total: number) {
  const parsed = Number(rawStep ?? "1");

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  if (parsed > total) {
    return total;
  }

  return parsed;
}

export default async function PathDetailPage({
  params,
  searchParams,
}: PathDetailPageProps) {
  noStore();

  const { slug } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const pathResult = await getLearningPathBySlug(supabase, slug);

  if (pathResult.error || !pathResult.data) {
    notFound();
  }

  const path = pathResult.data;

  if (path.items.length === 0) {
    notFound();
  }

  const sortedItems = [...path.items].sort((a, b) => a.item_order - b.item_order);
  const step = clampStep(query.step, sortedItems.length);
  const currentIndex = step - 1;
  const currentItem = sortedItems[currentIndex];
  const currentSummary = getLearningPathItemSummary(currentItem);
  const previousItem =
    currentIndex > 0 ? getLearningPathItemSummary(sortedItems[currentIndex - 1]) : null;
  const nextItem =
    currentIndex < sortedItems.length - 1
      ? getLearningPathItemSummary(sortedItems[currentIndex + 1])
      : null;
  const currentStudyHref = currentSummary.href.includes("?")
    ? `${currentSummary.href}&study=1`
    : `${currentSummary.href}?study=1`;

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <PageHero
            backHref="/paths"
            backLabel="Back to all paths"
            eyebrow="Guided learning path"
            title={path.title}
            description={path.description}
          />

          <SurfaceCard className="space-y-4">
            <div className="text-sm text-zinc-500">Path overview</div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Level
                </div>
                <div className="mt-1 text-sm text-zinc-200">{path.level}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Steps
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {sortedItems.length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Time
                </div>
                <div className="mt-1 text-sm text-zinc-200">
                  {path.estimated_minutes
                    ? `${path.estimated_minutes} min`
                    : "Flexible"}
                </div>
              </div>
            </div>
          </SurfaceCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Path sequence"
              title="See the full sequence"
              description="The sequence keeps previous, current, and next items obvious so the path feels guided instead of overwhelming."
            />

            <LearningPathSequence
              items={sortedItems}
              currentIndex={currentIndex}
              pathSlug={path.slug}
            />
          </div>

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Current focus"
              title={`Current step: ${currentSummary.name}`}
              description="Use the current step card for context, then move forward one item at a time. This structure is intentionally simple so progress tracking can slot in later."
            />

            <SurfaceCard className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="rounded-full border border-emerald-700 px-3 py-1 text-emerald-200">
                  Current
                </span>
                <span className="rounded-full border border-zinc-700 px-3 py-1">
                  Step {step} of {sortedItems.length}
                </span>
                <span className="rounded-full border border-zinc-700 px-3 py-1">
                  {currentSummary.typeLabel}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {currentSummary.name}
                </h2>
                <p className="text-sm leading-6 text-zinc-400">
                  {currentSummary.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={currentSummary.href}
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  Open encyclopedia entry
                </Link>
                <Link
                  href={currentStudyHref}
                  className="inline-flex rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                >
                  Open in study mode
                </Link>
              </div>
            </SurfaceCard>

            <div className="grid gap-4 sm:grid-cols-2">
              <SurfaceCard className="space-y-3">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Previous
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {previousItem?.name ?? "You are at the beginning"}
                </h3>
                <p className="text-sm leading-6 text-zinc-400">
                  {previousItem
                    ? previousItem.description
                    : "There is no earlier step in this path."}
                </p>
                {previousItem ? (
                  <Link
                    href={`/paths/${path.slug}?step=${step - 1}`}
                    className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    Move to previous step
                  </Link>
                ) : null}
              </SurfaceCard>

              <SurfaceCard className="space-y-3">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Next
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {nextItem?.name ?? "You reached the end"}
                </h3>
                <p className="text-sm leading-6 text-zinc-400">
                  {nextItem
                    ? nextItem.description
                    : "Finish here or jump back into the catalog to keep exploring."}
                </p>
                {nextItem ? (
                  <Link
                    href={`/paths/${path.slug}?step=${step + 1}`}
                    className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                  >
                    Move to next step
                  </Link>
                ) : null}
              </SurfaceCard>
            </div>
          </div>
        </section>

        <RecommendedNextSection
          title="Keep moving through the path"
          items={[
            {
              eyebrow: "Stay on path",
              title: "Open the current entry in study mode",
              description:
                "Use study mode when you want a calmer recap before returning to the guided sequence.",
              href: currentStudyHref,
            },
            ...(nextItem
              ? [
                  {
                    eyebrow: "Continue learning",
                    title: `Advance to ${nextItem.name}`,
                    description:
                      "Move directly to the next guided step when you are ready to continue.",
                    href: `/paths/${path.slug}?step=${step + 1}`,
                  },
                ]
              : [
                  {
                    eyebrow: "Path complete",
                    title: "Browse more learning paths",
                    description:
                      "Finish this sequence and choose another guided path to keep building context.",
                    href: "/paths",
                  },
                ]),
            {
              eyebrow: "Open exploration",
              title: "Return to the firearm catalog",
              description:
                "Switch back to the broader catalog whenever you want to explore outside the guided sequence.",
              href: "/tools/firearm-catalog",
            },
          ]}
        />
      </div>
    </main>
  );
}
