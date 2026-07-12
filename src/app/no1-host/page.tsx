'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, ArrowLeft, Store } from 'lucide-react';
import Link from 'next/link';
import { Host, getNo1Hosts } from '@/lib/db';
import { HostCard } from '@/components/HostCard';
import { useLanguage } from '@/lib/LanguageContext';

export default function No1HostPage() {
  const { language } = useLanguage();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNo1Hosts().then(data => { setHosts(data); setLoading(false); });
  }, []);

  const groupedByShop = hosts.reduce<Record<string, Host[]>>((acc, host) => {
    const shopName = host.shop?.name_ja || '不明';
    if (!acc[shopName]) acc[shopName] = [];
    acc[shopName].push(host);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-yellow-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === 'ja' ? 'トップに戻る' : 'Back'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-yellow-500/20">
              <Crown className="w-3.5 h-3.5" />
              {language === 'ja' ? '各店舗の No.1 ホスト' : 'No.1 Host Per Shop'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-foreground mb-3">
              {language === 'ja' ? 'No.1 ホスト' : 'No.1 Hosts'}
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
              {language === 'ja'
                ? '各店舗で公式ランキング1位を獲得したホストたち。歌舞伎町の頂点に立つスターを紹介します。'
                : 'The officially ranked #1 host from every shop. Meet the stars at the top of Kabukicho.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card-bg border border-card-border overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-black/5" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-black/5 rounded-full w-3/4" />
                  <div className="h-3 bg-black/5 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && hosts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <Crown className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
            <p>{language === 'ja'
              ? 'No.1 ホストデータがまだありません。スクレイピングスクリプトを実行してください。'
              : 'No No.1 host data yet. Run the scrape script first.'}</p>
          </div>
        )}

        {!loading && hosts.length > 0 && (
          <div className="space-y-12">
            {/* Featured: All No.1 hosts grid */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif text-foreground">
                    {language === 'ja' ? '全店舗 No.1 ホスト一覧' : 'All Shop No.1 Hosts'}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    {language === 'ja' ? `${Object.keys(groupedByShop).length} 店舗の1位ホスト` : `#1 hosts from ${Object.keys(groupedByShop).length} shops`}
                  </p>
                </div>
              </div>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {hosts.map((host, index) => (
                  <HostCard
                    key={host.id}
                    host={host}
                    rank={index + 1}
                    isFeatured={index === 0}
                  />
                ))}
              </motion.div>
            </div>

            {/* Grouped by shop */}
            {Object.entries(groupedByShop).map(([shopName, shopHosts]) => (
              <div key={shopName}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Store className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-foreground">{shopName}</h3>
                    <p className="text-[11px] text-zinc-500">
                      {shopHosts[0]?.shop?.group_name || ''}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shopHosts.map((host) => (
                    <Link
                      key={host.id}
                      href={`/host/${host.id}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-card-border hover:border-yellow-500/30 transition-all group"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'}
                          alt={host.name_ja}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 host-img"
                        />
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center">
                          <Crown className="w-3 h-3 text-background" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground font-serif truncate">{host.name_ja}</p>
                        <p className="text-[11px] text-accent truncate">{host.shop?.name_ja}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {host.rank_in_shop && Array.from({ length: Math.min(5, 6 - host.rank_in_shop) }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
