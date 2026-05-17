import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Genomics Research | Rigdash",
  description:
    "A standalone Rigdash space for genomics notes, DNA concepts, and Space Marine-inspired research planning.",
};

const researchTracks = [
  {
    title: "Genetic Foundations",
    description:
      "Build a plain-language map of DNA, genes, chromosomes, inheritance, mutation, and expression.",
  },
  {
    title: "Human Performance Biology",
    description:
      "Collect concepts around muscle growth, bone density, oxygen transport, immune response, and recovery.",
  },
  {
    title: "Space Marine Framework",
    description:
      "Use the fiction as a research lens for asking what traits would need biological explanation.",
  },
  {
    title: "Reference Library",
    description:
      "Keep future notes, sources, diagrams, terminology, and comparison tables organized in one place.",
  },
];

const starterQuestions = [
  "Which traits are genetic, developmental, environmental, or fictional?",
  "What real biology helps explain strength, resilience, cognition, and healing?",
  "Where does current science end and worldbuilding begin?",
  "How should notes be grouped so the topic stays understandable over time?",
];

const genomicsAppUrl = "https://helix-forge-os.vercel.app/";

export default function GenomicsPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="border-b border-stone-800 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex rounded-full border border-stone-700 px-3 py-1 text-sm text-stone-300">
              Genomics research
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A dedicated workspace for DNA, genes, and Space Marine-inspired
              biology.
            </h1>

            <p className="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
              This page starts as a clean research hub. It can grow into notes,
              explainers, source lists, diagrams, and structured comparisons
              without being tied to the current catalog or learning path system.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={genomicsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-stone-200"
            >
              Open HelixForge-OS
            </a>
            <Link
              href="/"
              className="rounded-full border border-stone-700 px-5 py-3 text-sm font-medium text-stone-100 transition hover:border-stone-500"
            >
              Back to Rigdash
            </Link>
            <Link
              href="/tools"
              className="rounded-full border border-stone-700 px-5 py-3 text-sm font-medium text-stone-100 transition hover:border-stone-500"
            >
              View tools
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-lg border border-cyan-900/60 bg-cyan-950/20 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Connected app
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              HelixForge-OS
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-stone-300">
              The dedicated genomics operations app lives here. Use it for the
              live demo experience while this Rigdash page becomes the broader
              research, notes, and planning home.
            </p>
          </div>

          <a
            href={genomicsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-cyan-500 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300"
          >
            Visit website -&gt;
          </a>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Research shape
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Start broad, then turn the topic into structured pages.
            </h2>
            <p className="text-sm leading-6 text-stone-400">
              The first version is intentionally simple: a strong URL, a clear
              direction, and sections that can later become real databases,
              diagrams, or guided explainers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {researchTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-lg border border-stone-800 bg-stone-900/50 p-6"
              >
                <h3 className="text-xl font-semibold">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {track.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-lg border border-stone-800 bg-black/20 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
            Starter questions
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {starterQuestions.map((question) => (
              <div
                key={question}
                className="border-t border-stone-800 pt-4 text-sm leading-6 text-stone-300"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
