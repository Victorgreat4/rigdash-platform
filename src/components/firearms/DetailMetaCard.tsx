import type { ReactNode } from "react";
import SurfaceCard from "./SurfaceCard";

type DetailMetaItem = {
  label: string;
  value: string | number;
};

type DetailMetaCardProps = {
  heading: string;
  items: DetailMetaItem[];
  action?: ReactNode;
};

export default function DetailMetaCard({
  heading,
  items,
  action,
}: DetailMetaCardProps) {
  return (
    <SurfaceCard className="space-y-4">
      <div className="text-sm text-zinc-500">{heading}</div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              {item.label}
            </div>
            <div className="mt-1 text-sm text-zinc-200">{item.value}</div>
          </div>
        ))}
      </div>

      {action}
    </SurfaceCard>
  );
}
