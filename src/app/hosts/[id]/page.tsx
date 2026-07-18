import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Heart, Camera, MessageSquareShare, Ruler, Droplets, Cake, Award, Music2, Share2 } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import ImageGallery from '@/components/ImageGallery';
import { getHost, getHostsByShop } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import type { Host } from '@/lib/db';
import { getEnglishName, looksLikeDate } from '@/lib/japanese';
import TikTokEmbed from '@/components/TikTokEmbed';

export const dynamic = 'force-dynamic';

const SITE = 'https://www.oshi-hos.xyz';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const host = await getHost(id);
  if (!host) return {};

  const name = getEnglishName(host.name_ja, host.name_en);
  const shopName = host.shop?.name_ja || '';
  const shopNameEn = host.shop ? getEnglishName(host.shop.name_ja, host.shop.name_en) : '';
  const groupName = host.shop?.group ? getEnglishName(host.shop.group.name_ja, host.shop.group.name_en) : '';
  const desc = host.bio_ja
    ? host.bio_ja.slice(0, 160).replace(/\n/g, ' ')
    : `${name} — Kabukicho host at ${shopNameEn || shopName}. Profile, rankings, and social links.`;

  const title = shopNameEn
    ? `${name} — Kabukicho Host at ${shopNameEn}`
    : `${name} — Kabukicho Host${shopName ? ` at ${shopName}` : ''}`;

  const keywords = [
    `${host.name_ja} 歌舞伎町 ホスト`,
    `${host.name_ja} kabukicho host`,
    `${name} kabukicho host`,
    `${name} shinjuku host`,
    `${name} tokyo host`,
    shopNameEn ? `${shopNameEn} host` : '',
    shopNameEn ? `${shopNameEn} kabukicho` : '',
    groupName ? `${groupName} host` : '',
    '歌舞伎町 ホスト', 'kabukicho host', 'shinjuku host', 'tokyo host',
  ].filter(Boolean);

  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical: `/hosts/${host.id}` },
    openGraph: {
      title: `${name} — Kabukicho Host${shopNameEn ? ` at ${shopNameEn}` : ''}`,
      description: desc,
      url: `${SITE}/hosts/${host.id}`,
      images: host.image_urls?.[0] ? [{ url: host.image_urls[0], width: 600, height: 800, alt: name }] : undefined,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — Kabukicho Host${shopNameEn ? ` at ${shopNameEn}` : ''}`,
      description: desc,
      images: host.image_urls?.[0] ? [host.image_urls[0]] : undefined,
    },
  };
}

function normalizeBirthday(birthday: string | undefined): string {
  if (!birthday) return '';
  const cleaned = birthday.replace(/\(.*?\)/, '').trim();
  const m = cleaned.match(/(\d+)年(\d+)月(\d+)日/);
  if (m) return `${m[1]}/${m[2]}/${m[3]}`;
  const m2 = cleaned.match(/(\d+)月(\d+)日/);
  if (m2) return `${m2[1]}/${m2[2]}`;
  return cleaned;
}

function RankBadge({ rank, type }: { rank: number | null | undefined; type: string }) {
  if (rank == null) return null;
  const colors = ['text-yellow-400', 'text-zinc-300', 'text-amber-600', 'text-zinc-500', 'text-zinc-500'];
  const color = rank <= 3 ? colors[rank - 1] : 'text-zinc-500';
  return (
    <div className="flex items-center gap-1 text-xs">
      <Award className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-zinc-400">{type}</span>
      <span className={`font-bold ${color}`}>#{rank}</span>
    </div>
  );
}

export default async function HostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const host = await getHost(id);

  if (!host) notFound();

  // Increment view count (fire and forget)
  const { data: viewData } = await supabase.from('hosts').select('view_count').eq('id', id).single();
  if (viewData) {
    await supabase.from('hosts').update({ view_count: (viewData.view_count || 0) + 1 }).eq('id', id);
  }

  const shop = host.shop;
  const mainImage = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
  const otherImages = host.image_urls?.slice(1) || [];

  const sameShopHosts = await getHostsByShop(host.shop_id, host.id);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: host.name_ja,
    alternateName: host.name_en || undefined,
    url: `${SITE}/hosts/${host.id}`,
    image: host.image_urls?.[0] || undefined,
    worksFor: shop ? { '@type': 'Organization', name: shop.name_ja } : undefined,
    height: host.height || undefined,
    birthDate: host.birthday || undefined,
    sameAs: [
      host.instagram_url,
      host.twitter_url,
      host.tiktok_url,
      host.youtube_url,
    ].filter(Boolean),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Host Clubs', item: `${SITE}/clubs` },
      ...(shop ? [{ '@type': 'ListItem' as const, position: 3 as const, name: getEnglishName(shop.name_ja, shop.name_en), item: `${SITE}/clubs/${shop.id}` }] : []),
      { '@type': 'ListItem', position: shop ? 4 : 3, name: name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={shop ? `/clubs/${shop.id}` : '/clubs'}
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {shop ? `Back to ${shop.name_ja}` : 'Back to clubs'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image gallery */}
          <div className="lg:col-span-1 sm:max-w-[300px]">
            <ImageGallery images={[mainImage, ...otherImages]} name={host.name_ja} />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shop breadcrumb */}
            {shop && (
              <div>
                <Link
                  href={`/clubs/${shop.id}`}
                  className="text-xs font-semibold text-accent uppercase tracking-widest hover:underline"
                >
                  {shop.group?.name_ja && `${shop.group.name_ja} · `}{shop.name_ja}
                </Link>
              </div>
            )}

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-foreground">
                {host.name_ja}
              </h1>
              {host.name_en && host.name_en !== host.name_ja && (
                <p className="text-lg text-zinc-400 mt-1">{getEnglishName(host.name_ja, host.name_en)}</p>
              )}
            </div>

            {/* Rankings */}
            <div className="flex flex-wrap gap-4">
              {host.monthly_rank != null && (
                <RankBadge rank={host.monthly_rank} type="Monthly" />
              )}
              {host.weekly_rank != null && (
                <RankBadge rank={host.weekly_rank} type="Weekly" />
              )}
              {host.daily_rank != null && (
                <RankBadge rank={host.daily_rank} type="Daily" />
              )}
              {host.rank_in_shop != null && (
                <RankBadge rank={host.rank_in_shop} type="Shop" />
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {host.birthday && looksLikeDate(host.birthday) && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <Cake className="w-4 h-4 text-accent mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Birthday</p>
                  <p className="text-sm font-semibold mt-0.5">{normalizeBirthday(host.birthday)}</p>
                </div>
              )}
              {host.height && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <Ruler className="w-4 h-4 text-accent mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Height</p>
                  <p className="text-sm font-semibold mt-0.5">{host.height}</p>
                </div>
              )}
              {host.blood_type && host.blood_type !== '?' && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <Droplets className="w-4 h-4 text-accent mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Blood Type</p>
                  <p className="text-sm font-semibold mt-0.5">{host.blood_type}</p>
                </div>
              )}
              <div className="bg-card-bg border border-card-border rounded-xl p-4">
                <Heart className="w-4 h-4 text-accent-light mb-1" />
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Votes</p>
                <p className="text-sm font-semibold mt-0.5">{(host.votes_count || 0).toLocaleString()}</p>
              </div>
            </div>

            {/* Bio */}
            {host.bio_ja && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-5">
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{host.bio_ja}</p>
              </div>
            )}

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-2">
              {host.instagram_url && (
                <a
                  href={host.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Camera className="w-4 h-4" />
                  Instagram
                </a>
              )}
              {host.twitter_url && (
                <a
                  href={host.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-sm font-semibold hover:bg-zinc-600 transition-colors"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  {host.twitter_url.includes('x.com') ? 'X' : 'Twitter'}
                </a>
              )}
              {host.tiktok_url && (
                <a
                  href={host.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-sm font-semibold hover:bg-pink-500 hover:text-white transition-colors"
                >
                  <Music2 className="w-4 h-4" />
                  TikTok
                </a>
              )}
              {host.youtube_url && (
                <a
                  href={host.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>
                  </svg>
                  YouTube
                </a>
              )}
              <ShareButton
                title={`${host.name_ja} — OshiHos`}
                url={`https://www.oshi-hos.xyz/hosts/${host.id}`}
              />
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        {host.qa_data && Object.keys(host.qa_data).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
              Profile Q&A
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(host.qa_data).map(([key, answer]) => {
                const en = host.qa_data_en?.[key];
                return (
                  <div key={key} className="rounded-xl bg-card-bg border border-card-border p-4">
                    <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-sm text-foreground font-medium">{answer}</p>
                    {en && (
                      <div className="mt-2 pt-2 border-t border-card-border">
                        <p className="text-[10px] text-zinc-500">{en.q}</p>
                        <p className="text-xs text-zinc-400 italic">{en.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TikTok Section */}
        {host.tiktok_url && (
          <div className="mt-16 max-w-md">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
              <div className="flex items-center gap-2">
                <Music2 className="w-5 h-5 text-pink-400" />
                <span>TikTok Videos</span>
              </div>
            </h2>
            <TikTokEmbed tiktokUrl={host.tiktok_url} />
          </div>
        )}

        {/* Same shop hosts */}
        {sameShopHosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
              Other Hosts at {shop ? getEnglishName(shop.name_ja, shop.name_en) : 'this club'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sameShopHosts.map((h) => {
                const hName = getEnglishName(h.name_ja, h.name_en);
                return (
                  <Link
                    key={h.id}
                    href={`/hosts/${h.id}`}
                    className="rounded-2xl bg-card-bg border border-card-border overflow-hidden hover:border-accent/30 transition-all group"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={h.image_urls?.[0] || mainImage}
                        alt={hName}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 host-img"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-lg font-bold text-white font-serif leading-tight truncate">
                          {hName}
                        </p>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {h.height && <span>{h.height}</span>}
                        {h.height && h.blood_type && h.blood_type !== '?' && <span>·</span>}
                        {h.blood_type && h.blood_type !== '?' && <span>Type {h.blood_type}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  );
}
