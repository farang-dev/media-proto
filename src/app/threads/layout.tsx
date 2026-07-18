import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Club Forum — Reviews, Experiences & Community Discussion',
  description: 'Discuss Kabukicho host clubs with fellow enthusiasts — share experiences, read reviews, ask questions, and connect with the host club community in Tokyo.',
  keywords: [
    'kabukicho host club reviews', 'host club forum tokyo', 'kabukicho experience',
    'host club opinions', 'shinjuku host club discussion', 'tokyo nightlife forum',
    'ホストクラブ 口コミ', '歌舞伎町 体験談', 'ホスト レビュー',
    'kabukicho host club community', 'host club tips shinjuku',
  ],
  alternates: { canonical: '/threads' },
  openGraph: {
    title: 'Kabukicho Host Club Forum — Reviews, Experiences & Community Discussion',
    description: 'Discuss Kabukicho host clubs with fellow enthusiasts — share experiences, read reviews.',
    url: 'https://www.oshi-hos.xyz/threads',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Club Forum — Reviews, Experiences & Community Discussion',
    description: 'Discuss Kabukicho host clubs with fellow enthusiasts — share experiences, read reviews.',
  },
};

export default function ThreadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
