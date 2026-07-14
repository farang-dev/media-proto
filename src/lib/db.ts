import { supabase } from './supabase';

export interface Group {
  id: string;
  name_ja: string;
  name_en: string;
  name_kana: string;
  description_ja: string;
  description_en?: string;
  logo_url: string;
  image_urls?: string[];
  source_url: string;
}

export interface Shop {
  id: string;
  name_ja: string;
  name_en: string;
  group_id?: string;
  group?: Group;
  group_name: string;
  area: string;
  address_ja: string;
  address_en: string;
  description_ja?: string;
  description_en?: string;
  image_urls?: string[];
  system_info_ja: string;
  system_info_en: string;
  logo_url: string;
  website_url: string;
  latitude?: number;
  longitude?: number;
}

export interface QaItem {
  question: string;
  answer: string;
}

export interface Host {
  id: string;
  shop_id: string;
  name_ja: string;
  name_en: string;
  rank_in_shop?: number;
  birthday?: string;
  height?: string;
  blood_type?: string;
  instagram_url?: string;
  twitter_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
  line_id?: string;
  type_tags?: string[];
  ratings?: Record<string, { filled: number; total: number }>;
  image_urls: string[];
  bio_ja?: string;
  bio_en?: string;
  qa_data?: Record<string, string>;
  qa_data_en?: Record<string, { q: string; a: string }>;
  daily_rank?: number;
  weekly_rank?: number;
  monthly_rank?: number;
  is_active: boolean;
  view_count?: number;
  votes_count?: number;
  shop?: Shop;
}

export interface Thread {
  id: string;
  title: string;
  host_id?: string;
  created_at: string;
  comments_count?: number;
}

export interface Comment {
  id: string;
  thread_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

// Fetch all groups with their shops
export async function getGroups(): Promise<Group[]> {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('name_ja', { ascending: true });

  if (error) {
    console.error('Error fetching groups:', error.message);
    return [];
  }
  return data || [];
}

export interface GroupClub extends Group {
  shops: {
    id: string;
    name_ja: string;
    name_en: string;
    description_en?: string;
    logo_url?: string;
    hosts_count: number;
    hosts_sample: { id: string; name_ja: string; name_en: string; image_urls: string[] }[];
  }[];
  shops_count: number;
  hosts_count: number;
}

// Fetch groups with their shops and host counts
export async function getGroupClubs(): Promise<GroupClub[]> {
  const { data: groupsData, error: groupsError } = await supabase
    .from('groups')
    .select('*')
    .order('name_ja', { ascending: true });

  if (groupsError || !groupsData) {
    console.error('getGroupClubs: failed to fetch groups', groupsError?.message);
    return [];
  }

  const { data: shopsData, error: shopsError } = await supabase
    .from('shops')
    .select('id, name_ja, name_en, description_en, logo_url, group_id, address_ja');

  if (shopsError) {
    console.error('getGroupClubs: failed to fetch shops', shopsError.message);
    return [];
  }

  // Paginate through all hosts (Supabase max 1000 per query)
  const hostCountMap: Record<string, number> = {};
  const hostSampleMap: Record<string, { id: string; name_ja: string; name_en: string; image_urls: string[] }[]> = {};
  let from = 0;
  const pageSize = 1000;
  let hostsError: string | null = null;
  while (true) {
    const { data, error } = await supabase
      .from('hosts')
      .select('id, shop_id, name_ja, name_en, image_urls')
      .range(from, from + pageSize - 1);
    if (error) {
      hostsError = error.message;
      break;
    }
    if (!data || data.length === 0) break;
    for (const h of data) {
      if (!h.shop_id) continue;
      hostCountMap[h.shop_id] = (hostCountMap[h.shop_id] || 0) + 1;
      if (!hostSampleMap[h.shop_id]) hostSampleMap[h.shop_id] = [];
      if (hostSampleMap[h.shop_id].length < 4) {
        hostSampleMap[h.shop_id].push({
          id: h.id,
          name_ja: h.name_ja,
          name_en: h.name_en,
          image_urls: h.image_urls,
        });
      }
    }
    if (data.length < pageSize) break;
    from += pageSize;
  }
  if (hostsError) {
    console.error('getGroupClubs: failed to fetch hosts', hostsError);
  }

  const shopMap: Record<string, { id: string; name_ja: string; name_en: string; description_en?: string; logo_url?: string }[]> = {};
  for (const s of shopsData || []) {
    if (s.address_ja && !s.address_ja.includes('歌舞伎町')) continue;
    const gid = s.group_id || '';
    if (!shopMap[gid]) shopMap[gid] = [];
    shopMap[gid].push({ id: s.id, name_ja: s.name_ja, name_en: s.name_en, description_en: s.description_en, logo_url: s.logo_url });
  }

  return groupsData.map((g) => {
    const shops = shopMap[g.id] || [];
    const shopsWithHosts = shops.map((s) => ({
      id: s.id,
      name_ja: s.name_ja,
      name_en: s.name_en,
      description_en: s.description_en,
      logo_url: s.logo_url,
      hosts_count: hostCountMap[s.id] || 0,
      hosts_sample: hostSampleMap[s.id] || [],
    }));
    return {
      ...g,
      shops: shopsWithHosts,
      shops_count: shopsWithHosts.length,
      hosts_count: shopsWithHosts.reduce((sum, s) => sum + s.hosts_count, 0),
    };
  }).filter((g) => g.shops_count > 0);
}

// Fetch a single shop with all its hosts
export async function getShopWithHosts(id: string): Promise<{ shop: Shop | null; hosts: Host[] }> {
  const { data: shopData, error: shopError } = await supabase
    .from('shops')
    .select('*, group:groups(*)')
    .eq('id', id)
    .single();

  if (shopError || !shopData) {
    console.error('Error fetching shop:', shopError?.message);
    return { shop: null, hosts: [] };
  }

  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .eq('shop_id', id)
    .order('name_ja', { ascending: true });

  if (hostsError) {
    console.error('Error fetching hosts for shop:', hostsError.message);
    return { shop: shopData, hosts: [] };
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  return {
    shop: shopData,
    hosts: (hostsData || []).map((h: Record<string, unknown>) => ({
      ...h,
      votes_count: voteCounts[h.id as string] || 0,
    } as unknown as Host)).sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0)),
  };
}

