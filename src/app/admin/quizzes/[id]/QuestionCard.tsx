"use client";

import { useState } from "react";
import DeleteQuestionButton from "./DeleteQuestionButton";
import EditQuestionForm from "./EditQuestionForm";

type Choice = {
  id: number;
  question_id: number;
  choice_text: string;
  is_correct: boolean;
  choice_order: number;
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

type QuestionCardProps = {
  question: Question;
  questionChoices: Choice[];
};

export default function QuestionCard({
  question,
  questionChoices,
}: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
            Question {question.question_order}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-white"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <DeleteQuestionButton questionId={question.id} />
        </div>
      </div>

      <h3 className="text-xl font-semibold">{question.question_text}</h3>

      {(question.image_url ||
        question.audio_url ||
        question.youtube_url ||
        question.media_caption) && (
        <div className="mt-4 space-y-2 text-sm text-zinc-400">
          {question.image_url && <p>Image: {question.image_url}</p>}
          {question.audio_url && <p>Audio: {question.audio_url}</p>}
          {question.youtube_url && <p>YouTube: {question.youtube_url}</p>}
          {question.media_caption && <p>Caption: {question.media_caption}</p>}
        </div>
      )}

      <div className="mt-5 space-y-2">
        {questionChoices.map((choice) => (
          <div
            key={choice.id}
            className={`rounded-lg border p-3 ${
              choice.is_correct
                ? "border-emerald-700 bg-emerald-950/20"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>
                {choice.choice_order}. {choice.choice_text}
              </span>
              {choice.is_correct && (
                <span className="text-sm text-emerald-400">Correct</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <EditQuestionForm
          questionId={question.id}
          initialQuestionText={question.question_text}
          initialQuestionOrder={question.question_order}
          initialImageUrl={question.image_url ?? ""}
          initialAudioUrl={question.audio_url ?? ""}
          initialYoutubeUrl={question.youtube_url ?? ""}
          initialMediaCaption={question.media_caption ?? ""}
          initialChoices={questionChoices}
        />
      )}
    </div>
  );
}