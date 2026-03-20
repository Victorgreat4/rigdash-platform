import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddQuestionForm from "./AddQuestionForm";
import QuizSettingsForm from "./QuizSettingsForm";
import QuestionCard from "./QuestionCard";

type AdminQuizPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Quiz = {
  id: number;
  title: string;
  description: string | null;
  slug: string | null;
  week_label: string | null;
  featured: boolean;
  is_published: boolean;
};

type Question = {
  id: number;
  quiz_id: number;
  question_text: string;
  question_order: number;
  image_url: string | null;
  audio_url: string | null;
  youtube_url: string | null;
  media_caption: string | null;
};

type Choice = {
  id: number;
  question_id: number;
  choice_text: string;
  is_correct: boolean;
  choice_order: number;
};

export default async function AdminQuizEditorPage({
  params,
}: AdminQuizPageProps) {
  const { id } = await params;
  const quizId = Number(id);

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    redirect("/");
  }

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, title, description, slug, week_label, featured, is_published")
    .eq("id", quizId)
    .maybeSingle<Quiz>();

  if (quizError || !quiz) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Quiz editor load error.
        </div>
      </main>
    );
  }

  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .select(
      "id, quiz_id, question_text, question_order, image_url, audio_url, youtube_url, media_caption"
    )
    .eq("quiz_id", quiz.id)
    .order("question_order", { ascending: true });

  if (questionsError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Question load error: {questionsError.message}
        </div>
      </main>
    );
  }

  const questions: Question[] = questionsData ?? [];
  const questionIds = questions.map((q) => q.id);

  const { data: choicesData, error: choicesError } = await supabase
    .from("choices")
    .select("id, question_id, choice_text, is_correct, choice_order")
    .in("question_id", questionIds.length > 0 ? questionIds : [-1])
    .order("choice_order", { ascending: true });

  if (choicesError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Choice load error: {choicesError.message}
        </div>
      </main>
    );
  }

  const choices: Choice[] = choicesData ?? [];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="mb-3 text-4xl font-bold">Edit Quiz</h1>
          <p className="text-zinc-400">
            Build questions and answer choices for this quiz.
          </p>
        </div>

        <QuizSettingsForm
          quizId={quiz.id}
          initialTitle={quiz.title}
          initialDescription={quiz.description ?? ""}
          initialSlug={quiz.slug ?? ""}
          initialWeekLabel={quiz.week_label ?? ""}
          initialFeatured={quiz.featured}
          initialPublished={quiz.is_published}
        />

        <AddQuestionForm
          quizId={quiz.id}
          nextQuestionOrder={questions.length + 1}
        />

        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-6 text-2xl font-bold">Existing Questions</h2>

          {questions.length === 0 ? (
            <p className="text-zinc-400">No questions added yet.</p>
          ) : (
            <div className="space-y-6">
              {questions.map((question) => {
                const questionChoices = choices.filter(
                  (choice) => choice.question_id === question.id
                );

                return (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    questionChoices={questionChoices}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}