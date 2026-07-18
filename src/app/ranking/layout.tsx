import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Ranking — Daily, Weekly & Monthly Top Hosts',
  description: 'Real-time Kabukicho host ranking — daily, weekly, and monthly top hosts in Shinjuku, Tokyo. See who ranks #1 today and cast your vote for your favorite host.',
  keywords: [
    'kabukicho host ranking', 'host ranking tokyo', 'kabukicho top host',
    'shinjuku host ranking', 'best host kabukicho', 'number one host shinjuku',
    'host ranking japan', '歌舞伎町 ホストランキング', 'ホスト ランキング 東京',
    'kabukicho nightlife ranking', 'top host clubs shinjuku',
  ],
  alternates: { canonical: '/ranking' },
  openGraph: {
    title: 'Kabukicho Host Ranking — Daily, Weekly & Monthly Top Hosts',
    description: 'Real-time Kabukicho host ranking — daily, weekly, and monthly top hosts in Shinjuku, Tokyo.',
    url: 'https://www.oshi-hos.xyz/ranking',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Ranking — Daily, Weekly & Monthly Top Hosts',
    description: 'Real-time Kabukicho host ranking — daily, weekly, and monthly top hosts in Shinjuku, Tokyo.',
  },
};

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
