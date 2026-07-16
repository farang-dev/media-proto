'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ClubsSection } from '../components/ClubsSection';
import { RankingSection } from '../components/RankingSection';
import { TikTokSection } from '../components/TikTokSection';
import { KnowHostCulture } from '../components/KnowHostCulture';
import { CommunitySection } from '../components/CommunitySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RankingSection />
      <TikTokSection />
      <ClubsSection />
      <KnowHostCulture />
      <CommunitySection />
    </>
  );
}
