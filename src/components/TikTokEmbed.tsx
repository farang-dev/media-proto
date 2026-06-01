'use client';

import React from 'react';
import { Music2, ExternalLink } from 'lucide-react';

function parseTikTokUrl(url: string): { type: 'video' | 'profile' | 'unknown'; username?: string; videoId?: string } {
  const clean = url.replace(/\/$/, '').split('?')[0];
  const profileMatch = clean.match(/tiktok\.com\/@([^/]+)/);
  const videoMatch = clean.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (videoMatch) return { type: 'video', username: videoMatch[0].match(/@([^/]+)/)?.[1], videoId: videoMatch[1] };
  if (profileMatch) return { type: 'profile', username: profileMatch[1] };
  return { type: 'unknown' };
}

export default function TikTokEmbed({ tiktokUrl }: { tiktokUrl?: string }) {
  if (!tiktokUrl) return null;

  const parsed = parseTikTokUrl(tiktokUrl);

  if (parsed.type === 'video' && parsed.videoId) {
    return (
      <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-card-border">
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">TikTok</span>
          </div>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-accent transition-colors"
          >
            {parsed.username && <span>@{parsed.username}</span>}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="relative aspect-[9/16] bg-black">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${parsed.videoId}`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (parsed.type === 'profile' && parsed.username) {
    return (
      <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border">
          <Music2 className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-foreground">TikTok</span>
        </div>
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 hover:bg-black/5 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center shrink-0">
            <Music2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">@{parsed.username}</p>
            <p className="text-xs text-zinc-400">View TikTok Profile</p>
          </div>
          <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-accent transition-colors shrink-0" />
        </a>
      </div>
    );
  }

  return null;
}
