'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const en = {
  back: 'Back',
  title: 'Terms of Service',
  lastUpdated: 'Last updated: January 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      body: `By accessing or using OshiHos ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all of the following terms, you must not access or use the Service. OshiHos reserves the right to modify these terms at any time without prior notice. Continued use of the Service following any changes constitutes acceptance of the revised terms.`,
    },
    {
      heading: '2. Nature of the Service',
      body: `OshiHos is an independent digital information platform that provides cultural, educational, and informational content about the host club culture of Kabukicho, Shinjuku, Tokyo. The Service is designed solely to foster understanding of this cultural phenomenon.\n\nOshiHos does not operate, manage, or run any host club. The Service does not broker, facilitate, arrange, or intermediate visits to any host club or any transaction between users and host clubs or hosts. OshiHos bears no agency relationship with any host club or host listed on the Service.`,
    },
    {
      heading: '3. Assumption of Risk and User Responsibility',
      body: `Any decision to visit a host club, engage with hosts, or participate in any activity related to host club culture is made entirely at your own risk and sole discretion. OshiHos strongly recommends that all users:\n\n• Verify all information independently before visiting any establishment.\n• Comply with all applicable local, national, and international laws and regulations.\n• Exercise reasonable caution and personal judgment at all times.\n• Seek independent legal or professional advice where appropriate.\n\nYou acknowledge and agree that OshiHos is not responsible for any loss, damage, injury, or harm — whether physical, financial, emotional, or otherwise — arising from or in connection with your visit to any host club, your interaction with any host, or any decision made based on information presented on the Service.`,
    },
    {
      heading: '4. Disputes Between Users and Host Clubs',
      body: `OshiHos shall have no involvement, responsibility, or liability whatsoever in any dispute, disagreement, claim, or controversy arising between you and any host club, host, or any third party encountered through or in connection with the Service. Any such dispute must be resolved solely between the parties involved. You agree to indemnify and hold harmless OshiHos, its operators, affiliates, and representatives from any claims, damages, losses, or expenses arising from such disputes.`,
    },
    {
      heading: '5. Accuracy of Information',
      body: `While OshiHos strives to provide accurate and up-to-date information, all content on the Service — including but not limited to host profiles, rankings, ratings, photographs, and descriptions — is provided "as is" without warranty of any kind. OshiHos does not guarantee the accuracy, completeness, reliability, or timeliness of any information on the Service.\n\nHost profiles, rankings, and other data may change without notice. OshiHos is not obligated to update or correct any information.`,
    },
    {
      heading: '6. Limitation of Liability',
      body: `To the maximum extent permitted by applicable law, OshiHos, its operators, affiliates, licensors, and service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, resulting from:\n\n(a) Your access to or use of (or inability to access or use) the Service;\n(b) Any conduct or content of any third party on the Service;\n(c) Any content obtained from the Service;\n(d) Any decision made in reliance on information provided by the Service;\n(e) Any interaction with host clubs or hosts, whether facilitated by information on the Service or otherwise.\n\nIn no event shall OshiHos's total aggregate liability exceed the amount you paid to OshiHos, if any, in the twelve (12) months preceding the claim, or one hundred U.S. dollars (USD $100), whichever is greater.`,
    },
    {
      heading: '7. Indemnification',
      body: `You agree to defend, indemnify, and hold harmless OshiHos, its operators, affiliates, licensors, and service providers from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including but not limited to attorney's fees) arising from:\n\n(a) Your use of the Service;\n(b) Your violation of these Terms;\n(c) Your violation of any third-party right, including intellectual property, privacy, or other proprietary rights;\n(d) Your interaction with any host club or host;\n(e) Any activity arising from your use of the Service.`,
    },
    {
      heading: '8. Age Restriction',
      body: `The Service is intended for users who are at least twenty (20) years of age, in accordance with the legal drinking age in Japan. By using the Service, you represent and warrant that you are at least 20 years old. OshiHos does not knowingly collect information from minors. If we become aware that a minor has provided us with personal information, we will take steps to delete such information promptly.`,
    },
    {
      heading: '9. Prohibited Conduct',
      body: `You agree not to:\n\n• Use the Service for any unlawful purpose or in violation of any applicable laws or regulations;\n• Harass, threaten, intimidate, or cause distress to any host, host club employee, or other user;\n• Post false, misleading, defamatory, or infringing content;\n• Attempt to gain unauthorized access to the Service or its related systems;\n• Use automated systems (bots, scrapers) to access the Service without written permission;\n• Impersonate any person or entity, or misrepresent your affiliation with any person or entity.`,
    },
    {
      heading: '10. Intellectual Property',
      body: `All content on the Service, including but not limited to text, graphics, logos, icons, images, data compilations, and software, is the property of OshiHos or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from the Service without prior written consent from OshiHos.`,
    },
    {
      heading: '11. Governing Law and Jurisdiction',
      body: `These Terms shall be governed by and construed in accordance with the laws of Japan, without regard to conflict of law principles. Any dispute arising under these Terms shall be submitted to the exclusive jurisdiction of the Tokyo District Court, Tokyo, Japan.\n\nIf you are accessing the Service from outside Japan, you do so voluntarily and are responsible for compliance with local laws.`,
    },
    {
      heading: '12. Severability',
      body: `If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.`,
    },
    {
      heading: '13. Entire Agreement',
      body: `These Terms constitute the entire agreement between you and OshiHos regarding the use of the Service and supersede all prior and contemporaneous agreements, understandings, negotiations, and discussions, whether oral or written, relating to the subject matter herein.`,
    },
    {
      heading: '14. Contact',
      body: `For any questions regarding these Terms of Service, please contact us through the official OshiHos support channels.`,
    },
  ],
};

