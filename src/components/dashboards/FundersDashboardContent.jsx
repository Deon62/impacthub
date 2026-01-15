import './FundersDashboardContent.css'

function FundersDashboardContent() {
  // Mock data - replace with actual data later
  const kpiData = {
    fundedProjects: 4,
    totalFundsDeployed: 1250000,
    totalBeneficiaries: 3650,
    avgProjectCompletion: 75
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="funders-dashboard-content">
      {/* Section A: KPI Summary */}
      <section className="kpi-section">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">High-level overview of funded projects, funds deployed, and impact snapshot</p>
        
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.fundedProjects}</div>
            <div className="kpi-label">Funded Projects</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{formatCurrency(kpiData.totalFundsDeployed)}</div>
            <div className="kpi-label">Total Funds Deployed</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.totalBeneficiaries.toLocaleString()}</div>
            <div className="kpi-label">Total Beneficiaries</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-number">{kpiData.avgProjectCompletion}%</div>
            <div className="kpi-label">Avg Project Completion</div>
          </div>
        </div>
      </section>

      {/* Section B: Impact Snapshot */}
      <section className="impact-snapshot-section">
        <h3 className="section-title">Impact Snapshot</h3>
        <div className="snapshot-card">
          <p className="snapshot-text">
            Your funding has supported {kpiData.fundedProjects} active projects across multiple SDGs, 
            reaching {kpiData.totalBeneficiaries.toLocaleString()} beneficiaries and deploying 
            {formatCurrency(kpiData.totalFundsDeployed)} in total funding.
          </p>
        </div>
      </section>
    </div>
  )
}

export default FundersDashboardContent
