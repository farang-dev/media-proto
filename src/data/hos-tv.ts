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
      { id: 'eCNbMSg-MIk', title_ja: '【熱男、吠える】ジワジワと沈んでいくユグドラシル大阪に社美緒が起死回生の一手を打つ。このお店のホストのトップを入れ替える…', title_en: null },
      { id: '755JckrZ_SE', title_ja: '【ホスト症候群】面倒を見るか、見捨てるか…１番になれないと頑張れないホストに対し、桜威優希斗に究極の２択が迫られる', title_en: null },
      { id: 'gRdOvVKfLCc', title_ja: '【下剋上】ユグホンの背中はまだ遠い…波乱が収まらないヴァルハラにて再び水月と右京の方針が平行線を辿る', title_en: null },
      { id: 'x2wD0LFP08o', title_ja: '【金を持ってるだけの雑巾】現状に満足するホスト達に社会の現実を突きつける社美緒…これが最終勧告になる', title_en: null },
      { id: 'PXhDhzoBTyk', title_ja: '【社美緒の痛撃】今まで自由出勤だったホスト達が続々と運営側に…', title_en: null },
      { id: 'RNwFvZywdhc', title_ja: 'もう10年前の水商売の仕事の仕方じゃなくなった', title_en: null },
      { id: 'OfP2lIj20u4', title_ja: '「お前ずるいんだよ！！」大阪ミナミのホストを一括', title_en: null },
      { id: '5vWjwG3bKWw', title_ja: '【陥落寸前】お前らもういらねぇんだよ。不動の山のようなホストクラブに大穴を開けに行く！', title_en: null },
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
      { id: '6_F3w9w6G50', title_ja: '明暗の分かれた優士さんと佐藤せるてぃあさんの現在の状況とは？！', title_en: null },
      { id: '4W8CzQG6eKQ', title_ja: 'カウアンのホストデビューに苦情800件？！さすがに黒崎店長盛ったか？！', title_en: null },
      { id: 'SgCca4cCtp8', title_ja: 'グループLINEを晒されたユグドラシル！冬月は昔から○○でした', title_en: null },
      { id: 'gelkCxW9ozU', title_ja: 'マンジャロ騒動でゆいぴす降板にてんちむ＆青汁王子夫��も言及！', title_en: null },
      { id: '-pYCeJmPpeo', title_ja: '坂口杏里に万引き事件の真相を聞いていたら、まさかの匂わせ発覚？！', title_en: null },
      { id: '-szmMCLS7jQ', title_ja: '逮捕・恋愛事情・配信者のホスト体験まで…夜職界隈がザワついた夜', title_en: null },
      { id: 'DC-3WFGoglE', title_ja: 'DVは姫に頼まれてやった？！湊 叶迴さん晒される', title_en: null },
      { id: 'Nc3BqZrggf8', title_ja: 'イメージと違って黒い噂が多い天使ニアさんの裏で好感度の高い皇アトムさん', title_en: null },
      { id: 'cBYDvJ-Neuk', title_ja: '6月にして今年初初回に着いたホスト', title_en: null },
      { id: 'jHd2wH4aZHM', title_ja: 'イケメンホストと姫のやりとりが流出！', title_en: null },
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
      { id: 'gAZkj9ka4P4', title_ja: '夜職 総括店長はキャバ嬢の「あっすん」推しなようです♡', title_en: null },
      { id: 'dpKe8Ok7bq4', title_ja: '【衝撃発言】10万人YouTuberから「ほすちる余裕で超えますｗｗ」と言われました。', title_en: null },
      { id: 'FnGqsp5AMJI', title_ja: 'モテすぎて『ラストコール』出演の某有名キャバ嬢から「DM」が届いた件', title_en: null },
      { id: '1dHtnj8588Q', title_ja: '【ガチ】母「1000万払え」従業員の毒親が店凸して騒ぎ出した件について。【本当にあった怖い話】', title_en: null },
      { id: 'VnTKp-hVhW4', title_ja: 'ほすちるよりご報告です。', title_en: null },
      { id: 'ikBtXCssU2I', title_ja: 'ホスト版「ラストコール」に出た感想を話します。', title_en: null },
      { id: 'r0yHsuY-2g8', title_ja: '【恋愛相談】ホストは「お金使わないと」恋愛対象にはなりません', title_en: null },
      { id: 'GtjrpbQJfzQ', title_ja: '【再暴走】桜井野の花を止めることは、誰にも出来ません。', title_en: null },
      { id: '0Da7zsoXHMw', title_ja: '【速報】5月度ランウェイ【2026】', title_en: null },
      { id: 'dMd0ZhAky-k', title_ja: 'パルクール × 40歳 × 打撲', title_en: null },
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
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳ない」責任者不在で継続不可能に…', title_en: null },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通告に和久井は何を想うのか��', title_en: null },
      { id: '7Kxu7WcO1cU', title_ja: '【苦悩】「開き直んじゃねぇ��心も体も限界の美月、メンタル崩壊', title_en: null },
      { id: 'hICbxWZk0Tw', title_ja: '【沖縄① ２話同時配信】「もう体力の限界…」白熱の戦いで全員ヒートアップ', title_en: null },
      { id: 'Vu2_gVPZPT4', title_ja: '【沖縄② ２話同時配信】「本来は見せるべきじゃねぇ」沖縄で明かされたリーダー達の本音', title_en: null },
      { id: 'cjMYIJPIPKY', title_ja: '【対立】「絶対許せない」セイヤを巡る衝撃の真実が発覚', title_en: null },
      { id: 'BIvg9BLYrhc', title_ja: '【13周年】「Leoが大好き」激動を越えて辿り着いた感謝の言葉', title_en: null },
      { id: '80VtB2rnXd4', title_ja: '【挑戦】「Leoが好き…」変化の中で揺れる想い…周年は成功なるか', title_en: null },
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
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: null },
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: null },
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: null },
      { id: '94Ax4mbS52k', title_ja: '【激論】「何言われても酒は飲む」飲酒文化を巡る価値観の衝突', title_en: null },
      { id: 'Q32_ZNcQPuU', title_ja: '【仲間割れ】「もう我慢出来ねぇ」太洋の猛反発で軍神と亀裂が走る', title_en: null },
      { id: 'G02-oh3m_9Y', title_ja: '【ダイジェスト】「もう無理だ…」軍神一同が挑む史上最難関の改革', title_en: null },
      { id: 'A9Tx4o7WPOM', title_ja: '【料理対決】「何めんどくせぇことやってんだよ」波乱すぎるお菓子作り開幕', title_en: null },
      { id: 'Qhpq7nwzn5E', title_ja: '【激戦】「喧嘩で練習しねぇだろ」悪童ナオト、ついに格闘技出場', title_en: null },
    ],
  },
];
