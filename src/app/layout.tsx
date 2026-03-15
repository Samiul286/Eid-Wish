import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EidWish - Create Beautiful Personalized Eid Greetings 🌙",
  description: "Send heartfelt Eid wishes to your loved ones with stunning animations and beautiful themes. Create and share personalized Eid Mubarak greetings with 5 unique themes.",
  keywords: ["Eid Mubarak", "Eid greetings", "Eid wishes", "Islamic greetings", "Eid cards", "Personalized greetings", "Eid al-Fitr", "Ramadan"],
  authors: [{ name: "EidWish Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico.png", type: "image/png", sizes: "1024x1024" },
    ],
  },
  openGraph: {
    title: "EidWish - Create Beautiful Personalized Eid Greetings 🌙",
    description: "Send heartfelt Eid wishes to your loved ones with stunning animations and beautiful themes.",
    url: "https://eidwish.app",
    siteName: "EidWish",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EidWish - Create Beautiful Personalized Eid Greetings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EidWish - Create Beautiful Personalized Eid Greetings 🌙",
    description: "Send heartfelt Eid wishes to your loved ones with stunning animations and beautiful themes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${amiri.variable} antialiased bg-[#030712]`}>
        {/* Background stars - fixed */}
        <div className="fixed inset-0 stars-bg opacity-20 pointer-events-none" />
        
        {/* Main content */}
        {children}
        
        {/* Toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}
