import type { MetadataRoute } from 'next';

const SITE = 'https://oshi-hos.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE}/clubs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE}/ranking`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/hos-tv`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/hos-match`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE}/threads`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];
}
