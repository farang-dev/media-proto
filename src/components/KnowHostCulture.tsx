'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { articles } from '@/data/blog';

const FEATURED_SLUGS = [
  'host-club-guide-for-foreigners',
  'first-visit-how-to-prepare',
  'host-club-system-and-pricing',
  'host-club-etiquette-and-tips',
];

const VIDEOS = [
  {
    id: 'tV8OhAc3Zyc',
    title_ja: '【保存版】外国人から見た日本のホストクラブの全て',
    title_en: 'A Foreigner\'s Complete Guide to Japanese Host Clubs',
    channel: 'Let\'s ask Sho | Japan Travel & Culture',
  },
  {
    id: 'gNk5T9LvLWk',
    title_ja: 'I Tried Working In A Japanese Host Club',
    title_en: 'I Tried Working In A Japanese Host Club',
    channel: 'CDawgVA',
  },
];

function VideoEmbed({ videoId, loaded, setLoaded }: { videoId: string; loaded: boolean; setLoaded: (v: boolean) => void }) {
  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="Host Culture Guide"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="absolute inset-0 w-full h-full group cursor-pointer border-0 p-0"
      aria-label="Play video"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/30">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <Play className="w-7 h-7 text-black ml-1" />
        </div>
      </div>
    </button>
  );
}

export const KnowHostCulture: React.FC = () => {
  const { t, language } = useLanguage();
  const featured = articles.filter(a => FEATURED_SLUGS.includes(a.slug));
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  function handleLoad(id: string) {
    setLoadedVideos(prev => new Set(prev).add(id));
  }

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-foreground mb-3">
          {t('culture.title')}
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
          {t('culture.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        <div className="lg:col-span-2 space-y-4">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl overflow-hidden border border-card-border bg-card-bg hover:border-accent/30 transition-all group"
            >
              <div className="relative aspect-video bg-black">
                <VideoEmbed videoId={video.id} loaded={loadedVideos.has(video.id)} setLoaded={() => handleLoad(video.id)} />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-xs text-foreground leading-relaxed line-clamp-2 font-semibold">
                  {language === 'ja' ? video.title_ja : video.title_en}
                </p>
                <p className="text-[10px] text-zinc-500">{video.channel}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-all overflow-hidden h-full"
              >
                <div className="aspect-[2/1] relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors mb-1.5 leading-snug text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {article.readingTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-2.5 h-2.5" />
                      {article.date}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/20 text-accent text-sm font-semibold transition-all"
        >
          <BookOpen className="w-4 h-4" />
          {t('culture.read_more')}
        </Link>
      </motion.div>
    </section>
  );
};
