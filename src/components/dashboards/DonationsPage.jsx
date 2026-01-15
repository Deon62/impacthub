import { useState } from 'react'
import './DonationsPage.css'

function DonationsPage() {
  const [showPledgeModal, setShowPledgeModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAllDonations, setShowAllDonations] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const donationsPerPage = 15
  const summaryDonationsCount = 5
  
  // TODO: Get from auth context
  const userRole = 'ngo' // 'ngo' or 'funder'
  const userRoleType = 'admin' // 'admin' or 'staff' (for NGO)
  const currentUserId = 'user-1' // Current user ID
  const currentFunderId = 'funder-1' // Current funder ID (if funder)
  const currentOrgId = 'org-1' // Current organization ID (if NGO)

  // Mock data - replace with actual data later
  // Spread donations across last 6 months for graph visualization
  const now = new Date()
  const allDonations = [
    // 6 months ago
    { id: 1, date: new Date(now.getFullYear(), now.getMonth() - 5, 15).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Global Health Foundation', projectId: 3, project: 'Healthcare Outreach', amount: 40000, status: 'received', notes: 'Q1 funding allocation' },
    { id: 2, date: new Date(now.getFullYear(), now.getMonth() - 5, 20).toISOString().split('T')[0], funderId: 'funder-2', funderName: 'Education First', projectId: 2, project: 'Education Access Program', amount: 60000, status: 'received', notes: '' },
    
    // 5 months ago
    { id: 3, date: new Date(now.getFullYear(), now.getMonth() - 4, 10).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Water for All', projectId: 1, project: 'Clean Water Initiative', amount: 35000, status: 'received', notes: 'Monthly contribution' },
    { id: 4, date: new Date(now.getFullYear(), now.getMonth() - 4, 25).toISOString().split('T')[0], funderId: 'funder-3', funderName: 'Sustainable Future Fund', projectId: 4, project: 'Sustainable Agriculture', amount: 80000, status: 'received', notes: 'Multi-year commitment' },
    
    // 4 months ago
    { id: 5, date: new Date(now.getFullYear(), now.getMonth() - 3, 5).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Global Health Foundation', projectId: 3, project: 'Healthcare Outreach', amount: 45000, status: 'received', notes: 'Q2 allocation' },
    { id: 6, date: new Date(now.getFullYear(), now.getMonth() - 3, 18).toISOString().split('T')[0], funderId: 'funder-2', funderName: 'Education First', projectId: 2, project: 'Education Access Program', amount: 55000, status: 'received', notes: '' },
    
    // 3 months ago
    { id: 7, date: new Date(now.getFullYear(), now.getMonth() - 2, 12).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Water for All', projectId: 1, project: 'Clean Water Initiative', amount: 30000, status: 'received', notes: 'Monthly contribution' },
    { id: 8, date: new Date(now.getFullYear(), now.getMonth() - 2, 28).toISOString().split('T')[0], funderId: 'funder-4', funderName: 'Community Impact Fund', projectId: 2, project: 'Education Access Program', amount: 70000, status: 'received', notes: 'Special grant' },
    
    // 2 months ago
    { id: 9, date: new Date(now.getFullYear(), now.getMonth() - 1, 8).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Global Health Foundation', projectId: 3, project: 'Healthcare Outreach', amount: 50000, status: 'received', notes: 'Q3 allocation' },
    { id: 10, date: new Date(now.getFullYear(), now.getMonth() - 1, 22).toISOString().split('T')[0], funderId: 'funder-3', funderName: 'Sustainable Future Fund', projectId: 4, project: 'Sustainable Agriculture', amount: 90000, status: 'received', notes: 'Quarterly payment' },
    
    // 1 month ago (current month)
    { id: 11, date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString().split('T')[0], funderId: 'funder-2', funderName: 'Education First', projectId: 2, project: 'Education Access Program', amount: 65000, status: 'received', notes: '' },
    { id: 12, date: new Date(now.getFullYear(), now.getMonth(), 15).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Water for All', projectId: 1, project: 'Clean Water Initiative', amount: 30000, status: 'pledged', notes: 'Expected by end of month' },
    { id: 13, date: new Date(now.getFullYear(), now.getMonth(), 20).toISOString().split('T')[0], funderId: 'funder-1', funderName: 'Global Health Foundation', projectId: 3, project: 'Healthcare Outreach', amount: 25000, status: 'pledged', notes: 'Q4 pledge' },
  ]

  // Filter donations based on role
  const getFilteredDonations = () => {
    if (userRole === 'funder') {
      // Funders can only see their own donations
      return allDonations.filter(d => d.funderId === currentFunderId)
    } else {
      // NGOs can only see donations for their projects
      // TODO: Get organization's project IDs from context
      const orgProjectIds = [1, 2, 3, 4] // Mock: all projects belong to this org
      return allDonations.filter(d => orgProjectIds.includes(d.projectId))
    }
  }

  const donations = getFilteredDonations()

  const projects = [
    { id: 1, name: 'Clean Water Initiative' },
    { id: 2, name: 'Education Access Program' },
    { id: 3, name: 'Healthcare Outreach' },
    { id: 4, name: 'Sustainable Agriculture' },
  ]

  const summaryData = {
    totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
    thisMonth: donations
      .filter(d => {
        const donationDate = new Date(d.date)
        const now = new Date()
        return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, d) => sum + d.amount, 0),
    activeFunders: userRole === 'ngo' 
      ? new Set(donations.map(d => d.funderName)).size 
      : 1, // Funders only count themselves
  }

  const canCreatePledge = userRole === 'funder'
  const canConfirmReceipt = userRole === 'ngo' && userRoleType === 'admin'
  const isReadOnly = userRole === 'ngo' && userRoleType === 'staff'

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

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation)
    setShowViewModal(true)
  }

  const handleCreatePledge = () => {
    setShowPledgeModal(true)
  }

  const handleConfirmReceipt = (donation) => {
    setSelectedDonation(donation)
    setShowConfirmModal(true)
  }

  const handleCloseModals = () => {
    setShowPledgeModal(false)
    setShowViewModal(false)
    setShowConfirmModal(false)
    setSelectedDonation(null)
  }

  const handleSubmitPledge = (e) => {
    e.preventDefault()
    // TODO: Submit pledge to backend
    console.log('Submit pledge')
    handleCloseModals()
  }

  const handleConfirmReceiptSubmit = () => {
    // TODO: Update donation status to 'received' in backend
    console.log('Confirm receipt for donation:', selectedDonation.id)
    handleCloseModals()
  }

  // Summary view: show only first few donations
  const summaryDonations = donations
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, summaryDonationsCount)

  // Full view: paginated donations
  const totalPages = Math.ceil(donations.length / donationsPerPage)
  const startIndex = (currentPage - 1) * donationsPerPage
  const paginatedDonations = donations
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(startIndex, startIndex + donationsPerPage)

  const displayDonations = showAllDonations ? paginatedDonations : summaryDonations

  // Get last 6 months of donation data for graph
  const getLast6MonthsData = () => {
    const months = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      
      const monthTotal = donations
        .filter(d => {
          const donationDate = new Date(d.date)
          return donationDate.getFullYear() === date.getFullYear() && 
                 donationDate.getMonth() === date.getMonth()
        })
        .reduce((sum, d) => sum + d.amount, 0)
      
      months.push({ month: monthLabel, amount: monthTotal })
    }
    return months
  }

  const monthlyData = getLast6MonthsData()
  const maxAmount = Math.max(...monthlyData.map(m => m.amount), 1)
  

  return (
    <div className="donations-page">
      {/* Section A: Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Donations</h1>
          <p className="page-subtitle">
            {userRole === 'funder' 
              ? 'Manage your donation pledges' 
              : 'Track incoming funds and allocation'}
          </p>
        </div>
        {canCreatePledge && (
          <button className="btn-primary" onClick={handleCreatePledge}>
            Create Pledge
          </button>
        )}
      </div>

      {/* Section B: Summary Strip */}
      <div className="summary-strip">
        <div className="summary-card">
          <div className="summary-label">Total Donations</div>
          <div className="summary-value">{formatCurrency(summaryData.totalDonations)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">This Month</div>
          <div className="summary-value">{formatCurrency(summaryData.thisMonth)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Active Funders</div>
          <div className="summary-value">{summaryData.activeFunders}</div>
        </div>
      </div>

      {/* Section C: Funding Activity Summary */}
      <div className="activity-summary-section">
        <div className="activity-summary-card graph-card">
          <div className="activity-header">
            <h3 className="activity-title">Funding Activity</h3>
          </div>
          <div className="graph-container">
            <svg className="funding-graph" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line
                  key={`grid-${i}`}
                  x1="50"
                  y1={30 + i * 40}
                  x2="570"
                  y2={30 + i * 40}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4, 5].map(i => {
                const value = Math.round((maxAmount / 5) * (5 - i))
                return (
                  <text
                    key={`y-label-${i}`}
                    x="45"
                    y={35 + i * 40}
                    textAnchor="end"
                    fontSize="9"
                    fill="#6B7280"
                  >
                    {formatCurrency(value)}
                  </text>
                )
              })}
              
              {/* Data line */}
              <polyline
                points={monthlyData.map((data, index) => {
                  const x = 50 + (index * 104)
                  const y = 250 - 30 - ((data.amount / maxAmount) * 200)
                  return `${x},${y}`
                }).join(' ')}
                fill="none"
                stroke="#1F3A5F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points with hover */}
              {monthlyData.map((data, index) => {
                const x = 50 + (index * 104)
                const y = 250 - 30 - ((data.amount / maxAmount) * 200)
                const isHovered = hoveredPoint === index
                return (
                  <g 
                    key={`point-${index}`}
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Hover area (larger invisible circle for easier hovering) */}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="transparent"
                    />
                    {/* Data point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 5}
                      fill={isHovered ? "#1F3A5F" : "#FFFFFF"}
                      stroke="#1F3A5F"
                      strokeWidth={isHovered ? 2.5 : 2}
                    />
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 50}
                          y={y - 35}
                          width="100"
                          height="25"
                          rx="4"
                          fill="#1F3A5F"
                        />
                        <text
                          x={x}
                          y={y - 18}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#FFFFFF"
                          fontWeight="500"
                        >
                          {formatCurrency(data.amount)}
                        </text>
                        {/* Tooltip arrow */}
                        <polygon
                          points={`${x - 5},${y - 10} ${x + 5},${y - 10} ${x},${y - 5}`}
                          fill="#1F3A5F"
                        />
                      </g>
                    )}
                  </g>
                )
              })}
              
              {/* Month labels */}
              {monthlyData.map((data, index) => {
                const x = 50 + (index * 104)
                return (
                  <text
                    key={`label-${index}`}
                    x={x}
                    y="245"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6B7280"
                    fontWeight="500"
                  >
                    {data.month.split(' ')[0]}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="breakdown-card">
          <div className="activity-header">
            <h3 className="activity-title">Status Breakdown</h3>
          </div>
          <div className="pie-chart-container">
            <svg className="pie-chart" viewBox="0 0 200 200">
              {(() => {
                const receivedTotal = donations.filter(d => d.status === 'received').reduce((sum, d) => sum + d.amount, 0)
                const pledgedTotal = donations.filter(d => d.status === 'pledged').reduce((sum, d) => sum + d.amount, 0)
                const total = receivedTotal + pledgedTotal
                
                if (total === 0) {
                  return <text x="100" y="100" textAnchor="middle" fontSize="12" fill="#6B7280">No data</text>
                }
                
                const receivedPercent = (receivedTotal / total) * 100
                const pledgedPercent = (pledgedTotal / total) * 100
                
                const receivedAngle = (receivedPercent / 100) * 360
                const pledgedAngle = (pledgedPercent / 100) * 360
                
                const radius = 70
                const centerX = 100
                const centerY = 100
                
                // Calculate path for received (green)
                const receivedEndX = centerX + radius * Math.cos((receivedAngle - 90) * Math.PI / 180)
                const receivedEndY = centerY + radius * Math.sin((receivedAngle - 90) * Math.PI / 180)
                const receivedLargeArc = receivedAngle > 180 ? 1 : 0
                
                // Calculate path for pledged (amber)
                const pledgedStartX = receivedEndX
                const pledgedStartY = receivedEndY
                const pledgedEndX = centerX + radius * Math.cos((360 - 90) * Math.PI / 180)
                const pledgedEndY = centerY + radius * Math.sin((360 - 90) * Math.PI / 180)
                const pledgedLargeArc = pledgedAngle > 180 ? 1 : 0
                
                return (
                  <>
                    {/* Received slice */}
                    <path
                      d={`M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 ${receivedLargeArc} 1 ${receivedEndX} ${receivedEndY} Z`}
                      fill="#6BBF59"
                    />
                    {/* Pledged slice */}
                    {pledgedPercent > 0 && (
                      <path
                        d={`M ${centerX} ${centerY} L ${pledgedStartX} ${pledgedStartY} A ${radius} ${radius} 0 ${pledgedLargeArc} 1 ${pledgedEndX} ${pledgedEndY} Z`}
                        fill="#F59E0B"
                      />
                    )}
                    {/* Center circle */}
                    <circle cx={centerX} cy={centerY} r="40" fill="#FFFFFF" />
                    <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="14" fill="#1F3A5F" fontWeight="600">
                      {formatCurrency(total)}
                    </text>
                    <text x={centerX} y={centerY + 12} textAnchor="middle" fontSize="10" fill="#6B7280">
                      Total
                    </text>
                  </>
                )
              })()}
            </svg>
          </div>
          <div className="legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#6BBF59' }}></span>
              <span className="legend-label">Received</span>
              <span className="legend-value">
                {formatCurrency(donations.filter(d => d.status === 'received').reduce((sum, d) => sum + d.amount, 0))}
              </span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#F59E0B' }}></span>
              <span className="legend-label">Pledged</span>
              <span className="legend-value">
                {formatCurrency(donations.filter(d => d.status === 'pledged').reduce((sum, d) => sum + d.amount, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section D: Donations Table */}
      <div className="table-container" id="all-donations-table">
        {!showAllDonations && (
          <div className="table-header-section">
            <h3 className="table-section-title">Recent Donations</h3>
          </div>
        )}
        <table className="donations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Funder Name</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayDonations.map((donation) => (
              <tr key={donation.id}>
                <td>{formatDate(donation.date)}</td>
                <td>{donation.funderName}</td>
                <td>{donation.project}</td>
                <td className="amount-cell">{formatCurrency(donation.amount)}</td>
                <td>
                  <span 
                    className={`status-badge ${donation.status === 'received' ? 'status-received' : 'status-pledged'}`}
                  >
                    {donation.status === 'received' ? 'Received' : 'Pledged'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-view"
                      onClick={() => handleViewDonation(donation)}
                    >
                      View
                    </button>
                    {canConfirmReceipt && donation.status === 'pledged' && (
                      <button 
                        className="btn-confirm"
                        onClick={() => handleConfirmReceipt(donation)}
                      >
                        Confirm Receipt
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!showAllDonations && donations.length > summaryDonationsCount && (
          <div className="view-all-container">
            <button className="view-all-link" onClick={() => setShowAllDonations(true)}>
              View all donations ({donations.length}) →
            </button>
          </div>
        )}

        {showAllDonations && (
          <>
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
            <div className="view-all-container">
              <button className="view-all-link" onClick={() => {
                setShowAllDonations(false)
                setCurrentPage(1)
              }}>
                ← Show summary
              </button>
            </div>
          </>
        )}
      </div>

      {/* View Modal */}
      {showViewModal && selectedDonation && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Donation Details</h3>
              <button className="modal-close" onClick={handleCloseModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(selectedDonation.date)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Funder:</span>
                <span className="detail-value">{selectedDonation.funderName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Project:</span>
                <span className="detail-value">{selectedDonation.project}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">{formatCurrency(selectedDonation.amount)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-badge ${selectedDonation.status === 'received' ? 'status-received' : 'status-pledged'}`}>
                  {selectedDonation.status === 'received' ? 'Received' : 'Pledged'}
                </span>
              </div>
              {selectedDonation.notes && (
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{selectedDonation.notes}</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseModals}>
                Close
              </button>
              {canConfirmReceipt && selectedDonation.status === 'pledged' && (
                <button className="btn-primary" onClick={() => {
                  setShowViewModal(false)
                  handleConfirmReceipt(selectedDonation)
                }}>
                  Confirm Receipt
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Pledge Modal (Funder Only) */}
      {showPledgeModal && canCreatePledge && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Donation Pledge</h3>
              <button className="modal-close" onClick={handleCloseModals}>×</button>
            </div>
            <form className="modal-body" onSubmit={handleSubmitPledge}>
              <div className="form-group">
                <label className="form-label">Project</label>
                <select className="form-select" required>
                  <option value="">Select project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pledge Date</label>
                <input
                  type="date"
                  className="form-input"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  placeholder="Add any additional notes about this pledge..."
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModals}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Receipt Modal (NGO Admin Only) */}
      {showConfirmModal && selectedDonation && canConfirmReceipt && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Confirm Receipt</h3>
              <button className="modal-close" onClick={handleCloseModals}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to confirm receipt of this donation?</p>
              <div className="detail-row">
                <span className="detail-label">Funder:</span>
                <span className="detail-value">{selectedDonation.funderName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Project:</span>
                <span className="detail-value">{selectedDonation.project}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">{formatCurrency(selectedDonation.amount)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pledge Date:</span>
                <span className="detail-value">{formatDate(selectedDonation.date)}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseModals}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleConfirmReceiptSubmit}>
                Confirm Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DonationsPage
