import Link from "next/link";
import type { LearningPathRecord } from "@/lib/firearms/queries";
import SurfaceCard from "./SurfaceCard";

type LearningPathCardProps = {
  path: LearningPathRecord;
};

export default function LearningPathCard({ path }: LearningPathCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="rounded-full border border-zinc-700 px-3 py-1">
          {path.level}
        </span>
        {path.estimated_minutes ? (
          <span className="rounded-full border border-zinc-700 px-3 py-1">
            {path.estimated_minutes} min
          </span>
        ) : null}
        <span className="rounded-full border border-zinc-700 px-3 py-1">
          {path.items.length} steps
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{path.title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{path.description}</p>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        {path.items.slice(0, 3).map((item) => (
          <div key={item.id}>
            Step {item.item_order}: {item.title_override ?? item.cartridge?.name ?? item.weapon?.name ?? "Entry"}
          </div>
        ))}
      </div>

      <Link
        href={`/paths/${path.slug}`}
        className="mt-auto inline-flex w-fit rounded-full border border-emerald-800 bg-emerald-950/50 px-4 py-2 text-sm text-emerald-100 transition hover:border-emerald-600"
      >
        Open path
      </Link>
    </SurfaceCard>
  );
}
