"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Navigation from "./components/navigation";

import "@/app/ui/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Toaster />
          <Navigation />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
