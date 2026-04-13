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

export default function InventoryView({ warehouses, alerts }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {warehouses.map(w => (
          <div key={w.name} style={cardStyle}>
            <div style={{ ...sectionHeader, marginBottom: '4px' }}>{w.name}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>{w.location}</div>
            <div style={{ position: 'relative', width: '64px', height: '64px', margin: '0 auto 10px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none"
                  stroke={w.utilization_pct > 80 ? '#ef4444' : w.utilization_pct > 50 ? '#eab308' : '#22c55e'}
                  strokeWidth="3" strokeDasharray={`${w.utilization_pct} ${100 - w.utilization_pct}`} strokeLinecap="round" />
              </svg>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 500,
              }}>
                {w.utilization_pct}%
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
              {w.stock.toLocaleString()} / {w.capacity.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div style={cardStyle}>
        <h3 style={sectionHeader}>Reorder Alerts ({alerts.length})</h3>
        {alerts.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '13px' }}>No items below reorder point</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Product', 'Warehouse', 'Stock', 'Reorder Pt', 'Gap', 'Severity'].map(h => (
                  <th key={h} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', textTransform: 'uppercase',
                    letterSpacing: '0.05em', color: '#64748b', padding: '8px 12px', textAlign: 'left',
                    borderBottom: '1px solid #1e293b',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((a, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{a.product}</td>
                  <td style={tdStyle}>{a.warehouse}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{a.stock}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>{a.reorder_point}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', color: '#ef4444' }}>{a.gap}</td>
                  <td style={tdStyle}>
                    <span style={{
                      background: a.alert_level === 'Critical' ? '#ef444420' : '#eab30820',
                      color: a.alert_level === 'Critical' ? '#ef4444' : '#eab308',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {a.alert_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const tdStyle = {
  padding: '8px 12px',
  fontSize: '13px',
  borderBottom: '1px solid #1e293b',
  fontFamily: 'JetBrains Mono, monospace',
  color: '#e2e8f0',
}
