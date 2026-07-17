const App = {
  components: { Welcome, Dashboard, FundView, DamProject, Search, WhatChanged },
  data() {
    return {
      currentView: 'welcome',
      loaded: false,
      error: null
    };
  },
  async mounted() {
    try {
      await DataLoader.load();
      this.loaded = true;
    } catch (e) {
      this.error = 'Could not load budget data. Please try again later.';
      console.error(e);
    }
  },
  template: `
    <div>
      <header class="site-header">
        <h1>Anoka By The Numbers</h1>
        <div class="tagline">Understanding the City of Anoka's budget, in plain language</div>
      </header>

      <nav class="nav-tabs">
        <button :class="{active: currentView === 'welcome'}" @click="currentView = 'welcome'">Welcome</button>
        <button :class="{active: currentView === 'dashboard'}" @click="currentView = 'dashboard'">Dashboard</button>
        <button :class="{active: currentView === 'funds'}" @click="currentView = 'funds'">Funds Breakdown</button>
        <button :class="{active: currentView === 'dam'}" @click="currentView = 'dam'">Dam Project</button>
        <button :class="{active: currentView === 'changed'}" @click="currentView = 'changed'">Year-To-Year</button>
        <button :class="{active: currentView === 'search'}" @click="currentView = 'search'">Search</button>
      </nav>

      <main class="main-content">
        <div v-if="error" class="card">{{ error }}</div>
        <div v-else-if="!loaded" class="card">Loading budget data...</div>
        <template v-else>
          <Welcome v-if="currentView === 'welcome'"></Welcome>
          <Dashboard v-if="currentView === 'dashboard'"></Dashboard>
          <FundView v-if="currentView === 'funds'"></FundView>
          <DamProject v-if="currentView === 'dam'"></DamProject>
          <WhatChanged v-if="currentView === 'changed'"></WhatChanged>
          <Search v-if="currentView === 'search'"></Search>
        </template>
      </main>

      <footer class="site-footer">
        Data sourced from the City of Anoka's official proposed budget documents.<br>
        This site is an independent civic transparency project and is not an official City of Anoka website.
      </footer>
    </div>
  `
};

Vue.createApp(App).mount('#app');
