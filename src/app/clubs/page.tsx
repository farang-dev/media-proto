import React from 'react';
import Link from 'next/link';
import { Store, Users } from 'lucide-react';
import { getGroupClubs, GroupClub } from '@/lib/db';
import { getEnglishName } from '@/lib/japanese';
import groupsExtra from '@/data/groups-extra.json';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kabukicho Host Clubs — Complete Guide to All Clubs in Shinjuku',
  description: 'Browse all host clubs in Kabukicho — 6 major groups, 600+ shops, and 113 clubs in Shinjuku\'s legendary nightlife district. Find the best host clubs in Tokyo.',
  keywords: [
    'kabukicho host club', 'host club shinjuku', 'host clubs tokyo',
    'kabukicho host clubs list', 'best host club kabukicho', 'tokyo host club guide',
    '歌舞伎町 ホストクラブ', 'ホストクラブ 歌舞伎町', '東京 ホストクラブ',
    'shinjuku nightlife host', 'kabukicho host club directory',
  ],
  alternates: { canonical: '/clubs' },
  openGraph: {
    title: 'Kabukicho Host Clubs — Complete Guide to All Clubs in Shinjuku',
    description: 'Browse all host clubs in Kabukicho — 6 major groups, 600+ shops, and 113 clubs in Shinjuku\'s legendary nightlife district.',
    url: 'https://www.oshi-hos.xyz/clubs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kabukicho Host Clubs — Complete Guide to All Clubs in Shinjuku',
    description: 'Browse all host clubs in Kabukicho — 6 major groups, 600+ shops, and 113 clubs.',
  },
};

type ExtraMap = Record<string, { description_ja?: string; description_en?: string; image_urls?: string[] }>;

const groupGradients: Record<string, string> = {
  'groupdandy': 'from-violet-600 to-fuchsia-700',
  'Smappa!': 'from-amber-500 to-rose-600',
  'ACQUA': 'from-cyan-500 to-blue-600',
  'AIR': 'from-sky-400 to-indigo-600',
  '冬月グループ': 'from-emerald-500 to-teal-600',
  "L's collection": 'from-pink-500 to-rose-700',
  'PRIMAVERA': 'from-orange-500 to-red-600',
};

function getGroupGradient(name: string): string {
  for (const [key, gradient] of Object.entries(groupGradients)) {
    if (name.includes(key) || key.includes(name)) return gradient;
  }
  return 'from-accent to-accent-gold';
}

function ShopCard({ shop, gradient }: { shop: GroupClub['shops'][0]; gradient: string }) {
  const shopName = getEnglishName(shop.name_ja, shop.name_en);
  const shopDesc = shop.description_en || '';

  return (
    <Link
      key={shop.id}
      href={`/clubs/${shop.id}`}
      className="relative rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/40 transition-all duration-300 group block aspect-[4/5] sm:aspect-[1/1] min-h-[18rem] sm:min-h-0"
    >
      {/* Background image */}
      {shop.logo_url ? (
        <img
          src={shop.logo_url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : shop.hosts_sample[0]?.image_urls?.[0] ? (
        <img
          src={shop.hosts_sample[0].image_urls[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}

      {/* Tall gradient overlay — dark bottom area for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-35% via-black/40 to-transparent" />

      {/* Host avatar row */}
      {shop.hosts_sample.length > 0 && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex -space-x-1 sm:-space-x-1.5">
          {shop.hosts_sample.slice(0, 3).map((host) => (
            <div
              key={host.id}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden ring-2 ring-black/30 shrink-0"
            >
              <img
                src={host.image_urls?.[0] || ''}
                alt=""
                className="w-full h-full object-cover host-img"
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-tight drop-shadow-lg group-hover:text-accent transition-colors">
          {shopName}
        </h3>
        {shopDesc && (
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none">
            {shopDesc}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mt-1.5 sm:mt-2">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {shop.hosts_count} hosts
          </span>
        </div>
      </div>
    </Link>
  );
}

function GroupSection({ group }: { group: GroupClub }) {
  const groupName = getEnglishName(group.name_ja, group.name_en);
  const gradient = getGroupGradient(group.name_ja);
  const extra = (groupsExtra as ExtraMap)[group.id] || {};
  const heroImage = group.image_urls?.find(u => u.includes('pr_img')) || group.image_urls?.[0] || extra.image_urls?.find(u => u.includes('pr_img')) || extra.image_urls?.[0] || group.logo_url || '';
  const groupDesc = group.description_en || '';

  return (
    <section>
      {/* Group hero card */}
      <div className="relative rounded-2xl overflow-hidden mb-4 sm:mb-6 min-h-[14rem] sm:h-72">
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {group.logo_url && (
          <img
            src={group.logo_url}
            alt=""
            className="absolute top-4 right-4 w-14 h-14 object-contain opacity-40"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-white mb-1 drop-shadow-lg">
            {groupName}
          </h2>
          <div className="flex items-center gap-4 text-xs text-white/60 mb-2">
            <span className="flex items-center gap-1">
              <Store className="w-3 h-3" />
              {group.shops_count} shops
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {group.hosts_count} hosts
            </span>
          </div>
          {groupDesc && (
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
              {groupDesc}
            </p>
          )}
        </div>
      </div>

      {/* Shop cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {group.shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} gradient={gradient} />
        ))}
      </div>
    </section>
  );
}

async function ClubsContent() {
  const groups: GroupClub[] = await getGroupClubs();

  // Filter out groups with no shops (defensive, getGroupClubs already filters)
  const withShops = groups.filter((g) => g.shops_count > 0);

  // Shuffle to avoid positional bias — every load shows a different first group
  const shuffled = withShops
    .map((g) => ({ g, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ g }) => g);

  if (shuffled.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Store className="w-16 h-16 text-zinc-300 mb-6" />
        <h2 className="text-2xl font-serif font-bold text-zinc-400 mb-2">No clubs yet</h2>
        <p className="text-sm text-zinc-500 max-w-md">
          Club data will appear once the scraper has been run and groups are populated in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {shuffled.map((group) => (
        <GroupSection key={group.id} group={group} />
      ))}
    </div>
  );
}

export default async function ClubsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
            Clubs
          </h1>
          <p className="text-sm text-zinc-400">
            Brose Host Clubs
          </p>
        </div>

        <ClubsContent />
      </div>
    </div>
  );
}
