import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abeokuta Angels Network — Organized Belief, With a Cheque Book",
  description:
    "Abeokuta's first angel investment network. We back pre-seed and early-stage startups in Abeokuta, Ogun State, and beyond.",
  keywords: ["angel investment", "Abeokuta", "Ogun State", "Nigeria startup funding"],
  openGraph: {
    title: "Abeokuta Angels Network",
    description: "Organized belief, with a cheque book.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="pt-16 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
