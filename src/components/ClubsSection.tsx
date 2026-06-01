'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Users, ChevronRight } from 'lucide-react';
import { GroupClub, getGroupClubs } from '../lib/db';
import { useLanguage } from '../lib/LanguageContext';
import { getEnglishName } from '../lib/japanese';

interface ExtraGroup {
  description_ja?: string;
  description_en?: string;
  image_urls?: string[];
}

const groupGradients: Record<string, string> = {
  'groupdandy': 'from-violet-600 to-fuchsia-700',
  'Smappa!': 'from-amber-500 to-rose-600',
  'ACQUA': 'from-cyan-500 to-blue-600',
  'AIR': 'from-sky-400 to-indigo-600',
  '冬月グループ': 'from-emerald-500 to-teal-600',
  "L's collection": 'from-pink-500 to-rose-700',
  'PRIMAVERA': 'from-orange-500 to-red-600',
};

function getGroupGradient(name: string): string {
  for (const [key, gradient] of Object.entries(groupGradients)) {
    if (name.includes(key) || key.includes(name)) return gradient;
  }
  return 'from-accent to-accent-gold';
}

export const ClubsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [groups, setGroups] = useState<GroupClub[]>([]);
  const [extra, setExtra] = useState<Record<string, ExtraGroup>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getGroupClubs(),
      fetch('/api/groups-extra').then(r => r.json()).catch(() => ({})),
    ]).then(([groupData, extraData]) => {
      setGroups(groupData);
      setExtra(extraData);
      setLoading(false);
    });
  }, []);

  const handleBrowse = (groupName: string) => {
    window.location.href = `/clubs`;
  };

  if (!loading && groups.length === 0) return null;

  return (
    <section id="clubs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black font-serif text-foreground mb-3"
        >
          {t('clubs.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed"
        >
          {t('clubs.subtitle')}
        </motion.p>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="min-w-[220px] sm:min-w-[260px] h-72 rounded-2xl bg-card-bg border border-card-border animate-pulse shrink-0" />
          ))}
        </div>
      ) : (
        <div
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {groups.map((group, index) => {
            const name = language === 'ja' ? group.name_ja : getEnglishName(group.name_ja, group.name_en);
            const gradient = getGroupGradient(name);
            const extraGroup = extra[group.name_ja] || {};
            const prImage = extraGroup.image_urls?.find(u => u.includes('pr_img')) || extraGroup.image_urls?.[0] || '';
            const descEn = extraGroup.description_en || '';
            const descJa = group.description_ja || extraGroup.description_ja || '';
            const description = language === 'ja' ? descJa : (descEn || descJa);

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="min-w-[220px] sm:min-w-[260px] shrink-0"
              >
                <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden hover:border-accent/40 transition-all duration-300 h-full group cursor-pointer" onClick={() => handleBrowse(name)}>
                  {/* Card image hero */}
                  <div className="relative h-52 overflow-hidden">
                    {prImage ? (
                      <img
                        src={prImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Logo watermark */}
                    {group.logo_url && (
                      <img
                        src={group.logo_url}
                        alt=""
                        className="absolute top-3 right-3 w-12 h-12 object-contain opacity-50"
                      />
                    )}

                    {/* Content on image */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                      <h3 className="text-xl font-bold font-serif text-white leading-tight drop-shadow-lg mb-1">
                        {name}
                      </h3>
                      {/* Stats inline */}
                      <div className="flex items-center gap-3 text-[10px] text-white/60">
                        <span className="flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          {group.shops_count} {t('clubs.shops')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {group.hosts_count} {t('clubs.hosts')}
                        </span>
                      </div>
                      {description && (
                        <p className="text-[11px] text-white/80 leading-relaxed line-clamp-2 mt-2 drop-shadow">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom section: host avatars + shop tags */}
                  <div className="p-4 space-y-3">
                    {/* Host face avatars */}
                    {(() => {
                      const hostSamples = group.shops.flatMap(s => s.hosts_sample).filter(h => h.image_urls?.[0]);
                      if (hostSamples.length === 0) return null;
                      return (
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {hostSamples.slice(0, 5).map((host) => (
                              <div key={host.id} className="w-7 h-7 rounded-full border-2 border-card-bg overflow-hidden shrink-0 shadow-sm">
                                <img
                                  src={host.image_urls?.[0]}
                                  alt={language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en)}
                                  className="w-full h-full object-cover host-img"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                            {hostSamples.length > 5 && (
                              <div className="w-7 h-7 rounded-full border-2 border-card-bg bg-zinc-200 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-bold text-zinc-500">+{hostSamples.length - 5}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Shop tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {group.shops.slice(0, 6).map((shop) => {
                        const shopName = language === 'ja' ? shop.name_ja : getEnglishName(shop.name_ja, shop.name_en);
                        return (
                          <span key={shop.id} className="text-[10px] bg-black/5 text-zinc-500 px-2 py-1 rounded-full border border-card-border truncate max-w-[120px]">
                            {shopName}
                          </span>
                        );
                      })}
                      {group.shops.length > 6 && (
                        <span className="text-[10px] text-zinc-400 px-2 py-1">
                          +{group.shops.length - 6} more
                        </span>
                      )}
                    </div>

                    {/* Browse button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleBrowse(name); }}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-accent/10 to-accent-light/10 hover:from-accent/20 hover:to-accent-light/20 border border-accent/20 text-xs font-semibold text-accent transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {t('clubs.view_hosts')}
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-10">
        <a
          href="/clubs"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent/10 to-accent-light/10 hover:from-accent/20 hover:to-accent-light/20 border border-accent/20 text-sm font-semibold text-accent transition-all"
        >
          {language === 'ja' ? 'すべてのグループを見る' : 'View All Clubs'}
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
