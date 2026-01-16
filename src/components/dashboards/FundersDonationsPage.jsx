import './FundersDonationsPage.css'

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
          <div className="chart-placeholder">
            Donut chart placeholder
          </div>
        </div>

        <div className="chart-card">
          <h3>Donations Over Time</h3>
          <div className="chart-placeholder">
            Line chart placeholder
          </div>
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
