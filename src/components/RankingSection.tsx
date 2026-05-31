'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Calendar, RefreshCw, Filter, TrendingUp } from 'lucide-react';
import { Host, getHosts, getKabukichoRanking } from '../lib/db';
import { HostCard } from './HostCard';
import { useLanguage } from '../lib/LanguageContext';

type RankTab = 'daily' | 'weekly' | 'monthly';
type DataSource = 'votes' | 'kabukicho';

export const RankingSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<RankTab>('daily');
  const [source, setSource] = useState<DataSource>('kabukicho');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const data = source === 'kabukicho'
        ? await getKabukichoRanking(tab)
        : await getHosts();
      if (!cancelled) {
        setHosts(data);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [source, tab]);

  // Apply group filter from ClubsSection
  useEffect(() => {
    const saved = sessionStorage.getItem('oshihost_filter_group');
    if (saved) {
      setFilter(saved);
      sessionStorage.removeItem('oshihost_filter_group');
    }
  }, []);

  const handleVote = (hostId: string, newCount: number) => {
    setHosts(prev =>
      [...prev.map(h => h.id === hostId ? { ...h, votes_count: newCount } : h)]
        .sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0))
    );
  };

  const refetch = () => {
    setLoading(true);
    const promise = source === 'kabukicho' ? getKabukichoRanking(tab) : getHosts();
    promise.then(data => { setHosts(data); setLoading(false); });
  };

  const groups = ['all', ...Array.from(new Set(hosts.map(h => h.shop?.group_name).filter(Boolean) as string[]))];
  const filteredHosts = filter === 'all' ? hosts : hosts.filter(h => h.shop?.group_name === filter);

  return (
    <section id="rankings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-rose-gold/10 text-rose-gold text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-rose-gold/20"
        >
          <Flame className="w-3.5 h-3.5" />
          {language === 'ja' ? '歌舞伎町ランキング' : 'Kabukicho Rankings'}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black font-serif text-gold-gradient mb-3"
        >
          {t('rank.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed"
        >
          {t('rank.subtitle')}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        {/* Source toggle + tabs */}
        <div className="flex items-center gap-3">
          {/* Source switch */}
          <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-1 gap-1">
            <button
              onClick={() => setSource('kabukicho')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                source === 'kabukicho' ? 'bg-rose-gold text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {language === 'ja' ? 'ホスホス' : 'HosHos'}
            </button>
            <button
              onClick={() => setSource('votes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                source === 'votes' ? 'bg-neon-violet text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              {language === 'ja' ? '推し活' : 'Oshi Vote'}
            </button>
          </div>

          {/* Period tabs (only for kabukicho source) */}
          {source === 'kabukicho' && (
            <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-1 gap-1">
              <button
                onClick={() => setTab('daily')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'daily' ? 'bg-rose-gold text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Flame className="w-3 h-3" />
                {t('rank.daily')}
              </button>
              <button
                onClick={() => setTab('weekly')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'weekly' ? 'bg-rose-gold text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Calendar className="w-3 h-3" />
                {language === 'ja' ? '週間' : 'Weekly'}
              </button>
              <button
                onClick={() => setTab('monthly')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'monthly' ? 'bg-rose-gold text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Calendar className="w-3 h-3" />
                {t('rank.monthly')}
              </button>
            </div>
          )}
        </div>

        {/* Group filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize whitespace-nowrap ${
                  filter === g ? 'bg-rose-gold/20 text-rose-gold border border-rose-gold/40' : 'bg-card-bg border border-card-border text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {g === 'all' ? (language === 'ja' ? 'すべて' : 'All') : g}
              </button>
            ))}
          </div>
          <button
            onClick={refetch}
            className="w-8 h-8 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-zinc-400 hover:text-foreground hover:border-zinc-500 transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card-bg border border-card-border overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-black/5" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-black/5 rounded-full w-3/4" />
                <div className="h-3 bg-black/5 rounded-full w-1/2" />
                <div className="h-8 bg-black/5 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredHosts.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p>{source === 'kabukicho'
            ? (language === 'ja' ? 'ランキングデータを取得中です。スクレイピングスクリプトを実行してください。' : 'Ranking data pending. Run the scrape script first.')
            : t('rank.empty')}
          </p>
        </div>
      )}

      {/* Host grid */}
      {!loading && filteredHosts.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredHosts.map((host, index) => (
              <HostCard
                key={host.id}
                host={host}
                rank={index + 1}
                onVote={source === 'votes' ? handleVote : undefined}
                isFeatured={index === 0}

              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};
