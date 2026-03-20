import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type CreateQuizPayload = {
  title: string;
  description?: string;
  weekLabel?: string;
  slug: string;
  featured?: boolean;
  isPublished?: boolean;
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

    const body = (await request.json()) as CreateQuizPayload;

    const title = body.title?.trim();
    const description = body.description?.trim() || null;
    const weekLabel = body.weekLabel?.trim() || null;
    const slug = body.slug?.trim();
    const featured = !!body.featured;
    const isPublished = !!body.isPublished;

    if (!title) {
      return NextResponse.json(
        { error: "Quiz title is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Quiz slug is required." },
        { status: 400 }
      );
    }

    if (featured) {
      const { error: resetFeaturedError } = await supabase
        .from("quizzes")
        .update({ featured: false })
        .eq("featured", true);

      if (resetFeaturedError) {
        return NextResponse.json(
          { error: resetFeaturedError.message },
          { status: 500 }
        );
      }
    }

    const { data: insertedQuiz, error: insertError } = await supabase
      .from("quizzes")
      .insert({
        title,
        description,
        slug,
        featured,
        week_label: weekLabel,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (insertError || !insertedQuiz) {
      return NextResponse.json(
        { error: insertError?.message ?? "Failed to create quiz." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      quizId: insertedQuiz.id,
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