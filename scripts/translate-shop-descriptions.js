/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase variables. Check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

async function main() {
  console.log('Fetching shops with Japanese descriptions...\n');

  const { data: shops, error } = await supabase
    .from('shops')
    .select('id, name_ja, description_ja, description_en');

  if (error) {
    console.error('Failed to fetch shops:', error.message);
    process.exit(1);
  }

  const toTranslate = (shops || []).filter(
    g => g.description_ja && (!g.description_en || g.description_en === g.description_ja)
  );

  console.log(`Found ${shops?.length || 0} total shops, ${toTranslate.length} need translation\n`);

  for (const shop of toTranslate) {
    process.stdout.write(`${shop.name_ja}: translating... `);
    const en = await translateText(shop.description_ja);
    if (!en || en === shop.description_ja) {
      console.log('skipped (no change)');
      continue;
    }
    const { error: updateError } = await supabase
      .from('shops')
      .update({ description_en: en })
      .eq('id', shop.id);
    if (updateError) {
      console.log(`FAILED: ${updateError.message}`);
    } else {
      console.log('✓');
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\nDone!');
}

main().catch(console.error);
