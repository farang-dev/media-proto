'use client';

import React from 'react';
import { Store, Phone, Clock, Tag, Star, MessageCircle, Heart, MapPin, DollarSign, Camera } from 'lucide-react';

const sampleShop = {
  name: 'a-ist Fellas',
  group: 'Fiore Group',
  address: '東京都新宿区歌舞伎町2-14-8 メトロプラザ2ビルB1F',
  phone: '03-6205-5136',
  hours: '19:00～23:30 (LO 22:30)',
  regularHoliday: '日曜、月曜日',
  description: 'Fellas＝仲間たち。その名の通り、心を通わせる温もりと、極上のホスピタリティが融合する場所。「a-ist Fellas」で、素敵な担当が見つかるでしょう♪',
  system: [
    { label: '初回料金', value: '1時間／1,000円（サービス料、消費税込み）' },
    { label: '通常料金', value: '1時間／3,000円' },
    { label: '指名料', value: '3,000円' },
    { label: '同伴料', value: '3,000円' },
    { label: '場内指名', value: '1,000円' },
    { label: 'ドリンク', value: '1,000円～' },
    { label: 'サービス料', value: '35％' },
  ],
  images: [
    'https://www.host2.jp/shop/fellas/shop01.jpg',
    'https://www.host2.jp/shop/fellas/shop02.jpg',
  ],
};

const sampleHost = {
  name: '星羅夢 Aran',
  lineId: 'a11291224',
  typeTags: ['アイドル系', '爽やか系', 'K-POP系', 'クール系'],
  ratings: [
    { label: 'イケメン度', filled: 4, total: 5 },
    { label: 'お笑い度', filled: 2, total: 5 },
    { label: 'お酒の強さ', filled: 3, total: 5 },
  ],
  qa: [
    { q: '前職', a: 'Fラン大学生' },
    { q: '出身地', a: '茨城県' },
    { q: '趣味', a: 'サウナ、シーシャ、ジム' },
    { q: 'アピールポイント', a: '横顔、目のほくろ' },
    { q: '好きな漫画', a: '進撃の巨人' },
  ],
  images: [
    'https://www.host2.jp/shop/fellas/aran/pic01.jpg',
    'https://www.host2.jp/shop/fellas/aran/pic02.jpg',
  ],
};

export default function DataTestPage() {
  return (
    <div className="min-h-screen bg-background p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold font-serif text-foreground">New Data Preview</h1>
      <p className="text-sm text-zinc-400">Newly scraped fields — super small scale demo</p>

      {/* ── Shop Section ── */}
      <section>
        <h2 className="text-lg font-bold font-serif flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-accent" /> Shop Fields
        </h2>
        <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
          {/* Image gallery strip */}
          <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
            {sampleShop.images.map((url, i) => (
              <img key={i} src={url} alt="" className="h-28 w-auto rounded-xl object-cover border border-card-border" />
            ))}
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-xs text-accent-gold font-semibold uppercase">{sampleShop.group}</p>
            </div>
            <h3 className="text-xl font-bold font-serif text-foreground">{sampleShop.name}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>{sampleShop.address}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <span>{sampleShop.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4 shrink-0 text-accent" />
                <span>{sampleShop.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Heart className="w-4 h-4 shrink-0 text-accent-light" />
                <span>定休: {sampleShop.regularHoliday}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed">{sampleShop.description}</p>

            {/* System/pricing table */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-3 h-3" /> Pricing
              </h4>
              <div className="divide-y divide-card-border rounded-xl border border-card-border">
                {sampleShop.system.map((item) => (
                  <div key={item.label} className="flex justify-between px-3 py-2 text-sm">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Host Section ── */}
      <section>
        <h2 className="text-lg font-bold font-serif flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-accent" /> Host Fields
        </h2>
        <div className="rounded-2xl bg-card-bg border border-card-border overflow-hidden">
          {/* Gallery strip */}
          <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
            {sampleHost.images.map((url, i) => (
              <img key={i} src={url} alt="" className="h-28 w-auto rounded-xl object-cover border border-card-border" />
            ))}
          </div>

          <div className="p-4 space-y-4">
            <h3 className="text-xl font-bold font-serif text-foreground">{sampleHost.name}</h3>

            {/* Type tags */}
            <div>
              <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Type Tags (type_tags)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {sampleHost.typeTags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div>
              <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Star className="w-3 h-3" /> Ratings (ratings JSON)
              </h4>
              <div className="space-y-2">
                {sampleHost.ratings.map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500 w-24 shrink-0">{r.label}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.total }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-sm ${i < r.filled ? 'bg-accent' : 'bg-zinc-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400">{r.filled}/{r.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LINE ID */}
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="text-zinc-500">LINE:</span>
              <span className="text-foreground font-mono text-xs bg-black/5 px-2 py-0.5 rounded">{sampleHost.lineId}</span>
            </div>

            {/* Q&A mini */}
            <div>
              <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Camera className="w-3 h-3" /> Q&A ({sampleHost.qa.length} items)
              </h4>
              <div className="space-y-1.5">
                {sampleHost.qa.map((item) => (
                  <div key={item.q} className="text-sm">
                    <span className="text-accent-gold font-medium">Q: {item.q}</span>
                    <span className="text-zinc-400"> — </span>
                    <span className="text-zinc-500">{item.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-[10px] text-zinc-400 pb-8">
        Source: host2.jp — new fields highlighted in accent colors
      </div>
    </div>
  );
}
