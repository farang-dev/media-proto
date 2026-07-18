import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Number One Host in Kabukicho — Shop Champions & Rising Stars',
  description: 'The definitive No.1 host rankings in Kabukicho — shop-level champions and rising stars across all major host club groups in Shinjuku, Tokyo.',
  keywords: [
    'number one host kabukicho', 'best host shinjuku', 'top host tokyo',
    'kabukicho no1 host', 'number one host japan', 'best host club tokyo',
    '歌舞伎町 ホスト No.1', 'No.1 ホスト 歌舞伎町', '一番人気 ホスト 東京',
    'kabukicho champion host', 'shinjuku top host ranking',
  ],
  alternates: { canonical: '/no1-host' },
  openGraph: {
    title: 'Number One Host in Kabukicho — Shop Champions & Rising Stars',
    description: 'The definitive No.1 host rankings in Kabukicho — shop-level champions and rising stars.',
    url: 'https://www.oshi-hos.xyz/no1-host',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number One Host in Kabukicho — Shop Champions & Rising Stars',
    description: 'The definitive No.1 host rankings in Kabukicho — shop-level champions and rising stars.',
  },
};

export default function No1HostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
