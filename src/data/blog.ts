export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  relatedSlugs: string[];
}

export const articles: BlogArticle[] = [
  {
    slug: 'host-club-guide-for-foreigners',
    title: 'Host Clubs in Japan: The Complete Guide for Foreign Visitors',
    description: 'Everything you need to know about Kabukicho host clubs as an international visitor — how they work, pricing, safety, and how to enjoy the experience without speaking Japanese.',
    category: 'Beginner Guide',
    date: '2026-05-30',
    readingTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=1200&auto=format&fit=crop',
    tags: ['beginners', 'foreigners', 'overview', 'safety'],
    relatedSlugs: ['host-club-system-and-pricing', 'first-visit-how-to-prepare'],
  },
  {
    slug: 'host-club-system-and-pricing',
    title: 'How Host Clubs Work: System, Pricing & Payment Explained',
    description: 'Understand host club pricing — set fees,指名 (指名) fees, drinks, tax/service charge, and how to avoid surprises. Real cost examples for every budget.',
    category: 'Pricing',
    date: '2026-05-30',
    readingTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1200&auto=format&fit=crop',
    tags: ['pricing', 'system', 'budget', 'tax'],
    relatedSlugs: ['host-club-guide-for-foreigners', 'faq-about-host-clubs'],
  },
  {
    slug: 'host-groups-in-kabukicho',
    title: 'Major Host Groups in Kabukicho: Groups, Clubs & Where to Go',
    description: 'Complete guide to Kabukicho\'s major host groups — groupdandy, Smappa!, ACQUA, AIR, 冬月グループ, L\'s collection and more. Find the right club for your taste.',
    category: 'Groups Guide',
    date: '2026-05-30',
    readingTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1558632328-465f59aff245?q=80&w=1200&auto=format&fit=crop',
    tags: ['groups', 'clubs', 'kabukicho', 'recommendations'],
    relatedSlugs: ['host-club-system-and-pricing', 'first-visit-how-to-prepare'],
  },
  {
    slug: 'first-visit-how-to-prepare',
    title: 'First Visit to a Host Club: How to Prepare and What to Expect',
    description: 'Step-by-step preparation guide for your first host club visit — booking, what to bring, how to choose a host, conversation tips, and exactly what happens during your visit.',
    category: 'Beginner Guide',
    date: '2026-05-30',
    readingTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1522209959493-d8b44d545931?q=80&w=1200&auto=format&fit=crop',
    tags: ['first-time', 'preparation', 'booking', 'etiquette'],
    relatedSlugs: ['host-club-etiquette-and-tips', 'faq-about-host-clubs'],
  },
  {
    slug: 'host-club-etiquette-and-tips',
    title: 'Host Club Etiquette: Do\'s, Don\'ts, Safety & Pro Tips',
    description: 'Essential etiquette guide for visiting host clubs — tipping culture, conversation rules, safety tips, how to avoid common scams, and how to have the best experience.',
    category: 'Tips & Safety',
    date: '2026-05-30',
    readingTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1543961112-fb4748ddf637?q=80&w=1200&auto=format&fit=crop',
    tags: ['etiquette', 'safety', 'tips', 'culture'],
    relatedSlugs: ['first-visit-how-to-prepare', 'faq-about-host-clubs'],
  },
  {
    slug: 'faq-about-host-clubs',
    title: 'Host Club FAQ: Everything Foreign Visitors Ask About Host Clubs',
    description: 'Answers to the most common questions about Japanese host clubs — can foreigners go? Do I need to speak Japanese? How much does it really cost? Is it safe?',
    category: 'FAQ',
    date: '2026-05-30',
    readingTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1552258694-1d83c5b9d2b3?q=80&w=1200&auto=format&fit=crop',
    tags: ['faq', 'foreigners', 'safety', 'beginners'],
    relatedSlugs: ['host-club-guide-for-foreigners', 'host-club-etiquette-and-tips'],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogArticle[] {
  return articles.filter((a) => slugs.includes(a.slug));
}
