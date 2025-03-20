"use client";

import { authLogin } from "@/services/auth";
import { TLoginRequest, TVerifyResponse } from "@/services/auth/types";
import { setSession } from "@/utils/session";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";

export default function Container() {
  const form = useForm<TLoginRequest>();

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const authLoginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      setSession(data.content as TVerifyResponse);

      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (value: TLoginRequest) => {
    authLoginMutation.mutate({
      email: value.email,
      password: value.password,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google";
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="h-screen w-full bg-[url('/app/login/login-bg.png')] bg-contain bg-center">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8">
              <h2 className="font-glancyr mb-2 text-4xl font-normal text-black">
                Be The Best
              </h2>
              <p className="text-base font-normal text-black/75">
                Enter your email address and password to find matches.
              </p>
            </div>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...form.register("email")}
                  className="rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    id="password"
                    {...form.register("password")}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                  />
                  <div className="absolute right-4 top-3">
                    <button onClick={() => setIsPasswordShow(!isPasswordShow)}>
                      {isPasswordShow ? (
                        <Icon
                          icon="mdi:eye-off"
                          className="h-6 w-6 text-black/25"
                        />
                      ) : (
                        <Icon
                          icon="mdi:eye"
                          className="h-6 w-6 text-black/25"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-[#FF8E5E] px-4 py-3"
                disabled={authLoginMutation.isPending}
              >
                <p className="text-base font-medium text-white">Sign In</p>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F2F2F2] px-4 py-3"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                <Icon icon="devicon:google" className="h-4 w-4 text-black" />
                <p className="text-base font-medium text-[#1F1F1F]">
                  {isGoogleLoading ? "Loading..." : "Sign In with Google"}
                </p>
              </button>
              <div className="mt-2 flex items-center justify-center gap-2">
                <p className="text-base font-normal text-black/75">
                  Lupa Password?
                </p>
                <Link
                  href="/register"
                  className="text-base font-medium text-[#1543CE]"
                >
                  Klik Disini
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
