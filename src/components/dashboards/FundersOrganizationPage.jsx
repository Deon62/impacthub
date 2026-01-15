import './FundersOrganizationPage.css'

function FundersOrganizationPage() {
  // Mock data - replace with actual data later
  const organizationData = {
    name: 'Global Health Foundation',
    contactPerson: 'Jane Smith',
    email: 'contact@globalhealth.org',
    phone: '+1 555 123 4567',
    website: 'https://globalhealth.org',
    description: 'A leading foundation dedicated to improving global health outcomes through strategic funding and partnerships.',
  }

  return (
    <div className="funders-organization-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Organization Profile</h1>
          <p className="page-subtitle">Funder info, branding, and contact person</p>
        </div>
      </div>

      <div className="organization-card">
        <div className="organization-section">
          <h3 className="section-title">Organization Information</h3>
          <div className="info-group">
            <div className="info-item">
              <span className="info-label">Organization Name</span>
              <span className="info-value">{organizationData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contact Person</span>
              <span className="info-value">{organizationData.contactPerson}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{organizationData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{organizationData.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Website</span>
              <span className="info-value">
                <a href={organizationData.website} target="_blank" rel="noopener noreferrer">
                  {organizationData.website}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="organization-section">
          <h3 className="section-title">Description</h3>
          <p className="description-text">{organizationData.description}</p>
        </div>
      </div>
    </div>
  )
}

export default FundersOrganizationPage
