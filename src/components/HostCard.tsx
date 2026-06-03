'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bookmark, Crown, Star, Heart, Music2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Host, castVote, addFavorite, removeFavorite, getFavoriteIds } from '../lib/db';
import { AuthPromptModal } from './AuthPromptModal';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { getEnglishName } from '../lib/japanese';

interface HostCardProps {
  host: Host;
  rank: number;
  onVote?: (hostId: string, newCount: number) => void;
  isFeatured?: boolean;
}

const rankColors: { [key: number]: string } = {
  1: 'from-yellow-400 via-amber-300 to-yellow-500',
  2: 'from-zinc-300 via-zinc-100 to-zinc-300',
  3: 'from-amber-700 via-amber-500 to-amber-700',
};

const rankBorderColors: { [key: number]: string } = {
  1: 'shadow-yellow-500/30',
  2: 'shadow-zinc-300/20',
  3: 'shadow-amber-600/20',
};

export const HostCard: React.FC<HostCardProps> = ({ host, rank, onVote, isFeatured }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [votes, setVotes] = useState(host.votes_count || 0);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [voteMsg, setVoteMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    getFavoriteIds().then(ids => setFavorited(ids.includes(host.id)));
  }, [user, host.id]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { setShowAuth(true); return; }
    if (favLoading) return;
    setFavLoading(true);
    if (favorited) {
      const ok = await removeFavorite(host.id);
      if (ok) setFavorited(false);
    } else {
      const ok = await addFavorite(host.id);
      if (ok) setFavorited(true);
    }
    setFavLoading(false);
  };

  const name = language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en);
  const rawBio = language === 'ja' ? host.bio_ja : (host.bio_en || host.bio_ja);
  const bio = rawBio?.includes('ホストクラブ紹介サイト') ? '' : rawBio;
  const shopName = host.shop
    ? (language === 'ja' ? host.shop.name_ja : getEnglishName(host.shop.name_ja, host.shop.name_en))
    : '';
  const mainImage = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { setShowAuth(true); return; }
    if (voted || loading) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    const result = await castVote(host.id, user.id);
    setLoading(false);
    if (result.success) {
      setVoted(true);
      setVotes((v) => v + 1);
      onVote?.(host.id, votes + 1);
    } else if (result.message === 'already_voted') {
      setVoted(true);
    } else if (result.message === 'daily_limit_reached') {
      setVoteMsg(t('rank.daily_limit'));
      setTimeout(() => setVoteMsg(''), 3000);
    }
  };

  const gradientClass = rankColors[rank] || 'from-accent via-accent-light to-accent-gold';
  const shadowClass = rankBorderColors[rank] || 'shadow-accent-gold/20';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-xl ${shadowClass} ${isFeatured ? 'ring-2 ring-accent/50' : ''}`}
    >
      <div className="block group cursor-pointer" onClick={() => router.push(`/host/${host.id}`)} role="link" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/host/${host.id}`); }}>
        {/* Gradient border glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-accent text-background text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Bookmark / Save button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
            isFeatured ? 'left-[calc(3rem+8px)]' : 'left-3'
          } ${favorited ? 'bg-accent text-background' : 'bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60'}`}
        >
          <Bookmark className={`w-4 h-4 ${favorited ? 'fill-background' : ''}`} />
        </button>

        {/* Rank badge */}
        <div className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg`}>
          {rank <= 3 ? (
            <Crown className="w-4 h-4 text-background" />
          ) : (
            <span className="text-background text-xs font-black">{rank}</span>
          )}
        </div>

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 host-img"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-0.5">{shopName}</p>
            <h3 className="text-xl font-bold text-white font-serif leading-tight">{name}</h3>
            {host.rank_in_shop && (
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: Math.min(5, 6 - host.rank_in_shop) }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          {bio && (
            <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">{bio}</p>
          )}

          <div className="flex items-center gap-3 mb-4">
            {host.height && (
              <span className="text-[11px] text-zinc-500 bg-black/5 px-2 py-0.5 rounded-full">{host.height}</span>
            )}
            {host.blood_type && (
              <span className="text-[11px] text-zinc-500 bg-black/5 px-2 py-0.5 rounded-full">Type {host.blood_type}</span>
            )}
            {host.birthday && (
              <span className="text-[11px] text-zinc-500 bg-black/5 px-2 py-0.5 rounded-full">{host.birthday}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
            {host.instagram_url && (
              <a href={host.instagram_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-black/5 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 text-zinc-400 hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            )}
            {host.twitter_url && (
              <a href={host.twitter_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-black/5 hover:bg-accent-gold/20 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 text-zinc-400 hover:text-accent-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            )}
            {host.tiktok_url && (
              <a href={host.tiktok_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-black/5 hover:bg-pink-400/20 flex items-center justify-center transition-colors">
                <Music2 className="w-3.5 h-3.5 text-zinc-400 hover:text-pink-400 transition-colors" />
              </a>
            )}
            {host.youtube_url && (
              <a href={host.youtube_url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-black/5 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 text-zinc-400 hover:text-red-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>
                </svg>
              </a>
            )}
            <div className="ml-auto text-xs text-zinc-500 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-accent-light" />
              <span className="font-semibold text-accent-light">{votes.toLocaleString()}</span>
              <span>{t('rank.votes')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vote Button */}
      <div className="px-4 pb-4">
        <motion.button
          onClick={handleVote}
          disabled={loading}
          animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
            ${voted
              ? 'bg-accent/10 text-accent border border-accent/30 cursor-default'
              : 'bg-gradient-to-r from-accent to-accent-light text-background hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
        >
          <Heart className={`w-4 h-4 ${voted ? 'fill-accent' : ''}`} />
          {loading ? '...' : voted ? t('rank.voted') : t('rank.vote')}
        </motion.button>

        {voteMsg && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-amber-400 text-center mt-2"
          >
            {voteMsg}
          </motion.p>
        )}
      </div>

      <AuthPromptModal open={showAuth} onClose={() => setShowAuth(false)} />
    </motion.div>
  );
};
