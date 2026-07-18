import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Club Events — Special Nights & Party Events in Shinjuku',
  description: 'Upcoming events and special nights at Kabukicho host clubs — limited events, seasonal campaigns, birthday parties, and guest events in Shinjuku, Tokyo.',
  keywords: [
    'kabukicho events', 'host club events tokyo', 'shinjuku nightlife events',
    'kabukicho party events', 'host club special nights', 'tokyo host events',
    '歌舞伎町 イベント', 'ホストクラブ イベント', '歌舞伎町 パーティー',
    'kabukicho host club party', 'shinjuku host events tonight',
  ],
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Kabukicho Host Club Events — Special Nights & Party Events in Shinjuku',
    description: 'Upcoming events and special nights at Kabukicho host clubs.',
    url: 'https://www.oshi-hos.xyz/events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Club Events — Special Nights & Party Events in Shinjuku',
    description: 'Upcoming events and special nights at Kabukicho host clubs.',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
