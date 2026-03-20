import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type UpdateQuizPayload = {
  title: string;
  description?: string;
  slug: string;
  weekLabel?: string;
  featured?: boolean;
  isPublished?: boolean;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const quizId = Number(id);

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

    const body = (await request.json()) as UpdateQuizPayload;

    const title = body.title?.trim();
    const description = body.description?.trim() || null;
    const slug = body.slug?.trim();
    const weekLabel = body.weekLabel?.trim() || null;
    const featured = !!body.featured;
    const isPublished = !!body.isPublished;

    if (!quizId || typeof quizId !== "number") {
      return NextResponse.json({ error: "Invalid quiz ID." }, { status: 400 });
    }

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
        .eq("featured", true)
        .neq("id", quizId);

      if (resetFeaturedError) {
        return NextResponse.json(
          { error: resetFeaturedError.message },
          { status: 500 }
        );
      }
    }

    const { error: updateError } = await supabase
      .from("quizzes")
      .update({
        title,
        description,
        slug,
        week_label: weekLabel,
        featured,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .eq("id", quizId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
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