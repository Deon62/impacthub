import { useState } from 'react'
import './DashboardContent.css'

function DashboardContent({ onViewProject, onNavigateToReports }) {
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 10

  // Mock data - replace with actual data later
  const kpiData = {
    activeProjects: 3,
    totalBeneficiaries: 3650,
    fundsReceived: 1530000,
    averageProgress: 70
  }

  const projects = [
    { id: 1, name: 'Clean Water Initiative', sdg: 'SDG 6', sdgNumber: 6, location: 'Rural Kenya', budget: 500000, fundsIn: 350000, progress: 70, status: 'on-track' },
    { id: 2, name: 'Education Access Program', sdg: 'SDG 4', sdgNumber: 4, location: 'Lagos, Nigeria', budget: 750000, fundsIn: 600000, progress: 80, status: 'on-track' },
    { id: 3, name: 'Healthcare Outreach', sdg: 'SDG 3', sdgNumber: 3, location: 'Mumbai, India', budget: 300000, fundsIn: 180000, progress: 60, status: 'at-risk' },
    { id: 4, name: 'Sustainable Agriculture', sdg: 'SDG 2', sdgNumber: 2, location: 'Ghana', budget: 400000, fundsIn: 400000, progress: 100, status: 'completed' },
  ]

  const sdgData = [
    { id: 2, name: 'SDG 2: Zero Hunger', short: 'SDG 2', icon: '2', projects: 1, beneficiaries: 850 },
    { id: 3, name: 'SDG 3: Good Health', short: 'SDG 3', icon: '3', projects: 1, beneficiaries: 1500 },
    { id: 4, name: 'SDG 4: Quality Education', short: 'SDG 4', icon: '4', projects: 1, beneficiaries: 500 },
    { id: 6, name: 'SDG 6: Clean Water', short: 'SDG 6', icon: '6', projects: 1, beneficiaries: 800 },
  ]

  // Mock last report data
  const lastReport = {
    date: '2024-01-15',
    project: 'Clean Water Initiative',
    sdgs: ['SDG 6: Clean Water']
  }

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

  const handleViewProject = (projectId) => {
    // Navigate to project detail page
    onViewProject && onViewProject(projectId)
  }

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const paginatedProjects = projects.slice(startIndex, startIndex + projectsPerPage)

  return (
    <div className="dashboard-content-wrapper">
      {/* Section A: KPI Summary */}
      <section className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.activeProjects}</div>
            <div className="kpi-label">Active Projects</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.totalBeneficiaries.toLocaleString()}</div>
            <div className="kpi-label">Total Beneficiaries</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{formatCurrency(kpiData.fundsReceived)}</div>
            <div className="kpi-label">Funds Received</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.averageProgress}%</div>
            <div className="kpi-label">Avg Project Completion</div>
          </div>
        </div>
      </section>

      {/* Section B: Projects Overview */}
      <section className="projects-section">
        <div className="section-header">
          <h3 className="section-title">Projects</h3>
        </div>
        <div className="table-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>SDG</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Funds In</th>
                <th>Progress %</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => (
                <tr key={project.id} onClick={() => handleViewProject(project.id)}>
                  <td className="project-name">{project.name}</td>
                  <td>
                    <div className="sdg-cell">
                      <span className="sdg-icon-small">{project.sdgNumber}</span>
                      <span className="sdg-text">{project.sdg}</span>
                    </div>
                  </td>
                  <td>{project.location}</td>
                  <td>{formatCurrency(project.budget)}</td>
                  <td>
                    <div className="funds-in-cell">
                      <span className="funds-amount">
                        {formatCurrency(project.fundsIn)} / {formatCurrency(project.budget)}
                      </span>
                      <div className="funds-progress-bar">
                        <div 
                          className="funds-progress-fill" 
                          style={{ width: `${(project.fundsIn / project.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}%</span>
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
                    <button 
                      className="btn-view"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewProject(project.id)
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Section C: SDG Overview */}
      <section className="sdg-section">
        <h3 className="section-title">SDG Overview</h3>
        <div className="sdg-grid">
          {sdgData.map((sdg) => (
            <div key={sdg.id} className="sdg-tile">
              <div className="sdg-header">
                <div className="sdg-icon">{sdg.icon}</div>
                <div className="sdg-name">{sdg.short}</div>
              </div>
              <div className="sdg-stats">
                <div className="sdg-stat">
                  <svg className="sdg-stat-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5H17M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5M3 5V15C3 15.5523 3.44772 16 4 16H16C16.5523 16 17 15.5523 17 15V5M6 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="sdg-stat-value">{sdg.projects}</span>
                </div>
                <div className="sdg-stat">
                  <svg className="sdg-stat-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 17C3 14.2386 5.23858 12 8 12H12C14.7614 12 17 14.2386 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="sdg-stat-value">{sdg.beneficiaries.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section D: Impact Reporting Summary */}
      <section className="reporting-section">
        <div className="reporting-card">
          <div className="reporting-header">
            <h3 className="reporting-title">Impact Reporting</h3>
          </div>
          {lastReport ? (
            <div className="reporting-summary">
              <div className="reporting-info">
                <div className="reporting-info-item">
                  <span className="reporting-label">Last report generated:</span>
                  <span className="reporting-value">{new Date(lastReport.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="reporting-info-item">
                  <span className="reporting-label">Project:</span>
                  <span className="reporting-value">{lastReport.project}</span>
                </div>
                <div className="reporting-info-item">
                  <span className="reporting-label">SDG(s):</span>
                  <span className="reporting-value">{lastReport.sdgs.join(', ')}</span>
                </div>
              </div>
              <div className="reporting-actions">
                <button className="btn-reporting-primary" onClick={() => onNavigateToReports && onNavigateToReports()}>
                  Generate New Report
                </button>
                <button className="btn-reporting-secondary" onClick={() => onNavigateToReports && onNavigateToReports()}>
                  View All Reports
                </button>
              </div>
            </div>
          ) : (
            <div className="reporting-summary">
              <p className="reporting-empty">No reports generated yet.</p>
              <div className="reporting-actions">
                <button className="btn-reporting-primary" onClick={() => onNavigateToReports && onNavigateToReports()}>
                  Generate First Report
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardContent
