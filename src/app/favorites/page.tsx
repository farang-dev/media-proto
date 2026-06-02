'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getFavoriteIds, removeFavorite } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { getEnglishName } from '@/lib/japanese';

type FavHost = {
  id: string;
  name_ja: string;
  name_en: string | null;
  image_urls: string[] | null;
  votes_count: number | null;
};

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { language, t } = useLanguage();
  const [hosts, setHosts] = useState<FavHost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }

    (async () => {
      const ids = await getFavoriteIds();
      if (ids.length === 0) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('hosts')
        .select('id, name_ja, name_en, image_urls, votes_count')
        .in('id', ids)
        .order('votes_count', { ascending: false });

      if (error) console.error('Error fetching favorites:', error.message);
      else setHosts(data || []);
      setLoading(false);
    })();
  }, [user, authLoading]);

  const handleRemove = async (hostId: string) => {
    const ok = await removeFavorite(hostId);
    if (ok) setHosts(prev => prev.filter(h => h.id !== hostId));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-card-bg rounded-lg" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-card-bg rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Bookmark className="w-12 h-12 text-zinc-500" />
        <p className="text-zinc-400">
          {language === 'ja' ? 'お気に入りを見るにはログインしてください' : 'Sign in to see your favorites'}
        </p>
        <a
          href="/auth"
          className="px-6 py-2 rounded-xl bg-accent text-background font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {language === 'ja' ? 'ログイン' : 'Sign In'}
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {language === 'ja' ? 'トップに戻る' : 'Back'}
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-foreground mb-6 sm:mb-8 flex items-center gap-3">
          <Bookmark className="w-7 h-7 text-accent" />
          {language === 'ja' ? 'お気に入り' : 'My Favorites'}
        </h1>

        {hosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Bookmark className="w-12 h-12 text-zinc-600" />
            <p className="text-zinc-400">
              {language === 'ja' ? 'まだお気に入りはありません' : 'No favorites yet'}
            </p>
            <p className="text-xs text-zinc-500">
              {language === 'ja' ? 'ホストカードのブックマークボタンから追加できます' : 'Bookmark hosts from their cards to see them here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hosts.map((host, i) => {
              const hName = language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en);
              const img = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
              return (
                <motion.div
                  key={host.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative"
                >
                  <Link href={`/host/${host.id}`} className="block">
                    <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/30 transition-all">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={img}
                          alt={hName}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 host-img"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                        {host.votes_count !== null && (
                          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs text-accent-light font-semibold">
                            <Heart className="w-3 h-3" />
                            {host.votes_count.toLocaleString()}
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-lg font-bold text-white font-serif leading-tight truncate drop-shadow-lg">
                            {hName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemove(host.id)}
                    className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/70 transition-all cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-white/70" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
