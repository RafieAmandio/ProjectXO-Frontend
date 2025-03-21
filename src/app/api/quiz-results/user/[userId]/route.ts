"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponseGetAll } from "@/types/response";
import { Tables } from "@/types/supabase";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json<TResponseGetAll<Tables<"quiz_results">>>({
        content: {
          entries: [],
          totalData: 0,
          totalPage: 0,
        },
        message: "User ID is required",
        errors: [
          {
            field: "userId",
            message: "User ID is required",
          },
        ],
      }, { status: 400 });
    }

    // Get quiz results with pagination
    const { data: quizResults, error: quizError, count } = await supabase
      .from("quiz_results")
      .select(`
        *,
        quiz_responses (
          *,
          questions (*)
        )
      `, { count: 'exact' })
      .eq("user_id", userId)
      .order('quiz_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (quizError) {
      return NextResponse.json<TResponseGetAll<Tables<"quiz_results">>>({
        content: {
          entries: [],
          totalData: 0,
          totalPage: 0,
        },
        message: "Failed to fetch quiz results",
        errors: [
          {
            field: "database",
            message: quizError.message,
          },
        ],
      }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json<TResponseGetAll<Tables<"quiz_results">>>({
      content: {
        entries: quizResults || [],
        totalData: count || 0,
        totalPage: totalPages,
      },
      message: "Quiz results retrieved successfully",
      errors: null,
    });

  } catch (error) {
    return NextResponse.json<TResponseGetAll<Tables<"quiz_results">>>({
      content: {
        entries: [],
        totalData: 0,
        totalPage: 0,
      },
      message: "Failed to fetch quiz results",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 