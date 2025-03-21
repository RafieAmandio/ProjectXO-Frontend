"use client";

import { authRegister } from "@/services/auth";
import { TRegisterRequest, TVerifyResponse } from "@/services/auth/types";
import { setSession } from "@/utils/session";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Container() {
  const form = useForm<TRegisterRequest>();

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] =
    useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const authRegisterMutation = useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      setSession(data.content as TVerifyResponse);

      toast.success(data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (value: TRegisterRequest) => {
    authRegisterMutation.mutate({
      email: value.email,
      password: value.password,
      name: value.name,
      confirmPassword: value.confirmPassword,
      instagram: value.instagram,
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
        <div className="w-full max-w-4xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-8">
              <h2 className="font-glancyr mb-2 text-center text-4xl font-normal text-black">
                Tolong Lengkapi Data Formulir ini
              </h2>
              <p className="text-center text-base font-normal text-black/75">
                Please take a few minutes to fill in your profile so we can
                customize the opportunities for you.
              </p>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    {...form.register("name")}
                    className="rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...form.register("email")}
                    className="rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      {...form.register("password")}
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                    />
                    <div className="absolute right-4 top-3">
                      <button
                        onClick={() => setIsPasswordShow(!isPasswordShow)}
                      >
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
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={isConfirmPasswordShow ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      {...form.register("confirmPassword")}
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                    />
                    <div className="absolute right-4 top-3">
                      <button
                        onClick={() =>
                          setIsConfirmPasswordShow(!isConfirmPasswordShow)
                        }
                      >
                        {isConfirmPasswordShow ? (
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
              <div className="col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="instagram" className="font-medium">
                    Instagram Username (Optional)
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    placeholder="Enter your instagram username"
                    {...form.register("instagram")}
                    className="rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:outline-[#FF8E5E]"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#FF8E5E] px-4 py-3"
                  disabled={authRegisterMutation.isPending}
                >
                  <p className="text-base font-medium text-white">Sign Up</p>
                </button>
              </div>
              <div className="col-span-2 md:col-span-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F2F2F2] px-4 py-3"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  <Icon icon="devicon:google" className="h-4 w-4 text-black" />
                  <p className="text-base font-medium text-[#1F1F1F]">
                    {isGoogleLoading ? "Loading..." : "Sign Up with Google"}
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
