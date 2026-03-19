import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://rebstudio.com"),
  title: "REB Studio — Your site works while you sleep",
  description:
    "AI-powered websites for local businesses. Connect Square, and we handle the rest. $49 first month.",
  openGraph: {
    title: "REB Studio — Your site works while you sleep",
    description:
      "AI-powered websites for local businesses. Connect Square, and we handle the rest.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REB Studio — Your site works while you sleep",
    description: "AI-powered websites for local businesses. Connect Square, and we handle the rest.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
