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

    // Register the user with Supabase Auth without email confirmation
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          instagram_username,
          confirmation_sent_at: Date.now(),
        },
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

    if (!authData.user) {
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
          id: authData.user.id,
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

    // Set session cookie and return response
    const response = NextResponse.json<TResponse<Tables<"users">>>({
      content: userData,
      message: "Registration successful",
      errors: null,
    });

    if (authData.session) {
      response.cookies.set(sessionCookieKey, authData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return response;

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