const ja = {
  back: 'トップに戻る',
  title: '利用規約',
  lastUpdated: '最終更新日: 2026年1月',
  sections: [
    {
      heading: '1. 規約への同意',
      body: `OshiHos（以下「本サービス」）にアクセスまたは利用することにより、あなたは本利用規約のすべての条件に拘束されることに同意するものとします。以下のすべての条件に同意しない場合は、本サービスにアクセスまたは利用してはなりません。OshiHosは、事前の通知なくいつでも本規約を変更する権利を有します。変更後の本サービスの継続利用は、変更後の規約の同意を構成します。`,
    },
    {
      heading: '2. 本サービスの性質',
      body: `OshiHosは、東京都新宿区歌舞伎町のホストクラブ文化に関する文化的・教育的・情報提供目的のコンテンツを提供する独立したデジタル情報プラットフォームです。本サービスは、この文化現象の理解促進を目的としています。\n\nOshiHosは、いかなるホストクラブも運営・管理・経営していません。本サービスは、ホストクラブへの訪問の仲介、あっ旋、取次ぎ、またはユーザーとホストクラブまたはホスト間のあらゆる取引の仲介を行うものではありません。OshiHosは、本サービスに掲載されているいかなるホストクラブまたはホストとも代理関係にありません。`,
    },
    {
      heading: '3. リスクの自負およびユーザーの責任',
      body: `ホストクラブへの訪問、ホストとのやり取り、またはホストクラブ文化に関連するいかなる活動への参加に関する判断は、すべて你自己の責任およびsole discretion（単独の判断）で行われるものとします。OshiHosは、すべてのユーザーに対し、以下の事項を強く推奨します：\n\n• 訪問前にすべての情報を独立して確認すること。\n• 適用されるすべての法令・規則を遵守すること。\n• 常に合理的な注意と個人の判断を行使すること。\n• 必要に応じて独立した法的・専門的助言を-seekingすること。\n\nあなたは、本サービス上の情報に基づいて行われた訪問、ホストとのやり取り、または判断により生じた、身体的・金銭的・感情的を問わずあらゆる損害・損害・怪我・害悪について、OshiHosは責任を負わないことを認め、同意するものとします。`,
    },
    {
      heading: '4. ユーザーとホストクラブ間のトラブル',
      body: `OshiHosは、本サービスを通じてまたはこれに関連して発生した、ユーザーとホストクラブ、ホスト、または第三者との間の紛争、不同意、請求、または紹争について、一切の関与、責任、または責任を負わないものとします。そのような紛争は、関係当事者間のみで解決するものとします。あなたは、そのような紛争から生じるすべての請求、損害、損失、または費用からOshiHos、その運営者、関連会社、および代表者を免責し、補償することに同意するものとします。`,
    },
    {
      heading: '5. 情報の正確性',
      body: `OshiHosは正確で最新の情報の提供に努めていますが、本サービス上のすべてのコンテンツ（ホストプロフィール、ランキング、評価、写真、説明を含むがこれらに限定されないもの）は、いかなる種類の保証もなしに「現況有姿」で提供されるものです。OshiHosは、本サービス上の情報の正確性、完全性、信頼性、適時性を保証するものではありません。\n\nホストプロフィール、ランキング、その他のデータは、通知なく変更される場合があります。OshiHosは、いかなる情報の更新または修正義務も負いません。`,
    },
    {
      heading: '6. 責任の制限',
      body: `適用法が許容する最大限の範囲で、OshiHos、その運営者、関連会社、ライセンサー、およびサービスプロバイダーは、間接的、付随的、特別、結果的、または懲罰的損害（利益の損失、データ、商標その他の無形の損失を含むがこれらに限定されないもの）について、以下を理由とする場合を問わず責任を負いません：\n\n(a) 本サービスへのアクセスまたは利用（またはアクセスまたは利用の不能）;\n(b) 本サービス上の第三者の行為またはコンテンツ;\n(c) 本サービスから取得されたコンテンツ;\n(d) 本サービスの情報に依拠して行われた判断;\n(e) ホストクラブまたはホストとのやり取り。\n\nいかなる場合においても、OshiHosの総合的な責任の合計は、請求の12か月前にOshiHosに支払った金額、または100米ドル（USD $100）のいずれか大きい額を上限とします。`,
    },
    {
      heading: '7. 補償',
      body: `あなたは、OshiHos、その運営者、関連会社、ライセンサー、およびサービスプロバイダーを、以下に起因するまたは関連するすべての請求、損害、義務、損失、責任、コスト、および費用（弁護士費用を含むがこれらに限定されないもの）から防御し、補償し、免責することに同意します：\n\n(a) 本サービスの利用;\n(b) 本規約の違反;\n(c) 知的財産、プライバシー、その他の所有権を含む第三者の権利の侵害;\n(d) ホストクラブまたはホストとのやり取り;\n(e) 本サービスの利用から生じる活動。`,
    },
    {
      heading: '8. 年齢制限',
      body: `本サービスは、日本における飲酒可能年齢に準拠し、20歳以上のユーザーを対象としています。本サービスを利用することで、あなたは満20歳以上であることを表明し、保証するものとします。OshiHosは、未成年者から個人情報を故意に収集することはありません。未成年者が個人情報を提供したことが判明した場合、当該情報は速やかに削除されます。`,
    },
    {
      heading: '9. 禁止事項',
      body: `ユーザーは以下の行為を行ってはなりません：\n\n• 違法な目的で本サービスを利用すること、または適用法令・規則に違反すること;\n• ホスト、ホストクラブの従業員、または他のユーザーをハラス、脅迫、威圧、または苦痛を与えること;\n• 虚偽、誤解を招く、中傷的、または権利侵害となるコンテンツを投稿すること;\n• 本サービスまたはその関連システムへの不正アクセスを試みること;\n• 書面による許可なく自動化システム（ボット、スクレイパー等）を使用して本サービスにアクセスすること;\n• いかなる人物または法人を装い、または虚偽の表明を行うこと。`,
    },
    {
      heading: '10. 知的財産',
      body: `本サービス上のすべてのコンテンツ（テキスト、グラフィック、ロゴ、アイコン、画像、データコンピレーション、ソフトウェアを含むがこれらに限定されないもの）は、OshiHosまたはそのコンテンツ提供者の所有であり、適用される知的財産法によって保護されています。OshiHosの事前の書面同意なく、本サービスのコンテンツを複製、頒布、変更、二次的著作物の作成、公衆送信、または搾取することはできません。`,
    },
    {
      heading: '11. 準拠法および裁判管轄',
      body: `本規約は、準拠法の原則の衝突を問わず、日本法に準拠し、これに従って解釈されます。本規約に基づく紛争は、東京地方裁判所の専属的裁判管轄に服します。\n\n日本国外から本サービスにアクセスしている場合、それは任意のものであり、現地法令の遵守についてユーザーの責任となります。`,
    },
    {
      heading: '12. 分離可能性',
      body: `本規約のいずれかの条項が、管轄権を有する裁判所によって無効、違法、または執行不能と判断された場合、その他の条項は完全に有効であり続けます。無効または執行不能な条項は、その本来の目的を維持しつつ、有効かつ執行可能にするために必要な最小限の範囲で修正されます。`,
    },
    {
      heading: '13. 完全合意',
      body: `本規約は、本サービスの利用に関するOshiHosとユーザー間の完全な合意を構成し、口頭または書面を問わず、本件の主題に関連するすべての以前および同時の合意、了解、交渉、および議論に代わります。`,
    },
    {
      heading: '14. お問い合わせ',
      body: `本利用規約に関するご質問は、OshiHosの公式サポートチャネルにお問い合わせください。`,
    },
  ],
};

export default function TermsPage() {
  const { language } = useLanguage();
  const content = language === 'ja' ? ja : en;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-accent transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {content.back}
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-foreground mb-2">
          {content.title}
        </h1>
        <p className="text-xs text-zinc-500 mb-10">{content.lastUpdated}</p>

        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-base sm:text-lg font-bold font-serif text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
