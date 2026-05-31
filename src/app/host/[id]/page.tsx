'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageSquare, Calendar, Ruler, Droplets } from 'lucide-react';
import Link from 'next/link';
import { Host, getHost, getHostsByShop, castVote } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { getEnglishName, looksLikeDate } from '@/lib/japanese';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export default function HostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { language, t } = useLanguage();
  const [host, setHost] = useState<Host | null>(null);
  const [relatedHosts, setRelatedHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getHost(id);
      if (data) {
        setHost(data);
        setVotes(data.votes_count || 0);
        if (data.shop_id) {
          const related = await getHostsByShop(data.shop_id, id);
          setRelatedHosts(related);
        }
      }
      setLoading(false);
    })();
  }, [id]);

  const handleVote = async () => {
    if (voted || voteLoading) return;
    setVoteLoading(true);
    let sessionId = sessionStorage.getItem('oshihost_session');
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now();
      sessionStorage.setItem('oshihost_session', sessionId);
    }
    const result = await castVote(id, sessionId);
    setVoteLoading(false);
    if (result.success) {
      setVoted(true);
      setVotes((v) => v + 1);
    } else if (result.message === 'already_voted') {
      setVoted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-24 bg-card-bg rounded-lg" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 aspect-[3/4] bg-card-bg rounded-2xl" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-card-bg rounded-full w-3/4" />
                <div className="h-4 bg-card-bg rounded-full w-1/2" />
                <div className="h-24 bg-card-bg rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!host) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">{language === 'ja' ? 'ホストが見つかりません' : 'Host not found'}</p>
        <Link href="/" className="text-rose-gold hover:underline text-sm">← {language === 'ja' ? 'トップに戻る' : 'Back to top'}</Link>
      </div>
    );
  }

  const name = language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en);
  const shopName = host.shop
    ? (language === 'ja' ? host.shop.name_ja : getEnglishName(host.shop.name_ja, host.shop.name_en))
    : '';
  const groupName = host.shop?.group
    ? (language === 'ja' ? host.shop.group.name_ja : getEnglishName(host.shop.group.name_ja, host.shop.group.name_en))
    : '';
  const rawBio = language === 'ja' ? host.bio_ja : (host.bio_en || host.bio_ja);
  const bio = rawBio?.includes('ホストクラブ紹介サイト') ? '' : rawBio;
  const images = host.image_urls?.length > 0 ? host.image_urls : [];
  const qaDataJa = host.qa_data;
  const qaDataEn = host.qa_data_en;
  const qaKeys = qaDataJa ? Object.keys(qaDataJa) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-rose-gold transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {language === 'ja' ? 'トップに戻る' : 'Back'}
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image gallery */}
          <div className="w-full sm:max-w-[300px]">
            <div className="relative rounded-2xl overflow-hidden bg-card-bg border border-card-border mb-3">
              <img
                key={selectedImage}
                src={images[selectedImage] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'}
                alt={name}
                className="w-full aspect-[3/4] object-cover object-top host-img"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'; }}
              />
              {host.votes_count !== undefined && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-sm text-dusty-pink font-semibold">
                  <Heart className="w-4 h-4" />
                  {votes.toLocaleString()}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                {images.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      i === selectedImage
                        ? 'border-rose-gold opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${name} ${i + 1}`}
                      className="w-16 h-20 object-cover object-top host-img"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Host info */}
          <div className="flex-1 space-y-6">
            <div>
              {groupName && (
                <p className="text-xs font-semibold text-neon-violet uppercase tracking-wider mb-1">{groupName}</p>
              )}
              {shopName && (
                <p className="text-sm text-rose-gold font-semibold mb-1">{shopName}</p>
              )}
              <h1 className="text-4xl sm:text-5xl font-black font-serif text-foreground leading-tight">{name}</h1>
            </div>

            {/* Bio */}
            {bio && (
              <p className="text-sm text-zinc-300 leading-relaxed">{bio}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              {host.height && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/5 px-3 py-1.5 rounded-full">
                  <Ruler className="w-3 h-3 text-zinc-500" />
                  {host.height}
                </span>
              )}
              {host.blood_type && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/5 px-3 py-1.5 rounded-full">
                  <Droplets className="w-3 h-3 text-zinc-500" />
                  {language === 'ja' ? `${host.blood_type}型` : `Type ${host.blood_type}`}
                </span>
              )}
              {host.birthday && looksLikeDate(host.birthday) && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/5 px-3 py-1.5 rounded-full">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {host.birthday}
                </span>
              )}
              {host.rank_in_shop && (
                <span className="text-xs text-zinc-400 bg-black/5 px-3 py-1.5 rounded-full">
                  {language === 'ja' ? `店舗内順位: ${host.rank_in_shop}位` : `Shop Rank: #${host.rank_in_shop}`}
                </span>
              )}
            </div>

            {/* SNS */}
            <div className="flex items-center gap-3">
              {host.instagram_url && (
                <a href={host.instagram_url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-black/5 hover:bg-rose-gold/20 border border-card-border flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400 hover:text-rose-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              )}
              {host.twitter_url && (
                <a href={host.twitter_url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-black/5 hover:bg-neon-violet/20 border border-card-border flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400 hover:text-neon-violet transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
              )}
              <Link
                href={`/host/${host.id}`}
                className="w-10 h-10 rounded-xl bg-black/5 hover:bg-dusty-pink/20 border border-card-border flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-zinc-400 hover:text-dusty-pink transition-colors" />
              </Link>
            </div>

            {/* Vote button */}
            <motion.button
              onClick={handleVote}
              disabled={voteLoading}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                voted
                  ? 'bg-rose-gold/10 text-rose-gold border border-rose-gold/30 cursor-default'
                  : 'bg-gradient-to-r from-rose-gold to-dusty-pink text-background hover:shadow-lg hover:shadow-rose-gold/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Heart className={`w-4 h-4 ${voted ? 'fill-rose-gold' : ''}`} />
              {voteLoading ? '...' : voted ? t('rank.voted') : t('rank.vote')}
            </motion.button>
          </div>
        </div>

        {/* Q&A Section */}
        {qaKeys.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold font-serif text-foreground mb-6">
              {language === 'ja' ? 'プロフィール' : 'Profile Q&A'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qaKeys.map((key) => {
                const jaAnswer = qaDataJa?.[key] || '';
                const en = qaDataEn?.[key];
                return (
                  <div key={key} className="rounded-xl bg-card-bg border border-card-border p-4">
                    <p className="text-[10px] font-semibold text-rose-gold uppercase tracking-wider mb-1">
                      {language === 'ja' ? key : (en?.q || key)}
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {language === 'ja' ? jaAnswer : (en?.a || jaAnswer)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Same-shop hosts */}
        {relatedHosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold font-serif text-foreground mb-6">
              {language === 'ja' ? '同じお店のホスト' : 'Same Shop Hosts'}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
              {relatedHosts.map((h) => {
                const hName = language === 'ja' ? h.name_ja : (h.name_en || h.name_ja);
                const hImg = h.image_urls?.[0] || '';
                return (
                  <Link
                    key={h.id}
                    href={`/host/${h.id}`}
                    className="snap-start shrink-0 group"
                  >
                    <div className="w-[130px] rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-rose-gold/30 transition-all duration-300">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={hImg}
                          alt={hName}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-bold font-serif text-foreground truncate group-hover:text-rose-gold transition-colors">{hName}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
