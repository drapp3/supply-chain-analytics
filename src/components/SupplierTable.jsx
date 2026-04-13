import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const REGION_COLORS = {
  'North America': '#3b82f6',
  'Europe': '#22c55e',
  'Asia': '#eab308',
  'South America': '#f97316',
}

const th = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#64748b',
  padding: '8px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #1e293b',
}

const td = {
  padding: '8px 12px',
  fontSize: '13px',
  borderBottom: '1px solid #1e293b',
  fontFamily: 'JetBrains Mono, monospace',
}

export default function SupplierTable({ suppliers }) {
  return (
    <div>
      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Supplier</th>
              <th style={th}>Region</th>
              <th style={{ ...th, textAlign: 'right' }}>Orders</th>
              <th style={{ ...th, textAlign: 'right' }}>On-Time %</th>
              <th style={{ ...th, textAlign: 'right' }}>Avg Lead</th>
              <th style={{ ...th, textAlign: 'right' }}>Spend</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.name}>
                <td style={{ ...td, color: '#f8fafc' }}>{s.name}</td>
                <td style={td}>
                  <span style={{
                    background: REGION_COLORS[s.region] + '20',
                    color: REGION_COLORS[s.region],
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                  }}>
                    {s.region}
                  </span>
                </td>
                <td style={{ ...td, textAlign: 'right' }}>{s.orders}</td>
                <td style={{ ...td, textAlign: 'right', color: s.on_time_pct >= 70 ? '#22c55e' : s.on_time_pct >= 50 ? '#eab308' : '#ef4444' }}>
                  {s.on_time_pct}%
                </td>
                <td style={{ ...td, textAlign: 'right' }}>{s.avg_lead_days}d</td>
                <td style={{ ...td, textAlign: 'right' }}>${(s.spend / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
        <h3 style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
          textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: '0 0 12px 0',
        }}>
          On-Time Rate by Supplier
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={suppliers} layout="vertical" margin={{ top: 0, right: 16, left: 120, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={110} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px' }}
              formatter={v => [`${v}%`, 'On-Time']}
            />
            <Bar dataKey="on_time_pct" barSize={16} radius={[0, 3, 3, 0]}>
              {suppliers.map(s => (
                <Cell key={s.name} fill={REGION_COLORS[s.region]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
