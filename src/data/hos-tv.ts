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
      { id: 'IoDaZiM4MF4', title_ja: '【社美緒の経営者としての顔】ホストクラブを主軸に様々なビジネスを展開する社美緒の美学に密着', title_en: '[Shamio\'s face as a manager] A close look at the aesthetics of Shamio, which develops various businesses centered on host clubs' },
      { id: '6qnFnmpHF9A', title_ja: '【ホストが社会にできること】社美緒が突然畑の購入を検討！？歌舞伎町の売れっ子ホスト達が農業を始める', title_en: '[What hosts can do for society] Mio Sha is suddenly considering purchasing a farm! ? Kabukicho\'s popular hosts start farming' },
      { id: 'pB5Mye99MNg', title_ja: '「もっと喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: '``Let\'s fight more!\'\' The Osaka cast members, who had no individuality, start fighting each other with their own aesthetics, with Sha Mio\'s voice!' },
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残ら��かった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出した結論とは', title_en: '``All I had left was money.\'\' Reio, who became Osaka\'s leading host, spilled his true feelings... What is the conclusion that the lost lion came to after thinking about it?' },
      { id: '5ziXccHlF4U', title_ja: '「ホストなんてドブネズミだ」無難で綺麗に見せることが俺たちの仕事ではないと社美緒が真っ向から否定する', title_en: '"Hosts are trash rats." Sha Mio flatly denies that it\'s not our job to look safe and pretty.' },
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直営と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分かつ', title_en: '``I\'m leaving this store.\'\' Sha Mio suddenly declares that she is leaving the store that was run together with Fuyutsuki\'s direct management! Parting ways with the host I have trusted for many years' },
      { id: 'LbtbiSlM2vE', title_ja: '【整形の暴力】一度ユグドを退店したキャストに社美緒が最後の喝', title_en: '[Violence of plastic surgery] Sha Mio gives final shoutout to cast members who once left Yugdo' },
      { id: '44PgS2AlgdI', title_ja: 'ホストクラブ経営が難しくなったこの時代で成功し続ける理由', title_en: 'Reasons for continued success in this era when host club management has become difficult' },
      { id: 'MdlsHpOpsMI', title_ja: '歌舞伎町ホスト達が生きるための仕事を体験', title_en: 'Experience the work that Kabukicho hosts do for a living' },
      { id: 'oOLy0CiLPKc', title_ja: '【大阪夏の陣】キャスト達の大ゲンカ勃発！', title_en: '[Osaka Summer Camp] A big fight breaks out between the cast members!' },
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
      { id: 'pVroaO9ElyE', title_ja: 'インフルエンサー美容外科医の裏の顔がホストっぽい！先生とりっくんのDM内容もついでに���露', title_en: 'The face behind the influencer cosmetic surgeon looks like a host! Sensei and Rikkun\'s DM contents are also revealed.' },
      { id: 'iWNYM7PuX74', title_ja: '2人が大絶賛！ホストコールで話題のあっすん＆鈴音りん！対照的な２人のバズ投稿を見た感想', title_en: 'Two people highly praised it! Assun and Rin Suzune are the hot topic on host calls! Impressions after seeing buzz posts from two contrasting people' },
      { id: 'HTssqcKfADo', title_ja: 'エンリケコラボでラストコールの気になる色々聞いてみた！', title_en: 'We asked a lot of questions about Last Call in the Enrique collaboration!' },
      { id: 'KD-uAwwFqCY', title_ja: '業界をクリーンに？枕前提のホストコールの演出に苦言を呈すホスト達', title_en: 'Clean the industry? Hosts complain about host call performance that assumes pillows' },
      { id: 'PZmoLv9A0gQ', title_ja: 'ホストが業界外のニュースを見たら衝撃すぎて理解が追い付かない･･･', title_en: 'When the host sees news from outside the industry, it is so shocking that he cannot fully understand it...' },
      { id: 'tI7UmfXIOKU', title_ja: 'ロリ嫌いのはっしーが傾奇者逮捕にブチ切れ！夢幻さんの擁護にも苦言で気まずいりっくん', title_en: 'Hasshi, who hates loli, is furious at the arrest of a psychopath! Irik-kun feels awkward because he is complaining about Mugen-san\'s defense.' },
      { id: 'O9YcbnFsN-0', title_ja: 'スポンサーをしてたbreakingdown選手”傾奇者”が逮捕！ショックを隠せない配信界隈', title_en: 'Breakdown player\'s ``bizarre\'\' sponsor was arrested! Streaming community unable to hide shock' },
      { id: 'iPIEXDpaqyM', title_ja: '明日花キララとヤマトリノだけで1500万インプ超！どこまでがヤラセでどこまでがリアルなのか考えてみた！', title_en: 'Over 15 million imps for Asuka Kirara and Yamatorino alone! I thought about how much is fake and how much is real!' },
      { id: 'kCU5l6nAAaA', title_ja: 'ホストの心が広い理由', title_en: 'Why hosts are so open-minded' },
      { id: 'dYKdU-LnY6o', title_ja: 'ブチ切れの横で大爆笑す��理由とは？！', title_en: 'What\'s the reason for laughing out loud next to a broken piece? !' },
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
      { id: 'S3SN1-eWOmo', title_ja: '『枕なしで売れた』←水商売してるヤツほど枕営業してる説', title_en: '``It sold without a pillow\'\' ← The theory is that those who sell water are more likely to sell pillows.' },
      { id: 'GYvi4DNohE4', title_ja: '注意⚠️『ホストコール』の影響で勘違いする女性が急増するかも…。', title_en: 'Caution ⚠️ The number of women who misunderstand may increase rapidly due to the influence of "Host Call"...' },
      { id: 'DuLVefkx1NQ', title_ja: '『ホストコール』MC溝口勇児←あなた必要ですかね？', title_en: '“Host Call” MC Yuji Mizoguchi ← Do we need you?' },
      { id: '-XCgPwe0o5I', title_ja: '『ホストコール』の裏話暴露！？ THE CLUB OSAKA統括代表『優士さん』コラボ！', title_en: 'The inside story of “Host Call” revealed! ? THE CLUB OSAKA general representative “Yushi-san” collaboration!' },
      { id: 'iuqch9tRQp8', title_ja: 'ホスト元内勤がLINE流出⁉️姫を「家畜」のような番号呼びが晒され、大炎上していた件について', title_en: 'The host\'s former office worker\'s LINE leaked⁉️Regarding the incident where the princess was exposed as being called a number like "cattle" and there was a huge uproar.' },
      { id: 'xwlpTD6FIJs', title_ja: '【社美緒出演】『ホストコール』出演費用3600万円←これガチです。', title_en: '[Appearance by Mio Sha] Appearance cost for "Host Call" is 36 million yen ← This is serious.' },
      { id: 'I9nWZHV5nJU', title_ja: '【激震】歌舞伎町ホスト 年間30人以上が逮捕…。現役ホストが語る“知られざる実態”', title_en: '[Severe earthquake] Kabukicho host: More than 30 people arrested per year... Current host talks about “unknown facts”' },
      { id: 'QmRhacvKuOM', title_ja: '【壮絶】爆弾・暴行・アルハラ...。すべて日常茶飯事！？今じゃ考えられない福岡時代のホストの話。', title_en: '[Savage] Bombs, assaults, Alhara... Everything is a daily occurrence! ? A story about a host from Fukuoka that is unthinkable now.' },
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
      { id: 'jMUG_WAPhik', title_ja: '【激論】「表面上しか変わってない」HaLが美月に突きつけた厳しい現実', title_en: '[Heated debate] “Only the surface has changed” HaL confronts Mizuki with the harsh reality' },
      { id: 'TDNiofLG_HA', title_ja: '【衝突】「リーダーが無責任だろ」教育を巡りリーダーに怒りが爆発', title_en: '[Conflict] Anger erupts at leaders over education: ``Leaders must be irresponsible.\'\'' },
      { id: 'jlQwgvcxq9Y', title_ja: '【本音】「人としてズレてんだよ」HaLが奏斗に突きつけた厳しすぎる一言', title_en: '[True opinion] “You’re out of step as a person.” HaL’s harsh words to Kanato' },
      { id: 'HGKQxRW9HK0', title_ja: '【激論】「納得できねぇよ、説明しろ」広告の評価基準に不満爆発', title_en: '[Heated debate] ``I don\'t understand, please explain.\'\' Dissatisfaction explodes over advertising evaluation criteria' },
      { id: 'm3t-raMQkSc', title_ja: '【4店舗合同初回デー】「他が強すぎる…」まさかのLeo苦戦…逆転なるか', title_en: '[4 stores joint first day] "Others are too strong..." Leo is struggling...Will it be a turnaround?' },
      { id: 'bfhN4Xi4QjQ', title_ja: '【拒絶】「Leoから追い出す」受け入れてもらえない孤独な戦い', title_en: '[Rejection] “Kicked out of Leo” A lonely battle to not be accepted' },
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】「雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: '[Baptism] ``Don\'t let small fry come to Leo\'\' A chaotic situation erupts due to unwelcome new members' },
      { id: 'Lojd7hFG_xA', title_ja: '【重大発表】YouTubeの今後について', title_en: '[Important Announcement] About the future of YouTube' },
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
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: '[Okinawa ④] “The God of War’s favorite food is ○○” Minato vs. Rei, a serious cooking showdown…Who will win?' },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: '[Okinawa ③] World Cup-level fierce battle...An ending that no one could predict awaited' },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: '[Overflowing with reservations] The whole story of the first day when the god of war conquered 4 stores' },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: '[Okinawa ②] “Dari, I’m going home” The atmosphere changes completely at the aquarium…' },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAH���本音旅', title_en: '[Okinawa ①] “Our bond is second to none” The honest journey of SiVAH that has grown' },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代未聞の答え', title_en: '[Shocking] “I will make all of Osaka ○○” An unprecedented answer from the god of war' },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: '[Despair] “I want to quit” cast members lose their feelings and finally reach their limit' },
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: '[Blackmail] Unexpected threat to the god of war, "I\'ll expose your actions"...' },
    ],
  },
];
