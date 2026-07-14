/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const { createClient } = require('@supabase/supabase-js');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase variables. Check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const NEW_SHOP_COLUMNS = ['description_ja','description_en','phone','hours','regular_holiday','logo_url','image_urls','system_info_ja','system_info_en','address_ja','latitude','longitude'];
const NEW_HOST_COLUMNS = ['line_id','type_tags','ratings','qa_data','qa_data_en','image_urls','instagram_url','twitter_url','tiktok_url'];
const NEW_GROUP_COLUMNS = ['description_en','image_urls'];
const availableColumns = { shops: new Set(['id','name_ja','name_en','source_url','area','group_id','score','rank','created_at']), hosts: new Set(['id','shop_id','name_ja','name_en','birthday','height','blood_type','bio_ja','bio_en','source_url','daily_rank','weekly_rank','monthly_rank','rank_in_shop','created_at']), groups: new Set(['id','name_ja','name_en','name_kana','description_ja','logo_url','source_url','created_at']) };

async function probeColumn(table, col) {
  const { error } = await supabase.from(table).select(col).limit(1);
  return !error;
}

async function detectColumns() {
  for (const col of NEW_SHOP_COLUMNS) if (await probeColumn('shops', col)) availableColumns.shops.add(col);
  for (const col of NEW_HOST_COLUMNS) if (await probeColumn('hosts', col)) availableColumns.hosts.add(col);
  for (const col of NEW_GROUP_COLUMNS) if (await probeColumn('groups', col)) availableColumns.groups.add(col);
  console.log(`  Shops columns: ${[...availableColumns.shops].filter(c => c !== 'id').join(', ')}`);
  console.log(`  Hosts columns: ${[...availableColumns.hosts].filter(c => c !== 'id').join(', ')}`);
  console.log(`  Groups columns: ${[...availableColumns.groups].filter(c => c !== 'id').join(', ')}`);
}

const RANKING_URLS = {
  daily: 'https://www.host2.jp/ranking/day14.html',
  weekly: 'https://www.host2.jp/ranking/week14.html',
  monthly: 'https://www.host2.jp/ranking/month14.html'
};

const GROUPS_INDEX_URL = 'https://www.host2.jp/shop_grp/index.html';

// All groups are now scraped; Kabukicho filtering happens per-shop via address check
const TARGET_GROUP_SLUGS = null; // null = scrape all groups

const RANKING_HOST_LIMIT = 30;

const shopCache = {};

