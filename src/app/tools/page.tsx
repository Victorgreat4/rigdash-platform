import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="space-y-4">
          <div className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            Tools
          </div>

          <h1 className="text-5xl font-bold tracking-tight">Tools</h1>

          <p className="max-w-3xl text-lg text-zinc-400">
            Desktop apps, utilities, downloads, and release pages for the
            RigDash ecosystem.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/tools/rigdash-desktop"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                Windows
              </span>
              <span className="rounded-full border border-amber-700 px-3 py-1 text-xs text-amber-300">
                In Progress
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-semibold">RigDash Desktop</h2>
            <p className="text-zinc-400">
              Windows desktop companion app for fast access to gaming workflow,
              utilities, and future release downloads.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}