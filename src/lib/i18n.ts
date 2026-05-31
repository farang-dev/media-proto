export type Language = 'en' | 'ja';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    // Header & Navigation
    'nav.home': 'Discovery',
    'nav.rankings': 'Oshi Battle',
    'nav.guide': 'Culture Guide',
    'nav.community': 'Oshi Talks',
    'nav.about': 'About Host Culture',
    'hero.title': 'OshiHost Kabukicho',
    'hero.subtitle': 'Discover Kabukicho\'s top host stars. Browse real-time rankings, explore profiles, and find your perfect host.',
    'hero.cta': 'Browse All Stars',
    'hero.guide_cta': 'Explore Culture Guide',
    
    // Rankings & Battle
    'rank.title': 'Real-Time Oshi Battle',
    'rank.subtitle': 'Support your favorite stars. In host culture, a fan\'s support ("Oshi-katsu") is everything. Cast your daily vote to spot trending hosts.',
    'rank.vote': 'Support Star (Vote)',
    'rank.voted': 'Voted!',
    'rank.already_voted': 'Daily limit reached!',
    'rank.rank': 'Rank',
    'rank.votes': 'Votes',
    'rank.empty': 'No stars found. Run the seed script!',
    'rank.daily': 'Daily Trending',
    'rank.monthly': 'Monthly Stars',
    'rank.featured': 'Featured Host Star',
    
    // Detail Page
    'host.birthday': 'Birthday',
    'host.height': 'Height',
    'host.blood_type': 'Blood Type',
    'host.instagram': 'Instagram',
    'host.twitter': 'X (Twitter)',
    'host.bio': 'Bio & Vibe',
    'host.related_threads': 'Community Topics',
    
    // Guide
    'guide.title': 'Demystifying the Host Club Phenomenon',
    'guide.subtitle': 'A beginner-friendly guide to understanding the host club entertainment culture, safety, and etiquette.',

    // Clubs
    'clubs.title': 'Browse by Club',
    'clubs.subtitle': 'Discover host clubs in Kabukicho. Each group has unique venues and star hosts.',
    'clubs.view_hosts': 'Browse Hosts',
    'clubs.shops': 'venues',
    'clubs.hosts': 'hosts',

    // Community
    'community.title': 'Oshi Talks',
    'community.subtitle': 'Discuss host fashion trends, share experiences, and connect with fans.',
    'community.create_thread': 'Start a New Discussion',
    'community.thread_title_placeholder': 'e.g., Any advice for a solo female traveler visiting Fuyutsuki Group?',
    'community.post': 'Post Topic',
    'community.comment_placeholder': 'Join the conversation...',
    'community.comment_submit': 'Reply',
    'community.anonymous': 'Anonymous',
    
    // Ads
    'ads.hiring': 'Discover Shinjuku nightlife. Leading clubs offer premium VIP reservations and safety-guided access for international guests.',
    'ads.vip_booking': 'Want a safe, guided tour of Kabukicho\'s top host clubs? Contact our bilingual booking assistants.',
  },
  ja: {
    // Header & Navigation
    'nav.home': 'カルチャー発見',
    'nav.rankings': '推しバトル',
    'nav.guide': 'カルチャーガイド',
    'nav.community': '推しトーク',
    'nav.about': 'ホスト文化について',
    'hero.title': '推しホス - 歌舞伎町',
    'hero.subtitle': '歌舞伎町のトップホストスターを発見。リアルタイムランキング、プロフィール、お気に入りのホストを見つけよう。',
    'hero.cta': 'すべてのスターを見る',
    'hero.guide_cta': 'カルチャーガイドを見る',
    
    // Rankings & Battle
    'rank.title': 'リアルタイム推しバトル',
    'rank.subtitle': 'お気に入りのスターを応援しましょう。ホストクラブ文化において「推し活」は最も重要な要素です。毎日投票して最新トレンドを作ろう！',
    'rank.vote': '推す (投票)',
    'rank.voted': '投票完了！',
    'rank.already_voted': '本日の投票は終了しています',
    'rank.rank': '順位',
    'rank.votes': '票',
    'rank.empty': 'ホストが見つかりません。シードを実行してください。',
    'rank.daily': 'デイリー急上昇',
    'rank.monthly': 'マンスリースター',
    'rank.featured': '注目ホストスター',
    
    // Detail Page
    'host.birthday': '誕生日',
    'host.height': '身長',
    'host.blood_type': '血液型',
    'host.instagram': 'Instagram',
    'host.twitter': 'X (Twitter)',
    'host.bio': 'プロフィールと魅力',
    'host.related_threads': '関連コミュニティスレッド',
    
    // Guide
    'guide.title': 'ホストクラブ文化の仕組み',
    'guide.subtitle': '外国人観光客やビギナー向けに、ホストクラブのシステム、マナー、安全ルールを分かりやすく解説。',

    // Clubs
    'clubs.title': 'グループから探す',
    'clubs.subtitle': '歌舞伎町のホストクラブをグループごとに探索。各グループには個性的な店舗とスターが在籍。',
    'clubs.view_hosts': 'ホストを見る',
    'clubs.shops': '店舗',
    'clubs.hosts': '名在籍',

    // Community
    'community.title': '推しトーク',
    'community.subtitle': 'ホストのファッション、体験談、推し活情報をシェアしよう。',
    'community.create_thread': '新しいスレッドを作る',
    'community.thread_title_placeholder': '例：英語で接客できるおすすめのホストクラブってどこ？',
    'community.post': 'スレッドを作成',
    'community.comment_placeholder': '会話に参加する...',
    'community.comment_submit': '返信する',
    'community.anonymous': '匿名さん',
    
    // Ads
    'ads.hiring': '新宿歌舞伎町のナイトカルチャーを体験。大手グループがインバウンド向けに安全な予約プランとVIPシートを提供中。',
    'ads.vip_booking': '外国人観光客向け：歌舞伎町ホストクラブの安全なガイドツアーとバイリンガル予約はこちら。',
  }
};
