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
      { id: '9HYkljACF3Q', title_ja: '「自分たちが正しいと思って仕事してる」天下のユグホンに社美緒が投げかけた言葉は厳しいものだった…迫るヴァルハラに対し8月の結果は…', title_en: null },
      { id: 'ivY30gfPgm0', title_ja: '【瑛紫vsハウル】輝きすぎる光と深すぎる闇…ユグドラシル本店のホスト業界最前線を走る二人が直接対決 #ユグドラシル本店', title_en: null },
      { id: 'wg1laAh59A8', title_ja: '【ユグホン激突序章】中堅層のホスト達が芽が出ず辞めていく…その理由を巡りトップキャスト達に不穏な空気が… #リーヴスラシル #ユグドラシル本店', title_en: null },
      { id: 'r_eBup0t8Y4', title_ja: '「ああするしかなかった…」ユグドに勝つためにはなんでもやった黒鳥虎白の告白をかつての敵だった社美緒が受け���める #ヴァルハラ', title_en: null },
      { id: 'hpflZiJOzhA', title_ja: '【ホスト格差】ユグドラシル本店のトップホスト達と次世代ホストの格差の溝が止まらない…生き残るにはアメかムチか　#ユグドラシル本店', title_en: null },
      { id: 'JXzpxGLJiPY', title_ja: '【ホストコール志願者入店】「折れるに決まってるから、ユグホンのメンバーと戦ったら」社美緒の厳しい一言が突き刺さる #ユグドラシル本店', title_en: null },
      { id: 'kn-5DbSuCa0', title_ja: '【急成長の代償】帝蓮率いるセレステで営業中のトラブルが続々と発生…店舗の鍵を握るのは次世代の皇あとむだ��た #セレステ #セレステ', title_en: null },
      { id: 'OGIXAbLZOb4', title_ja: '「歌舞伎町から消える」何者になりたくて歌舞伎町に来たのか…壁にぶつかった若きホストに社美緒が伝えた言葉とは #ユグドラシル本店', title_en: null },
      { id: 'oudwB-wr_e8', title_ja: 'ユグホンがヴァルハラに狙われる月…', title_en: null },
      { id: 'KD4NktiKO_s', title_ja: '「瑛紫のその悪気のないのが1番ムカつく」', title_en: null },
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
      { id: 'w8zxjXqbyw0', title_ja: '関連ホストは逮捕に怯えてる？！第二の頂き女子ヨシコ逮捕！', title_en: null },
      { id: 'QMcqK-5JCAg', title_ja: 'ヤマトリノ逮捕で拡がる尿検査！過去にFILIAでも検査したら衝撃の結果に！', title_en: null },
      { id: 'm7EVDfcDfmQ', title_ja: 'ほすちるコラボ当日！結婚詐欺の詳細を語っていた野の花さん', title_en: null },
      { id: 'cVTA9gWF44o', title_ja: '素人の考えとは真逆？！営業中のホストの本音を大公開！', title_en: null },
      { id: 'wZD8uXwnuwg', title_ja: '大阪 No.1ホスト鳳條 隼人コラボ！東西ホストの意地をかけたマウント合戦開幕！', title_en: null },
      { id: 'HRvGmKOcJuM', title_ja: '一条響vs売れっ子ホストの私服総額発表！驚きが隠せずまさかの対抗手段に･��･', title_en: null },
      { id: 'di-UKaFHPqw', title_ja: '亡くなったと噂の投師･･･実は生きてて会社のお金を６憶も使い込んでた事が発覚！？', title_en: null },
      { id: '2MqUGn2RpQ4', title_ja: '社美緒会長の元祖”色恋”を振り返ってみた！過去の営業法・好きなタイプまで深堀回！', title_en: null },
      { id: '7B_oAbpg9lk', title_ja: 'レジェンドホスト鳳帝さんがタジタジに！', title_en: null },
      { id: 'VH1_VE-op1U', title_ja: '暴露が無いホスト･･･？', title_en: null },
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
      { id: '9hmFYHF95mY', title_ja: '【緊急】ヴァンビ（スパイダーメーン）が現行犯逮捕…またしても“溝口勇児の周辺”で騒動が', title_en: null },
      { id: 't4aQEy7RQqc', title_ja: '【結婚して？】桜井野の花が3400万の結婚詐欺に！？こ��な私を癒して...。', title_en: null },
      { id: '6kJcJq8l3g4', title_ja: '【流出💀】グロいLINEのやり取り...。送られてきた“交際ルール”がヤバすぎる件について。', title_en: null },
      { id: 'E9dUtXRCR00', title_ja: '【骨折】ヒドいDVのせいで、過去最悪なバースデーを迎えました....。', title_en: null },
      { id: '1ikRtXo77H8', title_ja: '【舐めんな💢】『HOST CALL』を見てホストを目指す若者へ。現実はそんなに甘くない。', title_en: null },
      { id: 'zniSFdTiy94', title_ja: '【賛否両論】ホストを7年支えたエース（姫）と結婚…。これってぶっちゃけ「アリ？」or「ナシ？」', title_en: null },
      { id: 'QKTREFz8KzI', title_ja: '【大反省】会長との言い合いから数日後…公開後の本音をすべて話します【フリートーク】', title_en: null },
      { id: 'cyrTqda31Pg', title_ja: '【HOST CALL】令和イチのクソチビホスト「成星心愛」に収録の裏側を全部聞いてみた。【ACE CENTURION】', title_en: null },
      { id: 'qzuE9eFbOJE', title_ja: '【速報】9月度ランウェイ【2026年】', title_en: null },
      { id: 'kz8aHS44ggE', title_ja: '【速報】8月度ランウェイ【2026】', title_en: null },
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
      { id: 'vjHAO_GxRWM', title_ja: '【抗争激化】「金夜叉は墓場だと舐めてた」因縁の両者は和解できるのか', title_en: null },
      { id: 'OcJdpK5VyLc', title_ja: '【全面抗争】「クソガキが！地獄見せてやる」SNSの喧嘩が店舗同士の争いに発展', title_en: null },
      { id: 'qIphPR37Z6k', title_ja: '【決裂】「仲間に掛ける言葉じゃねぇ」両者の対立がついに敵対関係へ', title_en: null },
      { id: 'I8ol4hMMLrE', title_ja: '【泥沼】「お前らやってみろよ」キャストと運営・内勤が真っ向から対立', title_en: null },
      { id: '4XXG72ksxzM', title_ja: '【落胆】「犬になりたくねぇ」あまりに幼稚な言い分に言葉を失う', title_en: null },
      { id: 'yH2GU-gBoBA', title_ja: '【対立】「ホストなんて頭おかしくてなんぼ」正反対の価値観が真っ向から衝突', title_en: null },
      { id: 'WUDHeO2oU5M', title_ja: '【異常事態】「お前の覚悟見せろよ」責任者不在で現場から不満が爆発', title_en: null },
      { id: 'eSp1zrbN_ik', title_ja: '【限界】「辞めた方がいいのかな…」30歳ホストが迎えた人生の岐路', title_en: null },
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
      { id: 'lbkdRJpvUpM', title_ja: '【初舞台】「ヤベェ、興奮が収まらねぇ」本気湊が1700人の前で魂のスピーチ', title_en: null },
      { id: 'nfPVM2NfnL4', title_ja: '【断絶】「お前ら卑怯なんだよ！」ノアを巡り本人不在で対立激化', title_en: null },
      { id: 'qTaBdt9cy4E', title_ja: '【完全決裂】「お前に負けてるところ1つもねぇ」互いに一歩も譲らず関係は最悪に', title_en: null },
      { id: 'Q5WVYIiKbVw', title_ja: '【激突】「お前らは逃げてるだけ！向き合え！」まとまりのないLiTAにノアが乗り込む', title_en: null },
      { id: 'U2MJ-WiYYRc', title_ja: '【暴走】「リタは終わってる。クソつまんねぇ」現場が荒れすぎて撮影中断', title_en: null },
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: null },
      { id: 'mIlqiLmKMRM', title_ja: '【崩壊】「俺の邪魔してくんな」LiTAで起きていた最悪の現実', title_en: null },
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: null },
    ],
  },
];
