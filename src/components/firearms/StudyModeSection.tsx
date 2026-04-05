import type { StudyFact, StudySummary } from "@/lib/firearms/study";
import SectionIntro from "./SectionIntro";
import StudyFactGrid from "./StudyFactGrid";
import StudySummaryCard from "./StudySummaryCard";

type StudyModeSectionProps = {
  description: string;
  facts: StudyFact[];
  summary: StudySummary;
};

export default function StudyModeSection({
  description,
  facts,
  summary,
}: StudyModeSectionProps) {
  return (
    <section className="space-y-5">
      <SectionIntro
        eyebrow="Study mode"
        title="Study the essentials"
        description={description}
      />

      <StudyFactGrid facts={facts} />
      <StudySummaryCard summary={summary} />
    </section>
  );
}
