'use client';

import React from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm font-semibold text-zinc-300 hover:text-accent hover:border-accent/40 transition-all cursor-pointer"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}
