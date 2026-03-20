"use client";

import { useEffect, useMemo, useState } from "react";

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
    is_correct?: boolean;
};

type ExistingSubmission = {
    id: number;
    score: number;
    created_at: string;
} | null;

type SubmissionAnswer = {
    question_id: number;
    choice_id: number;
};

type QuizPlayerProps = {
    quiz: Quiz;
    questions: Question[];
    choices: Choice[];
    existingSubmission?: ExistingSubmission;
    submissionAnswers?: SubmissionAnswer[];
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
    existingSubmission = null,
    submissionAnswers = [],
}: QuizPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
        {}
    );
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<{
        score: number;
        totalQuestions: number;
    } | null>(null);

    const isReviewMode = !!existingSubmission;

    useEffect(() => {
        if (submissionAnswers.length > 0) {
            const mapped = submissionAnswers.reduce<Record<number, number>>(
                (acc, answer) => {
                    acc[answer.question_id] = answer.choice_id;
                    return acc;
                },
                {}
            );

            setSelectedAnswers(mapped);
            setResult({
                score: existingSubmission?.score ?? 0,
                totalQuestions: questions.length,
            });
        }
    }, [submissionAnswers, existingSubmission, questions.length]);

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex];

    const currentChoices = useMemo(() => {
        return choices.filter((choice) => choice.question_id === currentQuestion.id);
    }, [choices, currentQuestion.id]);

    const answeredCount = Object.keys(selectedAnswers).length;
    const allQuestionsAnswered = answeredCount === totalQuestions;
    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex === totalQuestions - 1;
    const selectedChoiceId = selectedAnswers[currentQuestion.id] ?? null;

    const embedUrl = currentQuestion.youtube_url
        ? getYouTubeEmbedUrl(currentQuestion.youtube_url)
        : null;

    function handleSelectChoice(choiceId: number) {
        if (isReviewMode) return;

        setError("");
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

    async function handleSubmit() {
        setError("");

        if (!allQuestionsAnswered) {
            setError("Please answer all questions before submitting.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quizId: quiz.id,
                    answers: selectedAnswers,
                }),
            });

            const data = await response.json();

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!response.ok) {
                setError(data.error ?? "Failed to submit quiz.");
                return;
            }

            window.location.href = "/quiz?submitted=1";
            return;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setSubmitting(false);
        }
    }

    const showTopResult = isReviewMode && result;

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
                        {isReviewMode && (
                            <span className="rounded-full border border-emerald-700 px-3 py-1 text-emerald-300">
                                Completed
                            </span>
                        )}
                    </div>
                </div>

                {showTopResult && (
                    <div className="mb-6 rounded-xl border border-emerald-800 bg-emerald-950/20 p-6">
                        <p className="text-sm text-zinc-400">Your saved result</p>
                        <p className="mt-2 text-3xl font-bold">
                            {result.score} / {result.totalQuestions}
                        </p>
                        {existingSubmission?.created_at && (
                            <p className="mt-2 text-sm text-zinc-400">
                                Submitted on{" "}
                                {new Date(existingSubmission.created_at).toLocaleString()}
                            </p>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-800 bg-red-950/40 p-4 text-red-300">
                        {error}
                    </div>
                )}

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
                            {currentChoices.map((choice) => {
                                const isSelected = selectedChoiceId === choice.id;
                                const isCorrect = !!choice.is_correct;
                                const isWrongSelected = isReviewMode && isSelected && !isCorrect;

                                let classes =
                                    "border-zinc-800 bg-black hover:border-zinc-600";

                                if (isReviewMode) {
                                    if (isCorrect) {
                                        classes = "border-emerald-600 bg-emerald-950/20";
                                    } else if (isWrongSelected) {
                                        classes = "border-red-600 bg-red-950/20";
                                    } else if (isSelected) {
                                        classes = "border-white bg-zinc-800";
                                    }
                                } else if (isSelected) {
                                    classes = "border-white bg-zinc-800";
                                }

                                return (
                                    <label
                                        key={choice.id}
                                        className={`flex items-center gap-3 rounded-lg border p-4 transition ${classes} ${isReviewMode ? "cursor-default" : "cursor-pointer"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={choice.id}
                                            checked={isSelected}
                                            onChange={() => handleSelectChoice(choice.id)}
                                            disabled={isReviewMode}
                                            className="h-4 w-4"
                                        />
                                        <div className="flex flex-col">
                                            <span>{choice.choice_text}</span>
                                            {isReviewMode && isCorrect && (
                                                <span className="text-sm text-emerald-400">
                                                    Correct answer
                                                </span>
                                            )}
                                            {isReviewMode && isWrongSelected && (
                                                <span className="text-sm text-red-400">
                                                    Your selected answer
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
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
                        {isReviewMode
                            ? "Review mode"
                            : selectedChoiceId
                                ? "Answer selected"
                                : "No answer selected yet"}
                    </div>

                    {isReviewMode ? (
                        isLastQuestion ? (
                            <button
                                type="button"
                                disabled
                                className="rounded-lg bg-zinc-700 px-4 py-3 font-medium text-zinc-300 opacity-70"
                            >
                                Completed
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={goNext}
                                className="rounded-lg bg-white px-4 py-3 font-medium text-black"
                            >
                                Next
                            </button>
                        )
                    ) : isLastQuestion ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting || !allQuestionsAnswered}
                            className="rounded-lg bg-white px-4 py-3 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit"}
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