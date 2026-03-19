import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type SubmitPayload = {
  quizId: number;
  answers: Record<number, number>;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to submit a quiz." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as SubmitPayload;
    const quizId = body?.quizId;
    const answers = body?.answers ?? {};

    if (!quizId || typeof quizId !== "number") {
      return NextResponse.json(
        { error: "Invalid quiz ID." },
        { status: 400 }
      );
    }

    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("id")
      .eq("quiz_id", quizId);

    if (questionsError) {
      return NextResponse.json(
        { error: questionsError.message },
        { status: 500 }
      );
    }

    const questionIds = (questions ?? []).map((q) => q.id);

    if (questionIds.length === 0) {
      return NextResponse.json(
        { error: "No questions found for this quiz." },
        { status: 400 }
      );
    }

    const submittedQuestionIds = Object.keys(answers).map(Number);

    const allAnswered =
      questionIds.length === submittedQuestionIds.length &&
      questionIds.every((id) => submittedQuestionIds.includes(id));

    if (!allAnswered) {
      return NextResponse.json(
        { error: "Please answer all questions before submitting." },
        { status: 400 }
      );
    }

    const { data: existingSubmission, error: existingSubmissionError } =
      await supabase
        .from("submissions")
        .select("id")
        .eq("quiz_id", quizId)
        .eq("user_id", user.id)
        .maybeSingle();

    if (existingSubmissionError) {
      return NextResponse.json(
        { error: existingSubmissionError.message },
        { status: 500 }
      );
    }

    if (existingSubmission) {
      return NextResponse.json(
        { error: "You have already completed this quiz." },
        { status: 400 }
      );
    }

    const { data: choices, error: choicesError } = await supabase
      .from("choices")
      .select("id, question_id, is_correct")
      .in("question_id", questionIds);

    if (choicesError) {
      return NextResponse.json(
        { error: choicesError.message },
        { status: 500 }
      );
    }

    const correctChoiceByQuestion = new Map<number, number>();

    for (const choice of choices ?? []) {
      if (choice.is_correct) {
        correctChoiceByQuestion.set(choice.question_id, choice.id);
      }
    }

    let score = 0;

    for (const questionId of questionIds) {
      const selectedChoiceId = answers[questionId];
      const correctChoiceId = correctChoiceByQuestion.get(questionId);

      if (
        selectedChoiceId &&
        correctChoiceId &&
        selectedChoiceId === correctChoiceId
      ) {
        score += 1;
      }
    }

    const { data: insertedSubmission, error: insertSubmissionError } =
      await supabase
        .from("submissions")
        .insert({
          quiz_id: quizId,
          user_id: user.id,
          score,
        })
        .select("id")
        .single();

    if (insertSubmissionError || !insertedSubmission) {
      return NextResponse.json(
        {
          error:
            insertSubmissionError?.message ?? "Failed to create submission.",
        },
        { status: 500 }
      );
    }

    const submissionId = insertedSubmission.id;

    const submissionAnswers = questionIds.map((questionId) => ({
      submission_id: submissionId,
      question_id: questionId,
      choice_id: answers[questionId],
    }));

    const { error: insertAnswersError } = await supabase
      .from("submission_answers")
      .insert(submissionAnswers);

    if (insertAnswersError) {
      return NextResponse.json(
        { error: insertAnswersError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      score,
      totalQuestions: questionIds.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}