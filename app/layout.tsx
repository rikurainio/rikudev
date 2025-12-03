import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Clean sans-serif for reading
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// Tech-focused mono for code/headers
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Riku Rainio",
  description: "Hi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} antialiased bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}