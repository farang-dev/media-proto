const KATAKANA_TO_ROMAJI: Record<string, string> = {
  ア:'a', イ:'i', ウ:'u', エ:'e', オ:'o',
  カ:'ka', キ:'ki', ク:'ku', ケ:'ke', コ:'ko',
  サ:'sa', シ:'shi', ス:'su', セ:'se', ソ:'so',
  タ:'ta', チ:'chi', ツ:'tsu', テ:'te', ト:'to',
  ナ:'na', ニ:'ni', ヌ:'nu', ネ:'ne', ノ:'no',
  ハ:'ha', ヒ:'hi', フ:'fu', ヘ:'he', ホ:'ho',
  マ:'ma', ミ:'mi', ム:'mu', メ:'me', モ:'mo',
  ヤ:'ya', ユ:'yu', ヨ:'yo',
  ラ:'ra', リ:'ri', ル:'ru', レ:'re', ロ:'ro',
  ワ:'wa', ヲ:'wo', ン:'n',
  ガ:'ga', ギ:'gi', グ:'gu', ゲ:'ge', ゴ:'go',
  ザ:'za', ジ:'ji', ズ:'zu', ゼ:'ze', ゾ:'zo',
  ダ:'da', ヂ:'di', ヅ:'du', デ:'de', ド:'do',
  バ:'ba', ビ:'bi', ブ:'bu', ベ:'be', ボ:'bo',
  パ:'pa', ピ:'pi', プ:'pu', ペ:'pe', ポ:'po',
  キャ:'kya', キュ:'kyu', キョ:'kyo',
  シャ:'sha', シュ:'shu', ショ:'sho',
  チャ:'cha', チュ:'chu', チョ:'cho',
  ニャ:'nya', ニュ:'nyu', ニョ:'nyo',
  ヒャ:'hya', ヒュ:'hyu', ヒョ:'hyo',
  ミャ:'mya', ミュ:'myu', ミョ:'myo',
  リャ:'rya', リュ:'ryu', リョ:'ryo',
  ギャ:'gya', ギュ:'gyu', ギョ:'gyo',
  ジャ:'ja', ジュ:'ju', ジョ:'jo',
  ビャ:'bya', ビュ:'byu', ビョ:'byo',
  ピャ:'pya', ピュ:'pyu', ピョ:'pyo',
};

const SMALL_TSU = 'ッ';

const NAME_OVERRIDES: Record<string, string> = {
  '冬月グループHOLDINGS': 'Fuyutsuki Group Holdings',
  '渚 月': 'Raito Nagisa',
};

const JP_REGEX = /[\u3040-\u309f\u30a0-\u30ff\uff65-\uff9f\u4e00-\u9fff]/;

export function containsJapanese(text: string): boolean {
  return JP_REGEX.test(text);
}

export function katakanaToRomaji(text: string): string {
  if (!text) return '';
  let result = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === 'ー') {
      result += '-';
      i++;
      continue;
    }
    if (text[i] === '・' || text[i] === ' ') {
      result += ' ';
      i++;
      continue;
    }
    if (text[i] === SMALL_TSU) {
      if (i + 1 < text.length) {
        const next = text[i + 1];
        const nextRomaji = KATAKANA_TO_ROMAJI[next];
        if (nextRomaji) {
          result += nextRomaji[0];
        }
      }
      i++;
      continue;
    }
    const twoChar = text.slice(i, i + 2);
    if (KATAKANA_TO_ROMAJI[twoChar]) {
      result += KATAKANA_TO_ROMAJI[twoChar];
      i += 2;
      continue;
    }
    const oneChar = text[i];
    if (KATAKANA_TO_ROMAJI[oneChar]) {
      result += KATAKANA_TO_ROMAJI[oneChar];
      i++;
      continue;
    }
    result += text[i];
    i++;
  }
  return result;
}

