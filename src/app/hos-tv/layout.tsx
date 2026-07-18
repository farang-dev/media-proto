import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabukicho Host Videos — Host YouTuber Vlogs & Behind the Scenes',
  description: 'Watch host YouTuber videos from Kabukicho — daily vlogs, behind-the-scenes content, host culture documentaries, and nightlife videos from Shinjuku\'s host district.',
  keywords: [
    'kabukicho host video', 'host youtuber tokyo', 'kabukicho vlog',
    'host club video shinjuku', 'japanese host vlog', 'kabukicho nightlife video',
    'ホスト YouTuber', '歌舞伎町 Vlog', 'ホストクラブ 動画',
    'host culture video', 'shinjuku nightlife vlog',
  ],
  alternates: { canonical: '/hos-tv' },
  openGraph: {
    title: 'Kabukicho Host Videos — Host YouTuber Vlogs & Behind the Scenes',
    description: 'Watch host YouTuber videos from Kabukicho — daily vlogs, behind-the-scenes content.',
    url: 'https://www.oshi-hos.xyz/hos-tv',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Videos — Host YouTuber Vlogs & Behind the Scenes',
    description: 'Watch host YouTuber videos from Kabukicho — daily vlogs, behind-the-scenes content.',
  },
};

export default function HosTvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
