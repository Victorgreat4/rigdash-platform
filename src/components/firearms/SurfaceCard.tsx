import type { ReactNode } from "react";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SurfaceCard({
  children,
  className = "",
}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
