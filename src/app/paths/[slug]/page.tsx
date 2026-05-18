import { redirect } from "next/navigation";

type PathDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    step?: string;
  }>;
};

export default async function PathDetailPage({
  params,
  searchParams,
}: PathDetailPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const stepQuery = query.step ? `?step=${query.step}` : "";

  redirect(`/tools/firearm-catalog/learning/${slug}${stepQuery}`);
}
