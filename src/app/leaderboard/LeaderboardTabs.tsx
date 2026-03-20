"use client";

import { useMemo, useState } from "react";

type Quiz = {
  id: number;
  title: string;
  description: string | null;
  week_label: string | null;
  featured: boolean;
  published_at: string | null;
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

type LeaderboardTabsProps = {
  quizzes: Quiz[];
  featuredQuizId: number | null;
  overallRows: OverallRow[];
  perQuizRowsByQuizId: Record<number, PerQuizRow[]>;
};

export default function LeaderboardTabs({
  quizzes,
  featuredQuizId,
  overallRows,
  perQuizRowsByQuizId,
}: LeaderboardTabsProps) {
  const [mode, setMode] = useState<"overall" | "quiz">("overall");
  const [selectedQuizId, setSelectedQuizId] = useState<number | "">(
    featuredQuizId ?? ""
  );

  const selectedQuiz = useMemo(() => {
    return quizzes.find((quiz) => quiz.id === selectedQuizId) ?? null;
  }, [quizzes, selectedQuizId]);

  const selectedQuizRows =
    typeof selectedQuizId === "number"
      ? perQuizRowsByQuizId[selectedQuizId] ?? []
      : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setMode("overall")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "overall"
              ? "bg-white text-black"
              : "border border-zinc-700 text-white"
          }`}
        >
          Overall
        </button>

        <button
          type="button"
          onClick={() => setMode("quiz")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "quiz"
              ? "bg-white text-black"
              : "border border-zinc-700 text-white"
          }`}
        >
          Per Quiz
        </button>
      </div>

      {mode === "overall" ? (
        <section className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold">Overall Standings</h2>
            <p className="mt-2 text-zinc-400">
              Total score across all completed quizzes.
            </p>
          </div>

          {overallRows.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              No submissions yet.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="grid grid-cols-[80px_1fr_140px_160px] gap-4 border-b border-zinc-800 px-6 py-4 text-sm font-medium text-zinc-400">
                <div>Rank</div>
                <div>Player</div>
                <div>Total Score</div>
                <div>Quizzes Completed</div>
              </div>

              {overallRows.map((row, index) => (
                <div
                  key={row.user_id}
                  className="grid grid-cols-[80px_1fr_140px_160px] gap-4 border-b border-zinc-900 px-6 py-4 last:border-b-0"
                >
                  <div className="font-semibold text-white">#{index + 1}</div>

                  <div className="flex items-center gap-3">
                    {row.avatar_url ? (
                      <img
                        src={row.avatar_url}
                        alt="User avatar"
                        className="h-10 w-10 rounded-full border border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm text-zinc-400">
                        {row.username.slice(0, 1).toUpperCase()}
                      </div>
                    )}

                    <div className="font-medium text-white">{row.username}</div>
                  </div>

                  <div className="font-semibold text-white">{row.total_score}</div>
                  <div className="text-zinc-400">{row.quizzes_completed}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm text-zinc-400">
                Select Quiz
              </label>
              <select
                value={selectedQuizId}
                onChange={(e) =>
                  setSelectedQuizId(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              >
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.week_label ? `${quiz.week_label} — ` : ""}
                    {quiz.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedQuiz && (
              <>
                <h2 className="text-2xl font-bold">{selectedQuiz.title}</h2>
                <p className="mt-2 text-zinc-400">
                  {selectedQuiz.description ?? "No description provided."}
                </p>
              </>
            )}
          </div>

          {!selectedQuiz ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              No quiz selected.
            </div>
          ) : selectedQuizRows.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              No submissions yet for this quiz.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              <div className="grid grid-cols-[80px_1fr_120px_180px] gap-4 border-b border-zinc-800 px-6 py-4 text-sm font-medium text-zinc-400">
                <div>Rank</div>
                <div>Player</div>
                <div>Score</div>
                <div>Submitted</div>
              </div>

              {selectedQuizRows.map((row, index) => (
                <div
                  key={`${row.user_id}-${row.submitted_at}`}
                  className="grid grid-cols-[80px_1fr_120px_180px] gap-4 border-b border-zinc-900 px-6 py-4 last:border-b-0"
                >
                  <div className="font-semibold text-white">#{index + 1}</div>

                  <div className="flex items-center gap-3">
                    {row.avatar_url ? (
                      <img
                        src={row.avatar_url}
                        alt="User avatar"
                        className="h-10 w-10 rounded-full border border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm text-zinc-400">
                        {row.username.slice(0, 1).toUpperCase()}
                      </div>
                    )}

                    <div className="font-medium text-white">{row.username}</div>
                  </div>

                  <div className="font-semibold text-white">{row.score}</div>
                  <div className="text-zinc-400">
                    {new Date(row.submitted_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}