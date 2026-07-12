import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { hostId } = await request.json();

  if (!hostId) {
    return NextResponse.json({ error: 'hostId is required' }, { status: 400 });
  }

  const { data: host, error: fetchError } = await supabase
    .from('hosts')
    .select('view_count')
    .eq('id', hostId)
    .single();

  if (fetchError || !host) {
    return NextResponse.json({ error: 'Host not found' }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from('hosts')
    .update({ view_count: (host.view_count || 0) + 1 })
    .eq('id', hostId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, viewCount: (host.view_count || 0) + 1 });
}
