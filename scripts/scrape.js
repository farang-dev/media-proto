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

const RANKING_URLS = {
  daily: 'https://www.host2.jp/ranking/day14.html',
  weekly: 'https://www.host2.jp/ranking/week14.html',
  monthly: 'https://www.host2.jp/ranking/month14.html'
};

const GROUPS_INDEX_URL = 'https://www.host2.jp/shop_grp/index.html';

const TARGET_GROUP_SLUGS = new Set([
  'groupdandy', 'smappa', 'air', 'acquagroup', 'lcolle', 'fg'
]);

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

async function upsertShop(nameJa, sourceUrl, groupId) {
  const cacheKey = sourceUrl || nameJa;
  if (shopCache[cacheKey]) return shopCache[cacheKey];

  const shopData = { name_ja: nameJa, source_url: sourceUrl, area: 'Kabukicho' };
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

  let instagram = '', twitter = '', tiktok = '';
  $('.staff-profile dl dt, .staff-profile dl dd').each((i, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'dt') {
      const label = $(el).text().trim();
      const link = $(el).next('dd').find('a').attr('href') || '';
      if (label.includes('Instagram')) instagram = link;
      else if (label.includes('X') || label.includes('Twitter')) twitter = link;
      else if (label.includes('TikTok')) tiktok = link;
    }
  });

  const hostBase = hostUrl.startsWith('http') ? new URL(hostUrl).origin : 'https://www.host2.jp';
  const resolveUrl = (u) => {
    if (!u) return '';
    if (u.startsWith('http')) return u;
    return new URL(u, hostBase).href;
  };

  const images = [];

  // Main PR image
  const prImage = resolveUrl($('.staff-dtl-pr img').first().attr('src') || '');
  if (prImage) images.push(prImage);

  // Gallery images — prefer full-res href over thumbnail src
  $('.staff-photo a[rel="lightbox"]').each((_, el) => {
    const href = resolveUrl($(el).attr('href') || '');
    if (href && !images.includes(href)) {
      images.push(href);
    }
  });

  // Also check for images in staff-photo that might not have rel="lightbox"
  $('.staff-photo img').each((_, el) => {
    const src = resolveUrl($(el).attr('src') || '');
    if (src && !images.includes(src)) {
      // Try to promote thumbnail to full-res by removing -m, _m, -thumb suffixes
      const fullRes = src.replace(/-(m|thumb|tn)\./i, '.');
      if (fullRes !== src && !images.includes(fullRes)) {
        images.push(fullRes);
      } else {
        images.push(src);
      }
    }
  });

  // Q&A data
  const qaData = parseQaData($);

  // Bio — use staff-question as fallback or look for a PR comment
  let bioJa = '';
  const prComment = $('.staff-dtl-pr .cmt, .staff-dtl-pr p').first().text().trim();
  if (prComment && prComment.length > 10) bioJa = prComment;

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

      const hostRecord = {
        shop_id: shopId,
        name_ja: profile.name_ja,
        name_en: profile.name_en,
        birthday: profile.birthday,
        height: profile.height,
        blood_type: profile.blood_type,
        instagram_url: profile.instagram_url,
        twitter_url: profile.twitter_url,
        image_urls: profile.image_urls,
        bio_ja: profile.bio_ja,
        bio_en: bioEn || null,
        qa_data: profile.qa_data,
        qa_data_en: qaDataEn,
        source_url: profile.source_url,
        daily_rank: info.daily || null,
        weekly_rank: info.weekly || null,
        monthly_rank: info.monthly || null
      };

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

    if (!TARGET_GROUP_SLUGS.has(slug)) return;

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

    const { data, error } = await supabase
      .from('groups')
      .upsert({
        name_ja: g.nameJa,
        name_en: '',
        name_kana: g.nameKana,
        description_ja: finalDescJa,
        logo_url: g.logoUrl,
        source_url: g.sourceUrl
      }, { onConflict: 'source_url', ignoreDuplicates: false })
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

  const hostRecord = {
    shop_id: shopId,
    name_ja: profile.name_ja,
    name_en: profile.name_en,
    birthday: profile.birthday,
    height: profile.height,
    blood_type: profile.blood_type,
    instagram_url: profile.instagram_url,
    twitter_url: profile.twitter_url,
    image_urls: profile.image_urls,
    bio_ja: profile.bio_ja,
    bio_en: bioEn || null,
    qa_data: profile.qa_data,
    qa_data_en: qaDataEn,
    source_url: profile.source_url
  };

  const { error } = await supabase
    .from('hosts')
    .upsert(hostRecord, { onConflict: 'source_url' });

  if (error) {
    console.error(`  Host upsert error for ${profile.name_ja}: ${error.message}`);
  } else {
    console.log(`  ✓ ${profile.name_ja}${bioEn ? ' (translated)' : ''}`);
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

      const shopId = await upsertShop(shop.name, shop.url, groupId);
      if (!shopId) {
        console.warn(`  Skipping — could not upsert shop`);
        continue;
      }

      try {
        const hostUrls = await parseShopForHosts(shop.url);
        console.log(`  Found ${hostUrls.length} hosts`);

        for (const hostUrl of hostUrls) {
          try {
            await scrapeHostProfile(hostUrl, shopId);
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

async function scrape() {
  const args = process.argv.slice(2);
  const mode = args.includes('--groups-only') ? 'groups' :
               args.includes('--rankings-only') ? 'rankings' : 'all';

  console.log(`Mode: ${mode}\n`);

  if (mode === 'all' || mode === 'rankings') {
    await scrapeRankings();
  }

  if (mode === 'all' || mode === 'groups') {
    await scrapeGroups();
  }

  console.log('\nScraping complete!');
}

scrape().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
