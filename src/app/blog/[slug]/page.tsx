import React from 'react';
import { notFound } from 'next/navigation';
import { getArticle, getRelatedArticles, articles } from '@/data/blog';
import { BlogLayout } from '@/components/BlogLayout';

const articleComponents: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'host-club-guide-for-foreigners': () => import('@/components/blog/HostClubGuideForForeigners'),
  'host-club-system-and-pricing': () => import('@/components/blog/HostClubSystemAndPricing'),
  'host-groups-in-kabukicho': () => import('@/components/blog/HostGroupsInKabukicho'),
  'first-visit-how-to-prepare': () => import('@/components/blog/FirstVisitHowToPrepare'),
  'host-club-etiquette-and-tips': () => import('@/components/blog/HostClubEtiquetteAndTips'),
  'faq-about-host-clubs': () => import('@/components/blog/FAQAboutHostClubs'),
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function BlogArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const loader = articleComponents[slug];
  if (!loader) notFound();

  const mod = await loader();
  const Content = mod.default;
  const related = getRelatedArticles(article.relatedSlugs);

  return (
    <BlogLayout article={article} relatedArticles={related}>
      <Content />
    </BlogLayout>
  );
}
