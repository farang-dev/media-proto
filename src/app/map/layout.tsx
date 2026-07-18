import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Club Map — Find Host Clubs in Shinjuku, Tokyo',
  description: 'Interactive map of host clubs in Kabukicho, Shinjuku — find clubs by location, get directions, and navigate with Google Maps. Explore Tokyo\'s host club district.',
  keywords: [
    'kabukicho host club map', 'host clubs near me shinjuku', 'kabukicho map',
    'shinjuku nightlife map', 'host club location tokyo', 'kabukicho directions',
    '歌舞伎町 マップ', 'ホストクラブ 地図', '歌舞伎町 ホストクラブ 場所',
    'kabukicho club locations', 'shinjuku host club district map',
  ],
  alternates: { canonical: '/map' },
  openGraph: {
    title: 'Kabukicho Host Club Map — Find Host Clubs in Shinjuku, Tokyo',
    description: 'Interactive map of host clubs in Kabukicho, Shinjuku — find clubs by location.',
    url: 'https://www.oshi-hos.xyz/map',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Club Map — Find Host Clubs in Shinjuku, Tokyo',
    description: 'Interactive map of host clubs in Kabukicho, Shinjuku.',
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
