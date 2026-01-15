import './FundedProjectsPage.css'

function FundedProjectsPage() {
  // Mock data - replace with actual data later
  const projects = [
    { id: 1, name: 'Clean Water Initiative', sdg: 'SDG 6', location: 'Rural Kenya', fundsDeployed: 350000, status: 'on-track', progress: 70 },
    { id: 2, name: 'Education Access Program', sdg: 'SDG 4', location: 'Lagos, Nigeria', fundsDeployed: 600000, status: 'on-track', progress: 80 },
    { id: 3, name: 'Healthcare Outreach', sdg: 'SDG 3', location: 'Mumbai, India', fundsDeployed: 180000, status: 'at-risk', progress: 60 },
    { id: 4, name: 'Sustainable Agriculture', sdg: 'SDG 2', location: 'Ghana', fundsDeployed: 400000, status: 'completed', progress: 100 },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
    <div className="funded-projects-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Funded Projects</h1>
          <p className="page-subtitle">List of projects this funder has contributed to</p>
        </div>
      </div>

      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>SDG</th>
              <th>Location</th>
              <th>Funds Deployed</th>
              <th>Progress %</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="project-name">{project.name}</td>
                <td>{project.sdg}</td>
                <td>{project.location}</td>
                <td>{formatCurrency(project.fundsDeployed)}</td>
                <td>
                  <div className="progress-cell">
                    <span>{project.progress}%</span>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${project.progress}%` }}></div>
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
    </div>
  )
}

export default FundedProjectsPage
