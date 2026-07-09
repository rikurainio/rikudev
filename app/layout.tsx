import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "./components/background";
import { SiteNav } from "./components/site-nav";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-white text-neutral-600 selection:bg-emerald-500 selection:text-white relative font-sans`}
      >
        <Background />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}