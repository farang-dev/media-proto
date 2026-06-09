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
      { id: '755JckrZ_SE', title_ja: '【ホスト症候群】面倒を見るか、見捨てるか…１番になれないと頑張れないホストに対し、桜威優希斗に究極の２択が迫られる', title_en: '[Host Syndrome] Take care of him or abandon him...For a host who can\'t do his best unless he\'s number one, Yukito Sakurai is forced to make two ultimate choices.' },
      { id: 'gRdOvVKfLCc', title_ja: '【下剋上】ユグホンの背中はまだ遠い…波乱が収まらないヴァルハラにて再び水月と右京の方針が平行線を辿る', title_en: '[Descent] Yuguhon\'s back is still far away... In Valhalla, where the turmoil has not subsided, Suigetsu and Ukyo\'s policies are parallel again' },
      { id: 'x2wD0LFP08o', title_ja: '【金を持ってるだけの雑巾】現状に満足するホスト達に社会の現実を突きつける社美緒…これが最終勧告になる', title_en: '[A rag that only has money] Sha Mio confronts the hosts who are satisfied with the current situation with the reality of society...This is the final recommendation.' },
      { id: 'xLH4lOJ9aTA', title_ja: '「��ざとお前だけハブいた」ユグホンの急成長に伴い、また一段とギアを上げる社美緒にもがき苦しむ男達の思いは…', title_en: '``By the way, you were the only one in the hub.\'\' With Yughon\'s rapid growth, the thoughts of the men who are struggling with Sha Mio, who is stepping up the gears again...' },
      { id: '5vWjwG3bKWw', title_ja: '【陥落寸前】お前らもういらねぇんだよ。不動の山のようなホストクラブに大穴を開けに行く！', title_en: '[On the verge of collapse] I don\'t need you guys anymore. I\'m going to make a big hole in the host club, which is like an immovable mountain!' },
      { id: 'xCR4-tUmrv4', title_ja: '【移籍前】帝リキヤユグホン事件簿', title_en: '[Before transfer] Teikya Yughon Case Files' },
      { id: 'gfAkIt5ZfEo', title_ja: '【No.1病】優希斗社長のただ一つの弱点', title_en: '[No.1 disease] President Yukito\'s only weakness' },
      { id: 'pi-IyknzXq8', title_ja: '右京「時代が変わったホストクラブで勝てる価値を作ろう」', title_en: 'Ukyo: “Let’s create value that can win at a host club where times have changed.”' },
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
      { id: 'gelkCxW9ozU', title_ja: 'マンジャロ騒動でゆいぴす降板にてんちむ＆青汁王子夫妻も言及！', title_en: 'Tenchimu and Prince Aojiru also mentioned Yuipisu\'s resignation due to the Manjaro scandal!' },
      { id: '-pYCeJmPpeo', title_ja: '坂口杏里に万引き事件の真相を聞いていたら、まさかの匂わせ発覚？！', title_en: 'When I asked Anri Sakaguchi about the truth behind the shoplifting incident, did she find out that there was a hint? !' },
      { id: '-szmMCLS7jQ', title_ja: '逮捕・恋愛事情・配信者のホスト体験まで…夜職界隈がザワついた夜', title_en: 'From arrests to love affairs to the streamer\'s host experience...a night when the night job community was in a state of excitement.' },
      { id: 'DC-3WFGoglE', title_ja: 'DVは姫に頼まれてやった？！湊 叶迴さん晒される', title_en: 'Did the princess ask you to do the domestic violence? ! Kanae Minato exposed' },
      { id: 'Nc3BqZrggf8', title_ja: 'イメージと違って黒い噂が多い天使ニアさんの裏で好感度の高い皇アトムさん', title_en: 'Unlike the image of Angel Nia, who has a lot of dark rumors, Kou Atomu has a good reputation behind the scenes.' },
      { id: 'Edvb8daAdi4', title_ja: '億超えの投げ銭は自腹だったのか？！SHOが暴露！', title_en: 'Did he pay for over 100 million yen? ! SHO exposed!' },
      { id: 'Sra0ZPEOuq8', title_ja: 'マンジャロで大炎上のゆいぴす…炎上のきっかけにもなったXは巧妙に仕組まれた投稿だった？！', title_en: 'Yuipisu caused a huge uproar in Manjaro... Was the X that caused the uproar a cleverly orchestrated post? !' },
      { id: 'uPwu-r2r2ZU', title_ja: '【辛口注意】櫻井瑛紫さんへ強めのツッコミしてたら逆にリスナーにいじられる展開へ！', title_en: '[Harsh warning] I was making a strong comment to Eiji Sakurai, but instead I ended up being teased by the listeners!' },
      { id: 'jHd2wH4aZHM', title_ja: 'イケメンホストと姫のやりとりが流出！', title_en: 'The exchange between the handsome host and the princess is leaked!' },
      { id: '6GB4RnpHjOc', title_ja: '噂のりっくん遂に出馬？！', title_en: 'Is the rumored Rikkun finally running for office? !' },
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
      { id: 'FnGqsp5AMJI', title_ja: 'モテすぎて『ラストコール』出演の某有名キャバ嬢から「DM」が届いた件', title_en: 'I was so popular that I received a DM from a famous hostess who appeared on “Last Call”' },
      { id: '1dHtnj8588Q', title_ja: '【ガチ】母「1000万払え」従業員の毒親が店凸して騒ぎ出した件について。【本当にあった怖い���】', title_en: '[Seriously] My mother said, ``Pay me 10 million yen.\'\' Regarding the case where the toxic parent of an employee stormed the store and caused a commotion. [True scary story]' },
      { id: 'VnTKp-hVhW4', title_ja: 'ほすちるよりご報告です。', title_en: 'This is a report from Hoschiru.' },
      { id: 'ikBtXCssU2I', title_ja: 'ホスト版「ラストコール」に出た感想を話します。', title_en: 'I would like to talk about my impressions from the host version of "Last Call."' },
      { id: 'r0yHsuY-2g8', title_ja: '【恋愛相談】ホストは「お金使わないと」恋愛対象にはなりません', title_en: '[Love advice] Hosts cannot be romantically involved unless they spend money.' },
      { id: 'GtjrpbQJfzQ', title_ja: '【再暴走】桜井野の花を止めることは、誰にも出来ません。', title_en: '[Runaway again] No one can stop Sakuraino no Hana.' },
      { id: 'hovuoxlr85M', title_ja: '【ブチギレ】カリスマホストの家に行ったら、怒��れました。', title_en: '[Breaking noise] When I went to the charismatic host\'s house, he got angry.' },
      { id: 'cYHYeKzLoLE', title_ja: '【ガチ】桜井野の花にドタキャンされました。', title_en: '[Really] I was suddenly canceled by Sakuraino no Hana.' },
      { id: '0Da7zsoXHMw', title_ja: '【速報】5月度ランウェイ【2026】', title_en: '[Breaking News] May Runway [2026]' },
      { id: 'dMd0ZhAky-k', title_ja: 'パルクール × 40歳 × 打撲', title_en: 'Parkour × 40 years old × Bruises' },
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
      { id: 'jyiONCgm9Z8', title_ja: '【チャンネル閉鎖】「本当に申し訳ない」責任者不在で継続不可能に…', title_en: '[Channel closed] ``I\'m really sorry.\'\' It\'s impossible to continue due to the absence of the person in charge...' },
      { id: 'juf8dBuii-Q', title_ja: '【転落】「責任者降りろ」突然の通��に和久井は何を想うのか…', title_en: '[Fall] What does Wakui think of the sudden announcement that “the person in charge should step down”?' },
      { id: '7Kxu7WcO1cU', title_ja: '【苦悩】「開き直んじゃねぇ」心も体も限界の美月、メンタル崩壊', title_en: '[Suffering] “Don’t open up again” Mizuki, whose mind and body are at their limits, has a mental breakdown' },
      { id: 'hICbxWZk0Tw', title_ja: '【沖縄① ２話同時配信】「もう体力の限界…」白熱の戦いで全員ヒートアップ', title_en: '[Okinawa ① 2 episodes simultaneously distributed] “My physical strength is at its limit...” Everyone heats up in a heated battle' },
      { id: 'Vu2_gVPZPT4', title_ja: '【沖縄② ２話同時配信】「本来は見せるべきじゃねぇ」沖縄で明かされたリーダー達の本音', title_en: '[Okinawa ② 2 episodes simultaneously distributed] “We shouldn’t show it in the first place” The true feelings of the leaders revealed in Okinawa' },
      { id: 'cjMYIJPIPKY', title_ja: '【対立】「絶対許せない」セイヤを巡る衝撃の真実が発覚', title_en: '[Conflict] The shocking truth surrounding Seiya, which is “absolutely unforgivable”, is revealed' },
      { id: 'BIvg9BLYrhc', title_ja: '【13周年】「Leoが大好き」激動を越えて辿り着いた感謝の言葉', title_en: '[13th Anniversary] “I love Leo” Words of gratitude reached through turbulent times' },
      { id: '80VtB2rnXd4', title_ja: '【挑戦】「Leoが好き…」変化の中で揺れる想い…周年は成功なるか', title_en: '[Challenge] “I love Leo…” Feelings wavering amidst change…Will the anniversary be a success?' },
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
      { id: 'iBJxRVN_jiM', title_ja: '【亀裂】「運営の言葉は何も響かない」LOXキャスト達の絶望が限界に…', title_en: '[Crack] “The management’s words have no effect” The despair of the LOX cast has reached its limit…' },
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: '[Reform] “Too lenient. Don’t run into self-preservation.” The war god cuts the warm-hearted management team in half' },
      { id: '94Ax4mbS52k', title_ja: '【激論】「何言われても酒は飲む」飲酒文化を巡る価値観の衝突', title_en: '[Heated debate] ``I drink alcohol no matter what people say\'\' Clash of values ​​over drinking culture' },
      { id: 'Q32_ZNcQPuU', title_ja: '【仲間割れ】「もう我慢出来ねぇ」���洋の猛反発で軍神と亀裂が走る', title_en: '[Difference between friends] ``I can\'t stand it anymore.\'\' Yoshihiro\'s fierce opposition creates a rift with the God of War' },
      { id: 'G02-oh3m_9Y', title_ja: '【ダイジェスト】「もう無理だ…」軍神一同が挑む史上最難関の改革', title_en: '[Digest] “It’s no longer possible…” The most difficult reform in history undertaken by all the gods of war' },
      { id: 'A9Tx4o7WPOM', title_ja: '【料理対決】「何めんどくせぇことやってんだよ」波乱すぎるお菓子作り開幕', title_en: '[Cooking showdown] “What a pain in the ass are you doing?” The eventful sweets making begins' },
      { id: 'Qhpq7nwzn5E', title_ja: '【激戦】「喧嘩で練習しねぇだろ」悪童ナオト、ついに格闘技出場', title_en: '[Fierce battle] “You don’t practice by fighting, right?” Bad boy Naoto finally participates in martial arts' },
      { id: 'gbDWKzAzXcA', title_ja: '【乱闘】「テメェは仲間じゃねぇ」暴走止まらず制御不能…衝突激化！', title_en: '[Scuffle] “Temee is not my friend” The rampage continues and is out of control… The collision intensifies!' },
    ],
  },
];
