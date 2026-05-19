import type { GenomicsImplant } from "@/lib/genomics/types";
import implantMetadata from "@/lib/genomics/implants.json";

type ImplantContent = GenomicsImplant & {
  summary: string;
  mechanismLore: string;
  mechanismAnalogue: string;
  analogues: string[];
  timeline: string;
  risks: string[];
  ethics: string;
  illustration: string;
};

const implants = implantMetadata as GenomicsImplant[];

const implantContent: ImplantContent[] = [
  {
    ...implants[0],
    summary:
      "The Biscopea is framed as a growth-regulating organ that pushes skeletal muscle toward extreme hypertrophy. In educational terms, it is best treated as a fictional comparison point for endocrine signaling, satellite-cell activity, and muscle protein turnover.",
    mechanismLore:
      "The Biscopea is described as an implanted regulator that continually biases the body toward extraordinary muscle growth and power output. It behaves like a synthetic endocrine node, reading developmental state and training stress while releasing factors that amplify hypertrophy beyond normal human limits.",
    mechanismAnalogue:
      "A plausible scientific analogue would combine high-level concepts from IGF-1 signaling, myostatin inhibition, androgen-receptor sensitivity, mechanotransduction, and satellite-cell recruitment. Candidate pathways include IGF1/PI3K/AKT/mTOR for protein synthesis, MSTN/SMAD2/3 for growth restraint, PPARGC1A for mitochondrial adaptation, and MYOD1/MYF5 for myogenic differentiation. Regulatory elements would matter as much as coding genes: muscle-selective promoters, inducible enhancers, and feedback-sensitive expression controls would be needed to avoid uncontrolled systemic effects. In modern research, vectors such as AAV are discussed for tissue-targeted gene delivery, while lipid nanoparticles and engineered cells are explored for transient expression; this dossier uses those examples as analogues, not instructions. Relevant cell types include myofibers, satellite cells, fibro-adipogenic progenitors, endothelial cells, and immune cells that shape repair after exercise. The feasible science is limited: animal studies can show altered muscle mass or strength markers, but a stable organ that safely coordinates lifelong superhuman growth remains fictional. Monitoring would focus on creatine kinase, inflammatory cytokines, glucose handling, cardiac strain, and abnormal cell proliferation.",
    analogues: [
      "AAV-mediated IGF-1 expression in muscle research",
      "Myostatin loss-of-function and hypertrophy phenotypes",
      "Resistance-training mechanotransduction through mTOR signaling",
      "Satellite-cell activation during muscle repair",
    ],
    timeline:
      "Animal model: measurable molecular and size changes could appear around 28 days. Human translation: any regulated, therapeutic muscle intervention would likely require years of staged safety work and would not resemble a performance implant.",
    risks: [
      "Failure modes: cachexia-like imbalance, tendon overload, cardiac hypertrophy, insulin resistance, uncontrolled tissue growth.",
      "Monitor: creatine kinase, C-reactive protein, IL-6, fasting glucose, HbA1c, IGF-1, troponin, echocardiography, and tumor surveillance markers when clinically justified.",
    ],
    ethics:
      "Consent, coercion, dual-use performance enhancement, and unequal access would dominate any real discussion. Germline spillover must be prevented, and a real intervention would fall under strict gene therapy, drug, device, or combination-product regulation.",
    illustration:
      "SVG brief: torso muscle cross-section with an inset endocrine node, arrows to IGF-1, mTOR, myostatin, satellite cells, and monitoring biomarkers.",
  },
  {
    ...implants[1],
    summary:
      "The Osmodula is a fictional skeletal-modification implant associated with reinforced bones and altered growth. As a science analogue, it maps to osteoblast activity, cartilage growth plates, mineral metabolism, and bone remodeling feedback.",
    mechanismLore:
      "The Osmodula functions as a developmental controller for bone density, skeletal proportions, and mineral reinforcement. In the fictional frame, it directs the skeleton to become larger, stronger, and more impact resistant than ordinary human bone.",
    mechanismAnalogue:
      "A scientifically grounded comparison would involve the balance between osteoblast bone formation, osteoclast resorption, chondrocyte maturation, and endocrine mineral control. Candidate genes and pathways include RUNX2 and SP7 for osteoblast differentiation, COL1A1 for bone matrix, SOST and WNT/LRP5 signaling for formation restraint, RANK/RANKL/OPG for remodeling, and FGFR3/IHH/PTHrP axes for growth plate regulation. Regulatory elements would need tissue-selective behavior in osteogenic progenitors, periosteal cells, chondrocytes, and marrow stromal cells. Fiction often compresses this into a single organ command, while feasible science shows that skeletal remodeling is slow, mechanically responsive, and highly context dependent. Delivery-vector analogues in research include viral vectors, local biomaterial scaffolds, mRNA systems, and cell-based approaches, but translating them into whole-body skeletal redesign would be far beyond current therapy. Cellular processes would include matrix deposition, mineralization, angiogenesis, osteocyte mechanosensing, and inflammatory coupling after microdamage. The key separation is that increasing bone density is biologically plausible in limited contexts, while safely rewriting adult skeletal architecture across the whole body remains fictional.",
    analogues: [
      "WNT/LRP5 signaling in high-bone-mass phenotypes",
      "Sclerostin inhibition as a bone-formation analogue",
      "Osteoblast and osteoclast remodeling cycles",
      "Growth plate biology in developmental skeletal disorders",
      "Biomaterial scaffolds for localized bone repair",
    ],
    timeline:
      "Animal model: bone turnover markers and micro-CT changes may be measurable around 56 days. Human translation: meaningful skeletal remodeling usually requires months to years and careful orthopedic/endocrine monitoring.",
    risks: [
      "Failure modes: brittle bone, nerve compression, abnormal growth, ectopic calcification, kidney stone risk, marrow niche disruption.",
      "Monitor: calcium, phosphate, alkaline phosphatase, vitamin D, parathyroid hormone, osteocalcin, CTX/P1NP, renal panels, imaging, and inflammatory markers.",
    ],
    ethics:
      "Skeletal enhancement raises consent, long-term disability, military or occupational coercion, and irreversible body modification concerns. Germline risk and pediatric use would be especially sensitive, and regulation would likely treat any real system as a high-risk advanced therapy.",
    illustration:
      "SVG brief: femur cross-section with osteoblast, osteoclast, WNT, sclerostin, mineral matrix, and biomarker callouts.",
  },
  {
    ...implants[2],
    summary:
      "The Second Heart is a fictional auxiliary circulatory organ that supports survival under stress. Its closest real-world comparisons are cardiac assist devices, vascular grafts, tissue-engineered pumps, and regulation of oxygen delivery.",
    mechanismLore:
      "The Second Heart is presented as a redundant pump that can supplement circulation, preserve blood flow during trauma, and improve endurance. It gives the fictional subject an extra margin of cardiovascular resilience.",
    mechanismAnalogue:
      "A scientific analogue would not be a simple gene edit but a combination of developmental biology, tissue engineering, vascular integration, and autonomic regulation. Relevant pathways include NKX2-5, TBX5, GATA4, MEF2C, and HAND2 in cardiac lineage specification; VEGFA/ANGPT signaling for vascularization; HCN channels and calcium-handling proteins such as RYR2 and SERCA2A for rhythm and contraction; and nitric-oxide pathways for vessel tone. Regulatory control would need cardiac-specific promoters, conduction-system coordination, immune tolerance, and safeguards against arrhythmia. Candidate cell types include cardiomyocytes, endothelial cells, smooth muscle cells, fibroblasts, pacemaker-like cells, and resident immune populations. Feasible science includes ventricular assist devices, organ transplantation, induced pluripotent stem-cell cardiac models, and experimental tissue patches. The fictional leap is a fully integrated biological pump that synchronizes with native circulation without clotting, rejection, rhythm conflict, or developmental risk. Mechanistically, the central processes would be electromechanical coupling, perfusion matching, oxygen transport, pressure sensing, and repair after ischemic stress. This is useful as an educational model for why whole-organ enhancement is vastly more complex than changing one gene.",
    analogues: [
      "Ventricular assist devices and circulatory support",
      "Tissue-engineered cardiac patches",
      "iPSC-derived cardiomyocyte disease models",
      "VEGF-linked vascularization research",
      "Cardiac transplantation and immune suppression lessons",
    ],
    timeline:
      "Animal model: integration or pump-function readouts could appear around 42 days in a controlled experimental model. Human translation: auxiliary biological organ therapy would be speculative and would require many years of device, transplant, and cell-therapy safety work.",
    risks: [
      "Failure modes: arrhythmia, thrombosis, hypertension, immune rejection, ischemia, edema, maladaptive cardiac remodeling.",
      "Monitor: ECG, troponin, BNP/NT-proBNP, D-dimer, coagulation panels, blood pressure, echocardiography, CRP, HLA antibodies, and metabolic panels.",
    ],
    ethics:
      "A circulatory enhancement would create serious dual-use and coercion risks because endurance and trauma tolerance have obvious military implications. Consent, reversibility, transplant allocation fairness, and regulatory classification as a biologic-device combination would need explicit review.",
    illustration:
      "SVG brief: simplified chest circulation diagram showing native heart, auxiliary pump, vascular grafts, rhythm signal, clotting risk, and oxygen-delivery markers.",
  },
  {
    ...implants[3],
    summary:
      "The Hemastamen is a fictional blood-modifying implant associated with improved oxygen transport and altered blood chemistry. In real biology, it maps to hematopoiesis, erythropoietin signaling, hemoglobin regulation, and marrow stem-cell dynamics.",
    mechanismLore:
      "The Hemastamen modifies the blood so the subject can support extreme physiology under stress. It is best understood as a fictional controller for oxygen capacity, recovery, and resilience to blood loss or hostile environments.",
    mechanismAnalogue:
      "A plausible scientific analogue would draw from hematopoietic stem-cell regulation, erythroid differentiation, plasma chemistry, and oxygen-sensing pathways. Candidate genes and systems include EPO/EPOR and JAK2/STAT5 for red-cell production, HIF1A/EPAS1 for hypoxia response, BCL11A and globin regulation for hemoglobin switching, TFRC for iron handling, and hepcidin pathways for systemic iron control. Regulatory elements would need lineage-specific control in marrow progenitors while preserving platelet, immune, and red-cell balance. Delivery analogues include ex vivo hematopoietic stem-cell modification, marrow transplantation, RNA-based modulation, and biologics that affect erythropoiesis, all referenced here only as educational comparisons. Important cell types include hematopoietic stem cells, erythroblasts, megakaryocytes, macrophages in erythroblastic islands, endothelial niches, and splenic immune cells. Feasible science can treat some blood disorders or alter defined pathways, but a safe implant that globally upgrades blood for superhuman performance is fictional. Cellular processes would include lineage commitment, hemoglobin synthesis, iron recycling, oxygen dissociation behavior, inflammatory signaling, and clotting balance. The main educational point is that more oxygen capacity can also mean thicker blood, clot risk, hypertension, and metabolic strain.",
    analogues: [
      "Hematopoietic stem-cell transplantation",
      "EPO signaling and regulated erythropoiesis",
      "HIF pathway adaptation to hypoxia",
      "Hemoglobin regulation in inherited blood disorders",
      "Iron metabolism through hepcidin and ferritin",
    ],
    timeline:
      "Animal model: blood-count shifts may be measurable around 35 days. Human translation: marrow and blood interventions require prolonged monitoring, and durable changes can take months with significant safety constraints.",
    risks: [
      "Failure modes: polycythemia, thrombosis, anemia, marrow failure, iron overload, immune dysregulation, malignancy risk.",
      "Monitor: CBC with differential, hematocrit, reticulocytes, ferritin, transferrin saturation, EPO, D-dimer, CRP, liver panel, kidney panel, and hematologic malignancy surveillance when indicated.",
    ],
    ethics:
      "Blood enhancement intersects with doping, military dual-use, transplant ethics, and consent under pressure. Any real intervention would need strict somatic-only boundaries, long-term cancer surveillance, and oversight as an advanced therapy medicinal product or equivalent.",
    illustration:
      "SVG brief: bone marrow niche with stem cell, erythroblast, red blood cell, oxygen curve, iron cycle, and CBC biomarker labels.",
  },
  {
    ...implants[4],
    summary:
      "Larraman's Organ is a fictional rapid-wound-response implant that accelerates clotting and tissue sealing. Its scientific analogues include hemostasis, platelet activation, fibrin formation, inflammation, and staged tissue repair.",
    mechanismLore:
      "Larraman's Organ releases specialized factors that rapidly seal wounds and stabilize the body after injury. In the fictional setting, it turns traumatic bleeding into a fast, survivable repair problem.",
    mechanismAnalogue:
      "A grounded analogue would combine coagulation biology, platelet function, inflammatory signaling, extracellular matrix deposition, and scar remodeling. Candidate systems include tissue factor and thrombin generation, fibrinogen-to-fibrin conversion, platelet receptors such as GP1BA/ITGA2B/ITGB3, VWF-mediated adhesion, TGFB signaling for fibroblast activation, VEGFA for angiogenesis, and MMP/TIMP balance for matrix remodeling. Regulatory control would need injury-responsive activation rather than constant clot promotion; uncontrolled expression would be dangerous. Delivery analogues in legitimate research include topical biologics, engineered wound dressings, platelet-rich preparations, RNA or protein therapeutics, and cell therapies for chronic wounds. Relevant cell types include platelets, endothelial cells, neutrophils, macrophages, fibroblasts, keratinocytes, and pericytes. Feasible science can improve specific wound-healing contexts, but instant systemic clot-and-repair control remains fictional. Cellular processes would include vasoconstriction, platelet plug formation, coagulation cascade amplification, immune-cell recruitment, epithelial closure, collagen deposition, angiogenesis, and remodeling. The educational tension is clear: faster clotting helps bleeding but raises the risk of thrombosis, fibrosis, poor scar quality, and harmful inflammation.",
    analogues: [
      "Platelet activation and fibrin clot formation",
      "Hemostatic wound dressings",
      "TGF-beta signaling in fibrosis and repair",
      "Macrophage polarization during tissue healing",
      "VEGF-associated angiogenesis in repair models",
    ],
    timeline:
      "Animal model: clotting and early wound-closure effects could be measurable around 21 days. Human translation: wound-healing interventions vary by injury type and would require staged safety studies before broad use.",
    risks: [
      "Failure modes: dangerous clotting, embolism, excessive scarring, chronic inflammation, impaired mobility from fibrosis, delayed infection detection.",
      "Monitor: PT/INR, aPTT, fibrinogen, D-dimer, platelet count, CRP, ESR, wound cultures when needed, liver panel, and imaging for suspected thrombosis.",
    ],
    ethics:
      "Rapid repair systems have clear emergency-care appeal but also dual-use implications for combat endurance and coercive deployment. Consent, off-label enhancement, germline exclusion, and regulatory classification as a biologic or combination wound product would need explicit governance.",
    illustration:
      "SVG brief: skin wound cross-section with platelets, fibrin mesh, immune cells, fibroblasts, angiogenesis, and clot-risk biomarker callouts.",
  },
];

