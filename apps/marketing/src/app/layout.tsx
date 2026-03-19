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
    "Custom websites for local businesses, managed by AI. We build it. Square feeds it. You never think about it. $49 first month.",
  openGraph: {
    title: "REB Studio — Your site works while you sleep",
    description:
      "Custom websites for local businesses, managed by AI. We build it. Square feeds it. You never think about it.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REB Studio — Your site works while you sleep",
    description: "Custom websites for local businesses, managed by AI. We build it. Square feeds it. You never think about it.",
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
