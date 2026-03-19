import { createClient } from "@/lib/supabase/server";
import QuizPlayer from "../QuizPlayer";

type Quiz = {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  week_label?: string | null;
};

type Question = {
  id: number;
  quiz_id: number;
  question_text: string;
  question_order: number;
  image_url?: string | null;
  audio_url?: string | null;
  youtube_url?: string | null;
  media_caption?: string | null;
};

type Choice = {
  id: number;
  question_id: number;
  choice_text: string;
  choice_order: number;
  is_correct?: boolean;
};

type SubmissionAnswer = {
  question_id: number;
  choice_id: number;
};

type ExistingSubmission = {
  id: number;
  score: number;
  created_at: string;
} | null;

type QuizPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function QuizBySlugPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("id, title, description, slug, week_label")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle<Quiz>();

  if (quizError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Quiz load error: {quizError.message}
        </div>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
          Quiz not found.
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
        <div className="mx-auto max-w-3xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Questions load error: {questionsError.message}
        </div>
      </main>
    );
  }

  const questions = questionsData ?? [];
  const questionIds = questions.map((question) => question.id);

  const { data: choicesData, error: choicesError } = await supabase
    .from("choices")
    .select("id, question_id, choice_text, choice_order, is_correct")
    .in("question_id", questionIds.length > 0 ? questionIds : [-1])
    .order("choice_order", { ascending: true });

  if (choicesError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Choices load error: {choicesError.message}
        </div>
      </main>
    );
  }

  const choices = choicesData ?? [];

  let existingSubmission: ExistingSubmission = null;
  let submissionAnswers: SubmissionAnswer[] = [];

  if (user) {
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select("id, score, created_at")
      .eq("quiz_id", quiz.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (submissionError) {
      return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
            Submission load error: {submissionError.message}
          </div>
        </main>
      );
    }

    existingSubmission = submission;

    if (submission) {
      const { data: answers, error: answersError } = await supabase
        .from("submission_answers")
        .select("question_id, choice_id")
        .eq("submission_id", submission.id);

      if (answersError) {
        return (
          <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-3xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
              Submission answers load error: {answersError.message}
            </div>
          </main>
        );
      }

      submissionAnswers = answers ?? [];
    }
  }

  return (
    <QuizPlayer
      quiz={quiz}
      questions={questions}
      choices={choices}
      existingSubmission={existingSubmission}
      submissionAnswers={submissionAnswers}
    />
  );
}