"use client";

import React, { useState } from "react";

import { ConfigProvider, TConfig } from "@/stores/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";
import { Toaster } from "sonner";
import { ReactLenis } from "lenis/react";
import { SessionProvider } from "next-auth/react";

type TProvidersProps = {
  children: React.ReactNode;
  config: TConfig;
};

export default function Providers({ children, config }: TProvidersProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ReactLenis root={true}>
          <ConfigProvider config={config}>
            <AppProgressBar
              height="4px"
              color={"#000000"}
              options={{ showSpinner: false }}
              shallowRouting
            />
            <Toaster position="top-center" richColors />
            {children}
          </ConfigProvider>
        </ReactLenis>
      </SessionProvider>
    </QueryClientProvider>
  );
}
