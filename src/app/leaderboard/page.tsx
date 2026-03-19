export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-zinc-400 mb-8">
          This page will show quiz rankings and score history.
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-400">
            No leaderboard data yet. This will be connected after submissions
            and scoring are set up.
          </p>
        </div>
      </div>
    </main>
  );
}