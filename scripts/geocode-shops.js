/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
const cheerio = require('cheerio');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const NOMINATIM_DELAY = 1100;
const FETCH_DELAY = 400;

async function fetchHtml(url) {
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'KabukiMapBot/1.0 (kabuki-map-app)' }
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status} ${url}`);
  return resp.text();
}

async function geocodeAddress(address, retries = 2) {
  if (!address) return null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'KabukiMapBot/1.0 (kabuki-map-app)' }
      });
      if (resp.status === 429) {
        console.warn(`    Rate limited, waiting 5s...`);
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
      if (!resp.ok) {
        console.warn(`    Nominatim HTTP ${resp.status}`);
        return null;
      }
      const data = await resp.json();
      if (data && data.length > 0) {
        return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
      }
      return null;
    } catch (err) {
      console.warn(`    Geocoding attempt ${attempt + 1} failed: ${err.message}`);
      if (attempt < retries) await new Promise(r => setTimeout(r, 2000));
    }
  }
  return null;
}

async function scrapeShopAddress(shopUrl) {
  try {
    const html = await fetchHtml(shopUrl);
    const $ = cheerio.load(html);
    const address = $('.shop-sub-info .bd .bs .adrs').text().trim().replace(/\s+/g, ' ');
    return address || '';
  } catch (err) {
    console.warn(`    Scrape failed: ${err.message}`);
    return '';
  }
}

function extractKabukichoCoords(address) {
  const match = address.match(/歌舞伎町(\d+)[-\s]?(\d*)/);
  if (!match) return null;
  const block = parseInt(match[1], 10);
  const lot = parseInt(match[2] || '0', 10);

  const baseLat = 35.6942;
  const baseLng = 139.7035;
  const blockOffset = (block - 1) * 0.0003;
  const lotOffset = lot * 0.00005;

  return {
    latitude: baseLat + blockOffset + (lot % 2 === 0 ? 0.0001 : -0.0001),
    longitude: baseLng + lotOffset - blockOffset * 0.5,
  };
}

async function main() {
  console.log('=== Geocode Shops Script ===\n');

  const { data: shops, error } = await supabase
    .from('shops')
    .select('id, name_ja, source_url, address_ja, latitude, longitude')
    .order('name_ja');

  if (error) {
    console.error('Failed to fetch shops:', error.message);
    process.exit(1);
  }

  const needsAddress = shops.filter(s => !s.address_ja);
  const needsGeocode = shops.filter(s => s.address_ja && (!s.latitude || !s.longitude));

  console.log(`Total shops: ${shops.length}`);
  console.log(`Need address scraped: ${needsAddress.length}`);
  console.log(`Need geocoding: ${needsGeocode.length}\n`);

  let addressCount = 0;
  let geocodeCount = 0;
  let fallbackCount = 0;

  for (const shop of needsAddress) {
    if (!shop.source_url) {
      console.log(`  [${shop.name_ja}] — no source_url, skipping`);
      continue;
    }

    console.log(`  [${shop.name_ja}] Fetching address...`);
    const address = await scrapeShopAddress(shop.source_url);
    await new Promise(r => setTimeout(r, FETCH_DELAY));

    if (!address) {
      console.log(`    No address found`);
      continue;
    }

    console.log(`    Address: ${address}`);

    let latLng = await geocodeAddress(address);
    await new Promise(r => setTimeout(r, NOMINATIM_DELAY));

    if (!latLng) {
      latLng = extractKabukichoCoords(address);
      if (latLng) {
        console.log(`    → Fallback coords: ${latLng.latitude.toFixed(4)}, ${latLng.longitude.toFixed(4)}`);
        fallbackCount++;
      } else {
        const retryAddress = `${shop.name_ja} 歌舞伎町 新宿`;
        console.log(`    → Retrying with: ${retryAddress}`);
        latLng = await geocodeAddress(retryAddress);
        await new Promise(r => setTimeout(r, NOMINATIM_DELAY));
      }
    }

    if (latLng) {
      console.log(`    → lat: ${latLng.latitude.toFixed(6)}, lng: ${latLng.longitude.toFixed(6)}`);
    } else {
      console.log(`    → Could not geocode`);
    }

    const update = { address_ja: address };
    if (latLng) {
      update.latitude = latLng.latitude;
      update.longitude = latLng.longitude;
    }

    const { error: upErr } = await supabase.from('shops').update(update).eq('id', shop.id);
    if (upErr) console.warn(`    Update error: ${upErr.message}`);
    else {
      addressCount++;
      if (latLng) geocodeCount++;
    }
  }

  for (const shop of needsGeocode) {
    console.log(`  [${shop.name_ja}] Geocoding existing address: ${shop.address_ja}`);

    let latLng = await geocodeAddress(shop.address_ja);
    await new Promise(r => setTimeout(r, NOMINATIM_DELAY));

    if (!latLng) {
      latLng = extractKabukichoCoords(shop.address_ja);
      if (latLng) {
        console.log(`    → Fallback coords: ${latLng.latitude.toFixed(4)}, ${latLng.longitude.toFixed(4)}`);
        fallbackCount++;
      } else {
        const retryAddress = `${shop.name_ja} 歌舞伎町 新宿`;
        console.log(`    → Retrying with: ${retryAddress}`);
        latLng = await geocodeAddress(retryAddress);
        await new Promise(r => setTimeout(r, NOMINATIM_DELAY));
      }
    }

    if (latLng) {
      console.log(`    → lat: ${latLng.latitude.toFixed(6)}, lng: ${latLng.longitude.toFixed(6)}`);
      const { error: upErr } = await supabase
        .from('shops')
        .update({ latitude: latLng.latitude, longitude: latLng.longitude })
        .eq('id', shop.id);
      if (upErr) console.warn(`    Update error: ${upErr.message}`);
      else geocodeCount++;
    } else {
      console.log(`    → Could not geocode`);
    }
  }

  const { count: finalWithCoords } = await supabase
    .from('shops')
    .select('*', { count: 'exact', head: true })
    .not('latitude', 'is', null);

  console.log(`\n=== Summary ===`);
  console.log(`Addresses scraped: ${addressCount}`);
  console.log(`Geocoded: ${geocodeCount}`);
  console.log(`Fallback coords: ${fallbackCount}`);
  console.log(`Shops with coordinates (total): ${finalWithCoords}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
