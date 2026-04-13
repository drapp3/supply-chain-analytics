import csv
import sqlite3
import json
import os
from datetime import datetime

BASE = os.path.join(os.path.dirname(__file__), '..')
RAW = os.path.join(BASE, 'data', 'raw')
DB_PATH = os.path.join(BASE, 'data', 'supply_chain.db')
SCHEMA_PATH = os.path.join(BASE, 'sql', 'schema.sql')
METRICS_PATH = os.path.join(BASE, 'src', 'data', 'metrics.json')

def read_csv(name):
    with open(os.path.join(RAW, name), newline='') as f:
        return list(csv.DictReader(f))

def validate_date(val):
    if not val:
        return None
    datetime.strptime(val.strip(), '%Y-%m-%d')
    return val.strip()

def validate_int(val):
    v = int(val.strip())
    if v < 0:
        raise ValueError(f"Negative: {v}")
    return v

def validate_float(val):
    return float(val.strip())

def extract():
    tables = {}
    for name in ['suppliers', 'warehouses', 'products', 'orders', 'inventory']:
        tables[name] = read_csv(f'{name}.csv')
    return tables

def transform(tables):
    clean = {}
    skipped = 0

    rows = []
    for r in tables['suppliers']:
        rows.append((int(r['supplier_id']), r['name'].strip(), r['region'].strip(),
                      int(r['lead_time_days']), float(r['reliability_score'])))
    clean['suppliers'] = rows

    rows = []
    for r in tables['warehouses']:
        rows.append((int(r['warehouse_id']), r['name'].strip(), r['location'].strip(), int(r['capacity'])))
    clean['warehouses'] = rows

    rows = []
    for r in tables['products']:
        rows.append((int(r['product_id']), r['name'].strip(), r['category'].strip(),
                      float(r['unit_cost']), float(r['weight_kg'])))
    clean['products'] = rows

    rows = []
    for r in tables['orders']:
        try:
            qty = validate_int(r['quantity'])
            if qty <= 0:
                raise ValueError("Zero quantity")
            rows.append((int(r['order_id']), int(r['supplier_id']), int(r['product_id']),
                          int(r['warehouse_id']), validate_date(r['order_date']),
                          validate_date(r['expected_delivery']), validate_date(r['actual_delivery']),
                          qty, validate_float(r['unit_price']), r['status'].strip(),
                          r['delay_reason'].strip()))
        except (ValueError, KeyError):
            skipped += 1
    clean['orders'] = rows

    rows = []
    for r in tables['inventory']:
        rows.append((int(r['warehouse_id']), int(r['product_id']),
                      int(r['stock_quantity']), int(r['reorder_point'])))
    clean['inventory'] = rows

    if skipped:
        print(f"Skipped {skipped} invalid order rows")
    return clean

def load(clean):
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    with open(SCHEMA_PATH) as f:
        conn.executescript(f.read())
    conn.executemany("INSERT INTO suppliers VALUES (?,?,?,?,?)", clean['suppliers'])
    conn.executemany("INSERT INTO warehouses VALUES (?,?,?,?)", clean['warehouses'])
    conn.executemany("INSERT INTO products VALUES (?,?,?,?,?)", clean['products'])
    conn.executemany("INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?,?)", clean['orders'])
    conn.executemany("INSERT INTO inventory VALUES (?,?,?,?)", clean['inventory'])
    conn.commit()
    for t in clean:
        print(f"  {t}: {len(clean[t])} rows")
    return conn

def query(conn, sql):
    cur = conn.execute(sql)
    cols = [d[0] for d in cur.description]
    return [dict(zip(cols, row)) for row in cur.fetchall()]

