import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import RecommendedNextSection from "@/components/firearms/RecommendedNextSection";
import DetailMetaCard from "@/components/firearms/DetailMetaCard";
import RelatedEntryList from "@/components/firearms/RelatedEntryList";
import SectionIntro from "@/components/firearms/SectionIntro";
import StudyModeSection from "@/components/firearms/StudyModeSection";
import WhyItMattersSection from "@/components/firearms/WhyItMattersSection";
import PageHero from "@/components/firearms/PageHero";
import MarkLearnedButton from "@/components/firearms/MarkLearnedButton";
import SelfCheckBlock from "@/components/firearms/SelfCheckBlock";
import StudyModeLink from "@/components/firearms/StudyModeLink";
import { getSimilarCartridges } from "@/lib/firearms/discovery";
import { getRecommendedNextForCartridgePage } from "@/lib/firearms/recommendations";
import {
  getCartridgeSelfCheckPrompts,
  getCartridgeStudyFacts,
  getCartridgeStudySummary,
} from "@/lib/firearms/study";
import { createClient } from "@/lib/supabase/server";
import {
  getCartridgeBySlug,
  getCartridges,
  getStudyProgressForCartridge,
  getWeapons,
} from "@/lib/firearms/queries";

type CartridgePageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    study?: string;
  }>;
};

export default async function CartridgeDetailPage({
  params,
  searchParams,
}: CartridgePageProps) {
  noStore();

  const { slug } = await params;
  const query = await searchParams;
  const studyModeEnabled = query.study === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [cartridgeResult, cartridgesResult, weaponsResult] = await Promise.all([
    getCartridgeBySlug(supabase, slug),
    getCartridges(supabase),
    getWeapons(supabase),
  ]);

  if (cartridgeResult.error || !cartridgeResult.data) {
    notFound();
  }

  const cartridge = cartridgeResult.data;
  const allCartridges = cartridgesResult.data ?? [];
  const allWeapons = weaponsResult.data ?? [];

  const compatibleWeapons = allWeapons.filter((weapon) =>
    weapon.compatibility.some(
      (compatibility) => compatibility.cartridge?.slug === cartridge.slug
    )
  );

  const similarCartridges = getSimilarCartridges(cartridge, allCartridges);
  const recommendedNext = getRecommendedNextForCartridgePage(
    cartridge,
    compatibleWeapons,
    allCartridges,
    allWeapons
  );
  const studyProgressResult = user
    ? await getStudyProgressForCartridge(supabase, user.id, cartridge.id)
    : { data: null, error: null };
  const isLearned = Boolean(studyProgressResult.data?.learned_at);
  const studyFacts = getCartridgeStudyFacts(cartridge, compatibleWeapons.length);
  const studySummary = getCartridgeStudySummary(
    cartridge,
    compatibleWeapons.length
  );
  const selfCheckPrompts = getCartridgeSelfCheckPrompts(cartridge);
  const studyHref = studyModeEnabled
    ? `/tools/firearm-catalog/cartridges/${cartridge.slug}`
    : `/tools/firearm-catalog/cartridges/${cartridge.slug}?study=1`;
  const quickFacts = [
    {
      label: "Manufacturer",
      value: cartridge.manufacturer?.name ?? "Unknown maker",
    },
    {
      label: "Country",
      value: cartridge.country?.name ?? "Unknown country",
    },
    {
      label: "Casing",
      value: cartridge.casing_material ?? "Not listed",
    },
    {
      label: "Linked weapons",
      value: compatibleWeapons.length,
    },
    {
      label: "Named loads",
      value: cartridge.ammo_variants.length,
    },
  ];
  const compatibilityItems = compatibleWeapons.map((weapon) => ({
    id: weapon.id,
    title: weapon.name,
    subtitle: [weapon.weapon_type, weapon.platform, weapon.action_type]
      .filter(Boolean)
      .join(" / "),
    description: weapon.notes,
    href: `/tools/firearm-catalog/weapons/${weapon.slug}`,
  }));
  const similarItems = similarCartridges.map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: `${item.caliber} / ${item.cartridge_type}`,
    href: `/tools/firearm-catalog/cartridges/${item.slug}`,
  }));
  const ammoVariantItems = cartridge.ammo_variants.map((variant) => ({
    id: variant.id,
    title: variant.name,
    subtitle: [
      variant.variant_type,
      variant.relative_penetration
        ? `Pen: ${variant.relative_penetration}`
        : null,
      variant.relative_damage ? `Dmg: ${variant.relative_damage}` : null,
    ]
      .filter(Boolean)
      .join(" / "),
    description: `${variant.source_game}${variant.notes ? ` · ${variant.notes}` : ""}`,
  }));

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <PageHero
            backHref="/tools/firearm-catalog"
            backLabel="Back to firearm catalog"
            eyebrow="Cartridge entry"
            title={cartridge.name}
            subtitle={`${cartridge.caliber} / ${cartridge.cartridge_type}`}
            description="Use this page to understand the round itself, trace its compatibility links, compare nearby cartridges, and switch into study mode when you want a simpler review flow."
            actions={<StudyModeLink href={studyHref} enabled={studyModeEnabled} />}
          />

          <DetailMetaCard
            heading={studyModeEnabled ? "Study summary" : "Quick context"}
            items={quickFacts}
            action={
              studyModeEnabled ? (
              <MarkLearnedButton
                entryType="cartridge"
                cartridgeId={cartridge.id}
                initialLearned={isLearned}
                isLoggedIn={Boolean(user)}
              />
              ) : null
            }
          />
        </section>

        {studyModeEnabled ? (
          <StudyModeSection
            description="Study mode highlights the key facts first, gives a calmer summary, and adds a short self-check without turning the page into a full flashcard system."
            facts={studyFacts}
            summary={studySummary}
          />
        ) : null}

        <WhyItMattersSection
          title={`${cartridge.name} matters because cartridges shape the rest of the discovery journey.`}
          body={
            cartridge.notes ??
            "A cartridge page is often the easiest way for beginners to understand how caliber, type, and platform compatibility fit together."
          }
          points={[
            "It gives a simple starting point for learning names and categories.",
            "It reveals which weapons connect to the round and why those links matter.",
            "It creates an easy path into related rounds for side-by-side comparison.",
          ]}
        />

        <section className="space-y-5">
          <SectionIntro
            eyebrow="Named loads"
            title="Notable ammo variants"
            description="Use these named loads to connect a cartridge family to the specific round names players actually recognize from extraction shooters."
          />

          <RelatedEntryList
            items={ammoVariantItems}
            emptyMessage="No named ammo variants are listed yet for this cartridge."
            buttonLabel="Open entry"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Compatibility"
              title="Follow the compatibility link"
              description="Start here when you want to see how this cartridge shows up in specific platforms and why that relationship matters."
            />

            <RelatedEntryList
              items={compatibilityItems}
              emptyMessage="No compatible weapons are listed yet for this cartridge."
              buttonLabel="View weapon"
            />
          </div>

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Compare next"
              title="Compare a related cartridge"
              description="Use nearby cartridges to build comparison habits and understand families of similar rounds."
            />

            <RelatedEntryList
              items={similarItems}
              emptyMessage="No related cartridges are listed yet for comparison."
              buttonLabel="Compare this cartridge"
            />
          </div>
        </section>

        {studyModeEnabled ? <SelfCheckBlock prompts={selfCheckPrompts} /> : null}

        <RecommendedNextSection
          title="Keep learning from this cartridge"
          items={recommendedNext}
        />
      </div>
    </main>
  );
}
