"use client";

import { useMemo, useState } from "react";

const bases = [
  {
    letter: "A",
    name: "Adenine",
    pairsWith: "T",
    color: "border-emerald-500/70 bg-emerald-950/40 text-emerald-100",
    note: "Pairs with thymine in DNA.",
  },
  {
    letter: "T",
    name: "Thymine",
    pairsWith: "A",
    color: "border-sky-500/70 bg-sky-950/40 text-sky-100",
    note: "Becomes U when copied into RNA.",
  },
  {
    letter: "G",
    name: "Guanine",
    pairsWith: "C",
    color: "border-amber-500/70 bg-amber-950/40 text-amber-100",
    note: "Pairs with cytosine in DNA.",
  },
  {
    letter: "C",
    name: "Cytosine",
    pairsWith: "G",
    color: "border-fuchsia-500/70 bg-fuchsia-950/40 text-fuchsia-100",
    note: "Pairs with guanine in DNA.",
  },
];

const baseMap = new Map(bases.map((base) => [base.letter, base]));
const defaultSequence = "ATGCGTAC";

const mutationExamples = [
  {
    title: "Substitution",
    before: "ATG-CGT-ACA",
    after: "ATG-CAT-ACA",
    description: "One base is swapped. Effects can be silent, harmful, useful, or neutral depending on context.",
  },
  {
    title: "Insertion",
    before: "ATG-CGT-ACA",
    after: "ATG-ACG-TAC-A",
    description: "A base is added. If it shifts triplet reading, the downstream protein message can change heavily.",
  },
  {
    title: "Deletion",
    before: "ATG-CGT-ACA",
    after: "ATG-GTA-CA",
    description: "A base is removed. Small deletions can matter a lot when they alter a coding sequence.",
  },
];

const scaleCards = [
  {
    title: "Gene",
    description: "A functional stretch of DNA that can help produce RNA or influence a trait.",
    reality: "Useful target for some therapies, but most performance traits are not one-gene switches.",
  },
  {
    title: "Chromosome",
    description: "A large packaged DNA structure containing many genes and regulatory regions.",
    reality: "Humans usually have 23 chromosome pairs; changing whole chromosomes is not a clean upgrade path.",
  },
  {
    title: "Genome",
    description: "The complete DNA instruction set across all chromosomes and mitochondrial DNA.",
    reality: "The human genome is roughly 3 billion base pairs, so whole-body redesign is far beyond current medicine.",
  },
];

const advancedBoundaries = [
  "Current human genome editing is aimed at serious disease, not building super-soldiers.",
  "Somatic edits can affect treated tissues; heritable edits raise major safety and governance concerns.",
  "Traits like strength, height, cognition, healing, and endurance are polygenic and shaped by development, training, nutrition, sleep, environment, and medical risk.",
  "A real Space Marine analogue would require coordinated changes across organs, immune tolerance, development, surgery, rehab, and lifelong monitoring. That makes it speculative worldbuilding, not a near-term recipe.",
];

function normalizeSequence(value: string) {
  const sequence = value.toUpperCase().replace(/[^ATGC]/g, "");
  return sequence.slice(0, 18);
}

function complement(sequence: string) {
  return sequence
    .split("")
    .map((letter) => baseMap.get(letter)?.pairsWith ?? "")
    .join("");
}

function transcribe(sequence: string) {
  return sequence.replaceAll("T", "U");
}

function triplets(sequence: string) {
  return sequence.match(/.{1,3}/g) ?? [];
}

