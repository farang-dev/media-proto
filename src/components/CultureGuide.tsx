'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Book, CreditCard, Utensils, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const guideCards = [
  { icon: Book, key: 'card1', color: 'from-accent to-accent-light', shadowColor: 'shadow-accent/20' },
  { icon: ShieldCheck, key: 'card2', color: 'from-accent-gold to-accent', shadowColor: 'shadow-accent-gold/20' },
  { icon: CreditCard, key: 'card3', color: 'from-emerald-400 to-teal-500', shadowColor: 'shadow-emerald-400/20' },
  { icon: Utensils, key: 'card4', color: 'from-accent-light to-accent-gold', shadowColor: 'shadow-accent-light/20' },
];

export const CultureGuide: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="guide" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent-gold/10 text-accent-gold text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-accent-gold/20"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe Play Guide
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-serif text-foreground mb-3"
          >
            {t('guide.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed"
          >
            {t('guide.subtitle')}
          </motion.p>
        </div>

        {/* Guide cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideCards.map(({ icon: Icon, key, color, shadowColor }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl glass-premium p-7 border border-card-border hover:border-foreground/10 transition-all duration-500 shadow-xl ${shadowColor} overflow-hidden`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl`} />

              {/* Icon */}
              <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${color} items-center justify-center mb-5 shadow-lg ${shadowColor}`}>
                <Icon className="w-6 h-6 text-background" />
              </div>

              <h3 className="text-lg font-bold text-foreground font-serif mb-3">
                {t(`guide.${key}.title`)}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t(`guide.${key}.desc`)}
              </p>

              {/* Decorative arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-zinc-600 group-hover:text-zinc-400 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-emerald-900/30 via-emerald-900/10 to-transparent border border-emerald-500/20 p-6 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-300 mb-0.5">2026 Safety Certified</p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
              All clubs listed on OshiHost follow the 2026 Clean Payment Regulations. No urikake (credit billing), no hidden charges. Enjoy safely with transparent, on-site card payments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
