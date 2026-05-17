import ratingsData from "@/data/father-beer-ratings.json";
import BeerRatingsClient from "./BeerRatingsClient";
import type { BeerRating } from "./types";

export default async function BeerRatingsPage() {
  const ratings = ratingsData as BeerRating[];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="space-y-4">
          <span className="inline-flex rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            Private Beer Log
          </span>

          <h1 className="text-5xl font-bold tracking-tight">
            Björn Cederström Ratings
          </h1>

          <p className="max-w-3xl text-lg text-zinc-400">
            Search and explore personal beer ratings, tasting notes, and the
            top scored beers.
          </p>
        </section>

        <BeerRatingsClient ratings={ratings} />
      </div>
    </main>
  );
}
