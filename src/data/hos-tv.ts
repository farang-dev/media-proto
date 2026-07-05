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
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残らなかった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出した結論とは', title_en: null },
      { id: '5ziXccHlF4U', title_ja: '「ホストなんてドブネズミだ」無難で綺麗に見せることが俺たちの仕事ではないと社美緒が真っ向から否定する', title_en: null },
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直営と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分かつ', title_en: null },
      { id: 'QNkd6VxNZQY', title_ja: '【ブチギレ】店舗の火災事件をきっかけに溜まった燃料が爆発！苺叶夜と札幌支部COOが激突する', title_en: null },
      { id: 'ft2qIZU8EoA', title_ja: '「お前らつまらねぇ！」帝蓮の元で育ったスーパールーキーのホスト達が社美緒に喧嘩を売る！', title_en: null },
      { id: 'OemAOL31RLc', title_ja: '【EP勢全滅】運営と自由気ままのホストで二極化していたリーヴで大改革が起きていた！しかし、社美緒が睨んでいたのは…', title_en: null },
      { id: 'YyN3q1FXvaU', title_ja: '「プレッシャーがキツい、辞めたい…」', title_en: null },
      { id: '-b2VBxvSnEs', title_ja: 'ユグド大阪のトップキャスト2人をバッサリ斬る社美緒', title_en: null },
      { id: '-glbGgorA0E', title_ja: 'ユグドラシル本店改革再び！次の課題は音弥？', title_en: null },
      { id: 'Uj9gvOFjaOM', title_ja: '社美緒「俺、お前の店抜けるから」', title_en: null },
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
      { id: '4M5O95IXmTQ', title_ja: '過去の彼氏に説教も…！最強の後ろ盾を得て桜井野の花がグルダンで彼氏探しへ…結末は？！', title_en: null },
      { id: '1pExzJ0gOoY', title_ja: 'TIKTOKで知り合った20歳の女の子を弄ぶ大手ホストクラブ経営者とは一体？！', title_en: null },
      { id: 'CbNuQiHkN9s', title_ja: 'ラストコールコレクションが炎上？！遂に始まったホストコール予告を見た感想', title_en: null },
      { id: 'Bz3RhajAe50', title_ja: '別人になりすましてお店に通うホス狂いの相談から自グループのトラブルの話へ…', title_en: null },
      { id: '7dfj3TGQTVI', title_ja: '香港で相次ぐ拘束！ホストに勧められて徐々に夜の世界に手を染めていった相談者', title_en: null },
      { id: 'Wp4Ut2ZFXjY', title_ja: 'マチアプ集客・出稼ぎ斡旋の雑誌取材に答えたホスト、4ヶ月後に逮捕', title_en: null },
      { id: 'wDvvladEg-A', title_ja: '昔は仲が良かった桜井野の花が明かす青汁王子の裏の顔とは？！', title_en: null },
      { id: 'op1XcBkZCwE', title_ja: '遂に帝蓮と皇あとむが来る！ユグドラシルのお気に入り晒し動画にあの人の業界復帰も！', title_en: null },
      { id: 'NsWMKzmgGUk', title_ja: 'ホストが趣味飲みに全力らしい！', title_en: null },
      { id: '3nUQydxdYXE', title_ja: '全国のホストさんへ朗報です！', title_en: null },
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
      { id: 'I9nWZHV5nJU', title_ja: '【激震】歌舞伎町ホスト 年間30人以上が逮捕…。現役ホストが語る“知られざる実態”', title_en: null },
      { id: 'QmRhacvKuOM', title_ja: '【壮絶】爆弾・暴行・アルハラ...。すべて日常茶飯事！？今じゃ考えられない福岡時代のホストの話。', title_en: null },
      { id: 'EGdtDqp3omA', title_ja: '姫「担当変えたい」発言に担当ブチギレ！？その真相をお話します...。', title_en: null },
      { id: 'bVeNNYmLp5A', title_ja: '【許せない...】ホストで売れるために「包茎手術」をした結果…とんでもないことが起きました。', title_en: null },
      { id: 'Uw3ppVG6O9I', title_ja: '【告発】社長「お前もうクビな」夜職総括店長がまさかの緊急クビ宣告...。その告発内容とは？', title_en: null },
      { id: 'mAbS6qltgPc', title_ja: '【悲劇】夜職パワハラ社長の全力ビンタに思わず、一同ドン引き...。', title_en: null },
      { id: 'gAZkj9ka4P4', title_ja: '夜職 総括店長はキャバ嬢の「あっすん」推しなようです♡', title_en: null },
      { id: 'dpKe8Ok7bq4', title_ja: '【衝撃発言】10万人YouTuberから「ほすちる余裕で超えますｗｗ」と言われました。', title_en: null },
      { id: '_CZt13Xaxgk', title_ja: '【速報】6月度ランウェイ【2026】', title_en: null },
      { id: '0Da7zsoXHMw', title_ja: '【速報】5月度ランウェイ【2026】', title_en: null },
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
      { id: 'bfhN4Xi4QjQ', title_ja: '【拒絶】「Leoから追い出す」受け入れてもらえない孤独な戦い', title_en: null },
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】���雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: null },
      { id: 'Lojd7hFG_xA', title_ja: '【重大発表】YouTubeの今後について', title_en: null },
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳な��」責任者不在で継続不可能に…', title_en: null },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通告に和久井は何を想うのか…', title_en: null },
      { id: '7Kxu7WcO1cU', title_ja: '【苦悩】「開き直んじゃねぇ」心も体も限界の美月、メンタル崩壊', title_en: null },
      { id: 'hICbxWZk0Tw', title_ja: '【沖縄① ２話同時配信】「もう体力の限界…」白熱の戦いで全員ヒートアップ', title_en: null },
      { id: 'Vu2_gVPZPT4', title_ja: '【沖縄② ２話同時配信】「本来は見せるべきじゃねぇ」沖縄で明かされたリーダー達の本音', title_en: null },
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
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: null },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: null },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代未聞の答え', title_en: null },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: null },
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: null },
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: null },
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: null },
      { id: '94Ax4mbS52k', title_ja: '【激論】「何言われても酒は飲む」飲酒文化を巡る価値観の衝突', title_en: null },
    ],
  },
];
