"use server";

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { TResponse } from "@/types/response";
import { Tables } from "@/types/supabase";
import { cookies } from "next/headers";
import { sessionCookieKey } from "@/constants/session";

export async function POST(request: Request) {
  try {
    const { email, password, full_name, instagram_username } = await request.json();

    if (!email || !password || !full_name) {
      const missingFields = [];
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");
      if (!full_name) missingFields.push("full_name");

      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Missing required fields",
        errors: missingFields.map(field => ({
          field,
          message: `${field.replace('_', ' ')} is required`,
        })),
      }, { status: 400 });
    }

    // Register the user with Supabase Auth
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          instagram_username,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Registration failed",
        errors: [
          {
            field: "auth",
            message: signUpError.message,
          },
        ],
      }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Failed to create user",
        errors: [
          {
            field: "auth",
            message: "User creation failed",
          },
        ],
      }, { status: 500 });
    }

    // Create user record in the users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: user.id,
          email,
          full_name,
          instagram_username,
          auth_provider: "email",
          is_premium: false,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (userError) {
      return NextResponse.json<TResponse<null>>({
        content: null,
        message: "Failed to create user profile",
        errors: [
          {
            field: "database",
            message: userError.message,
          },
        ],
      }, { status: 500 });
    }

    // Return success response with message to check email
    return NextResponse.json<TResponse<Tables<"users">>>({
      content: userData,
      message: "Registration successful. Please check your email to verify your account.",
      errors: null,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json<TResponse<null>>({
      content: null,
      message: "Registration failed",
      errors: [
        {
          field: "general",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    }, { status: 500 });
  }
} 