import Link from "next/link";
import { supabase } from "../../lib/supabase";

type QuizListItem = {
  id: number;
  title: string;
  description: string | null;
  slug: string | null;
  featured: boolean;
  week_label: string | null;
  published_at: string | null;
};

export default async function QuizHubPage() {
  const { data, error } = await supabase
    .from("quizzes")
    .select(
      "id, title, description, slug, featured, week_label, published_at"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Quiz hub load error: {error.message}
        </div>
      </main>
    );
  }

  const quizzes: QuizListItem[] = data ?? [];
  const featuredQuiz = quizzes.find((quiz) => quiz.featured);
  const archiveQuizzes = quizzes.filter((quiz) => !quiz.featured);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Quiz Hub</h1>
        <p className="text-zinc-400 mb-10">
          Play the current weekly quiz and browse previous weeks.
        </p>

        {featuredQuiz ? (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Current Weekly Quiz</h2>

            <Link
              href={`/quiz/${featuredQuiz.slug}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                {featuredQuiz.week_label && (
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
                    {featuredQuiz.week_label}
                  </span>
                )}
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
                  Featured
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-2">{featuredQuiz.title}</h3>
              <p className="text-zinc-400">
                {featuredQuiz.description ?? "No description provided."}
              </p>
            </Link>
          </section>
        ) : (
          <section className="mb-12 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-zinc-400">No featured quiz found.</p>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quiz Archive</h2>

          {archiveQuizzes.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              No previous quizzes yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {archiveQuizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.slug}`}
                  className="block rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    {quiz.week_label && (
                      <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
                        {quiz.week_label}
                      </span>
                    )}
                    {quiz.published_at && (
                      <span className="text-sm text-zinc-500">
                        {new Date(quiz.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-zinc-400">
                    {quiz.description ?? "No description provided."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}