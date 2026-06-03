import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "../lib/Providers";
import "./globals.css";

const SITE_URL = "https://www.oshi-hos.xyz";
const SITE_NAME = "OshiHos - KABUKICHO HOST";
const JA_NAME = "推しホス 歌舞伎町";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${JA_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kabukicho host club guide — discover, rate, and match with hosts in Tokyo's legendary nightlife district. Real-time rankings, bilingual profiles, and culture guides for international visitors.",
  keywords: [
    "host club", "kabukicho", "shinjuku", "tokyo nightlife", "oshi hos",
    "host ranking", "japanese host club", "歌舞伎町", "ホストクラブ",
    "推しホス", "oshihos", "host culture japan",
  ],
  authors: [{ name: "OshiHos" }],
  creator: "OshiHos",
  publisher: "OshiHos",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: {
      default: `${SITE_NAME} | ${JA_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Real-time host club rankings & bilingual culture guide for Tokyo's Kabukicho. Discover your favorite host today.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OshiHos - KABUKICHO HOST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${JA_NAME}`,
    description:
      "Discover, rate, and match with top hosts in Tokyo's Kabukicho district. Real-time rankings & culture guide.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#A868D8",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RV6YEC1MMG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RV6YEC1MMG');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <script
          id="schema-webpage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "OshiHos - KABUKICHO HOST",
              "alternateName": "推しホス",
              "url": "https://www.oshi-hos.xyz",
              "description": "Kabukicho host club guide — discover, rate, and match with hosts in Tokyo's legendary nightlife district.",
              "inLanguage": ["en", "ja"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.oshi-hos.xyz/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
