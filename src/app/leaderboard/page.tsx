import { createClient } from "@/lib/supabase/server";
import LeaderboardTabs from "./LeaderboardTabs";

type Quiz = {
  id: number;
  title: string;
  description: string | null;
  week_label: string | null;
  featured: boolean;
  published_at: string | null;
};

type SubmissionRow = {
  id: number;
  user_id: string;
  quiz_id: number;
  score: number;
  created_at: string;
};

type Profile = {
  id: string;
  username: string;
  avatar_path: string | null;
};

type OverallRow = {
  user_id: string;
  username: string;
  avatar_url: string;
  total_score: number;
  quizzes_completed: number;
};

type PerQuizRow = {
  user_id: string;
  username: string;
  avatar_url: string;
  score: number;
  submitted_at: string;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: quizzesData, error: quizzesError } = await supabase
    .from("quizzes")
    .select("id, title, description, week_label, featured, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (quizzesError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Leaderboard load error: {quizzesError.message}
        </div>
      </main>
    );
  }

  const quizzes: Quiz[] = quizzesData ?? [];
  const featuredQuiz = quizzes.find((quiz) => quiz.featured) ?? quizzes[0];

  const { data: allSubmissionsData, error: submissionsError } = await supabase
    .from("submissions")
    .select("id, user_id, quiz_id, score, created_at");

  if (submissionsError) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Submission load error: {submissionsError.message}
        </div>
      </main>
    );
  }

  const allSubmissions: SubmissionRow[] = allSubmissionsData ?? [];
  const userIds = [...new Set(allSubmissions.map((row) => row.user_id))];

  let profileMap = new Map<string, Profile>();

  if (userIds.length > 0) {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username, avatar_path")
      .in("id", userIds);

    if (profilesError) {
      return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
          <div className="mx-auto max-w-5xl rounded-xl border border-red-800 bg-red-950/40 p-6 text-red-300">
            Profile load error: {profilesError.message}
          </div>
        </main>
      );
    }

    profileMap = new Map((profilesData ?? []).map((profile) => [profile.id, profile]));
  }

  function getAvatarUrl(avatarPath: string | null) {
    if (!avatarPath) return "";

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(avatarPath);

    return publicUrl;
  }

  const overallMap = new Map<
    string,
    {
      user_id: string;
      total_score: number;
      quizzes_completed: number;
    }
  >();

  for (const submission of allSubmissions) {
    const existing = overallMap.get(submission.user_id);

    if (existing) {
      existing.total_score += submission.score;
      existing.quizzes_completed += 1;
    } else {
      overallMap.set(submission.user_id, {
        user_id: submission.user_id,
        total_score: submission.score,
        quizzes_completed: 1,
      });
    }
  }

  const overallRows: OverallRow[] = Array.from(overallMap.values())
    .map((row) => {
      const profile = profileMap.get(row.user_id);

      return {
        user_id: row.user_id,
        username: profile?.username ?? "Unknown User",
        avatar_url: getAvatarUrl(profile?.avatar_path ?? null),
        total_score: row.total_score,
        quizzes_completed: row.quizzes_completed,
      };
    })
    .sort((a, b) => {
      if (b.total_score !== a.total_score) return b.total_score - a.total_score;
      if (b.quizzes_completed !== a.quizzes_completed) {
        return b.quizzes_completed - a.quizzes_completed;
      }
      return a.username.localeCompare(b.username);
    });

  const perQuizRowsByQuizId: Record<number, PerQuizRow[]> = {};

  for (const quiz of quizzes) {
    const submissionsForQuiz = allSubmissions
      .filter((submission) => submission.quiz_id === quiz.id)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

    perQuizRowsByQuizId[quiz.id] = submissionsForQuiz.map((submission) => {
      const profile = profileMap.get(submission.user_id);

      return {
        user_id: submission.user_id,
        username: profile?.username ?? "Unknown User",
        avatar_url: getAvatarUrl(profile?.avatar_path ?? null),
        score: submission.score,
        submitted_at: submission.created_at,
      };
    });
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold">Leaderboard</h1>
          <p className="text-zinc-400">
            Compare total performance across all quizzes or drill into a specific weekly quiz.
          </p>
        </div>

        <LeaderboardTabs
          quizzes={quizzes}
          featuredQuizId={featuredQuiz?.id ?? null}
          overallRows={overallRows}
          perQuizRowsByQuizId={perQuizRowsByQuizId}
        />
      </div>
    </main>
  );
}