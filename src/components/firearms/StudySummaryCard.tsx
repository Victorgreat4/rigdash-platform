import type { StudySummary } from "@/lib/firearms/study";
import SurfaceCard from "./SurfaceCard";

type StudySummaryCardProps = {
  summary: StudySummary;
};

export default function StudySummaryCard({ summary }: StudySummaryCardProps) {
  return (
    <SurfaceCard className="space-y-3 border-emerald-900/60 bg-emerald-950/20">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300/80">
        {summary.title}
      </div>
      <p className="text-sm leading-6 text-zinc-200">{summary.description}</p>
    </SurfaceCard>
  );
}
