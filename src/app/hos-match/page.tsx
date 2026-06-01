'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
import { Heart, X, LogIn, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Host, getAllHostsForMatching, addFavorite } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { getEnglishName } from '@/lib/japanese';

const SWIPE_THRESHOLD = 120;

export default function HosMatchPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [exitDir, setExitDir] = useState(0);

  useEffect(() => {
    getAllHostsForMatching().then((data) => {
      setHosts(data);
      setLoading(false);
    });
  }, []);

  const saveLike = useCallback(async (host: Host) => {
    if (user) {
      await addFavorite(host.id);
    } else {
      const stored = JSON.parse(localStorage.getItem('hosmatch_likes') || '[]');
      if (!stored.includes(host.id)) {
        stored.push(host.id);
        localStorage.setItem('hosmatch_likes', JSON.stringify(stored));
      }
      const next = likesCount + 1;
      setLikesCount(next);
      if (next >= 3) setShowSignup(true);
    }
  }, [user, likesCount]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleLike = useCallback((host: Host) => {
    saveLike(host);
    setExitDir(600);
    goNext();
  }, [saveLike, goNext]);

  const handleNope = useCallback(() => {
    setExitDir(-600);
    goNext();
  }, [goNext]);

  const handleExitComplete = useCallback(() => {
    setExitDir(0);
  }, []);

  const reset = () => {
    setCurrentIndex(0);
    setLikesCount(0);
    setShowSignup(false);
    setLoading(true);
    getAllHostsForMatching().then((data) => {
      setHosts(data);
      setLoading(false);
    });
  };

  const host = hosts[currentIndex] || null;

  return (
    <div style={{ height: '100dvh', background: 'var(--background)' }} className="flex flex-col overflow-hidden">
      {!user && likesCount > 0 && likesCount < 3 && (
        <div className="absolute top-2 right-3 z-10">
          <span className="text-[11px] text-zinc-400 font-medium">♥ {3 - likesCount}</span>
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col items-center px-2 pb-1">
        <div className="w-full max-w-[380px] flex-1 flex flex-col">
          {loading ? (
            <div className="flex-1 rounded-2xl bg-card-bg border border-card-border animate-pulse" />
          ) : (
            <>
              <AnimatePresence mode="popLayout" onExitComplete={handleExitComplete}>
                {host ? (
                  <MotionCard
                    key={host.id}
                    host={host}
                    language={language}
                    t={t}
                    exitDir={exitDir}
                    onLike={() => handleLike(host)}
                    onNope={handleNope}
                  />
                ) : (
                  <motion.div
                    key="empty"
                    className="flex-1 rounded-2xl bg-card-bg border border-card-border flex flex-col items-center justify-center gap-4 text-center p-8"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                  >
                    <Heart className="w-12 h-12 text-zinc-300" />
                    <p className="text-zinc-400 text-sm">{t('match.no_more')}</p>
                    <button
                      onClick={reset}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-gold to-dusty-pink text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer"
                    >
                      {t('match.reset')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {host && (
                <div className="shrink-0 flex items-center justify-center gap-6 py-2">
                  <div onPointerDown={(e) => e.stopPropagation()}>
                    <button
                      onClick={handleNope}
                      className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer"
                      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                      aria-label="Nope"
                    >
                      <X className="w-[18px] h-[18px] text-zinc-500" />
                    </button>
                  </div>
                  <div onPointerDown={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleLike(host)}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #f9738b 0%, #e84a6f 100%)',
                        boxShadow: '0 2px 12px rgba(232, 74, 111, 0.4)',
                      }}
                      aria-label="Like"
                    >
                      <Heart className="w-[18px] h-[18px] text-white fill-white" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSignup && !user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card-bg rounded-2xl border border-card-border p-8 max-w-sm w-full text-center space-y-5 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-gold to-dusty-pink flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-foreground">
                {t('match.signup_title')}
              </h2>
              <p className="text-sm text-zinc-600">{t('match.signup_text')}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-gold to-dusty-pink text-white font-bold text-sm hover:shadow-lg transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    {t('match.signup_cta')}
                  </span>
                </Link>
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-sm text-zinc-500 hover:text-foreground transition-colors cursor-pointer"
                >
                  {t('match.later')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MotionCard({
  host,
  language,
  onLike,
  onNope,
  t,
  exitDir,
}: {
  host: Host;
  language: string;
  onLike: () => void;
  onNope: () => void;
  t: (key: string) => string;
  exitDir: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-600, 0, 600], [-30, 0, 30]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

  const name = language === 'ja' ? host.name_ja : getEnglishName(host.name_ja, host.name_en);
  const displayShop = host.shop
    ? (language === 'ja' ? host.shop.name_ja : (host.shop.name_en || getEnglishName(host.shop.name_ja, host.shop.name_en)))
    : '';
  const imageUrl = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

  const handleDragEnd = useCallback((_: any, info: any) => {
    const offset = info.offset.x;
    if (Math.abs(offset) > SWIPE_THRESHOLD) {
      if (offset > 0) onLike();
      else onNope();
    } else {
      animate(x, 0, {
        type: 'spring', stiffness: 500, damping: 35
      });
    }
  }, [onLike, onNope, x]);

  return (
    <motion.div
      className="flex-1 min-h-0 relative rounded-2xl overflow-hidden bg-zinc-100"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.12)',
        x,
        rotate,
        maxHeight: '75vh',
      }}
      drag="x"
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.97 }}
      exit={{
        x: exitDir,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)' }}
      />

      <motion.div
        className="absolute top-8 right-6"
        style={{ opacity: likeOpacity, pointerEvents: 'none' }}
      >
        <div className="bg-green-500 rounded-xl px-4 py-2 -rotate-12 shadow-xl">
          <span className="text-white text-2xl font-black tracking-wider">{t('match.like')}</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-8 left-6"
        style={{ opacity: nopeOpacity, pointerEvents: 'none' }}
      >
        <div className="bg-red-500 rounded-xl px-4 py-2 rotate-12 shadow-xl">
          <span className="text-white text-2xl font-black tracking-wider">{t('match.nope')}</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-16">
        <h2 className="text-white font-bold text-xl leading-tight">{name}</h2>
        {displayShop && (
          <p className="text-white/80 text-sm font-medium mt-0.5">{displayShop}</p>
        )}
        {(host.height || host.blood_type) && (
          <div className="flex items-center gap-1.5 mt-1">
            {host.height && <span className="text-xs text-white/70">{host.height}</span>}
            {host.blood_type && <span className="text-xs text-white/70">{language === 'ja' ? `${host.blood_type}型` : `Type ${host.blood_type}`}</span>}
          </div>
        )}
      </div>

      <Link
        href={`/host/${host.id}`}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 text-[11px] text-white/60 hover:text-white transition-colors font-medium"
      >
        {t('match.view_profile')} →
      </Link>
    </motion.div>
  );
}
