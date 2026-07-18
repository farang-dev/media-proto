import type { MetadataRoute } from 'next';
import { articles } from '@/data/blog';
import { supabase } from '@/lib/supabase';

const SITE = 'https://www.oshi-hos.xyz';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE}/clubs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/ranking`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.95 },
    { url: `${SITE}/no1-host`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE}/map`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${SITE}/hos-tv`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/hos-match`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${SITE}/threads`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic: individual club pages (only Kabukicho shops)
  const { data: shops } = await supabase
    .from('shops')
    .select('id, address_ja');

  const clubPages: MetadataRoute.Sitemap = (shops || [])
    .filter((s) => s.address_ja?.includes('歌舞伎町'))
    .map((s) => ({
      url: `${SITE}/clubs/${s.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Dynamic: individual host pages
  const { data: hosts } = await supabase
    .from('hosts')
    .select('id')
    .eq('is_active', true);

  const hostPages: MetadataRoute.Sitemap = (hosts || []).map((h) => ({
    url: `${SITE}/hosts/${h.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...clubPages, ...hostPages];
}
