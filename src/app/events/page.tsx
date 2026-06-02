'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { getEvents, EventItem } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { getEnglishName } from '@/lib/japanese';

const DAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

function formatDate(dateStr: string, lang: string) {
  const d = new Date(dateStr + 'T00:00:00+09:00');
  if (lang === 'ja') {
    return `${d.getMonth() + 1}月${d.getDate()}日(${DAYS_JA[d.getDay()]})`;
  }
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getEventImage(ev: EventItem): string {
  return ev.shop?.image_urls?.[0] || ev.shop?.logo_url || '';
}

function getGroupGradient(name: string): string {
  const gradients: Record<string, string> = {
    groupdandy: 'from-violet-600 to-fuchsia-700',
    Smappa: 'from-amber-500 to-rose-600',
    ACQUA: 'from-cyan-500 to-blue-600',
    AIR: 'from-sky-400 to-indigo-600',
    冬月: 'from-emerald-500 to-teal-600',
    L: 'from-pink-500 to-rose-700',
  };
  for (const [key, g] of Object.entries(gradients)) {
    if (name.includes(key) || key.includes(name)) return g;
  }
  return 'from-accent to-accent-gold';
}

export default function EventsPage() {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const byDate: Record<string, EventItem[]> = {};
  for (const ev of events) {
    if (!byDate[ev.event_date]) byDate[ev.event_date] = [];
    byDate[ev.event_date].push(ev);
  }
  const dateKeys = Object.keys(byDate).sort();

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-3">
          {t('events.title')}
        </h1>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          {t('events.subtitle')}
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card-bg border border-card-border aspect-[3/4] sm:aspect-[4/3] animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Calendar className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <p className="text-zinc-400">{t('events.no_events')}</p>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {dateKeys.map(date => (
            <div key={date}>
              <h2 className="text-lg font-bold font-serif text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {formatDate(date, language)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {byDate[date].map((ev) => {
                    const title = language === 'ja' ? ev.title_ja : (ev.title_en || ev.title_ja);
                    const desc = language === 'ja' ? ev.description_ja : (ev.description_en || ev.description_ja);
                    const heroImage = getEventImage(ev);
                    const gName = ev.group ? getEnglishName(ev.group.name_ja, ev.group.name_en) : '';
                    const gradient = getGroupGradient(ev.group?.name_ja || '');

                    const shopHref = ev.shop_id ? `/shops/${ev.shop_id}` : ev.shop_url || '';

                    return (
                      <motion.div
                        key={ev.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <a
                          href={shopHref}
                          {...(ev.shop_id ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                          className="relative rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/30 transition-all group block aspect-[3/4] sm:aspect-[4/3]"
                        >
                          {heroImage ? (
                            <img
                              src={heroImage}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="font-bold font-serif text-white text-base leading-tight drop-shadow-lg mb-1">
                              {title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
                              <span>{ev.shop_name}</span>
                              {gName && <span>{gName}</span>}
                            </div>
                            {desc && (
                              <p className="text-xs text-white/70 leading-relaxed mt-2 line-clamp-2">
                                {desc}
                              </p>
                            )}
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-xs text-zinc-400">
          {language === 'ja'
            ? 'データ提供: ホスホス (host2.jp) — 毎日自動更新'
            : 'Data source: ホスホス (host2.jp) — Updated daily'}
        </p>
      </div>
    </main>
  );
}
