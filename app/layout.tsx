import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "./components/background";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rikudev.quest";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "rikudevs",
  description: "software developer",
  openGraph: {
    title: "rikudevs",
    description: "software developer",
    url: "/",
    siteName: "rikudevs",
    images: [
      {
        url: "https://placehold.co/600x200/000000/FFFFFF/png?text=rikudevs",
        width: 600,
        height: 200,
        alt: "rikudevs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rikudevs",
    description: "software developer",
    images: [
      "https://placehold.co/600x200/000000/FFFFFF/png?text=rikudevs",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-400 selection:bg-white selection:text-black relative font-sans`}
      >
        <Background />
        {children}
      </body>
    </html>
  );
}