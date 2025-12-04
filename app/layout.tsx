import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Clean sans-serif for reading
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// Tech-focused mono for code/headers
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rikudev.quest";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "rikudevs",
  description: "Software engineer building thoughtful, modern web experiences.",
  openGraph: {
    title: "rikudevs",
    description: "Software engineer building thoughtful, modern web experiences.",
    url: "/",
    siteName: "rikudevs",
    images: [
      {
        url: "/avatar.png",
        width: 512,
        height: 512,
        alt: "rikudevs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rikudevs",
    description: "Software engineer building thoughtful, modern web experiences.",
    images: ["/avatar.png"],
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
        className={`${inter.variable} ${mono.variable} antialiased bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}