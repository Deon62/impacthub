import './FundersDashboardContent.css'

function FundersDashboardContent({ onViewAllProjects, onViewAllDonations, onViewAllReports }) {
  // Helper function to extract SDG descriptive name from full name
  const getSDGName = (fullName) => {
    const match = fullName.match(/SDG \d+: (.+)/)
    return match ? match[1] : fullName
  }

  // Mock data - replace with actual data later
  const kpiData = {
    activeFundedProjects: 4,
    totalFundsContributed: 1250000,
    totalBeneficiariesReached: 3650,
    averageProjectProgress: 75
  }

  const fundedProjects = [
    { id: 1, name: 'Clean Water Initiative', ngoName: 'Water for All', sdg: 'SDG 6: Clean Water', sdgNumber: 6, fundsContributed: 350000, budget: 500000, progress: 70, status: 'on-track' },
    { id: 2, name: 'Education Access Program', ngoName: 'Education First', sdg: 'SDG 4: Quality Education', sdgNumber: 4, fundsContributed: 600000, budget: 750000, progress: 80, status: 'on-track' },
    { id: 3, name: 'Healthcare Outreach', ngoName: 'Health Matters', sdg: 'SDG 3: Good Health', sdgNumber: 3, fundsContributed: 180000, budget: 300000, progress: 60, status: 'at-risk' },
    { id: 4, name: 'Sustainable Agriculture', ngoName: 'Farm Forward', sdg: 'SDG 2: Zero Hunger', sdgNumber: 2, fundsContributed: 400000, budget: 400000, progress: 100, status: 'completed' },
  ]

  const impactSnapshot = [
    { id: 2, name: 'SDG 2: Zero Hunger', icon: '2', projects: 1, beneficiaries: 850 },
    { id: 3, name: 'SDG 3: Good Health', icon: '3', projects: 1, beneficiaries: 1500 },
    { id: 4, name: 'SDG 4: Quality Education', icon: '4', projects: 1, beneficiaries: 500 },
    { id: 6, name: 'SDG 6: Clean Water', icon: '6', projects: 1, beneficiaries: 800 },
  ]

  const recentDonations = [
    { id: 1, date: '2024-01-15', project: 'Healthcare Outreach', amount: 50000, status: 'received' },
    { id: 2, date: '2024-01-10', project: 'Education Access Program', amount: 75000, status: 'received' },
    { id: 3, date: '2024-01-05', project: 'Clean Water Initiative', amount: 30000, status: 'pledged' },
  ]

  const lastReport = {
    date: '2024-01-15',
    project: 'Clean Water Initiative',
    format: 'PDF'
  }

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
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return '#6BBF59'
      case 'at-risk':
        return '#F59E0B'
      case 'completed':
        return '#6B7280'
      default:
        return '#6B7280'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on-track':
        return 'On track'
      case 'at-risk':
        return 'At risk'
      case 'completed':
        return 'Completed'
      default:
        return status
    }
  }

  return (
    <div className="funders-dashboard-content">
      {/* Section 1: Top KPI Cards */}
      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.activeFundedProjects}</div>
            <div className="kpi-label">Active Funded Projects</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{formatCurrency(kpiData.totalFundsContributed)}</div>
            <div className="kpi-label">Total Funds Contributed</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.totalBeneficiariesReached.toLocaleString()}</div>
            <div className="kpi-label">Total Beneficiaries Reached</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.averageProjectProgress}%</div>
            <div className="kpi-label">Average Project Progress</div>
          </div>
        </div>
      </section>

      {/* Section 2: Funded Projects Table */}
      <section className="funded-projects-section">
        <div className="section-header">
          <h3 className="section-title">Funded Projects</h3>
        </div>
        <div className="table-container">
          <table className="funded-projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>NGO Name</th>
                <th>SDG</th>
                <th>Funds Contributed</th>
                <th>Budget Utilization</th>
                <th>Progress %</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fundedProjects.map((project) => (
                <tr key={project.id}>
                  <td className="project-name">{project.name}</td>
                  <td>{project.ngoName}</td>
                  <td>
                    <div className="sdg-cell">
                      <span className="sdg-icon-small">{project.sdgNumber}</span>
                      <span className="sdg-text">{getSDGName(project.sdg)}</span>
                    </div>
                  </td>
                  <td>{formatCurrency(project.fundsContributed)}</td>
                  <td>
                    <div className="budget-utilization-cell">
                      <span className="budget-text">
                        {formatCurrency(project.fundsContributed)} / {formatCurrency(project.budget)}
                      </span>
                      <div className="budget-progress-bar">
                        <div 
                          className="budget-progress-fill" 
                          style={{ width: `${(project.fundsContributed / project.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <span className="progress-text">{project.progress}%</span>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ 
                        backgroundColor: getStatusColor(project.status) === '#6BBF59' ? '#F0FDF4' : 
                                       getStatusColor(project.status) === '#F59E0B' ? '#FFFBEB' : '#F7F9FC',
                        color: getStatusColor(project.status)
                      }}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </td>
                  <td>
                    <button className="btn-view">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Impact Snapshot */}
      <section className="impact-snapshot-section">
        <h3 className="section-title">Impact Snapshot</h3>
        <div className="impact-snapshot-grid">
          {impactSnapshot.map((sdg) => (
            <div key={sdg.id} className="impact-snapshot-tile">
              <div className="snapshot-sdg-header">
                <div className="snapshot-sdg-icon">{sdg.icon}</div>
                <div className="snapshot-sdg-name">{getSDGName(sdg.name)}</div>
              </div>
              <div className="snapshot-stats">
                <div className="snapshot-stat">
                  <span className="snapshot-stat-label">Projects</span>
                  <span className="snapshot-stat-value">{sdg.projects}</span>
                </div>
                <div className="snapshot-stat">
                  <span className="snapshot-stat-label">Beneficiaries</span>
                  <span className="snapshot-stat-value">{sdg.beneficiaries.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Recent Donations & Impact Reports */}
      <div className="bottom-sections-grid">
        {/* Section 4a: Recent Donations */}
        <section className="recent-donations-section">
          <div className="section-header">
            <h3 className="section-title">Recent Donations</h3>
          </div>
          <div className="donations-list">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="donation-item">
                <div className="donation-date">{formatDate(donation.date)}</div>
                <div className="donation-project">{donation.project}</div>
                <div className="donation-amount">{formatCurrency(donation.amount)}</div>
                <div className="donation-status">
                  <span 
                    className={`status-badge ${donation.status === 'received' ? 'status-received' : 'status-pledged'}`}
                  >
                    {donation.status === 'received' ? 'Received' : 'Pledged'}
                  </span>
                </div>
              </div>
            ))}
            <div className="view-all-link">
              <button className="btn-link" onClick={onViewAllDonations}>
                View All Donations →
              </button>
            </div>
          </div>
        </section>

        {/* Section 4b: Impact Reports */}
        <section className="impact-reports-section">
          <div className="section-header">
            <h3 className="section-title">Impact Reports</h3>
          </div>
          {lastReport ? (
            <div className="report-card">
              <div className="report-info">
                <div className="report-project">{lastReport.project}</div>
                <div className="report-date">{formatDate(lastReport.date)}</div>
                <div className="report-format">Format: {lastReport.format}</div>
              </div>
              <div className="report-actions">
                <button className="btn-primary-small">Download Latest Report</button>
                <button className="btn-secondary-small" onClick={onViewAllReports}>
                  View All Reports
                </button>
              </div>
            </div>
          ) : (
            <div className="report-card">
              <p className="no-report-text">No reports generated yet.</p>
              <button className="btn-primary-small">Generate First Report</button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default FundersDashboardContent
