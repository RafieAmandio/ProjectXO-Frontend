import { auth } from "@/app/api/auth/[...nextauth]/route";

export const getSession = async () => {
  return await auth();
};

export const getSessionUser = async () => {
  const session = await getSession();
  return session?.user;
};

export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session?.user;
};
