import React from 'react';

export default function ShimeiNominationGuide() {
  return (
    <>
      <p>
        One of the most important concepts to understand at a Japanese host club is{" "}
        <strong>shimei</strong> (指名 / nomination). How you nominate your host determines not only
        the cost of your visit but also the quality of attention you receive. There are five distinct
        nomination types, each with its own purpose and etiquette.
      </p>

      <hr />

      <h2>The 5 Types of Shimei</h2>

      <h3>1. Photo Nomination (写真指名 / Shashin Shimei)</h3>
      <p>
        On your first visit, you do not know any hosts yet. The club will present you with a photo
        board or tablet showing all available hosts. Choosing from these photos is called a{" "}
        <strong>photo nomination</strong> (写真指名).
      </p>
      <ul>
        <li><strong>Cost:</strong> Usually free or included in the first-time set fee</li>
        <li><strong>When to use:</strong> Always on your first visit to any club</li>
        <li><strong>Tip:</strong> Take your time looking at photos. Read their profiles — hobbies,
        blood type, zodiac sign. Hosts put effort into these profiles, and commenting on them is
        a great icebreaker</li>
        <li><strong>Strategy:</strong> Pick a host whose vibe matches what you want — the "cool"
        type, the "fun" type, the "conversational" type. The staff can also make recommendations
        based on your preferences</li>
      </ul>

      <h3>2. Direct Nomination (本指名 / Hon Shimei)</h3>
      <p>
        Once you have visited a club and met a host, you can request them by name on return visits.
        This is called <strong>hon shimei</strong> (本指名 / regular nomination).
      </p>
      <ul>
        <li><strong>Cost:</strong> ¥1,000–¥3,000 per visit</li>
        <li><strong>When to use:</strong> On any return visit when you want the same host</li>
        <li><strong>Tip:</strong> Hon shimei tells the host you are serious about building a
        relationship. It directly contributes to their sales ranking</li>
        <li><strong>Strategy:</strong> If you enjoy your first visit, hon shimei on your second
        visit. This signals loyalty and will result in warmer treatment</li>
      </ul>

      <h3>3. Permanent Nomination (永久指名 / Eikyū Shimei)</h3>
      <p>
        Some clubs offer a <strong>permanent nomination</strong> (永久指名) option — a one-time fee
        that designates a specific host as your "main" host forever, eliminating the need to pay
        the nomination fee on each visit.
      </p>
      <ul>
        <li><strong>Cost:</strong> ¥10,000–¥50,000 one-time (varies by club)</li>
        <li><strong>When to use:</strong> When you are certain this is your regular host and club</li>
        <li><strong>Tip:</strong> Ask if the club offers this before paying hon shimei fees for
        months. It can save significant money for regulars</li>
        <li><strong>Warning:</strong> Permanent nominations typically cannot be transferred. If your
        host changes clubs, you may lose the benefit</li>
      </ul>

      <h3>4. Send-off Nomination (送り指名 / Okuri Shimei)</h3>
      <p>
        At the end of your visit, you can request a <strong>send-off nomination</strong> — asking
        your host to escort you out of the club and see you off at the door. This is a small but
        meaningful gesture.
      </p>
      <ul>
        <li><strong>Cost:</strong> ¥500–¥1,000</li>
        <li><strong>When to use:</strong> At the end of any visit as a polite gesture</li>
        <li><strong>Tip:</strong> Send-off nominations are a nice way to end the night. The host
        will walk you to the elevator or street, exchange final pleasantries, and ensure you get
        into a taxi safely</li>
        <li><strong>Etiquette:</strong> Do not use send-off nomination to prolong the evening or
        pressure the host to stay with you outside. It is a brief, professional goodbye</li>
      </ul>

      <h3>5. Nomination Change (指名変更 / Shimei Henkō)</h3>
      <p>
        What if you nominate a host but want to switch to a different one mid-visit? This is called
        a <strong>nomination change</strong> (指名変更).
      </p>
      <ul>
        <li><strong>Cost:</strong> ¥1,000–¥3,000 (the new nomination fee applies)</li>
        <li><strong>When to use:</strong> If your nominated host is busy with another customer for
        too long, or if you want to try conversation with a different host</li>
        <li><strong>Etiquette:</strong> This is a sensitive move. Switching hosts too often can
        signal dissatisfaction. If you do switch, be diplomatic: "I'd also like to talk with
        [new host's name] for a bit"</li>
        <li><strong>Strategy:</strong> On first visits, some customers use nomination changes to
        meet 2–3 hosts and find their preferred match. This is accepted but use it sparingly</li>
      </ul>

      <hr />

      <h2>How to Choose the Right Nomination Style</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Your Situation</th><th>Recommended Nomination</th></tr>
          </thead>
          <tbody>
            <tr><td>First visit, don't know anyone</td><td>Photo nomination (free)</td></tr>
            <tr><td>Returning, liked your host</td><td>Direct nomination (hon shimei)</td></tr>
            <tr><td>Regular customer, same host always</td><td>Permanent nomination (if available)</td></tr>
            <tr><td>Ending the night</td><td>Send-off nomination (okuri shimei)</td></tr>
            <tr><td>Want to try a different host</td><td>Nomination change (use sparingly)</td></tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>Pro Tips for Nominations</h2>
      <ul>
        <li><strong>Your nomination directly affects your host's income.</strong> Hosts' salaries and
        rankings are heavily based on nomination counts. Every hon shimei matters.</li>
        <li><strong>Do not nominate a host you have not spoken to.</strong> Some customers feel
        awkward declining a rotating host and nominate them. This creates confusion. Only nominate
        hosts you genuinely want.</li>
        <li><strong>You can nominate multiple hosts in one visit.</strong> If you are a high-spending
        regular, nominating 2–3 hosts spreads your support. Each nominated host will spend time with
        you.</li>
        <li><strong>Not nominating is okay too.</strong> On slow nights, not nominating means the
        staff will rotate hosts to your table. This is a relaxed way to meet different personalities.</li>
      </ul>

      <p>
        For more on pricing and how nomination fees fit into your total bill, see our{" "}
        <a href="/blog/host-club-system-and-pricing">pricing guide</a>.
      </p>
    </>
  );
}
