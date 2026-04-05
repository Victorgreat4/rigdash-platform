import Link from "next/link";
import SurfaceCard from "./SurfaceCard";

type FeaturedItemCardProps = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  badges?: string[];
};

export default function FeaturedItemCard({
  href,
  title,
  subtitle,
  description,
  badges = [],
}: FeaturedItemCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>

      {badges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <p className="text-sm leading-6 text-zinc-400">{description}</p>

      <Link
        href={href}
        className="mt-auto inline-flex w-fit rounded-full border border-emerald-800 bg-emerald-950/50 px-4 py-2 text-sm text-emerald-100 transition hover:border-emerald-600"
      >
        Open detail page
      </Link>
    </SurfaceCard>
  );
}
