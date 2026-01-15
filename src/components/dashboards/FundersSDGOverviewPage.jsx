import './FundersSDGOverviewPage.css'

function FundersSDGOverviewPage() {
  // Mock data - replace with actual data later
  const sdgData = [
    { id: 2, name: 'SDG 2: Zero Hunger', short: 'SDG 2', icon: '2', projects: 1, beneficiaries: 850 },
    { id: 3, name: 'SDG 3: Good Health', short: 'SDG 3', icon: '3', projects: 1, beneficiaries: 1500 },
    { id: 4, name: 'SDG 4: Quality Education', short: 'SDG 4', icon: '4', projects: 1, beneficiaries: 500 },
    { id: 6, name: 'SDG 6: Clean Water', short: 'SDG 6', icon: '6', projects: 1, beneficiaries: 800 },
  ]

  return (
    <div className="funders-sdg-overview-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">SDG Overview</h1>
          <p className="page-subtitle">Read-only view of SDGs across funded projects</p>
        </div>
      </div>

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
    </div>
  )
}

export default FundersSDGOverviewPage
