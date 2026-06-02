import type { Metadata } from "next";
import { Providers } from "../lib/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "OshiHos - KABUKICHO HOST | 推しホス 歌舞伎町",

  description:
    "Kabukicho host club guide — discover, rate, and match with hosts in Tokyo's legendary nightlife district.",
  openGraph: {
    title: "OshiHos - KABUKICHO HOST | 推しホス",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('oshihos-theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased"><Providers>{children}</Providers></body>
    </html>
  );
}
