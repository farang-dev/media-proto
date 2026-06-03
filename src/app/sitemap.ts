import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://oshihos.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://oshihos.com/clubs', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://oshihos.com/events', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://oshihos.com/ranking', lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: 'https://oshihos.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://oshihos.com/hos-tv', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: 'https://oshihos.com/hos-match', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: 'https://oshihos.com/threads', lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: 'https://oshihos.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];
}
