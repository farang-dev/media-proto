'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Film, Users, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { channels, HosTvVideo } from '@/data/hos-tv';
import { useLanguage } from '@/lib/LanguageContext';

const CC_PARAMS = (lang: string) => `?cc_load_policy=1&cc_lang_pref=en&hl=${lang}&rel=0&autoplay=1`;

function VideoEmbed({ video, lang }: { video: HosTvVideo; lang: string }) {
  const [loaded, setLoaded] = useState(false);
  const title = lang === 'ja' ? video.title_ja : (video.title_en ?? video.title_ja);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${video.id}${CC_PARAMS(lang)}`}
        title={title}
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
      aria-label={title}
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/30">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <Play className="w-6 h-6 text-black ml-0.5" />
        </div>
      </div>
    </button>
  );
}

export default function HosTvPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('nav.home')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
            {language === 'ja' ? 'ホスTV' : 'Hos-TV'}
          </h1>
          <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
            {language === 'ja'
              ? 'ホストYouTuberの動画を視聴。毎日更新される最新動画を英語字幕付きでチェック。'
              : 'Watch host YouTuber videos. English captions available on most channels.'}
          </p>
        </div>

        <div className="space-y-12">
          {channels.map((channel, ci) => (
            <motion.section
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold font-serif text-foreground leading-tight">
                      {language === 'ja' ? channel.name_ja : channel.name_en}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-500">{channel.handle}</span>
                      {channel.subscriberCount !== '—' && (
                        <span className="text-xs text-accent flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {channel.subscriberCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-lg">
                      {language === 'ja' ? channel.description_ja : channel.description_en}
                    </p>
                  </div>
                </div>
                <a
                  href={channel.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/20 text-accent text-xs font-semibold transition-all shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {language === 'ja' ? 'チャンネルを見る' : 'Visit Channel'}
                </a>
              </div>

              {channel.videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {channel.videos.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-2xl overflow-hidden border border-card-border bg-card-bg hover:border-accent/30 transition-all group"
                    >
                      <div className="aspect-video bg-black relative">
                        <VideoEmbed video={video} lang={language} />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-foreground leading-relaxed line-clamp-2">
                          {language === 'ja' ? video.title_ja : (video.title_en ?? video.title_ja)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-card-border bg-card-bg/50 px-6 py-8 text-center">
                  <p className="text-xs text-zinc-500">
                    {language === 'ja'
                      ? '動画がまだ追加されていません — YouTubeでチャンネルをチェック'
                      : 'No videos yet — visit the channel on YouTube'}
                  </p>
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
