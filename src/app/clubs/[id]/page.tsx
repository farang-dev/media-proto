import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, Users, Heart } from 'lucide-react';
import { getShopWithHosts, Host } from '@/lib/db';
import { getEnglishName, looksLikeDate } from '@/lib/japanese';
import CommentSection from '@/components/CommentSection';

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

function HostCard({ host, rank }: { host: Host; rank: number }) {
  const name = getEnglishName(host.name_ja, host.name_en);
  const mainImage = host.image_urls?.[0] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';

  return (
    <Link
      href={`/hosts/${host.id}`}
      className="rounded-2xl bg-card-bg border border-card-border overflow-hidden hover:border-accent/40 transition-all duration-300 group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 host-img"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

        <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg">
          <span className="text-background text-xs font-black">{rank}</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white font-serif leading-tight drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-xs">
          {host.height && (
            <span className="bg-black/5 text-zinc-500 px-2 py-0.5 rounded-full">{host.height}</span>
          )}
          {host.blood_type && host.blood_type !== '?' && (
            <span className="bg-black/5 text-zinc-500 px-2 py-0.5 rounded-full">Type {host.blood_type}</span>
          )}
          {host.birthday && looksLikeDate(host.birthday) && (
            <span className="bg-black/5 text-zinc-500 px-2 py-0.5 rounded-full text-[10px]">{normalizeBirthday(host.birthday)}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <Heart className="w-3 h-3 text-accent-light" />
          <span className="font-semibold text-accent-light">{(host.votes_count || 0).toLocaleString()}</span>
          <span className="text-zinc-400">votes</span>
        </div>
      </div>
    </Link>
  );
}

export default async function ShopPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const { shop, hosts } = await getShopWithHosts(id);

  if (!shop) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Store className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-400 mb-2">Club not found</h1>
          <Link href="/clubs" className="text-sm text-accent hover:underline">
            Back to clubs
          </Link>
        </div>
      </div>
    );
  }

  const shopName = getEnglishName(shop.name_ja, shop.name_en);
  const groupName = shop.group ? getEnglishName(shop.group.name_ja, shop.group.name_en) : '';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to clubs
        </Link>

        <div className="mb-10">
          {groupName && (
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
              {groupName}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
            {shopName}
          </h1>
          <p className="text-sm text-zinc-400">
            {hosts.length} hosts in service
          </p>
        </div>

        {hosts.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-sm">No hosts registered yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {hosts.map((host, index) => (
              <HostCard key={host.id} host={host} rank={index + 1} />
            ))}
          </div>
        )}

        <div className="mt-16 max-w-xl">
          <CommentSection type="shop" targetId={id} />
        </div>
      </div>
    </div>
  );
}
