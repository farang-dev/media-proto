import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Club Map',
  description: 'Interactive map of host clubs in Kabukicho, Shinjuku — find clubs by location and navigate with Google Maps.',
  alternates: { canonical: '/map' },
  openGraph: {
    title: 'Kabukicho Host Club Map | OshiHos',
    description: 'Interactive map of host clubs in Kabukicho, Shinjuku.',
    url: 'https://www.oshi-hos.xyz/map',
    type: 'website',
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
