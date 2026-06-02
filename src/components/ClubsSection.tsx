'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { GroupClub, getGroupClubs } from '../lib/db';
import { useLanguage } from '../lib/LanguageContext';
import { getEnglishName } from '../lib/japanese';

interface ExtraGroup {
  description_ja?: string;
  description_en?: string;
  image_urls?: string[];
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
      // Sort: Fuyutsuki (冬月グループHOLDINGS) first, then rest by name
      const sorted = [...groupData].sort((a, b) => {
        if (a.name_ja === '冬月グループHOLDINGS') return -1;
        if (b.name_ja === '冬月グループHOLDINGS') return 1;
        return a.name_ja.localeCompare(b.name_ja, 'ja');
      });
      setGroups(sorted);
      setExtra(extraData);
      setLoading(false);
    });
  }, []);

  if (!loading && groups.length === 0) return null;

  return (
    <section id="clubs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black font-serif text-foreground mb-3"
        >
          {t('clubs.title')}
        </motion.h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {t('clubs.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-card-bg border border-card-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {groups.map((group, index) => {
            const name = language === 'ja' ? group.name_ja : getEnglishName(group.name_ja, group.name_en);
            const extraGroup = extra[group.id] || extra[group.name_ja] || {};
            const coverImage = group.image_urls?.find(u => u.includes('pr_img')) || group.image_urls?.[0] || extraGroup.image_urls?.find(u => u.includes('pr_img')) || extraGroup.image_urls?.[0] || group.logo_url || '';
            const descEn = group.description_en || extraGroup.description_en || '';
            const descJa = group.description_ja || extraGroup.description_ja || '';
            const description = language === 'ja' ? descJa : (descEn || descJa);

            return (
              <motion.a
                key={group.id}
                href="/clubs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative block rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/40 transition-all duration-300 group h-40 sm:h-48"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />

                <div className="relative z-10 h-full flex items-center px-6 sm:px-8">
                  <div className="max-w-2xl">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-1 drop-shadow-lg">
                      {name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/60 mb-2">
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
                      <p className="text-sm text-white/80 leading-relaxed drop-shadow max-w-xl">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-white/80 transition-colors hidden sm:block">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.a>
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
