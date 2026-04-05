import SectionIntro from "./SectionIntro";
import SurfaceCard from "./SurfaceCard";

type WhyItMattersSectionProps = {
  title: string;
  body: string;
  points: string[];
};

export default function WhyItMattersSection({
  title,
  body,
  points,
}: WhyItMattersSectionProps) {
  return (
    <section className="space-y-5">
      <SectionIntro eyebrow="Why it matters" title={title} description={body} />

      <div className="grid gap-3 sm:grid-cols-3">
        {points.map((point) => (
          <SurfaceCard key={point}>
            <p className="text-sm leading-6 text-zinc-300">{point}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
