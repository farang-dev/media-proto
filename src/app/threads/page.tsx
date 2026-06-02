'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Send, Clock, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Thread, Comment, getThreads, createThread, getComments, addComment } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

function ThreadCard({ thread }: { thread: Thread }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [posting, setPosting] = useState(false);

  const loadComments = async () => {
    if (loading) return;
    setLoading(true);
    const data = await getComments(thread.id);
    setComments(data);
    setLoading(false);
  };

  const handleToggle = () => {
    setOpen((prev) => {
      if (!prev && comments.length === 0) loadComments();
      return !prev;
    });
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || posting) return;
    setPosting(true);
    const comment = await addComment(thread.id, content.trim(), userName.trim() || undefined);
    if (comment) {
      setComments((prev) => [...prev, comment]);
      setContent('');
    }
    setPosting(false);
  };

  return (
    <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden transition-all duration-300 hover:border-accent/30">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer group"
      >
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug truncate pr-4">
              {thread.title}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {formatDate(thread.created_at)}
              </span>
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <MessageSquare className="w-2.5 h-2.5" />
                {thread.comments_count || 0} replies
              </span>
            </div>
          </div>
        </div>
        <div className="text-zinc-500 group-hover:text-accent transition-colors shrink-0">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-card-border"
          >
            <div className="px-5 pt-4 pb-2 space-y-3 max-h-72 overflow-y-auto">
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                </div>
              )}
              {!loading && comments.length === 0 && (
                <p className="text-xs text-zinc-500 py-3 text-center">No replies yet. Start the conversation.</p>
              )}
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-light to-accent-gold flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                    {(c.user_name || 'A')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-accent-light">{c.user_name || t('community.anonymous')}</span>
                      <span className="text-[9px] text-zinc-500">{formatDate(c.created_at)}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed break-words">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handlePost} className="px-5 pb-4 pt-3 border-t border-card-border/50 space-y-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={`Your name (optional, default: ${t('community.anonymous')})`}
                className="w-full bg-black/[0.03] border border-card-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-zinc-500 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('community.comment_placeholder')}
                  className="flex-1 bg-black/[0.03] border border-card-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-zinc-500 focus:outline-none focus:border-accent/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={posting || !content.trim()}
                  className="px-3 py-2 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  {t('community.comment_submit')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ThreadsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getThreads().then((data) => {
      setThreads(data);
      setLoading(false);
    });
  }, []);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || creating) return;
    setCreating(true);
    const thread = await createThread(newTitle.trim());
    if (thread) {
      setThreads((prev) => [{ ...thread, comments_count: 0 }, ...prev]);
      setNewTitle('');
      setShowNewThread(false);
    }
    setCreating(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('nav.home')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
            {t('community.title')}
          </h1>
          <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
            {t('community.subtitle')}
          </p>
        </div>

        {/* New thread — signed-in users only */}
        {user ? (
          <div className="mb-6">
            <AnimatePresence>
              {!showNewThread ? (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowNewThread(true)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-card-border hover:border-accent/40 bg-card-bg hover:bg-accent/5 transition-all text-zinc-500 hover:text-accent cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">{t('community.create_thread')}</span>
                </motion.button>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleCreateThread}
                  className="rounded-2xl bg-card-bg border border-accent/30 p-5 space-y-3"
                >
                  <p className="text-sm font-bold text-foreground">{t('community.create_thread')}</p>
                  <input
                    autoFocus
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t('community.thread_title_placeholder')}
                    className="w-full bg-black/[0.03] border border-card-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-zinc-500 focus:outline-none focus:border-accent/60 transition-colors"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowNewThread(false)}
                      className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating || !newTitle.trim()}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer"
                    >
                      {creating ? 'Creating...' : t('community.post')}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-2xl bg-card-bg border border-card-border text-center">
            <p className="text-sm text-muted-foreground">
              <a href="/auth" className="text-accent hover:text-accent-light underline underline-offset-2">
                Sign in
              </a>
              {' '}to start a discussion.
            </p>
          </div>
        )}

        {/* Thread list */}
        <div className="space-y-3">
          {loading && (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-card-bg border border-card-border animate-pulse" />
            ))
          )}
          {!loading && threads.length === 0 && (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
              <p className="text-sm text-zinc-500">{t('community.create_thread')}</p>
            </div>
          )}
          {threads.map((thread) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ThreadCard thread={thread} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
