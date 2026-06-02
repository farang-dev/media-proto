import React from 'react';
import Link from 'next/link';
import { Store, Users, ArrowRight } from 'lucide-react';
import { getGroupClubs, GroupClub } from '@/lib/db';
import { getEnglishName } from '@/lib/japanese';
import groupsExtra from '@/data/groups-extra.json';

export const dynamic = 'force-dynamic';

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

  return (
    <Link
      key={shop.id}
      href={`/clubs/${shop.id}`}
      className="relative rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-accent/40 transition-all duration-300 group block aspect-[4/3]"
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white font-serif leading-tight drop-shadow-lg group-hover:text-accent transition-colors">
          {shopName}
        </h3>
        <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {shop.hosts_count} hosts
          </span>
        </div>
      </div>

      {/* Host avatar row */}
      {shop.hosts_sample.length > 0 && (
        <div className="absolute top-4 right-4 flex -space-x-1.5">
          {shop.hosts_sample.slice(0, 3).map((host) => (
            <div
              key={host.id}
              className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-black/30 shrink-0"
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
    </Link>
  );
}

function GroupSection({ group }: { group: GroupClub }) {
  const groupName = getEnglishName(group.name_ja, group.name_en);
  const gradient = getGroupGradient(group.name_ja);
  const extra = (groupsExtra as ExtraMap)[group.name_ja] || {};
  const heroImage = group.image_urls?.[0] || extra.image_urls?.find(u => u.includes('pr_img')) || extra.image_urls?.[0] || group.logo_url || '';
  const descEn = extra.description_en || '';
  const descJa = group.description_ja || extra.description_ja || '';
  const description = descEn || descJa;

  return (
    <section>
      {/* Group hero card */}
      <Link
        href="/clubs"
        className="relative rounded-2xl overflow-hidden mb-6 block group h-64 sm:h-72"
      >
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {group.logo_url && (
          <img
            src={group.logo_url}
            alt=""
            className="absolute top-4 right-4 w-16 h-16 object-contain opacity-60"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-1 drop-shadow-lg">
            {groupName}
          </h2>
          <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
            <span className="flex items-center gap-1">
              <Store className="w-3 h-3" />
              {group.shops_count} shops
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {group.hosts_count} hosts
            </span>
          </div>
          {description && (
            <p className="text-sm text-white/80 leading-relaxed max-w-2xl line-clamp-2 drop-shadow">
              {description}
            </p>
          )}
        </div>

        <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-1 text-xs text-white/50 group-hover:text-white transition-colors">
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* Shop cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} gradient={gradient} />
        ))}
      </div>
    </section>
  );
}

async function ClubsContent() {
  const groups: GroupClub[] = await getGroupClubs();

  if (groups.length === 0) {
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
      {groups.map((group) => (
        <GroupSection key={group.id} group={group} />
      ))}
    </div>
  );
}

export default async function ClubsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
            Clubs
          </h1>
          <p className="text-sm text-zinc-400">
            Browse host clubs by group
          </p>
        </div>

        <ClubsContent />
      </div>
    </div>
  );
}
