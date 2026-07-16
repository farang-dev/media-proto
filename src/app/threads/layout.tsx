import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Threads',
  description: 'Discuss Kabukicho host clubs with fellow enthusiasts — share experiences, ask questions, and connect with the community.',
  alternates: { canonical: '/threads' },
  openGraph: {
    title: 'Community Threads | OshiHos',
    description: 'Discuss Kabukicho host clubs with fellow enthusiasts.',
    url: 'https://www.oshi-hos.xyz/threads',
    type: 'website',
  },
};

export default function ThreadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
