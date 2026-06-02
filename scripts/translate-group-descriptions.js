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
  console.log('Fetching groups with Japanese descriptions...\n');

  const { data: groups, error } = await supabase
    .from('groups')
    .select('id, name_ja, description_ja, description_en');

  if (error) {
    console.error('Failed to fetch groups:', error.message);
    process.exit(1);
  }

  const toTranslate = (groups || []).filter(
    g => g.description_ja && (!g.description_en || g.description_en === g.description_ja)
  );

  console.log(`Found ${groups?.length || 0} total groups, ${toTranslate.length} need translation\n`);

  for (const group of toTranslate) {
    process.stdout.write(`${group.name_ja}: translating... `);
    const en = await translateText(group.description_ja);
    if (!en || en === group.description_ja) {
      console.log('skipped (no change)');
      continue;
    }
    const { error: updateError } = await supabase
      .from('groups')
      .update({ description_en: en })
      .eq('id', group.id);
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