def export_metrics(conn):
    kpi_rows = query(conn, """
        SELECT
            COUNT(*) AS total_orders,
            SUM(CASE WHEN status='Delivered' THEN 1 ELSE 0 END) AS delivered,
            SUM(CASE WHEN status='Delayed' THEN 1 ELSE 0 END) AS delayed,
            SUM(CASE WHEN status='Cancelled' THEN 1 ELSE 0 END) AS cancelled,
            SUM(CASE WHEN status='In Transit' THEN 1 ELSE 0 END) AS in_transit,
            ROUND(SUM(quantity * unit_price), 2) AS total_spend,
            ROUND(100.0 * SUM(CASE WHEN status='Delivered' AND actual_delivery <= expected_delivery THEN 1 ELSE 0 END)
                / NULLIF(SUM(CASE WHEN status IN ('Delivered','Delayed') THEN 1 ELSE 0 END), 0), 1) AS on_time_pct
        FROM orders
    """)
    kpis = kpi_rows[0]

    monthly = query(conn, """
        SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders,
            ROUND(SUM(quantity * unit_price), 2) AS spend,
            ROUND(100.0 * SUM(CASE WHEN status='Delivered' AND actual_delivery <= expected_delivery THEN 1 ELSE 0 END)
                / NULLIF(SUM(CASE WHEN status IN ('Delivered','Delayed') THEN 1 ELSE 0 END), 0), 1) AS on_time_pct
        FROM orders GROUP BY month ORDER BY month
    """)

    suppliers = query(conn, """
        SELECT s.name, s.region, COUNT(*) AS orders,
            ROUND(100.0 * SUM(CASE WHEN o.status='Delivered' AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END)
                / NULLIF(SUM(CASE WHEN o.status IN ('Delivered','Delayed') THEN 1 ELSE 0 END), 0), 1) AS on_time_pct,
            ROUND(AVG(julianday(CASE WHEN o.actual_delivery != '' THEN o.actual_delivery END) - julianday(o.order_date)), 1) AS avg_lead_days,
            ROUND(SUM(o.quantity * o.unit_price), 2) AS spend
        FROM orders o JOIN suppliers s ON o.supplier_id = s.supplier_id
        GROUP BY s.supplier_id ORDER BY on_time_pct DESC
    """)

    delays = query(conn, """
        SELECT delay_reason AS reason, COUNT(*) AS count,
            ROUND(AVG(julianday(actual_delivery) - julianday(expected_delivery)), 1) AS avg_days_late
        FROM orders WHERE status='Delayed' AND delay_reason != ''
        GROUP BY delay_reason ORDER BY count DESC
    """)

    warehouses = query(conn, """
        SELECT w.name, w.location, w.capacity,
            SUM(i.stock_quantity) AS stock,
            ROUND(100.0 * SUM(i.stock_quantity) / w.capacity, 1) AS utilization_pct
        FROM warehouses w JOIN inventory i ON w.warehouse_id = i.warehouse_id
        GROUP BY w.warehouse_id ORDER BY utilization_pct DESC
    """)

    categories = query(conn, """
        SELECT p.category, COUNT(o.order_id) AS orders, SUM(o.quantity) AS units,
            ROUND(SUM(o.quantity * o.unit_price), 2) AS spend
        FROM orders o JOIN products p ON o.product_id = p.product_id
        GROUP BY p.category ORDER BY spend DESC
    """)

    alerts = query(conn, """
        SELECT p.name AS product, w.name AS warehouse, i.stock_quantity AS stock,
            i.reorder_point, i.stock_quantity - i.reorder_point AS gap,
            CASE WHEN i.stock_quantity <= i.reorder_point * 0.5 THEN 'Critical' ELSE 'Low' END AS alert_level
        FROM inventory i
        JOIN products p ON i.product_id = p.product_id
        JOIN warehouses w ON i.warehouse_id = w.warehouse_id
        WHERE i.stock_quantity <= i.reorder_point
        ORDER BY gap ASC
    """)

    metrics = {
        'kpis': kpis,
        'monthly_trend': monthly,
        'suppliers': suppliers,
        'delay_reasons': delays,
        'warehouses': warehouses,
        'categories': categories,
        'inventory_alerts': alerts,
    }
    os.makedirs(os.path.dirname(METRICS_PATH), exist_ok=True)
    with open(METRICS_PATH, 'w') as f:
        json.dump(metrics, f, indent=2)
    print(f"  metrics.json: {len(alerts)} inventory alerts")
    return metrics

if __name__ == '__main__':
    print("Extracting CSVs...")
    tables = extract()
    print("Transforming...")
    clean = transform(tables)
    print("Loading into SQLite...")
    conn = load(clean)
    print("Exporting metrics...")
    export_metrics(conn)
    conn.close()
    print("Done.")
