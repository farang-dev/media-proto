import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Events',
  description: 'Upcoming events and special nights at Kabukicho host clubs — limited events, seasonal campaigns, and more.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Kabukicho Events | OshiHos',
    description: 'Upcoming events and special nights at Kabukicho host clubs.',
    url: 'https://www.oshi-hos.xyz/events',
    type: 'website',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
