import './FundersDonationsPage.css'

// Simple SVG Donut Chart Component
function DonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const colors = ['#059669', '#2563eb', '#f59e0b', '#dc2626', '#8b5cf6']

  let cumulativeAngle = 0
  const segments = data.map((item, index) => {
    const sliceAngle = (item.value / total) * 360
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + sliceAngle
    cumulativeAngle = endAngle

    // Convert to radians
    const start = (startAngle - 90) * (Math.PI / 180)
    const end = (endAngle - 90) * (Math.PI / 180)

    const outerRadius = 60
    const innerRadius = 40

    // Start point
    const x1 = Math.cos(start) * outerRadius
    const y1 = Math.sin(start) * outerRadius

    // End point
    const x2 = Math.cos(end) * outerRadius
    const y2 = Math.sin(end) * outerRadius

    // Inner arc points
    const x3 = Math.cos(end) * innerRadius
    const y3 = Math.sin(end) * innerRadius

    const x4 = Math.cos(start) * innerRadius
    const y4 = Math.sin(start) * innerRadius

    const largeArc = sliceAngle > 180 ? 1 : 0

    const pathData = `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `

    return {
      path: pathData,
      color: colors[index % colors.length],
      label: item.label,
      value: item.value,
      percentage: ((item.value / total) * 100).toFixed(1),
    }
  })

  return (
    <div className="donut-chart-wrapper">
      <svg viewBox="-100 -100 200 200" className="donut-chart">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.path}
            fill={segment.color}
            className="donut-segment"
          />
        ))}
      </svg>
      <div className="donut-legend">
        {segments.map((segment, index) => (
          <div key={index} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: segment.color }}></span>
            <div className="legend-text">
              <p className="legend-label">{segment.label}</p>
              <p className="legend-value">{segment.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple SVG Line Chart Component
function LineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
        No data available
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const padding = 40
  const width = 400
  const height = 200
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth + padding
    const y = height - padding - (item.value / maxValue) * chartHeight
    return { x, y, ...item }
  })

  // Create line path
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  // Create grid lines
  const gridLines = []
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i * chartHeight) / 4
    gridLines.push(
      <line key={`grid-${i}`} x1={padding} y1={y} x2={width - padding} y2={y} className="chart-grid-line" />
    )
  }

  // Y-axis labels
  const yLabels = []
  for (let i = 0; i <= 4; i++) {
    const value = (maxValue * (4 - i)) / 4
    const y = padding + (i * chartHeight) / 4
    yLabels.push(
      <text key={`y-label-${i}`} x={padding - 15} y={y + 4} className="chart-label">
        ${(value / 1000).toFixed(0)}k
      </text>
    )
  }

  return (
    <div className="line-chart-wrapper">
      <svg width={width} height={height} className="line-chart">
        {/* Grid */}
        {gridLines}

        {/* Y-axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} className="chart-axis" />

        {/* X-axis */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="chart-axis" />

        {/* Y-axis labels */}
        {yLabels}

        {/* X-axis labels */}
        {points.map((point, index) => (
          <text key={`x-label-${index}`} x={point.x} y={height - padding + 20} className="chart-label" textAnchor="middle">
            {point.date}
          </text>
        ))}

        {/* Line */}
        <path d={linePath} className="chart-line" />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={`point-${index}`}>
            <circle cx={point.x} cy={point.y} r={3} className="chart-point" />
            <title>{`${point.date}: $${(point.value / 1000).toFixed(0)}k`}</title>
          </g>
        ))}
      </svg>
    </div>
  )
}

function FundersDonationsPage({ onNewDonation }) {
  const donations = [
    {
      id: 1,
      date: '2024-01-15',
      project: 'Healthcare Outreach',
      ngo: 'HealthAid',
      amount: 50000,
      type: 'One-time',
      status: 'received',
    },
    {
      id: 2,
      date: '2024-01-10',
      project: 'Education Access Program',
      ngo: 'EduFirst',
      amount: 75000,
      type: 'One-time',
      status: 'received',
    },
    {
      id: 3,
      date: '2024-01-05',
      project: 'Clean Water Initiative',
      ngo: 'WaterForAll',
      amount: 30000,
      type: 'Pledge',
      status: 'pledged',
    },
  ]

  const totalContributed = donations
    .filter(d => d.status === 'received')
    .reduce((sum, d) => sum + d.amount, 0)

  const totalPending = donations
    .filter(d => d.status === 'pledged')
    .reduce((sum, d) => sum + d.amount, 0)

  const activePledges = donations.filter(d => d.status === 'pledged').length

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  // Calculate funds allocation by project
  const projectAllocation = donations.reduce((acc, donation) => {
    const existing = acc.find(p => p.label === donation.project)
    if (existing) {
      existing.value += donation.amount
    } else {
      acc.push({ label: donation.project, value: donation.amount })
    }
    return acc
  }, [])

  // Calculate donations over time (6 points covering 12 months)
  const monthlyData = [
    { date: 'Jan', value: 50000 },
    { date: 'Mar', value: 75000 },
    { date: 'May', value: 120000 },
    { date: 'Jul', value: 95000 },
    { date: 'Sep', value: 155000 },
    { date: 'Nov', value: 125000 },
  ]

  return (
    <div className="funders-donations-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Donations</h1>
          <p className="page-subtitle">
            Track and manage your funding contributions
          </p>
        </div>

        <button className="primary-button" onClick={onNewDonation}>
          New Donation / Pledge
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <p className="card-label">Total Contributed</p>
          <p className="card-value">{formatCurrency(totalContributed)}</p>
        </div>

        <div className="summary-card">
          <p className="card-label">Active Pledges</p>
          <p className="card-value">{activePledges}</p>
        </div>

        <div className="summary-card">
          <p className="card-label">Funds Pending</p>
          <p className="card-value">{formatCurrency(totalPending)}</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="charts-container">
        <div className="chart-card">
          <h3>Funds Allocation by Project</h3>
          <DonutChart data={projectAllocation} />
        </div>

        <div className="chart-card">
          <h3>Donations Over Time</h3>
          <LineChart data={monthlyData} />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="donations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>NGO</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id}>
                <td>{formatDate(d.date)}</td>
                <td>{d.project}</td>
                <td>{d.ngo}</td>
                <td>{d.type}</td>
                <td className="amount-cell">
                  {formatCurrency(d.amount)}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      d.status === 'received'
                        ? 'status-received'
                        : 'status-pledged'
                    }`}
                  >
                    {d.status === 'received' ? 'Received' : 'Pledged'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FundersDonationsPage
