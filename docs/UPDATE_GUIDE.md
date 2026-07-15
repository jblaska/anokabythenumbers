# Annual Update Guide

Every year when the new proposed budget is released, follow these steps.
This should take about 2-3 hours total.

## 1. Get the New Budget Data

Pull the new numbers from the City's Proposed Budget PDF (usually released
in August). Focus on:

- General Fund (revenues and expenditures by department)
- Water, Sewer, Electric, Liquor Store (enterprise funds)
- Any other funds citizens commonly ask about

## 2. Add Rows to budgets.csv

Open `src/data/budgets.csv` in any spreadsheet program (Excel, Google Sheets)
or text editor.

**Important: Do NOT delete last year's rows.** The site needs at least two
years of data for every line item to calculate year-over-year comparisons.

Add new rows following this exact column structure:

| Column | What Goes Here | Example |
|---|---|---|
| Year | The budget year | 2027 |
| Fund | Fund name (must match exactly across years) | General Fund |
| Department | Department name (must match exactly across years) | Police |
| Category | Type of expense | Employee Services |
| Type | Either "Revenue" or "Expenditure" | Expenditure |
| Description | Human-readable line item name | Salaries & Benefits |
| Amount | The dollar figure (no $ or commas) | 6400000 |
| Notes | Optional — explain big changes | Added 2 officers |

**Consistency matters:** If "Police" was spelled "Police" last year, keep it
"Police" this year — not "Police Dept" or "police". The site matches rows
across years by exact text match on Fund + Department + Category + Description.

## 3. Update Narrative Text (Optional)

If you want to update the written explanations (in `Dashboard.js`, the
`descriptions` object), you can tweak the plain-language descriptions of what
each department does. This is optional — the numbers will update automatically
regardless.

## 4. Test Locally Before Publishing

```
python3 -m http.server 8000
```

Visit `http://localhost:8000` and check:
- Dashboard loads with correct latest year
- Fund breakdown shows new numbers
- "What Changed" shows sensible increases/decreases
- Search still works

## 5. Commit and Push

Using GitHub Desktop:
1. Review the changed files (should just be budgets.csv, maybe Dashboard.js)
2. Write a commit message like "Add 2027 budget data"
3. Commit to main
4. Push origin

GitHub Pages will automatically redeploy within a few minutes. No other
steps needed — the domain and hosting configuration stay the same.

## 6. Spot-Check the Live Site

Visit https://anokabythenumbers.com after ~5 minutes and verify the new
year's numbers are showing correctly.

## Troubleshooting

**"Year-over-year comparison shows 0% or blank"**
→ The Fund/Department/Category/Description text doesn't match exactly
between the two years. Check for typos, extra spaces, or inconsistent naming.

**"A department disappeared from the Dashboard"**
→ Check that it has at least one Expenditure-type row for the latest year
in budgets.csv.

**"Numbers look wrong"**
→ Double check you didn't accidentally paste Amount values with $ signs or
commas — the Amount column must be plain numbers only (e.g. 6400000, not
$6,400,000).
