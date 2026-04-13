import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const METRICS = {
  spend: { key: 'spend', label: 'Spend', color: '#3b82f6', fmt: v => `$${(v / 1000).toFixed(0)}K` },
  orders: { key: 'orders', label: 'Orders', color: '#22c55e', fmt: v => v },
  on_time_pct: { key: 'on_time_pct', label: 'On-Time %', color: '#eab308', fmt: v => `${v}%` },
}

export default function TrendChart({ data }) {
  const [active, setActive] = useState('spend')
  const m = METRICS[active]

  return (
    <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
          textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: 0,
        }}>
          Monthly Trend
        </h3>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Object.values(METRICS).map(opt => (
            <button key={opt.key} onClick={() => setActive(opt.key)} style={{
              background: active === opt.key ? '#1e293b' : 'transparent',
              color: active === opt.key ? '#f8fafc' : '#64748b',
              border: active === opt.key ? '1px solid #334155' : '1px solid transparent',
              borderRadius: '4px', padding: '3px 10px', fontSize: '12px',
              fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={m.fmt} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={v => [m.fmt(v), m.label]}
          />
          <Area type="monotone" dataKey={m.key} stroke={m.color} fill={m.color} fillOpacity={0.1} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
