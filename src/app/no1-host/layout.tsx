import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No.1 Host',
  description: 'The definitive No.1 host rankings in Kabukicho — shop-level champions and rising stars across all major groups.',
  alternates: { canonical: '/no1-host' },
  openGraph: {
    title: 'No.1 Host | OshiHos',
    description: 'The definitive No.1 host rankings in Kabukicho.',
    url: 'https://www.oshi-hos.xyz/no1-host',
    type: 'website',
  },
};

export default function No1HostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
