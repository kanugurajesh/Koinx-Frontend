"use client";

import { ThemeProvider } from "@/context/ThemeContext";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative w-[100vw] overflow-hidden">
        {children}
      </div>
    </ThemeProvider>
  );
}
