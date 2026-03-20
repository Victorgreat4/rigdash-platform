import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ChoiceInput = {
  choiceText: string;
  choiceOrder: number;
};

type CreateQuestionPayload = {
  quizId: number;
  questionText: string;
  questionOrder: number;
  imageUrl?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  mediaCaption?: string;
  choices: ChoiceInput[];
  correctChoiceOrder: number;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const body = (await request.json()) as CreateQuestionPayload;

    const quizId = body.quizId;
    const questionText = body.questionText?.trim();
    const questionOrder = body.questionOrder;
    const imageUrl = body.imageUrl?.trim() || null;
    const audioUrl = body.audioUrl?.trim() || null;
    const youtubeUrl = body.youtubeUrl?.trim() || null;
    const mediaCaption = body.mediaCaption?.trim() || null;
    const choices = body.choices ?? [];
    const correctChoiceOrder = body.correctChoiceOrder;

    if (!quizId || typeof quizId !== "number") {
      return NextResponse.json({ error: "Invalid quiz ID." }, { status: 400 });
    }

    if (!questionText) {
      return NextResponse.json(
        { error: "Question text is required." },
        { status: 400 }
      );
    }

    if (!questionOrder || typeof questionOrder !== "number") {
      return NextResponse.json(
        { error: "Question order is required." },
        { status: 400 }
      );
    }

    if (choices.length !== 4) {
      return NextResponse.json(
        { error: "Exactly 4 choices are required." },
        { status: 400 }
      );
    }

    const cleanedChoices = choices.map((choice) => ({
      choiceText: choice.choiceText?.trim(),
      choiceOrder: choice.choiceOrder,
    }));

    if (cleanedChoices.some((choice) => !choice.choiceText)) {
      return NextResponse.json(
        { error: "All choices must have text." },
        { status: 400 }
      );
    }

    const { data: insertedQuestion, error: questionError } = await supabase
      .from("questions")
      .insert({
        quiz_id: quizId,
        question_text: questionText,
        question_order: questionOrder,
        image_url: imageUrl,
        audio_url: audioUrl,
        youtube_url: youtubeUrl,
        media_caption: mediaCaption,
      })
      .select("id")
      .single();

    if (questionError || !insertedQuestion) {
      return NextResponse.json(
        { error: questionError?.message ?? "Failed to create question." },
        { status: 500 }
      );
    }

    const questionId = insertedQuestion.id;

    const choicesToInsert = cleanedChoices.map((choice) => ({
      question_id: questionId,
      choice_text: choice.choiceText,
      choice_order: choice.choiceOrder,
      is_correct: choice.choiceOrder === correctChoiceOrder,
    }));

    const { error: choicesError } = await supabase
      .from("choices")
      .insert(choicesToInsert);

    if (choicesError) {
      return NextResponse.json(
        { error: choicesError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      questionId,
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