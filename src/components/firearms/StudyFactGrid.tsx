import type { StudyFact } from "@/lib/firearms/study";
import SurfaceCard from "./SurfaceCard";

type StudyFactGridProps = {
  facts: StudyFact[];
};

export default function StudyFactGrid({ facts }: StudyFactGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <SurfaceCard key={fact.label} className="space-y-2 border-emerald-900/60 bg-emerald-950/20">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300/80">
            {fact.label}
          </div>
          <div className="text-sm leading-6 text-zinc-100">{fact.value}</div>
        </SurfaceCard>
      ))}
    </div>
  );
}
