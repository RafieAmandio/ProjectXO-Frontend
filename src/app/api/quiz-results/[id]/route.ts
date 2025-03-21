"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponse } from "@/types/response";
import { Tables } from "@/types/supabase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Quiz result ID is required",
        errors: [
          {
            field: "id",
            message: "Quiz result ID is required",
          },
        ],
      }, { status: 400 });
    }

    // Get quiz result with responses
    const { data: quizResult, error: quizError } = await supabase
      .from("quiz_results")
      .select(`
        *,
        quiz_responses (
          *,
          questions (*)
        )
      `)
      .eq("id", id)
      .single();

    if (quizError || !quizResult) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Quiz result not found",
        errors: [
          {
            field: "database",
            message: quizError?.message || "Quiz result not found",
          },
        ],
      }, { status: 404 });
    }

    return NextResponse.json<TResponse<Tables<"quiz_results">>>({
      content: quizResult,
      message: "Quiz result retrieved successfully",
      errors: null,
    });

  } catch (error) {
    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Failed to fetch quiz result",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 