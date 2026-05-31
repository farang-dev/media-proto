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
  system_info_ja: string;
  system_info_en: string;
  logo_url: string;
  website_url: string;
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
  image_urls: string[];
  bio_ja?: string;
  bio_en?: string;
  qa_data?: Record<string, string>;
  qa_data_en?: Record<string, { q: string; a: string }>;
  daily_rank?: number;
  weekly_rank?: number;
  monthly_rank?: number;
  is_active: boolean;
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
    .select('id, name_ja, name_en, group_id');

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

  const shopMap: Record<string, { id: string; name_ja: string; name_en: string }[]> = {};
  for (const s of shopsData || []) {
    const gid = s.group_id || '';
    if (!shopMap[gid]) shopMap[gid] = [];
    shopMap[gid].push({ id: s.id, name_ja: s.name_ja, name_en: s.name_en });
  }

  return groupsData.map((g) => {
    const shops = shopMap[g.id] || [];
    const shopsWithHosts = shops.map((s) => ({
      id: s.id,
      name_ja: s.name_ja,
      name_en: s.name_en,
      hosts_count: hostCountMap[s.id] || 0,
      hosts_sample: hostSampleMap[s.id] || [],
    }));
    return {
      ...g,
      shops: shopsWithHosts,
      shops_count: shopsWithHosts.length,
      hosts_count: shopsWithHosts.reduce((sum, s) => sum + s.hosts_count, 0),
    };
  });
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

// Cast a vote for a host
export async function castVote(hostId: string, ipOrId: string): Promise<{ success: boolean; message: string }> {
  // Check if they already voted in the last 24 hours for this host
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: existingVotes, error: checkError } = await supabase
    .from('votes')
    .select('id')
    .eq('host_id', hostId)
    .eq('user_ip_or_id', ipOrId)
    .gt('created_at', twentyFourHoursAgo);

  if (checkError) {
    return { success: false, message: checkError.message };
  }

  if (existingVotes && existingVotes.length > 0) {
    return { success: false, message: 'already_voted' };
  }

  // Insert vote
  const { error: insertError } = await supabase
    .from('votes')
    .insert([{ host_id: hostId, user_ip_or_id: ipOrId }]);

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
