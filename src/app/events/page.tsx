'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Store, MapPin, ChevronRight, ExternalLink, PartyPopper } from 'lucide-react';
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

  // Group events by date
  const byDate: Record<string, EventItem[]> = {};
  for (const ev of events) {
    if (!byDate[ev.event_date]) byDate[ev.event_date] = [];
    byDate[ev.event_date].push(ev);
  }
  const dateKeys = Object.keys(byDate).sort();

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
          <PartyPopper className="w-7 h-7 text-accent" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-3">
          {t('events.title')}
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {t('events.subtitle')}
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card-bg border border-card-border p-6 animate-pulse">
              <div className="h-5 w-32 bg-zinc-700 rounded mb-4" />
              <div className="h-16 bg-zinc-700/50 rounded" />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <p className="text-muted-foreground">{t('events.no_events')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {dateKeys.map(date => (
            <div key={date}>
              <h2 className="text-lg font-bold font-serif text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {formatDate(date, language)}
              </h2>
              <div className="space-y-3">
                {byDate[date].map((ev, idx) => {
                  const groupName = ev.group
                    ? (language === 'ja' ? ev.group.name_ja : getEnglishName(ev.group.name_ja, ev.group.name_en))
                    : null;
                  const title = language === 'ja' ? ev.title_ja : (ev.title_en || ev.title_ja);
                  const desc = language === 'ja' ? ev.description_ja : (ev.description_en || ev.description_ja);

                  return (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl bg-card-bg border border-card-border hover:border-accent/30 transition-all overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold font-serif text-foreground text-base mb-1">
                              {title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Store className="w-3 h-3" />
                                {ev.shop_name}
                              </span>
                              {groupName && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {groupName}
                                </span>
                              )}
                            </div>
                            {desc && (
                              <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed max-w-lg">
                                {desc}
                              </p>
                            )}
                          </div>
                          {ev.shop_url && (
                            <a
                              href={ev.shop_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-card-border hover:border-accent/40 text-zinc-400 hover:text-accent transition-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-xs text-muted-foreground">
          {language === 'ja'
            ? 'データ提供: ホスホス (host2.jp) — 毎日自動更新'
            : 'Data source: ホスホス (host2.jp) — Updated daily'}
        </p>
      </div>
    </main>
  );
}
