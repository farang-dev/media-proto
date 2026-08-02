import { articles } from '@/data/blog';
import { supabase } from '@/lib/supabase';

const SITE = 'https://www.oshi-hos.xyz';

export async function GET() {
  const staticPages = [
    { url: `${SITE}/`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE}/clubs`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/ranking`, lastModified: new Date().toISOString(), changeFrequency: 'hourly', priority: 0.95 },
    { url: `${SITE}/no1-host`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/events`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE}/map`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${SITE}/hos-tv`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/hos-match`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${SITE}/threads`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE}/terms`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.2 },
  ];

  const blogPages = articles.map((article) => ({
    url: `${SITE}/blog/${article.slug}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic: individual club pages (only Kabukicho shops)
  const { data: shops } = await supabase
    .from('shops')
    .select('id, address_ja');

  const clubPages = (shops || [])
    .filter((s) => s.address_ja?.includes('歌舞伎町'))
    .map((s) => ({
      url: `${SITE}/clubs/${s.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  // Dynamic: individual host pages
  const { data: hosts } = await supabase
    .from('hosts')
    .select('id')
    .eq('is_active', true);

  const hostPages = (hosts || []).map((h) => ({
    url: `${SITE}/hosts/${h.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPages, ...clubPages, ...hostPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
