import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Perfect Host in Kabukicho — Host Matching & Discovery',
  description: 'Swipe to discover your perfect Kabukicho host — browse host profiles, compare personalities, and find your ideal host match in Shinjuku, Tokyo.',
  keywords: [
    'find a host kabukicho', 'host matching tokyo', 'best host for me shinjuku',
    'kabukicho host finder', 'choose host club tokyo', 'host profile matching',
    'ホスト おすすめ', '自分に合う ホスト', '歌舞伎町 ホスト 見つける',
    'kabukicho host compatibility', 'shinjuku host recommendation',
  ],
  alternates: { canonical: '/hos-match' },
  openGraph: {
    title: 'Find Your Perfect Host in Kabukicho — Host Matching & Discovery',
    description: 'Swipe to discover your perfect Kabukicho host — browse profiles and find your ideal match.',
    url: 'https://www.oshi-hos.xyz/hos-match',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Host in Kabukicho — Host Matching & Discovery',
    description: 'Swipe to discover your perfect Kabukicho host — browse profiles and find your ideal match.',
  },
};

export default function HosMatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
