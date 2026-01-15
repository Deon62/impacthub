import './FundersReportsPage.css'

function FundersReportsPage() {
  // Mock data - replace with actual data later
  const reports = [
    { id: 1, project: 'Clean Water Initiative', sdg: 'SDG 6: Clean Water', date: '2024-01-15', format: 'PDF' },
    { id: 2, project: 'Education Access Program', sdg: 'SDG 4: Quality Education', date: '2024-01-10', format: 'Text' },
    { id: 3, project: 'Healthcare Outreach', sdg: 'SDG 3: Good Health', date: '2024-01-05', format: 'PDF' },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleDownload = (reportId, format) => {
    // TODO: Implement download
    console.log('Download report:', reportId, format)
  }

  return (
    <div className="funders-reports-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Download impact summaries (PDF / text), SDG-aligned</p>
        </div>
      </div>

      <div className="table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>SDG</th>
              <th>Date Generated</th>
              <th>Format</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="project-name">{report.project}</td>
                <td>{report.sdg}</td>
                <td>{formatDate(report.date)}</td>
                <td>{report.format}</td>
                <td>
                  <button 
                    className="btn-download"
                    onClick={() => handleDownload(report.id, report.format)}
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
  )
}

export default FundersReportsPage
