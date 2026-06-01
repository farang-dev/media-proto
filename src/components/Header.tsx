'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { signOut } from '../lib/auth';
import { Sparkles, Globe, Store, Award, User, LogOut, BookOpen, Bookmark, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider font-serif text-foreground">
              {language === 'ja' ? '推しホス' : 'OshiHost'}
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest -mt-1 font-sans">
              Kabukicho Edition
            </p>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="/blog" className="text-sm font-medium text-zinc-300 hover:text-accent transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {language === 'ja' ? 'ガイド' : 'Guides'}
          </a>
          <a href="/clubs" className="text-sm font-medium text-zinc-300 hover:text-accent transition-colors flex items-center gap-2">
            <Store className="w-4 h-4" />
            {language === 'ja' ? 'グループ' : 'Clubs'}
          </a>
          <a href="/hos-match" className="text-sm font-medium text-accent hover:text-accent-light transition-colors flex items-center gap-2">
            <Heart className="w-4 h-4" />
            {language === 'ja' ? 'ホスマッチ' : 'Hos-Match'}
          </a>
          <Link href="/ranking" className="text-sm font-medium text-zinc-300 hover:text-accent transition-colors flex items-center gap-2">
            <Award className="w-4 h-4" />
            {t('nav.rankings')}
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all text-xs font-semibold text-zinc-300 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>{language === 'en' ? '日本語' : 'English'}</span>
          </button>

          {/* Auth */}
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all text-xs font-semibold text-zinc-300 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-accent" />
                <span className="max-w-24 truncate">{user.email?.split('@')[0]}</span>
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-card-border rounded-xl shadow-xl z-20 py-2">
                    <a
                      href="/favorites"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-accent hover:bg-background transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                      {language === 'ja' ? 'お気に入り' : 'My Favorites'}
                    </a>
                    <hr className="border-card-border my-1" />
                    <button
                      onClick={() => { signOut(); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-red-400 hover:bg-background transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'ja' ? 'ログアウト' : 'Sign Out'}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <a
              href="/auth"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent text-background font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </a>
          )}
        </div>

      </div>
    </header>
  );
};
