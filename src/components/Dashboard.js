const Dashboard = {
  props: ['data'],
  data() {
    return {
      latestYear: null,
      priorYear: null,
      totalRevenue: 0,
      totalExpenditure: 0,
      priorRevenue: 0,
      breakdown: [],
      topChanges: []
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

      // General Fund totals
      this.totalRevenue = DataLoader.sumByFundYear('General Fund', this.latestYear, 'Revenue');
      this.totalExpenditure = DataLoader.sumByFundYear('General Fund', this.latestYear, 'Expenditure');
      this.priorRevenue = DataLoader.sumByFundYear('General Fund', this.priorYear, 'Revenue');

      // Department breakdown (the "$100 bill" visual)
      const deptTotals = DataLoader.getDepartmentTotals('General Fund', this.latestYear);
      const total = Object.values(deptTotals).reduce((a, b) => a + b, 0);

      const descriptions = {
        'Police': 'Keeping neighborhoods safe, responding to calls',
        'Fire': 'Fire response and emergency services',
        'Public Works': 'Plowing snow, fixing potholes, maintaining roads',
        'Parks': 'Trails, athletic fields, city beautification',
        'Recreation': 'Pools, senior center, community programs',
        'Planning & Comm Development': 'Permitting, zoning, development review',
        'Building Inspections': 'Code enforcement, permit inspections',
        'Finance': 'Budgeting, accounting, city finances',
        'Administrative Services': 'City administration and support',
        'Municipal Buildings': 'Maintaining city facilities',
        'Legal': 'City attorney, legal services',
        'Council': 'City council and elections',
        'Unallocated': 'Reserves, joint fire operations, contingency'
      };

      this.breakdown = Object.entries(deptTotals)
        .sort((a, b) => b[1] - a[1])
        .map(([dept, amt]) => ({
          dept,
          amount: amt,
          pctOfTotal: total > 0 ? (amt / total) * 100 : 0,
          desc: descriptions[dept] || 'City services'
        }));

      // Biggest year-over-year changes across all funds
      const changes = [];
      const funds = DataLoader.getFunds();
      funds.forEach(fund => {
        const depts = [...new Set(DataLoader.getByFund(fund).map(r => r.Department))];
        depts.forEach(dept => {
          const curr = DataLoader.sumByFundYear(fund, this.latestYear, 'Expenditure');
          const priorRows = DataLoader.getByFundYear(fund, this.priorYear).filter(r => r.Type === 'Expenditure' && r.Department === dept);
          const currRows = DataLoader.getByFundYear(fund, this.latestYear).filter(r => r.Type === 'Expenditure' && r.Department === dept);
          const currAmt = currRows.reduce((s, r) => s + (r.Amount || 0), 0);
          const priorAmt = priorRows.reduce((s, r) => s + (r.Amount || 0), 0);
          if (priorAmt > 0 && currAmt > 0) {
            const change = currAmt - priorAmt;
            const pct = (change / priorAmt) * 100;
            changes.push({ fund, dept, currAmt, priorAmt, change, pct });
          }
        });
      });

      this.topChanges = changes
        .filter(c => Math.abs(c.change) > 1000)
        .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
        .slice(0, 5);
    }
  },
  template: `
    <div>
      <div class="card">
        <h2>Where Your Tax Dollar Goes</h2>
        <p class="narrative">
          This breakdown shows General Fund spending — the day-to-day services your property
          taxes support: police, fire, streets, parks, and city administration.
          Water, sewer, and electric are separate "enterprise funds" paid for by user fees, not taxes.
        </p>
        <div class="hundred-breakdown">
          <div v-for="item in breakdown" :key="item.dept">
            <div class="breakdown-bar-row">
              <div class="breakdown-label">{{ item.dept }}</div>
              <div class="breakdown-bar-track">
                <div class="breakdown-bar-fill" :style="{ width: Math.max(item.pctOfTotal, 8) + '%' }">
                  {{ item.pctOfTotal.toFixed(0) }}%
                </div>
              </div>
            </div>
            <div class="breakdown-desc">{{ item.desc }} — {{ fmt(item.amount, true) }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>{{ latestYear }} Budget At a Glance</h2>
        <div class="metrics-grid">
          <div class="metric-box">
            <div class="value">{{ fmt(totalRevenue, true) }}</div>
            <div class="label">Total General Fund Revenue</div>
          </div>
          <div class="metric-box">
            <div class="value">{{ fmt(totalExpenditure, true) }}</div>
            <div class="label">Total General Fund Spending</div>
          </div>
          <div class="metric-box" :class="totalRevenue >= totalExpenditure ? 'positive' : ''">
            <div class="value">{{ totalRevenue >= totalExpenditure ? 'Balanced' : 'Deficit' }}</div>
            <div class="label">Budget is {{ totalRevenue >= totalExpenditure ? 'balanced' : 'running a deficit' }}</div>
          </div>
          <div class="metric-box accent">
            <div class="value">{{ fmtPct(((totalRevenue - priorRevenue) / priorRevenue) * 100) }}</div>
            <div class="label">Revenue growth vs {{ priorYear }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>What Changed This Year?</h2>
        <p class="narrative">
          The biggest shifts in spending from {{ priorYear }} to {{ latestYear }}, by department.
        </p>
        <div v-for="c in topChanges" :key="c.fund + c.dept" class="line-item">
          <div>
            <div class="item-name">{{ c.dept }} <span style="color:#888; font-weight:400;">({{ c.fund }})</span></div>
            <div class="item-desc">{{ fmt(c.priorAmt, true) }} → {{ fmt(c.currAmt, true) }}</div>
          </div>
          <div class="item-amount">
            <div class="current" :class="c.change >= 0 ? 'change up' : 'change down'">
              {{ c.change >= 0 ? '+' : '' }}{{ fmt(c.change, true) }}
            </div>
            <div class="change" :class="c.change >= 0 ? 'up' : 'down'">{{ fmtPct(c.pct) }}</div>
          </div>
        </div>
      </div>
    </div>
  `
};