export function toRomaji(text: string): string {
  return katakanaToRomaji(text);
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getEnglishName(nameJa: string, nameEn?: string | null): string {
  const key = nameEn || nameJa;
  if (NAME_OVERRIDES[key]) return NAME_OVERRIDES[key];
  if (nameEn && !containsJapanese(nameEn)) {
    return nameEn;
  }
  const romaji = toRomaji(nameEn || nameJa);
  const cleaned = romaji.replace(/-/g, '').replace(/\s+/g, ' ').trim();
  if (containsJapanese(cleaned)) {
    return nameJa;
  }
  return capitalizeWords(cleaned) || nameJa;
}

export function looksLikeDate(value: string): boolean {
  if (!value || value.includes('?') || value.includes('不明')) return false;
  return /\d/.test(value);
}

const PREFECTURE_MAP: Record<string, string> = {
  '北海道': 'Hokkaido', '青森県': 'Aomori', '岩手県': 'Iwate', '宮城県': 'Miyagi',
  '秋田県': 'Akita', '山形県': 'Yamagata', '福島県': 'Fukushima', '茨城県': 'Ibaraki',
  '栃木県': 'Tochigi', '群馬県': 'Gunma', '埼玉県': 'Saitama', '千葉県': 'Chiba',
  '東京都': 'Tokyo', '神奈川県': 'Kanagawa', '新潟県': 'Niigata', '富山県': 'Toyama',
  '石川県': 'Ishikawa', '福井県': 'Fukui', '山梨県': 'Yamanashi', '長野県': 'Nagano',
  '岐阜県': 'Gifu', '静岡県': 'Shizuoka', '愛知県': 'Aichi', '三重県': 'Mie',
  '滋賀県': 'Shiga', '京都府': 'Kyoto', '大阪府': 'Osaka', '兵庫県': 'Hyogo',
  '奈良県': 'Nara', '和歌山県': 'Wakayama', '鳥取県': 'Tottori', '島根県': 'Shimane',
  '岡山県': 'Okayama', '広島県': 'Hiroshima', '山口県': 'Yamaguchi', '徳島県': 'Tokushima',
  '香川県': 'Kagawa', '愛媛県': 'Ehime', '高知県': 'Kochi', '福岡県': 'Fukuoka',
  '佐賀県': 'Saga', '長崎県': 'Nagasaki', '熊本県': 'Kumamoto', '大分県': 'Oita',
  '宮崎県': 'Miyazaki', '鹿児島県': 'Kagoshima', '沖縄県': 'Okinawa',
};

const DISTRICT_MAP: Record<string, string> = {
  '歌舞伎町': 'Kabukicho',
  '新宿': 'Shinjuku',
  '丁目': '-chome',
};

const BUILDING_KATAKANA_MAP: Record<string, string> = {
  'アミューズ': 'Amuse',
  'ビル': 'Building',
  'ビルディング': 'Building',
};

function translateAddressParts(addr: string): string {
  let result = addr;

  // Translate known district names
  for (const [ja, en] of Object.entries(DISTRICT_MAP)) {
    result = result.replace(new RegExp(ja, 'g'), en);
  }

  // Translate known building katakana
  for (const [ja, en] of Object.entries(BUILDING_KATAKANA_MAP)) {
    result = result.replace(new RegExp(ja, 'g'), ' ' + en + ' ');
  }

  // Convert any remaining katakana to romaji
  if (containsJapanese(result)) {
    let out = '';
    let i = 0;
    while (i < result.length) {
      const ch = result[i];
      // Small tsu
      if (ch === SMALL_TSU && i + 1 < result.length) {
        const next = result[i + 1];
        const nextRomaji = KATAKANA_TO_ROMAJI[next];
        if (nextRomaji) out += nextRomaji[0];
        i++;
        continue;
      }
      // Try two-char katakana
      if (i + 1 < result.length) {
        const two = result.slice(i, i + 2);
        if (KATAKANA_TO_ROMAJI[two]) { out += KATAKANA_TO_ROMAJI[two]; i += 2; continue; }
      }
      // Try one-char katakana
      if (KATAKANA_TO_ROMAJI[ch]) { out += KATAKANA_TO_ROMAJI[ch]; i++; continue; }
      // Keep non-katakana as-is
      out += ch;
      i++;
    }
    result = out;
  }

  // Clean up: ensure space between multi-char word and number, but not single-letter codes like B1B2
  result = result.replace(/([a-zA-Z]{2,})(\d)/g, '$1 $2');
  result = result.replace(/(\d)([a-zA-Z]{2,})/g, '$1 $2');
  // Clean up multiple spaces
  result = result.replace(/\s+/g, ' ').trim();

  // Capitalize each word, then fix -chome suffix
  result = capitalizeWords(result).replace(/-Chome/g, '-chome');

  return result;
}

export function getEnglishAddress(addressJa: string | null | undefined): string {
  if (!addressJa) return '';
  let addr = addressJa.replace(/\(地図\)/g, '').replace(/\s+/g, ' ').trim();

  let prefecture = '';
  let rest = addr;
  for (const [ja, en] of Object.entries(PREFECTURE_MAP)) {
    if (addr.startsWith(ja)) {
      prefecture = en;
      rest = addr.slice(ja.length);
      break;
    }
  }

  let city = '';
  const cityMatch = rest.match(/^(.+?[市区町村])/);
  if (cityMatch) {
    city = cityMatch[1];
    rest = rest.slice(cityMatch[1].length);
  }

  const district = translateAddressParts(rest.replace(/\s+/g, ' ').trim());

  const resultParts = [district, city, prefecture].filter(Boolean);
  return resultParts.join(', ');
}

export function getGoogleMapsUrl(shopName: string, addressJa?: string | null): string {
  const query = addressJa
    ? `${shopName} ${addressJa.replace(/\(地図\)/g, '').trim()}`
    : `${shopName} 歌舞伎町 新宿`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
