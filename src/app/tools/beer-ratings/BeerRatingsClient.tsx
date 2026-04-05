"use client";

import { useMemo, useState } from "react";
import type { BeerRating } from "./types";

type BeerRatingsClientProps = {
  ratings: BeerRating[];
};

const ALL_RATINGS_PAGE_SIZE = 25;
const SEARCH_RESULTS_LIMIT = 25;

function formatTastedAt(value: string | null) {
  if (!value) {
    return "Unknown date";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildSearchBlob(rating: BeerRating) {
  return [
    rating.beerName,
    rating.brewery,
    rating.style,
    rating.country,
    rating.region,
    rating.city,
    rating.notes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function BeerCard({ beer }: { beer: BeerRating }) {
  return (
    <article
      key={`${beer.sourceId}-${beer.beerName}-${beer.tastedAt ?? "nodate"}`}
      className="rounded-lg border border-zinc-800 bg-black p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{beer.beerName}</h3>
          <p className="text-sm text-zinc-400">{beer.brewery}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">{formatTastedAt(beer.tastedAt)}</p>
          <p className="text-lg font-semibold text-amber-300">{beer.rating ?? "-"} / 5</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        {beer.style ? (
          <span className="rounded-full border border-zinc-700 px-2 py-1">{beer.style}</span>
        ) : null}
        {beer.country ? (
          <span className="rounded-full border border-zinc-700 px-2 py-1">
            {[beer.country, beer.region, beer.city].filter(Boolean).join(", ")}
          </span>
        ) : null}
        {beer.overall != null ? (
          <span className="rounded-full border border-zinc-700 px-2 py-1">Overall: {beer.overall}</span>
        ) : null}
      </div>

      {beer.notes ? <p className="mt-3 text-sm leading-6 text-zinc-300">{beer.notes}</p> : null}
    </article>
  );
}

export default function BeerRatingsClient({ ratings }: BeerRatingsClientProps) {
  const [query, setQuery] = useState("");
  const [allVisibleCount, setAllVisibleCount] = useState(ALL_RATINGS_PAGE_SIZE);

  const normalizedQuery = query.trim().toLowerCase();

  const byNewest = useMemo(() => {
    return [...ratings].sort((a, b) => {
      const aDate = a.tastedAt ? Date.parse(a.tastedAt) : 0;
      const bDate = b.tastedAt ? Date.parse(b.tastedAt) : 0;

      if (bDate !== aDate) {
        return bDate - aDate;
      }

      return b.sourceId - a.sourceId;
    });
  }, [ratings]);

  const topRated = useMemo(() => {
    return [...ratings]
      .filter((rating) => typeof rating.rating === "number")
      .sort((a, b) => {
        if ((b.rating ?? 0) !== (a.rating ?? 0)) {
          return (b.rating ?? 0) - (a.rating ?? 0);
        }

        return (b.overall ?? 0) - (a.overall ?? 0);
      })
      .slice(0, 15);
  }, [ratings]);

  const searchMatches = useMemo(() => {
    if (!normalizedQuery) {
      return [] as BeerRating[];
    }

    return byNewest.filter((rating) =>
      buildSearchBlob(rating).includes(normalizedQuery)
    );
  }, [byNewest, normalizedQuery]);

  const visibleAllRatings = byNewest.slice(0, allVisibleCount);
  const visibleSearchMatches = searchMatches.slice(0, SEARCH_RESULTS_LIMIT);

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-2 text-2xl font-semibold">Search Ratings</h2>
        <p className="mb-4 text-zinc-400">
          Search by beer, brewery, style, location, or tasting notes.
        </p>

        <input
          id="beer-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: stout, Belgium, Mikkeller..."
          className="mb-6 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-500"
        />

        {!normalizedQuery ? (
          <p className="text-sm text-zinc-500">
            Start typing to see matching ratings right here.
          </p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Search Results</h3>
              <p className="text-sm text-zinc-400">
                Showing {visibleSearchMatches.length} of {searchMatches.length}
              </p>
            </div>

            {visibleSearchMatches.length === 0 ? (
              <p className="text-sm text-zinc-500">No ratings found for your search.</p>
            ) : (
              <div className="space-y-3">
                {visibleSearchMatches.map((beer) => (
                  <BeerCard
                    key={`${beer.sourceId}-${beer.beerName}-${beer.tastedAt ?? "nodate"}`}
                    beer={beer}
                  />
                ))}
              </div>
            )}

            {searchMatches.length > SEARCH_RESULTS_LIMIT ? (
              <p className="mt-4 text-xs text-zinc-500">
                Showing the first {SEARCH_RESULTS_LIMIT} matches. Narrow your search for more precise results.
              </p>
            ) : null}
          </>
        )}
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-3 text-2xl font-semibold">Top 15 Rated Beers</h2>
        <p className="mb-6 text-zinc-400">
          Highest personal scores from the full ratings history.
        </p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {topRated.map((beer) => (
            <article
              key={`${beer.sourceId}-${beer.beerName}`}
              className="rounded-lg border border-zinc-800 bg-black p-4"
            >
              <p className="text-sm text-amber-300">Score: {beer.rating ?? "-"}</p>
              <h3 className="mt-1 text-lg font-semibold">{beer.beerName}</h3>
              <p className="text-sm text-zinc-400">{beer.brewery}</p>
              {beer.style ? <p className="mt-2 text-xs text-zinc-500">{beer.style}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">All Ratings</h2>
          <p className="text-sm text-zinc-400">
            Showing {visibleAllRatings.length} of {byNewest.length}
          </p>
        </div>

        <div className="space-y-3">
          {visibleAllRatings.map((beer) => (
            <BeerCard
              key={`${beer.sourceId}-${beer.beerName}-${beer.tastedAt ?? "nodate"}`}
              beer={beer}
            />
          ))}
        </div>

        {allVisibleCount < byNewest.length ? (
          <button
            type="button"
            onClick={() =>
              setAllVisibleCount((count) => count + ALL_RATINGS_PAGE_SIZE)
            }
            className="mt-6 rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500"
          >
            Load More
          </button>
        ) : null}
      </section>
    </div>
  );
}
