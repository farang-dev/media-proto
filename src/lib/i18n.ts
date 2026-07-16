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
    'nav.rankings': 'Ranking',
    'nav.guide': 'Culture Guide',
    'nav.community': 'Threads',
    'nav.hostv': 'Hos-TV',
    'nav.about': 'About Host Culture',
    'hero.title': 'OshiHos KABUKICHO HOST',
    'hero.subtitle': 'Discover Kabukicho\'s top host stars. Browse real-time rankings, explore profiles, and find your perfect host.',
    'hero.cta': 'Browse All Stars',
    'hero.guide_cta': 'Explore Culture Guide',
    
    // Rankings & Battle
    'rank.title': 'Real-Time Oshi Ranking',
    'rank.subtitle': 'Support your favorite stars. In host culture, a fan\'s support ("Oshi-katsu") is everything. Cast your daily vote to spot trending hosts.',
    'rank.vote': 'Support Star (Vote)',
    'rank.voted': 'Voted!',
    'rank.already_voted': 'Already voted for this star today!',
    'rank.daily_limit': 'Daily vote limit reached (10/10). Try again tomorrow!',
    'rank.login_required': 'Sign in to support this star!',
    'rank.rank': 'Rank',
    'rank.votes': 'Votes',
    'rank.empty': 'No stars found. Run the seed script!',
    'rank.daily': 'Daily Trending',
    'rank.monthly': 'Monthly Stars',
    'rank.featured': 'Featured Host Star',
    'rank.no1': 'No.1 Host',
    'rank.access': 'Access Ranking',
    
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
    'clubs.title': 'Browse Host Clubs',
    'clubs.subtitle': 'The 6 major host club groups featured in Oshihost. Browse their top-ranked hosts and find the best clubs in Kabukicho.',
    'clubs.view_hosts': 'Browse Hosts',
    'clubs.shops': 'venues',
    'clubs.hosts': 'hosts',

    // Community
    'community.title': 'Threads',
    'community.subtitle': 'Discuss host fashion trends, share experiences, and connect with fans.',
    'community.create_thread': 'Start a New Discussion',
    'community.thread_title_placeholder': 'e.g., Any advice for a solo female traveler visiting Fuyutsuki Group?',
    'community.post': 'Post Topic',
    'community.comment_placeholder': 'Join the conversation...',
    'community.comment_submit': 'Reply',
    'community.anonymous': 'Anonymous',
    
    // Hos-Match
    'match.title': 'Hos-Match',
    'match.subtitle': 'Swipe right to like, left to pass. Find your perfect host!',
    'match.like': 'Like',
    'match.nope': 'Nope',
    'match.view_profile': 'View Profile',
    'match.no_more': 'No more hosts to show',
    'match.reset': 'Start Over',
    'match.liked': 'Liked!',
    'match.saved': 'Saved to Favorites',
    'match.signup_title': 'Great matches! 🎉',
    'match.signup_text': 'Sign up to save your favorites and never lose a match.',
    'match.signup_cta': 'Create Account',
    'match.later': 'Maybe later',
    'match.likes_left': 'likes left to save',
    
    // Ads
    // Events
    'events.title': 'Kabukicho Events',
    'events.subtitle': 'Weekly schedule of host club events in Kabukicho. Parties, special days, and more!',
    'events.no_events': 'No events scheduled this week.',
    'events.this_week': 'This Week\'s Events',
    'events.at': 'at',

    'culture.title': 'Know Host Culture',
    'culture.subtitle': 'Get insider knowledge about Kabukicho host clubs — from a beginner\'s first visit to understanding the groups, pricing, and etiquette.',
    'culture.watch_video': 'Host Culture Basics',
    'culture.read_more': 'Read More Guides',
  },
  ja: {
    // Header & Navigation
    'nav.home': 'カルチャー発見',
    'nav.rankings': 'ランキング',
    'nav.guide': 'カルチャーガイド',
    'nav.community': '推しトーク',
    'nav.hostv': 'ホスTV',
    'nav.about': 'ホスト文化について',
    'hero.title': '推しホス - 歌舞伎町',
    'hero.subtitle': '歌舞伎町のトップホストスターを発見。リアルタイムランキング、プロフィール、お気に入りのホストを見つけよう。',
    'hero.cta': 'すべてのスターを見る',
    'hero.guide_cta': 'カルチャーガイドを見る',
    
    // Rankings & Battle
    'rank.title': 'リアルタイム推しランキング',
    'rank.subtitle': 'お気に入りのスターを応援しましょう。ホストクラブ文化において「推し活」は最も重要な要素です。毎日投票して最新トレンドを作ろう！',
    'rank.vote': '推す (投票)',
    'rank.voted': '投票完了！',
    'rank.already_voted': 'このホストにはすでに投票済みです',
    'rank.daily_limit': '本日の投票上限（10回）に達しました。また明日！',
    'rank.login_required': 'ログインして推しを応援しよう！',
    'rank.rank': '順位',
    'rank.votes': '票',
    'rank.empty': 'ホストが見つかりません。シードを実行してください。',
    'rank.daily': 'デイリー急上昇',
    'rank.monthly': 'マンスリースター',
    'rank.featured': '注目ホストスター',
    'rank.no1': 'No.1 ホスト',
    'rank.access': 'アクセスランキング',
    
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
    'clubs.title': 'Browse Host Clubs',
    'clubs.subtitle': 'オシホスト掲載の大手ホストクラブグループ6店。トップホストを探して、歌舞伎町で最高のクラブを見つけよう。',
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
    
    // Hos-Match
    'match.title': 'ホスマッチ',
    'match.subtitle': '右にスワイプでLike、左でスキップ。理想のホストに出会おう！',
    'match.like': 'いいね！',
    'match.nope': 'スキップ',
    'match.view_profile': 'プロフィールを見る',
    'match.no_more': '表示できるホストがいません',
    'match.reset': '最初から',
    'match.liked': 'いいね！',
    'match.saved': 'お気に入りに保存しました',
    'match.signup_title': 'いいマッチですね！🎉',
    'match.signup_text': 'アカウントを作成して、お気に入りを保存しよう。',
    'match.signup_cta': 'アカウント作成',
    'match.later': 'あとで',
    'match.likes_left': 'あとのいいねで保存可能',
    
    // Ads
    // Events
    'events.title': '歌舞伎町イベント',
    'events.subtitle': '歌舞伎町ホストクラブの今週のイベントスケジュール。パーティー、感謝デーなど盛りだくさん！',
    'events.no_events': '今週予定されているイベントはありません。',
    'events.this_week': '今週のイベント',
    'events.at': '開催',

    'culture.title': 'ホスト文化を知る',
    'culture.subtitle': '歌舞伎町ホストクラブの全てがわかる — 初めての方から上級者まで、グループ、料金、マナーを徹底解説。',
    'culture.watch_video': 'ホスト文化の基礎',
    'culture.read_more': 'ガイドをもっと読む',
  }
};
