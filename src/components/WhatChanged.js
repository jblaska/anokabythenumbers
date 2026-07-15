const WhatChanged = {
  data() {
    return {
      latestYear: null,
      priorYear: null,
      increases: [],
      decreases: [],
      newItems: []
    };
  },
  mounted() {
    this.calculate();
  },
  methods: {
    fmt(amount, compact) { return DataLoader.formatCurrency(amount, compact); },
    fmtPct(pct) { return DataLoader.formatPct(pct); },

    calculate() {
      this.latestYear = DataLoader.getLatestYear();
      this.priorYear = DataLoader.getPriorYear();

      const currentRows = DataLoader.data.filter(r => r.Year === this.latestYear && r.Type === 'Expenditure');
      const priorRows = DataLoader.data.filter(r => r.Year === this.priorYear && r.Type === 'Expenditure');

      const changes = [];
      const newOnes = [];

      currentRows.forEach(row => {
        const priorRow = priorRows.find(p =>
          p.Fund === row.Fund && p.Department === row.Department &&
          p.Category === row.Category && p.Description === row.Description
        );
        if (!priorRow) {
          newOnes.push(row);
        } else if (priorRow.Amount > 0) {
          const change = row.Amount - priorRow.Amount;
          const pct = (change / priorRow.Amount) * 100;
          if (Math.abs(change) > 500) {
            changes.push({
              fund: row.Fund,
              department: row.Department,
              description: row.Description,
              currentAmt: row.Amount,
              priorAmt: priorRow.Amount,
              change,
              pct,
              notes: row.Notes
            });
          }
        }
      });

      this.increases = changes.filter(c => c.change > 0).sort((a, b) => b.change - a.change).slice(0, 10);
      this.decreases = changes.filter(c => c.change < 0).sort((a, b) => a.change - b.change).slice(0, 10);
      this.newItems = newOnes.sort((a, b) => b.Amount - a.Amount).slice(0, 10);
    }
  },
  template: `
    <div>
      <div class="card">
        <h2>What Changed: {{ priorYear }} → {{ latestYear }}</h2>
        <p class="narrative">
          A direct comparison of this year's budget against last year — showing where spending
          grew, where it shrank, and what's brand new.
        </p>
      </div>

      <div class="card">
        <h3 style="color: var(--maroon);">📈 Increases</h3>
        <div v-for="c in increases" :key="c.fund + c.department + c.description" class="line-item">
          <div>
            <div class="item-name">{{ c.description }}</div>
            <div class="item-desc">{{ c.fund }} — {{ c.department }}<span v-if="c.notes"> — {{ c.notes }}</span></div>
          </div>
          <div class="item-amount">
            <div class="current change up">+{{ fmt(c.change, true) }}</div>
            <div class="change up">{{ fmtPct(c.pct) }}</div>
          </div>
        </div>
        <p v-if="increases.length === 0" class="narrative">No significant increases found.</p>
      </div>

      <div class="card">
        <h3 style="color: var(--success-green);">📉 Decreases</h3>
        <div v-for="c in decreases" :key="c.fund + c.department + c.description" class="line-item">
          <div>
            <div class="item-name">{{ c.description }}</div>
            <div class="item-desc">{{ c.fund }} — {{ c.department }}<span v-if="c.notes"> — {{ c.notes }}</span></div>
          </div>
          <div class="item-amount">
            <div class="current change down">{{ fmt(c.change, true) }}</div>
            <div class="change down">{{ fmtPct(c.pct) }}</div>
          </div>
        </div>
        <p v-if="decreases.length === 0" class="narrative">No significant decreases found.</p>
      </div>

      <div class="card">
        <h3>🆕 New This Year</h3>
        <div v-for="n in newItems" :key="n.Fund + n.Department + n.Description" class="line-item">
          <div>
            <div class="item-name">{{ n.Description }}</div>
            <div class="item-desc">{{ n.Fund }} — {{ n.Department }}<span v-if="n.Notes"> — {{ n.Notes }}</span></div>
          </div>
          <div class="item-amount">
            <div class="current">{{ fmt(n.Amount) }}</div>
          </div>
        </div>
        <p v-if="newItems.length === 0" class="narrative">No new line items found.</p>
      </div>
    </div>
  `
};
