export default function KPICards({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '16px' }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          padding: '14px 16px',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
            marginBottom: '6px',
          }}>
            {item.label}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '22px',
            fontWeight: 500,
            color: item.color || '#f8fafc',
          }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
