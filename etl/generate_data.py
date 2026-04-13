import csv
import random
import os
from datetime import datetime, timedelta

random.seed(42)
OUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
os.makedirs(OUT, exist_ok=True)

REGIONS = ['North America', 'Europe', 'Asia', 'South America']
suppliers = [
    (1, 'Apex Electronics', 'Asia', 7, 0.91), (2, 'BrightPath Materials', 'North America', 4, 0.95),
    (3, 'CedarPoint Components', 'Europe', 9, 0.88), (4, 'DeltaWave Supply', 'Asia', 12, 0.82),
    (5, 'EverGreen Packaging', 'North America', 3, 0.97), (6, 'FutureTech Parts', 'Europe', 10, 0.85),
    (7, 'GlobalSource Inc', 'Asia', 14, 0.78), (8, 'Highland Materials', 'South America', 16, 0.80),
    (9, 'IronBridge Co', 'North America', 5, 0.93), (10, 'JetStream Logistics', 'South America', 11, 0.84),
]

warehouses = [
    (1, 'Charlotte DC', 'Charlotte, NC', 50000), (2, 'Dallas DC', 'Dallas, TX', 45000),
    (3, 'Chicago DC', 'Chicago, IL', 60000), (4, 'Atlanta DC', 'Atlanta, GA', 40000),
    (5, 'Phoenix DC', 'Phoenix, AZ', 35000),
]

CATEGORIES = ['Electronics', 'Raw Materials', 'Components', 'Packaging']
products = [
    (1, 'Circuit Board A', 'Electronics', 24.50, 0.3), (2, 'Copper Wire 10m', 'Raw Materials', 8.75, 1.2),
    (3, 'LED Module', 'Electronics', 12.00, 0.1), (4, 'Steel Plate 1m²', 'Raw Materials', 45.00, 8.5),
    (5, 'Resistor Pack', 'Components', 3.25, 0.05), (6, 'Capacitor Set', 'Components', 5.50, 0.08),
    (7, 'Cardboard Box L', 'Packaging', 2.10, 0.4), (8, 'Bubble Wrap 5m', 'Packaging', 4.30, 0.6),
    (9, 'Sensor Module', 'Electronics', 31.00, 0.2), (10, 'Aluminum Sheet', 'Raw Materials', 18.90, 3.0),
    (11, 'Connector Kit', 'Components', 7.80, 0.12), (12, 'Shrink Film Roll', 'Packaging', 6.50, 1.5),
    (13, 'Power Supply Unit', 'Electronics', 42.00, 0.9), (14, 'Rubber Gasket', 'Components', 1.95, 0.03),
    (15, 'Plastic Pellets 1kg', 'Raw Materials', 3.60, 1.0),
]

DELAY_REASONS = ['Customs Delay', 'Production Backlog', 'Weather Disruption', 'Quality Hold', 'Carrier Issue', 'Port Congestion']
START = datetime(2024, 1, 1)
END = datetime(2025, 6, 30)
days_range = (END - START).days

def write_csv(name, headers, rows):
    with open(os.path.join(OUT, name), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(headers)
        w.writerows(rows)

write_csv('suppliers.csv', ['supplier_id', 'name', 'region', 'lead_time_days', 'reliability_score'],
          [(s[0], s[1], s[2], s[3], s[4]) for s in suppliers])

write_csv('warehouses.csv', ['warehouse_id', 'name', 'location', 'capacity'],
          [(w[0], w[1], w[2], w[3]) for w in warehouses])

write_csv('products.csv', ['product_id', 'name', 'category', 'unit_cost', 'weight_kg'],
          [(p[0], p[1], p[2], p[3], p[4]) for p in products])

orders = []
for i in range(1, 2501):
    sup = random.choice(suppliers)
    prod = random.choice(products)
    wh = random.choice(warehouses)
    order_date = START + timedelta(days=random.randint(0, days_range))
    lead = sup[3] + random.randint(-2, 4)
    expected = order_date + timedelta(days=max(lead, 1))
    qty = random.randint(10, 500)
    price = round(prod[3] * random.uniform(0.9, 1.15), 2)

    roll = random.random()
    if roll < 0.03:
        status, actual, reason = 'Cancelled', '', ''
    elif roll < 0.07:
        status, actual, reason = 'In Transit', '', ''
    elif random.random() < sup[4]:
        actual = expected + timedelta(days=random.randint(-1, 1))
        status, reason = 'Delivered', ''
        actual = actual.strftime('%Y-%m-%d')
    else:
        delay = random.randint(2, 15)
        actual = (expected + timedelta(days=delay)).strftime('%Y-%m-%d')
        status = 'Delayed'
        reason = random.choice(DELAY_REASONS)

    orders.append([i, sup[0], prod[0], wh[0], order_date.strftime('%Y-%m-%d'),
                   expected.strftime('%Y-%m-%d'), actual, qty, price, status, reason])

write_csv('orders.csv',
          ['order_id', 'supplier_id', 'product_id', 'warehouse_id', 'order_date',
           'expected_delivery', 'actual_delivery', 'quantity', 'unit_price', 'status', 'delay_reason'],
          orders)

inventory = []
for wh in warehouses:
    for prod in products:
        stock = random.randint(50, 2000)
        reorder = random.randint(100, 500)
        inventory.append([wh[0], prod[0], stock, reorder])

write_csv('inventory.csv', ['warehouse_id', 'product_id', 'stock_quantity', 'reorder_point'], inventory)

print(f"Generated: suppliers(10), warehouses(5), products(15), orders(2500), inventory(75)")
print(f"Output: {os.path.abspath(OUT)}")
