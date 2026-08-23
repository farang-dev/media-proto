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
      { id: 'OGIXAbLZOb4', title_ja: '「歌舞伎町から消える」何者になりたくて歌舞伎町に来たのか…壁にぶつかった若きホストに社美緒が伝えた言葉とは', title_en: null },
      { id: 'wYEjWk81BJk', title_ja: '【店の外まで長蛇の列】ユグドラシル大阪の今年1番に混んだ日に社美緒が登場！混み合ったホストクラブで怒号が飛び合う', title_en: null },
      { id: 'HJywTfKpkz0', title_ja: '「俺はあんたに返したいんですよ！」社美緒のおかげで人生が変わり恩返しをしたいと望むロマ…しかしそれを否定する社美緒の真意とは��', title_en: null },
      { id: 'e_o5EnLPrF8', title_ja: '「ユグドラシルは綺麗事でしょ」炎上ホスト黒鳥虎白がヴァルハラに参戦！他店舗から見ていたユグドの方針に自らの想いを社美緒にぶつける！', title_en: null },
      { id: 'pvr6T3KHD3E', title_ja: '「調子に乗ってんじゃねぇよ」社美緒からの最後の通達！整形で人生変えられるほど甘くない', title_en: null },
      { id: 'IoDaZiM4MF4', title_ja: '【社美緒の経営者としての顔】ホストクラブを主軸に様々なビジネスを展開する社美緒の美学に密着', title_en: null },
      { id: '6qnFnmpHF9A', title_ja: '【ホストが社会にできること】社美緒が突然畑の購入を検討！？歌舞伎町の売れっ子ホスト達が農業を始める', title_en: null },
      { id: 'pB5Mye99MNg', title_ja: '「もっと喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: null },
      { id: 'TYqXHfMwFVE', title_ja: '「何のために歌舞伎町来たんだよ」若きホストが壁にぶつかる', title_en: null },
      { id: 'v49tfeop4ug', title_ja: '「お前に発言する権利はない」行列ができる大阪店に何が…', title_en: null },
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
      { id: 'zbuVc8SwhL4', title_ja: 'TOP DANDY 鳳条 歩コラボ！クレームの嵐に決着が！', title_en: null },
      { id: '-zYPJfTuR6o', title_ja: 'ホストコール合格者の言う覚悟とは･･･？ホストが言う「覚悟」が大嫌いな理由とは一体？！', title_en: null },
      { id: 'mhElwsqv_-s', title_ja: '「本カノという立ち位置を下さった」という姫からの相談･･･衝撃の展開へ！', title_en: null },
      { id: 'fI8HAIqjlzs', title_ja: '人に〇を着けたで炎上中のラヴ上等！法務省で広告起用へ！ヤンキーは更生出来るのか？！', title_en: null },
      { id: '81no7JevsDI', title_ja: '返信してないのにリスナーから400件超のDM･･･知らない男が自宅に侵入･･･母親サツ害の話から配信者の恐怖体験の話題に！', title_en: null },
      { id: 'n-CnCZQLNYA', title_ja: 'ホストコール志願者ローランドグループ入店決定！その裏で懲戒処分を受けるスポンサー医院長', title_en: null },
      { id: 'MAh57ywyeNA', title_ja: '母をサツ害して1000万の投銭？！実は同じ署から任意聴取を受けてました', title_en: null },
      { id: 'AY4CpJ4xUqE', title_ja: '冬月で7憶売った降矢まさきは何してる？懐かしのの凸電回を振り返ってみた！', title_en: null },
      { id: 'g7uGHIB1vpw', title_ja: '誕生日イベント前の南条京垓に凸電してみた！', title_en: null },
      { id: '-ruQtyXEJf0', title_ja: 'ホストの掛けを飛ぶと味わう恐怖とは？！', title_en: null },
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
      { id: 'GtAtKFktZcA', title_ja: '『HOSTCALL』の実力派KING「天音恋愛に」“ホストのリアル”を全部聞きました。【UNITED Dear\'s】', title_en: null },
      { id: 'oFbt67d8AIs', title_ja: '【浴衣トーク】『ホストコール』の審査、さすがに厳しすぎない？【また不合格⁉️】', title_en: null },
      { id: 'DSB87aJo9QE', title_ja: '【夜職の闇】ホストの6割は虚言癖←むしろ8割です。', title_en: null },
      { id: 'Mh3iE0xkWQ0', title_ja: '【言いたい放題】VIVANT、ラヴ上等2、ホストコール…いま話題のこと全部しゃべります。【超フリートーク】', title_en: null },
      { id: 'OlUCwH7sSho', title_ja: '【ブチギレ💢】『ホストコール』出演のホストに喧嘩を売られたので晒します。', title_en: null },
      { id: 'nUdLZFZrNRo', title_ja: '【元カノ事情】ホストを辞めさせるくらいイイ女性がいたんスよ～【福岡時代】', title_en: null },
      { id: 'nUXZU6DaXsg', title_ja: '【不合格】ローランド出演の『ホストコール』番組の趣旨と違くない？', title_en: null },
      { id: 'mMemJTFsm_Y', title_ja: '【ホストの現実】社美緒の”ある投稿”に共感の声が続出…', title_en: null },
      { id: '1VitH9oh6KA', title_ja: '【速報】ドパガキ浴衣ラ��ウェイ【2026】', title_en: null },
      { id: 'xKteGC_n8OA', title_ja: '【速報】7月度ランウェイ【2026】', title_en: null },
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
      { id: '4XXG72ksxzM', title_ja: '【落胆】「犬になりたくねぇ」あまりに幼稚な言い分に言葉を失う', title_en: null },
      { id: 'yH2GU-gBoBA', title_ja: '【対立】「ホストなんて頭おかしくてなんぼ」正反対の価値観が真っ向から衝突', title_en: null },
      { id: 'WUDHeO2oU5M', title_ja: '【異常事態】「お前の覚悟見せろよ」責任者不在で現場から不満が爆発', title_en: null },
      { id: 'eSp1zrbN_ik', title_ja: '【限界】「辞めた方がいいのかな…」30歳ホストが迎えた人生の岐路', title_en: null },
      { id: 'zWRVOWm8D4g', title_ja: '【喧嘩勃発】「泣いてんじゃねぇよ」XXX視察でまさかの大激突', title_en: null },
      { id: 'lmyBjqxPuhM', title_ja: '【衝撃】「そのやり方は古い」XXX視察で痛感した格の違い', title_en: null },
      { id: 'UNaeLvfaS3M', title_ja: '【改革】「ミスが多すぎんだよ」HaLが組織を変えるために打った一手', title_en: null },
      { id: 'jMUG_WAPhik', title_ja: '【激論】「表面上しか変わってない」HaLが美月に突きつけた厳しい現実', title_en: null },
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
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: null },
      { id: 'mIlqiLmKMRM', title_ja: '【崩壊】「俺の邪魔してくんな」LiTAで起きていた最悪の現実', title_en: null },
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: null },
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: null },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: null },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: null },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変す��事態に…', title_en: null },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: null },
    ],
  },
];
