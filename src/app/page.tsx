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
        <h1 className="text-5xl font-bold mb-4">RigDash Platform</h1>
        <p className="text-zinc-400 text-lg mb-10">
          Tools, weekly quizzes, leaderboard, and later articles.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            href="/quiz"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-600 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Quiz</h2>
            <p className="text-zinc-400">
              Play the current weekly quiz and view older ones later.
            </p>
          </Link>

          <Link
            href="/leaderboard"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-600 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
            <p className="text-zinc-400">
              Track scores and see who is leading.
            </p>
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-600 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <p className="text-zinc-400">
              Sign in to submit quiz answers and save your results.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
