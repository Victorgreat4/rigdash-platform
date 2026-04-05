import Link from "next/link";
import type { LearningPathItemRecord } from "@/lib/firearms/queries";
import { getLearningPathItemSummary } from "@/lib/firearms/queries";

type LearningPathSequenceProps = {
  items: LearningPathItemRecord[];
  currentIndex: number;
  pathSlug: string;
};

export default function LearningPathSequence({
  items,
  currentIndex,
  pathSlug,
}: LearningPathSequenceProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const summary = getLearningPathItemSummary(item);
        const state =
          index < currentIndex
            ? "previous"
            : index === currentIndex
              ? "current"
              : "next";

        const style =
          state === "current"
            ? "border-emerald-700 bg-emerald-950/30"
            : state === "previous"
              ? "border-zinc-800 bg-zinc-950/60"
              : "border-zinc-800 bg-zinc-950/90";

        return (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 ${style}`.trim()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  {state} step
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Step {index + 1}: {summary.name}
                </h3>
                <p className="text-sm text-zinc-400">{summary.typeLabel}</p>
              </div>

              <Link
                href={`/paths/${pathSlug}?step=${index + 1}`}
                className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200 transition hover:border-zinc-500"
              >
                View step
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
