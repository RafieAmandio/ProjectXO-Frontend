"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponseGetAll } from "@/types/response";
import { Tables } from "@/types/supabase";

export async function GET(request: Request) {
  try {
    const { data: questions, count } = await supabase
      .from("questions")
      .select("*", { count: "exact" })
      .eq("active", true)
      .order("display_order", { ascending: true });

    const response: TResponseGetAll<Tables<"questions">> = {
      content: {
        entries: questions || [],
        totalData: count || 0,
        totalPage: 1, 
      },
      message: "Questions retrieved successfully",
      errors: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: TResponseGetAll<Tables<"questions">> = {
      content: {
        entries: [],
        totalData: 0,
        totalPage: 0,
      },
      message: "Failed to retrieve questions",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
