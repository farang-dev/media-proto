import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Host Rankings',
  description: 'Real-time Kabukicho host rankings — daily, weekly, and monthly top hosts. Cast your vote to support your favorite star.',
  alternates: { canonical: '/ranking' },
  openGraph: {
    title: 'Host Rankings | OshiHos',
    description: 'Real-time Kabukicho host rankings — daily, weekly, and monthly top hosts.',
    url: 'https://www.oshi-hos.xyz/ranking',
    type: 'website',
  },
};

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
