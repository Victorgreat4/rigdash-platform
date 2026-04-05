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
import { getSimilarWeapons } from "@/lib/firearms/discovery";
import { getRecommendedNextForWeaponPage } from "@/lib/firearms/recommendations";
import {
  getWeaponSelfCheckPrompts,
  getWeaponStudyFacts,
  getWeaponStudySummary,
} from "@/lib/firearms/study";
import { createClient } from "@/lib/supabase/server";
import {
  getCartridges,
  getStudyProgressForWeapon,
  getWeaponBySlug,
  getWeapons,
} from "@/lib/firearms/queries";

type WeaponPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    study?: string;
  }>;
};

function formatBarrelLength(length: number | null) {
  if (length === null) {
    return "Barrel length not listed";
  }

  return `${length} mm barrel`;
}

export default async function WeaponDetailPage({
  params,
  searchParams,
}: WeaponPageProps) {
  noStore();

  const { slug } = await params;
  const query = await searchParams;
  const studyModeEnabled = query.study === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [weaponResult, weaponsResult, cartridgesResult] = await Promise.all([
    getWeaponBySlug(supabase, slug),
    getWeapons(supabase),
    getCartridges(supabase),
  ]);

  if (weaponResult.error || !weaponResult.data) {
    notFound();
  }

  const weapon = weaponResult.data;
  const allWeapons = weaponsResult.data ?? [];
  const allCartridges = cartridgesResult.data ?? [];
  const similarWeapons = getSimilarWeapons(weapon, allWeapons);
  const recommendedNext = getRecommendedNextForWeaponPage(
    weapon,
    allWeapons,
    allCartridges
  );
  const studyProgressResult = user
    ? await getStudyProgressForWeapon(supabase, user.id, weapon.id)
    : { data: null, error: null };
  const isLearned = Boolean(studyProgressResult.data?.learned_at);
  const studyFacts = getWeaponStudyFacts(weapon);
  const studySummary = getWeaponStudySummary(weapon);
  const selfCheckPrompts = getWeaponSelfCheckPrompts(weapon);
  const studyHref = studyModeEnabled
    ? `/tools/firearm-catalog/weapons/${weapon.slug}`
    : `/tools/firearm-catalog/weapons/${weapon.slug}?study=1`;
  const quickFacts = [
    {
      label: "Manufacturer",
      value: weapon.manufacturer?.name ?? "Unknown maker",
    },
    {
      label: "Country",
      value: weapon.country?.name ?? "Unknown country",
    },
    {
      label: "Platform",
      value: weapon.platform ?? "General platform",
    },
    {
      label: "Barrel",
      value: formatBarrelLength(weapon.barrel_length_mm),
    },
    {
      label: "Linked cartridges",
      value: weapon.compatibility.length,
    },
  ];
  const compatibilityItems = weapon.compatibility.map((link) => ({
    id: link.id,
    title: link.cartridge?.name ?? "Unknown cartridge",
    subtitle: link.cartridge
      ? `${link.cartridge.caliber} / ${link.cartridge.cartridge_type}`
      : "Compatibility link",
    description: link.notes,
    href: link.cartridge
      ? `/tools/firearm-catalog/cartridges/${link.cartridge.slug}`
      : undefined,
  }));
  const similarItems = similarWeapons.map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: [item.weapon_type, item.platform, item.action_type]
      .filter(Boolean)
      .join(" / "),
    href: `/tools/firearm-catalog/weapons/${item.slug}`,
  }));

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <PageHero
            backHref="/tools/firearm-catalog"
            backLabel="Back to firearm catalog"
            eyebrow="Weapon entry"
            title={weapon.name}
            subtitle={[weapon.weapon_type, weapon.platform, weapon.action_type]
              .filter(Boolean)
              .join(" / ")}
            description="Use this page to connect a platform to its ammunition relationships, compare similar entries, and switch into study mode when you want a simpler review pass."
            actions={<StudyModeLink href={studyHref} enabled={studyModeEnabled} />}
          />

          <DetailMetaCard
            heading={studyModeEnabled ? "Study summary" : "Quick context"}
            items={quickFacts}
            action={
              studyModeEnabled ? (
              <MarkLearnedButton
                entryType="weapon"
                weaponId={weapon.id}
                initialLearned={isLearned}
                isLoggedIn={Boolean(user)}
              />
              ) : null
            }
          />
        </section>

        {studyModeEnabled ? (
          <StudyModeSection
            description="Study mode surfaces the key facts first, simplifies the page flow, and adds a short self-check block."
            facts={studyFacts}
            summary={studySummary}
          />
        ) : null}

        <WhyItMattersSection
          title={`${weapon.name} matters because it turns abstract specs into platform decisions.`}
          body={
            weapon.notes ??
            "Use this page to connect a recognizable weapon platform with the cartridge relationships and role-based comparisons around it."
          }
          points={[
            "It shows how a platform and action type affect what users should compare next.",
            "It gives a concrete path from one weapon into compatible cartridges and similar entries.",
            "It helps beginners move from names they recognize into broader understanding.",
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Compatibility"
              title="Follow the compatibility link"
              description="Start here when you want to understand the ammunition side of this weapon and why the relationship matters."
            />

            <RelatedEntryList
              items={compatibilityItems}
              emptyMessage="No compatibility links are listed yet for this weapon."
              buttonLabel="View cartridge"
            />
          </div>

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Compare next"
              title="Compare a related weapon"
              description="Use nearby platforms to compare type, lineage, and role instead of starting a new search from scratch."
            />

            <RelatedEntryList
              items={similarItems}
              emptyMessage="No related weapons are listed yet for comparison."
              buttonLabel="Compare this weapon"
            />
          </div>
        </section>

        {studyModeEnabled ? <SelfCheckBlock prompts={selfCheckPrompts} /> : null}

        <RecommendedNextSection
          title="Keep learning from this weapon"
          items={recommendedNext}
        />
      </div>
    </main>
  );
}
