import { useState } from 'react'
import './OrganizationPage.css'

function OrganizationPage() {
  const [formData, setFormData] = useState({
    organizationName: 'Impact NGO',
    country: 'Kenya',
    sector: 'Education',
    website: 'https://impactngo.org',
    description: 'We work to improve education access in rural communities.',
    primaryContact: 'John Doe',
    email: 'contact@impactngo.org',
    phone: '+254 700 000 000',
  })

  const [selectedSDGs, setSelectedSDGs] = useState(['SDG 4: Quality Education', 'SDG 6: Clean Water', 'SDG 3: Good Health'])

  const sdgOptions = [
    { id: 1, name: 'SDG 1: No Poverty', icon: '1' },
    { id: 2, name: 'SDG 2: Zero Hunger', icon: '2' },
    { id: 3, name: 'SDG 3: Good Health', icon: '3' },
    { id: 4, name: 'SDG 4: Quality Education', icon: '4' },
    { id: 5, name: 'SDG 5: Gender Equality', icon: '5' },
    { id: 6, name: 'SDG 6: Clean Water', icon: '6' },
    { id: 7, name: 'SDG 7: Clean Energy', icon: '7' },
    { id: 8, name: 'SDG 8: Decent Work', icon: '8' },
    { id: 9, name: 'SDG 9: Industry Innovation', icon: '9' },
    { id: 10, name: 'SDG 10: Reduced Inequalities', icon: '10' },
    { id: 11, name: 'SDG 11: Sustainable Cities', icon: '11' },
    { id: 12, name: 'SDG 12: Responsible Consumption', icon: '12' },
    { id: 13, name: 'SDG 13: Climate Action', icon: '13' },
    { id: 14, name: 'SDG 14: Life Below Water', icon: '14' },
    { id: 15, name: 'SDG 15: Life on Land', icon: '15' },
    { id: 16, name: 'SDG 16: Peace and Justice', icon: '16' },
    { id: 17, name: 'SDG 17: Partnerships', icon: '17' },
  ]

  const sectors = [
    'Education',
    'Health',
    'Water & Sanitation',
    'Agriculture',
    'Environment',
    'Gender Equality',
    'Economic Development',
    'Other'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSDGToggle = (sdgName) => {
    setSelectedSDGs(prev =>
      prev.includes(sdgName)
        ? prev.filter(s => s !== sdgName)
        : [...prev, sdgName]
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    // TODO: Save organization details
    console.log('Saving organization details:', { ...formData, selectedSDGs })
    alert('Organization details saved successfully')
  }

  return (
    <div className="organization-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Organization</h1>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Section A: Organization Profile */}
        <section className="form-section">
          <h2 className="section-title">Organization Profile</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Organization Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Country <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Sector <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                required
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                type="url"
                className="form-input"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.org"
              />
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your organization"
                required
              />
            </div>
          </div>
        </section>

        {/* Section B: SDG Focus Areas */}
        <section className="form-section">
          <h2 className="section-title">SDG Focus Areas</h2>
          <p className="section-description">Select the SDGs your organization focuses on</p>
          <div className="sdg-checklist">
            {sdgOptions.map(sdg => {
              const isSelected = selectedSDGs.includes(sdg.name)
              return (
                <label key={sdg.id} className="sdg-checkbox-item">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSDGToggle(sdg.name)}
                  />
                  <div className="sdg-checkbox-content">
                    <span className="sdg-icon">{sdg.icon}</span>
                    <span className="sdg-name">{sdg.name}</span>
                  </div>
                </label>
              )
            })}
          </div>
        </section>

        {/* Section C: Contact Information */}
        <section className="form-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Primary Contact Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.primaryContact}
                onChange={(e) => handleInputChange('primaryContact', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+123 456 7890"
              />
            </div>
          </div>
        </section>

        {/* Section D: Save Changes */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Organization Details
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrganizationPage
