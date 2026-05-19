import Link from "next/link";

const systemRows = [
  {
    system: "Muscle Output",
    analogue: "Biscopea",
    fictionClaim: "Extreme hypertrophy and power scaling.",
    realSystems: "IGF-1 signaling, myostatin restraint, mTOR, satellite-cell repair.",
    reality: "Limited biology is real; stable whole-body enhancement is speculative.",
    blocker: "Tendon load, cardiac strain, metabolic cost, cancer risk, tissue targeting.",
    status: "Speculative",
    accent: "border-emerald-500/60 text-emerald-200",
  },
  {
    system: "Skeletal Reinforcement",
    analogue: "Osmodula",
    fictionClaim: "Dense, enlarged, impact-resistant skeletal architecture.",
    realSystems: "Osteoblasts, osteoclasts, WNT signaling, growth plates, mineral control.",
    reality: "Bone remodeling is medically tractable in narrow contexts.",
    blocker: "Adult body-plan redesign, nerve compression, brittle bone, endocrine balance.",
    status: "Partly Plausible",
    accent: "border-amber-500/60 text-amber-200",
  },
  {
    system: "Circulatory Redundancy",
    analogue: "Second Heart",
    fictionClaim: "Auxiliary pump for endurance, trauma tolerance, and backup circulation.",
    realSystems: "Assist devices, vascular grafting, tissue engineering, cardiac rhythm.",
    reality: "Mechanical support exists; integrated biological redundancy is speculative.",
    blocker: "Arrhythmia, clotting, immune rejection, vascular integration, pressure control.",
    status: "Experimental Edge",
    accent: "border-red-500/60 text-red-200",
  },
  {
    system: "Blood Capacity",
    analogue: "Hemastamen",
    fictionClaim: "Altered blood chemistry and greater oxygen support.",
    realSystems: "Hematopoiesis, EPO signaling, hemoglobin regulation, iron metabolism.",
    reality: "Blood disorders can be treated; performance upgrading is high risk.",
    blocker: "Thrombosis, hypertension, marrow disruption, malignancy surveillance.",
    status: "Constrained",
    accent: "border-sky-500/60 text-sky-200",
  },
  {
    system: "Wound Response",
    analogue: "Larraman's Organ",
    fictionClaim: "Rapid clotting, sealing, and accelerated tissue repair.",
    realSystems: "Platelets, fibrin, inflammation, fibroblasts, angiogenesis, remodeling.",
    reality: "Wound-care science is real; instant systemic repair is fictional.",
    blocker: "Dangerous clotting, fibrosis, infection masking, runaway inflammation.",
    status: "Fiction-Heavy",
    accent: "border-fuchsia-500/60 text-fuchsia-200",
  },
];

const creationPipeline = [
  "Genome literacy",
  "Cell behavior",
  "Tissue systems",
  "Organ integration",
  "Training adaptation",
  "Ethics and oversight",
];

const catalogLinks = [
  {
    title: "Firearm Catalog",
    description:
      "Weapons, cartridges, compatibility, roles, and linked reference entries.",
    href: "/tools/firearm-catalog",
    label: "Open catalog",
  },
  {
    title: "Genomics Catalog",
    description:
      "Traits, organ systems, pathways, risks, fictional analogues, and feasibility status.",
    href: "#gene-seed-dossier-title",
    label: "Open dossier",
  },
  {
    title: "Tools Catalog",
    description:
      "Desktop builds, utilities, experiments, and future workflow surfaces.",
    href: "/tools",
    label: "Open tools",
  },
];

export default function TranshumanSystemsMatrix() {
  return (
    <section
      aria-labelledby="transhuman-systems-title"
      className="border-t border-stone-800 px-6 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-red-300">
              Transhuman systems matrix
            </div>
            <h2
              id="transhuman-systems-title"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Treat the Space Marine idea like a systems-engineering problem.
            </h2>
          </div>
          <p className="text-sm leading-6 text-stone-300">
            The professional version of this concept is not a fantasy recipe. It
            is a structured map of claims, biological systems, constraints,
            blockers, and ethics. That makes the ambition feel serious while
            keeping the page grounded in real-world biology.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {creationPipeline.map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-stone-800 bg-black/25 p-4"
            >
              <div className="font-mono text-xs text-stone-500">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="mt-3 text-sm font-semibold text-stone-100">
                {step}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border border-stone-800 bg-stone-950">
          <div className="grid grid-cols-2 border-b border-stone-800 bg-stone-900/70 text-xs uppercase tracking-[0.16em] text-stone-400 md:grid-cols-[1fr_1fr_1.2fr_1.3fr_1.2fr_1fr]">
            <div className="px-4 py-3">System</div>
            <div className="px-4 py-3">Analogue</div>
            <div className="hidden px-4 py-3 md:block">Fictional Claim</div>
            <div className="hidden px-4 py-3 md:block">Real Biology</div>
            <div className="hidden px-4 py-3 md:block">Primary Blocker</div>
            <div className="px-4 py-3">Status</div>
          </div>

          <div className="divide-y divide-stone-900">
            {systemRows.map((row) => (
              <article
                key={row.system}
                className="grid gap-0 text-sm md:grid-cols-[1fr_1fr_1.2fr_1.3fr_1.2fr_1fr]"
              >
                <div className="border-l-2 border-stone-700 px-4 py-4">
                  <div className="font-semibold text-stone-100">{row.system}</div>
                  <div className="mt-2 text-xs leading-5 text-stone-500 md:hidden">
                    {row.fictionClaim}
                  </div>
                </div>
                <div className="px-4 py-4 text-stone-300">{row.analogue}</div>
                <div className="hidden px-4 py-4 leading-6 text-stone-400 md:block">
                  {row.fictionClaim}
                </div>
                <div className="hidden px-4 py-4 leading-6 text-stone-400 md:block">
                  {row.realSystems}
                  <p className="mt-3 text-stone-300">{row.reality}</p>
                </div>
                <div className="hidden px-4 py-4 leading-6 text-stone-400 md:block">
                  {row.blocker}
                </div>
                <div className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${row.accent}`}
                  >
                    {row.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-lg border border-red-900/70 bg-red-950/20 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-red-300">
              Operating rule
            </div>
            <h3 className="mt-3 text-2xl font-semibold">
              Every enhancement claim gets a constraint.
            </h3>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              That is the tone that keeps this professional: no miracle organs,
              no one-gene upgrades, no clean conversion myth. Each concept is
              treated like a catalog entry with compatibility, failure modes,
              feasibility, and safety boundaries.
            </p>
          </article>

          <article className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Rigdash catalog model
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {catalogLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-lg border border-stone-800 bg-black/25 p-4 transition hover:border-stone-500"
                >
                  <h3 className="font-semibold text-stone-100">{link.title}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-stone-400">
                    {link.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-stone-200">
                    {link.label} -&gt;
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
