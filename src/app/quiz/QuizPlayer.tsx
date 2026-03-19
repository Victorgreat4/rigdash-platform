"use client";

import { useMemo, useState } from "react";

type Quiz = {
  id: number;
  title: string;
  description: string | null;
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
};

type QuizPlayerProps = {
  quiz: Quiz;
  questions: Question[];
  choices: Choice[];
};

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch {
    return null;
  }
}

export default function QuizPlayer({
  quiz,
  questions,
  choices,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  );

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const currentChoices = useMemo(() => {
    return choices.filter((choice) => choice.question_id === currentQuestion.id);
  }, [choices, currentQuestion.id]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const selectedChoiceId = selectedAnswers[currentQuestion.id] ?? null;

  const embedUrl = currentQuestion.youtube_url
    ? getYouTubeEmbedUrl(currentQuestion.youtube_url)
    : null;

  function handleSelectChoice(choiceId: number) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choiceId,
    }));
  }

  function goPrevious() {
    if (!isFirstQuestion) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function goNext() {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleSubmit() {
    console.log("Selected answers:", selectedAnswers);
    alert("Submission flow comes next. Answers are currently stored only in UI state.");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-zinc-400 mb-4">
            {quiz.description ?? "No description provided."}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>
              Answered {answeredCount} / {totalQuestions}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {currentQuestion.question_order}. {currentQuestion.question_text}
          </h2>

          <div className="space-y-6">
            {currentQuestion.image_url && (
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">
                <img
                  src={currentQuestion.image_url}
                  alt="Question visual"
                  className="w-full object-cover"
                />
              </div>
            )}

            {currentQuestion.audio_url && (
              <div className="rounded-xl border border-zinc-800 bg-black p-4">
                <p className="mb-3 text-sm text-zinc-400">Audio clip</p>
                <audio controls className="w-full">
                  <source src={currentQuestion.audio_url} />
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}

            {embedUrl && (
              <div className="rounded-xl border border-zinc-800 bg-black p-4">
                <p className="mb-3 text-sm text-zinc-400">Video clip</p>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    src={embedUrl}
                    title="Question video"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {currentQuestion.media_caption && (
              <p className="text-sm text-zinc-400">{currentQuestion.media_caption}</p>
            )}

            <div className="space-y-3">
              {currentChoices.map((choice) => (
                <label
                  key={choice.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                    selectedChoiceId === choice.id
                      ? "border-white bg-zinc-800"
                      : "border-zinc-800 bg-black hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={choice.id}
                    checked={selectedChoiceId === choice.id}
                    onChange={() => handleSelectChoice(choice.id)}
                    className="h-4 w-4"
                  />
                  <span>{choice.choice_text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirstQuestion}
            className="rounded-lg border border-zinc-700 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <div className="text-sm text-zinc-400">
            {selectedChoiceId ? "Answer selected" : "No answer selected yet"}
          </div>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-white px-4 py-3 font-medium text-black"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg bg-white px-4 py-3 font-medium text-black"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </main>
  );
}