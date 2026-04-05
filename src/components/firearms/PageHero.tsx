import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  backHref?: string;
  backLabel?: string;
  eyebrow: string;
  title: string;
  description?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export default function PageHero({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  subtitle,
  actions,
}: PageHeroProps) {
  return (
    <div className="space-y-4">
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300 transition hover:border-zinc-500"
        >
          {backLabel}
        </Link>
      ) : null}

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}

      <div className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          {eyebrow}
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-base leading-7 text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
