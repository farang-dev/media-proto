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
      { id: 'wYEjWk81BJk', title_ja: '【店の外まで長蛇の列】ユグドラシル大阪の今年1番に混んだ日に社美緒が登場！混み合ったホストクラブで怒号が飛び合う', title_en: '[Long line outside the store] Sha Mio appears on Yggdrasil Osaka\'s busiest day this year! Shouting and shouting in a crowded host club' },
      { id: 'HJywTfKpkz0', title_ja: '「俺はあんたに返したいんですよ！」社美緒のおかげで人生が変わり恩返しをしたいと望むロマ…しかしそれを否定する社美緒の真意とは…', title_en: '``I want to repay you!\'\' Thanks to Sha Mio, Roma\'s life changed and she wants to repay the favor...But what is Sha Mio\'s true intention when she denies that...' },
      { id: 'e_o5EnLPrF8', title_ja: '「ユグドラシルは綺麗事でしょ」炎上ホスト黒鳥虎白がヴァルハラに参戦！他店舗から見ていたユグドの方針に自らの想いを社美緒にぶつけ��！', title_en: '“Yggdrasil is a beautiful thing, isn’t it?” Flaming host Torahaku Kurotori joins Valhalla! She expressed her thoughts to Sha Mio about Yugdo\'s policies that she had seen from other stores!' },
      { id: 'pvr6T3KHD3E', title_ja: '「調子に乗ってんじゃねぇよ」社美緒からの最後の通達！整形で人生変えられるほど甘くない', title_en: '“Don’t get carried away” is the final message from Sha Mio! It\'s not easy enough to change your life with plastic surgery.' },
      { id: 'IoDaZiM4MF4', title_ja: '【社美緒の経営者としての顔】ホストクラブを主軸に様々なビジネスを展開する社美緒の美学に密着', title_en: '[Shamio\'s face as a manager] A close look at the aesthetics of Shamio, which develops various businesses centered on host clubs' },
      { id: '6qnFnmpHF9A', title_ja: '【ホストが社会にできること】社美緒が突然畑の購入を検討！？歌舞伎町の売れっ子ホスト達が農業を始める', title_en: '[What hosts can do for society] Mio Sha is suddenly considering purchasing a farm! ? Kabukicho\'s popular hosts start farming' },
      { id: 'pB5Mye99MNg', title_ja: '「もっと喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: '``Let\'s fight more!\'\' The Osaka cast members, who had no individuality, start fighting each other with their own aesthetics, with Sha Mio\'s voice!' },
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残らなかった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出した結論とは', title_en: '``All I had left was money.\'\' Reio, who became Osaka\'s leading host, spilled his true feelings... What is the conclusion that the lost lion came to after thinking about it?' },
      { id: 'v49tfeop4ug', title_ja: '「お前に発言する権利はない」行列ができる大阪店に何が…', title_en: '``You have no right to speak out.\'\' What\'s going on at the Osaka store where there\'s a long line?' },
      { id: 'ZjdP49-LOZE', title_ja: '「ホストが流行って日本が良くなんの？」', title_en: '“Is it good that hosting is popular in Japan?”' },
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
      { id: 'MAh57ywyeNA', title_ja: '母をサツ害して1000万の投銭？！実は同じ署から任意聴取を受けてました', title_en: '10 million yen for harming my mother? ! Actually, I was given a voluntary interview by the same police station.' },
      { id: 'AY4CpJ4xUqE', title_ja: '冬月で7憶売った降矢まさきは何してる？懐かしのの凸電回を振り返ってみた！', title_en: 'What is Masaki Furuya, who sold 700 million copies in Fuyutsuki, doing? I looked back at the nostalgic episode of Convex Den!' },
      { id: 'pq901Vmfad8', title_ja: '元カレのホストが公表！あの有名キャバ嬢社長に貢がれた額驚異の〇憶円！', title_en: 'Ex-boyfriend\'s host announced! An astonishing amount of 100,000,000 yen was donated to the famous hostess president!' },
      { id: 'gfBIYb4VBKQ', title_ja: '某グループに通うホス狂いからの相談凸！相談中に２人のイライラが爆発！一体何が？！', title_en: 'I received a consultation from a host fanatic who attends a certain group! Two people became irritated during the consultation! What on earth? !' },
      { id: 'f14qBVP4ld0', title_ja: '配信者の話術・枕事情・稼ぎ方に持論を述べる元ピスタチオ伊地知さん', title_en: 'Former Pistachio Ijichi shares his thoughts on streamers\' speaking skills, pillow situation, and earning methods.' },
      { id: 'ASDBbKY22Ck', title_ja: '個性豊かなホストコール出演ホスト達を見てみた！', title_en: 'We took a look at the unique Host Call hosts!' },
      { id: 'JncCi7AE6ys', title_ja: 'ホストコール出演のHARLEMのNO.2に動画でいちゃもんを付けられました', title_en: 'HARLEM\'s NO.2, who appeared on the host call, was teased in a video.' },
      { id: 'iauiZQwaZhY', title_ja: '晒されたホストコール志願者の裏の顔がヤバすぎる…', title_en: 'The exposed face of the host call applicant is too dangerous...' },
      { id: '-ruQtyXEJf0', title_ja: 'ホストの掛けを飛ぶと味わう恐怖とは？！', title_en: 'What kind of fear do you feel when you fly the host? !' },
      { id: 'nzKGKoGjYn0', title_ja: '思わせぶりな態度はしないホスト', title_en: 'A host who does not behave in a suggestive manner' },
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
      { id: 'DSB87aJo9QE', title_ja: '【夜職の闇】ホストの6割は虚言癖←むしろ8割です。', title_en: '[Dark side of night work] 60% of hosts have a tendency to lie ← In fact, it\'s 80%.' },
      { id: 'Mh3iE0xkWQ0', title_ja: '【言いたい放題】VIVANT、ラヴ上等2、ホストコール…いま話題のこと全部しゃべります。【超フリートーク】', title_en: '[Say whatever you want] VIVANT, Love Jotou 2, Host Call...I\'ll talk about all the current topics. [Super free talk]' },
      { id: 'OlUCwH7sSho', title_ja: '【ブチギレ💢】『ホストコール』出演のホストに喧嘩を売られたので晒します。', title_en: '[Bullet 💢] I got into a fight with the host who appeared on "Host Call", so I\'m going to expose it.' },
      { id: 'nUdLZFZrNRo', title_ja: '【元カノ事情】ホストを辞めさせるくらいイイ女性がいたんスよ～【福岡時代】', title_en: '[Ex-girlfriend situation] There was a woman who was good enough to make me quit as a host ~ [Fukuoka era]' },
      { id: 'nUXZU6DaXsg', title_ja: '【不合格】ローランド出演の『ホストコール』番組の趣旨と違くない？', title_en: '[Failure] Isn\'t it similar to the purpose of the "Host Call" program starring Roland?' },
      { id: 'mMemJTFsm_Y', title_ja: '【ホストの現実】社美緒の”ある投稿”に共感の声が続出…', title_en: '[Reality of being a host] There are many voices of sympathy for Mio Sha\'s "certain post"...' },
      { id: 'S3SN1-eWOmo', title_ja: 'ゆい〇す『枕なしで売れた』←水商売してるヤツほど枕営業してる説', title_en: 'Yuisu ``Sold without a pillow\'\' ← The theory is that people who sell water are more likely to sell pillows.' },
      { id: 'GYvi4DNohE4', title_ja: '注意⚠️『ホストコール』の影響で勘違いする女性が急増するかも…。', title_en: 'Caution ⚠️ The number of women who misunderstand may increase rapidly due to "Host Call"...' },
      { id: '1VitH9oh6KA', title_ja: '【速報】ドパガキ浴衣ランウェイ【2026】', title_en: '[Breaking News] Dopagaki Yukata Runway [2026]' },
      { id: 'xKteGC_n8OA', title_ja: '【速報】7月度ランウェイ【2026】', title_en: '[Breaking News] July Runway [2026]' },
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
      { id: 'WUDHeO2oU5M', title_ja: '【異常事態】「お前の覚悟見せろよ」責任者不在で現場から不満が爆発', title_en: '[Abnormal Situation] “Show your determination!” Dissatisfaction explodes from the workplace due to the absence of the person in charge' },
      { id: 'eSp1zrbN_ik', title_ja: '【限界】「辞めた方がいいのかな…」30歳ホストが迎えた人生の岐路', title_en: '[Limit] “Maybe I should quit...” A crossroads in life for a 30-year-old host' },
      { id: 'zWRVOWm8D4g', title_ja: '【喧嘩勃発】「泣いてんじゃねぇよ」XXX視察でまさかの大激突', title_en: '[Fight breaks out] ``Don\'t cry!\'\' An unexpected big clash during XXX inspection' },
      { id: 'lmyBjqxPuhM', title_ja: '【衝撃】「そのやり方は古い」XXX視察で痛感した格の違い', title_en: '[Shocking] “That method is old” XXX The difference in status was keenly felt during the inspection' },
      { id: 'UNaeLvfaS3M', title_ja: '【改革】「ミスが多すぎんだよ」HaLが組織を変えるために打った一手', title_en: '[Reform] “There are too many mistakes” HaL took to change the organization' },
      { id: 'jMUG_WAPhik', title_ja: '【激論】「表面上しか変わってない」HaLが美月に突きつけた厳しい現実', title_en: '[Heated debate] “Only the surface has changed” HaL confronts Mizuki with the harsh reality' },
      { id: 'TDNiofLG_HA', title_ja: '【衝突】「リーダーが無責任だろ」教育を巡りリーダーに怒りが爆発', title_en: '[Conflict] Anger erupts at leaders over education: ``Leaders must be irresponsible.\'\'' },
      { id: 'jlQwgvcxq9Y', title_ja: '【本音��「人としてズレてんだよ」HaLが奏斗に突きつけた厳しすぎる一言', title_en: '[True truth: ``You\'re out of step as a person.\'\' HaL\'s harsh words to Kanato' },
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
      { id: 'GcGUi1p5-GU', title_ja: '【確執】「店が嫌い。責任者辞めろ」修復不能な関係に本音をぶつけ合う', title_en: '[Feud] "I hate the store. The person in charge should resign." They reveal their true feelings in a relationship that can\'t be repaired.' },
      { id: 'mIlqiLmKMRM', title_ja: '【崩壊】「俺の邪魔してくんな」LiTAで起きていた最悪の現実', title_en: '[Collapse] "Don\'t get in my way" The worst reality that was happening at LiTA' },
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: '[Serious Minato collapses] ``I\'m at my limit, everything doesn\'t matter\'\' The tension that was holding me has been cut...' },
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: '[Okinawa ④] “The God of War’s favorite food is ○○” Minato vs. Rei, a serious cooking showdown…Who will win?' },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: '[Okinawa ③] World Cup-level fierce battle...An ending that no one could predict awaited' },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: '[Overflowing with reservations] The whole story of the first day when the god of war conquered 4 stores' },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: '[Okinawa ②] “Dari, I’m going home” The atmosphere changes completely at the aquarium…' },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: '[Okinawa ①] “Our bond is second to none” A true journey of SiVAH who has grown' },
    ],
  },
];
