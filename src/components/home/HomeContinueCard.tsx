import Link from "next/link";
import type { ContinueLearningLink } from "@/lib/firearms/homepage";
import SurfaceCard from "@/components/firearms/SurfaceCard";

type HomeContinueCardProps = {
  item: ContinueLearningLink;
};

export default function HomeContinueCard({ item }: HomeContinueCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {item.eyebrow}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{item.description}</p>
      </div>

      <Link
        href={item.href}
        className="mt-auto inline-flex w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
      >
        Continue
      </Link>
    </SurfaceCard>
  );
}
