import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ChoiceInput = {
  id: number;
  choiceText: string;
  choiceOrder: number;
};

type UpdateQuestionPayload = {
  questionText: string;
  questionOrder: number;
  imageUrl?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  mediaCaption?: string;
  choices: ChoiceInput[];
  correctChoiceOrder: number;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const questionId = Number(id);

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

    if (!questionId || Number.isNaN(questionId)) {
      return NextResponse.json(
        { error: "Invalid question ID." },
        { status: 400 }
      );
    }

    const body = (await request.json()) as UpdateQuestionPayload;

    const questionText = body.questionText?.trim();
    const questionOrder = body.questionOrder;
    const imageUrl = body.imageUrl?.trim() || null;
    const audioUrl = body.audioUrl?.trim() || null;
    const youtubeUrl = body.youtubeUrl?.trim() || null;
    const mediaCaption = body.mediaCaption?.trim() || null;
    const choices = body.choices ?? [];
    const correctChoiceOrder = body.correctChoiceOrder;

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
      id: choice.id,
      choiceText: choice.choiceText?.trim(),
      choiceOrder: choice.choiceOrder,
    }));

    if (
      cleanedChoices.some(
        (choice) =>
          !choice.id ||
          Number.isNaN(choice.id) ||
          !choice.choiceText ||
          !choice.choiceOrder
      )
    ) {
      return NextResponse.json(
        { error: "All choices must have valid IDs, text, and order." },
        { status: 400 }
      );
    }

    const { error: questionUpdateError } = await supabase
      .from("questions")
      .update({
        question_text: questionText,
        question_order: questionOrder,
        image_url: imageUrl,
        audio_url: audioUrl,
        youtube_url: youtubeUrl,
        media_caption: mediaCaption,
      })
      .eq("id", questionId);

    if (questionUpdateError) {
      return NextResponse.json(
        { error: questionUpdateError.message },
        { status: 500 }
      );
    }

    for (const choice of cleanedChoices) {
      const { error: choiceUpdateError } = await supabase
        .from("choices")
        .update({
          choice_text: choice.choiceText,
          choice_order: choice.choiceOrder,
          is_correct: choice.choiceOrder === correctChoiceOrder,
        })
        .eq("id", choice.id)
        .eq("question_id", questionId);

      if (choiceUpdateError) {
        return NextResponse.json(
          { error: choiceUpdateError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
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