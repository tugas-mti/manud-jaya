import { Toaster } from "sonner";
import Navigation from "./components/navigation";
import { getServerSession } from "next-auth";
import SessionProvider from "@/providers/SessionProvider";

import "@/app/ui/global.css";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "manud-jaya.tech",
    siteName: "Desa Wisata Manud Jaya",
    images: [
      {
        url: "https://manud-jaya.tech/images/background1.webp",
        width: 1200,
        height: 630,
        alt: "Desa Wisata Manud Jaya",
      },
    ],
  },
  title: "Welcome to Desa Wisata Manud Jaya",
  keywords: "Desa Wisata Manud Jaya, Manud Jaya, Desa Wisata, Manud Jaya",
  description:
    "Manud Jaya: The Hidden Paradise That Offers Breathtaking Natural  Beauty and a Tranquil Atmosphere",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="id">
      <body className={`${jakartaSans.className}  antialiased`}>
        <SessionProvider session={session}>
          <Toaster position="top-center" richColors />
          <Navigation />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
