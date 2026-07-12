'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, ArrowLeft, Store, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Host, getNo1Hosts } from '@/lib/db';
import { HostCard } from '@/components/HostCard';
import { useLanguage } from '@/lib/LanguageContext';
import { getEnglishName } from '@/lib/japanese';

export default function No1HostPage() {
  const { language } = useLanguage();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNo1Hosts().then(data => { setHosts(data); setLoading(false); });
  }, []);

  const groupedByShop = hosts.reduce<Record<string, { shop: Host['shop']; hosts: Host[] }>>((acc, host) => {
    const shopId = host.shop_id;
    if (!acc[shopId]) acc[shopId] = { shop: host.shop, hosts: [] };
    acc[shopId].hosts.push(host);
    return acc;
  }, {});

  const shopEntries = Object.entries(groupedByShop);

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
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card-bg border border-card-border p-6 animate-pulse">
                <div className="h-6 bg-black/5 rounded-full w-48 mb-4" />
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-black/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-black/5 rounded-full w-32" />
                    <div className="h-3 bg-black/5 rounded-full w-24" />
                  </div>
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
          <>
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif text-foreground">
                    {language === 'ja' ? '全店舗 No.1 ホスト' : 'All Shop No.1 Hosts'}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    {language === 'ja' ? `${shopEntries.length} 店舗` : `${shopEntries.length} shops`}
                  </p>
                </div>
              </div>
            </div>

            {/* Shop sections */}
            <div className="space-y-6">
              {shopEntries.map(([shopId, { shop, hosts: shopHosts }], shopIndex) => {
                const shopName = language === 'ja'
                  ? (shop?.name_ja || '不明')
                  : getEnglishName(shop?.name_ja || '', shop?.name_en);
                const groupName = shop?.group_name || '';
                const host = shopHosts[0];

                return (
                  <motion.div
                    key={shopId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shopIndex * 0.03 }}
                  >
                    <Link
                      href={`/host/${host.id}`}
                      className="block rounded-2xl bg-card-bg border border-card-border hover:border-yellow-500/30 transition-all group overflow-hidden"
                    >
                      {/* Shop name header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-card-border bg-yellow-500/[0.03]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Store className="w-4 h-4 text-yellow-400" />
                          </div>
                          <div>
                            <h3 className="text-base font-black font-serif text-foreground group-hover:text-yellow-400 transition-colors">
                              {shopName}
                            </h3>
                            {groupName && (
                              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{groupName}</p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Host info */}
                      <div className="flex items-center gap-4 p-5">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'}
                            alt={host.name_ja}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 host-img"
                          />
                          <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center shadow-lg">
                            <Crown className="w-3.5 h-3.5 text-background" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">No.1</span>
                            <div className="h-px flex-1 bg-yellow-500/20" />
                          </div>
                          <p className="text-lg font-bold text-foreground font-serif truncate group-hover:text-yellow-400 transition-colors">
                            {host.name_ja}
                          </p>
                          {host.name_en && host.name_en !== host.name_ja && (
                            <p className="text-xs text-zinc-500 truncate">{host.name_en}</p>
                          )}
                          <div className="flex items-center gap-1.5 mt-1.5">
                            {host.rank_in_shop && Array.from({ length: Math.min(5, 6 - host.rank_in_shop) }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {host.height && (
                              <span className="text-[10px] text-zinc-500 ml-1">{host.height}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
