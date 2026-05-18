import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
      <div className="space-y-5">
        <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
          Guided discovery and study platform
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Learn through guided comparisons, study steps, and clear next moves.
        </h1>

        <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
          This homepage is built to help first-time visitors find a calm place
          to begin and returning learners pick up where they left off. Instead
          of acting like a plain content index, it points you toward the next
          useful page every time.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools/firearm-catalog"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Explore the catalog
          </Link>

          <Link
            href="/tools/firearm-catalog/learning"
            className="rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-100 transition hover:border-zinc-500"
          >
            Start a learning journey
          </Link>

          <Link
            href="/tools/rigdash-desktop"
            className="rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-100 transition hover:border-zinc-500"
          >
            RigDash Desktop
          </Link>

        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="text-sm text-zinc-500">For first-time visitors</div>
          <div className="mt-2 text-sm leading-6 text-zinc-300">
            Start with a featured cartridge, then move into a compatible weapon
            and a suggested comparison.
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="text-sm text-zinc-500">For returning learners</div>
          <div className="mt-2 text-sm leading-6 text-zinc-300">
            Continue with study mode, jump back into a path, or revisit a
            highlighted entry you have not explored yet.
          </div>
        </div>
      </div>
    </section>
  );
}
