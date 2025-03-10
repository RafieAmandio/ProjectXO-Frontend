import { z } from "zod";

export const schemaLoginRequest = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type TLoginRequest = z.infer<typeof schemaLoginRequest>;

export const schemaLoginResponse = z.object({
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    status: z.string(),
  }),
  token: z.string(),
  refreshToken: z.string(),
});

export type TLoginResponse = z.infer<typeof schemaLoginResponse>;

export const schemaVerifyResponse = z.object({
  user: schemaLoginResponse.shape.user,
  token: z.string(),
  refreshToken: z.string(),
  expires: z.date(),
});

export type TVerifyResponse = z.infer<typeof schemaVerifyResponse>;
