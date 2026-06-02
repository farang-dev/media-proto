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
      { id: 'gRdOvVKfLCc', title_ja: '【下剋上】ユグホンの背中はまだ遠い…波乱が収まらないヴァルハラにて再び水月と右京の方針が平行線を辿る', title_en: '[Descent] Yuguhon\'s back is still far away... In Valhalla, where the turmoil has not subsided, Suigetsu and Ukyo\'s policies are parallel again' },
      { id: 'x2wD0LFP08o', title_ja: '【金を持ってるだけの雑巾】現状に満足するホスト達に社会の現実を突きつける社美緒…これが最終勧告になる', title_en: '[A rag that only has money] Sha Mio confronts the hosts who are satisfied with the current situation with the reality of society...This is the final recommendation.' },
      { id: 'xLH4lOJ9aTA', title_ja: '「わざとお前だけハブいた」ユグホンの急成長に伴い、また一段とギアを上げる社美緒にもがき苦しむ男達の思いは…', title_en: '``On purpose, you were the only one in the hub.\'\' With Yughon\'s rapid growth, the thoughts of the men who are struggling with Shamio, who is stepping up the gears again...' },
      { id: 'fBemqqW5TQQ', title_ja: '「二人ならユグホンを越えられる」悪童だった皇あとむに少しずつ変化が…そして社美緒が帝蓮に伝えた新たなビジョンとは', title_en: '``The two of us can surpass Yughon.\'\' Atomu Kou, who was a bad boy, gradually changes... and what is the new vision that Mio Sha conveys to Teiren?' },
      { id: 'J0sEmJrBn30', title_ja: '【溢れた涙と本音】変革に乗り出す右京と水月だが、急激な変化に戸惑うキャスト達とのすれ違いが起こる。ヴァルハラが一つになるときはくるのか…', title_en: '[Overflowing tears and true feelings] Ukyo and Suigetsu embark on a transformation, but they run into trouble with the cast, who are confused by the sudden change. Will there ever be a time when Valhalla becomes one?' },
      { id: 'pi-IyknzXq8', title_ja: '右京「時代が変わったホストクラブで勝てる価値を作ろう」', title_en: 'Ukyo: “Let’s create value that can win at a host club that has changed in times.”' },
      { id: 'tsvAevOjh80', title_ja: '【帝リキヤ】お前に間違えられるとお前の立場が作れねぇ', title_en: '[Emperor Rikiya] If you make a mistake, I can\'t make your position.' },
      { id: 'F5_k6rUoAyY', title_ja: '風営法改正後の不安と焦りに満ちたヴァルハラ…', title_en: 'Valhalla is full of anxiety and impatience after the amendment to the entertainment business law...' },
      { id: 'yBOn-dpR9rc', title_ja: '【経営術】うまくいっているお店を壊す必要がある', title_en: '[Management techniques] It is necessary to destroy a successful store' },
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
      { id: 'Sra0ZPEOuq8', title_ja: 'マンジャロで大炎上のゆいぴす…炎上のきっかけにもなったXは巧妙に仕組���れた投稿だった？！', title_en: 'Yuipisu caused a huge uproar in Manjaro... Was the X that caused the uproar a cleverly orchestrated post? !' },
      { id: 'uPwu-r2r2ZU', title_ja: '【辛口注意】櫻井瑛紫さんへ強めのツッコミしてたら逆にリスナーにいじられる展開へ！', title_en: '[Harsh warning] I was making a strong comment to Eiji Sakurai, but instead I ended up being teased by the listeners!' },
      { id: 'FveVnYzpLSw', title_ja: 'イケメンホスト限定！歌舞伎町NEWS！', title_en: 'Only for handsome hosts! Kabukicho NEWS!' },
      { id: 'Xn68_wbXf8E', title_ja: 'ハメられた？！イベント当日に晒された櫻井瑛紫君の暴露から衝撃の展開へ', title_en: 'Did you get fucked? ! Shocking developments from Eiji Sakurai\'s revelations on the day of the event' },
      { id: '6-FfLGy0hR8', title_ja: 'ホスト関連ニュースを見ていたら、はっしーが過去に出禁にした理由が発覚！', title_en: 'While watching host-related news, I discovered the reason why Hasshi was banned in the past!' },
      { id: '3digOBfFSBQ', title_ja: 'レジェンドホスト椎名レイトの晒しが面白過ぎたｗｗｗ【プリンスこうやコラボ】', title_en: 'Legendary host Reito Shiina’s exposure was so funny lol [Prince Kouya collaboration]' },
      { id: 'PQp66uUOeQE', title_ja: 'エースとのアフターに行ったお店の店員に手を出すホスト社長…地方でのホストの遊び方がヤバ過ぎた！', title_en: 'The host president makes a move on the store clerk who went to the after-hours meeting with Ace... The host\'s way of playing in the countryside was too dangerous!' },
      { id: '0TyHr7kZ_EQ', title_ja: '【桜井野の花＆プリンスこうやコラボ】まさかの争奪戦が勃発？！', title_en: '[Sakuranohana & Prince Kouya collaboration] An unexpected battle breaks out? !' },
      { id: '6GB4RnpHjOc', title_ja: '噂のりっくん遂に出馬？！', title_en: 'Is the rumored Rikkun finally running for office? !' },
      { id: 'AVUpbqigIQ4', title_ja: '厳しい店長×新人', title_en: 'Strict manager x new employee' },
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
      { id: '1dHtnj8588Q', title_ja: '【ガチ】母「1000万払え」従業員の毒親が店凸して騒ぎ出した件について。【本当にあっ���怖い話】', title_en: '[Seriously] My mother said, ``Pay me 10 million yen.\'\' Regarding the case where the toxic parent of an employee stormed the store and caused a commotion. [Really scary story]' },
      { id: 'VnTKp-hVhW4', title_ja: 'ほすちるよりご報告です。', title_en: 'This is a report from Hoschiru.' },
      { id: 'ikBtXCssU2I', title_ja: 'ホスト版「ラストコール」に出た感想を話します。', title_en: 'I would like to talk about my impressions from the host version of "Last Call."' },
      { id: 'r0yHsuY-2g8', title_ja: '【恋愛相談】ホストは「お金使わないと」恋愛対象にはなりません', title_en: '[Love advice] Hosts cannot be romantically involved unless they spend money.' },
      { id: 'GtjrpbQJfzQ', title_ja: '【再暴走】桜井野の花を止めることは、誰にも出来ません。', title_en: '[Runaway again] No one can stop Sakuraino no Hana.' },
      { id: 'hovuoxlr85M', title_ja: '【ブチギレ】カリスマホストの家に行ったら���怒られました。', title_en: '[Bullet] When I went to the charismatic host\'s house, he got scolded.' },
      { id: 'cYHYeKzLoLE', title_ja: '【��チ】桜井野の花にドタキャンされました。', title_en: '[...] I was suddenly canceled by Sakuraino no Hana.' },
      { id: 'dMOIidmr2e4', title_ja: '謝らなければいけないことが起こりました。', title_en: 'Something happened that I have to apologize for.' },
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
      { id: '80VtB2rnXd4', title_ja: '【挑戦】「Leoが好き…」変化の中で揺れる想い…周年は成功なるか', title_en: '[Challenge] "I love Leo..." Feelings wavering amidst change...Will the anniversary be a success?' },
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
      { id: 'JwXYky6rcsk', title_ja: '【改革断行】「甘やかしすぎ。保身に走るな」軍神が温い運営陣を一刀両断', title_en: '[Reform] “Too lenient. Don’t run into self-preservation.” The war god cuts the warm-hearted management team in half' },
      { id: '94Ax4mbS52k', title_ja: '【激論】「何言われても酒は飲む」飲酒文化を巡る価値観の衝突', title_en: '[Heated debate] ``I drink alcohol no matter what people say\'\' Clash of values ​​over drinking culture' },
      { id: 'Q32_ZNcQPuU', title_ja: '【仲間割れ】「もう我慢出来ねぇ」太洋の猛反発で軍神と亀裂が走る', title_en: '[Partnership split] "I can\'t stand it anymore" Taiyo\'s fierce opposition creates a rift with the God of War' },
      { id: 'G02-oh3m_9Y', title_ja: '【ダイジェスト】「もう無理だ…」軍神一同が挑む史上最難関の改革', title_en: '[Digest] “It’s no longer possible…” The most difficult reform in history undertaken by all the gods of war' },
      { id: 'A9Tx4o7WPOM', title_ja: '【料理対決】「何めんどくせぇことやってんだよ」波乱すぎるお菓子作り開幕', title_en: '[Cooking showdown] “What a pain in the ass are you doing?” The eventful sweets making begins' },
      { id: 'Qhpq7nwzn5E', title_ja: '【激戦】「喧嘩で練習しねぇだろ」悪童ナオト、ついに格闘技出場', title_en: '[Fierce battle] “You don’t practice by fighting, right?” Bad boy Naoto finally participates in martial arts' },
      { id: 'gbDWKzAzXcA', title_ja: '【乱闘】「テメェは仲間じゃねぇ」暴走止まらず制御不能…衝突激化！', title_en: '[Scuffle] “Temee is not my friend” The rampage continues and is out of control… The collision intensifies!' },
      { id: 'Xjq9l65d9Sk', title_ja: '【○○退店】「勝手すぎるだろ」納得できないキャストから大批判', title_en: '[Leaving ○○] Big criticism from cast members who are not satisfied with “You’re too selfish.”' },
    ],
  },
];
