import type { Metadata } from "next";
import Link from "next/link";
import GenomicsSectionNav from "@/components/genomics/GenomicsSectionNav";

export const metadata: Metadata = {
  title: "Cell Reprogramming Product Dossier | Rigdash Genomics",
  description:
    "A grounded product and research dossier for controlled somatic cell-state programming, safety gates, candidate tissue programs, and reality constraints.",
  openGraph: {
    title: "Cell Reprogramming Product Dossier | Rigdash Genomics",
    description:
      "A serious early-product framing for repair-oriented cellular reprogramming without overclaiming enhancement or full-body redesign.",
  },
};

const stackLayers = [
  {
    title: "Cell Targeting",
    description:
      "Define the exact tissue and cell population before discussing any state change. Muscle satellite cells, fibroblasts, hematopoietic cells, immune cells, and osteogenic progenitors all behave differently.",
    productQuestion:
      "Which cell type is addressable, measurable, and clinically meaningful enough for a first platform use case?",
  },
  {
    title: "State Change",
    description:
      "The near-term product should focus on repair, regeneration, or resilience states rather than broad enhancement. The useful question is what cell behavior changes, not which single gene sounds powerful.",
    productQuestion:
      "Are we inducing controlled repair activity, reducing harmful inflammation, improving matrix quality, or restoring a lost function?",
  },
  {
    title: "Control Logic",
    description:
      "A credible system needs temporal control: when expression starts, how strong it gets, how long it lasts, and how it shuts down. Permanent always-on programs are a safety liability.",
    productQuestion:
      "Can the program be transient, reversible, locally bounded, and monitored with clear stop criteria?",
  },
  {
    title: "Delivery Model",
    description:
      "Delivery is the main platform bottleneck. Ex vivo modified cells, localized delivery, and tissue-specific approaches are more realistic than broad systemic body-wide programming.",
    productQuestion:
      "Can delivery reach the target cells without exposing unrelated tissues to unacceptable risk?",
  },
  {
    title: "Readout Layer",
    description:
      "The product needs biomarkers, imaging, functional assays, and longitudinal surveillance before it can make any serious claim about benefit.",
    productQuestion:
      "What proves the intended cell state changed, and what proves the change stayed within safety boundaries?",
  },
];

const tissuePrograms = [
  {
    title: "Muscle Repair Program",
    nearTerm:
      "Recovery biology, satellite-cell function, fibrosis reduction, and injury repair.",
    avoid:
      "Super-strength claims, open-ended hypertrophy, or whole-body performance enhancement.",
    signals:
      "Creatine kinase, inflammatory markers, imaging, functional recovery, fibrosis markers.",
  },
  {
    title: "Skin and Wound Program",
    nearTerm:
      "Localized wound closure, matrix quality, epithelial repair, and scar modulation.",
    avoid:
      "Instant healing, systemic clot acceleration, or masking infection risk.",
    signals:
      "Closure rate, infection markers, scar quality, vascularization, coagulation balance.",
  },
  {
    title: "Bone Remodeling Program",
    nearTerm:
      "Local bone repair, implant integration, mineralization quality, and remodeling balance.",
    avoid:
      "Adult skeletal redesign, body-wide density escalation, or irreversible growth changes.",
    signals:
      "Imaging, alkaline phosphatase, mineral panels, turnover markers, pain and function.",
  },
  {
    title: "Blood and Immune Program",
    nearTerm:
      "Disease-oriented cell engineering, inflammatory control, oxygen transport disorders, and immune tolerance.",
    avoid:
      "Generic better blood, endurance doping, or uncontrolled marrow stimulation.",
    signals:
      "CBC, differential, cytokines, clotting panels, marrow health, malignancy surveillance.",
  },
];

const realityGates = [
  "Therapeutic or injury-repair use case before enhancement use case.",
  "Somatic-only scope; no heritable or germline modification.",
  "Local, cell-specific, or ex vivo control before systemic delivery.",
  "Transient or reversible activity before permanent modification.",
  "Measurable biomarkers before broad claims about function.",
  "Failure-mode mapping before any benefit narrative.",
  "Regulatory path as a medical product, not a consumer upgrade.",
];

const safetyModel = [
  {
    title: "Identity Preservation",
    description:
      "Partial reprogramming is only useful if the cell keeps the identity the body needs. Dedifferentiation into an unstable or pluripotent-like state is a core hazard.",
  },
  {
    title: "Tumor and Overgrowth Risk",
    description:
      "Any program that increases proliferation, plasticity, repair, or survival has to prove it does not create uncontrolled growth pressure.",
  },
  {
    title: "Immune and Inflammatory Risk",
    description:
      "Delivery vehicles, edited cells, new proteins, and tissue damage can all create immune responses. Silence is not safety; surveillance is part of the product.",
  },
  {
    title: "Tissue Mismatch",
    description:
      "A useful signal in one tissue can be harmful in another. Product design must keep the program bounded to the intended cells and context.",
  },
];

