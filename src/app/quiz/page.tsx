export default function QuizPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Quiz Hub</h1>
        <p className="text-zinc-400 mb-8">
          This is where the weekly quiz will live.
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-2">Current Weekly Quiz</h2>
          <p className="text-zinc-400">
            No real quiz data yet. Next step is connecting this page to Supabase
            quiz tables.
          </p>
        </div>
      </div>
    </main>
  );
}