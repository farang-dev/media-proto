-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 0. グループ情報 (Groups)
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ja VARCHAR NOT NULL,
  name_en VARCHAR,
  name_kana VARCHAR,
  description_ja TEXT,
  description_en TEXT,
  logo_url TEXT,
  image_urls TEXT[],
  source_url TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1. 店舗情報 (Shops)
CREATE TABLE IF NOT EXISTS shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ja VARCHAR NOT NULL,
  name_en VARCHAR,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  group_name VARCHAR, -- 冬月, ユグドラシル等 (denormalized convenience)
  area VARCHAR DEFAULT 'Kabukicho',
  address_ja TEXT,
  address_en TEXT,
  description_ja TEXT,
  description_en TEXT,
  phone TEXT,
  hours TEXT,
  regular_holiday TEXT,
  system_info_ja TEXT, -- 料金体系 (JSON文字列)
  system_info_en TEXT,
  logo_url TEXT,
  image_urls TEXT[],
  website_url TEXT,
  source_url TEXT UNIQUE, -- スクレイピング元URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ホスト情報 (Hosts)
CREATE TABLE IF NOT EXISTS hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  name_ja VARCHAR NOT NULL,
  name_en VARCHAR,
  rank_in_shop INT, -- 店舗内公式ランク
  birthday VARCHAR,
  height VARCHAR,
  blood_type VARCHAR,
  instagram_url TEXT,
  twitter_url TEXT,
  tiktok_url TEXT,
  youtube_url TEXT,
  line_id TEXT,
  type_tags TEXT[],
  ratings JSONB,
  image_urls TEXT[], -- 複数画像対応
  bio_ja TEXT,
  bio_en TEXT,
  source_url TEXT UNIQUE,
  daily_rank INT,  -- 歌舞伎町全体デイリーランキング (host2.jp)
  weekly_rank INT, -- 歌舞伎町全体ウィークリーランキング
  monthly_rank INT, -- 歌舞伎町全体マンスリーランキング
  is_active BOOLEAN DEFAULT TRUE,
  view_count INT DEFAULT 0, -- ページアクセス数（アクセスランキング用）
  qa_data JSONB, -- Q&A data (e.g. {"前職":"営業職","出身地":"北海道"})
  qa_data_en JSONB, -- English translation of Q&A data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ユーザー投票・リアルタイムお気に入りランキング (Votes)
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES hosts(id) ON DELETE CASCADE,
  user_ip_or_id VARCHAR NOT NULL, -- 簡易的な重複投票防止用
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. コミュニティスレッド (Threads)
CREATE TABLE IF NOT EXISTS threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  host_id UUID REFERENCES hosts(id) ON DELETE SET NULL, -- 特定ホストに関するスレッド用
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. スレッド内コメント (Comments)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  user_id UUID, -- ログインユーザー用(任意)
  user_name VARCHAR DEFAULT 'Anonymous Princess',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR ALL TABLES
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Groups are viewable by everyone') THEN
    CREATE POLICY "Groups are viewable by everyone" ON groups FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Groups are insertable by service_role') THEN
    CREATE POLICY "Groups are insertable by service_role" ON groups FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Groups are updatable by service_role') THEN
    CREATE POLICY "Groups are updatable by service_role" ON groups FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Shops are viewable by everyone') THEN
    CREATE POLICY "Shops are viewable by everyone" ON shops FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Shops are insertable by service_role') THEN
    CREATE POLICY "Shops are insertable by service_role" ON shops FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Shops are updatable by service_role') THEN
    CREATE POLICY "Shops are updatable by service_role" ON shops FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Hosts are viewable by everyone') THEN
    CREATE POLICY "Hosts are viewable by everyone" ON hosts FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Hosts are insertable by service_role') THEN
    CREATE POLICY "Hosts are insertable by service_role" ON hosts FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Hosts are updatable by service_role') THEN
    CREATE POLICY "Hosts are updatable by service_role" ON hosts FOR UPDATE USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Votes are viewable by everyone') THEN
    CREATE POLICY "Votes are viewable by everyone" ON votes FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Votes can be inserted by everyone') THEN
    CREATE POLICY "Votes can be inserted by everyone" ON votes FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Threads are viewable by everyone') THEN
    CREATE POLICY "Threads are viewable by everyone" ON threads FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Threads can be created by everyone') THEN
    CREATE POLICY "Threads can be created by everyone" ON threads FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Comments are viewable by everyone') THEN
    CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Comments can be created by everyone') THEN
    CREATE POLICY "Comments can be created by everyone" ON comments FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- 7. お気に入り (Favorites / Bookmarks)
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, host_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own favorites') THEN
    CREATE POLICY "Users can view their own favorites"
      ON favorites FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create their own favorites') THEN
    CREATE POLICY "Users can create their own favorites"
      ON favorites FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete their own favorites') THEN
    CREATE POLICY "Users can delete their own favorites"
      ON favorites FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- ============================================================
-- 🚨 MIGRATION: Run this in Supabase SQL Editor for existing DBs
-- ============================================================
-- Copy and paste the section below into the Supabase Dashboard
-- SQL Editor to add columns that may be missing.
-- ============================================================
/*
-- Host reviews/comments
CREATE TABLE host_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES hosts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE host_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Host comments viewable by everyone"
  ON host_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert host comments"
  ON host_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own host comments"
  ON host_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own host comments"
  ON host_comments FOR DELETE USING (auth.uid() = user_id);

-- Shop reviews/comments
CREATE TABLE shop_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shop_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shop comments viewable by everyone"
  ON shop_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert shop comments"
  ON shop_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own shop comments"
  ON shop_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own shop comments"
  ON shop_comments FOR DELETE USING (auth.uid() = user_id);
*/
-- Events table (safe migration)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ja TEXT NOT NULL,
  title_en TEXT,
  description_ja TEXT,
  description_en TEXT,
  shop_name TEXT,
  shop_url TEXT,
  shop_id UUID REFERENCES shops(id) ON DELETE SET NULL,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  event_date DATE NOT NULL,
  source_url TEXT UNIQUE,
  scraped_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Events are viewable by everyone') THEN
    CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Events are insertable by service_role') THEN
    CREATE POLICY "Events are insertable by service_role" ON events FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Events are updatable by service_role') THEN
    CREATE POLICY "Events are updatable by service_role" ON events FOR UPDATE USING (true);
  END IF;
END $$;

-- Shops: add missing columns
ALTER TABLE shops ADD COLUMN IF NOT EXISTS description_ja TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS hours TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS regular_holiday TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS system_info_ja TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS system_info_en TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Hosts: add missing columns
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS qa_data JSONB;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS qa_data_en JSONB;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS line_id TEXT;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS type_tags TEXT[] DEFAULT '{}';
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS ratings JSONB;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS tiktok_url TEXT;
ALTER TABLE hosts ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;
*/
