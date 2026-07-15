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
      totalExpenditure: 0,
      fundDescriptions: {
        'General Fund': 'This is the city\'s main operating fund — it pays for day-to-day services like police, fire, streets, parks, and city administration. It\'s funded primarily by property taxes and fees, and by law it must stay balanced (spending can\'t exceed revenue).',
        'Water': 'This fund covers the city\'s water utility — pumping, treating, and delivering drinking water. It\'s paid for entirely by water bills, not property taxes. Anoka owns and runs this system itself rather than contracting it out.',
        'Sewer': 'This fund covers wastewater collection and treatment. Like Water, it\'s paid for through user fees (your sewer bill) rather than property taxes, and is intended to be self-sustaining.',
        'Electric': 'Anoka owns and operates its own electric utility — one of the more unusual things about this city compared to most Minnesota suburbs. This fund is paid for by electric bills, and covers everything from purchasing wholesale power to maintaining the local grid.',
        'Liquor Store': 'The city operates its own municipal liquor store. This fund is paid for through store sales, and any profit is typically transferred to help fund other city services — so it isn\'t just self-sustaining, it can be a net contributor to the General Fund.'
      }
    };
  },
  computed: {
    fundDescription() {
      return this.fundDescriptions[this.selectedFund] ||
        'This fund tracks a specific category of city revenue and spending. Below is a breakdown of where its money comes from and where it goes.';
    }
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

        <p class="narrative">{{ fundDescription }}</p>

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
