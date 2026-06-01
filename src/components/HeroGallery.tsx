'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Host, getTopHosts } from '../lib/db';
import { useLanguage } from '../lib/LanguageContext';
import { getEnglishName } from '../lib/japanese';

function HostCard({ host, language }: { host: Host; language: string }) {
  const name = language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en);
  const shopName = host.shop
    ? (language === 'ja' ? host.shop.name_ja : getEnglishName(host.shop.name_ja, host.shop.name_en))
    : '';
  const mainImage = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop';

  return (
    <Link href={`/host/${host.id}`} className="group block shrink-0 snap-start">
      <div className="w-[180px] sm:w-[200px] rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/30 transition-all duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 host-img"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          {host.votes_count !== undefined && host.votes_count > 0 && (
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 text-[10px] text-accent-light font-semibold">
              <Heart className="w-2.5 h-2.5" />
              {host.votes_count}
            </div>
          )}
        </div>
        <div className="p-3">
          {shopName && (
            <p className="text-[9px] font-semibold text-accent uppercase tracking-wider truncate mb-0.5">
              {shopName}
            </p>
          )}
          <p className="text-sm font-bold font-serif text-foreground truncate group-hover:text-accent transition-colors">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}

function AutoScrollRow({
  hosts,
  language,
  reverse,
}: {
  hosts: Host[];
  language: string;
  reverse?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || hosts.length === 0) return;

    let rafId: number;
    let scrollPos = reverse ? el.scrollWidth / 2 : 0;
    const speed = 0.4;

    const animate = () => {
      const maxScroll = el.scrollWidth / 2;
      if (reverse) {
        scrollPos -= speed;
        if (scrollPos <= 0) scrollPos = maxScroll;
      } else {
        scrollPos += speed;
        if (scrollPos >= maxScroll) scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      rafId = requestAnimationFrame(animate);
    };

    const pause = () => cancelAnimationFrame(rafId);
    const resume = () => { rafId = requestAnimationFrame(animate); };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('touchstart', pause);
    el.addEventListener('mouseleave', resume);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [hosts, reverse]);

  const doubled = [...hosts, ...hosts];

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {doubled.map((host, i) => (
        <HostCard key={`${host.id}-${i}`} host={host} language={language} />
      ))}
    </div>
  );
}

export const HeroGallery: React.FC = () => {
  const { language } = useLanguage();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopHosts(12).then((data) => {
      setHosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[0, 1].map((row) => (
          <div key={row} className="flex justify-center gap-4 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[180px] sm:w-[200px] rounded-2xl bg-card-bg border border-card-border overflow-hidden animate-pulse shrink-0">
                <div className="aspect-[3/4] bg-black/5" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-black/5 rounded-full w-3/4" />
                  <div className="h-2 bg-black/5 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (hosts.length === 0) return null;

  const mid = Math.ceil(hosts.length / 2);
  const topRow = hosts.slice(0, mid);
  const bottomRow = hosts.slice(mid);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-5">
        <AutoScrollRow hosts={topRow} language={language} />
        <AutoScrollRow hosts={bottomRow} language={language} reverse />
      </div>
    </div>
  );
};
