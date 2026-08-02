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
      { id: 'pvr6T3KHD3E', title_ja: '「調子に乗ってんじゃねぇよ」社美緒からの最後の通達！整形で人生変えられるほど甘くない', title_en: '“Don’t get carried away” is the final message from Sha Mio! It\'s not easy enough to change your life with plastic surgery.' },
      { id: 'IoDaZiM4MF4', title_ja: '【社美緒の経営者としての顔】ホストクラブを主軸に様々なビジネスを展開する社美緒の美学に密着', title_en: '[Shamio\'s face as a manager] A close look at the aesthetics of Shamio, which develops various businesses centered on host clubs' },
      { id: '6qnFnmpHF9A', title_ja: '【ホストが社会にできること】社美緒が突然畑の購入を検討！？歌舞伎町の売れっ子ホスト達が農業を始める', title_en: '[What hosts can do for society] Mio Sha is suddenly considering purchasing a farm! ? Kabukicho\'s popular hosts start farming' },
      { id: 'pB5Mye99MNg', title_ja: '「も���と喧嘩しろ」個性のなかった大阪のキャスト達が社美緒の一声によって、美学を持ってそれぞれ戦い出す！', title_en: '``Let\'s fight with each other!\'\' The Osaka cast members, who had no individuality, begin to fight each other with their own aesthetics, thanks to the voice of Sha Mio!' },
      { id: 'XBKQSJKyQSk', title_ja: '「金だけしか残らなかった」大阪を代表するホストとなった玲王がこぼした本音…迷える獅子が悩んで出し���結論とは', title_en: '``All that was left was money.\'\' Reio, who became Osaka\'s leading host, spilled his true feelings... What is the conclusion that the lost lion comes to after thinking about it?' },
      { id: '5ziXccHlF4U', title_ja: '「ホストなんてドブネズミだ」無難で綺麗に見せることが俺たちの仕事ではないと社美緒が真っ向から否定する', title_en: '"Hosts are rats." Sha Mio flatly denies that it\'s not our job to look safe and clean.' },
      { id: 'DPL2lQ7F9aI', title_ja: '「俺、この店抜けるから」冬月直営と一緒にやっていた店を社美緒の突然の退く宣言！長年信じてついてきたホストとの袂を分かつ', title_en: '``I\'m leaving this store.\'\' Sha Mio suddenly declares that she is leaving the store that was run together with Fuyutsuki\'s direct management! Parting ways with the host I have trusted for many years' },
      { id: 'UVT5rCjFK9Q', title_ja: '炎上ホスト黒鳥虎白がユグドに！ヴァルハラの起爆剤となるか…', title_en: 'Flaming host Kurotori Torahaku becomes Yugdo! Will it be the catalyst for Valhalla...' },
      { id: 'LbtbiSlM2vE', title_ja: '【整形の暴力】一度ユグドを退店したキャストに社美緒が最後の喝', title_en: '[Violence of plastic surgery] Sha Mio gives final shoutout to cast members who once left Yugdo' },
      { id: '44PgS2AlgdI', title_ja: 'ホストクラブ経営が難しくなったこの時代で成功し続ける理由', title_en: 'Reasons for continued success in this era when host club management has become difficult' },
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
      { id: 'r2LzUD4Migg', title_ja: 'ホストコールに社長が出ている店舗で本営トラブル！その内容とは一体？！', title_en: 'Head office trouble at a store where the president is on the host call! What exactly is the content? !' },
      { id: 'AQRutx_tlNw', title_ja: 'ACQUA小鳥遊翼、不起訴で釈放！過去のコラボを振り返ったらヤバすぎた･･･', title_en: 'ACQUA Kotori Yuzuki released without charge! When I look back at past collaborations, they were so crazy...' },
      { id: 'ZntApGPUexU', title_ja: '冬月に通って2年の姫から相談...ドリームクラッシャーりっくん発動！', title_en: 'A consultation from a princess who has been attending Fuyutsuki for 2 years...Dream Crusher Rikkun is activated!' },
      { id: 'hliMeCpCgws', title_ja: 'ホスト系の番組が続々始動！実際に見てみた感想は○○でした', title_en: 'Host-based programs are starting one after another! When I actually saw it, my impression was ○○.' },
      { id: 'ya8h5EcjvBk', title_ja: '吉本退所後初コラボ！伊地知さんとTikTok配信者の移り変わりについて話してみた！', title_en: 'First collaboration after leaving Yoshimoto! I talked with Ijichi about the changes in TikTok distributors!' },
      { id: 'SgyFhQ_tUek', title_ja: 'ホストなのに赤裸々すぎる２人！この動��で見た内容は誰にも言わないで…', title_en: 'Even though they are hosts, they are too revealing! Don\'t tell anyone what you saw in this video...' },
      { id: 'pVroaO9ElyE', title_ja: 'インフルエンサー美容外科医の裏の顔がホストっぽい！先生とりっくんのDM内容もついでに暴露', title_en: 'The face behind the influencer cosmetic surgeon looks like a host! Sensei Torikkun\'s DM contents are also revealed.' },
      { id: 'iWNYM7PuX74', title_ja: '2人が大絶賛！ホストコールで話題のあっすん＆鈴音りん！対照的な２人のバズ投稿を見た感想', title_en: 'Two people highly praised it! Assun & Suzune Rin are the hot topic on host calls! Thoughts after seeing buzz posts from two contrasting people' },
      { id: '8PxRhdAAR14', title_ja: '不倫事件を取り扱ったら本人が配信に来た！', title_en: 'When I dealt with an affair case, the person himself came to stream!' },
      { id: 'kCU5l6nAAaA', title_ja: 'ホストの心が広い理由', title_en: 'Why hosts are so open-minded' },
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
      { id: 'nUXZU6DaXsg', title_ja: '【不合格】ローランド出演の『ホストコール』番組の趣旨と違くない？', title_en: '[Failure] Isn\'t it similar to the purpose of the "Host Call" program starring Roland?' },
      { id: 'mMemJTFsm_Y', title_ja: '【ホストの現実】社美緒の”ある投稿”に共感の声が続出…', title_en: '[Reality of being a host] There are many voices of sympathy for Mio Sha\'s "certain post"...' },
      { id: 'S3SN1-eWOmo', title_ja: '『枕なしで売れた』←水商売してるヤツほど枕営業してる説', title_en: '``It sold without a pillow\'\' ← The theory is that those who sell water are more likely to sell pillows.' },
      { id: 'GYvi4DNohE4', title_ja: '注意⚠️『ホストコール』の影響で勘違いする女性が急増するかも…。', title_en: 'Caution ⚠️ The number of women who misunderstand may increase rapidly due to "Host Call"...' },
      { id: 'DuLVefkx1NQ', title_ja: '『ホストコール』MC溝口勇児←あなた必要ですかね？', title_en: '“Host Call” MC Yuji Mizoguchi ← Do we need you?' },
      { id: '-XCgPwe0o5I', title_ja: '『ホストコール』の裏話暴露！？ THE CLUB OSAKA統括代表『優士さん』コラボ！', title_en: 'The inside story of “Host Call” revealed! ? THE CLUB OSAKA general representative “Yushi-san” collaboration!' },
      { id: 'iuqch9tRQp8', title_ja: 'ホスト元内勤がLINE流出⁉️姫を「家畜」のような番号呼びが晒され、大炎上していた件について', title_en: 'The host\'s former office worker\'s LINE leaked⁉️Regarding the incident where the princess was exposed as being called a number like "cattle" and there was a huge uproar.' },
      { id: 'xwlpTD6FIJs', title_ja: '【社美緒出演】『ホストコール』出演費用3600万円←これガチです。', title_en: '[Appearance by Mio Sha] Appearance cost for "Host Call" is 36 million yen ← This is serious.' },
      { id: 'xKteGC_n8OA', title_ja: '【速報】7月度ランウェイ【2026】', title_en: '[Breaking News] July Runway [2026]' },
      { id: '_CZt13Xaxgk', title_ja: '【速報】6月度ランウェイ【2026】', title_en: '[Breaking News] June Runway [2026]' },
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
      { id: 'UNaeLvfaS3M', title_ja: '【改革】「ミスが多すぎんだよ」HaLが組織を変えるために打った一手', title_en: '[Reform] “There are too many mistakes” HaL took to change the organization' },
      { id: 'jMUG_WAPhik', title_ja: '【激論】「表面上しか変わってない」HaLが美月に突きつけた厳しい現実', title_en: '[Heated debate] “Only the surface has changed” HaL confronts Mizuki with the harsh reality' },
      { id: 'TDNiofLG_HA', title_ja: '【衝突】「リーダーが無責任だろ」教育を巡りリーダーに怒りが爆発', title_en: '[Conflict] Anger erupts at leaders over education: ``Leaders must be irresponsible.\'\'' },
      { id: 'jlQwgvcxq9Y', title_ja: '【本音】「人としてズレてん��よ」HaLが奏斗に突きつけた厳しすぎる一言', title_en: '[True opinion] “You’re out of step as a person.” HaL’s harsh words to Kanato' },
      { id: 'HGKQxRW9HK0', title_ja: '【激論】「納得できねぇよ、説明しろ」広告の評価基準に不満爆発', title_en: '[Heated debate] ``I don\'t understand, please explain.\'\' Dissatisfaction explodes over advertising evaluation criteria' },
      { id: 'm3t-raMQkSc', title_ja: '【4店舗合同初回デー】「他が強すぎる…」まさかのLeo苦戦…逆転なるか', title_en: '[4 stores joint first day] "Others are too strong..." Leo is struggling...Will it be a turnaround?' },
      { id: 'bfhN4Xi4QjQ', title_ja: '【拒絶】「Leoから追い出す」受け入れてもらえない孤独な戦い', title_en: '[Rejection] “Kicked out of Leo” A lonely battle to not be accepted' },
      { id: 'hcTWfBHImTk', title_ja: '【洗礼】「雑魚がLeoに来んな」歓迎されない新加入に修羅場勃発', title_en: '[Baptism] ``Don\'t let small fry come to Leo\'\' A chaotic situation breaks out due to unwelcome new members' },
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
      { id: 'AHTCtoTCoRY', title_ja: '【本気湊崩壊】「もう限界、全部どうでもいい」張り詰めていた糸が切れた…', title_en: '[Serious Minato collapses] ``I\'m at my limit, everything doesn\'t matter\'\' The tension that was holding me has been cut...' },
      { id: '90m0shTZxCs', title_ja: '【沖縄④】「軍神の大好物は○○」湊vs玲、本気の料理対決…勝つのはどっちだ', title_en: '[Okinawa ④] “The God of War’s favorite food is ○○” Minato vs. Rei, a serious cooking showdown…Who will win?' },
      { id: 'y5B05X2O97s', title_ja: '【沖縄③】ワールドカップ級の激闘…誰も予想できない結末が待っていた', title_en: '[Okinawa ③] World Cup-level fierce battle...An ending that no one could predict awaited' },
      { id: '3E8L9LT59dk', title_ja: '【予約殺到】軍神が4店舗を制圧した初回デー、その全貌', title_en: '[Overflowing with reservations] The whole story of the first day when the god of war conquered 4 stores' },
      { id: 'WlQk1JRU3NI', title_ja: '【沖縄②】「だりぃ、もう帰る」水族館で空気が一変する事態に…', title_en: '[Okinawa ②] “Dari, I’m going home” The atmosphere changes completely at the aquarium…' },
      { id: 'WsSh0veem6U', title_ja: '【沖縄①】「俺らの絆は誰にも負けない」成長したSiVAHの本音旅', title_en: '[Okinawa ①] “Our bond is second to none” A true journey of SiVAH who has grown' },
      { id: 'te-OJqqBAC8', title_ja: '【衝撃】「大阪は全部○○にする」軍神が出した前代��聞の答え', title_en: '[Shocking] “I will make all of Osaka XX” The previous answer given by the god of war' },
      { id: 'bBo2FbbqiQQ', title_ja: '【絶望】「もう辞めたい」キャストの気持ちが離れ、遂に限界を迎える', title_en: '[Despair] “I want to quit” cast members lose their feelings and finally reach their limit' },
    ],
  },
];
