'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Send, UserCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { getHostComments, addHostComment, deleteHostComment, getShopComments, addShopComment, deleteShopComment } from '@/lib/db';
import type { HostComment, ShopComment } from '@/lib/db';

type Comment = (HostComment | ShopComment) & { type: 'host' | 'shop' };

interface Props {
  type: 'host' | 'shop';
  targetId: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function CommentSection({ type, targetId }: Props) {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  const getter = type === 'host' ? getHostComments : getShopComments;
  const adder = type === 'host' ? addHostComment : addShopComment;
  const deleter = type === 'host' ? deleteHostComment : deleteShopComment;

  const load = async () => {
    const data = await getter(targetId);
    setComments((data || []).map((c: any) => ({ ...c, type })));
    setLoading(false);
  };

  useEffect(() => { load(); }, [targetId]);

  const handleSubmit = async () => {
    if (!text.trim() || posting || !user) return;
    setPosting(true);
    const result = await adder(targetId, text.trim());
    if (result) {
      setText('');
      await load();
    }
    setPosting(false);
  };

  const handleDelete = async (id: string) => {
    await deleter(id);
    await load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold font-serif text-foreground mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-accent" />
        {language === 'ja' ? 'コメント' : 'Comments'}
        {!loading && <span className="text-sm font-normal text-zinc-400">({comments.length})</span>}
      </h2>

      {user ? (
        <div className="flex gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-accent">
              {(user.email?.[0] || user.id[0]).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={language === 'ja' ? 'コメントを書く…' : 'Write a comment…'}
              rows={3}
              className="w-full bg-card-bg border border-card-border rounded-xl p-3 text-sm text-foreground placeholder-zinc-500 resize-none outline-none focus:border-accent/50 transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!text.trim() || posting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-xs font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {posting ? '...' : (language === 'ja' ? '投稿' : 'Post')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-xl bg-card-bg border border-card-border text-center">
          <p className="text-sm text-zinc-400">
            {language === 'ja'
              ? 'コメントするにはサインインしてください'
              : 'Sign in to leave a comment'}
          </p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-3">
              <div className="w-9 h-9 rounded-full bg-card-bg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-card-bg rounded" />
                <div className="h-12 bg-card-bg rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-zinc-500 text-center py-8">
          {language === 'ja' ? 'まだコメントはありません' : 'No comments yet'}
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent-gold">
                  {(c.display_name?.[0] || '?').toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">{c.display_name || 'Anonymous'}</span>
                  <span className="text-[10px] text-zinc-500">{formatDate(c.created_at)}</span>
                  {user && c.user_id === user.id && (
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="ml-auto text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
