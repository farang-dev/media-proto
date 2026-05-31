import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Heart, Camera, MessageSquareShare, Ruler, Droplets, Cake, Award } from 'lucide-react';
import { getHost, getHostsByShop } from '@/lib/db';
import type { Host } from '@/lib/db';
import { getEnglishName, looksLikeDate } from '@/lib/japanese';

export const dynamic = 'force-dynamic';

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

  const shop = host.shop;
  const mainImage = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
  const otherImages = host.image_urls?.slice(1) || [];

  const sameShopHosts = await getHostsByShop(host.shop_id, host.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={shop ? `/clubs/${shop.id}` : '/clubs'}
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-rose-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {shop ? `Back to ${shop.name_ja}` : 'Back to clubs'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image gallery */}
          <div className="lg:col-span-1 sm:max-w-[300px]">
            <div className="rounded-2xl overflow-hidden border border-card-border bg-card-bg">
              <div className="aspect-[3/4] relative">
                <img
                  src={mainImage}
                  alt={host.name_ja}
                  className="w-full h-full object-cover object-top host-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
              {otherImages.length > 0 && (
                <div className="grid grid-cols-4 gap-1 p-2">
                  {otherImages.map((url, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-background">
                      <img src={url} alt="" className="w-full h-full object-cover host-img" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shop breadcrumb */}
            {shop && (
              <div>
                <Link
                  href={`/clubs/${shop.id}`}
                  className="text-xs font-semibold text-rose-gold uppercase tracking-widest hover:underline"
                >
                  {shop.group?.name_ja && `${shop.group.name_ja} · `}{shop.name_ja}
                </Link>
              </div>
            )}

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-gold-gradient">
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
                  <Cake className="w-4 h-4 text-rose-gold mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Birthday</p>
                  <p className="text-sm font-semibold mt-0.5">{normalizeBirthday(host.birthday)}</p>
                </div>
              )}
              {host.height && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <Ruler className="w-4 h-4 text-rose-gold mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Height</p>
                  <p className="text-sm font-semibold mt-0.5">{host.height}</p>
                </div>
              )}
              {host.blood_type && host.blood_type !== '?' && (
                <div className="bg-card-bg border border-card-border rounded-xl p-4">
                  <Droplets className="w-4 h-4 text-rose-gold mb-1" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Blood Type</p>
                  <p className="text-sm font-semibold mt-0.5">{host.blood_type}</p>
                </div>
              )}
              <div className="bg-card-bg border border-card-border rounded-xl p-4">
                <Heart className="w-4 h-4 text-dusty-pink mb-1" />
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
            <div className="flex gap-3">
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
                  {host.twitter_url.includes('x.com') ? 'X (Twitter)' : 'Twitter'}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        {host.qa_data && Object.keys(host.qa_data).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-serif text-gold-gradient mb-6">
              Profile Q&A
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(host.qa_data).map(([key, answer]) => {
                const en = host.qa_data_en?.[key];
                return (
                  <div key={key} className="rounded-xl bg-card-bg border border-card-border p-4">
                    <p className="text-[10px] font-semibold text-rose-gold uppercase tracking-wider mb-1">{key}</p>
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

        {/* Same shop hosts */}
        {sameShopHosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold font-serif text-gold-gradient mb-6">
              Other Hosts at {shop ? getEnglishName(shop.name_ja, shop.name_en) : 'this club'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sameShopHosts.map((h) => {
                const hName = getEnglishName(h.name_ja, h.name_en);
                return (
                  <Link
                    key={h.id}
                    href={`/hosts/${h.id}`}
                    className="rounded-2xl bg-card-bg border border-card-border overflow-hidden hover:border-rose-gold/30 transition-all group"
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
  );
}
