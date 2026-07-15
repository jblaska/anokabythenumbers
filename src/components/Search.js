const Search = {
  data() {
    return {
      query: '',
      results: [],
      latestYear: null
    };
  },
  mounted() {
    this.latestYear = DataLoader.getLatestYear();
  },
  methods: {
    fmt(amount, compact) { return DataLoader.formatCurrency(amount, compact); },
    fmtPct(pct) { return DataLoader.formatPct(pct); },

    runSearch() {
      if (this.query.trim().length < 2) {
        this.results = [];
        return;
      }
      const matches = DataLoader.search(this.query)
        .filter(r => r.Year === this.latestYear);

      this.results = matches.map(row => {
        const yoy = DataLoader.getYearOverYear(row.Fund, row.Department, row.Category, row.Description);
        return { ...row, ...yoy };
      });
    }
  },
  template: `
    <div>
      <div class="card">
        <h2>Search the Budget</h2>
        <p class="narrative">Type a keyword — like "police", "water", "streets", or "salaries" — to find related budget items.</p>
        <input
          type="text"
          class="search-box"
          placeholder="Search for anything..."
          v-model="query"
          @input="runSearch"
        >

        <div v-if="query.trim().length >= 2 && results.length === 0" class="narrative">
          No results found for "{{ query }}". Try a different term.
        </div>

        <div v-for="r in results" :key="r.Fund + r.Department + r.Description" class="line-item">
          <div>
            <div class="item-name">{{ r.Description }}</div>
            <div class="item-desc">{{ r.Fund }} — {{ r.Department }} ({{ r.Type }})</div>
          </div>
          <div class="item-amount">
            <div class="current">{{ fmt(r.currentAmt) }}</div>
            <div class="change" :class="r.change >= 0 ? 'up' : 'down'" v-if="r.priorAmt">
              {{ r.change >= 0 ? '+' : '' }}{{ fmt(r.change, true) }} ({{ fmtPct(r.pctChange) }})
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
