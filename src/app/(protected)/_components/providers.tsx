"use client";

import { AuthProvider, TAuthIsLogin, TAuthUser } from "@/stores/auth";

import React from "react";

type TProvidersProps = {
  children: React.ReactNode;
  auth: {
    isLogin: TAuthIsLogin;
    user: TAuthUser;
  };
};

export default function Providers({ children, auth }: TProvidersProps) {
  return (
    <AuthProvider isLogin={auth?.isLogin} user={auth?.user}>
      {children}
    </AuthProvider>
  );
}