function extractShopPath(hostUrl) {
  const match = hostUrl.match(/\/shop\/([^/]+)\//);
  return match ? match[1] : null;
}

function extractHostSlug(hostUrl) {
  const match = hostUrl.match(/\/shop\/[^/]+\/([^/]+)\//);
  return match ? match[1] : null;
}

async function fetchHtml(url) {
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KabukiScraper/1.0)' }
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status} ${url}`);
  return resp.text();
}

async function translateText(text, targetLang = 'en') {
  if (!text) return '';
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data && data[0]) {
      return data[0].map(p => p[0]).join(' ');
    }
    return text;
  } catch (err) {
    console.warn(`  Translation failed: ${err.message}`);
    return text;
  }
}

async function geocodeAddress(address) {
  if (!address) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'KabukiScraper/1.0 (contact@example.com)' }
    });
    const data = await resp.json();
    if (data && data.length > 0) {
      return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
    }
    return null;
  } catch (err) {
    console.warn(`  Geocoding failed: ${err.message}`);
    return null;
  }
}

async function upsertShop(nameJa, sourceUrl, groupId, extra = {}) {
  const cacheKey = sourceUrl || nameJa;
  if (shopCache[cacheKey]) return shopCache[cacheKey];

  const shopData = {
    name_ja: nameJa,
    source_url: sourceUrl,
    area: extra.area || 'Kabukicho',
  };
  if (extra.description_ja && availableColumns.shops.has('description_ja')) shopData.description_ja = extra.description_ja;
  if (extra.phone && availableColumns.shops.has('phone')) shopData.phone = extra.phone;
  if (extra.hours && availableColumns.shops.has('hours')) shopData.hours = extra.hours;
  if (extra.regular_holiday && availableColumns.shops.has('regular_holiday')) shopData.regular_holiday = extra.regular_holiday;
  if (extra.logo_url && availableColumns.shops.has('logo_url')) shopData.logo_url = extra.logo_url;
  if (extra.image_urls && extra.image_urls.length > 0 && availableColumns.shops.has('image_urls')) shopData.image_urls = extra.image_urls;
  if (extra.system_info_ja && availableColumns.shops.has('system_info_ja')) shopData.system_info_ja = extra.system_info_ja;
  if (extra.address_ja && availableColumns.shops.has('address_ja')) shopData.address_ja = extra.address_ja;
  if (extra.latitude && availableColumns.shops.has('latitude')) shopData.latitude = extra.latitude;
  if (extra.longitude && availableColumns.shops.has('longitude')) shopData.longitude = extra.longitude;
  if (groupId) shopData.group_id = groupId;

  const { data, error } = await supabase
    .from('shops')
    .upsert(shopData, { onConflict: 'source_url', ignoreDuplicates: false })
    .select();

  if (error) {
    console.warn(`  Shop upsert error for "${nameJa}": ${error.message}`);
    return null;
  }
  if (!data || !data[0]) {
    console.warn(`  Shop upsert returned no data for "${nameJa}"`);
    return null;
  }

  // Translate description
  if (shopData.description_ja && !extra.description_en) {
    const en = await translateText(shopData.description_ja);
    await new Promise(r => setTimeout(r, 200));
    if (en && availableColumns.shops.has('description_en')) {
      await supabase.from('shops').update({ description_en: en }).eq('id', data[0].id);
    }
  }

  // Translate system info
  if (shopData.system_info_ja && !extra.system_info_en) {
    const en = await translateText(shopData.system_info_ja);
    await new Promise(r => setTimeout(r, 200));
    if (en && availableColumns.shops.has('system_info_en')) {
      await supabase.from('shops').update({ system_info_en: en }).eq('id', data[0].id);
    }
  }

  shopCache[cacheKey] = data[0].id;
  return data[0].id;
}

async function parseRankingPage(html, rankType) {
  const $ = cheerio.load(html);
  const entries = [];
  $('.list-ranking .cts > ul > li.cell').each((i, el) => {
    const $el = $(el);
    const rankText = $el.find('.hd').text().trim();
    const rank = parseInt(rankText, 10);
    const hostUrl = $el.attr('data-href') || $el.find('a.img').attr('href') || '';
    const hostName = $el.find('.tit a').text().trim();
    const shopName = $el.find('.shop a').text().trim();
    const shopUrl = $el.find('.shop a').attr('href') || '';
    const thumbnail = $el.find('a.img img').attr('src') || '';
    const kanaEng = $el.find('.kana_eng').text().trim();
    entries.push({ rank, hostUrl, hostName, shopName, shopUrl, thumbnail, kanaEng, rankType });
  });
  return entries;
}

function parseQaData($) {
  const qaData = {};
  $('.staff-question table tr').each((_, tr) => {
    $(tr).find('td').each((_, td) => {
      const question = $(td).find('.qst').text().trim().replace(/^Q\s*/, '');
      const answer = $(td).find('.cmt').text().trim();
      if (question && answer) {
        qaData[question] = answer;
      }
    });
  });
  return qaData;
}

async function translateQaData(qaData) {
  if (!qaData || Object.keys(qaData).length === 0) return {};
  const translated = {};
  for (const [q, a] of Object.entries(qaData)) {
    const qEn = await translateText(q);
    await new Promise(r => setTimeout(r, 200));
    const aEn = await translateText(a);
    await new Promise(r => setTimeout(r, 200));
    translated[q] = { q: qEn || q, a: aEn || a };
  }
  return translated;
}

async function parseHostProfile(html, hostUrl) {
  const $ = cheerio.load(html);
  const shopPath = extractShopPath(hostUrl);
  const hostSlug = extractHostSlug(hostUrl);

  const shopName = $('.staff-profile .shop').first().text().trim();
  const nameJa = $('.staff-name').first().contents().filter((_, el) => el.nodeType === 3).text().trim();
  const nameEn = $('.staff-name soan').first().text().trim() || $('.staff-name .kana').first().text().trim();

  let birthday = '', height = '', bloodType = '';
  $('.staff-profile .cmt').each((_, el) => {
    const text = $(el).text();
    const bdMatch = text.match(/誕生日：(.+?)\s*\/\s*/);
    const hMatch = text.match(/身長：(\d+cm)/);
    const btMatch = text.match(/血液型：([^/]+?)\s*\/\s*/);
    if (bdMatch) {
      const raw = bdMatch[1].trim();
      const parsed = raw.replace(/\(.*?\)/, '').trim();
      const normalized = parsed
        .replace(/年/g, '-')
        .replace(/月/g, '-')
        .replace(/日/g, '');
      birthday = normalized;
    }
    if (hMatch) height = hMatch[1];
    if (btMatch) bloodType = btMatch[1].trim().replace('型', '');
  });

  let instagram = '', twitter = '', tiktok = '', lineId = '';
  const typeTags = [];
  const ratings = {};

  $('.staff-profile dl dt, .staff-profile dl dd').each((i, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'dt') {
      const label = $(el).text().trim();
      const ddEl = $(el).next('dd');
      const link = ddEl.find('a').attr('href') || ddEl.text().trim();
      if (label.includes('Instagram')) instagram = link;
      else if (label.includes('X') || label.includes('Twitter')) twitter = link;
      else if (label.includes('TikTok')) tiktok = link;
      else if (label.includes('LINE')) lineId = link;
    }
  });

  // Type tags (e.g. アイドル系, K-POP系)
  $('.staff-profile ul.f_type li').each((_, el) => {
    const tag = $(el).text().trim();
    if (tag) typeTags.push(tag);
  });

  // Ratings from f_level stars in the cmt sections
  const cmtSections = [];
  $('.staff-profile .cmt').each((_, el) => {
    cmtSections.push($(el));
  });
  if (cmtSections.length >= 3) {
    const ratingCmts = cmtSections[2];
    ratingCmts.contents().each((_, node) => {
      if (node.type === 'text') {
        const text = $(node).text().trim();
        const match = text.match(/^(.+?)：/);
        if (match) {
          const label = match[1];
          const levelUl = $(node).next('ul.f_level');
          if (levelUl.length) {
            const total = levelUl.find('li').length;
            const filled = levelUl.find('li:not(.non)').length;
            if (total > 0) {
              ratings[label] = { filled, total };
            }
          }
        }
      }
    });
  }

  const hostBase = hostUrl.startsWith('http') ? new URL(hostUrl).origin : 'https://www.host2.jp';
  const resolveUrl = (u) => {
    if (!u) return '';
    if (u.startsWith('http')) return u;
    return new URL(u, hostBase).href;
  };

  const images = [];

  // Main PR image (high-res — pr01.jpg, not -thum)
  const prImgSrc = $('.staff-dtl-pr img').first().attr('src') || '';
  const prFull = resolveUrl(prImgSrc.replace(/-(thumb|thum|m)\b/i, ''));
  if (prFull) images.push(prFull);

  // Gallery images — ONLY use the lightbox href (full resolution)
  $('.staff-photo li.item a[rel="lightbox"]').each((_, el) => {
    const href = resolveUrl($(el).attr('href') || '');
    if (href && !images.includes(href)) {
      images.push(href);
    }
  });

  // Also check any a[rel=lightbox] outside .staff-photo
  $('.staff-photo a[rel="lightbox"]').each((_, el) => {
    const href = resolveUrl($(el).attr('href') || '');
    if (href && !images.includes(href)) {
      images.push(href);
    }
  });

  // Q&A data
  const qaData = parseQaData($);

  // Bio from staff-cmt section (free-text self-intro)
  let bioJa = '';
  const staffCmt = $('.staff-cmt').first().text().trim();
  if (staffCmt && staffCmt.length > 5) {
    bioJa = staffCmt;
  } else {
    // Fallback to PR comment
    const prComment = $('.staff-dtl-pr .cmt, .staff-dtl-pr p').first().text().trim();
    if (prComment && prComment.length > 10) bioJa = prComment;
  }

  const fullUrl = hostUrl.startsWith('http') ? hostUrl : `https://www.host2.jp${hostUrl}`;

  return {
    name_ja: nameJa || '',
    name_en: nameEn || '',
    shop_name_ja: shopName,
    birthday,
    height,
    blood_type: bloodType,
    instagram_url: instagram || null,
    twitter_url: twitter || null,
    tiktok_url: tiktok || null,
    line_id: lineId || null,
    type_tags: typeTags,
    ratings: Object.keys(ratings).length > 0 ? ratings : null,
    image_urls: [...new Set(images)].filter(Boolean),
    bio_ja: bioJa,
    qa_data: qaData,
    source_url: fullUrl
  };
}

