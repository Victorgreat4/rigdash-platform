import Link from "next/link";
import type { HomepageComparison } from "@/lib/firearms/homepage";
import SurfaceCard from "@/components/firearms/SurfaceCard";

type HomeComparisonCardProps = {
  comparison: HomepageComparison;
};

export default function HomeComparisonCard({
  comparison,
}: HomeComparisonCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Suggested comparison
        </div>
        <h3 className="text-xl font-semibold text-white">{comparison.title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{comparison.description}</p>
      </div>

      <div className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
        {comparison.reason}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={comparison.left.href}
          className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-zinc-600"
        >
          <div className="text-sm font-semibold text-white">
            {comparison.left.title}
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            {comparison.left.subtitle}
          </div>
        </Link>

        <Link
          href={comparison.right.href}
          className="rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-zinc-600"
        >
          <div className="text-sm font-semibold text-white">
            {comparison.right.title}
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            {comparison.right.subtitle}
          </div>
        </Link>
      </div>
    </SurfaceCard>
  );
}
