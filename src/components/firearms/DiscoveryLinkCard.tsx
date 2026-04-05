import Link from "next/link";
import SurfaceCard from "./SurfaceCard";

type DiscoveryLinkCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
};

export default function DiscoveryLinkCard({
  eyebrow,
  title,
  description,
  href,
  cta = "Explore",
}: DiscoveryLinkCardProps) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-4">
      {eyebrow ? (
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          {eyebrow}
        </div>
      ) : null}

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm leading-6 text-zinc-400">{description}</p>
      </div>

      <Link
        href={href}
        className="mt-auto inline-flex w-fit rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
      >
        {cta}
      </Link>
    </SurfaceCard>
  );
}
