import type { SelfCheckPrompt } from "@/lib/firearms/study";
import SectionIntro from "./SectionIntro";
import SurfaceCard from "./SurfaceCard";

type SelfCheckBlockProps = {
  prompts: SelfCheckPrompt[];
};

export default function SelfCheckBlock({ prompts }: SelfCheckBlockProps) {
  return (
    <section className="space-y-5">
      <SectionIntro
        eyebrow="Mini self-check"
        title="Pause and recall the essentials"
        description="This is a lightweight review block for v1. It keeps detail pages active without turning them into a full flashcard system yet."
      />

      <div className="grid gap-4">
        {prompts.map((prompt) => (
          <SurfaceCard
            key={prompt.question}
            className="space-y-3 border-emerald-900/60 bg-emerald-950/20"
          >
            <h3 className="text-lg font-semibold text-white">{prompt.question}</h3>
            <p className="text-sm leading-6 text-zinc-300">Hint: {prompt.hint}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
