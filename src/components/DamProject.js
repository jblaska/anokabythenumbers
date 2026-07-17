const DamProject = {
  template: `
    <div>
      <div class="status-box">
        <div class="as-of">Status as of July 2026</div>
        <div class="status-grid">
          <div><span class="label">Project stage:</span> Preliminary design, public engagement, environmental review</div>
          <div><span class="label">Lawsuit:</span> Unresolved — no ruling issued</div>
          <div><span class="label">Funding secured:</span> ~$9.6M (state)</div>
          <div><span class="label">Funding requested:</span> ~$22.6M (state bonding)</div>
          <div class="full-width"><span class="label">Next public step:</span> [Live survey link] · [Next Council/EDC meeting date]</div>
        </div>
      </div>

      <div class="confidence-legend">
        <div class="item"><span class="dot" style="background:#2E7D32"></span> Confirmed — official/primary source</div>
        <div class="item"><span class="dot" style="background:#1565C0"></span> Estimate — stated range/margin</div>
        <div class="item"><span class="dot" style="background:#C62828"></span> Contested — disputed / in litigation</div>
        <div class="item"><span class="dot" style="background:#6A1B9A"></span> Projection — forecast, attributed to source</div>
        <div class="item"><span class="dot" style="background:#757575"></span> Not public — unknown, not zero</div>
      </div>

      <!-- MODULE 1: HEADLINE -->
      <div class="card">
        <h2>The Headline Number</h2>
        <div class="headline-number">~$51 million</div>
        <div class="headline-sub">Estimated total cost of the full project (city's current figure) &nbsp; <span class="tag tag-estimate">ESTIMATE</span></div>
        <div class="caveat-box">
          <strong>Why the numbers differ:</strong> The 2025 engineering feasibility study priced construction
          work at $36.99M (2024 dollars), with a stated AACE Class 4 accuracy range of $25.9M–$55.48M
          (-30% / +50%). Public documents don't publish a line-by-line reconciliation between that figure
          and the city's current ~$51M number — the difference is consistent with design/soft costs,
          escalation to the 2028–2030 build window, and contingency. No single number here should be read
          as final or settled.
        </div>
      </div>

      <!-- MODULE 2: FUNDING STACK -->
      <div class="card">
        <h2>Where the Money Comes From</h2>
        <div class="stack-bar">
          <div class="stack-seg" style="width:19%; background:#2E7D32;">$9.6M</div>
          <div class="stack-seg" style="width:12%; background:#C62828;">$6.2M</div>
          <div class="stack-seg" style="width:44%; background:#1565C0;">~$22.6M</div>
          <div class="stack-seg" style="width:25%; background:#757575;">Not yet identified</div>
        </div>
        <table class="data-table">
          <tr><th>Segment</th><th>Amount</th><th>Status</th><th>Note</th></tr>
          <tr><td><strong>Secured — state</strong></td><td>~$9.6M</td><td><span class="tag tag-confirmed">CONFIRMED</span></td><td>Already awarded, essentially all state money</td></tr>
          <tr class="indent"><td>2025 state appropriations</td><td>$6.5M</td><td><span class="tag tag-confirmed">CONFIRMED</span></td><td>Two 2025 appropriations</td></tr>
          <tr class="indent"><td>LCCMR / ENRTF grant</td><td>$3.1M</td><td><span class="tag tag-confirmed">CONFIRMED</span></td><td>State trust fund grant (design)</td></tr>
          <tr><td><strong>Contested — county funds</strong></td><td>$6.2M</td><td><span class="tag tag-contested">CONTESTED</span></td><td>Redirected from county transportation money; in litigation — see Module 5</td></tr>
          <tr><td><strong>Requested — state bonding</strong></td><td>~$22.6M</td><td><span class="tag tag-estimate">ESTIMATE</span></td><td>Additional bonding the city is requesting</td></tr>
          <tr><td><strong>Pursuing — federal &amp; other</strong></td><td>Not yet quantified</td><td><span class="tag tag-unknown">NOT PUBLIC</span></td><td>Grants/partnerships the city says it's pursuing</td></tr>
          <tr><td><strong>Not yet identified</strong></td><td>Remainder to ~$51M</td><td><span class="tag tag-unknown">NOT PUBLIC</span></td><td>Approximate; segments are from different dates and may overlap</td></tr>
        </table>
      </div>

      <!-- MODULE 3: WHO PAYS -->
      <div class="card">
        <h2>Who Pays</h2>
        <table class="data-table">
          <tr><th>Payer</th><th>Known Commitment</th><th>Status</th></tr>
          <tr><td>State of Minnesota</td><td>~$9.6M secured + ~$22.6M requested</td><td><span class="tag tag-confirmed">CONFIRMED</span> <span class="tag tag-estimate">ESTIMATE</span></td></tr>
          <tr><td>Anoka County</td><td>$6.2M (contested)</td><td><span class="tag tag-contested">CONTESTED</span></td></tr>
          <tr><td>Federal government</td><td>None confirmed</td><td><span class="tag tag-unknown">NOT PUBLIC</span></td></tr>
          <tr><td>City of Anoka (residents)</td><td>Not yet quantified</td><td><span class="tag tag-unknown">NOT PUBLIC</span></td></tr>
        </table>
        <div class="narrative" style="margin-top:1rem;">
          <strong>The honest bottom line:</strong> As of now, the plan is to fund the project largely with
          outside (state/federal/grant) dollars, and no direct cost to Anoka residents has been announced.
          That is not the same as free to residents — grant match requirements (often 10–50%), any cost
          overruns, and long-term operation &amp; maintenance of the new features typically fall to the
          city, and those figures are not public.
        </div>
      </div>

      <!-- MODULE 4: COST BY COMPONENT (DAM PROJECT ONLY) -->
      <div class="card">
        <h2>What the Dam Project Buys</h2>
        <div class="narrative">What each part of the <strong>dam improvement project itself</strong> is
          estimated to cost, in 2024 dollars, from the feasibility report's cost table. The pedestrian
          bridge is priced separately below — it shares a site plan with the dam but now runs on a
          different funding and approval track. Of what's below, dam-safety and operations work is a
          minority; the recreation channel, lock, and trails make up most of it.</div>

        <div class="dam-bar-row"><div class="dam-bar-label">Recreation Channel*</div><div class="dam-bar-track"><div class="dam-bar-fill amenity" style="width:100%">$3,856,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Recreation Vessel Lock (incl. gates)</div><div class="dam-bar-track"><div class="dam-bar-fill amenity" style="width:80%">$3,080,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Trails &amp; Urban Design Elements</div><div class="dam-bar-track"><div class="dam-bar-fill amenity" style="width:57%">$2,200,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Care of Water (river diversion)</div><div class="dam-bar-track"><div class="dam-bar-fill" style="width:45%">$1,734,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Crest Gates + Gate Systems</div><div class="dam-bar-track"><div class="dam-bar-fill" style="width:40%">$1,558,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Sediment Removal</div><div class="dam-bar-track"><div class="dam-bar-fill" style="width:10%">$387,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Control Buildings</div><div class="dam-bar-track"><div class="dam-bar-fill" style="width:10%">$369,000</div></div></div>
        <div class="dam-bar-row"><div class="dam-bar-label">Access</div><div class="dam-bar-track"><div class="dam-bar-fill" style="width:5%">$205,000</div></div></div>

        <div class="chip-row">
          <div class="chip"><span class="sw" style="background:var(--maroon);"></span> Dam safety &amp; operations</div>
          <div class="chip"><span class="sw" style="background:var(--yellow);"></span> Recreation amenities (channel, lock, trails)</div>
        </div>
        <div class="narrative" style="margin-top:0.75rem; font-size:0.8rem;">
          *<strong>Recreation Channel</strong> is the feasibility report's whitewater/recreation feature
          line item — this is commonly referred to as "the surfing feature." Figure combines the report's
          "River Surfing Feature" line ($3,653,000) and owner-procured Rapid Blocks ($203,000). "Recreation
          Vessel Lock" and "Crest Gates" similarly combine base construction cost with owner-procured
          equipment lines from the same table.
        </div>
        <div class="narrative" style="margin-top:0.5rem; font-size:0.8rem;">
          These are Class 4 estimate line items from the feasibility report's cost table (2024 dollars) and
          predate contractor markups and contingency — which is why they don't sum to the project total.
          All tagged <span class="tag tag-estimate">ESTIMATE</span>.
        </div>
      </div>

      <!-- MODULE 5: THE PEDESTRIAN BRIDGE -->
      <div class="card callout-note">
        <h2>The Pedestrian Bridge (Related, But a Separate Project)</h2>
        <div class="narrative">
          The pedestrian bridge appears in the same feasibility report and shares a site plan with the dam
          project — engineers even studied whether its piers could land on the existing dam structure
          (they can't; it needs its own foundation). But <strong>the bridge is not the dam project.</strong>
          It now runs on its own funding path and its own approval process, and it is the specific subject
          of an ongoing lawsuit. This is where a lot of public confusion happens — the two get talked about
          as one project when, as of today, they aren't funded or decided the same way.
        </div>

        <table class="data-table">
          <tr><th>Item</th><th>Figure</th><th>Status</th></tr>
          <tr><td>Estimated cost (2024 $)</td><td>$7,300,000</td><td><span class="tag tag-estimate">ESTIMATE</span></td></tr>
          <tr><td>Funding source</td><td>County transportation sales tax (0.75%, est. 2023)</td><td><span class="tag tag-confirmed">CONFIRMED</span></td></tr>
          <tr><td>Amount in dispute</td><td>$6.2M</td><td><span class="tag tag-contested">CONTESTED</span></td></tr>
          <tr class="indent"><td>— scheduled 2026</td><td>$4.9M</td><td><span class="tag tag-contested">CONTESTED</span></td></tr>
          <tr class="indent"><td>— scheduled 2027</td><td>$1.3M</td><td><span class="tag tag-contested">CONTESTED</span></td></tr>
          <tr><td>Status</td><td>Unresolved; no ruling as of mid-2026</td><td><span class="tag tag-confirmed">CONFIRMED</span></td></tr>
        </table>

        <div class="narrative" style="margin-top:1rem;">
          <strong>What the lawsuit is about:</strong> the $6.2M is county transportation money that the
          Legislature redirected to the city to help pay for the bridge. Anoka County is suing to stop that
          transfer. No ruling has been issued. Because the bridge shares a history and a site with the dam
          project, the two are easy to conflate — but they are funded, approved, and currently litigated
          on separate tracks.
        </div>
      </div>

      <!-- MODULE 6: DAM FACTS -->
      <div class="card">
        <h2>The Dam Itself, By the Numbers</h2>
        <div class="fact-grid">
          <div class="fact-row"><span class="fact-label">Current structure built</span><span class="fact-value">1969</span></div>
          <div class="fact-row"><span class="fact-label">Dam on this site since</span><span class="fact-value">~1850s</span></div>
          <div class="fact-row"><span class="fact-label">Recreational pool created</span><span class="fact-value">1891</span></div>
          <div class="fact-row"><span class="fact-label">City became sole owner</span><span class="fact-value">~1935</span></div>
          <div class="fact-row"><span class="fact-label">Overflow spillway length</span><span class="fact-value">236 feet</span></div>
          <div class="fact-row"><span class="fact-label">Total drop across dam</span><span class="fact-value">~12 feet</span></div>
          <div class="fact-row"><span class="fact-label">Flashboards raise pool by</span><span class="fact-value">~3 feet</span></div>
          <div class="fact-row"><span class="fact-label">Pool length upstream</span><span class="fact-value">~6 miles</span></div>
          <div class="fact-row"><span class="fact-label">Hazard classification</span><span class="fact-value">Class III (low), NID</span></div>
          <div class="fact-row"><span class="fact-label">2023 inspection items</span><span class="fact-value">8 total (2 high priority)</span></div>
          <div class="fact-row"><span class="fact-label">Navigation lock capacity</span><span class="fact-value">2 pontoons / ~15 min</span></div>
        </div>
        <div style="margin-top:0.75rem;"><span class="tag tag-confirmed">CONFIRMED</span> <span style="font-size:0.78rem; color:#555;">&nbsp;All figures in this module</span></div>
      </div>

      <!-- MODULE 7: TIMELINE -->
      <div class="card">
        <h2>Timeline</h2>
        <div class="dam-timeline">
          <div class="tl-item"><div class="tl-date">Oct 2021</div><div class="tl-desc">Council first asks staff to study upgrades</div></div>
          <div class="tl-item"><div class="tl-date">May 2023</div><div class="tl-desc">$500,000 state grant funds the feasibility study</div></div>
          <div class="tl-item"><div class="tl-date">Jan 2024</div><div class="tl-desc">Council awards the feasibility contract (HDR)</div></div>
          <div class="tl-item"><div class="tl-date">July 29, 2024</div><div class="tl-desc">Council selects features; hydropower dropped</div></div>
          <div class="tl-item"><div class="tl-date">March 12, 2025</div><div class="tl-desc">Feasibility report completed</div></div>
          <div class="tl-item"><div class="tl-date">Oct 2025</div><div class="tl-desc">Legislative bonding tour; county files lawsuit</div></div>
          <div class="tl-item"><div class="tl-date">2028 (target)</div><div class="tl-desc">Construction could begin</div></div>
          <div class="tl-item"><div class="tl-date">~2030 (target)</div><div class="tl-desc">Substantial completion</div></div>
        </div>
      </div>

      <div class="card">
        <h3>Sources &amp; Methodology</h3>
        <p class="narrative" style="font-size:0.8rem;">
          Every figure on this page is tagged by confidence (see legend above) rather than presented as a
          single settled number. Confirmed figures come from official records or the feasibility report
          itself; estimates carry the margin the source document states; the contested $6.2M reflects an
          active, unresolved lawsuit and is described by status only, not by which side is right.
          Figures marked "not public" are shown as unknown — never as zero or as an implied dollar amount.
        </p>
        <p class="narrative" style="font-size:0.8rem; margin-top:0.6rem;">
          HDR/Kimley-Horn, <em>Rum River Dam Improvements — Feasibility Report</em>, March 12, 2025 (cost
          table, physical data, features) · City of Anoka LCCMR/ENRTF proposal &amp; work plan 2026-542
          (history, design funding) · ABC Newspapers/Hometown Source (secured funding, bonding request,
          bonding tour) · FOX 9 (component costs) · Star Tribune, KSTP, CBS Minnesota, Bring Me The News
          (lawsuit, contested $6.2M) · Anoka Municipal Utility dam page (spillway/gate dimensions) ·
          National Inventory of Dams (hazard classification).
        </p>
        <p style="font-size:0.78rem; color:#666; margin-top:0.5rem;">
          This page is updated as funding, litigation, or project details change — the status box at top
          reflects the date of the most recent update. This is an independent civic project and is not an
          official City of Anoka page.
        </p>
      </div>
    </div>
  `
};
