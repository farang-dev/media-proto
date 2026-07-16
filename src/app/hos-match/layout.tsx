import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hos-Match',
  description: 'Swipe to discover your perfect Kabukicho host — browse profiles and find your ideal match.',
  alternates: { canonical: '/hos-match' },
  openGraph: {
    title: 'Hos-Match | OshiHos',
    description: 'Swipe to discover your perfect Kabukicho host.',
    url: 'https://www.oshi-hos.xyz/hos-match',
    type: 'website',
  },
};

export default function HosMatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
