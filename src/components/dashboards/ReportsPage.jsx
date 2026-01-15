import { useState } from 'react'
import './ReportsPage.css'

function ReportsPage() {
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedSDG, setSelectedSDG] = useState('')
  const [reportingPeriod, setReportingPeriod] = useState('')
  const [beneficiaries, setBeneficiaries] = useState('')
  const [generatedReport, setGeneratedReport] = useState(null)
  const [reportHistory, setReportHistory] = useState([
    { id: 1, project: 'Clean Water Initiative', sdg: 'SDG 6', date: '2024-01-15', generatedBy: 'John Doe' },
    { id: 2, project: 'Education Access Program', sdg: 'SDG 4', date: '2024-01-10', generatedBy: 'Jane Smith' },
  ])

  // Mock data - replace with actual data later
  const projects = [
    { id: 1, name: 'Clean Water Initiative', sdg: 'SDG 6', beneficiaries: 1200 },
    { id: 2, name: 'Education Access Program', sdg: 'SDG 4', beneficiaries: 500 },
    { id: 3, name: 'Healthcare Outreach', sdg: 'SDG 3', beneficiaries: 1500 },
    { id: 4, name: 'Sustainable Agriculture', sdg: 'SDG 2', beneficiaries: 850 },
  ]

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId)
    const project = projects.find(p => p.id === parseInt(projectId))
    if (project) {
      setSelectedSDG(project.sdg)
      setBeneficiaries(project.beneficiaries.toString())
    }
  }

  const handleGenerateReport = () => {
    if (!selectedProject) {
      alert('Please select a project')
      return
    }

    const project = projects.find(p => p.id === parseInt(selectedProject))
    const report = {
      id: Date.now(),
      project: project.name,
      sdg: selectedSDG,
      period: reportingPeriod || 'Q1 2024',
      beneficiaries: beneficiaries,
      date: new Date().toISOString(),
      generatedBy: 'John Doe', // TODO: Get from auth context
      content: `Impact Summary for ${project.name}

This report covers the period ${reportingPeriod || 'Q1 2024'} and demonstrates progress toward ${selectedSDG}.

Key Achievements:
- Reached ${beneficiaries} beneficiaries directly
- Implemented sustainable solutions in target communities
- Achieved measurable outcomes aligned with SDG targets

The project has made significant progress in addressing critical needs and creating lasting impact in the communities served.`
    }

    setGeneratedReport(report)
    
    // Add to history
    setReportHistory(prev => [report, ...prev])
  }

  const handleCopyToClipboard = () => {
    if (generatedReport) {
      navigator.clipboard.writeText(generatedReport.content)
      alert('Summary copied to clipboard')
    }
  }

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    alert('PDF download functionality will be implemented')
  }

  const handleDownloadHistory = (reportId) => {
    // TODO: Implement download from history
    console.log('Download report:', reportId)
  }

  return (
    <div className="reports-page">
      {/* Section A: Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Impact Summaries</h1>
          <p className="page-subtitle">Generate donor-ready SDG-aligned impact summaries</p>
        </div>
      </div>

      {/* Section B: Report Generator */}
      <div className="report-generator-card">
        <h3 className="card-title">Impact Summary Generator</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Project</label>
            <select 
              className="form-select"
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">SDG</label>
            <input
              type="text"
              className="form-input"
              value={selectedSDG}
              onChange={(e) => setSelectedSDG(e.target.value)}
              placeholder="Auto-filled from project"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reporting Period (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={reportingPeriod}
              onChange={(e) => setReportingPeriod(e.target.value)}
              placeholder="e.g., Q1 2024"
            />
            <span className="form-helper-text">Used in narrative only (optional)</span>
          </div>

          <div className="form-group">
            <label className="form-label">Beneficiaries</label>
            <input
              type="text"
              className="form-input"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
              placeholder="Auto-filled from project"
            />
          </div>
        </div>

        <button className="btn-generate" onClick={handleGenerateReport}>
          Generate Impact Summary
        </button>
        <p className="generator-helper-text">
          Summary is generated from verified project milestones and uploaded evidence.
        </p>
      </div>

      {/* Section C: Generated Output Section */}
      {generatedReport && (
        <div className="output-section">
          <div className="output-header">
            <h3 className="section-title">Generated Summary</h3>
            <div className="output-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Project:</span>
                <span className="metadata-value">{generatedReport.project}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">SDG:</span>
                <span className="metadata-value">{generatedReport.sdg}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Generated:</span>
                <span className="metadata-value">{generatedReport.date}</span>
              </div>
            </div>
          </div>

          <textarea
            className="report-output"
            value={generatedReport.content}
            readOnly
            rows={12}
          />

          <div className="output-actions">
            <button className="btn-output" onClick={handleCopyToClipboard}>
              Copy Summary
            </button>
            <button className="btn-output" onClick={handleDownloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Section D: Summary History */}
      {reportHistory.length > 0 && (
        <div className="history-section">
          <h3 className="section-title">Summary History</h3>
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>SDG</th>
                  <th>Date generated</th>
                  <th>Generated by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reportHistory.map((report) => (
                  <tr key={report.id}>
                    <td>{report.project}</td>
                    <td>{report.sdg}</td>
                    <td>{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>{report.generatedBy || 'N/A'}</td>
                    <td>
                      <button 
                        className="btn-download"
                        onClick={() => handleDownloadHistory(report.id)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportsPage
