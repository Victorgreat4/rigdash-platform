export type GenomicsSeo = {
  title: string;
  meta: string;
  keywords: string[];
};

export type GenomicsImplant = {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  fictional_confidence: number;
  estimated_time_to_effect_days: number;
  primary_systems_affected: string[];
  seo: GenomicsSeo;
};

