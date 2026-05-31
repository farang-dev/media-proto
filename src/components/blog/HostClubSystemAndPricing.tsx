import React from 'react';

export default function HostClubSystemAndPricing() {
  return (
    <>
      <p>
        "How much does a host club actually cost?" — This is the #1 question from first-time visitors.
        The answer is simpler than you think once you understand the system.
      </p>
      <p>
        Host club pricing consists of <strong>five core components</strong>. Once you know them,
        you can calculate the cost of any visit before you walk in the door.
      </p>

      <hr />

      <h2>The Five Elements of Host Club Pricing</h2>

      <h3>1. Set Fee (セット料金 / Setto Ryokin)</h3>
      <p>
        This is the base charge for sitting at the club. Think of it as "table charge" or "cover
        charge." It typically includes a house bottle (whisky or shochu) and mixers for 60–90
        minutes. <strong>First-time sets are heavily discounted:</strong> ¥1,000–¥3,000 instead
of the regular ¥5,000–¥10,000.
      </p>

      <h3>2. Nomination Fee (指名料 / Shimei Ryokin)</h3>
      <p>
        When you ask for a specific host by name, you pay a nomination fee. There are two types:
      </p>
      <ul>
        <li><strong>Photo nomination (写真指名 / shashin shimei):</strong> Choosing from photos on
        your first visit. Usually free or included in the first-time set.</li>
        <li><strong>Regular nomination (本指名 / hon shimei):</strong> Calling a specific host you
        already know. Costs ¥1,000–¥3,000 per visit.</li>
        <li><strong>In-house nomination (場内指名 / jonai shimei):</strong> On the spot, during your
        visit. Costs ¥500–¥2,000.</li>
      </ul>

      <h3>3. Drinks (ドリンク代 / Dorinku Dai)</h3>
      <p>
        Your own drinks and drinks for your host are separate line items. This is where costs can
        escalate if you are not careful:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Typical Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Soft drink (yourself)</td>
              <td>¥500–¥1,000</td>
            </tr>
            <tr>
              <td>Cocktail (yourself)</td>
              <td>¥1,500–¥3,000</td>
            </tr>
            <tr>
              <td>Host drink (キャストドリンク / kyasuto dorinku)</td>
              <td>¥1,000–¥3,000 per glass</td>
            </tr>
            <tr>
              <td>Champagne (Moët & Chandon)</td>
              <td>¥50,000–¥150,000</td>
            </tr>
            <tr>
              <td>Champagne (Dom Pérignon)</td>
              <td>¥30,000–¥150,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tip-box">
        <p><strong>Pro tip:</strong> On your first visit, choose a <strong>飲み飲ませ放題</strong>
        (nomu-nomase hodai / all-you-can-drink for you + host) plan. This caps your drink costs
        at zero additional charge.</p>
      </div>

      <h3>4. Tax & Service Charge (税サ / Zei-Sa)</h3>
      <p>
        This is the most commonly overlooked cost. In Kabukicho, expect approximately <strong>35%
        on top of your subtotal</strong> — broken down as roughly 25% service charge + 10% consumption
        tax. This applies to <em>every</em> visit, including first-time packages.
      </p>
      <p>
        <strong>Formula:</strong> Total bill = (set fee + nomination + drinks) × 1.35
      </p>

      <h3>5. Extension Fee (延長料金 / Encho Ryokin)</h3>
      <p>
        Going over your set time triggers an extension charge: roughly <strong>¥2,000–¥5,000 per
        30 minutes</strong>. Extensions are optional. Politely declining is normal and accepted.
      </p>

      <hr />

      <h2>Sample Calculations (Real Numbers)</h2>

      <h3>First Visit (Budget-Friendly)</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Item</th><th>Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>First-time set (90 min, nomu-nomase)</td><td>¥3,000</td></tr>
            <tr><td>Tax & service charge (35%)</td><td>¥1,050</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>¥4,050</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>Yes — you can experience a host club for about the price of a movie ticket and popcorn in Tokyo.</p>

      <h3>Regular Visit (2nd+ Time, Standard)</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Item</th><th>Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>Set fee (90 min)</td><td>¥5,000</td></tr>
            <tr><td>Regular nomination (本指名)</td><td>¥2,500</td></tr>
            <tr><td>Your drinks (2 cocktails)</td><td>¥3,000</td></tr>
            <tr><td>Host drinks (2 glasses)</td><td>¥3,000</td></tr>
            <tr><td>Subtotal</td><td>¥13,500</td></tr>
            <tr><td>Tax & service charge (35%)</td><td>¥4,725</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>¥18,225</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h3>Champagne Night</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Item</th><th>Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>Set fee + nomination + drinks</td><td>¥12,000</td></tr>
            <tr><td>Moët & Chandon (1 bottle)</td><td>¥80,000</td></tr>
            <tr><td>Subtotal</td><td>¥92,000</td></tr>
            <tr><td>Tax & service charge (35%)</td><td>¥32,200</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>¥124,200</strong></td></tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>Monthly Budget Guide</h2>
      <p>
        How much do regular customers actually spend? Here are real-world monthly scenarios based on
        the type of customer:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Type</th><th>Monthly Spend</th><th>Frequency</th><th>What You Get</th></tr>
          </thead>
          <tbody>
            <tr><td>Light regular</td><td>¥20,000–¥30,000</td><td>1–2 visits</td><td>Set + nomination + basic drinks</td></tr>
            <tr><td>Standard regular</td><td>¥50,000</td><td>2–3 visits</td><td>Set + nom + host drinks included</td></tr>
            <tr><td>Mid-tier regular</td><td>¥100,000</td><td>3–4 visits + 1 champagne</td><td>Standard + monthly Moët</td></tr>
            <tr><td>High spender</td><td>¥300,000+</td><td>4–5 visits + premium champagne</td><td>Dom Pérignon, Armand, VIP treatment</td></tr>
          </tbody>
        </table>
      </div>
      <div className="warning-box">
        <p><strong>Golden rule:</strong> Never spend more than 5–10% of your monthly take-home
        income on host clubs. The experience is meant to be fun — not financially stressful.</p>
      </div>

      <h2>The 2025 Law Reform & What Changed</h2>
      <p>
        The revised風営法 (Fueiho / Amusement Business Law) took effect on June 28, 2025. Key changes
        affecting pricing:
      </p>
      <ul>
        <li><strong>Price transparency is now mandatory:</strong> Clubs must clearly display prices
        before service begins. Hidden charges are illegal.</li>
        <li><strong>Tab/credit selling (売掛 / urikake) is restricted:</strong> Aggressive pushing of
        "pay later" schemes is now illegal. Most major groups abolished it entirely.</li>
        <li><strong>Emotional exploitation is prohibited:</strong> Using romantic feelings to pressure
        customers into spending is now a regulatory violation.</li>
        <li><strong>First enforcement (Feb 2026):</strong> Two Kabukicho clubs received Japan's first
        administrative orders for violating these rules. <strong>Host clubs are now safer than ever.</strong></li>
      </ul>

      <h2>How to Avoid Surprise Bills</h2>
      <ol>
        <li><strong>Always confirm pricing before entering.</strong> A legitimate club will tell you
        their first-time set price and tax rate upfront.</li>
        <li><strong>Choose "nomu-nomase hodai" for your first visit.</strong> This caps your drink
        expenses at zero additional cost.</li>
        <li><strong>Ask about the service charge.</strong> "サービス料は何パーセントですか？" (What percent
        is the service charge?)</li>
        <li><strong>Set a budget limit and tell your host.</strong> "今日は〇〇円まででお願いします" (Please
        keep it under ¥XX for today). Professional hosts respect this completely.</li>
        <li><strong>Skip street touts entirely.</strong> They never lead to the best deal.</li>
      </ol>

      <h2>Payment Methods</h2>
      <ul>
        <li><strong>Cash:</strong> Accepted everywhere. There are 24-hour ATMs throughout Kabukicho.</li>
        <li><strong>Credit card:</strong> Most clubs accept Visa, Mastercard, JCB, Amex. Some may charge
        a 5–10% convenience fee on card payments.</li>
        <li><strong>PayPay / QR:</strong> Becoming more common but still not universal.</li>
        <li><strong>Tab (売掛):</strong> Being phased out. Avoid if offered on your first visit.</li>
      </ul>

      <p>
        For a deeper dive into pricing, read our <a href="/blog/faq-about-host-clubs">FAQ</a> or check
        the <a href="/blog/host-club-guide-for-foreigners">complete beginner guide</a>.
      </p>
    </>
  );
}
