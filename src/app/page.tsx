import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canAccessBeerRatings } from "@/lib/beerRatingsAccess";

export default async function Home() {
  noStore();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canSeeBeerRatings = user
    ? canAccessBeerRatings(user.id, user.email)
    : false;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-5xl font-bold">RigDash Platform</h1>
        <p className="mb-10 max-w-3xl text-lg text-zinc-400">
          Mobile-first firearm and ammunition reference tools, private beer
          ratings, and room to grow into richer catalog workflows later.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/tools/firearm-catalog"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
          >
            <h2 className="mb-2 text-2xl font-semibold">Firearm Catalog</h2>
            <p className="text-zinc-400">
              Browse manufacturers, cartridges, and weapon compatibility links
              from Supabase-backed data.
            </p>
          </Link>

          {canSeeBeerRatings ? (
            <Link
              href="/tools/beer-ratings"
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
            >
              <h2 className="mb-2 text-2xl font-semibold">Beer Ratings</h2>
              <p className="text-zinc-400">
                Private ratings dashboard for Bjorn Cederstrom.
              </p>
            </Link>
          ) : null}

          <Link
            href="/tools"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
          >
            <h2 className="mb-2 text-2xl font-semibold">Tools</h2>
            <p className="text-zinc-400">
              Desktop apps, utilities, downloads, and release pages.
            </p>
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-600 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <p className="text-zinc-400">
              Sign in to manage your profile and access private tools.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
