"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { queryClient } from "@/lib/queryClient";
import { store } from "@/store";
import { ThemeInitializer } from "@/components/ThemeInitializer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeInitializer />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
