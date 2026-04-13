-- 1. On-time delivery rate overall and by supplier
SELECT
    s.name AS supplier,
    s.region,
    COUNT(*) AS total_orders,
    SUM(CASE WHEN o.status = 'Delivered' AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END) AS on_time,
    ROUND(100.0 * SUM(CASE WHEN o.status = 'Delivered' AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END) / COUNT(*), 1) AS on_time_pct
FROM orders o
JOIN suppliers s ON o.supplier_id = s.supplier_id
WHERE o.status IN ('Delivered', 'Delayed')
GROUP BY s.supplier_id
ORDER BY on_time_pct DESC;

-- 2. Monthly order volume and spend trend
SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS orders,
    ROUND(SUM(quantity * unit_price), 2) AS spend,
    ROUND(100.0 * SUM(CASE WHEN status = 'Delivered' AND actual_delivery <= expected_delivery THEN 1 ELSE 0 END)
        / NULLIF(SUM(CASE WHEN status IN ('Delivered', 'Delayed') THEN 1 ELSE 0 END), 0), 1) AS on_time_pct
FROM orders
GROUP BY month
ORDER BY month;

-- 3. Delay root cause frequency with avg days late
SELECT
    delay_reason AS reason,
    COUNT(*) AS count,
    ROUND(AVG(julianday(actual_delivery) - julianday(expected_delivery)), 1) AS avg_days_late
FROM orders
WHERE status = 'Delayed' AND delay_reason != ''
GROUP BY delay_reason
ORDER BY count DESC;

-- 4. Inventory health - stock vs reorder point
SELECT
    w.name AS warehouse,
    p.name AS product,
    p.category,
    i.stock_quantity AS stock,
    i.reorder_point,
    i.stock_quantity - i.reorder_point AS gap,
    CASE
        WHEN i.stock_quantity <= i.reorder_point * 0.5 THEN 'Critical'
        WHEN i.stock_quantity <= i.reorder_point THEN 'Low'
        WHEN i.stock_quantity <= i.reorder_point * 1.5 THEN 'Adequate'
        ELSE 'Surplus'
    END AS status
FROM inventory i
JOIN warehouses w ON i.warehouse_id = w.warehouse_id
JOIN products p ON i.product_id = p.product_id
ORDER BY gap ASC;

-- 5. Supplier scorecard - composite metric
SELECT
    s.name,
    s.region,
    s.lead_time_days,
    COUNT(o.order_id) AS total_orders,
    ROUND(100.0 * SUM(CASE WHEN o.status = 'Delivered' AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END)
        / NULLIF(SUM(CASE WHEN o.status IN ('Delivered', 'Delayed') THEN 1 ELSE 0 END), 0), 1) AS on_time_pct,
    ROUND(AVG(o.quantity * o.unit_price), 2) AS avg_order_value,
    ROUND(
        0.5 * (100.0 * SUM(CASE WHEN o.status = 'Delivered' AND o.actual_delivery <= o.expected_delivery THEN 1 ELSE 0 END)
            / NULLIF(SUM(CASE WHEN o.status IN ('Delivered', 'Delayed') THEN 1 ELSE 0 END), 0))
        + 0.3 * (100.0 - (s.lead_time_days * 100.0 / (SELECT MAX(lead_time_days) FROM suppliers)))
        + 0.2 * s.reliability_score * 100, 1
    ) AS composite_score
FROM suppliers s
JOIN orders o ON s.supplier_id = o.supplier_id
GROUP BY s.supplier_id
ORDER BY composite_score DESC;

-- 6. Warehouse utilization percentage
SELECT
    w.name,
    w.location,
    w.capacity,
    SUM(i.stock_quantity) AS total_stock,
    ROUND(100.0 * SUM(i.stock_quantity) / w.capacity, 1) AS utilization_pct
FROM warehouses w
JOIN inventory i ON w.warehouse_id = i.warehouse_id
GROUP BY w.warehouse_id
ORDER BY utilization_pct DESC;

-- 7. Category spend distribution with percentage of total (window function)
SELECT
    p.category,
    COUNT(o.order_id) AS orders,
    SUM(o.quantity) AS total_units,
    ROUND(SUM(o.quantity * o.unit_price), 2) AS spend,
    ROUND(100.0 * SUM(o.quantity * o.unit_price) / SUM(SUM(o.quantity * o.unit_price)) OVER (), 1) AS pct_of_total
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY p.category
ORDER BY spend DESC;
