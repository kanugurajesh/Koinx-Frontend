"use client";

import { ThemeProvider } from "@/context/ThemeContext";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative">
        {children}
      </div>
    </ThemeProvider>
  );
}
