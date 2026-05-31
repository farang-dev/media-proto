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
