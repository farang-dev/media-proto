'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface AuthPromptModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ open, onClose }) => {
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-card-bg border border-card-border rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Bookmark className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold font-serif text-foreground mb-2">
              {language === 'ja' ? 'お気に入りに保存' : 'Save to Favorites'}
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              {language === 'ja'
                ? 'お気に入り機能を使うにはログインが必要です'
                : 'Sign in to bookmark your favorite hosts'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/auth"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-light text-background font-bold text-sm hover:opacity-90 transition-opacity text-center"
              >
                {language === 'ja' ? 'ログイン / 新規登録' : 'Sign In / Sign Up'}
              </a>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-card-border text-zinc-400 hover:text-zinc-200 text-sm font-semibold transition-colors cursor-pointer"
              >
                {language === 'ja' ? 'キャンセル' : 'Cancel'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
