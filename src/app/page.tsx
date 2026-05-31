'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ClubsSection } from '../components/ClubsSection';
import { RankingSection } from '../components/RankingSection';
import { CommunitySection } from '../components/CommunitySection';
import { AdBanner } from '../components/AdBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClubsSection />
      <RankingSection />
      <AdBanner />
      <CommunitySection />
    </>
  );
}
