import { useState } from 'react'
import './ProjectsPage.css'

function ProjectsPage({ onViewProject, onCreateProject }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [sdgFilter, setSdgFilter] = useState([])
  const [locationFilter, setLocationFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 15

  // Mock data - replace with actual data later
  const projects = [
    { id: 1, name: 'Clean Water Initiative', sdgs: ['SDG 6: Clean Water'], location: 'Rural Kenya', timeline: 'Jan 2024 - Dec 2024', budget: 500000, fundsIn: 350000, progress: 70, status: 'active' },
    { id: 2, name: 'Education Access Program', sdgs: ['SDG 4: Quality Education'], location: 'Lagos, Nigeria', timeline: 'Mar 2024 - Feb 2025', budget: 750000, fundsIn: 600000, progress: 80, status: 'active' },
    { id: 3, name: 'Healthcare Outreach', sdgs: ['SDG 3: Good Health'], location: 'Mumbai, India', timeline: 'Feb 2024 - Jan 2025', budget: 300000, fundsIn: 180000, progress: 60, status: 'at-risk' },
    { id: 4, name: 'Sustainable Agriculture', sdgs: ['SDG 2: Zero Hunger'], location: 'Ghana', timeline: 'Jan 2023 - Dec 2023', budget: 400000, fundsIn: 400000, progress: 100, status: 'completed' },
  ]

  const sdgOptions = [
    { id: 1, name: 'SDG 1: No Poverty', short: 'SDG 1' },
    { id: 2, name: 'SDG 2: Zero Hunger', short: 'SDG 2' },
    { id: 3, name: 'SDG 3: Good Health', short: 'SDG 3' },
    { id: 4, name: 'SDG 4: Quality Education', short: 'SDG 4' },
    { id: 5, name: 'SDG 5: Gender Equality', short: 'SDG 5' },
    { id: 6, name: 'SDG 6: Clean Water', short: 'SDG 6' },
    { id: 7, name: 'SDG 7: Clean Energy', short: 'SDG 7' },
    { id: 8, name: 'SDG 8: Decent Work', short: 'SDG 8' },
    { id: 9, name: 'SDG 9: Industry Innovation', short: 'SDG 9' },
    { id: 10, name: 'SDG 10: Reduced Inequalities', short: 'SDG 10' },
    { id: 11, name: 'SDG 11: Sustainable Cities', short: 'SDG 11' },
    { id: 12, name: 'SDG 12: Responsible Consumption', short: 'SDG 12' },
    { id: 13, name: 'SDG 13: Climate Action', short: 'SDG 13' },
    { id: 14, name: 'SDG 14: Life Below Water', short: 'SDG 14' },
    { id: 15, name: 'SDG 15: Life on Land', short: 'SDG 15' },
    { id: 16, name: 'SDG 16: Peace and Justice', short: 'SDG 16' },
    { id: 17, name: 'SDG 17: Partnerships', short: 'SDG 17' },
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
      case 'active':
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
      case 'active':
        return 'Active'
      case 'at-risk':
        return 'At Risk'
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

  const handleEditProject = (projectId, e) => {
    e.stopPropagation()
    // TODO: Navigate to edit project page (Admin only)
    console.log('Edit project:', projectId)
  }

  const handleCreateProject = () => {
    onCreateProject && onCreateProject()
  }

  const handleClearFilters = () => {
    setStatusFilter('all')
    setSdgFilter([])
    setLocationFilter('')
  }

  const handleSdgToggle = (sdg) => {
    setSdgFilter(prev => 
      prev.includes(sdg) 
        ? prev.filter(s => s !== sdg)
        : [...prev, sdg]
    )
  }

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (statusFilter !== 'all' && project.status !== statusFilter) return false
    if (sdgFilter.length > 0) {
      const projectSdgShorts = project.sdgs.map(sdg => {
        const sdgOption = sdgOptions.find(opt => opt.short === sdg || opt.name === sdg)
        return sdgOption ? sdgOption.name : sdg
      })
      if (!projectSdgShorts.some(sdg => sdgFilter.includes(sdg))) return false
    }
    if (locationFilter && !project.location.toLowerCase().includes(locationFilter.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

  const hasFilters = statusFilter !== 'all' || sdgFilter.length > 0 || locationFilter

  return (
    <div className="projects-page">
      {/* Section A: Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">All active and completed projects</p>
        </div>
        <button className="btn-primary" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>

      {/* Section B: Filters Bar */}
      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="at-risk">At Risk</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">SDG</label>
          <div className="sdg-dropdown">
            <select 
              className="filter-select"
              value=""
              onChange={(e) => {
                if (e.target.value && !sdgFilter.includes(e.target.value)) {
                  setSdgFilter([...sdgFilter, e.target.value])
                }
              }}
            >
              <option value="">Select SDG</option>
              {sdgOptions.filter(sdg => !sdgFilter.includes(sdg.name)).map(sdg => (
                <option key={sdg.id} value={sdg.name}>{sdg.name}</option>
              ))}
            </select>
            {sdgFilter.length > 0 && (
              <div className="sdg-tags">
                {sdgFilter.map(sdg => (
                  <span key={sdg} className="sdg-tag">
                    {sdg}
                    <button 
                      className="sdg-tag-remove"
                      onClick={() => setSdgFilter(sdgFilter.filter(s => s !== sdg))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>

        {hasFilters && (
          <button className="btn-clear-filters" onClick={handleClearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Section C: Projects Table */}
      {paginatedProjects.length > 0 ? (
        <>
          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>SDG(s)</th>
                  <th>Location</th>
                  <th>Timeline</th>
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
                    <td>{project.sdgs.join(', ')}</td>
                    <td>{project.location}</td>
                    <td>{project.timeline}</td>
                    <td>{formatCurrency(project.budget)}</td>
                    <td>{formatCurrency(project.fundsIn)}</td>
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
                        style={{ color: getStatusColor(project.status) }}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-cell">
                        <button 
                          className="btn-view"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewProject(project.id)
                          }}
                        >
                          View
                        </button>
                        <button 
                          className="btn-edit"
                          onClick={(e) => handleEditProject(project.id, e)}
                        >
                          Edit
                        </button>
                      </div>
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
        </>
      ) : (
        /* Section D: Empty State */
        <div className="empty-state">
          <p className="empty-message">No projects yet</p>
          <button className="btn-primary" onClick={handleCreateProject}>
            Create your first project
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
