'use client';

import React, { useEffect, useRef, useState } from 'react';

function parseTikTokUrl(url: string): { type: 'video' | 'profile' | 'unknown'; username?: string; videoId?: string } {
  const clean = url.replace(/\/$/, '').split('?')[0];
  const videoMatch = clean.match(/tiktok\.com\/@([^/]+)\/video\/(\d+)/);
  const profileMatch = clean.match(/tiktok\.com\/@([^/]+)/);
  if (videoMatch) return { type: 'video', username: videoMatch[1], videoId: videoMatch[2] };
  if (profileMatch) return { type: 'profile', username: profileMatch[1] };
  return { type: 'unknown' };
}

export default function TikTokEmbed({ tiktokUrl, onUnavailable }: { tiktokUrl?: string; onUnavailable?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!tiktokUrl || !containerRef.current) return;

    let retries = 0;
    const maxRetries = 5;
    const tryLoad = () => {
      if ((window as any)?.tiktok?.refresh) {
        (window as any).tiktok.refresh(containerRef.current);
      } else {
        if (retries < maxRetries) {
          retries++;
          setTimeout(tryLoad, 1000 * retries);
        }
      }
    };

    // Load TikTok embed JS if not already loaded
    if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      script.onload = tryLoad;
      document.body.appendChild(script);
    } else {
      tryLoad();
    }

    // Use MutationObserver to detect unavailable profile
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        const text = containerRef.current.textContent || '';
        if (text.includes('not available') || text.includes('not found') || text.includes("couldn't find")) {
          setUnavailable(true);
          onUnavailable?.();
          observer.disconnect();
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true, characterData: true });
    }

    // Fallback timeout
    const checkTimer = setTimeout(() => {
      if (containerRef.current) {
        const text = containerRef.current.textContent || '';
        if (text.includes('not available') || text.includes('not found') || text.includes("couldn't find")) {
          setUnavailable(true);
          onUnavailable?.();
        }
      }
      observer.disconnect();
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(checkTimer);
    };
  }, [tiktokUrl, onUnavailable]);

  if (!tiktokUrl || unavailable) return null;

  const parsed = parseTikTokUrl(tiktokUrl);

  if (parsed.type === 'video' && parsed.videoId && parsed.username) {
    return (
      <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border">
        <div ref={containerRef} className="overflow-hidden max-w-full">
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@${parsed.username}/video/${parsed.videoId}`}
            data-video-id={parsed.videoId}
            style={{ maxWidth: '100%', width: 605, minWidth: 325 }}
          >
            <section>
              <a target="_blank" href={`https://www.tiktok.com/@${parsed.username}/video/${parsed.videoId}`}>
                @{parsed.username}
              </a>
            </section>
          </blockquote>
        </div>
      </div>
    );
  }

  if (parsed.type === 'profile' && parsed.username) {
    return (
      <div className="rounded-2xl overflow-hidden bg-card-bg border border-card-border">
        <div ref={containerRef} className="overflow-hidden max-w-full">
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@${parsed.username}`}
            data-unique-id={parsed.username}
            data-embed-type="creator"
            style={{ maxWidth: '100%', width: 780, minWidth: 320 }}
          >
            <section>
              <a target="_blank" href={`https://www.tiktok.com/@${parsed.username}`}>
                @{parsed.username}
              </a>
            </section>
          </blockquote>
        </div>
      </div>
    );
  }

  return null;
}
