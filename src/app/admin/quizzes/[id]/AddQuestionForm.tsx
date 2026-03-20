"use client";

import { useState } from "react";

type AddQuestionFormProps = {
  quizId: number;
  nextQuestionOrder: number;
};

export default function AddQuestionForm({
  quizId,
  nextQuestionOrder,
}: AddQuestionFormProps) {
  const [questionText, setQuestionText] = useState("");
  const [questionOrder, setQuestionOrder] = useState(nextQuestionOrder);

  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [mediaCaption, setMediaCaption] = useState("");

  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [correctChoiceOrder, setCorrectChoiceOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/quizzes/${quizId}/questions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId,
          questionText,
          questionOrder,
          imageUrl,
          audioUrl,
          youtubeUrl,
          mediaCaption,
          choices: [
            { choiceText: choice1, choiceOrder: 1 },
            { choiceText: choice2, choiceOrder: 2 },
            { choiceText: choice3, choiceOrder: 3 },
            { choiceText: choice4, choiceOrder: 4 },
          ],
          correctChoiceOrder,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to add question.");
        return;
      }

      setMessage("Question added successfully.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">Add Question</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Question Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter the question"
            className="min-h-28 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Question Order</label>
          <input
            type="number"
            value={questionOrder}
            onChange={(e) => setQuestionOrder(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            required
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Optional image URL"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Audio URL</label>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="Optional audio URL"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">YouTube URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Optional YouTube URL"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Media Caption</label>
            <input
              type="text"
              value={mediaCaption}
              onChange={(e) => setMediaCaption(e.target.value)}
              placeholder="Optional media caption"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">Choice 1</label>
            <input
              type="text"
              value={choice1}
              onChange={(e) => setChoice1(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Choice 2</label>
            <input
              type="text"
              value={choice2}
              onChange={(e) => setChoice2(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Choice 3</label>
            <input
              type="text"
              value={choice3}
              onChange={(e) => setChoice3(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Choice 4</label>
            <input
              type="text"
              value={choice4}
              onChange={(e) => setChoice4(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm">Correct Choice</label>
          <select
            value={correctChoiceOrder}
            onChange={(e) => setCorrectChoiceOrder(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          >
            <option value={1}>Choice 1</option>
            <option value={2}>Choice 2</option>
            <option value={3}>Choice 3</option>
            <option value={4}>Choice 4</option>
          </select>
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
          {loading ? "Adding..." : "Add Question"}
        </button>
      </form>
    </section>
  );
}