import { useState } from 'react'
import './FundersSDGOverviewPage.css'

// Simple Horizontal Bar Chart Component
function SDGBarChart({ data, metricType }) {
  const maxValue = Math.max(...data.map(d => metricType === 'beneficiaries' ? d.beneficiaries : d.projects))
  const colors = ['#059669', '#2563eb', '#f59e0b', '#dc2626', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

  return (
    <div className="sdg-bar-chart">
      {data.map((item, index) => {
        const value = metricType === 'beneficiaries' ? item.beneficiaries : item.projects
        const percentage = (value / maxValue) * 100
        const metricLabel = metricType === 'beneficiaries' ? 'Beneficiaries' : 'Projects'

        return (
          <div key={item.id} className="bar-item">
            <div className="bar-label">
              <span className="bar-sdg-number">SDG {item.id}</span>
              <span className="bar-sdg-name">{item.name.split(': ')[1]}</span>
            </div>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <span className="bar-value">
                  {metricType === 'beneficiaries'
                    ? `${(value / 1000).toFixed(1)}k`
                    : value}
                </span>
              </div>
            </div>
            <span className="bar-percentage">{percentage.toFixed(0)}%</span>
          </div>
        )
      })}
    </div>
  )
}

function FundersSDGOverviewPage() {
  const [metricType, setMetricType] = useState('beneficiaries')

  // Mock data - funded projects only
  const sdgData = [
    { id: 3, name: 'SDG 3: Good Health and Well-being', projects: 2, beneficiaries: 1500 },
    { id: 6, name: 'SDG 6: Clean Water and Sanitation', projects: 1, beneficiaries: 800 },
    { id: 4, name: 'SDG 4: Quality Education', projects: 1, beneficiaries: 500 },
    { id: 2, name: 'SDG 2: Zero Hunger', projects: 1, beneficiaries: 850 },
  ]

  // Sort by beneficiaries descending
  const sortedData = [...sdgData].sort((a, b) => b.beneficiaries - a.beneficiaries)

  const totalBeneficiaries = sdgData.reduce((sum, sdg) => sum + sdg.beneficiaries, 0)
  const totalProjects = sdgData.reduce((sum, sdg) => sum + sdg.projects, 0)

  return (
    <div className="funders-sdg-impact-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Impact by SDG</h1>
          <p className="page-subtitle">How your funded projects align with global development goals</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="impact-summary-cards">
        <div className="impact-card">
          <p className="impact-label">Total Beneficiaries</p>
          <p className="impact-value">{totalBeneficiaries.toLocaleString()}</p>
        </div>
        <div className="impact-card">
          <p className="impact-label">Funded Projects</p>
          <p className="impact-value">{totalProjects}</p>
        </div>
        <div className="impact-card">
          <p className="impact-label">SDG Goals Supported</p>
          <p className="impact-value">{sdgData.length}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-header">
          <h2>Impact Distribution</h2>
          <div className="metric-toggle">
            <button
              className={`toggle-btn ${metricType === 'beneficiaries' ? 'active' : ''}`}
              onClick={() => setMetricType('beneficiaries')}
            >
              By Beneficiaries
            </button>
            <button
              className={`toggle-btn ${metricType === 'projects' ? 'active' : ''}`}
              onClick={() => setMetricType('projects')}
            >
              By Projects
            </button>
          </div>
        </div>
        <SDGBarChart data={sortedData} metricType={metricType} />
      </div>

      {/* Summary Table */}
      <div className="table-section">
        <h2>SDG Breakdown</h2>
        <div className="table-container">
          <table className="sdg-table">
            <thead>
              <tr>
                <th>SDG #</th>
                <th>SDG Name</th>
                <th className="text-right">Funded Projects</th>
                <th className="text-right">Total Beneficiaries</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(sdg => (
                <tr key={sdg.id}>
                  <td className="sdg-number">
                    <span className="sdg-badge">{sdg.id}</span>
                  </td>
                  <td className="sdg-name-cell">{sdg.name.split(': ')[1]}</td>
                  <td className="text-right">{sdg.projects} {sdg.projects === 1 ? 'project' : 'projects'}</td>
                  <td className="text-right beneficiaries-cell">
                    {sdg.beneficiaries.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Context Note */}
      <div className="context-note">
        <p>
          Impact totals are calculated from active and completed projects you have funded.
        </p>
      </div>
    </div>
  )
}

export default FundersSDGOverviewPage
