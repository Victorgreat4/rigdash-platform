import Link from "next/link";
import type { HighlightedEntry } from "@/lib/firearms/homepage";
import SurfaceCard from "@/components/firearms/SurfaceCard";

type HomeHighlightedEntryCardProps = {
  entry: HighlightedEntry;
};

export default function HomeHighlightedEntryCard({
  entry,
}: HomeHighlightedEntryCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {entry.eyebrow}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
        <p className="text-sm text-zinc-400">{entry.subtitle}</p>
      </div>

      <p className="text-sm leading-6 text-zinc-400">{entry.description}</p>

      <Link
        href={entry.href}
        className="mt-auto inline-flex w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
      >
        Open entry
      </Link>
    </SurfaceCard>
  );
}
