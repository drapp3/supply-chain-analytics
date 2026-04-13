# Supply Chain Analytics

End-to-end supply chain operations dashboard covering synthetic ERP data generation, SQL analytics, and an interactive React dashboard. Built to demonstrate data modeling, ETL pipeline design, and analytical visualization.

## Key Findings

- **58% on-time delivery rate** across 2,500 purchase orders from 10 suppliers spanning Jan 2024–Jun 2025
- **Port Congestion and Weather Disruption** are the leading delay causes (51 and 50 incidents), averaging 8.8 days late
- **Electronics dominates spend** at $4.5M (49% of $9.2M total), despite fewer orders than Raw Materials
- **Warehouse utilization ranges 24–48%**, with Phoenix DC highest at 48.1% and Dallas DC lowest at 24.4%
- **8 inventory items** currently below reorder point, requiring immediate replenishment action

## Architecture

```
Raw CSVs --> Python ETL --> SQLite DB --> SQL Analytics --> JSON --> React Dashboard
                │                              │
    generate_data.py              queries.sql (7 queries)
    etl_pipeline.py               schema.sql (5 tables)
```

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Data Gen      | Python, csv, random               |
| Database      | SQLite3                           |
| ETL           | Python (csv to sqlite3 to json)   |
| SQL           | Joins, window functions, CTEs     |
| Frontend      | Vite + React 19, Recharts         |
| Deployment    | GitHub Pages via gh-pages         |

## Data Model

5 normalized tables with foreign key relationships:

- **suppliers** (10 rows) - vendor profiles with reliability scores
- **warehouses** (5 rows) - US distribution centers with capacity
- **products** (15 rows) - SKUs across 4 categories
- **orders** (2,500 rows) - purchase orders with delivery tracking
- **inventory** (75 rows) - current stock levels per warehouse/product

Example query - supplier scorecard with composite metric:
```sql
SELECT s.name, s.region,
    ROUND(100.0 * SUM(CASE WHEN o.status='Delivered'
        AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END)
        / NULLIF(SUM(CASE WHEN o.status IN ('Delivered','Delayed')
        THEN 1 ELSE 0 END), 0), 1) AS on_time_pct
FROM orders o
JOIN suppliers s ON o.supplier_id = s.supplier_id
GROUP BY s.supplier_id
ORDER BY on_time_pct DESC;
```

## Project Structure

```
supply-chain-analytics/
├── data/
│   └── raw/                  # Generated CSVs (5 files)
├── etl/
│   ├── generate_data.py      # Synthetic data generation
│   └── etl_pipeline.py       # Extract, Transform, Load, Export
├── sql/
│   ├── schema.sql            # DDL with indexes and constraints
│   └── queries.sql           # 7 analytical queries
├── src/
│   ├── App.jsx               # Dashboard shell with tab navigation
│   ├── data/metrics.json     # Pre-computed analytics (ETL output)
│   └── components/
│       ├── KPICards.jsx       # Reusable KPI card grid
│       ├── TrendChart.jsx     # Monthly area chart with metric toggle
│       ├── SupplierTable.jsx  # Scorecard table + bar chart
│       ├── InventoryView.jsx  # Warehouse gauges + reorder alerts
│       └── DelayAnalysis.jsx  # Delay frequency + avg days late
├── index.html
├── package.json
└── vite.config.js
```

## How to Run

**Prerequisites:** Python 3.10+, Node.js 18+

```bash
# 1. Generate synthetic data
python etl/generate_data.py

# 2. Run ETL pipeline (creates SQLite DB + metrics.json)
python etl/etl_pipeline.py

# 3. Start dashboard
npm install
npm run dev
```

The dashboard loads at `http://localhost:5173/supply-chain-analytics/`.

## Dashboard

4 tabs: Overview, Suppliers, Inventory, Delays

## Skills Demonstrated

- **SQL**: Normalized schema design, JOINs, CASE expressions, window functions, aggregate queries, indexing strategy
- **Python ETL**: CSV parsing, data validation, SQLite bulk loading, JSON export pipeline
- **Data Modeling**: Foreign key relationships, constraint design, index optimization
- **React**: Component composition, state management, data visualization with Recharts
- **Data Visualization**: KPI cards, area charts, bar charts, gauge indicators, sortable tables
- **DevOps**: Vite build tooling, GitHub Pages deployment pipeline
