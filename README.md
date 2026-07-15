# Anoka By The Numbers

An independent civic transparency project explaining the City of Anoka, MN budget in plain language.

**Live site:** https://anokabythenumbers.com

## What This Is

An interactive breakdown of the city's budget — where tax dollars come from, where they go,
and what changed year over year — built for citizens, not accountants.

## Project Structure

```
index.html                  Main page shell
src/
  styles/main.css           All site styling (brand colors, layout)
  data-loader.js             Loads and processes budgets.csv
  data/budgets.csv           THE DATA — update this file each year
  components/
    Dashboard.js              "$100 breakdown" + key metrics + top changes
    FundView.js               Drill into any individual fund
    Search.js                 Keyword search across all line items
    WhatChanged.js             Year-over-year increases/decreases/new items
  app.js                     Vue app setup, navigation
```

## Updating for a New Budget Year

See `docs/UPDATE_GUIDE.md` for full instructions. Short version:

1. Open `src/data/budgets.csv`
2. Add new rows for the new year (keep prior year rows — needed for comparison)
3. Commit and push — GitHub Pages redeploys automatically

## Local Development

This is a static site with no build step. To preview locally:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

(Opening `index.html` directly via `file://` will not work — the browser blocks
CSV loading from local files for security reasons. Use a local server.)

## Disclaimer

This is an independent project and is not an official City of Anoka website.
All figures are drawn from the City's published budget documents.
