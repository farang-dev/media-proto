'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';
import { signOut } from '../lib/auth';
import { Globe, User, LogOut, Bookmark, Moon, Sun, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: '/blog', label: language === 'ja' ? 'ガイド' : 'Guides' },
    { href: '/clubs', label: language === 'ja' ? 'グループ' : 'Clubs' },
    { href: '/hos-match', label: language === 'ja' ? 'ホスマッチ' : 'Hos-Match', accent: true },
    { href: '/hos-tv', label: t('nav.hostv') },
    { href: '/events', label: language === 'ja' ? 'イベント' : 'Events' },
    { href: '/threads', label: t('nav.community') },
    { href: '/ranking', label: t('nav.rankings') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 text-lg">
            🥂
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider font-serif text-foreground">
              {language === 'ja' ? '推しホス' : 'OshiHos'}
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest -mt-1 font-sans">
              KABUKICHO HOST
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${l.accent ? 'text-accent hover:text-accent-light' : 'text-zinc-300 hover:text-accent'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-accent" />
            ) : (
              <Moon className="w-4 h-4 text-accent" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all text-xs font-semibold text-zinc-300 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="hidden sm:inline">{language === 'en' ? '日本語' : 'English'}</span>
          </button>

          {/* Auth */}
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all text-xs font-semibold text-zinc-300 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-accent" />
                <span className="max-w-20 sm:max-w-24 truncate">{user.email?.split('@')[0]}</span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-card-border rounded-xl shadow-xl z-20 py-2">
                    <a
                      href="/favorites"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-accent hover:bg-background transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                      {language === 'ja' ? 'お気に入り' : 'My Favorites'}
                    </a>
                    <hr className="border-card-border my-1" />
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
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
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg bg-accent text-background font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </a>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-card-border hover:border-accent/50 bg-card-bg/50 transition-all cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-accent" />
            ) : (
              <Menu className="w-4 h-4 text-accent" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-0 right-0 z-50 bg-card-bg border-b border-card-border shadow-xl md:hidden">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    l.accent
                      ? 'text-accent bg-accent/5 hover:bg-accent/10'
                      : 'text-zinc-300 hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