// Fetch all hosts with their vote count
export async function getHosts(): Promise<Host[]> {
  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))');

  if (hostsError) {
    console.error('Error fetching hosts:', hostsError.message);
    return [];
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  return (hostsData || []).map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: voteCounts[h.id as string] || 0,
  } as unknown as Host)).sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0));
}

// Fetch top N hosts by vote count (for hero gallery)
export async function getTopHosts(limit: number = 6): Promise<Host[]> {
  const hosts = await getHosts();
  return hosts.slice(0, limit);
}

// Fetch Kabukicho ranking by daily/weekly/monthly rank from host2.jp
export async function getKabukichoRanking(type: 'daily' | 'weekly' | 'monthly'): Promise<Host[]> {
  const rankColumn = type === 'daily' ? 'daily_rank' : type === 'weekly' ? 'weekly_rank' : 'monthly_rank';

  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .not(rankColumn, 'is', null)
    .order(rankColumn, { ascending: true })
    .limit(50);

  if (hostsError) {
    console.error('Error fetching ranking:', hostsError.message);
    return [];
  }

  return (hostsData || []).map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: 0,
  } as unknown as Host));
}

// Cast a vote for a host (login required)
export async function castVote(hostId: string, userId: string): Promise<{ success: boolean; message: string }> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Fairness check 1: already voted for this host in 24h
  const { data: existingVotes, error: checkError } = await supabase
    .from('votes')
    .select('id')
    .eq('host_id', hostId)
    .eq('user_ip_or_id', userId)
    .gt('created_at', twentyFourHoursAgo);

  if (checkError) {
    return { success: false, message: checkError.message };
  }

  if (existingVotes && existingVotes.length > 0) {
    return { success: false, message: 'already_voted' };
  }

  // Fairness check 2: max 10 votes per 24h per user (anti-bot)
  const { data: recentVotes, error: countError } = await supabase
    .from('votes')
    .select('id', { count: 'exact' })
    .eq('user_ip_or_id', userId)
    .gt('created_at', twentyFourHoursAgo);

  if (countError) {
    return { success: false, message: countError.message };
  }

  if (recentVotes && recentVotes.length >= 10) {
    return { success: false, message: 'daily_limit_reached' };
  }

  // Insert vote
  const { error: insertError } = await supabase
    .from('votes')
    .insert([{ host_id: hostId, user_ip_or_id: userId }]);

  if (insertError) {
    return { success: false, message: insertError.message };
  }

  return { success: true, message: 'voted' };
}

