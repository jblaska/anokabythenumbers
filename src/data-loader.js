// ===== DATA LOADER =====
// Loads budgets.csv and provides helper functions for components to use

const DataLoader = {
  data: [],
  loaded: false,

  async load() {
    return new Promise((resolve, reject) => {
      Papa.parse('src/data/budgets.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.data = results.data;
          this.loaded = true;
          resolve(this.data);
        },
        error: (err) => reject(err)
      });
    });
  },

  // Get all unique funds
  getFunds() {
    const funds = [...new Set(this.data.map(row => row.Fund))];
    return funds.sort();
  },

  // Get all rows for a specific fund
  getByFund(fundName) {
    return this.data.filter(row => row.Fund === fundName);
  },

  // Get all rows for a specific fund + year
  getByFundYear(fundName, year) {
    return this.data.filter(row => row.Fund === fundName && row.Year === year);
  },

  // Get all unique years, sorted
  getYears() {
    const years = [...new Set(this.data.map(row => row.Year))];
    return years.sort((a, b) => a - b);
  },

  // Get the most recent year in the data
  getLatestYear() {
    const years = this.getYears();
    return years[years.length - 1];
  },

  // Get the year before the latest
  getPriorYear() {
    const years = this.getYears();
    return years[years.length - 2];
  },

  // Sum amounts for a fund/year, optionally filtered by Type (Revenue/Expenditure)
  sumByFundYear(fundName, year, type) {
    let rows = this.getByFundYear(fundName, year);
    if (type) rows = rows.filter(row => row.Type === type);
    return rows.reduce((sum, row) => sum + (row.Amount || 0), 0);
  },

  // Get department-level totals for a fund/year (Expenditures only, grouped by Department)
  getDepartmentTotals(fundName, year) {
    const rows = this.getByFundYear(fundName, year).filter(row => row.Type === 'Expenditure');
    const totals = {};
    rows.forEach(row => {
      const dept = row.Department || 'Other';
      totals[dept] = (totals[dept] || 0) + (row.Amount || 0);
    });
    return totals;
  },

  // Search across Description/Department/Fund fields
  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.data.filter(row =>
      (row.Description && row.Description.toLowerCase().includes(q)) ||
      (row.Department && row.Department.toLowerCase().includes(q)) ||
      (row.Fund && row.Fund.toLowerCase().includes(q))
    );
  },

  // Compare a specific line item (by Fund+Department+Category+Description) across two years
  getYearOverYear(fundName, department, category, description) {
    const latest = this.getLatestYear();
    const prior = this.getPriorYear();
    const currentRow = this.data.find(row =>
      row.Fund === fundName && row.Department === department &&
      row.Category === category && row.Description === description &&
      row.Year === latest
    );
    const priorRow = this.data.find(row =>
      row.Fund === fundName && row.Department === department &&
      row.Category === category && row.Description === description &&
      row.Year === prior
    );
    const currentAmt = currentRow ? currentRow.Amount : 0;
    const priorAmt = priorRow ? priorRow.Amount : 0;
    const change = currentAmt - priorAmt;
    const pctChange = priorAmt !== 0 ? (change / priorAmt) * 100 : 0;
    return { currentAmt, priorAmt, change, pctChange };
  },

  // Format a number as currency
  formatCurrency(amount, compact = false) {
    if (compact) {
      if (Math.abs(amount) >= 1000000) {
        return '$' + (amount / 1000000).toFixed(1) + 'M';
      } else if (Math.abs(amount) >= 1000) {
        return '$' + (amount / 1000).toFixed(0) + 'K';
      }
    }
    return '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
  },

  // Format a percent change
  formatPct(pct) {
    const sign = pct >= 0 ? '+' : '';
    return sign + pct.toFixed(1) + '%';
  }
};
