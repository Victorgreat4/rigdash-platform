"use client";

import { useState } from "react";

type DeleteQuestionButtonProps = {
  questionId: number;
};

export default function DeleteQuestionButton({
  questionId,
}: DeleteQuestionButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this question and all its choices?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/questions/${questionId}/delete`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.error ?? "Failed to delete question.");
        return;
      }

      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-red-700 px-3 py-2 text-sm text-red-300 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Question"}
    </button>
  );
}