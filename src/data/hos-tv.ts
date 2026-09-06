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
      { id: 'hpflZiJOzhA', title_ja: '【ホスト格差】ユグドラシル本店のトップホスト達と次世代ホストの格差の溝が止まらない…生き残るにはアメかムチか　#ユグドラシル本店', title_en: null },
      { id: 'JXzpxGLJiPY', title_ja: '【ホストコール志願者入店】「折れるに決まってるから、ユグホンのメンバーと戦ったら」社美緒の厳しい一言が突き刺さ�� #ユグドラシル本店', title_en: null },
      { id: 'kn-5DbSuCa0', title_ja: '【急成長の代償】帝蓮率いるセレステで営��中のトラブルが続々と発生…店舗の鍵を握るのは次世代の皇あとむだった #セレステ #セレステ', title_en: null },
      { id: 'OGIXAbLZOb4', title_ja: '「歌舞伎町から消える」何者になり��くて歌舞伎町に来たのか…壁にぶつかった若きホストに社美緒が伝えた言葉とは #ユグドラシル本店', title_en: null },
      { id: 'wYEjWk81BJk', title_ja: '【店の外まで長蛇の列】ユグドラシル大阪の今年1番に混んだ日に社美緒が登場！混み合ったホストクラブで怒号が飛び合う #ユグドラシル大阪', title_en: null },
      { id: 'HJywTfKpkz0', title_ja: '「俺はあんたに返したいんですよ！」社美緒のおかげで人生が変わり恩返しをしたいと望むロマ…しかしそれを否定する社美緒の真意とは… #ヴァルハラ', title_en: null },
      { id: 'e_o5EnLPrF8', title_ja: '「ユグドラシルは綺麗事でしょ」炎上ホスト黒鳥虎白がヴァルハラに参戦！他店舗から見ていたユグドの方針に自らの想いを社美緒にぶつける！ #ヴァルハラ', title_en: null },
      { id: 'pvr6T3KHD3E', title_ja: '「調子に乗ってんじゃねぇよ」社美緒からの最後の通達！整形で人生変えられるほど甘くない #セレステ', title_en: null },
      { id: 'WYwHLm4Mecs', title_ja: '【次世代が挫折】ユグホンのレベルが高すぎて離脱者が続出', title_en: null },
      { id: 'WJlj4z2bUlE', title_ja: 'ホストコール志願者が参戦！「ユグホンに入るのが夢だった」', title_en: null },
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
      { id: 'SLs3x5YomJc', title_ja: '炎上上等！ラストコールで話題のえんりけコラボでまさかの結末に！', title_en: null },
      { id: 'C21CQOzN3ew', title_ja: '社美緒会長がネ��トのおもちゃに？！話題のホストコールの裏で晒されるうきょまる', title_en: null },
      { id: 'ZYrrB2-rt2E', title_ja: 'これを見れば人生が上手くいく？！オーナーコラボ後に人との接し方を語る', title_en: null },
      { id: 'xvFBshemD9s', title_ja: '福岡出身ホストが話題の「さす九」について見てみたら悲しくなった件', title_en: null },
      { id: 'U3upwJv0zIk', title_ja: 'ホストコール不合格後にローランドグループへ入店！2週間で500万の投げ銭を集めるホストが凄い！', title_en: null },
      { id: 'eQyC-Tj7794', title_ja: 'これってどうなん？！最後のイベントで姫にプロポーズしたホスト', title_en: null },
      { id: 'cmkNqqeTTqI', title_ja: '転売ヤーが凸へ！横行するスクイーズ転売トラブルの末路とは？！', title_en: null },
      { id: 'Nd3ob0lsceo', title_ja: 'ホストのヒモになったら天国と地獄を同時に味わって抜け出せなくなった相談者', title_en: null },
      { id: '50yi0bMChLc', title_ja: '桜井野の花と噂のりっくんの相性', title_en: null },
      { id: 'AXjwYJFHsUQ', title_ja: '噂のりっくん音声ボタン誕生！', title_en: null },
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
      { id: 'cyrTqda31Pg', title_ja: '【HOST CALL】令和イチのクソチビホスト「成星心愛」に収録の裏側を全部聞いてみた。【ACE CENTURION】', title_en: null },
      { id: 'WwmzHIiK7Bk', title_ja: '【実録】社長が会長にブチギレ…。「このグループ終わり」社長が会長に溜めていた不満をすべて吐き出しました。', title_en: null },
      { id: 'fEaY_DqNQd8', title_ja: '【本人登場】『HOST CALL』で不合格になったチー牛ホスト「龍征」に全部聞きました！', title_en: null },
      { id: 'GtAtKFktZcA', title_ja: '『HOSTCALL』の実力派KING「天音恋愛」に���ホストのリアル”を全部聞きました。【UNITED Dear\'s】', title_en: null },
      { id: 'oFbt67d8AIs', title_ja: '【浴衣トーク】『ホストコール』の審査、さすがに厳しすぎない？【また不合格⁉️】', title_en: null },
      { id: 'DSB87aJo9QE', title_ja: '【夜職の闇】ホストの6割は虚言癖←むしろ8割です。', title_en: null },
      { id: 'Mh3iE0xkWQ0', title_ja: '【言いたい放題】VIVANT、ラヴ上等2、ホストコール…いま話題のこと全部しゃべります。【超フリートーク】', title_en: null },
      { id: 'OlUCwH7sSho', title_ja: '【ブチギレ💢】『ホストコール』出演のホストに喧嘩を売られたので晒します。', title_en: null },
      { id: 'kz8aHS44ggE', title_ja: '【速報】8月度ランウェイ【2026】', title_en: null },
      { id: '1VitH9oh6KA', title_ja: '【速報】ドパガキ浴衣ランウェイ【2026】', title_en: null },
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
      { id: 'qIphPR37Z6k', title_ja: '【決裂】「仲間に掛ける言葉じゃねぇ」両者の対立がついに敵対関係へ', title_en: null },
      { id: 'I8ol4hMMLrE', title_ja: '【泥沼】「お前らやってみろよ」キャストと運営・内勤が真っ向から対立', title_en: null },
      { id: '4XXG72ksxzM', title_ja: '【落胆】「犬になりたくねぇ」あまりに幼稚な言い分に言葉を失う', title_en: null },
      { id: 'yH2GU-gBoBA', title_ja: '【対立】「ホストなんて頭おかしくてなんぼ」正反対の価値観が真っ向から衝突', title_en: null },
      { id: 'WUDHeO2oU5M', title_ja: '【異常事態】「お前の覚悟見せろよ」責任者不在で現場から不満が爆発', title_en: null },
      { id: 'eSp1zrbN_ik', title_ja: '【限界】「辞めた方がいいのかな…」30歳ホストが迎えた人生の岐路', title_en: null },
      { id: 'zWRVOWm8D4g', title_ja: '【喧嘩勃発】「泣いてんじゃねぇよ」XXX視察でまさかの大激突', title_en: null },
      { id: 'lmyBjqxPuhM', title_ja: '【衝撃】「そのやり方は古い」XXX視察で痛感した格の違い', title_en: null },
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
      { id: 'Q5WVYIiKbVw', title_ja: '【激突】「お前らは逃げてるだけ！向き合え！」まとまりのないLiTAにノアが乗り込む', title_en: null },
      { id: 'U2MJ-WiYYRc', title_ja: '【暴走】「リタは終わってる。クソつまんねぇ」現場が荒れすぎて撮影中断', title_en: null },
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: null },
      { id: 'mIlqiLmKMRM', title_ja: '【崩壊】「俺の邪魔してくんな」LiTAで起きていた最悪の現実', title_en: null },
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: null },
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: null },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: null },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: null },
    ],
  },
];
