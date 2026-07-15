const FundView = {
  data() {
    return {
      funds: [],
      selectedFund: '',
      latestYear: null,
      priorYear: null,
      revenueLines: [],
      expenditureLines: [],
      totalRevenue: 0,
      totalExpenditure: 0
    };
  },
  mounted() {
    this.funds = DataLoader.getFunds();
    this.latestYear = DataLoader.getLatestYear();
    this.priorYear = DataLoader.getPriorYear();
    if (this.funds.length) {
      this.selectedFund = this.funds.includes('General Fund') ? 'General Fund' : this.funds[0];
      this.loadFund();
    }
  },
  methods: {
    fmt(amount, compact) { return DataLoader.formatCurrency(amount, compact); },
    fmtPct(pct) { return DataLoader.formatPct(pct); },

    loadFund() {
      const currentRows = DataLoader.getByFundYear(this.selectedFund, this.latestYear);
      const priorRows = DataLoader.getByFundYear(this.selectedFund, this.priorYear);

      const buildLines = (rows, type) => {
        return rows.filter(r => r.Type === type).map(row => {
          const priorRow = priorRows.find(p =>
            p.Type === type && p.Department === row.Department &&
            p.Category === row.Category && p.Description === row.Description
          );
          const priorAmt = priorRow ? priorRow.Amount : 0;
          const change = row.Amount - priorAmt;
          const pct = priorAmt !== 0 ? (change / priorAmt) * 100 : 0;
          return {
            department: row.Department,
            description: row.Description,
            amount: row.Amount,
            priorAmt,
            change,
            pct,
            notes: row.Notes
          };
        }).sort((a, b) => b.amount - a.amount);
      };

      this.revenueLines = buildLines(currentRows, 'Revenue');
      this.expenditureLines = buildLines(currentRows, 'Expenditure');
      this.totalRevenue = this.revenueLines.reduce((s, r) => s + r.amount, 0);
      this.totalExpenditure = this.expenditureLines.reduce((s, r) => s + r.amount, 0);
    }
  },
  template: `
    <div>
      <div class="card">
        <h2>Fund Breakdown</h2>
        <label for="fund-select" style="display:block; margin-bottom:0.5rem; font-weight:600;">Select a fund:</label>
        <select id="fund-select" v-model="selectedFund" @change="loadFund">
          <option v-for="f in funds" :key="f" :value="f">{{ f }}</option>
        </select>

        <div class="metrics-grid">
          <div class="metric-box">
            <div class="value">{{ fmt(totalRevenue, true) }}</div>
            <div class="label">Total Revenue ({{ latestYear }})</div>
          </div>
          <div class="metric-box">
            <div class="value">{{ fmt(totalExpenditure, true) }}</div>
            <div class="label">Total Spending ({{ latestYear }})</div>
          </div>
          <div class="metric-box" :class="totalRevenue >= totalExpenditure ? 'positive' : ''">
            <div class="value">{{ fmt(totalRevenue - totalExpenditure, true) }}</div>
            <div class="label">Net (Revenue minus Spending)</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Money Coming In (Revenues)</h2>
        <div v-for="line in revenueLines" :key="line.description" class="line-item">
          <div>
            <div class="item-name">{{ line.description }}</div>
            <div class="item-desc" v-if="line.department">{{ line.department }}</div>
          </div>
          <div class="item-amount">
            <div class="current">{{ fmt(line.amount) }}</div>
            <div class="change" :class="line.change >= 0 ? 'up' : 'down'" v-if="line.priorAmt">
              {{ line.change >= 0 ? '+' : '' }}{{ fmt(line.change, true) }} ({{ fmtPct(line.pct) }})
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Money Going Out (Expenditures)</h2>
        <div v-for="line in expenditureLines" :key="line.department + line.description" class="line-item">
          <div>
            <div class="item-name">{{ line.description }}</div>
            <div class="item-desc">{{ line.department }}<span v-if="line.notes"> — {{ line.notes }}</span></div>
          </div>
          <div class="item-amount">
            <div class="current">{{ fmt(line.amount) }}</div>
            <div class="change" :class="line.change >= 0 ? 'up' : 'down'" v-if="line.priorAmt">
              {{ line.change >= 0 ? '+' : '' }}{{ fmt(line.change, true) }} ({{ fmtPct(line.pct) }})
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
