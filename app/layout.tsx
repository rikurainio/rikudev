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
      <body
        className={`${inter.variable} ${mono.variable} antialiased bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}