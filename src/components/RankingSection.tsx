'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Flame, Calendar, RefreshCw, Filter, TrendingUp, Crown, Eye } from 'lucide-react';
import { Host, getHosts, getKabukichoRanking, getNo1Hosts, getAccessRanking } from '../lib/db';
import { HostCard } from './HostCard';
import { useLanguage } from '../lib/LanguageContext';

type RankTab = 'daily' | 'weekly' | 'monthly';
type DataSource = 'votes' | 'kabukicho' | 'no1' | 'access';

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
      let data: Host[];
      switch (source) {
        case 'kabukicho':
          data = await getKabukichoRanking(tab);
          break;
        case 'votes':
          data = await getHosts();
          break;
        case 'no1':
          data = await getNo1Hosts();
          break;
        case 'access':
          data = await getAccessRanking();
          break;
        default:
          data = [];
      }
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
    let promise: Promise<Host[]>;
    switch (source) {
      case 'kabukicho': promise = getKabukichoRanking(tab); break;
      case 'votes': promise = getHosts(); break;
      case 'no1': promise = getNo1Hosts(); break;
      case 'access': promise = getAccessRanking(); break;
      default: promise = Promise.resolve([]);
    }
    promise.then(data => { setHosts(data); setLoading(false); });
  };

  const groups = ['all', ...Array.from(new Set(hosts.map(h => h.shop?.group_name).filter(Boolean) as string[]))];
  const filteredHosts = filter === 'all' ? hosts : hosts.filter(h => h.shop?.group_name === filter);

  const sourceButtons: { key: DataSource; label: string; labelShort: string; icon: React.ReactNode; color: string }[] = [
    { key: 'kabukicho', label: language === 'ja' ? 'ホスホス' : 'HosHos', labelShort: 'Hos', icon: <TrendingUp className="w-3 sm:w-3.5 h-3 sm:h-3.5" />, color: 'bg-accent text-background' },
    { key: 'votes', label: language === 'ja' ? '推し活' : 'Oshi Vote', labelShort: language === 'ja' ? '推し' : 'Vote', icon: <Trophy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />, color: 'bg-accent-gold text-background' },
    { key: 'no1', label: 'No.1 Host', labelShort: 'No.1', icon: <Crown className="w-3 sm:w-3.5 h-3 sm:h-3.5" />, color: 'bg-yellow-500 text-background' },
    { key: 'access', label: language === 'ja' ? 'アクセス' : 'Access', labelShort: language === 'ja' ? 'Access' : 'Access', icon: <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" />, color: 'bg-cyan-500 text-background' },
  ];

  return (
    <section id="rankings" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-accent/20"
        >
          <Flame className="w-3.5 h-3.5" />
          {language === 'ja' ? '歌舞伎町ランキング' : 'Kabukicho Rankings'}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-foreground mb-3"
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-10">
        {/* Source + Period on same row on mobile */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Source switch */}
          <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-0.5 sm:p-1 gap-0.5 sm:gap-1">
            {sourceButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setSource(btn.key)}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  source === btn.key ? `${btn.color} shadow-md` : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                {btn.icon}
                <span className="hidden sm:inline">{btn.label}</span>
                <span className="sm:hidden">{btn.labelShort}</span>
              </button>
            ))}
          </div>

          {/* Period tabs (only for kabukicho source) */}
          {source === 'kabukicho' && (
            <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-0.5 sm:p-1 gap-0.5 sm:gap-1">
              <button
                onClick={() => setTab('daily')}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'daily' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Flame className="w-3 sm:w-3 h-3 sm:h-3" />
                <span className="hidden sm:inline">{t('rank.daily')}</span>
                <span className="sm:hidden">24h</span>
              </button>
              <button
                onClick={() => setTab('weekly')}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'weekly' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Calendar className="w-3 sm:w-3 h-3 sm:h-3" />
                <span className="hidden sm:inline">{language === 'ja' ? '週間' : 'Weekly'}</span>
                <span className="sm:hidden">7d</span>
              </button>
              <button
                onClick={() => setTab('monthly')}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  tab === 'monthly' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Calendar className="w-3 sm:w-3 h-3 sm:h-3" />
                <span className="hidden sm:inline">{t('rank.monthly')}</span>
                <span className="sm:hidden">30d</span>
              </button>
            </div>
          )}
        </div>

        {/* Group filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-zinc-500 shrink-0 hidden sm:block" />
          <div className="flex gap-1 overflow-x-auto pb-0.5 sm:flex-wrap" style={{ scrollbarWidth: 'none' }}>
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer capitalize whitespace-nowrap ${
                  filter === g ? 'bg-accent/20 text-accent border border-accent/40' : 'bg-card-bg border border-card-border text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {g === 'all' ? (language === 'ja' ? 'すべて' : 'All') : g}
              </button>
            ))}
          </div>
          <button
            onClick={refetch}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-zinc-400 hover:text-foreground hover:border-zinc-500 transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
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

      {/* Link to full ranking page */}
      {!loading && filteredHosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-10"
        >
          <Link
            href="/ranking"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-card-border text-zinc-400 hover:text-accent hover:border-accent/30 text-sm font-semibold transition-all"
          >
            {language === 'ja' ? 'すべてのランキングを見る' : 'View Full Ranking'}
            <TrendingUp className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </section>
  );
};