async function scrapeRankings() {
  console.log('=== Phase 1: Ranking scrape ===\n');

  const allRankings = [];
  for (const [type, url] of Object.entries(RANKING_URLS)) {
    console.log(`Fetching ${type} ranking: ${url}`);
    try {
      const html = await fetchHtml(url);
      const entries = await parseRankingPage(html, type);
      allRankings.push(...entries.map(e => ({ ...e, rankType: type })));
      console.log(`  Parsed ${entries.length} entries`);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    }
  }

  const hostRankMap = {};
  for (const entry of allRankings) {
    const key = entry.hostUrl;
    if (!hostRankMap[key]) hostRankMap[key] = {};
    hostRankMap[key][entry.rankType] = entry.rank;
    hostRankMap[key].hostName = entry.hostName;
    hostRankMap[key].shopName = entry.shopName;
    hostRankMap[key].shopUrl = entry.shopUrl;
    hostRankMap[key].thumbnail = entry.thumbnail;
    hostRankMap[key].kanaEng = entry.kanaEng;
    hostRankMap[key].hostUrl = entry.hostUrl;
  }

  console.log(`\nFound ${Object.keys(hostRankMap).length} unique hosts across rankings\n`);

  let scraped = 0;
  for (const [, info] of Object.entries(hostRankMap)) {
    if (scraped >= RANKING_HOST_LIMIT) {
      console.log(`Reached ${RANKING_HOST_LIMIT} host limit, stopping ranking scrape...`);
      break;
    }
    scraped++;

    const hostProfileUrl = info.hostUrl.startsWith('http') ? info.hostUrl : `https://www.host2.jp${info.hostUrl}`;
    console.log(`\n[${scraped}] ${info.hostName} (${hostProfileUrl})`);

    try {
      const html = await fetchHtml(hostProfileUrl);
      const profile = await parseHostProfile(html, hostProfileUrl);

      const shopKey = profile.shop_name_ja || info.shopName;
      const shopPath = extractShopPath(hostProfileUrl);
      const shopSourceUrl = `https://www.host2.jp/shop/${shopPath}/index.html`;
      const shopId = await upsertShop(shopKey, shopSourceUrl, null);

      if (!shopId) {
        console.warn(`  Skipping - could not upsert shop for ${shopKey}`);
        continue;
      }

      // Translate bio and Q&A data
      let bioEn = '';
      if (profile.bio_ja) {
        bioEn = await translateText(profile.bio_ja);
        await new Promise(r => setTimeout(r, 200));
      }
      let qaDataEn = {};
      if (profile.qa_data && Object.keys(profile.qa_data).length > 0) {
        qaDataEn = await translateQaData(profile.qa_data);
      }

      const hostRecord = { shop_id: shopId, name_ja: profile.name_ja, source_url: profile.source_url };
      if (profile.name_en) hostRecord.name_en = profile.name_en;
      if (profile.birthday) hostRecord.birthday = profile.birthday;
      if (profile.height) hostRecord.height = profile.height;
      if (profile.blood_type) hostRecord.blood_type = profile.blood_type;
      if (profile.bio_ja) hostRecord.bio_ja = profile.bio_ja;
      if (bioEn) hostRecord.bio_en = bioEn;
      if (availableColumns.hosts.has('instagram_url') && profile.instagram_url) hostRecord.instagram_url = profile.instagram_url;
      if (availableColumns.hosts.has('twitter_url') && profile.twitter_url) hostRecord.twitter_url = profile.twitter_url;
      if (availableColumns.hosts.has('tiktok_url') && profile.tiktok_url) hostRecord.tiktok_url = profile.tiktok_url;
      if (availableColumns.hosts.has('line_id') && profile.line_id) hostRecord.line_id = profile.line_id;
      if (availableColumns.hosts.has('type_tags') && profile.type_tags?.length) hostRecord.type_tags = profile.type_tags;
      if (availableColumns.hosts.has('ratings') && profile.ratings) hostRecord.ratings = profile.ratings;
      if (availableColumns.hosts.has('image_urls') && profile.image_urls?.length) hostRecord.image_urls = profile.image_urls;
      if (availableColumns.hosts.has('qa_data') && profile.qa_data) hostRecord.qa_data = profile.qa_data;
      if (availableColumns.hosts.has('qa_data_en') && qaDataEn) hostRecord.qa_data_en = qaDataEn;
      if (info.daily) hostRecord.daily_rank = info.daily;
      if (info.weekly) hostRecord.weekly_rank = info.weekly;
      if (info.monthly) hostRecord.monthly_rank = info.monthly;

      const { error: hostErr } = await supabase
        .from('hosts')
        .upsert(hostRecord, { onConflict: 'source_url' });

      if (hostErr) {
        console.error(`  Host upsert error: ${hostErr.message}`);
      } else {
        console.log(`  Host: ${profile.name_ja} | D:${info.daily||'-'} W:${info.weekly||'-'} M:${info.monthly||'-'}${bioEn ? ' (translated)' : ''}`);
      }

      await new Promise(r => setTimeout(r, 800));

    } catch (err) {
      console.error(`  Failed: ${err.message}`);
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function fetchGroupDetails(slug, groupUrl) {
  try {
    const html = await fetchHtml(groupUrl);
    const $ = cheerio.load(html);
    const desc = $('.cmt').first().text().trim();

    const images = [];
    $('img').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (src.includes('shop_grp/' + slug) || src.includes('pr_img') || src.includes('logo')) {
        const full = src.startsWith('http') ? src
          : 'https://www.host2.jp' + (src.startsWith('/') ? '' : '/shop_grp/' + slug + '/') + src;
        images.push(full);
      }
    });

    return { description_ja: desc, image_urls: [...new Set(images)] };
  } catch (err) {
    console.error(`  Group detail fetch failed for ${slug}: ${err.message}`);
    return { description_ja: '', image_urls: [] };
  }
}

async function parseGroupIndex() {
  console.log('\n=== Phase 2: Group index ===\n');
  console.log(`Fetching group index: ${GROUPS_INDEX_URL}`);

  const html = await fetchHtml(GROUPS_INDEX_URL);
  const $ = cheerio.load(html);
  const groups = [];

  $('.list-shop-grp .cts > ul > li.cell').each((i, el) => {
    const $el = $(el);
    const href = $el.attr('data-href') || '';
    const slug = href.replace('/index.html', '');

    if (TARGET_GROUP_SLUGS && !TARGET_GROUP_SLUGS.has(slug)) return;

    const nameJa = $el.find('.tit a').text().trim();
    const nameKana = $el.find('.tit .kana').text().trim().replace(/[()（）]/g, '');
    const description = $el.find('.cmt').text().trim();
    const logoUrl = $el.find('a.img img').attr('src') || '';
    const groupUrl = `https://www.host2.jp/shop_grp/${href}`;

    const shops = [];
    $el.find('.list-shop-grp-shop a.grp_link').each((j, shopEl) => {
      const shopUrl = $(shopEl).attr('href') || '';
      const shopName = $(shopEl).find('p').text().trim();
      if (shopUrl && shopName) {
        shops.push({ name: shopName, url: shopUrl });
      }
    });

    groups.push({
      slug, nameJa, nameKana, description, logoUrl, sourceUrl: groupUrl, shops
    });
  });

  console.log(`Found ${groups.length} target groups with ${groups.reduce((s, g) => s + g.shops.length, 0)} total shops\n`);

  for (const g of groups) {
    console.log(`  ${g.nameJa} (${g.nameKana}) — ${g.shops.length} shops`);
    for (const s of g.shops) {
      console.log(`    - ${s.name}: ${s.url}`);
    }
  }

  return groups;
}

async function upsertGroups(groups) {
  console.log('\n=== Upserting groups ===\n');
  const groupIdMap = {};
  const extraData = {};

  for (const g of groups) {
    // Fetch detailed group page content
    console.log(`  Fetching details for ${g.nameJa}...`);
    const detail = await fetchGroupDetails(g.slug, g.sourceUrl);

    // Translate description to English
    let descriptionEn = '';
    if (detail.description_ja) {
      console.log(`  Translating description for ${g.nameJa}...`);
      descriptionEn = await translateText(detail.description_ja);
      await new Promise(r => setTimeout(r, 300));
    }

    // Use index page description as fallback for ja, detail page is richer
    const finalDescJa = detail.description_ja || g.description;

    const groupRow = {
      name_ja: g.nameJa,
      name_en: '',
      name_kana: g.nameKana,
      description_ja: finalDescJa,
      logo_url: g.logoUrl,
      source_url: g.sourceUrl
    };
    if (availableColumns.groups.has('description_en')) groupRow.description_en = descriptionEn;
    if (availableColumns.groups.has('image_urls')) groupRow.image_urls = detail.image_urls;

    const { data, error } = await supabase
      .from('groups')
      .upsert(groupRow, { onConflict: 'source_url', ignoreDuplicates: false })
      .select();

    if (error) {
      console.error(`  Group upsert error for "${g.nameJa}": ${error.message}`);
      continue;
    }
    if (data && data[0]) {
      groupIdMap[g.slug] = data[0].id;
      console.log(`  ${g.nameJa} → ID: ${data[0].id}`);

      extraData[data[0].id] = {
        description_en: descriptionEn,
        image_urls: detail.image_urls,
      };
    }
  }

  // Write extra data to JSON file for frontend consumption
  const jsonPath = path.resolve(__dirname, '../src/data/groups-extra.json');
  fs.writeFileSync(jsonPath, JSON.stringify(extraData, null, 2));
  console.log(`\n  Wrote extra data to ${jsonPath}`);

  return groupIdMap;
}

async function parseShopDetail(shopUrl) {
  try {
    const html = await fetchHtml(shopUrl);
    const $ = cheerio.load(html);
    const base = shopUrl.substring(0, shopUrl.lastIndexOf('/') + 1);

    const resolveUrl = (u) => {
      if (!u) return '';
      if (u.startsWith('http')) return u;
      return u.startsWith('/') ? `https://www.host2.jp${u}` : base + u;
    };

    // Sidebar info
    const logo = resolveUrl($('.shop-sub-info .bd .img img').attr('src') || '');
    const address = $('.shop-sub-info .bd .bs .adrs').text().trim().replace(/\s+/g, ' ');
    const phone = $('.shop-sub-info .bd .bs .tel').text().trim().replace(/^TEL:/i, '');
    const description = $('.shop-sub-info .bd .info').text().trim();

    // Shop rankings (top N)
    const ranking = [];
    $('.list.shop-number-list .cts > ul > li.cell.link').each((i, el) => {
      const $el = $(el);
      const rankText = $el.find('.num').text().trim().replace('No.', '');
      const hostName = $el.find('.tit a').text().trim();
      const hostUrl = $el.attr('data-href') || '';
      ranking.push({
        rank: parseInt(rankText, 10) || i + 1,
        name: hostName,
        url: hostUrl.startsWith('http') ? hostUrl : `https://www.host2.jp${hostUrl}`
      });
    });

    // Shop gallery images from shop/system pages
    const galleryImages = [];
    const shopPhotoUrls = [];
    $('.shopPhoto a[rel="lightbox"]').each((_, el) => {
      const href = resolveUrl($(el).attr('href') || '');
      if (href) shopPhotoUrls.push(href);
    });
    $('.shop-photo a[rel="lightbox"]').each((_, el) => {
      const href = resolveUrl($(el).attr('href') || '');
      if (href) shopPhotoUrls.push(href);
    });

    return { logo, address, phone, description, ranking, galleryImages: [...new Set(shopPhotoUrls)] };
  } catch (err) {
    console.warn(`  Shop detail parse failed: ${err.message}`);
    return { logo: '', address: '', phone: '', description: '', ranking: [], galleryImages: [] };
  }
}

async function parseSystemPage(systemUrl) {
  try {
    const html = await fetchHtml(systemUrl);
    const $ = cheerio.load(html);
    const base = systemUrl.substring(0, systemUrl.lastIndexOf('/') + 1);
    const resolveUrl = (u) => {
      if (!u) return '';
      if (u.startsWith('http')) return u;
      return u.startsWith('/') ? `https://www.host2.jp${u}` : base + u;
    };

    // Parse pricing table
    const systemData = {};
    $('.shop-system-tbl table tr').each((_, tr) => {
      const $tr = $(tr);
      const label = $tr.find('.ti').text().trim();
      const value = $tr.find('.bd').text().trim().replace(/\s+/g, ' ');
      const memo = $tr.find('.ti2 .memo').text().trim();
      if (label && value) {
        systemData[label] = value;
      }
      if (memo) {
        systemData._memos = systemData._memos || [];
        systemData._memos.push(memo);
      }
    });

    // Shop photos on system page
    const galleryImages = [];
    $('a[rel="lightbox"]').each((_, el) => {
      const href = resolveUrl($(el).attr('href') || '');
      if (href && (href.includes('shop') || href.match(/pic\d+\.jpg$/))) {
        galleryImages.push(href);
      }
    });

    return { systemData, galleryImages: [...new Set(galleryImages)] };
  } catch (err) {
    console.warn(`  System page parse failed: ${err.message}`);
    return { systemData: {}, galleryImages: [] };
  }
}

async function parseShopForHosts(shopUrl) {
  const html = await fetchHtml(shopUrl);
  const $ = cheerio.load(html);
  const hostUrls = [];

  $('li.cell.link[data-href]').each((i, el) => {
    const href = $(el).attr('data-href') || '';
    if (href.includes('/shop/') && href.match(/\/shop\/[^/]+\/[^/]+\/index\.html$/)) {
      hostUrls.push(href);
    }
  });

  return [...new Set(hostUrls)];
}

async function scrapeHostProfile(hostUrl, shopId) {
  const html = await fetchHtml(hostUrl);
  const profile = await parseHostProfile(html, hostUrl);

  if (!profile.name_ja) {
    console.warn(`  Skipping host at ${hostUrl} — no name found`);
    return;
  }

  // Translate bio and Q&A data
  let bioEn = '';
  if (profile.bio_ja) {
    bioEn = await translateText(profile.bio_ja);
    await new Promise(r => setTimeout(r, 200));
  }

  let qaDataEn = {};
  if (profile.qa_data && Object.keys(profile.qa_data).length > 0) {
    console.log(`  Translating ${Object.keys(profile.qa_data).length} Q&A entries...`);
    qaDataEn = await translateQaData(profile.qa_data);
  }

  const hostRecord = { shop_id: shopId, name_ja: profile.name_ja, source_url: profile.source_url };
  if (profile.name_en) hostRecord.name_en = profile.name_en;
  if (profile.birthday) hostRecord.birthday = profile.birthday;
  if (profile.height) hostRecord.height = profile.height;
  if (profile.blood_type) hostRecord.blood_type = profile.blood_type;
  if (profile.bio_ja) hostRecord.bio_ja = profile.bio_ja;
  if (bioEn) hostRecord.bio_en = bioEn;
  if (availableColumns.hosts.has('instagram_url') && profile.instagram_url) hostRecord.instagram_url = profile.instagram_url;
  if (availableColumns.hosts.has('twitter_url') && profile.twitter_url) hostRecord.twitter_url = profile.twitter_url;
  if (availableColumns.hosts.has('tiktok_url') && profile.tiktok_url) hostRecord.tiktok_url = profile.tiktok_url;
  if (availableColumns.hosts.has('line_id') && profile.line_id) hostRecord.line_id = profile.line_id;
  if (availableColumns.hosts.has('type_tags') && profile.type_tags?.length) hostRecord.type_tags = profile.type_tags;
  if (availableColumns.hosts.has('ratings') && profile.ratings) hostRecord.ratings = profile.ratings;
  if (availableColumns.hosts.has('image_urls') && profile.image_urls?.length) hostRecord.image_urls = profile.image_urls;
  if (availableColumns.hosts.has('qa_data') && profile.qa_data) hostRecord.qa_data = profile.qa_data;
  if (availableColumns.hosts.has('qa_data_en') && qaDataEn) hostRecord.qa_data_en = qaDataEn;

  const { error } = await supabase
    .from('hosts')
    .upsert(hostRecord, { onConflict: 'source_url' });

  if (error) {
    console.error(`  Host upsert error for ${profile.name_ja}: ${error.message}`);
  } else {
    const imgCount = profile.image_urls.length;
    console.log(`  ✓ ${profile.name_ja} | ${imgCount} imgs | ${profile.type_tags?.length || 0} tags${bioEn ? ' (translated)' : ''}`);
  }
}

async function scrapeGroups() {
  const groups = await parseGroupIndex();
  if (groups.length === 0) {
    console.log('No target groups found, skipping group scrape.');
    return;
  }

  const groupIdMap = await upsertGroups(groups);

  for (const group of groups) {
    const groupId = groupIdMap[group.slug];
    if (!groupId) {
      console.error(`  Skipping shops for ${group.nameJa} — no group ID`);
      continue;
    }

    console.log(`\n=== Group: ${group.nameJa} (${group.shops.length} shops) ===\n`);

    for (const shop of group.shops) {
      console.log(`\n--- Shop: ${shop.name} ---`);
      console.log(`  URL: ${shop.url}`);

      // Scrape shop detail page for description, address, logo, ranking
      console.log(`  Fetching shop detail...`);
      const shopDetail = await parseShopDetail(shop.url);
      await new Promise(r => setTimeout(r, 400));

      // Only include Kabukicho shops
      if (shopDetail.address && !shopDetail.address.includes('歌舞伎町')) {
        console.log(`  Skipping — not in Kabukicho: ${shopDetail.address}`);
        continue;
      }

      // Scrape system page for pricing
      const systemUrl = shop.url.replace('index.html', 'system.html');
      let systemData = {};
      let systemGallery = [];
      try {
        console.log(`  Fetching system page...`);
        const system = await parseSystemPage(systemUrl);
        systemData = system.systemData;
        systemGallery = system.galleryImages;
        await new Promise(r => setTimeout(r, 400));
      } catch (err) {
        console.warn(`  System page failed: ${err.message}`);
      }

      // Build pricing string from system data
      let systemInfoJa = '';
      if (Object.keys(systemData).length > 0) {
        systemInfoJa = Object.entries(systemData)
          .filter(([k]) => k !== '_memos')
          .map(([k, v]) => `${k}: ${v}`).join('\n');
        const memos = systemData._memos;
        if (memos && memos.length > 0) {
          systemInfoJa += '\n' + memos.join('\n');
        }
      }

      const allImages = [...new Set([
        ...shopDetail.galleryImages,
        ...systemGallery
      ])];

      // Geocode address to lat/lng
      let latLng = null;
      if (shopDetail.address) {
        console.log(`  Geocoding: ${shopDetail.address}`);
        latLng = await geocodeAddress(shopDetail.address);
        if (latLng) {
          console.log(`  → lat: ${latLng.latitude}, lng: ${latLng.longitude}`);
        } else {
          console.log(`  → Geocoding failed, will retry with shop name`);
          latLng = await geocodeAddress(`${shop.name} 歌舞伎町`);
          if (latLng) console.log(`  → lat: ${latLng.latitude}, lng: ${latLng.longitude}`);
        }
        await new Promise(r => setTimeout(r, 1100));
      }

      const shopId = await upsertShop(shop.name, shop.url, groupId, {
        description_ja: shopDetail.description,
        phone: shopDetail.phone,
        hours: systemData['営業時間'] || null,
        regular_holiday: systemData['定休日'] || null,
        logo_url: shopDetail.logo,
        image_urls: allImages,
        system_info_ja: systemInfoJa,
        address_ja: shopDetail.address || null,
        latitude: latLng?.latitude || null,
        longitude: latLng?.longitude || null,
      });
      if (!shopId) {
        console.warn(`  Skipping — could not upsert shop`);
        continue;
      }

      // Store shop ranking data for host rank_in_shop
      const shopRankMap = {};
      for (const r of shopDetail.ranking) {
        shopRankMap[r.url] = r.rank;
      }

      try {
        const hostUrls = await parseShopForHosts(shop.url);
        console.log(`  Found ${hostUrls.length} hosts`);

        for (const hostUrl of hostUrls) {
          try {
            const fullHostUrl = hostUrl.startsWith('http') ? hostUrl : `https://www.host2.jp${hostUrl}`;
            await scrapeHostProfile(fullHostUrl, shopId);
            // Update rank_in_shop from shop ranking list
            if (shopRankMap[fullHostUrl]) {
              await supabase.from('hosts')
                .update({ rank_in_shop: shopRankMap[fullHostUrl] })
                .eq('source_url', fullHostUrl);
            }
            await new Promise(r => setTimeout(r, 500));
          } catch (err) {
            console.error(`  ✗ ${hostUrl}: ${err.message}`);
            await new Promise(r => setTimeout(r, 1000));
          }
        }
      } catch (err) {
        console.error(`  ✗ Shop page failed: ${err.message}`);
      }
    }
  }
}

async function parseEvents() {
  console.log('\n=== Phase: Events ===\n');

  const url = 'https://www.host2.jp/event/14.html';
  console.log(`Fetching events: ${url}`);
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const events = [];

  // Each day block is tr.w or tr.w1 in the list
  $('.list-event .cts > ul > li.cell table tr').each((_, tr) => {
    const $tr = $(tr);
    const $ti = $tr.find('.ti');
    const anchorName = $ti.find('a').attr('name');

    if (!anchorName) return; // skip rows without date anchor

    // Parse date from anchor (e.g., "20260602" → 2026-06-02)
    const year = anchorName.slice(0, 4);
    const month = anchorName.slice(4, 6);
    const day = anchorName.slice(6, 8);
    const dateStr = `${year}-${month}-${day}`;

    // Day of week in Japanese
    const dowText = $ti.text().trim();

    // Parse each event item
    $tr.find('.bd .link').each((_, el) => {
      const $el = $(el);
      const shopUrl = $el.attr('data-href') || '';
      const titleJa = $el.find('.cmt').first().text().trim();
      const subDesc = $el.find('.cmt_s').text().trim();
      const shopName = $el.find('.shop a').text().trim();
      const shopReading = $el.find('.kana').text().trim().replace(/[()（）]/g, '');

      if (!titleJa) return;

      events.push({
        title_ja: titleJa,
        description_ja: subDesc || null,
        shop_name: shopName,
        shop_reading: shopReading,
        shop_url: shopUrl || null,
        event_date: dateStr,
        source_url: shopUrl ? `${shopUrl}#${anchorName}` : `event-${anchorName}-${events.length}`,
      });
    });
  });

  console.log(`Found ${events.length} events this week (歌舞伎町)\n`);

  // Print summary
  const byDate = {};
  for (const ev of events) {
    if (!byDate[ev.event_date]) byDate[ev.event_date] = [];
    byDate[ev.event_date].push(ev);
  }
  for (const [d, evs] of Object.entries(byDate)) {
    console.log(`  ${d}:`);
    for (const ev of evs) {
      console.log(`    - ${ev.title_ja} @ ${ev.shop_name}`);
    }
  }

  // Translate and match shop links
  for (const ev of events) {
    // Translate title to English
    if (ev.title_ja) {
      try {
        ev.title_en = await translateText(ev.title_ja);
        await new Promise(r => setTimeout(r, 200));
      } catch {
        ev.title_en = '';
      }
    }
    // Translate description
    if (ev.description_ja) {
      try {
        ev.description_en = await translateText(ev.description_ja);
        await new Promise(r => setTimeout(r, 200));
      } catch {
        ev.description_en = '';
      }
    }

    // Match shop by URL
    if (ev.shop_url) {
      const fullUrl = ev.shop_url.startsWith('http') ? ev.shop_url : `https://www.host2.jp${ev.shop_url.startsWith('/') ? '' : '/'}${ev.shop_url}`;
      const { data: shop } = await supabase
        .from('shops')
        .select('id, group_id, name_ja')
        .eq('source_url', fullUrl)
        .maybeSingle();
      if (shop) {
        ev.shop_id = shop.id;
        ev.group_id = shop.group_id;
      }
    }
  }

  return events;
}

async function upsertEvents(events) {
  console.log('\n=== Upserting events ===\n');

  // Delete old events for this week to avoid duplicates
  const dates = [...new Set(events.map(e => e.event_date))].sort();
  if (dates.length > 0) {
    const { error: delErr } = await supabase
      .from('events')
      .delete()
      .gte('event_date', dates[0])
      .lte('event_date', dates[dates.length - 1]);
    if (delErr) console.warn(`  Delete old events warning: ${delErr.message}`);
  }

  let count = 0;
  for (const ev of events) {
    const row = {
      title_ja: ev.title_ja,
      title_en: ev.title_en || null,
      description_ja: ev.description_ja,
      description_en: ev.description_en || null,
      shop_name: ev.shop_name,
      shop_url: ev.shop_url,
      shop_id: ev.shop_id || null,
      group_id: ev.group_id || null,
      event_date: ev.event_date,
      source_url: ev.source_url,
    };

    const { error } = await supabase
      .from('events')
      .upsert(row, { onConflict: 'source_url', ignoreDuplicates: false });

    if (error) {
      console.error(`  ✗ Event upsert error: ${error.message}`);
    } else {
      count++;
    }
  }

  console.log(`  Upserted ${count}/${events.length} events\n`);
}

async function scrapeEvents() {
  const events = await parseEvents();
  if (events.length === 0) {
    console.log('No events found.\n');
    return;
  }
  await upsertEvents(events);
}

async function migrateViaPostgrest() {
  // Try RPC exec_sql (works if user created the function in Supabase)
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1' });
    if (!error) {
      console.log('  exec_sql RPC available');
      const migrations = [
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS description_ja TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS description_en TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS phone TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS hours TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS regular_holiday TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS logo_url TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}'`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS system_info_ja TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS system_info_en TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS address_ja TEXT`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`,
        `ALTER TABLE shops ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS qa_data JSONB`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS qa_data_en JSONB`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS line_id TEXT`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS type_tags TEXT[] DEFAULT '{}'`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS ratings JSONB`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS instagram_url TEXT`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS twitter_url TEXT`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS tiktok_url TEXT`,
        `ALTER TABLE hosts ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}'`,
      ];
      for (const sql of migrations) {
        const { error: e } = await supabase.rpc('exec_sql', { sql });
        if (e) console.warn(`  ✗ ${e.message}`);
      }
      console.log('  Migration via exec_sql complete');
      return;
    }
  } catch { }
  console.log('  No SQL execution available — will probe columns at runtime');
}

async function scrape() {
  const args = process.argv.slice(2);
  const mode = args.includes('--groups-only') ? 'groups' :
               args.includes('--rankings-only') ? 'rankings' :
               args.includes('--events-only') ? 'events' : 'all';

  console.log('=== Schema check ===');
  await migrateViaPostgrest();
  await detectColumns();

  if (mode === 'all' || mode === 'rankings') {
    await scrapeRankings();
  }

  if (mode === 'all' || mode === 'groups') {
    await scrapeGroups();
  }

  if (mode === 'all' || mode === 'events') {
    await scrapeEvents();
  }

  console.log('\nScraping complete!');
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection (ignored):', err?.message || err);
});

scrape().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
