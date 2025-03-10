"use server";

import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { sessionCookieKey } from "@/constants/session";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(sessionCookieKey);

  return NextResponse.json({ message: "Session deleted" });
}