export default function ATGCFoundations() {
  const [sequence, setSequence] = useState(defaultSequence);

  const complementaryStrand = useMemo(() => complement(sequence), [sequence]);
  const rnaSequence = useMemo(() => transcribe(sequence), [sequence]);
  const codons = useMemo(() => triplets(rnaSequence), [rnaSequence]);

  return (
    <section
      aria-labelledby="atgc-foundations-title"
      className="border-t border-stone-800 px-6 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              ATGC foundations
            </div>
            <h2
              id="atgc-foundations-title"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Build the biological alphabet before the gene-seed speculation.
            </h2>
          </div>
          <p className="text-sm leading-6 text-stone-300">
            This section keeps the page grounded: real DNA uses base pairing,
            RNA transcription, codon triplets, regulation, cells, tissues, and
            risk. The Space Marine frame is useful as a question engine, not as
            a claim that extreme enhancement is currently possible.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {bases.map((base) => (
            <button
              key={base.letter}
              type="button"
              onClick={() => setSequence((current) => normalizeSequence(`${current}${base.letter}`))}
              className={`rounded-lg border p-5 text-left transition hover:-translate-y-0.5 ${base.color}`}
              aria-label={`Add ${base.name} to the DNA strand`}
            >
              <div className="text-5xl font-bold">{base.letter}</div>
              <div className="mt-3 text-sm font-semibold">{base.name}</div>
              <div className="mt-2 text-xs leading-5 opacity-85">{base.note}</div>
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold">Mini Sequence Builder</h3>
              <button
                type="button"
                onClick={() => setSequence(defaultSequence)}
                className="rounded-full border border-stone-700 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
              >
                Reset
              </button>
            </div>

            <label className="mt-5 block text-sm text-stone-400" htmlFor="dna-sequence">
              DNA sequence
            </label>
            <input
              id="dna-sequence"
              value={sequence}
              onChange={(event) => setSequence(normalizeSequence(event.target.value))}
              className="mt-2 w-full rounded-lg border border-stone-700 bg-black px-4 py-3 font-mono text-lg text-stone-100 outline-none transition focus:border-cyan-400"
              spellCheck={false}
            />

            <div className="mt-6 grid gap-3 font-mono text-sm">
              <div className="rounded-lg border border-stone-800 bg-black/30 p-4">
                <div className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-stone-500">
                  DNA strand
                </div>
                {sequence}
              </div>
              <div className="rounded-lg border border-stone-800 bg-black/30 p-4">
                <div className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-stone-500">
                  Complementary strand
                </div>
                {complementaryStrand}
              </div>
              <div className="rounded-lg border border-stone-800 bg-black/30 p-4">
                <div className="mb-2 font-sans text-xs uppercase tracking-[0.18em] text-stone-500">
                  RNA transcript
                </div>
                {rnaSequence}
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-cyan-900/70 bg-cyan-950/20 p-6">
            <h3 className="text-2xl font-semibold">Pairing and Codons</h3>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="rounded-lg border border-cyan-800/70 p-4">
                <div className="font-semibold text-cyan-100">Base pairing</div>
                <p className="mt-2 text-stone-300">A pairs with T. C pairs with G.</p>
              </div>
              <div className="rounded-lg border border-cyan-800/70 p-4">
                <div className="font-semibold text-cyan-100">Transcription</div>
                <p className="mt-2 text-stone-300">
                  DNA is copied into RNA, and thymine is represented as uracil:
                  T becomes U.
                </p>
              </div>
              <div className="rounded-lg border border-cyan-800/70 p-4">
                <div className="font-semibold text-cyan-100">Triplets</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {codons.map((codon, index) => (
                    <span
                      key={`${codon}-${index}`}
                      className="rounded-md border border-cyan-700 bg-black/30 px-3 py-2 font-mono text-cyan-100"
                    >
                      {codon}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-stone-300">
                  ATG in DNA becomes AUG in RNA, a common start signal for
                  protein translation.
                </p>
              </div>
            </div>
          </article>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {scaleCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-stone-800 bg-black/20 p-6"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {card.description}
              </p>
              <p className="mt-4 border-t border-stone-800 pt-4 text-sm leading-6 text-stone-300">
                <strong className="text-stone-100">Reality check:</strong>{" "}
                {card.reality}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-amber-800 bg-amber-950/25 p-6">
            <h3 className="text-xl font-semibold text-amber-100">
              Fiction vs Real Biology Boundary
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-50/90">
              {advancedBoundaries.map((boundary) => (
                <li key={boundary} className="border-t border-amber-800/70 pt-3 first:border-t-0 first:pt-0">
                  {boundary}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <h3 className="text-xl font-semibold">Mutation Examples</h3>
            <div className="mt-4 grid gap-3">
              {mutationExamples.map((mutation) => (
                <div
                  key={mutation.title}
                  className="rounded-lg border border-stone-800 bg-black/25 p-4"
                >
                  <div className="font-semibold text-stone-100">{mutation.title}</div>
                  <div className="mt-2 grid gap-2 font-mono text-sm text-stone-300 sm:grid-cols-2">
                    <div>Before: {mutation.before}</div>
                    <div>After: {mutation.after}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-400">
                    {mutation.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
