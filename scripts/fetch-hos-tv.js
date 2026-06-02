/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Fetches the latest videos from known host YouTuber channels via YouTube RSS
 * and regenerates src/data/hos-tv.ts with the freshest content.
 *
 * Usage: node scripts/fetch-hos-tv.js
 * Add to cron to run daily alongside scrape.js.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '../src/data/hos-tv.ts');

const CHANNELS = [
  {
    id: 'mioyashiro',
    name_ja: 'Mio Yashiro TV',
    name_en: 'Mio Yashiro TV',
    handle: '@mioyashirotv5415',
    description_ja: 'Group YGD会長 社美緒の公式チャンネル。ホスト業界の最前線を発信。',
    description_en: 'Official channel of Mio Yashiro, president of Group YGD.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@mioyashirotv5415',
    channelId: 'UCH6wqY1Ve2N47oKZ4tgirqA',
  },
  {
    id: 'sukima',
    name_ja: 'りっくんのすきま',
    name_en: "Rikkun's Sukima",
    handle: '@sukima_watabokori',
    description_ja: '陸斗さんのチャンネル。ほすちるメンバーがお届けする歌舞伎町の日常。',
    description_en: "Rikkun's personal channel. Daily life in Kabukicho.",
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@sukima_watabokori',
    channelId: 'UCXTd3T-pvVD0TgjT9smn7HQ',
  },
  {
    id: 'hostchildren',
    name_ja: 'ほすちる「Host children」',
    name_en: 'Host children',
    handle: '@-Hostchildren',
    description_ja: '歌舞伎町現役ホスト210K登録者チャンネル。話題のりっくんを中心にホスト業界のリアルを配信。',
    description_en: '210K+ subscriber channel run by active Kabukicho hosts.',
    subscriberCount: '210K+',
    channelUrl: 'https://www.youtube.com/@-Hostchildren',
    channelId: 'UCth8GGZ6EjARHI1Hhx-cgjg',
  },
  {
    id: 'jituroku',
    name_ja: '実録ホスメンタリー',
    name_en: 'Jitsuroku Hosumentary',
    handle: '@jiturokuhosumentari',
    description_ja: 'エルコレ「club Leo」を中心に、キャストたちのリアルな日常と葛藤を追う密着ドキュメンタリー。15言語字幕対応。',
    description_en: 'Documentary series following host club "Leo" cast members.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@jiturokuhosumentari',
    channelId: 'UCxERO5haw0vzwIY1_xqdAdg',
  },
  {
    id: 'kabukicholcolle',
    name_ja: 'エルコレ〜歌舞伎超TV〜',
    name_en: 'ERCOLLE Kabukicho TV',
    handle: '@kabukicholcolle',
    description_ja: '歌舞伎町を中心に全国展開する「エルコレ」の一推しチャンネル。軍神「心湊 一希」が魅せるホストクラブのリアルな裏側。',
    description_en: 'Official ERCOLLE channel featuring nationwide host clubs.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@kabukicholcolle',
    channelId: 'UCXE7B45KTRYX-I3XPFDnE4g',
  },
];

function fetchRSS(channelId) {
  return new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

function parseEntries(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRegex.exec(xml)) !== null) {
    const entry = m[1];
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
    if (id && title) {
      entries.push({ id, title: decodeEntities(title), isShort: link?.includes('/shorts/') });
    }
  }
  return entries;
}

function escape(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function generateTS(channelsWithVideos) {
  let out = '';
  out += 'export interface HosTvVideo {\n';
  out += '  id: string;\n';
  out += '  title_ja: string;\n';
  out += '  title_en: string | null;\n';
  out += '}\n\n';
  out += 'export interface HosTvChannel {\n';
  out += '  id: string;\n';
  out += '  name_ja: string;\n';
  out += '  name_en: string;\n';
  out += '  handle: string;\n';
  out += '  description_ja: string;\n';
  out += '  description_en: string;\n';
  out += '  subscriberCount: string;\n';
  out += '  channelUrl: string;\n';
  out += '  channelId: string;\n';
  out += '  videos: HosTvVideo[];\n';
  out += '}\n\n';
  out += 'export const channels: HosTvChannel[] = [\n';

  for (const ch of channelsWithVideos) {
    out += `  {\n`;
    out += `    id: '${ch.id}',\n`;
    out += `    name_ja: '${escape(ch.name_ja)}',\n`;
    out += `    name_en: '${escape(ch.name_en)}',\n`;
    out += `    handle: '${ch.handle}',\n`;
    out += `    description_ja: '${escape(ch.description_ja)}',\n`;
    out += `    description_en: '${escape(ch.description_en)}',\n`;
    out += `    subscriberCount: '${ch.subscriberCount}',\n`;
    out += `    channelUrl: '${ch.channelUrl}',\n`;
    out += `    channelId: '${ch.channelId}',\n`;
    out += `    videos: [\n`;
    for (const v of ch.videos) {
      out += `      { id: '${v.id}', title_ja: '${escape(v.title)}', title_en: null },\n`;
    }
    out += `    ],\n`;
    out += `  },\n`;
  }

  out += '];\n';
  return out;
}

async function main() {
  console.log('🎬 Fetching hos-tv RSS feeds...\n');

  const results = [];

  for (const ch of CHANNELS) {
    try {
      console.log(`  📡 ${ch.name_ja} (${ch.channelId})`);
      const xml = await fetchRSS(ch.channelId);
      const entries = parseEntries(xml);
      console.log(`     → ${entries.length} entries found`);

      // Prioritize full-length videos, cap at 10 total
      const full = entries.filter(e => !e.isShort).slice(0, 8);
      const shorts = entries.filter(e => e.isShort).slice(0, 4);
      const videos = [...full, ...shorts].slice(0, 10);

      results.push({ ...ch, videos });
    } catch (err) {
      console.error(`  ❌ ${ch.name_ja}: ${err.message}`);
      // Fall back to empty list so the file stays valid
      results.push({ ...ch, videos: [] });
    }
  }

  const ts = generateTS(results);
  fs.writeFileSync(DATA_FILE, ts, 'utf8');

  const total = results.reduce((sum, ch) => sum + ch.videos.length, 0);
  console.log(`\n✅ Written ${DATA_FILE} — ${total} videos across ${results.length} channels`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
