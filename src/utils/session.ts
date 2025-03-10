"use server";

import { env } from "@/constants/env";
import { sessionCookieKey } from "@/constants/session";
import { TLoginResponse, TVerifyResponse } from "@/services/auth/types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(sessionCookieKey)?.value;

  if (!session) return null;

  return await decrypt(session);
}

export async function setSession(value: TLoginResponse) {
  const token = value.token;
  const refreshToken = value.refreshToken;
  const user = value.user;

  const session = {
    user,
    token,
    refreshToken,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  } as TVerifyResponse;

  const encryptedSession = await encrypt(session);

  const cookieStore = await cookies();

  cookieStore.set(sessionCookieKey, encryptedSession, {
    expires: session.expires,
    httpOnly: true,
  });

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  if (cookieStore.get(sessionCookieKey)) {
    cookieStore.delete(sessionCookieKey);
  }
}

export async function decrypt(input: string): Promise<TVerifyResponse> {
  const secretKey = env.AUTH_SECRET_KEY;
  const key = new TextEncoder().encode(secretKey);

  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload as TVerifyResponse;
}

export async function encrypt(payload: TVerifyResponse) {
  const secretKey = env.AUTH_SECRET_KEY;
  const key = new TextEncoder().encode(secretKey);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()

    .setExpirationTime(payload.expires)
    .sign(key);
}
