'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Calendar, RefreshCw, Filter, TrendingUp, ArrowLeft, Timer, Heart } from 'lucide-react';
import Link from 'next/link';
import { Host, getHosts, getKabukichoRanking, getRecentlyFavoritedHosts } from '@/lib/db';
import { HostCard } from '@/components/HostCard';
import { useLanguage } from '@/lib/LanguageContext';

type RankTab = 'daily' | 'weekly' | 'monthly';

export default function RankingPage() {
  const { t, language } = useLanguage();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<RankTab>('daily');
  const [source, setSource] = useState<'kabukicho' | 'votes'>('kabukicho');
  const [filter, setFilter] = useState<string>('all');
  const [recentFavHosts, setRecentFavHosts] = useState<Host[]>([]);

  useEffect(() => {
    getRecentlyFavoritedHosts(12, 48).then(setRecentFavHosts);
  }, []);

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
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === 'ja' ? 'トップに戻る' : 'Back'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-accent/20">
              <Flame className="w-3.5 h-3.5" />
              {language === 'ja' ? '歌舞伎町ランキング' : 'Kabukicho Rankings'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-foreground mb-3">
              {t('rank.title')}
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
              {t('rank.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recently Favorited */}
      {recentFavHosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Timer className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif text-foreground">
                  {language === 'ja' ? '🔥 最近お気に入りに追加されたホスト' : '🔥 Recently Favorited'}
                </h2>
                <p className="text-xs text-zinc-500">
                  {language === 'ja' ? '48時間以内に誰かからブックマークされました' : 'Bookmarked by users in the last 48h'}
                </p>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
              {recentFavHosts.map((host, i) => {
                const hName = language === 'ja' ? host.name_ja : (host.name_en || host.name_ja);
                const hImg = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
                return (
                  <motion.div
                    key={host.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="snap-start shrink-0 group"
                  >
                    <Link href={`/host/${host.id}`} className="block">
                      <div className="w-[130px] rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/30 transition-all duration-300">
                        <div className="aspect-[3/4] overflow-hidden relative">
                          <img
                            src={hImg}
                            alt={hName}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 host-img"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-xs font-bold text-white font-serif truncate drop-shadow-lg">{hName}</p>
                          </div>
                          <div className="absolute top-2 right-2 bg-accent/80 rounded-full p-1">
                            <Heart className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Full Rankings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            {/* Source switch */}
            <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-1 gap-1">
              <button
                onClick={() => setSource('kabukicho')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  source === 'kabukicho' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {language === 'ja' ? 'ホスホス' : 'HosHos'}
              </button>
              <button
                onClick={() => setSource('votes')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  source === 'votes' ? 'bg-accent-gold text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                {language === 'ja' ? '推し活' : 'Oshi Vote'}
              </button>
            </div>

            {/* Period tabs */}
            {source === 'kabukicho' && (
              <div className="flex items-center bg-card-bg border border-card-border rounded-xl p-1 gap-1">
                <button
                  onClick={() => setTab('daily')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    tab === 'daily' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  {t('rank.daily')}
                </button>
                <button
                  onClick={() => setTab('weekly')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    tab === 'weekly' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  {language === 'ja' ? '週間' : 'Weekly'}
                </button>
                <button
                  onClick={() => setTab('monthly')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    tab === 'monthly' ? 'bg-accent text-background shadow-md' : 'text-zinc-400 hover:text-foreground'
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
                    filter === g ? 'bg-accent/20 text-accent border border-accent/40' : 'bg-card-bg border border-card-border text-zinc-400 hover:border-zinc-500'
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
            {Array.from({ length: 8 }).map((_, i) => (
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
    </div>
  );
}
