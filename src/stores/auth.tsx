"use client";

import * as React from "react";

import { create } from "zustand";

export type TAuthIsLogin = boolean;

export type TAuthUser = {
  id: string;
  fullName: string;
  email: string;
  status: string;
};

interface ICreateStoreParams {
  isLogin: TAuthIsLogin;
  user: TAuthUser | null;
}

type ICreateStore = ICreateStoreParams & {
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: TAuthUser) => void;
};

function createStore({ isLogin, user }: ICreateStoreParams) {
  return create<ICreateStore>()((set) => ({
    isLogin,
    setIsLogin: (isLogin) => set({ isLogin }),
    user,
    setUser: (user) => set({ user }),
  }));
}

const AuthContext = React.createContext<ReturnType<typeof createStore> | null>(
  null,
);

export function useAuth() {
  if (!AuthContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return React.useContext(AuthContext)!;
}

type IAuthProviderProps = ICreateStoreParams & {
  children: React.ReactNode;
};

export function AuthProvider({ isLogin, user, children }: IAuthProviderProps) {
  const [store] = React.useState(() => createStore({ isLogin, user }));

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
