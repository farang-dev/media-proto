'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const AdBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full relative overflow-hidden rounded-2xl glass-premium p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-gold/20 shadow-2xl">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-neon-violet/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center border border-rose-gold/30 shrink-0">
          <Sparkles className="w-6 h-6 text-rose-gold" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-rose-gold uppercase tracking-widest bg-rose-gold/10 px-2.5 py-1 rounded-full">
            VIP Sponsorship
          </span>
          <h4 className="text-lg font-bold text-foreground mt-2 font-serif">
            {t('ads.vip_booking')}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            {t('ads.hiring')}
          </p>
        </div>
      </div>
      
      <a
        href="https://line.me"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-gold to-dusty-pink text-background font-bold text-sm tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-rose-gold/20"
      >
        <span>Connect via LINE</span>
        <ArrowUpRight className="w-4 h-4 text-background" />
      </a>
    </div>
  );
};
