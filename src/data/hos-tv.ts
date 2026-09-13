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
      { id: 'r_eBup0t8Y4', title_ja: '「ああするしかなかった…」ユグドに勝つためにはなんでもやった黒鳥虎白の告白をかつての敵だった社美緒が受け止める', title_en: '"I had no choice but to do that..." Kurotori Kouhaku\'s confession that he would do anything to win against Yugdo is accepted by Sha Mio, his former enemy.' },
      { id: 'hpflZiJOzhA', title_ja: '【ホスト格差】ユグドラシル本店のトップホスト達と次世代ホストの格差の溝が止まらない…生き残るにはアメかムチか　#ユグドラシル本店', title_en: '[Host disparity] The gap between the top hosts of Yggdrasil main store and the next generation hosts continues...Carrot or stick to survive #Yggdrasil main store' },
      { id: 'JXzpxGLJiPY', title_ja: '【ホストコール志願者入店】「折れるに決まってるから、ユグホンのメンバーと戦ったら」社美緒の厳しい一言が突き刺さる #ユグドラシル本店', title_en: '[Host call applicant enters the store] Mio Sha\'s harsh words sting: "I\'m sure I\'ll give up, so if I fight the Yughon members," Sha Mio\'s harsh words sting #Yggdrasil Main Store' },
      { id: 'kn-5DbSuCa0', title_ja: '【急成長の代償】帝蓮率いるセレステで営業中のトラブルが続々と発生…店舗の鍵を握るのは次世代の皇あ���むだった #セレステ #セレステ', title_en: '[The price of rapid growth] Problems occur one after another during business operations at Celeste, led by Teiren... The next generation of Emperor Ame holds the key to the store #Celeste #Celeste' },
      { id: 'OGIXAbLZOb4', title_ja: '「歌舞伎町から消える」何者になりたくて歌舞伎町に来たのか…壁にぶつかった若きホストに社美緒���伝えた言葉とは #ユグドラシル本店', title_en: '“Disappearing from Kabukicho” Who did you come to Kabukicho to become? What are the words you conveyed to the young host who hit a wall? #Yggdrasil Main Store' },
      { id: 'wYEjWk81BJk', title_ja: '【店の外まで長蛇の列】ユグドラシル大阪の今年1番に混んだ日に社美緒が登場！混み合ったホストク���ブで怒号が飛び合う #ユグドラシル大阪', title_en: '[Long line outside the store] Sha Mio appears on Yggdrasil Osaka\'s busiest day this year! Shouting and shouting in the crowded host club #Yggdrasil Osaka' },
      { id: 'HJywTfKpkz0', title_ja: '「俺はあんたに返したいんですよ！」社美緒のおかげで人生が変わり恩返しをしたいと望むロマ…しかしそれを否定する社美緒の真意とは… #ヴァルハラ', title_en: '"I want to repay you!" Thanks to Sha Mio, Roma\'s life has changed and she wants to repay her... But what is Sha Mio\'s true intention when she denies that... #Valhalla' },
      { id: 'e_o5EnLPrF8', title_ja: '「ユグドラシルは綺麗事でしょ」炎上ホスト黒鳥���白がヴァルハラに参戦！他店舗から見ていたユグドの方針に自らの想いを社美緒にぶつける！ #ヴァルハラ', title_en: '``Yggdrasil is a beautiful thing, isn\'t it?\'\' Flaming host Kurotori Shiro joins Valhalla! I confess my feelings to Sha Mio about Yugdo\'s policy that I saw from other stores! #valhalla' },
      { id: 'l-ZFTo17lb4', title_ja: '打倒ユグホンのヴァルハラのピースはあの男…', title_en: 'The piece of Valhalla that overthrows Hughon is that man...' },
      { id: 'WYwHLm4Mecs', title_ja: '【次世代が挫折】ユグホンのレベルが高すぎて離脱者が続出', title_en: '[The next generation has failed] Yuguhon\'s level is too high and many people are leaving' },
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
      { id: 'SUGkYsOS8Oo', title_ja: '遂に公開！社美緒会長とのYouTube撮影の裏話！遅刻の理由・帝世那途中退席の理由まで大公��', title_en: 'Finally released! The inside story of the YouTube shoot with Chairman Mio Sha! The Grand Duke explains the reason for being late and the reason for Teisena leaving mid-way.' },
      { id: 'PEE9flGpWg4', title_ja: 'スカウトの彼氏に家族や友達とも隔離されても色恋管理に気付けない２０歳の姫', title_en: 'A 20-year-old princess who doesn\'t notice that her boyfriend, a scout, is controlling her love affair even though she is isolated from her family and friends.' },
      { id: 'W7iThVWgJAU', title_ja: 'ホストも配信も頑張りたいTOP DANDY鳳条 歩にホスハラと言われた件', title_en: 'I want to do my best as a host and streamer TOP DANDY Hojo Ayumu called me harassment' },
      { id: 'TdG7qjThXf8', title_ja: 'Xのバズ投稿見てたらALL BLACKのホストの晒しを発見！ドン引きするりっくん', title_en: 'When I was looking at X\'s buzz posts, I discovered the expose of ALL BLACK\'s host! Rikkun is so excited' },
      { id: 'ElkGfahS8Kc', title_ja: 'ホストと同棲予定で引越し！まさかの予定日2週間前に振られた桜井野の花さん', title_en: 'I plan to move in with my host! Sakurainonohana was unexpectedly dumped two weeks before her due date.' },
      { id: 'A9GBxoPK-50', title_ja: 'ラヴ上等！緋咲一馬の次はNILS るな参戦！夜職多すぎて売名疑うも賞賛される訳とは？！', title_en: 'Love is top notch! Next up for Kazuma Hisaki is NILS Runa! Why is he praised even though he has doubts about his reputation because he works too many nights? !' },
      { id: 'SLs3x5YomJc', title_ja: '炎上上等！ラストコールで話題のえんりけコラボでまさかの結末に！', title_en: 'Up in flames! Enrike\'s much-talked-about collaboration with Last Call brings an unexpected ending!' },
      { id: 'C21CQOzN3ew', title_ja: '社美緒会長がネットのおもちゃに？！話題のホストコールの裏で晒されるうきょまる', title_en: 'Chairman Mio of the company has become an online toy? ! Ukyomaru exposed behind the topic of host call' },
      { id: 'CXuLXLnoEfA', title_ja: '空気の読めないコメントvs空気を読み過ぎるAI', title_en: 'Comments that cannot read the atmosphere vs. AI that reads the atmosphere too much' },
      { id: '50yi0bMChLc', title_ja: '桜井野の花と噂のりっくんの相性', title_en: 'Sakurainonohana and the rumored compatibility between Rikkun' },
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
      { id: 'zniSFdTiy94', title_ja: '【賛否両論】ホストを7年支えたエース（姫）と結婚…。これってぶっちゃけ「アリ？」or「ナシ��」', title_en: '[Pros and cons] Married to the ace (princess) who supported the host for 7 years... To be honest, is this “Are you sure?” or “No,”' },
      { id: 'QKTREFz8KzI', title_ja: '【大反省】会長との言い合いから数日後…公開後の本音をすべて話します【フリートーク】', title_en: '[Big reflection] A few days after the argument with the chairman... I will talk about my true feelings after the release [Free talk]' },
      { id: 'cyrTqda31Pg', title_ja: '【HOST CALL】令和イチのクソチビホスト「成星心愛」に収録の裏側を全部聞いてみた。【ACE CENTURION】', title_en: '[HOST CALL] We asked Reiwa\'s first crappy host, "Seisei Shinai", all about the behind-the-scenes details of the recording. [ACE CENTURION]' },
      { id: 'WwmzHIiK7Bk', title_ja: '【実録】社長が会長にブチギレ…。「このグループ終わり」社長が会長に溜めていた不満をすべて吐き出しました。', title_en: '[True story] The president gets angry with the chairman... ``It\'s the end of this group.\'\' The president poured out all of his pent-up frustration with the chairman.' },
      { id: 'fEaY_DqNQd8', title_ja: '【本人登場】『HOST CALL』で不合格になったチー牛ホスト「龍征」に全部聞きました！', title_en: '[Appearance of the person] We asked the Qiyu host “Ryuuzei” who was rejected from “HOST CALL” all about it!' },
      { id: 'GtAtKFktZcA', title_ja: '『HOSTCALL』の実力派KING「天音恋愛」に“ホストのリアル”を全部聞きました。【UNITED Dear\'s】', title_en: 'We asked Ren Amane, the talented king of “HOSTCALL,” all about the “real life of hosts.” 【UNITED Dear\'s】' },
      { id: 'oFbt67d8AIs', title_ja: '【浴衣トーク】『ホストコール』の審査、さすがに厳しすぎない？【また不合格⁉️】', title_en: '[Yukata Talk] Isn\'t the screening for "Host Call" too strict? [Fail again⁉️]' },
      { id: 'DSB87aJo9QE', title_ja: '【夜職の闇】ホストの6割は虚言癖←むしろ8割です。', title_en: '[Dark side of night work] 60% of hosts have a tendency to lie ← In fact, it\'s 80%.' },
      { id: 'kz8aHS44ggE', title_ja: '【速��】8月度ランウェイ【2026】', title_en: '[Speed] August Runway [2026]' },
      { id: '1VitH9oh6KA', title_ja: '【速報】ドパガキ浴衣ランウェイ【2026】', title_en: '[Breaking News] Dopagaki Yukata Runway [2026]' },
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
      { id: 'vjHAO_GxRWM', title_ja: '【抗争激化】「金夜叉は墓場だと舐めてた」因縁の両者は和解できるのか', title_en: '[Intensifying conflict] ``Kinyasha was considered a graveyard.\'\' Can the two sides, who are related by fate, be able to reconcile?' },
      { id: 'OcJdpK5VyLc', title_ja: '【全面抗争】「クソガキが！地獄見せてやる」SNSの喧嘩が店舗同士の争いに発展', title_en: '[Full-scale conflict] "You shitty kid! I\'ll show you hell" A fight on SNS develops into a fight between stores' },
      { id: 'qIphPR37Z6k', title_ja: '【決裂】「仲間に掛ける言葉じゃねぇ」両者の対立がついに敵対関係へ', title_en: '[Breakdown] “These are not words you would say to your friends” The conflict between the two has finally turned into a hostile relationship' },
      { id: 'I8ol4hMMLrE', title_ja: '【泥沼】「お前らやってみろよ」キャストと運営・内勤が真っ向から対立', title_en: '[Quademia] “You guys should try it” Cast and management/office staff are in direct conflict' },
      { id: '4XXG72ksxzM', title_ja: '【落胆】「犬になりたくねぇ」あまりに幼稚な言い分に言葉を失う', title_en: '[Disappointed] “I don’t want to be a dog” I’m at a loss for words because of the childish argument' },
      { id: 'yH2GU-gBoBA', title_ja: '【対立】「ホストなんて頭おかしくてなんぼ」正反対の価値観が真っ向から衝突', title_en: '[Conflict] “Hosts are crazy.” Opposite values ​​are in direct conflict.' },
      { id: 'WUDHeO2oU5M', title_ja: '【異常事態】「お前の覚悟見せろよ」責任者不在で現場から不満が爆発', title_en: '[Abnormal Situation] “Show your determination!” Dissatisfaction explodes from the workplace due to the absence of the person in charge' },
      { id: 'eSp1zrbN_ik', title_ja: '【限界】「辞めた方がいいのかな…」30歳ホストが迎えた人生の岐路', title_en: '[Limit] “Maybe I should quit...” A crossroads in life for a 30-year-old host' },
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
      { id: 'qTaBdt9cy4E', title_ja: '【完全決裂】「お前に負けてるところ1つもねぇ」互いに一歩も譲らず関係は最悪に', title_en: '[Complete breakdown] "There\'s not a single thing I\'m losing to you." Neither of us gives in, and our relationship is at its worst.' },
      { id: 'Q5WVYIiKbVw', title_ja: '【激突】「お前らは逃げてるだけ！向き合え！」まとまりのないLiTAにノアが乗り込む', title_en: '[Clash] "You guys are just running away! Face it!" Noah gets into the disorganized LiTA' },
      { id: 'U2MJ-WiYYRc', title_ja: '【暴走】「リタは終わってる。クソつまんねぇ」現場が荒れすぎて撮影中断', title_en: '[Runaway] "Rita is finished. It\'s so boring" Filming was stopped because the scene was too rough' },
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: '[Feud] "I hate the store. The person in charge should resign." They reveal their true feelings in a relationship that can\'t be repaired.' },
      { id: 'mIlqiLmKMRM', title_ja: '【崩壊】「俺の邪魔してくんな」LiTAで起きていた最悪の現実', title_en: '[Collapse] "Don\'t get in my way" The worst reality that was happening at LiTA' },
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: '[Serious Minato collapses] ``I\'m at my limit, everything doesn\'t matter\'\' The tension that was holding me has been cut...' },
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: '[Okinawa ④] “The God of War’s favorite food is ○○” Minato vs. Rei, a serious cooking showdown… Who will win?' },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: '[Okinawa ③] World Cup-level fierce battle...An ending that no one could predict awaited' },
    ],
  },
];
