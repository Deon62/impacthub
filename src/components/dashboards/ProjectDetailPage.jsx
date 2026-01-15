import { useState } from 'react'
import './ProjectDetailPage.css'

function ProjectDetailPage({ projectId, onBack, onEdit, onGenerateReport }) {
  const isAdmin = true // TODO: Get from auth context

  // Mock data - replace with actual data later
  const project = {
    id: projectId || 1,
    name: 'Clean Water Initiative',
    primarySDG: 'SDG 6: Clean Water and Sanitation',
    sdgs: ['SDG 6: Clean Water', 'SDG 3: Good Health'],
    status: 'on-track',
    objective: 'Provide clean and safe drinking water to 500 households in rural Kenya through installation of water wells and purification systems.',
    location: 'Rural Kenya',
    coreActivity: 'Installation of water wells and water purification systems in 5 target villages. Community training on well maintenance and water safety practices.',
    intendedOutcome: '500 households gain sustainable access to clean and safe drinking water, reducing waterborne diseases by 30% and improving overall community health.',
    targetBeneficiaries: 500,
    timeline: { start: '2024-01-01', end: '2024-12-31' },
    responsibleTeam: 'Water Access Team',
    budget: 500000,
    fundsReceived: 350000,
    progress: 70,
    beneficiariesReached: 800,
    milestones: [
      {
        id: 1,
        expectedOutcome: '500 households reached',
        progress: 80,
        status: 'in-progress',
        evidenceCount: 3,
        description: 'Install water wells in 5 target villages',
        updates: [
          { date: '2024-01-20', note: 'Completed site surveys in all 5 villages', type: 'progress' },
          { date: '2024-02-15', note: 'Installed 3 wells, 2 remaining', type: 'progress' },
        ],
        evidence: [
          { id: 1, name: 'well_installation_photo.jpg', type: 'image', date: '2024-02-15' },
          { id: 2, name: 'survey_report.pdf', type: 'file', date: '2024-01-20' },
          { id: 3, name: 'community_meeting_notes.txt', type: 'file', date: '2024-01-25' },
        ]
      },
      {
        id: 2,
        expectedOutcome: 'Water quality testing completed',
        progress: 0,
        status: 'not-started',
        evidenceCount: 0,
        description: 'Test water quality from all installed wells',
      },
      {
        id: 3,
        expectedOutcome: 'Community training sessions conducted',
        progress: 100,
        status: 'completed',
        evidenceCount: 2,
        description: 'Train community members on well maintenance',
        updates: [
          { date: '2024-01-10', note: 'Completed training for 200 community members', type: 'completion' },
        ],
        evidence: [
          { id: 4, name: 'training_photo.jpg', type: 'image', date: '2024-01-10' },
          { id: 5, name: 'training_attendance.pdf', type: 'file', date: '2024-01-10' },
        ]
      },
    ],
    donations: [
      { id: 1, date: '2024-01-15', funderName: 'Water for All', amount: 30000, status: 'received' },
      { id: 2, date: '2024-02-01', funderName: 'Clean Water Foundation', amount: 50000, status: 'received' },
      { id: 3, date: '2024-02-20', funderName: 'Global Health Fund', amount: 20000, status: 'pending' },
    ],
    sdgAlignment: [
      { id: 6, name: 'SDG 6: Clean Water', description: 'Ensure availability and sustainable management of water and sanitation for all' },
      { id: 3, name: 'SDG 3: Good Health', description: 'Ensure healthy lives and promote well-being for all at all ages' },
    ],
    impactSummary: 'This project has successfully provided clean water access to 800 households across 5 rural villages in Kenya. Through the installation of 5 water wells and comprehensive community training, we have improved water quality and reduced waterborne diseases by 60%. The project is on track to reach its target of 500 households by the end of 2024.',
    activityLog: [
      { id: 1, type: 'milestone', action: 'Milestone updated', details: '500 households reached - Progress: 80%', date: '2024-02-15T10:30:00' },
      { id: 2, type: 'evidence', action: 'Evidence uploaded', details: 'well_installation_photo.jpg', date: '2024-02-15T09:15:00' },
      { id: 3, type: 'donation', action: 'Donation received', details: '$50,000 from Clean Water Foundation', date: '2024-02-01T14:20:00' },
      { id: 4, type: 'report', action: 'Report generated', details: 'Q1 2024 Impact Summary', date: '2024-01-20T11:00:00' },
    ],
  }

  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)

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

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
      case 'completed':
      case 'in-progress':
        return '#6BBF59'
      case 'at-risk':
        return '#F59E0B'
      case 'not-started':
        return '#6B7280'
      default:
        return '#6B7280'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on-track':
        return 'On Track'
      case 'at-risk':
        return 'At Risk'
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'not-started':
        return 'Not Started'
      default:
        return status
    }
  }

  const handleViewMilestone = (milestone) => {
    setSelectedMilestone(milestone)
    setShowMilestoneModal(true)
  }

  const handleGenerateReport = () => {
    // Navigate to report generation
    onGenerateReport && onGenerateReport(project.id)
  }

  const handleCopySummary = () => {
    navigator.clipboard.writeText(project.impactSummary)
    alert('Impact summary copied to clipboard')
  }

  const handleDownloadPDF = () => {
    // TODO: Download PDF
    alert('PDF download functionality will be implemented')
  }

  const handleRegenerateSummary = () => {
    // TODO: Regenerate summary
    alert('Impact summary regeneration will be implemented')
  }

  const totalDonations = project.donations.reduce((sum, d) => sum + d.amount, 0)
  const receivedDonations = project.donations
    .filter(d => d.status === 'received')
    .reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="project-detail-page">
      {/* Section 1: Page Header (Sticky) */}
      <div className="project-header sticky-header">
        <div className="header-left">
          <h1 className="project-title">{project.name}</h1>
          <div className="sdg-tags-header">
            {project.sdgs.slice(0, 3).map((sdg, index) => (
              <span key={index} className="sdg-tag-header">{sdg}</span>
            ))}
            {project.sdgs.length > 3 && (
              <span className="sdg-tag-header">+{project.sdgs.length - 3} more</span>
            )}
          </div>
          <span 
            className="status-badge-header" 
            style={{ color: getStatusColor(project.status) }}
          >
            {getStatusLabel(project.status)}
          </span>
        </div>
        <div className="header-actions">
          <button className="btn-primary-header" onClick={handleGenerateReport}>
            Generate Impact Summary
          </button>
          {isAdmin && (
            <button className="btn-secondary-header" onClick={() => onEdit && onEdit(project.id)}>
              Edit Project
            </button>
          )}
        </div>
      </div>

      <div className="project-content">
        {/* Section 2: Project Overview */}
        <section className="project-section">
          <div className="overview-grid">
            <div className="overview-left">
              <h2 className="section-title">Project Overview</h2>
              <div className="info-group">
                <div className="info-item">
                  <span className="info-label">Primary SDG</span>
                  <span className="info-value">{project.primarySDG || project.sdgs[0]}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{project.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Core Activity</span>
                  <p className="info-value-text">{project.coreActivity || project.objective}</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Intended Outcome</span>
                  <p className="info-value-text">{project.intendedOutcome || 'Not specified'}</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Target Beneficiaries</span>
                  <span className="info-value">{project.targetBeneficiaries ? project.targetBeneficiaries.toLocaleString() : 'Not specified'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Timeline</span>
                  <span className="info-value">{formatDate(project.timeline.start)} → {formatDate(project.timeline.end)}</span>
                </div>
                {project.responsibleTeam && (
                  <div className="info-item">
                    <span className="info-label">Responsible Team</span>
                    <span className="info-value">{project.responsibleTeam}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="overview-right">
              <h2 className="section-title">Key Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Budget</div>
                  <div className="metric-value">{formatCurrency(project.budget)}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Funds Received</div>
                  <div className="metric-value">{formatCurrency(project.fundsReceived)}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Progress</div>
                  <div className="metric-value">{project.progress}%</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Beneficiaries Reached</div>
                  <div className="metric-value">{project.beneficiariesReached.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Financials */}
        <section className="project-section">
          <h2 className="section-title">Funding Overview</h2>
          <div className="funding-bar-container">
            <div className="funding-bar">
              <div 
                className="funding-bar-fill" 
                style={{ width: `${(receivedDonations / project.budget) * 100}%` }}
              ></div>
            </div>
            <div className="funding-stats">
              <span>{formatCurrency(receivedDonations)} received</span>
              <span>of {formatCurrency(project.budget)} budget</span>
            </div>
          </div>
          {project.donations.length > 0 ? (
            <div className="table-container">
              <table className="donations-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Funder</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {project.donations.map((donation) => (
                    <tr key={donation.id}>
                      <td>{formatDate(donation.date)}</td>
                      <td>{donation.funderName}</td>
                      <td className="amount-cell">{formatCurrency(donation.amount)}</td>
                      <td>
                        <span className={`status-badge ${donation.status === 'received' ? 'status-received' : 'status-pending'}`}>
                          {donation.status === 'received' ? 'Received' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="total-label">Total</td>
                    <td className="total-amount">{formatCurrency(totalDonations)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-message">No donations recorded yet.</p>
            </div>
          )}
        </section>

        {/* Section 4: Milestones */}
        <section className="project-section">
          <h2 className="section-title">Milestones & Evidence</h2>
          {project.milestones.length > 0 ? (
            <div className="milestones-list">
              {project.milestones.map((milestone) => (
                <div key={milestone.id} className="milestone-card">
                  <div className="milestone-header">
                    <div className="milestone-info">
                      <h3 className="milestone-outcome">{milestone.expectedOutcome}</h3>
                      <p className="milestone-description">{milestone.description}</p>
                    </div>
                    <div className="milestone-status">
                      <span 
                        className="milestone-status-badge"
                        style={{ color: getStatusColor(milestone.status) }}
                      >
                        {getStatusLabel(milestone.status)}
                      </span>
                    </div>
                  </div>
                  <div className="milestone-progress">
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{milestone.progress}%</span>
                  </div>
                  <div className="milestone-footer">
                    <span className="evidence-count">{milestone.evidenceCount} evidence items</span>
                    <div className="milestone-actions">
                      <button 
                        className="btn-view-milestone"
                        onClick={() => handleViewMilestone(milestone)}
                      >
                        View Details
                      </button>
                      {isAdmin && (
                        <>
                          <button className="btn-update-milestone">Update Progress</button>
                          <button className="btn-upload-evidence">Upload Evidence</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-message">No milestones added yet.</p>
              {isAdmin && (
                <button className="btn-primary">Add First Milestone</button>
              )}
            </div>
          )}
        </section>

        {/* Section 5: SDG Alignment */}
        <section className="project-section">
          <h2 className="section-title">SDG Alignment</h2>
          <div className="sdg-alignment-grid">
            {project.sdgAlignment.map((sdg) => (
              <div key={sdg.id} className="sdg-alignment-card">
                <div className="sdg-alignment-icon">{sdg.id}</div>
                <div className="sdg-alignment-info">
                  <h3 className="sdg-alignment-name">{sdg.name}</h3>
                  {sdg.description && (
                    <p className="sdg-alignment-description">{sdg.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Impact Summary */}
        <section className="project-section">
          <h2 className="section-title">Impact Summary</h2>
          <div className="impact-summary-card">
            <div className="impact-summary-text">
              {project.impactSummary}
            </div>
            <div className="impact-summary-actions">
              <button className="btn-summary" onClick={handleCopySummary}>
                Copy text
              </button>
              <button className="btn-summary" onClick={handleDownloadPDF}>
                Download PDF
              </button>
              <button className="btn-summary" onClick={handleRegenerateSummary}>
                Regenerate
              </button>
            </div>
          </div>
        </section>

        {/* Section 7: Activity Log */}
        <section className="project-section">
          <h2 className="section-title">Activity Log</h2>
          <div className="activity-list">
            {project.activityLog.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.type === 'milestone' ? '📋' : activity.type === 'evidence' ? '📎' : activity.type === 'donation' ? '💰' : '📄'}</div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-details">{activity.details}</div>
                </div>
                <div className="activity-date">{formatDateTime(activity.date)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Milestone Detail Modal */}
      {showMilestoneModal && selectedMilestone && (
        <div className="modal-overlay" onClick={() => setShowMilestoneModal(false)}>
          <div className="modal-content milestone-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Milestone Details</h3>
              <button className="modal-close" onClick={() => setShowMilestoneModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="milestone-detail-section">
                <h4 className="detail-section-title">Expected Outcome</h4>
                <p>{selectedMilestone.expectedOutcome}</p>
              </div>
              <div className="milestone-detail-section">
                <h4 className="detail-section-title">Description</h4>
                <p>{selectedMilestone.description}</p>
              </div>
              <div className="milestone-detail-section">
                <h4 className="detail-section-title">Progress</h4>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${selectedMilestone.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{selectedMilestone.progress}%</span>
              </div>
              {selectedMilestone.updates && selectedMilestone.updates.length > 0 && (
                <div className="milestone-detail-section">
                  <h4 className="detail-section-title">Progress Updates</h4>
                  <div className="updates-list">
                    {selectedMilestone.updates.map((update, index) => (
                      <div key={index} className="update-item">
                        <div className="update-date">{formatDate(update.date)}</div>
                        <div className="update-note">{update.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedMilestone.evidence && selectedMilestone.evidence.length > 0 && (
                <div className="milestone-detail-section">
                  <h4 className="detail-section-title">Evidence</h4>
                  <div className="evidence-list">
                    {selectedMilestone.evidence.map((item) => (
                      <div key={item.id} className="evidence-item">
                        <span className="evidence-icon">{item.type === 'image' ? '🖼️' : '📄'}</span>
                        <span className="evidence-name">{item.name}</span>
                        <span className="evidence-date">{formatDate(item.date)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowMilestoneModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetailPage
