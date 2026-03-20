import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CreateQuizForm from "./CreateQuizForm";

type Quiz = {
  id: number;
  title: string;
  slug: string | null;
  week_label: string | null;
  featured: boolean;
  is_published: boolean;
  published_at: string | null;
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile?.is_admin) {
    redirect("/");
  }

  const { data: quizzesData, error: quizzesError } = await supabase
    .from("quizzes")
    .select("id, title, slug, week_label, featured, is_published, published_at")
    .order("published_at", { ascending: false });

  if (quizzesError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Admin load error: {quizzesError.message}
        </div>
      </main>
    );
  }

  const quizzes: Quiz[] = quizzesData ?? [];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <h1 className="mb-3 text-4xl font-bold">Admin</h1>
          <p className="text-zinc-400">
            Create quizzes and manage weekly publishing.
          </p>
        </div>

        <CreateQuizForm />

        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-6 text-2xl font-bold">Existing Quizzes</h2>

          {quizzes.length === 0 ? (
            <p className="text-zinc-400">No quizzes created yet.</p>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-black p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {quiz.week_label && (
                        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                          {quiz.week_label}
                        </span>
                      )}

                      {quiz.featured && (
                        <span className="rounded-full border border-emerald-700 px-3 py-1 text-xs text-emerald-300">
                          Featured
                        </span>
                      )}

                      {quiz.is_published ? (
                        <span className="rounded-full border border-blue-700 px-3 py-1 text-xs text-blue-300">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold">{quiz.title}</h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      Slug: {quiz.slug ?? "No slug"}
                    </p>
                  </div>

                  <Link
                    href={`/admin/quizzes/${quiz.id}`}
                    className="rounded-lg bg-white px-4 py-3 text-center font-medium text-black"
                  >
                    Edit Quiz
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}