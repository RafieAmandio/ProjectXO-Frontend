"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponse } from "@/types/response";
import { Tables } from "@/types/supabase";
import { cookies } from "next/headers";
import { sessionCookieKey } from "@/constants/session";

export async function GET(request: Request) {
  try {
    // Get session token from cookie
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Unauthorized",
        errors: [
          {
            field: "auth",
            message: "Authentication token is required",
          },
        ],
      }, { status: 401 });
    }

    // Get session from token
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(token);

    if (sessionError || !user) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Invalid or expired token",
        errors: [
          {
            field: "auth",
            message: sessionError?.message || "Session not found",
          },
        ],
      }, { status: 401 });
    }

    // Get user profile data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Failed to fetch user profile",
        errors: [
          {
            field: "database",
            message: userError?.message || "User profile not found",
          },
        ],
      }, { status: 404 });
    }

    return NextResponse.json<TResponse<Tables<"users">>>({
      content: userData,
      message: "Profile retrieved successfully",
      errors: null,
    });

  } catch (error) {
    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Failed to fetch profile",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 