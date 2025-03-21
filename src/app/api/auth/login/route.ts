import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponse } from "@/types/response";
import { Tables } from "@/types/supabase";
import { cookies } from "next/headers";
import { sessionCookieKey } from "@/constants/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Email and password are required",
        errors: [
          {
            field: !email ? "email" : "password",
            message: `${!email ? "Email" : "Password"} is required`,
          },
        ],
      }, { status: 400 });
    }

    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Authentication failed",
        errors: [
          {
            field: "auth",
            message: error.message,
          },
        ],
      }, { status: 401 });
    }

    if (!session) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "No session created",
        errors: [
          {
            field: "session",
            message: "Failed to create session",
          },
        ],
      }, { status: 500 });
    }

    // Get user data
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    // Set session cookie
    const response = NextResponse.json<TResponse<Tables<"users">>>({
      content: userData,
      message: "Login successful",
      errors: null,
    });

    response.cookies.set(sessionCookieKey, session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;

  } catch (error) {
    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Login failed",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 