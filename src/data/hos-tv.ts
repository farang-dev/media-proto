export interface HosTvVideo {
  id: string;
  title_ja: string;
  title_en: string | null;
}

export interface HosTvChannel {
  id: string;
  name_ja: string;
  name_en: string;
  handle: string;
  description_ja: string;
  description_en: string;
  subscriberCount: string;
  channelUrl: string;
  channelId: string;
  videos: HosTvVideo[];
}

export const channels: HosTvChannel[] = [
  {
    id: 'mioyashiro',
    name_ja: 'Mio Yashiro TV',
    name_en: 'Mio Yashiro TV',
    handle: '@mioyashirotv5415',
    description_ja: 'Group YGD会長 社美緒の公式チャンネル。ホスト業界の最前線を発信。',
    description_en: 'Official channel of Mio Yashiro, president of Group YGD.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@mioyashirotv5415',
    channelId: 'UCH6wqY1Ve2N47oKZ4tgirqA',
    videos: [
      { id: 'pB5Mye99MNg', title_ja: '「もっと喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: '``Let\'s fight more!\'\' The Osaka cast members, who had no individuality, start fighting each other with their own aesthetics, with Sha Mio\'s voice!' },
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残らなかった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出した結論とは', title_en: '``All I had left was money.\'\' Reio, who became Osaka\'s leading host, spilled his true feelings... What is the conclusion that the lost lion came to after thinking about it?' },
      { id: '5ziXccHlF4U', title_ja: '「ホストなんてドブネズミだ」無難で綺麗に見せることが俺たちの仕事ではないと社美緒が真っ向から否定する', title_en: '"Hosts are rats." Sha Mio flatly denies that it\'s not our job to look safe and pretty.' },
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直��と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分かつ', title_en: '``I\'m leaving this store.\'\' Sha Mio suddenly declares that she is leaving the store she was running together with Naoto Fuyutsuki! Parting ways with the host I have trusted for many years' },
      { id: 'QNkd6VxNZQY', title_ja: '【ブチギレ】店舗の火災事件をきっかけに溜まった燃料が爆発！苺叶夜と札幌支部COOが激突する', title_en: '[Buchigire] Accumulated fuel explodes after a store fire incident! Ichigo Kanoya and Sapporo branch COO clash' },
      { id: 'ft2qIZU8EoA', title_ja: '「お前らつまらねぇ！」帝蓮の元で育ったスーパールーキーのホスト達が社美緒に喧嘩を売る！', title_en: '“You guys are boring!” The super rookie hosts who grew up under Teiren pick a fight with Sha Mio!' },
      { id: 'oOLy0CiLPKc', title_ja: '【大阪夏の陣】キャスト達の大ゲンカ勃発！', title_en: '[Osaka Summer Camp] A big fight breaks out between the cast members!' },
      { id: 'YyN3q1FXvaU', title_ja: '「プレッシャーがキツい、辞めたい…」', title_en: '"The pressure is too much, I want to quit..."' },
      { id: '-b2VBxvSnEs', title_ja: 'ユグド大阪のトップキャスト2人をバッサリ斬る社美緒', title_en: 'Sha Mio smashes two of Yugdo Osaka\'s top cast members.' },
      { id: '-glbGgorA0E', title_ja: 'ユグドラシル本店改革再び！次の課題は音弥？', title_en: 'Yggdrasil main store reform again! Is Otoya the next challenge?' },
    ],
  },
  {
    id: 'sukima',
    name_ja: 'りっくんのすきま',
    name_en: 'Rikkun\'s Sukima',
    handle: '@sukima_watabokori',
    description_ja: '陸斗さんのチャンネル。ほすちるメンバーがお届けする歌舞伎町の日常。',
    description_en: 'Rikkun\'s personal channel. Daily life in Kabukicho.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@sukima_watabokori',
    channelId: 'UCXTd3T-pvVD0TgjT9smn7HQ',
    videos: [
      { id: 'S8E2wZwLlVI', title_ja: '配信中に桜井野の花に凸電したらブチ切れ？！気まずい空気の理由は一体？！', title_en: 'If Sakurainohana gets a phone call during the broadcast, will she get fired? ! What is the reason for the awkward atmosphere? !' },
      { id: 'xvUBQ6x7bvA', title_ja: 'ローランドグループ代表のSNS投稿炎上についてつばきっすに凸電して聞いてみた！', title_en: 'I called Tsubakissu to ask about the SNS post of the Roland Group representative that was under fire!' },
      { id: 'E6pxMiEOfvw', title_ja: 'ホストにブチ切れ！他店に乗り込み！その時の様子を完全再現！', title_en: 'Kudos to the host! Go to another store! Completely recreate the situation at that time!' },
      { id: '3KivSbZFDaw', title_ja: 'ホストコールで話題のシーンに反応するホストは全員だせぇ！その理由とは？！', title_en: 'All hosts react to popular scenes on host calls! What is the reason? !' },
      { id: '7HtsSz7KkUY', title_ja: 'お相手はageha専属モデル！ラファエル・ヒカルと共演多数の河原社長の泥沼不倫が発覚！', title_en: 'Your partner is an ageha exclusive model! The muddy affair of President Kawahara, who has co-starred with Rafael Hikaru, has been discovered!' },
      { id: 'b6HIjICV6ng', title_ja: '過去のやらかしと一緒にホストコール出演メンバー紹介してみた【辛口注意】', title_en: 'I introduced the members who appeared on Host Call along with their past mistakes [Warning: Harshness]' },
      { id: '4M5O95IXmTQ', title_ja: '過去の彼氏に説教も…！最強の後ろ盾を得て桜井野の花がグルダンで彼氏探しへ…結末は？！', title_en: 'Even preaching to my past boyfriend...! Sakurainonohana, with the strongest backing, heads out to find a boyfriend in Guldan... What will be the outcome? !' },
      { id: '1pExzJ0gOoY', title_ja: 'TIKTOKで知り合った20歳の女の子を弄ぶ大手ホストクラブ経営者とは一体？！', title_en: 'Who is this major host club manager who plays with a 20-year-old girl he met on TIKTOK? !' },
      { id: 'gqXGP7E1f-Y', title_ja: 'ワタシヒルショクオカネムリ', title_en: 'I\'m a Japanese leopard' },
      { id: 'NsWMKzmgGUk', title_ja: 'ホストが趣味飲みに全力らしい！', title_en: 'It seems like the host is all about drinking as a hobby!' },
    ],
  },
  {
    id: 'hostchildren',
    name_ja: 'ほすちる「Host children」',
    name_en: 'Host children',
    handle: '@-Hostchildren',
    description_ja: '歌舞伎町現役ホスト210K登録者チャンネル。話題のりっくんを中心にホスト業界のリアルを配信。',
    description_en: '210K+ subscriber channel run by active Kabukicho hosts.',
    subscriberCount: '210K+',
    channelUrl: 'https://www.youtube.com/@-Hostchildren',
    channelId: 'UCth8GGZ6EjARHI1Hhx-cgjg',
    videos: [
      { id: 'iuqch9tRQp8', title_ja: 'ホスト元内勤がLINE流出⁉️姫を「家畜」のような番号呼びが晒され、大炎上していた件について', title_en: 'The host\'s former office worker\'s LINE leaked⁉️Regarding the incident where the princess was exposed as being called a number like "cattle" and there was a huge uproar.' },
      { id: 'xwlpTD6FIJs', title_ja: '【社美緒出演】『ホストコール』出演費用3600万円←これガチです。', title_en: '[Appearance by Mio Sha] Appearance cost for "Host Call" is 36 million yen ← This is serious.' },
      { id: 'I9nWZHV5nJU', title_ja: '【激震】歌舞伎町ホスト 年間30人以上が逮捕…。現役ホストが語る“知られざる実態”', title_en: '[Severe earthquake] Kabukicho host: More than 30 people arrested per year... Current host talks about “unknown facts”' },
      { id: 'QmRhacvKuOM', title_ja: '【壮絶】爆弾・暴行・アルハラ...。すべて日常茶飯事！？今じゃ考えられない福岡時代のホストの話。', title_en: '[Savage] Bombs, assaults, Alhara... Everything is a daily occurrence! ? A story about a host from Fukuoka that is unthinkable now.' },
      { id: 'EGdtDqp3omA', title_ja: '姫「担当変えたい」発言に担当ブチギレ！？その真相をお話します...。', title_en: 'The princess was furious when she said, ``I want to change the person in charge.\'\' ? I\'ll tell you the truth...' },
      { id: 'bVeNNYmLp5A', title_ja: '【許せない...】ホストで売れるために「包茎手術」をした結果…とんでもないことが起きました。', title_en: '[Unforgivable...] As a result of having ``circumcision surgery\'\' in order to sell as a host... something terrible happened.' },
      { id: 'Uw3ppVG6O9I', title_ja: '【告発】社長「お前もうクビな」夜職総括店長がまさかの緊急クビ宣告...。その告発内容とは？', title_en: '[Accusation] The president says, ``You\'re already fired.\'\' The general manager of the night shift suddenly announces that you\'ll be fired... What is the content of the accusation?' },
      { id: 'mAbS6qltgPc', title_ja: '【悲劇】夜職パワハラ社長の全力ビンタに思わず、一同ドン引き...。', title_en: '[Tragedy] Everyone is stunned by the power harassment president of the night shift.' },
      { id: '_CZt13Xaxgk', title_ja: '【速報】6月度ランウェイ【2026】', title_en: '[Breaking News] June Runway [2026]' },
      { id: '0Da7zsoXHMw', title_ja: '【速報】5月度ランウェイ【2026】', title_en: '[Breaking News] May Runway [2026]' },
    ],
  },
  {
    id: 'jituroku',
    name_ja: '実録ホスメンタリー',
    name_en: 'Jitsuroku Hosumentary',
    handle: '@jiturokuhosumentari',
    description_ja: 'エルコレ「club Leo」を中心に、キャストたちのリアルな日常と葛藤を追う密着ドキュメンタリー。15言語字幕対応。',
    description_en: 'Documentary series following host club "Leo" cast members.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@jiturokuhosumentari',
    channelId: 'UCxERO5haw0vzwIY1_xqdAdg',
    videos: [
      { id: 'HGKQxRW9HK0', title_ja: '【激論】「納得できねぇよ、説明しろ」広告の評価基準に不満爆発', title_en: '[Heated debate] ``I don\'t understand, please explain.\'\' Dissatisfaction explodes over advertising evaluation criteria' },
      { id: 'm3t-raMQkSc', title_ja: '���4店舗合同初回デー】「他が強すぎる…」まさかのLeo苦戦…逆転なるか', title_en: '���4 stores joint first day] "Others are too strong..." Leo is having a tough time...Will it be a reversal?' },
      { id: 'bfhN4Xi4QjQ', title_ja: '【拒絶】「Leoから追い出す」受け入れてもらえない孤独な戦い', title_en: '[Rejection] “Kicked out of Leo” A lonely battle to not be accepted' },
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】「雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: '[Baptism] ``Don\'t let small fry come to Leo\'\' A chaotic situation erupts due to unwelcome new members' },
      { id: 'Lojd7hFG_xA', title_ja: '【重大発表】YouTubeの今後について', title_en: '[Important Announcement] About the future of YouTube' },
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳ない」責任者不在で継続不可能に…', title_en: '[Channel closed] ``I\'m really sorry.\'\' It\'s impossible to continue due to the absence of the person in charge...' },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通告に和久井は何を想うのか…', title_en: '[Fall] What does Wakui think of the sudden notice that "the person in charge should step down"...' },
      { id: '7Kxu7WcO1cU', title_ja: '【苦悩】「開き直んじゃねぇ」心も体も限界の美月、メンタル崩壊', title_en: '[Suffering] “Don’t open up again” Mizuki, whose mind and body are at their limits, has a mental breakdown' },
    ],
  },
  {
    id: 'kabukicholcolle',
    name_ja: 'エルコレ〜歌舞伎超TV〜',
    name_en: 'ERCOLLE Kabukicho TV',
    handle: '@kabukicholcolle',
    description_ja: '歌舞伎町を中心に全国展開する「エルコレ」の一推しチャンネル。軍神「心湊 一希」が魅せるホストクラブのリアルな裏側。',
    description_en: 'Official ERCOLLE channel featuring nationwide host clubs.',
    subscriberCount: '—',
    channelUrl: 'https://www.youtube.com/@kabukicholcolle',
    channelId: 'UCXE7B45KTRYX-I3XPFDnE4g',
    videos: [
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: '[Overflowing with reservations] The whole story of the first day when the god of war conquered 4 stores' },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: '[Okinawa ②] “Dari, I’m going home” The atmosphere changes completely at the aquarium…' },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: '[Okinawa ①] “Our bond is second to none” A true journey of SiVAH who has grown' },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代未聞の答え', title_en: '[Shocking] “I will make all of Osaka ○○” The unprecedented answer given by the god of war' },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: '[Despair] “I want to quit” cast members lose their feelings and finally reach their limit' },
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: '[Blackmail] Unexpected threat to the god of war, "I\'ll expose your actions"...' },
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: '[Crack] “The management’s words have no effect” The despair of the LOX cast has reached its limit…' },
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: '[Reform] “Too lenient. Don’t run into self-preservation.” The war god cuts the warm-hearted management team in half' },
    ],
  },
];