const researchAnchors = [
  {
    title: "iPSC Mechanisms and Applications",
    source: "Nature Signal Transduction and Targeted Therapy",
    href: "https://www.nature.com/articles/s41392-024-01809-0",
  },
  {
    title: "Reprogramming-Induced Rejuvenation Review",
    source: "Nature Communications",
    href: "https://www.nature.com/articles/s41467-024-46020-5",
  },
  {
    title: "Cellular and Gene Therapy Guidance",
    source: "U.S. FDA",
    href: "https://www.fda.gov/vaccines-blood-biologics/biologics-guidances/cellular-gene-therapy-guidances",
  },
  {
    title: "RMAT Approvals",
    source: "U.S. FDA",
    href: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/cber-regenerative-medicine-advanced-therapy-rmat-approvals",
  },
];

export default function CellReprogrammingPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <GenomicsSectionNav active="cell-reprogramming" />

      <section className="border-b border-stone-800 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex rounded-full border border-cyan-700 px-3 py-1 text-sm text-cyan-200">
              Product research dossier
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Controlled cell-state programming as the smallest credible
              gene-seed-like platform.
            </h1>

            <p className="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
              This page treats the idea like a current genomics product owner
              would: not as full-body enhancement, but as a repair-oriented
              somatic platform hypothesis with explicit delivery, measurement,
              safety, and regulatory gates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/genomics"
              className="rounded-full border border-stone-700 px-5 py-3 text-sm font-medium text-stone-100 transition hover:border-stone-500"
            >
              Back to lab notebook
            </Link>
            <a
              href="#reality-gates"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-stone-200"
            >
              Review reality gates
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-cyan-900/70 bg-cyan-950/20 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Platform hypothesis
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              The first product is a control system, not a transformation myth.
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              A credible early platform would program selected somatic cells
              toward bounded repair or regenerative states while preserving
              identity. The product promise is control: target, duration,
              reversibility, readouts, and shutdown logic.
            </p>
          </article>

          <article className="rounded-lg border border-amber-800 bg-amber-950/25 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-amber-300">
              Boundary
            </div>
            <h2 className="mt-3 text-2xl font-semibold">
              This is not a protocol or enhancement plan.
            </h2>
            <p className="mt-4 text-sm leading-6 text-amber-50/90">
              The useful version stays at product strategy and research
              architecture. It avoids wet-lab recipes, dosing, construct
              design, or instructions for engineering human traits.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-stone-800 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="max-w-3xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Cell reprogramming stack
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              The product layer map.
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {stackLayers.map((layer) => (
              <article
                key={layer.title}
                className="rounded-lg border border-stone-800 bg-stone-900/50 p-6"
              >
                <h3 className="text-xl font-semibold">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {layer.description}
                </p>
                <p className="mt-4 border-t border-stone-800 pt-4 text-sm leading-6 text-stone-300">
                  <strong className="text-stone-100">Product question:</strong>{" "}
                  {layer.productQuestion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="max-w-3xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Candidate tissue programs
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Start with repair contexts that can be measured.
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {tissuePrograms.map((program) => (
              <article
                key={program.title}
                className="rounded-lg border border-stone-800 bg-black/20 p-6"
              >
                <h3 className="text-xl font-semibold">{program.title}</h3>
                <dl className="mt-5 space-y-4 text-sm leading-6">
                  <div>
                    <dt className="font-semibold text-stone-100">
                      Grounded near-term scope
                    </dt>
                    <dd className="mt-1 text-stone-400">{program.nearTerm}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-stone-100">
                      Avoid overclaiming
                    </dt>
                    <dd className="mt-1 text-stone-400">{program.avoid}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-stone-100">
                      Measurement signals
                    </dt>
                    <dd className="mt-1 text-stone-400">{program.signals}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="reality-gates"
        className="border-t border-stone-800 px-6 py-12 sm:py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-red-300">
              Reality gates
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Every program has to earn credibility before ambition.
            </h2>
            <p className="text-sm leading-6 text-stone-400">
              These gates keep the dossier aligned with current cell and gene
              therapy reality instead of drifting into generic enhancement
              language.
            </p>
          </div>

          <div className="rounded-lg border border-red-900/70 bg-red-950/20 p-6">
            <ul className="grid gap-3 text-sm leading-6 text-red-50/90 md:grid-cols-2">
              {realityGates.map((gate) => (
                <li
                  key={gate}
                  className="border-t border-red-900/70 pt-3 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-3"
                >
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="max-w-3xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Safety model
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              The safety architecture is the product.
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {safetyModel.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-stone-800 bg-stone-900/50 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="max-w-3xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Research anchors
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Source lanes for future notes.
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {researchAnchors.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-stone-800 bg-black/20 p-6 transition hover:border-stone-500"
              >
                <div className="text-sm text-stone-500">{anchor.source}</div>
                <h3 className="mt-3 text-xl font-semibold text-stone-100">
                  {anchor.title}
                </h3>
                <div className="mt-4 text-sm font-medium text-stone-300">
                  Open source -&gt;
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
