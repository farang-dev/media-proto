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
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直営と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分か���', title_en: null },
      { id: 'QNkd6VxNZQY', title_ja: '【ブチギレ】店舗の火災事件をきっかけに溜まった燃料が爆発！苺叶夜と札幌支部COOが激突する', title_en: null },
      { id: 'ft2qIZU8EoA', title_ja: '「お前らつまらねぇ！」帝蓮の元で育ったスーパールーキーのホスト達が社美緒に喧嘩を売る！', title_en: null },
      { id: 'OemAOL31RLc', title_ja: '【EP勢全滅】運営と自由気ままのホストで二極化していたリーヴで大改革が起きていた！しかし、社美緒が睨んでいたのは…', title_en: null },
      { id: 'eCNbMSg-MIk', title_ja: '【熱男、吠える】ジワジワと沈んでいくユグドラシル大阪に社美緒が起死回生の一手を打つ。このお店のホストのトップを入れ替える…', title_en: null },
      { id: 'Uj9gvOFjaOM', title_ja: '社美緒「俺、お前の店抜けるから」', title_en: null },
      { id: 'Te8iKmWWSNc', title_ja: '【YOU】大阪のあの男が帰ってきた…', title_en: null },
      { id: 'bONHZ_CiyP0', title_ja: '【火災事件】COOが叶夜にブチギレ！すすきのの各地で火の粉が飛ぶ', title_en: null },
      { id: 'wPwefu4pZVk', title_ja: '「取引してくんじゃねぇよ」波乱の札幌編', title_en: null },
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
      { id: 'wDvvladEg-A', title_ja: '昔は仲が良かった桜井野の花が明かす青汁王子の裏の顔とは？！', title_en: null },
      { id: 'op1XcBkZCwE', title_ja: '遂に帝蓮と皇あとむが来る！ユグドラシルのお気に入り晒し動画にあの人の業界復帰も！', title_en: null },
      { id: '0AYL7BMrzSM', title_ja: 'ホスト業界に激震？！ジェンダーレスで2憶を売上げた天使ニアが引退を表明！その裏であのホストもひっそり復帰', title_en: null },
      { id: 'fk4arVdbJi8', title_ja: '「シーシャの炭で焼いていい？」からの失神するまでエルボーのサイコパスホスト現る', title_en: null },
      { id: '3DIF-UEo7a4', title_ja: 'ローランドグループ大阪の配信を取り上げて数日…進撃のノア＆ローランドチルドレンが配信に遊びに来てくれた！', title_en: null },
      { id: 'r-Cq8N1id-Q', title_ja: '歌舞伎年間上位プレイヤーに子宮を殴られ死産…被害女性が凸で徐々に明かされるサイコパス感', title_en: null },
      { id: 'ppDzfVvuVsE', title_ja: 'ホス狂い続出！ホス狂いから一陸斗への相談が止まらない！', title_en: null },
      { id: 'cCpA_aLwiew', title_ja: '実は同じ福岡出身の僕の幼少期はもっと酷い扱いを受けてました…', title_en: null },
      { id: '3nUQydxdYXE', title_ja: '全国のホストさんへ朗報です！', title_en: null },
      { id: 'bpggYaCxTTc', title_ja: 'リスナーからのギフト開封！', title_en: null },
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
      { id: 'EGdtDqp3omA', title_ja: '姫「担当変えたい」発言に担当ブチギレ！？その真相をお話します...。', title_en: null },
      { id: 'bVeNNYmLp5A', title_ja: '【許せない...】ホストで売れるために「包茎手術」をした結果…とんでもないことが起きました。', title_en: null },
      { id: 'Uw3ppVG6O9I', title_ja: '【告発】社長「お前もうクビな」夜職総括店長がまさかの緊急クビ宣告...。その告発内容とは？', title_en: null },
      { id: 'mAbS6qltgPc', title_ja: '【悲劇】夜職パワハラ社長の全力ビンタに思わず、一同ドン引き...。', title_en: null },
      { id: 'gAZkj9ka4P4', title_ja: '夜職 総括店長はキャバ嬢の「あっすん」推しなようです♡', title_en: null },
      { id: 'dpKe8Ok7bq4', title_ja: '【衝撃発言】10万人YouTuberから「ほすちる余裕で超えますｗｗ」と言われました。', title_en: null },
      { id: 'FnGqsp5AMJI', title_ja: 'モテすぎて『ラストコール』出演の某有名キャバ嬢から「DM」が届いた件', title_en: null },
      { id: '1dHtnj8588Q', title_ja: '【ガチ】母「1000万払え」従業員の毒親が店凸して騒ぎ出した件について。【本当にあった怖い話】', title_en: null },
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
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】「雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: null },
      { id: 'Lojd7hFG_xA', title_ja: '【重大発表】YouTubeの今後について', title_en: null },
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳ない」責任者不在で継続不可能に…', title_en: null },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通告に和久井は何を想うのか…', title_en: null },
      { id: '7Kxu7WcO1cU', title_ja: '【苦悩】「開き直んじゃねぇ」心も体も限界の美月、メンタル崩壊', title_en: null },
      { id: 'hICbxWZk0Tw', title_ja: '【沖縄① ２話同時配信】「もう体力の限界…」白熱の戦いで全員ヒートアップ', title_en: null },
      { id: 'Vu2_gVPZPT4', title_ja: '【沖縄② ２話同時配信】「本来は見せるべきじゃねぇ」沖縄で明かされたリーダー達の本音', title_en: null },
      { id: 'cjMYIJPIPKY', title_ja: '【対立】「絶対許せない」セイヤを巡る衝撃の真実が発覚', title_en: null },
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
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: null },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代未聞の答え', title_en: null },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: null },
      { id: '2HYC0bq4u4U', title_ja: '【恐喝】「その行為を晒すからな」軍神にまさかの脅迫…', title_en: null },
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: null },
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: null },
      { id: '94Ax4mbS52k', title_ja: '【激論】「何言われても酒は飲む」飲酒文化を巡る価値観の衝突', title_en: null },
      { id: 'Q32_ZNcQPuU', title_ja: '【仲間割れ】「もう我慢出来ねぇ」太洋の猛反発で軍神と亀裂が走る', title_en: null },
    ],
  },
];
