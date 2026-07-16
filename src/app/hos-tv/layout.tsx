import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hos-TV',
  description: 'Watch host YouTuber videos from Kabukicho — daily vlogs, behind-the-scenes content, and host culture documentaries.',
  alternates: { canonical: '/hos-tv' },
  openGraph: {
    title: 'Hos-TV | OshiHos',
    description: 'Watch host YouTuber videos from Kabukicho.',
    url: 'https://www.oshi-hos.xyz/hos-tv',
    type: 'website',
  },
};

export default function HosTvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
