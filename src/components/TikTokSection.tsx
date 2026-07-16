'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink } from 'lucide-react';
import TikTokEmbed from './TikTokEmbed';
import { getTopHostWithTiktok } from '../lib/db';
import { getEnglishName } from '../lib/japanese';
import type { Host } from '../lib/db';

export const TikTokSection: React.FC = () => {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopHostWithTiktok().then((h) => {
      setHost(h);
      setLoading(false);
    });
  }, []);

  if (loading || !host?.tiktok_url) return null;

  const hostName = getEnglishName(host.name_ja, host.name_en);
  const shopName = host.shop?.name_ja;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-pink-500/20"
        >
          <Music2 className="w-3.5 h-3.5" />
          TikTok
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-foreground mb-3"
        >
          Top Host on TikTok
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
        >
          {hostName}{shopName ? ` from ${shopName}` : ''} — ranked #1 in Kabukicho.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="max-w-md mx-auto"
      >
        <TikTokEmbed tiktokUrl={host.tiktok_url} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="text-center mt-6"
      >
        <a
          href={host.tiktok_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors font-semibold"
        >
          Follow on TikTok
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
};
