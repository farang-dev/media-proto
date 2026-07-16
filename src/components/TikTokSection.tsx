'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink } from 'lucide-react';
import TikTokEmbed from './TikTokEmbed';
import { getTopHostsWithTiktok } from '../lib/db';
import { getEnglishName } from '../lib/japanese';
import type { Host } from '../lib/db';

export const TikTokSection: React.FC = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopHostsWithTiktok(3).then((h) => {
      setHosts(h);
      setLoading(false);
    });
  }, []);

  if (loading || hosts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
          Top Hosts on TikTok
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
        >
          Kabukicho&apos;s top-ranked hosts sharing their daily lives.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hosts.map((host, i) => {
          const hostName = getEnglishName(host.name_ja, host.name_en);
          const shopName = host.shop?.name_ja;
          return (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="space-y-3"
            >
              <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border">
                <TikTokEmbed tiktokUrl={host.tiktok_url} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold font-serif text-foreground">
                  {hostName}
                </p>
                {shopName && (
                  <p className="text-xs text-zinc-500">{shopName}</p>
                )}
                <a
                  href={host.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors font-semibold mt-1"
                >
                  Follow
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
