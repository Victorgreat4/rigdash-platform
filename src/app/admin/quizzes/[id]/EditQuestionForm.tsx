"use client";

import { useState } from "react";

type Choice = {
  id: number;
  question_id: number;
  choice_text: string;
  is_correct: boolean;
  choice_order: number;
};

type EditQuestionFormProps = {
  questionId: number;
  initialQuestionText: string;
  initialQuestionOrder: number;
  initialImageUrl: string;
  initialAudioUrl: string;
  initialYoutubeUrl: string;
  initialMediaCaption: string;
  initialChoices: Choice[];
};

export default function EditQuestionForm({
  questionId,
  initialQuestionText,
  initialQuestionOrder,
  initialImageUrl,
  initialAudioUrl,
  initialYoutubeUrl,
  initialMediaCaption,
  initialChoices,
}: EditQuestionFormProps) {
  const sortedChoices = [...initialChoices].sort(
    (a, b) => a.choice_order - b.choice_order
  );

  const [questionText, setQuestionText] = useState(initialQuestionText);
  const [questionOrder, setQuestionOrder] = useState(initialQuestionOrder);

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [audioUrl, setAudioUrl] = useState(initialAudioUrl);
  const [youtubeUrl, setYoutubeUrl] = useState(initialYoutubeUrl);
  const [mediaCaption, setMediaCaption] = useState(initialMediaCaption);

  const [choice1, setChoice1] = useState(sortedChoices[0]?.choice_text ?? "");
  const [choice2, setChoice2] = useState(sortedChoices[1]?.choice_text ?? "");
  const [choice3, setChoice3] = useState(sortedChoices[2]?.choice_text ?? "");
  const [choice4, setChoice4] = useState(sortedChoices[3]?.choice_text ?? "");

  const initialCorrectChoice =
    sortedChoices.find((choice) => choice.is_correct)?.choice_order ?? 1;

  const [correctChoiceOrder, setCorrectChoiceOrder] = useState(
    initialCorrectChoice
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/questions/${questionId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText,
          questionOrder,
          imageUrl,
          audioUrl,
          youtubeUrl,
          mediaCaption,
          choices: [
            {
              id: sortedChoices[0]?.id,
              choiceText: choice1,
              choiceOrder: 1,
            },
            {
              id: sortedChoices[1]?.id,
              choiceText: choice2,
              choiceOrder: 2,
            },
            {
              id: sortedChoices[2]?.id,
              choiceText: choice3,
              choiceOrder: 3,
            },
            {
              id: sortedChoices[3]?.id,
              choiceText: choice4,
              choiceOrder: 4,
            },
          ],
          correctChoiceOrder,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to update question.");
        return;
      }

      setMessage("Question updated successfully.");
      const cleanUrl = window.location.pathname;
window.location.href = cleanUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-5 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <h4 className="text-lg font-semibold">Edit Question</h4>

      <div>
        <label className="mb-2 block text-sm">Question Text</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="min-h-24 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
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
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Audio URL</label>
          <input
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">YouTube URL</label>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Media Caption</label>
          <input
            type="text"
            value={mediaCaption}
            onChange={(e) => setMediaCaption(e.target.value)}
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
        {loading ? "Saving..." : "Save Question Changes"}
      </button>
    </form>
  );
}