// Get forum threads
export async function getThreads(): Promise<Thread[]> {
  const { data: threadsData, error: threadsError } = await supabase
    .from('threads')
    .select('*')
    .order('created_at', { ascending: false });

  if (threadsError) {
    console.error('Error fetching threads:', threadsError.message);
    return [];
  }

  // Get comments counts
  const { data: commentsData } = await supabase.from('comments').select('thread_id');
  const commentCounts: { [key: string]: number } = {};
  if (commentsData) {
    commentsData.forEach((c) => {
      commentCounts[c.thread_id] = (commentCounts[c.thread_id] || 0) + 1;
    });
  }

  return (threadsData || []).map((t: Record<string, unknown>) => ({
    ...t,
    comments_count: commentCounts[t.id as string] || 0,
  } as unknown as Thread));
}

// Create a new forum thread
export async function createThread(title: string, hostId?: string): Promise<Thread | null> {
  const { data, error } = await supabase
    .from('threads')
    .insert([{ title, host_id: hostId }])
    .select();

  if (error) {
    console.error('Error creating thread:', error.message);
    return null;
  }
  return data ? data[0] : null;
}

// Get comments for a thread
export async function getComments(threadId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error.message);
    return [];
  }
  return data || [];
}

// Fetch a single host by ID with shop data and vote count
export async function getHost(id: string): Promise<Host | null> {
  const { data, error } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching host:', error.message);
    return null;
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id')
    .eq('host_id', id);

  return {
    ...data,
    votes_count: votesData?.length || 0,
  } as Host;
}

// Fetch other hosts from the same shop
export async function getHostsByShop(shopId: string, excludeId?: string): Promise<Host[]> {
  let query = supabase
    .from('hosts')
    .select('id, name_ja, name_en, image_urls, shop_id')
    .eq('shop_id', shopId)
    .limit(8);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching hosts by shop:', error.message);
    return [];
  }

  return (data || []) as Host[];
}

// Fetch random hosts for Hos-Match
export async function getRandomHosts(count: number = 20): Promise<Host[]> {
  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .limit(50);

  if (hostsError) {
    console.error('Error fetching random hosts:', hostsError.message);
    return [];
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  const hosts = (hostsData || []).map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: voteCounts[h.id as string] || 0,
  } as unknown as Host));

  return hosts.sort(() => Math.random() - 0.5).slice(0, count);
}

// Fetch all hosts that have at least one image, shuffled randomly (for Hos-Match)
export async function getAllHostsForMatching(): Promise<Host[]> {
  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .not('image_urls', 'is', null);

  if (hostsError) {
    console.error('Error fetching hosts for matching:', hostsError.message);
    return [];
  }

  const hostsWithImages = (hostsData || []).filter(
    (h: Record<string, unknown>) => Array.isArray(h.image_urls) && (h.image_urls as string[]).length > 0
  );

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  const hosts = hostsWithImages.map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: voteCounts[h.id as string] || 0,
  } as unknown as Host));

  return hosts.sort(() => Math.random() - 0.5);
}

// Add a comment to a thread
export async function addComment(threadId: string, content: string, userName?: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ thread_id: threadId, content, user_name: userName || 'Anonymous' }])
    .select();

  if (error) {
    console.error('Error posting comment:', error.message);
    return null;
  }
  return data ? data[0] : null;
}

// Get hosts that were recently favorited by anyone (for fairness/dynamic feed)
export async function getRecentlyFavoritedHosts(
  limit: number = 12,
  hours: number = 48
): Promise<Host[]> {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  const { data: favData, error: favError } = await supabase
    .from('favorites')
    .select('host_id, created_at')
    .gt('created_at', since)
    .order('created_at', { ascending: false });

  if (favError) {
    console.error('Error fetching recent favorites:', favError.message);
    return [];
  }

  if (!favData || favData.length === 0) return [];

  // Deduplicate and keep most recent per host
  const seen = new Set<string>();
  const recentIds: string[] = [];
  for (const f of favData) {
    if (!seen.has(f.host_id)) {
      seen.add(f.host_id);
      recentIds.push(f.host_id);
      if (recentIds.length >= limit) break;
    }
  }

  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .in('id', recentIds);

  if (hostsError) {
    console.error('Error fetching recently favorited hosts:', hostsError.message);
    return [];
  }

  const hostMap = new Map(hostsData.map(h => [h.id, h]));
  return recentIds.map(id => hostMap.get(id)).filter(Boolean) as Host[];
}

// ── Favorites / Bookmarks ──

export async function getFavoriteIds(): Promise<string[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('favorites')
    .select('host_id')
    .eq('user_id', user.id);
  if (error) {
    console.error('Error fetching favorites:', error.message);
    return [];
  }
  return (data || []).map(f => f.host_id);
}

export async function addFavorite(hostId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: user.id, host_id: hostId }]);
  if (error) {
    console.error('Error adding favorite:', error.message);
    return false;
  }
  return true;
}

// ── Host / Shop Comments (Reviews) ──

