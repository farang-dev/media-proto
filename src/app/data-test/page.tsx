'use client';

import React, { useEffect, useState } from 'react';
import { Store, Phone, Clock, Tag, Star, MessageCircle, Heart, MapPin, DollarSign, Camera } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ShopData {
  id: string;
  name_ja: string;
  name_en: string;
  address_ja: string;
  address_en: string;
  phone: string;
  hours: string;
  regular_holiday: string;
  description_ja: string;
  description_en: string;
  system_info_ja: string;
  system_info_en: string;
  image_urls: string[];
  logo_url: string;
  group: { name_ja: string; name_en: string } | null;
}

interface HostData {
  id: string;
  name_ja: string;
  name_en: string;
  line_id: string;
  type_tags: string[];
  ratings: Record<string, { filled: number; total: number }>;
  image_urls: string[];
  qa_data: Record<string, string>;
  qa_data_en: Record<string, { q: string; a: string }>;
  bio_ja: string;
  bio_en: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;
  shop: { name_ja: string; name_en: string } | null;
}

function StarRating({ filled, total }: { filled: number; total: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-3 h-3 rounded-sm ${i < filled ? 'bg-accent' : 'bg-zinc-200'}`} />
      ))}
    </div>
  );
}

export default function DataTestPage() {
  const [shops, setShops] = useState<ShopData[]>([]);
  const [hosts, setHosts] = useState<HostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: shopsRaw } = await supabase
        .from('shops')
        .select('*, group:groups(name_ja, name_en)')
        .not('system_info_ja', 'is', null)
        .limit(3);

      const { data: hostsRaw } = await supabase
        .from('hosts')
        .select('*, shop:shops(name_ja, name_en)')
        .not('type_tags', 'is', null)
        .limit(3);

      setShops(shopsRaw || []);
      setHosts(hostsRaw || []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-zinc-400">Loading live data from Supabase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold font-serif text-foreground">Live Data Preview</h1>
      <p className="text-sm text-zinc-400">
        {shops.length + hosts.length > 0
          ? `Showing ${shops.length} shops + ${hosts.length} hosts from Supabase — English fields used where available`
          : 'No scraped data yet. Run the GitHub Actions workflow first.'}
      </p>

      {shops.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-serif flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-accent" /> Shop Fields
          </h2>
          <div className="grid gap-6">
            {shops.map((shop) => (
              <div key={shop.id} className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
                {shop.image_urls && shop.image_urls.length > 0 && (
                  <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
                    {shop.image_urls.slice(0, 4).map((url, i) => (
                      <img key={i} src={url} alt="" className="h-28 w-auto rounded-xl object-cover border border-card-border" />
                    ))}
                  </div>
                )}
                <div className="p-4 space-y-3">
                  {shop.group && (
                    <p className="text-xs text-accent-gold font-semibold uppercase">
                      {shop.group.name_en || shop.group.name_ja}
                    </p>
                  )}
                  <h3 className="text-xl font-bold font-serif text-foreground">{shop.name_en || shop.name_ja}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {shop.address_en && (
                      <div className="flex items-start gap-2 text-zinc-400">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                        <span>{shop.address_en}</span>
                      </div>
                    )}
                    {shop.phone && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Phone className="w-4 h-4 shrink-0 text-accent" />
                        <span>{shop.phone}</span>
                      </div>
                    )}
                    {shop.hours && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock className="w-4 h-4 shrink-0 text-accent" />
                        <span>{shop.hours}</span>
                      </div>
                    )}
                    {shop.regular_holiday && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Heart className="w-4 h-4 shrink-0 text-accent-light" />
                        <span>Closed: {shop.regular_holiday}</span>
                      </div>
                    )}
                  </div>

                  {shop.description_en && (
                    <p className="text-sm text-zinc-500 leading-relaxed">{shop.description_en}</p>
                  )}
                  {!shop.description_en && shop.description_ja && (
                    <p className="text-sm text-zinc-500 leading-relaxed">{shop.description_ja}</p>
                  )}

                  {shop.system_info_en && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3" /> Pricing
                      </h4>
                      <div className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                        {shop.system_info_en}
                      </div>
                    </div>
                  )}
                  {!shop.system_info_en && shop.system_info_ja && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3" /> Pricing (JP)
                      </h4>
                      <div className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                        {shop.system_info_ja}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {hosts.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-serif flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-accent" /> Host Fields
          </h2>
          <div className="grid gap-6">
            {hosts.map((host) => (
              <div key={host.id} className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
                {host.image_urls && host.image_urls.length > 0 && (
                  <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
                    {host.image_urls.slice(0, 4).map((url, i) => (
                      <img key={i} src={url} alt="" className="h-28 w-auto rounded-xl object-cover border border-card-border" />
                    ))}
                  </div>
                )}
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-bold font-serif text-foreground">
                    {host.name_en || host.name_ja}
                    {host.shop && <span className="text-sm text-zinc-400 ml-2">@{host.shop.name_en || host.shop.name_ja}</span>}
                  </h3>

                  {host.type_tags && host.type_tags.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Tag className="w-3 h-3" /> Type Tags
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {host.type_tags.map((tag) => (
                          <span key={tag} className="text-[11px] bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {host.ratings && Object.keys(host.ratings).length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Star className="w-3 h-3" /> Ratings
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(host.ratings).map(([label, r]) => (
                          <div key={label} className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 w-24 shrink-0">{label}</span>
                            <StarRating filled={r.filled} total={r.total} />
                            <span className="text-[10px] text-zinc-400">{r.filled}/{r.total}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {host.line_id && (
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span className="text-zinc-500">LINE:</span>
                      <span className="text-foreground font-mono text-xs bg-black/5 px-2 py-0.5 rounded">{host.line_id}</span>
                    </div>
                  )}

                  {host.bio_en && (
                    <p className="text-sm text-zinc-500 leading-relaxed">{host.bio_en}</p>
                  )}
                  {!host.bio_en && host.bio_ja && (
                    <p className="text-sm text-zinc-500 leading-relaxed">{host.bio_ja}</p>
                  )}

                  {((host.qa_data_en && Object.keys(host.qa_data_en).length > 0) ||
                    (host.qa_data && Object.keys(host.qa_data).length > 0)) && (
                    <div>
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Camera className="w-3 h-3" /> Q&A
                      </h4>
                      <div className="space-y-1.5">
                        {(host.qa_data_en && Object.keys(host.qa_data_en).length > 0
                          ? Object.entries(host.qa_data_en)
                          : Object.entries(host.qa_data || {})
                        ).slice(0, 3).map(([key, val]) => {
                          const q = typeof val === 'object' ? (val as { q: string; a: string }).q : key;
                          const a = typeof val === 'object' ? (val as { q: string; a: string }).a : String(val);
                          return (
                            <div key={key} className="text-sm">
                              <span className="text-accent-gold font-medium">Q: {q}</span>
                              <span className="text-zinc-400"> — </span>
                              <span className="text-zinc-500">{a}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(host.instagram_url || host.twitter_url || host.tiktok_url) && (
                    <div className="flex gap-3 text-xs text-zinc-500">
                      {host.instagram_url && <span className="text-pink-400">📷 IG</span>}
                      {host.twitter_url && <span className="text-sky-400">𝕏</span>}
                      {host.tiktok_url && <span className="text-zinc-300">🎵</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {shops.length === 0 && hosts.length === 0 && (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-lg">No data found</p>
          <p className="text-sm mt-2">Run the scraper on GitHub Actions first:</p>
          <code className="text-xs bg-black/5 px-3 py-1.5 rounded mt-3 inline-block">
            gh workflow run scrape.yml --inputs mode=groups --repo farang-dev/media-proto
          </code>
        </div>
      )}

      <div className="text-center text-[10px] text-zinc-400 pb-8">
        Source: host2.jp — shown in English where translation exists
      </div>
    </div>
  );
}
