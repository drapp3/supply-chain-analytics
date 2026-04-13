import { useState } from 'react'
import metrics from './data/metrics.json'
import KPICards from './components/KPICards'
import TrendChart from './components/TrendChart'
import SupplierTable from './components/SupplierTable'
import InventoryView from './components/InventoryView'
import DelayAnalysis from './components/DelayAnalysis'

const TABS = ['Overview', 'Suppliers', 'Inventory', 'Delays']

function formatSpend(val) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`
  return `$${val}`
}

function Overview() {
  const { kpis, monthly_trend, categories, warehouses } = metrics
  const kpiItems = [
    { label: 'Total Orders', value: kpis.total_orders.toLocaleString() },
    { label: 'Delivered', value: kpis.delivered.toLocaleString(), color: '#22c55e' },
    { label: 'Delayed', value: kpis.delayed.toLocaleString(), color: '#eab308' },
    { label: 'Cancelled', value: kpis.cancelled.toLocaleString(), color: '#ef4444' },
    { label: 'In Transit', value: kpis.in_transit.toLocaleString(), color: '#3b82f6' },
    { label: 'On-Time Rate', value: `${kpis.on_time_pct}%`, color: kpis.on_time_pct >= 70 ? '#22c55e' : '#eab308' },
  ]
  const totalCatSpend = categories.reduce((s, c) => s + c.spend, 0)

  return (
    <div>
      <KPICards items={kpiItems} />
      <TrendChart data={monthly_trend} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Category Spend</h3>
          {categories.map(c => (
            <div key={c.category} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
                <span style={{ color: '#94a3b8' }}>{c.category}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#e2e8f0' }}>
                  {formatSpend(c.spend)} ({(100 * c.spend / totalCatSpend).toFixed(1)}%)
                </span>
              </div>
              <div style={{ background: '#1e293b', borderRadius: '3px', height: '6px' }}>
                <div style={{ background: '#3b82f6', height: '6px', borderRadius: '3px', width: `${100 * c.spend / totalCatSpend}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Warehouse Utilization</h3>
          {warehouses.map(w => (
            <div key={w.name} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
                <span style={{ color: '#94a3b8' }}>{w.name}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#e2e8f0' }}>
                  {w.utilization_pct}%
                </span>
              </div>
              <div style={{ background: '#1e293b', borderRadius: '3px', height: '6px' }}>
                <div style={{
                  background: w.utilization_pct > 80 ? '#ef4444' : w.utilization_pct > 50 ? '#eab308' : '#22c55e',
                  height: '6px', borderRadius: '3px', width: `${w.utilization_pct}%`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#111827',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  padding: '16px',
}

const sectionHeader = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#64748b',
  margin: '0 0 12px 0',
}

export default function App() {
  const [tab, setTab] = useState('Overview')

  return (
    <div style={{ background: '#0a0f1a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'DM Sans, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <header style={{ borderBottom: '1px solid #1e293b', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <h1 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', fontWeight: 500, margin: 0, color: '#f8fafc' }}>
          supply-chain-analytics
        </h1>
        <nav style={{ display: 'flex', gap: '4px' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: t === tab ? '#1e293b' : 'transparent',
              color: t === tab ? '#f8fafc' : '#64748b',
              border: t === tab ? '1px solid #334155' : '1px solid transparent',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
              cursor: 'pointer',
            }}>
              {t}
            </button>
          ))}
        </nav>
        <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#475569' }}>
          {formatSpend(metrics.kpis.total_spend)} total spend
        </span>
      </header>
      <main style={{ padding: '20px 24px', maxWidth: '1280px' }}>
        {tab === 'Overview' && <Overview />}
        {tab === 'Suppliers' && <SupplierTable suppliers={metrics.suppliers} />}
        {tab === 'Inventory' && <InventoryView warehouses={metrics.warehouses} alerts={metrics.inventory_alerts} />}
        {tab === 'Delays' && <DelayAnalysis delays={metrics.delay_reasons} kpis={metrics.kpis} />}
      </main>
    </div>
  )
}
