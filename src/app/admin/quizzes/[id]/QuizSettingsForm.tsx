"use client";

import { useState } from "react";

type QuizSettingsFormProps = {
  quizId: number;
  initialTitle: string;
  initialDescription: string;
  initialSlug: string;
  initialWeekLabel: string;
  initialFeatured: boolean;
  initialPublished: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function QuizSettingsForm({
  quizId,
  initialTitle,
  initialDescription,
  initialSlug,
  initialWeekLabel,
  initialFeatured,
  initialPublished,
}: QuizSettingsFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [slug, setSlug] = useState(initialSlug);
  const [weekLabel, setWeekLabel] = useState(initialWeekLabel);
  const [featured, setFeatured] = useState(initialFeatured);
  const [isPublished, setIsPublished] = useState(initialPublished);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const finalSlug = slug.trim() || slugify(title);

      const response = await fetch(`/api/admin/quizzes/${quizId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          slug: finalSlug,
          weekLabel,
          featured,
          isPublished,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to save quiz settings.");
        return;
      }

      setSlug(finalSlug);
      setMessage("Quiz settings saved successfully.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteQuiz() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz? This will also delete its questions, choices, submissions, and answers."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/quizzes/${quizId}/delete`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to delete quiz.");
        return;
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">Quiz Settings</h2>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!slug) setSlug(slugify(value));
            }}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-28 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">Week Label</label>
            <input
              type="text"
              value={weekLabel}
              onChange={(e) => setWeekLabel(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured quiz
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Published
          </label>
        </div>

        {error && (
          <div className="rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-300">
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Quiz Settings"}
          </button>

          <button
            type="button"
            onClick={handleDeleteQuiz}
            disabled={deleting}
            className="rounded-lg border border-red-700 px-5 py-3 font-medium text-red-300 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Quiz"}
          </button>
        </div>
      </form>
    </section>
  );
}