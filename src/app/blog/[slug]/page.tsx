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
  'hosokyaku-meaning': () => import('@/components/blog/HosokyakuMeaning'),
  'bakudan-meaning': () => import('@/components/blog/BakudanMeaning'),
  'hime-culture': () => import('@/components/blog/HimeCulture'),
  'customer-types-guide': () => import('@/components/blog/CustomerTypesGuide'),
  'dekin-guide': () => import('@/components/blog/DekinGuide'),
  'shimei-nomination-guide': () => import('@/components/blog/ShimeiNominationGuide'),
  'number-one-host': () => import('@/components/blog/NumberOneHost'),
  'romance-sales-guide': () => import('@/components/blog/RomanceSalesGuide'),
  'champagne-tower-guide': () => import('@/components/blog/ChampagneTowerGuide'),
  'champagne-call-guide': () => import('@/components/blog/ChampagneCallGuide'),
  'house-bottle-guide': () => import('@/components/blog/HouseBottleGuide'),
  'dom-perignon-guide': () => import('@/components/blog/DomPerignonGuide'),
  'host-club-bottle-guide': () => import('@/components/blog/HostClubBottleGuide'),
  'last-song-guide': () => import('@/components/blog/LastSongGuide'),
  'going-solo-guide': () => import('@/components/blog/GoingSoloGuide'),
  'host-club-dress-code': () => import('@/components/blog/HostClubDressCode'),
  'how-to-choose-your-host': () => import('@/components/blog/HowToChooseYourHost'),
  'conversation-topics': () => import('@/components/blog/ConversationTopics'),
  'when-to-leave': () => import('@/components/blog/WhenToLeave'),
  'second-visit-guide': () => import('@/components/blog/SecondVisitGuide'),
  'event-guide': () => import('@/components/blog/EventGuide'),
  'group-visit-guide': () => import('@/components/blog/GroupVisitGuide'),
  'host-club-myths': () => import('@/components/blog/HostClubMyths'),
  'kabukicho-safety-guide': () => import('@/components/blog/KabukichoSafetyGuide'),
  'pillow-business-guide': () => import('@/components/blog/PillowBusinessGuide'),
  'overspending-guide': () => import('@/components/blog/OverspendingGuide'),
  'host-addiction-guide': () => import('@/components/blog/HostAddictionGuide'),
  'group-dandy-guide': () => import('@/components/blog/GroupDandyGuide'),
  'air-group-guide': () => import('@/components/blog/AIRGroupGuide'),
  'acqua-group-guide': () => import('@/components/blog/AcquaGroupGuide'),
  'l-collection-guide': () => import('@/components/blog/LCollectionGuide'),
  'osaka-host-club-guide': () => import('@/components/blog/OsakaHostClubGuide'),
  'sapporo-host-club-guide': () => import('@/components/blog/SapporoHostClubGuide'),
  'fukuoka-host-club-guide': () => import('@/components/blog/FukuokaHostClubGuide'),
  'host-club-industry-data': () => import('@/components/blog/HostClubIndustryData'),
  'kabukicho-host-history': () => import('@/components/blog/KabukichoHostHistory'),
  'host-club-regulation': () => import('@/components/blog/HostClubRegulation'),
  'host-club-psychology': () => import('@/components/blog/HostClubPsychology'),
  'falling-for-host': () => import('@/components/blog/FallingForHost'),
  'foreigner-host-club-guide': () => import('@/components/blog/ForeignerHostClubGuide'),
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
