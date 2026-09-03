# Sydney International Regatta Centre Water Quality Dashboard

Proof-of-concept recreational water quality dashboard for the Sydney International Regatta Centre. The first working version is a static GitHub Pages site with Plotly charts and placeholder data.

## What Is Included

- Public dashboard in `docs/index.html`
- Modern environmental report-card style layout
- Overview, Water Quality Trends, Monitoring Sites, and Report Card Downloads sections
- Plotly examples for Chlorophyll-a, Dissolved Oxygen, and Enterococci
- Static JSON placeholder data in `docs/data/sample_water_quality.json`
- Python data-generation script in `scripts/generate_placeholder_data.py`
- Sample report-card download folder in `report_cards/`

## Repository Structure

```text
PLS_WQ_report_card_dashboard/
|-- docs/
|   |-- index.html
|   |-- .nojekyll
|   |-- assets/
|   |   |-- css/
|   |   |   `-- styles.css
|   |   `-- js/
|   |       `-- app.js
|   |-- data/
|       `-- sample_water_quality.json
|   `-- report_cards/
|       |-- weekly/
|       |   `-- 2026-08-28-sirc-weekly-report-card.pdf
|       `-- monthly/
|           `-- 2026-08-sirc-monthly-report-card.pdf
|-- report_cards/
|   |-- README.md
|   |-- weekly/
|   |   `-- 2026-08-28-sirc-weekly-report-card.pdf
|   `-- monthly/
|       `-- 2026-08-sirc-monthly-report-card.pdf
|-- scripts/
|   `-- generate_placeholder_data.py
|-- data/
|-- assests/
|-- PROJECT.md
`-- README.md
```

## Local Preview

Because the dashboard loads JSON with `fetch`, preview it through a local web server:

```bash
cd PLS_WQ_report_card_dashboard
python -m http.server 8000
```

Open:

```text
http://localhost:8000/docs/
```

## Regenerate Placeholder Data

```bash
cd PLS_WQ_report_card_dashboard
python scripts/generate_placeholder_data.py
```

The script writes `docs/data/sample_water_quality.json`. Future Jupyter notebooks can export real monitoring data to the same JSON structure.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. In the GitHub repository, open **Settings**.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Select the branch to publish, usually `main`.
6. Set the folder to `/docs`.
7. Save and wait for GitHub Pages to publish the site.

## Notes

All dashboard values are synthetic placeholders. Replace them with quality-controlled monitoring data before using the dashboard for public health advice or operational decision-making.
