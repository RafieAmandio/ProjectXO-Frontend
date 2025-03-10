import { authVerifyToken } from "@/services/auth";
import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { deleteSession, getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";
import Providers from "./_components/providers";

type TLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: TLayoutProps) {
  const session = await getSession();

  let isLogin: TAuthIsLogin = false;

  if (session?.token) {
    const response = await authVerifyToken(session?.token);

    if (response) {
      isLogin = true;
      redirect("/dashboard");
    } else {
      deleteSession();
    }
  }

  return (
    <Providers auth={{ isLogin, user: session?.user as TAuthUser }}>
      {children}
    </Providers>
  );
}
