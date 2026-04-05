export type BeerRating = {
  sourceId: number;
  beerName: string;
  brewery: string;
  aroma: number | null;
  appearance: number | null;
  taste: number | null;
  palate: number | null;
  overall: number | null;
  rating: number | null;
  notes: string;
  tastedAt: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  style: string | null;
};
