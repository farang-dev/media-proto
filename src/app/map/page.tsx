'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Navigation, Store } from 'lucide-react';
import Link from 'next/link';
import { Shop, getShopsWithCoordinates } from '@/lib/db';
import { useLanguage } from '@/lib/LanguageContext';
import { getEnglishName, getEnglishAddress, getGoogleMapsUrl } from '@/lib/japanese';

const KABUKICHO_CENTER = { lat: 35.6938, lng: 139.7034 };

function MapView({ shops, language }: { shops: Shop[]; language: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current!, {
        center: [KABUKICHO_CENTER.lat, KABUKICHO_CENTER.lng],
        zoom: 16,
        zoomControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const defaultIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #A868D8, #D4A0FF);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
        "><span style="transform: rotate(45deg); color: white; font-size: 12px; font-weight: bold;">★</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      for (const shop of shops) {
        if (!shop.latitude || !shop.longitude) continue;

        const marker = L.marker([shop.latitude, shop.longitude], { icon: defaultIcon }).addTo(map);

        const shopName = language === 'ja' ? shop.name_ja : getEnglishName(shop.name_ja, shop.name_en);
        const groupName = shop.group ? (language === 'ja' ? (shop.group.name_ja || shop.group_name || '') : getEnglishName(shop.group.name_ja, shop.group.name_en)) : (shop.group_name || '');
        const address = language === 'ja' ? (shop.address_ja || '') : getEnglishAddress(shop.address_ja);
        const mapsUrl = getGoogleMapsUrl(shop.name_ja, shop.address_ja);

        const popupContent = `
          <div style="min-width: 180px; font-family: sans-serif;">
            <div style="font-weight: 800; font-size: 14px; margin-bottom: 4px; color: #1a1a2e;">${shopName}</div>
            ${groupName ? `<div style="font-size: 11px; color: #888; margin-bottom: 4px;">${groupName}</div>` : ''}
            ${address ? `<div style="font-size: 11px; color: #666; margin-bottom: 8px;">${address}</div>` : ''}
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer"
               style="display: inline-flex; align-items: center; gap: 4px; background: #A868D8; color: white; padding: 6px 12px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
              Navigate
            </a>
          </div>
        `;

        marker.bindPopup(popupContent);
      }

      mapInstanceRef.current = map;
    })();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [shops]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
}

export default function MapPage() {
  const { language } = useLanguage();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShopsWithCoordinates().then(data => { setShops(data); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === 'ja' ? 'トップに戻る' : 'Back'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-accent/20">
              <MapPin className="w-3.5 h-3.5" />
              {language === 'ja' ? '歌舞伎町ホストクラブマップ' : 'Kabukicho Host Club Map'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-foreground mb-3">
              {language === 'ja' ? 'ホストクラブマップ' : 'Host Club Map'}
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
              {language === 'ja'
                ? '歌舞伎町のホストクラブの場所をマップで確認。タップでGoogleマップからナビゲーションできます。'
                : 'Find host clubs in Kabukicho on the map. Tap to navigate via Google Maps.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading && (
          <div className="aspect-[16/10] rounded-2xl bg-card-bg border border-card-border animate-pulse flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-zinc-700 animate-bounce" />
              <p className="text-sm text-zinc-500">{language === 'ja' ? 'マップを読み込み中...' : 'Loading map...'}</p>
            </div>
          </div>
        )}

        {!loading && shops.length === 0 && (
          <div className="aspect-[16/10] rounded-2xl bg-card-bg border border-card-border flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
              <p className="text-zinc-500 mb-2">{language === 'ja'
                ? '位置情報データがまだありません。'
                : 'No location data yet.'}</p>
              <p className="text-xs text-zinc-600">{language === 'ja'
                ? 'スクレイピングスクリプトを実行して住所情報を取得してください。'
                : 'Run the scrape script to fetch address data.'}</p>
            </div>
          </div>
        )}

        {!loading && shops.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[16/10] rounded-2xl overflow-hidden border border-card-border"
          >
            <MapView shops={shops} language={language} />
          </motion.div>
        )}

        {/* Shop list below map */}
        {!loading && shops.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground">
                {language === 'ja' ? `${shops.length} 店舗` : `${shops.length} Shops`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {shops.map((shop) => {
                const name = language === 'ja' ? shop.name_ja : getEnglishName(shop.name_ja, shop.name_en);
                const address = language === 'ja' ? (shop.address_ja || '') : getEnglishAddress(shop.address_ja);
                const mapsUrl = getGoogleMapsUrl(shop.name_ja, shop.address_ja);
                return (
                  <a
                    key={shop.id}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-card-bg border border-card-border hover:border-accent/30 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">{name}</p>
                      {address && (
                        <p className="text-[10px] text-zinc-500 truncate">{address}</p>
                      )}
                    </div>
                    <Navigation className="w-3.5 h-3.5 text-zinc-600 group-hover:text-accent shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
