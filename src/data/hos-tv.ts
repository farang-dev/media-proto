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
      { id: '9pdZAAF5Hvw', title_ja: '「君たちとリーヴを作るつもりはない」社美緒の意志を継ぎ苺愛ロマがリーヴに移籍！しかし彼が見た景色とは… #リーヴスラシ��', title_en: null },
      { id: 'VOWR4VdmM4w', title_ja: '【ヴァルハラからロマが消えた】突如お店から姿を消した苺愛ロマの行方は…その裏に秘めた社美緒との葛藤 #ヴァルハラ', title_en: null },
      { id: 'Gnqe63wOVFY', title_ja: '「話す価値がねぇ」苺愛ロマが札幌を離れ、大きな穴が空いてしまったユグド札幌でキャストと運営が激突する #ユグドラシル札幌', title_en: null },
      { id: 'CgF9xbH7wtc', title_ja: '「今までサボってただけ」ユグホンと比べて大阪のレベルが低いと社美緒が直球でミナミのホスト達に現実を叩きつける！#ユグドラシル大阪', title_en: null },
      { id: 'rOJbYb2n8Ic', title_ja: '「そのままだとお前らは炎上する」櫻井瑛紫と衝突した動城ハウルとその後のユグ本は… #ユグドラシル本店', title_en: null },
      { id: 'qVIN1REVsUw', title_ja: '「結局お前らが独占してる」トップを走る者達が背負うモノは売上だけでは足らない…社美緒が課した重い言葉 #ユグドラシル本店', title_en: null },
      { id: '9HYkljACF3Q', title_ja: '「自分たちが正しいと思って仕事してる」天下のユグホンに社美緒が投げかけた言葉は厳しいものだった…迫るヴァルハラに対し8月の結果は… #ユグドラシル本店 #ヴァルハラ', title_en: null },
      { id: 'ivY30gfPgm0', title_ja: '【瑛紫vsハウル】輝きすぎる光と深すぎる闇…ユグドラシル本店のホスト業界最前線を走る二人が直接対決 #ユグドラシル本店', title_en: null },
      { id: '5_bBgP94pD8', title_ja: 'ロマ移籍「君たちとリーヴスラシルを作るつもりはない」', title_en: null },
      { id: '1BQOcMB6vLQ', title_ja: 'ヴァルハラ苺愛ロマの移籍の真相', title_en: null },
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
      { id: 'OcyJoPJLk7Y', title_ja: 'クラブNanae営業停止！まさかのクラファン内容に驚きすぎて笑いが止まらないｗｗｗ', title_en: null },
      { id: 'LFoaE04JuR4', title_ja: '北新地ひめかのバースデイイベントが衝撃すぎた！', title_en: null },
      { id: 'RFNryCl-f6k', title_ja: 'ローランドグループ優士、完全独立を発表！黒執事銃兎はどうなる？！', title_en: null },
      { id: 'u2wbS66BtMI', title_ja: 'きゃにょんの離婚騒動まとめ！ゆずず＆ホストコール志願者参戦で泥沼激化！', title_en: null },
      { id: 'k8KYUNHqsHU', title_ja: '冬月幹部の彼女が凸に登��！ホストの嫌な所を指摘しまくるりっくんに相談者困惑', title_en: null },
      { id: 'FduJBwOpp18', title_ja: '凸者号泣！1000万以上使った担当の相談で凸した事がバレて関係が切れた相談者', title_en: null },
      { id: 'BJkhjn0pGvw', title_ja: '夜職は売上偽造が横行？！年収も納税額も大公開するホスト', title_en: null },
      { id: 'ygIK-3SJ9u4', title_ja: '歌舞伎町のリアル！本当は自分で取り上げたかった闇を動画にしているYouTubeを発見！', title_en: null },
      { id: 'OuSnxUW3Ojw', title_ja: 'ホスト論のはずがフレネミー発覚？！', title_en: null },
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
      { id: 'UQQR4_k8UKk', title_ja: '【炎上】ホスト業界で引き抜き騒動！？大手ホストグループの会長がやり口を暴露＆ブチギレ💢DM内容はホント？ヤラセ？【ホストコール】', title_en: null },
      { id: 'NUuR9XQAgx0', title_ja: '【大激怒💢】ホストクラブ6店舗を辛口レビューした女性に現役ホストがブチギレ💢💢', title_en: null },
      { id: 'fmOoDsmdeA0', title_ja: '【激写】某ホスト掲示板に晒された写真の真相…所属ホ��トが女性と歩く姿を撮られた件について。', title_en: null },
      { id: 'DJGd46Yo8ZE', title_ja: '【推定2億！？】令和の虎・林社長があっすんの誕生日にアルマンド50本のシャンパンタワーが規格外すぎる件...。', title_en: null },
      { id: 'EyAIwjf1gQs', title_ja: '入店すぐにローランドグループで売上No 1獲得！？HOST CALL不合格から這い上がったハゲホスト「黒執事 銃兎」の現在に迫る！【THE MIYABI -OSAKA-】', title_en: null },
      { id: '6_UXwCVOjFg', title_ja: '【賛否両論】ネットで酷評されたコンビニ飯を食べてみた結果…まさかの展開に。', title_en: null },
      { id: '5g7pWh_eUcc', title_ja: '【速報】平良翔太がホスト引退＋退店発表。騒動から約1カ月...倉木華さんをめぐる騒動から今回の発表までの経緯まとめ。', title_en: null },
      { id: '6fDrCCZ_CY8', title_ja: '平良翔太、ヤマトリノについてお話します。', title_en: null },
      { id: 'd5eTyWZCxvA', title_ja: '【速報】10月度ランウェイ【2026】', title_en: null },
      { id: '1_M6LugCVd4', title_ja: '【速報】ハロウィン限定ランウェイ【2026】', title_en: null },
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
      { id: 'GtVW9SPliE0', title_ja: '【一触即発】「ノアの本性が嫌いだわ」孔明とノアが本心をぶつけ合う', title_en: null },
      { id: 'au-Epce4w8w', title_ja: '【決着】「絶対に許さねぇ」LiTA乱闘問題で譲れない本音が炸裂', title_en: null },
      { id: 'xn2q7T3QXWI', title_ja: '【激昂】「もう我慢できねぇ」ついにJINがブチギレ、現場は大荒れへ', title_en: null },
      { id: 'lbkdRJpvUpM', title_ja: '【初舞台】「ヤベェ、興奮が収まらねぇ」本気湊が1700人の前で魂のスピーチ', title_en: null },
      { id: 'nfPVM2NfnL4', title_ja: '【断絶】「お前ら卑怯なんだよ！」ノアを巡り本人不在で対立激化', title_en: null },
      { id: 'qTaBdt9cy4E', title_ja: '【完全決裂】「お前に負けてるところ1つもねぇ」互いに一歩も譲らず関係は最悪に', title_en: null },
      { id: 'Q5WVYIiKbVw', title_ja: '【激突】「お前らは逃げてるだけ！向き合え！」まとまりのないLiTAにノアが乗り込む', title_en: null },
      { id: 'U2MJ-WiYYRc', title_ja: '【暴走】「リタは終わってる。クソつまんねぇ」現場が荒れすぎて撮影中断', title_en: null },
    ],
  },
];
