import Link from "next/link";
import SurfaceCard from "./SurfaceCard";

export type RelatedEntryListItem = {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
  description?: string | null;
};

type RelatedEntryListProps = {
  items: RelatedEntryListItem[];
  emptyMessage: string;
  buttonLabel: string;
};

export default function RelatedEntryList({
  items,
  emptyMessage,
  buttonLabel,
}: RelatedEntryListProps) {
  if (items.length === 0) {
    return (
      <SurfaceCard>
        <p className="text-sm leading-6 text-zinc-400">{emptyMessage}</p>
      </SurfaceCard>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <SurfaceCard key={item.id} className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.subtitle}</p>
            </div>

            {item.href ? (
              <Link
                href={item.href}
                className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              >
                {buttonLabel}
              </Link>
            ) : null}
          </div>

          {item.description ? (
            <p className="text-sm leading-6 text-zinc-400">{item.description}</p>
          ) : null}
        </SurfaceCard>
      ))}
    </div>
  );
}
