import Link from "next/link";
import type { RecommendedNextItem } from "@/lib/firearms/discovery";
import SectionIntro from "./SectionIntro";
import SurfaceCard from "./SurfaceCard";

type RecommendedNextSectionProps = {
  title?: string;
  description?: string;
  items: RecommendedNextItem[];
};

export default function RecommendedNextSection({
  title = "Recommended next",
  description = "Each page should lead naturally into the next useful page. Use these links to keep learning through relationships instead of starting over.",
  items,
}: RecommendedNextSectionProps) {
  return (
    <section className="space-y-5">
      <SectionIntro eyebrow="Recommended next" title={title} description={description} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <SurfaceCard key={`${item.href}-${item.title}`} className="flex h-full flex-col gap-3">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {item.eyebrow}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{item.description}</p>
            </div>

            {item.reasons && item.reasons.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.reasons.map((reason) => (
                  <span
                    key={reason}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            ) : null}

            <Link
              href={item.href}
              className="mt-auto inline-flex w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Continue
            </Link>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
