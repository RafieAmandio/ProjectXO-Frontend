"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponse } from "@/types/response";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Email is required",
        errors: [
          {
            field: "email",
            message: "Email is required",
          },
        ],
      }, { status: 400 });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Failed to send reset password email",
        errors: [
          {
            field: "auth",
            message: error.message,
          },
        ],
      }, { status: 400 });
    }

    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Password reset email sent successfully",
      errors: null,
    });

  } catch (error) {
    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Failed to process password reset request",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 