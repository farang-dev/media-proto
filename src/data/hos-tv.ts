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
      { id: 'CgF9xbH7wtc', title_ja: '「今までサボってただけ」ユグホンと比べて大阪のレベルが低いと社美緒が直球でミナミのホスト達に現実を叩きつける！#ユグドラシル大阪', title_en: null },
      { id: 'rOJbYb2n8Ic', title_ja: '「そのままだとお前らは炎上する」櫻井瑛紫と衝突した動城ハウルとその後のユグ本は… #ユグドラシル本店', title_en: null },
      { id: 'qVIN1REVsUw', title_ja: '「結局お前らが独占してる」トップを走る者達が背負うモノは売上だけでは足らない…社美緒が課した重い言葉 #ユグドラシル本店', title_en: null },
      { id: '9HYkljACF3Q', title_ja: '「自分たちが正しいと思って仕事してる」天下のユグホンに社美緒が投げかけた言葉は厳しいものだった…迫るヴァルハラに対し8月の結果は… #ユグドラシル本店 #ヴァルハラ', title_en: null },
      { id: 'ivY30gfPgm0', title_ja: '【瑛紫vsハウル】輝きすぎる光と深すぎる闇…ユグドラシル本店のホスト業界最前線を走る二人が直接対決 #ユグドラシル本店', title_en: null },
      { id: 'wg1laAh59A8', title_ja: '【ユグホン激突序章】中堅層のホスト達が芽が出ず辞めていく…その理由を巡りトップキャスト達に不穏な空気が… #リーヴスラシル #ユグドラシル本店', title_en: null },
      { id: 'r_eBup0t8Y4', title_ja: '「ああするしかなかった…」ユグドに勝つためにはなんでもやった黒鳥虎白の告白をかつての敵だった社美緒が受け止める #ヴァルハラ', title_en: null },
      { id: 'aPemCCMcNjE', title_ja: '「話す価値がねぇ」本音を言い合わない札幌の文化…', title_en: null },
      { id: 's24ioKmKWP0', title_ja: '大阪店の中核の運営が辞職…戸惑うプレイヤー達と社美緒が激突', title_en: null },
      { id: 'JKEO2TdAcDs', title_ja: '「トップダウン？だったらお前からやってやるよ」', title_en: null },
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
      { id: '5QJz_dF_AT0', title_ja: 'あおい会長vsアレスで遂にホストコールの闇が暴かれる？！', title_en: null },
      { id: 'P3-btwa66QM', title_ja: '黒執事銃兎コラボの裏話＆ホストコールの裏話を入手！ローランドグループを選択して正解だった理由も発覚', title_en: null },
      { id: 'QQn2ifWqB_I', title_ja: '【速報】コカ〇ン使用で逮捕のヤマトリノ保釈！', title_en: null },
      { id: '3gz774-CuoY', title_ja: '有名ホスト関与疑惑の訃報以降、業界の不審な動きが続出中', title_en: null },
      { id: 'HNwH9ASoP-Q', title_ja: 'ラストコール出演の星乃リアが消息不明？！その裏で1日で売上４憶超のKIKOでホストの肩身が狭くなる夜業界の今', title_en: null },
      { id: '0e49OHcMZx0', title_ja: 'ACQUA内輪揉め��化の裏で1月に逮捕された従業員が別件で逮捕！', title_en: null },
      { id: 'eJLNC_NCjbk', title_ja: '元キャバ嬢×現役キャバ嬢の対談動画を見た感想が辛辣すぎた', title_en: null },
      { id: 'T-VdiqsJnUc', title_ja: '「お風呂屋さんじゃなかったの？」吉原ソープ摘発で大喜利勃発ｗ', title_en: null },
      { id: 'RKVM5gSYpFI', title_ja: 'リスナーから届いた笑撃の動画とは？！', title_en: null },
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
      { id: 'DJGd46Yo8ZE', title_ja: '【推定2億！？】令和の虎・林社長があっすんの誕生日にアルマンド50本のシャンパンタワーが規格外すぎる件...。', title_en: null },
      { id: 'EyAIwjf1gQs', title_ja: '入店すぐにローランドグループで売上No 1獲得！？HOST CALL不合格から這い上がったハゲホスト「黒執事 銃兎」の現在に迫る！【THE MIYABI -OSAKA-】', title_en: null },
      { id: '6_UXwCVOjFg', title_ja: '【賛否両論】ネットで酷評されたコンビニ飯を食べてみた結果…まさかの展開に。', title_en: null },
      { id: '5g7pWh_eUcc', title_ja: '【速報】平良翔太がホスト引退＋退店発表。騒動から約1カ月...倉木華さんをめぐる騒動から今回の発表までの経緯まとめ。', title_en: null },
      { id: '6fDrCCZ_CY8', title_ja: '平良翔太、ヤマトリノについてお話します。', title_en: null },
      { id: 'tnE-J38V_Iw', title_ja: '【7選】社美緒流 “嫌われない会話術” が深すぎた件について', title_en: null },
      { id: '9hmFYHF95mY', title_ja: '【緊急】ヴァンビ（スパイダーメーン）が現行犯逮捕…またしても“溝口勇児の周辺”で騒動が', title_en: null },
      { id: 't4aQEy7RQqc', title_ja: '【結婚して？】桜井野の花が3400万の結婚詐欺に��？こんな私を癒して...。', title_en: null },
      { id: 'qzuE9eFbOJE', title_ja: '【速報】9月度ランウェイ【2026年】', title_en: null },
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
      { id: 'au-Epce4w8w', title_ja: '【決着】「絶対に許さねぇ」LiTA乱闘問題で譲れない本音が炸裂', title_en: null },
      { id: 'xn2q7T3QXWI', title_ja: '【激昂】「もう我慢できねぇ」ついにJINがブチギレ、現場は大荒れへ', title_en: null },
      { id: 'lbkdRJpvUpM', title_ja: '【初舞台】「ヤベェ、興奮が収まらねぇ」本気湊が1700人の前で魂のスピーチ', title_en: null },
      { id: 'nfPVM2NfnL4', title_ja: '【断絶】「お前ら卑怯なんだよ！」ノアを巡り本人不在で対立激化', title_en: null },
      { id: 'qTaBdt9cy4E', title_ja: '【完全決裂】「お前に負けてるところ1つもねぇ」互いに一歩も譲らず関係は最悪に', title_en: null },
      { id: 'Q5WVYIiKbVw', title_ja: '【激突】「お前らは逃げてるだけ！向き合え！」まとまりのないLiTAにノアが乗り込む', title_en: null },
      { id: 'U2MJ-WiYYRc', title_ja: '【暴走】「リタは終わってる。クソつまんねぇ」現場が荒れすぎて撮影中断', title_en: null },
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: null },
    ],
  },
];
