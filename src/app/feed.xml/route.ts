import { articles } from '@/data/blog';
import type { NextRequest } from 'next/server';

const SITE = 'https://www.oshi-hos.xyz';

export async function GET(_request: NextRequest) {
  const items = articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.description}]]></description>
      <link>${SITE}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${a.category}</category>
      ${a.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OshiHos Blog — Kabukicho Host Club Guide</title>
    <description>In-depth guides about Kabukicho host club culture — pricing, etiquette, safety tips, and cultural insights for international visitors.</description>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
