import Link from "next/link";

const sections = [
  {
    eyebrow: "Live section",
    title: "Catalogs & Reference",
    description:
      "Browse structured reference collections, starting with the current firearm and ammunition catalog.",
    href: "/tools/firearm-catalog",
    cta: "Open reference catalog",
  },
  {
    eyebrow: "Active tools",
    title: "Tools",
    description:
      "Small utilities, dashboards, and experiments that can grow into full RigDash workflows.",
    href: "/tools",
    cta: "View tools",
  },
  {
    eyebrow: "Standalone research",
    title: "Genomics",
    description:
      "A dedicated place for DNA, genes, and Space Marine-inspired biology research.",
    href: "/genomics",
    cta: "Open genomics",
  },
  {
    eyebrow: "Ongoing work",
    title: "Projects",
    description:
      "A place for ideas that are still taking shape, from desktop apps to reference systems and prototypes.",
    href: "/tools/rigdash-desktop",
    cta: "See current project",
  },
];

const principles = [
  "Personal home base for different interests",
  "Clean sections that can expand over time",
  "Reference-first pages for topics that need structure",
  "Room for tools, notes, and future research projects",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="border-b border-stone-800 px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-stone-700 px-3 py-1 text-sm text-stone-300">
              Rigdash home base
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A place for catalogs, tools, research, and whatever gets built
                next.
              </h1>

              <p className="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
                Rigdash is my personal workspace for organizing ideas into
                useful sections. Start with the reference catalog, check out the
                tools area, or follow along as future topics like genomics take
                shape.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/firearm-catalog"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-stone-200"
              >
                Explore catalogs
              </Link>

              <Link
                href="/tools"
                className="rounded-full border border-stone-700 px-5 py-3 text-sm font-medium text-stone-100 transition hover:border-stone-500"
              >
                Browse tools
              </Link>
            </div>
          </div>

          <div className="border-l border-stone-800 pl-6">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Current focus
            </div>
            <div className="mt-4 space-y-4">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="border-b border-stone-800 pb-4 text-sm leading-6 text-stone-300 last:border-b-0 last:pb-0"
                >
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Sections
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Pick a doorway into Rigdash.
            </h2>
            <p className="text-stone-400">
              The site can grow one section at a time without forcing every new
              idea into the same category.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-lg border border-stone-800 bg-stone-900/50 p-6 transition hover:border-stone-500 hover:bg-stone-900"
              >
                <div className="text-sm text-stone-500">{section.eyebrow}</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {section.title}
                </h3>
                <p className="mt-3 min-h-18 text-sm leading-6 text-stone-400">
                  {section.description}
                </p>
                <div className="mt-6 text-sm font-medium text-stone-200">
                  {section.cta}
                  <span className="ml-2 transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
