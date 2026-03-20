"use client";

import { useState } from "react";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateQuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weekLabel, setWeekLabel] = useState("");
  const [slug, setSlug] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const finalSlug = slug.trim() || slugify(title);

      const response = await fetch("/api/admin/quizzes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          weekLabel,
          slug: finalSlug,
          featured,
          isPublished,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to create quiz.");
        return;
      }

      setMessage("Quiz created successfully.");
      window.location.href = `/admin/quizzes/${data.quizId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">Create New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!slug) {
                setSlug(slugify(value));
              }
            }}
            placeholder="Weekly Quiz #2"
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description for the quiz"
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
              placeholder="Week 2"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="weekly-quiz-2"
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
            Publish immediately
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

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-white px-5 py-3 font-medium text-black disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </section>
  );
}