const comparativeRows = [
  ["Biscopea", "IGF-1 signaling, myostatin restraint, satellite-cell repair"],
  ["Osmodula", "Osteoblast remodeling, WNT signaling, mineral homeostasis"],
  ["Second Heart", "Cardiac assist devices, vascular grafting, tissue engineering"],
  ["Hemastamen", "Hematopoiesis, EPO signaling, oxygen transport"],
  ["Larraman's Organ", "Platelet activation, fibrin clotting, wound repair"],
];

export default function GenomicsDossier() {
  return (
    <section
      aria-labelledby="gene-seed-dossier-title"
      className="border-t border-stone-800 px-6 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-4">
          <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Gene-Seed Dossier
          </div>
          <h2
            id="gene-seed-dossier-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Fictional implants mapped to real biological analogues.
          </h2>
          <p className="max-w-4xl rounded-lg border border-amber-800 bg-amber-950/30 p-4 text-sm leading-6 text-amber-100">
            <strong>Disclaimer:</strong> This page blends fictional lore with
            scientific analogues for educational purposes only. It does not
            describe real therapies, medical advice, or implementation guidance.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-stone-400">
            <strong>Lore Source:</strong> Provided Space Marines transcript,
            cited here as the canonical fiction reference for this draft.
          </p>
          <div className="grid gap-3 text-sm text-stone-400 md:grid-cols-2">
            <p>
              <strong className="text-stone-200">og:title:</strong> Gene-Seed
              Dossier | Rigdash Genomics
            </p>
            <p>
              <strong className="text-stone-200">og:description:</strong>{" "}
              Educational mappings between fictional gene-seed implants and
              real biological analogues.
            </p>
          </div>
        </header>

        <div className="overflow-x-auto rounded-lg border border-stone-800">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparative table mapping gene-seed implants to real biological
              analogues
            </caption>
            <thead className="bg-stone-900 text-stone-200">
              <tr>
                <th className="border-b border-stone-800 px-4 py-3">Implant</th>
                <th className="border-b border-stone-800 px-4 py-3">
                  Real Biological Analogues
                </th>
              </tr>
            </thead>
            <tbody>
              {comparativeRows.map(([name, analogue]) => (
                <tr key={name} className="border-b border-stone-900">
                  <td className="px-4 py-3 font-medium text-stone-100">{name}</td>
                  <td className="px-4 py-3 text-stone-400">{analogue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-8">
          {implantContent.map((implant) => (
            <article
              key={implant.id}
              id={implant.id}
              aria-labelledby={`${implant.id}-title`}
              className="rounded-lg border border-stone-800 bg-stone-950 p-6"
            >
              <h3 id={`${implant.id}-title`} className="text-2xl font-semibold">
                {implant.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                <strong>Summary:</strong> {implant.summary}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-500">
                Lore Source: Provided Space Marines transcript
              </p>

              <div className="mt-6 space-y-5 text-sm leading-6 text-stone-300">
                <section aria-labelledby={`${implant.id}-mechanism`}>
                  <h4 id={`${implant.id}-mechanism`} className="font-semibold text-stone-100">
                    Mechanism
                  </h4>
                  <p className="mt-2">
                    <strong>Fictional Lore:</strong> {implant.mechanismLore}
                  </p>
                  <p className="mt-2">
                    <strong>Scientific Analogue:</strong>{" "}
                    {implant.mechanismAnalogue}
                  </p>
                </section>

                <section aria-labelledby={`${implant.id}-analogues`}>
                  <h4 id={`${implant.id}-analogues`} className="font-semibold text-stone-100">
                    Analogues
                  </h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-400">
                    {implant.analogues.map((analogue) => (
                      <li key={analogue}>{analogue}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-stone-100">Timeline</h4>
                  <p className="mt-2 text-stone-400">{implant.timeline}</p>
                </section>

                <section>
                  <h4 className="font-semibold text-stone-100">Risks</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-400">
                    {implant.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-stone-100">Ethics</h4>
                  <p className="mt-2 text-stone-400">{implant.ethics}</p>
                </section>

                <section>
                  <h4 className="font-semibold text-stone-100">Illustration</h4>
                  <p
                    className="mt-2 text-stone-400"
                    aria-label={`${implant.name} diagram brief`}
                  >
                    {implant.illustration}
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-stone-100">SEO</h4>
                  <dl className="mt-2 grid gap-2 text-stone-400">
                    <div>
                      <dt className="inline text-stone-200">Title: </dt>
                      <dd className="inline">{implant.seo.title}</dd>
                    </div>
                    <div>
                      <dt className="inline text-stone-200">Meta description: </dt>
                      <dd className="inline">{implant.seo.meta}</dd>
                    </div>
                    <div>
                      <dt className="inline text-stone-200">Keywords: </dt>
                      <dd className="inline">{implant.seo.keywords.join(", ")}</dd>
                    </div>
                  </dl>
                </section>

                <details className="rounded-lg border border-stone-800 bg-black/20 p-4">
                  <summary className="cursor-pointer text-stone-200">
                    JSON metadata object
                  </summary>
                  <pre className="mt-3 overflow-x-auto text-xs leading-5 text-stone-400">
                    {JSON.stringify(implantMetadata.find((item) => item.id === implant.id), null, 2)}
                  </pre>
                </details>
              </div>
            </article>
          ))}
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-stone-800 bg-black/20 p-6">
            <h3 className="text-xl font-semibold">Educator&apos;s Guide</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              Use each entry to separate fiction, feasible biology, and current
              uncertainty. Ask learners to identify the real cell types,
              biomarkers, and regulatory concerns, then explain why a fictional
              whole-body implant is not equivalent to a validated therapy.
            </p>
          </article>
          <article className="rounded-lg border border-stone-800 bg-black/20 p-6">
            <h3 className="text-xl font-semibold">Ethics &amp; Safety Primer</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">
              Treat this dossier as worldbuilding plus biology literacy. Avoid
              enhancement claims, preserve consent and non-coercion, reject
              germline modification, and classify any real analogue under
              rigorous medical, biosafety, privacy, and dual-use review.
            </p>
          </article>
        </section>

        <section className="rounded-lg border border-stone-800 bg-black/20 p-6">
          <h3 className="text-xl font-semibold">Supabase Content Model Suggestion</h3>
          <pre className="mt-4 overflow-x-auto text-xs leading-5 text-stone-400">
{`table: genomics_implants
columns:
  id text primary key
  name text not null
  category text not null
  keywords text[] not null default '{}'
  fictional_confidence numeric not null check (fictional_confidence >= 0 and fictional_confidence <= 1)
  estimated_time_to_effect_days integer not null
  primary_systems_affected text[] not null default '{}'
  seo jsonb not null
  summary text
  mechanism_lore text
  mechanism_analogue text
  analogues text[]
  timeline text
  risks text[]
  ethics text
  illustration text
  lore_source text
  created_at timestamptz default now()
  updated_at timestamptz default now()`}
          </pre>
        </section>
      </div>
    </section>
  );
}
