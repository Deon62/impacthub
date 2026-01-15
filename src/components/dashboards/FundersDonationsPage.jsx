import './FundersDonationsPage.css'

function FundersDonationsPage() {
  // Mock data - replace with actual data later
  const donations = [
    { id: 1, date: '2024-01-15', project: 'Healthcare Outreach', amount: 50000, status: 'received' },
    { id: 2, date: '2024-01-10', project: 'Education Access Program', amount: 75000, status: 'received' },
    { id: 3, date: '2024-01-05', project: 'Clean Water Initiative', amount: 30000, status: 'pledged' },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="funders-donations-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Donations</h1>
          <p className="page-subtitle">Donation history, amounts, and status</p>
        </div>
      </div>

      <div className="table-container">
        <table className="donations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{formatDate(donation.date)}</td>
                <td>{donation.project}</td>
                <td className="amount-cell">{formatCurrency(donation.amount)}</td>
                <td>
                  <span 
                    className={`status-badge ${donation.status === 'received' ? 'status-received' : 'status-pledged'}`}
                  >
                    {donation.status === 'received' ? 'Received' : 'Pledged'}
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