export interface HostComment {
  id: string;
  host_id: string;
  user_id: string;
  display_name: string;
  content: string;
  created_at: string;
}

export interface ShopComment {
  id: string;
  shop_id: string;
  user_id: string;
  display_name: string;
  content: string;
  created_at: string;
}

export async function getHostComments(hostId: string): Promise<HostComment[]> {
  const { data, error } = await supabase
    .from('host_comments')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false });
  if (error) { console.error('getHostComments:', error.message); return []; }
  return data || [];
}

export async function addHostComment(hostId: string, content: string): Promise<HostComment | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';
  const { data, error } = await supabase
    .from('host_comments')
    .insert([{ host_id: hostId, user_id: user.id, content, display_name: displayName }])
    .select()
    .single();
  if (error) { console.error('addHostComment:', error.message); return null; }
  return data;
}

export async function deleteHostComment(id: string): Promise<boolean> {
  const { error } = await supabase.from('host_comments').delete().eq('id', id);
  return !error;
}

export async function getShopComments(shopId: string): Promise<ShopComment[]> {
  const { data, error } = await supabase
    .from('shop_comments')
    .select('*')
    .eq('shop_id', shopId)
    .order('created_at', { ascending: false });
  if (error) { console.error('getShopComments:', error.message); return []; }
  return data || [];
}

export async function addShopComment(shopId: string, content: string): Promise<ShopComment | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';
  const { data, error } = await supabase
    .from('shop_comments')
    .insert([{ shop_id: shopId, user_id: user.id, content, display_name: displayName }])
    .select()
    .single();
  if (error) { console.error('addShopComment:', error.message); return null; }
  return data;
}

export async function deleteShopComment(id: string): Promise<boolean> {
  const { error } = await supabase.from('shop_comments').delete().eq('id', id);
  return !error;
}

export interface EventItem {
  id: string;
  title_ja: string;
  title_en?: string;
  description_ja?: string;
  description_en?: string;
  shop_name: string;
  shop_url?: string;
  shop_id?: string;
  group_id?: string;
  event_date: string;
  group?: Group;
  shop?: Shop;
}

export async function getEvents(): Promise<EventItem[]> {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffset);
  const today = jstNow.toISOString().slice(0, 10);
  const weekLater = new Date(jstNow.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('events')
    .select('*, group:groups(*), shop:shops(*)')
    .not('shop_id', 'is', null)
    .gte('event_date', today)
    .lte('event_date', weekLater)
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error.message);
    return [];
  }
  return data || [];
}

export async function removeFavorite(hostId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('host_id', hostId);
  if (error) {
    console.error('Error removing favorite:', error.message);
    return false;
  }
  return true;
}

// ── No.1 Host (rank_in_shop = 1 per shop) ──

export async function getNo1Hosts(): Promise<Host[]> {
  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .eq('rank_in_shop', 1)
    .eq('is_active', true);

  if (hostsError) {
    console.error('Error fetching No.1 hosts:', hostsError.message);
    return [];
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  return (hostsData || []).map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: voteCounts[h.id as string] || 0,
  } as unknown as Host));
}

// ── Access Ranking (by view_count) ──

export async function getAccessRanking(limit: number = 50): Promise<Host[]> {
  const { data: hostsData, error: hostsError } = await supabase
    .from('hosts')
    .select('*, shop:shops(*, group:groups(*))')
    .eq('is_active', true)
    .order('view_count', { ascending: false })
    .limit(limit);

  if (hostsError) {
    console.error('Error fetching access ranking:', hostsError.message);
    return [];
  }

  const { data: votesData } = await supabase
    .from('votes')
    .select('host_id');

  const voteCounts: { [key: string]: number } = {};
  if (votesData) {
    votesData.forEach((v) => {
      voteCounts[v.host_id] = (voteCounts[v.host_id] || 0) + 1;
    });
  }

  return (hostsData || []).map((h: Record<string, unknown>) => ({
    ...h,
    votes_count: voteCounts[h.id as string] || 0,
  } as unknown as Host));
}

// ── Record a host page view ──

export async function recordHostView(hostId: string): Promise<void> {
  try {
    await fetch('/api/host-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostId }),
    });
  } catch (e) {
    console.error('Failed to record host view:', e);
  }
}

// ── Map: Shops with coordinates ──

export async function getShopsWithCoordinates(): Promise<Shop[]> {
  const { data, error } = await supabase
    .from('shops')
    .select('*, group:groups(*)')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .order('name_ja');

  if (error) {
    console.error('Error fetching shops with coordinates:', error.message);
    return [];
  }

  return (data || []) as Shop[];
}
