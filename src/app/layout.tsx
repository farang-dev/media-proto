import type { Metadata } from "next";
import { Providers } from "../lib/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "OshiHost - Kabukicho | 推しホス 歌舞伎町",
  description:
    "Discover and rank Kabukicho's top host club stars. Real-time host rankings, detailed profiles, and a bilingual community for Tokyo nightlife fans.",
  keywords: [
    "host club tokyo", "kabukicho hosts", "japanese host club guide",
    "歌舞伎町 ホスト", "推しホス", "host club for foreigners",
    "kabukicho nightlife", "yggdrasil host club", "fuyutsuki host club"
  ],
  openGraph: {
    title: "OshiHost - Kabukicho | 推しホス",
    description: "Real-time host club rankings & bilingual culture guide for Tokyo's Kabukicho.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased"><Providers>{children}</Providers></body>
    </html>
  );
}
