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
      { id: '6qnFnmpHF9A', title_ja: '【ホストが社会にできること】社美緒が突然畑の購入を検討！？歌舞伎町の売れっ子ホスト達が農業を始める', title_en: '[What hosts can do for society] Mio Sha is suddenly considering purchasing a farm! ? Kabukicho\'s popular hosts start farming' },
      { id: 'pB5Mye99MNg', title_ja: '「もっと喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: '``Let\'s fight more!\'\' The Osaka cast members, who had no individuality, start fighting each other with their own aesthetics, with Sha Mio\'s voice!' },
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残らなかった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出した結論とは', title_en: '``All I had left was money.\'\' Reio, who became Osaka\'s leading host, spilled his true feelings... What is the conclusion that the lost lion came to after thinking about it?' },
      { id: '5ziXccHlF4U', title_ja: '「ホストなんてドブネズミだ」無難で綺麗���見せることが俺たちの仕事ではないと社美緒が真っ向から否定する', title_en: '``Hosts are trash rats.\'\' Sha Mio flatly denies that it\'s not our job to look safe and pretty.' },
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直営と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分かつ', title_en: '``I\'m leaving this store.\'\' Sha Mio suddenly declares that she is leaving the store that was run together with Fuyutsuki\'s direct management! Parting ways with the host I have trusted for many years' },
      { id: 'QNkd6VxNZQY', title_ja: '【ブチギレ】店舗の火災事件をきっかけに溜まった燃料が爆発！苺叶夜と札幌支部COOが激突する', title_en: '[Buchigire] Accumulated fuel explodes after a store fire incident! Ichigo Kanoya and Sapporo branch COO clash' },
      { id: 'MdlsHpOpsMI', title_ja: '歌舞伎町ホスト達が生きるための仕事を体験', title_en: 'Experience the work that Kabukicho hosts do for a living' },
      { id: 'oOLy0CiLPKc', title_ja: '【大阪夏の陣】キャスト達の大ゲンカ勃発！', title_en: '[Osaka Summer Camp] A big fight breaks out between the cast members!' },
      { id: 'YyN3q1FXvaU', title_ja: '「プレッシャーがキツい、辞めたい…」', title_en: '"The pressure is too much, I want to quit..."' },
      { id: '-b2VBxvSnEs', title_ja: 'ユグド大阪のトップキャスト2人をバッサリ斬る社美緒', title_en: 'Sha Mio smashes two of Yugdo Osaka\'s top cast members.' },
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
      { id: 'O9YcbnFsN-0', title_ja: 'スポンサーをしてたbreakingdown選手”傾奇者”が逮捕！ショックを隠せない配信界隈', title_en: 'Breakdown player\'s ``bizarre\'\' sponsor was arrested! Streaming community unable to hide shock' },
      { id: 'iPIEXDpaqyM', title_ja: '明日花キララとヤマトリノだけで1500万インプ超！どこまでがヤラセでどこまでがリアルなのか考えてみた！', title_en: 'Over 15 million imps for Asuka Kirara and Yamatorino alone! I thought about how much is fake and how much is real!' },
      { id: 'mP7S63G-C-w', title_ja: '桜井野の花の過去のホスト歴を深堀っていたら越前リョーマ参戦でまさかの展開へ！', title_en: 'As I was digging deeper into Sakurainonohana\'s past host history, things took an unexpected turn when Ryoma Echizen entered the race!' },
      { id: 'Get2S4Q8yB0', title_ja: '被害者ぶるHARLEMホストにブチ切れ！一体何が？！', title_en: 'Blame the victim HARLEM host! What on earth? !' },
      { id: 'IGHCVo__pXE', title_ja: 'オーナーとコラボしたら驚愕の事実が発覚！コラボ後に出た言葉とは一体？！', title_en: 'When we collaborated with the owner, a surprising fact was discovered! What exactly were the words that came out after the collaboration? !' },
      { id: 'tK_mxagUbN0', title_ja: 'ホストコールをきっかけにローランドvs黒崎店長の新旧御家騒動勃発か？！大人達が続々言及！', title_en: 'Will the host call spark an uproar between Roland and manager Kurosaki? ! Adults keep mentioning it!' },
      { id: 'S8E2wZwLlVI', title_ja: '配信中に桜井野の花に凸電したらブチ切れ？！気まずい空気の理由は一体？！', title_en: 'If Sakurainohana gets a phone call during the broadcast, will she get fired? ! What is the reason for the awkward atmosphere? !' },
      { id: 'xvUBQ6x7bvA', title_ja: 'ローランドグループ代表のSNS投稿炎上についてつばきっすに凸電して聞いてみた！', title_en: 'I called Tsubakissu to ask about the SNS post of the Roland Group representative that was under fire!' },
      { id: 'dYKdU-LnY6o', title_ja: 'ブチ切れの横で大爆笑する理由とは？！', title_en: 'What is the reason for laughing out loud next to a piece of paper? !' },
      { id: 'gqXGP7E1f-Y', title_ja: 'ワタシヒルショクオカネムリ', title_en: 'I\'m a Japanese leopard' },
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
      { id: 'DuLVefkx1NQ', title_ja: '『ホストコール』MC溝口勇児←あなた必要ですかね？', title_en: '“Host Call” MC Yuji Mizoguchi ← Do we need you?' },
      { id: '-XCgPwe0o5I', title_ja: '『ホストコール』の裏話暴露！？ THE CLUB OSAKA統括代表『優士さん』コラボ！', title_en: 'The inside story of “Host Call” revealed! ? THE CLUB OSAKA general representative “Yushi-san” collaboration!' },
      { id: 'iuqch9tRQp8', title_ja: 'ホスト元内勤がLINE流出⁉️姫を「家畜」のような番号呼びが晒され、大炎上していた件について', title_en: 'The host\'s former office worker\'s LINE leaked⁉️Regarding the incident where the princess was exposed as being called a number like "cattle" and there was a huge uproar.' },
      { id: 'xwlpTD6FIJs', title_ja: '【社美緒出演】『ホストコール』出演費用3600万円←これガチです。', title_en: '[Appearance by Mio Sha] Appearance cost for "Host Call" is 36 million yen ← This is serious.' },
      { id: 'I9nWZHV5nJU', title_ja: '【激震】歌舞伎町ホスト 年間30人以上が逮捕…。現役ホストが語る“知られざる実態”', title_en: '[Severe earthquake] Kabukicho host: More than 30 people arrested per year... Current host talks about “unknown facts”' },
      { id: 'QmRhacvKuOM', title_ja: '【壮絶】爆弾・暴行・アルハラ...。すべて日常茶飯事！？今じゃ考えられない福岡時代のホストの話。', title_en: '[Savage] Bombs, assaults, Alhara... Everything is a daily occurrence! ? A story about a host from Fukuoka that is unthinkable now.' },
      { id: 'EGdtDqp3omA', title_ja: '姫「担当変えたい」発言に担当ブチギレ！？その真相をお話します...。', title_en: 'The princess was furious when she said, ``I want to change the person in charge.\'\' ? I\'ll tell you the truth...' },
      { id: 'bVeNNYmLp5A', title_ja: '【許せない...】ホストで売れるために「包茎手術」をした結果…とんでもないことが起きました。', title_en: '[Unforgivable...] As a result of having "circular circumcision surgery" in order to sell as a host... something terrible happened.' },
      { id: '_CZt13Xaxgk', title_ja: '【速報】6月度ランウェイ【2026】', title_en: '[Breaking News] June Runway [2026]' },
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
      { id: 'jlQwgvcxq9Y', title_ja: '【本音】「人としてズレてんだよ」HaLが奏斗に突きつけた厳しすぎる一言', title_en: '[True opinion] “You’re out of step as a person.” HaL’s harsh words to Kanato' },
      { id: 'HGKQxRW9HK0', title_ja: '【激論】「納得できねぇよ、説明しろ」広告の評価基準に不満爆発', title_en: '[Heated debate] ``I don\'t understand, please explain.\'\' Dissatisfaction explodes over advertising evaluation criteria' },
      { id: 'm3t-raMQkSc', title_ja: '【4店舗合同初回デー】「他が強すぎる…」まさかのLeo苦戦…逆転なるか', title_en: '[4 stores joint first day] "Others are too strong..." Leo is struggling...Will it be a turnaround?' },
      { id: 'bfhN4Xi4QjQ', title_ja: '【拒絶】「Leoから追い出す」受け入れてもらえない孤独な戦い', title_en: '[Rejection] “Kicked out of Leo” A lonely battle to not be accepted' },
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】「雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: '[Baptism] ``Don\'t let small fry come to Leo\'\' A chaotic situation erupts due to unwelcome new members' },
      { id: 'Lojd7hFG_xA', title_ja: '【重大発表】YouTubeの今後について', title_en: '[Important Announcement] About the future of YouTube' },
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳ない」責任者不在で継続不可能に…', title_en: '[Channel closed] ``I\'m really sorry.\'\' It\'s impossible to continue due to the absence of the person in charge...' },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通告に和久井は何を想うのか…', title_en: '[Fall] What does Wakui think of the sudden notice that “the person in charge should step down”?' },
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
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: '[Okinawa ③] World Cup-level fierce battle...An ending that no one could predict awaited' },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: '[Overflowing with reservations] The whole story of the first day when the god of war conquered 4 stores' },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: '[Okinawa ②] “Dari, I’m going home” The atmosphere changes completely at the aquarium…' },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: '[Okinawa ①] “Our bond is second to none” A true journey of SiVAH who has grown' },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代未聞の答え', title_en: '[Shocking] “I will make all of Osaka ○○” The unprecedented answer given by the god of war' },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: '[Despair] “I want to quit” cast members lose their feelings and finally reach their limit' },
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: '[Blackmail] Unexpected threat to the god of war, "I\'ll expose your actions"...' },
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: '[Crack] “The management’s words have no effect” The despair of the LOX cast has reached its limit…' },
    ],
  },
];
