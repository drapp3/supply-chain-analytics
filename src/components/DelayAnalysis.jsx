import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import KPICards from './KPICards'

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

export default function DelayAnalysis({ delays, kpis }) {
  const totalDelayed = delays.reduce((s, d) => s + d.count, 0)
  const avgLate = (delays.reduce((s, d) => s + d.avg_days_late * d.count, 0) / totalDelayed).toFixed(1)

  const delayKpis = [
    { label: 'Delayed Orders', value: kpis.delayed.toLocaleString(), color: '#eab308' },
    { label: 'Delay Rate', value: `${((kpis.delayed / kpis.total_orders) * 100).toFixed(1)}%`, color: '#eab308' },
    { label: 'Avg Days Late', value: avgLate, color: '#ef4444' },
    { label: 'Top Cause', value: delays[0]?.reason || '-', color: '#f97316' },
  ]

  return (
    <div>
      <KPICards items={delayKpis} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Delay Frequency by Cause</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={delays} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="reason" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#1e293b' }}
                interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#eab308" barSize={18} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Avg Days Late by Cause</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={delays} layout="vertical" margin={{ top: 0, right: 16, left: 100, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
              <YAxis type="category" dataKey="reason" tick={{ fontSize: 12, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={95} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px' }}
                formatter={v => [`${v} days`, 'Avg Late']}
              />
              <Bar dataKey="avg_days_late" fill="#ef4444" barSize={16} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
