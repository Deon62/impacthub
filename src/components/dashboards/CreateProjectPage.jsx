import { useState } from 'react'
import './CreateProjectPage.css'

function CreateProjectPage({ onCancel, onCreateProject }) {
  const [formData, setFormData] = useState({
    projectName: '',
    primarySDG: '',
    countryLocation: '',
    coreActivity: '',
    intendedOutcome: '',
    targetBeneficiaries: '',
    estimatedBudget: '',
    startDate: '',
    endDate: '',
  })

  const [errors, setErrors] = useState({})

  const sdgOptions = [
    { id: 1, name: 'SDG 1: No Poverty' },
    { id: 2, name: 'SDG 2: Zero Hunger' },
    { id: 3, name: 'SDG 3: Good Health and Well-being' },
    { id: 4, name: 'SDG 4: Quality Education' },
    { id: 5, name: 'SDG 5: Gender Equality' },
    { id: 6, name: 'SDG 6: Clean Water and Sanitation' },
    { id: 7, name: 'SDG 7: Affordable and Clean Energy' },
    { id: 8, name: 'SDG 8: Decent Work and Economic Growth' },
    { id: 9, name: 'SDG 9: Industry, Innovation and Infrastructure' },
    { id: 10, name: 'SDG 10: Reduced Inequalities' },
    { id: 11, name: 'SDG 11: Sustainable Cities and Communities' },
    { id: 12, name: 'SDG 12: Responsible Consumption and Production' },
    { id: 13, name: 'SDG 13: Climate Action' },
    { id: 14, name: 'SDG 14: Life Below Water' },
    { id: 15, name: 'SDG 15: Life on Land' },
    { id: 16, name: 'SDG 16: Peace, Justice and Strong Institutions' },
    { id: 17, name: 'SDG 17: Partnerships for the Goals' },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required'
    }
    if (!formData.primarySDG) {
      newErrors.primarySDG = 'Primary SDG is required'
    }
    if (!formData.countryLocation.trim()) {
      newErrors.countryLocation = 'Country/Location is required'
    }
    if (!formData.coreActivity.trim()) {
      newErrors.coreActivity = 'Core Activity is required'
    }
    if (!formData.intendedOutcome.trim()) {
      newErrors.intendedOutcome = 'Intended Outcome is required'
    }
    if (!formData.targetBeneficiaries || formData.targetBeneficiaries <= 0) {
      newErrors.targetBeneficiaries = 'Target Beneficiaries is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Create project object
    const newProject = {
      id: Date.now(), // Temporary ID, will be replaced by backend
      name: formData.projectName,
      primarySDG: formData.primarySDG,
      location: formData.countryLocation,
      coreActivity: formData.coreActivity,
      intendedOutcome: formData.intendedOutcome,
      targetBeneficiaries: parseInt(formData.targetBeneficiaries),
      estimatedBudget: formData.estimatedBudget ? parseFloat(formData.estimatedBudget) : null,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      status: 'active',
      progress: 0,
      fundsReceived: 0,
    }

    onCreateProject && onCreateProject(newProject)
  }

  return (
    <div className="create-project-page">
      <div className="create-project-header">
        <h1 className="page-title">Create Project</h1>
        <p className="page-subtitle">Define a new project for impact tracking and reporting</p>
      </div>

      <form className="create-project-form" onSubmit={handleSubmit}>
        {/* Section 1: Project Definition */}
        <section className="form-section">
          <h2 className="section-title">Project Definition</h2>
          
          <div className="form-group">
            <label className="form-label">
              Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.projectName ? 'error' : ''}`}
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="Enter project name"
            />
            {errors.projectName && <span className="error-message">{errors.projectName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Primary SDG <span className="required">*</span>
            </label>
            <select
              className={`form-select ${errors.primarySDG ? 'error' : ''}`}
              value={formData.primarySDG}
              onChange={(e) => handleInputChange('primarySDG', e.target.value)}
            >
              <option value="">Select SDG</option>
              {sdgOptions.map(sdg => (
                <option key={sdg.id} value={sdg.name}>{sdg.name}</option>
              ))}
            </select>
            {errors.primarySDG && <span className="error-message">{errors.primarySDG}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Country / Location <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.countryLocation ? 'error' : ''}`}
              value={formData.countryLocation}
              onChange={(e) => handleInputChange('countryLocation', e.target.value)}
              placeholder="e.g., Kenya, Rural Kenya, Lagos, Nigeria"
            />
            {errors.countryLocation && <span className="error-message">{errors.countryLocation}</span>}
          </div>
        </section>

        {/* Section 2: Impact Definition */}
        <section className="form-section">
          <h2 className="section-title">Impact Definition</h2>
          
          <div className="form-group">
            <label className="form-label">
              Core Activity <span className="required">*</span>
            </label>
            <textarea
              className={`form-textarea ${errors.coreActivity ? 'error' : ''}`}
              value={formData.coreActivity}
              onChange={(e) => handleInputChange('coreActivity', e.target.value)}
              placeholder="Describe what is being done on the ground"
              rows={4}
            />
            <span className="helper-text">What is being done on the ground?</span>
            {errors.coreActivity && <span className="error-message">{errors.coreActivity}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Intended Outcome <span className="required">*</span>
            </label>
            <textarea
              className={`form-textarea ${errors.intendedOutcome ? 'error' : ''}`}
              value={formData.intendedOutcome}
              onChange={(e) => handleInputChange('intendedOutcome', e.target.value)}
              placeholder="Describe what change should occur as a result of this activity"
              rows={4}
            />
            <span className="helper-text">What change should occur as a result of this activity?</span>
            {errors.intendedOutcome && <span className="error-message">{errors.intendedOutcome}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Target Beneficiaries <span className="required">*</span>
            </label>
            <input
              type="number"
              className={`form-input ${errors.targetBeneficiaries ? 'error' : ''}`}
              value={formData.targetBeneficiaries}
              onChange={(e) => handleInputChange('targetBeneficiaries', e.target.value)}
              placeholder="Enter number of beneficiaries"
              min="1"
            />
            <span className="helper-text">Used in donor reports and impact summaries</span>
            {errors.targetBeneficiaries && <span className="error-message">{errors.targetBeneficiaries}</span>}
          </div>
        </section>

        {/* Section 3: Funding Context */}
        <section className="form-section">
          <h2 className="section-title">Funding Context</h2>
          
          <div className="form-group">
            <label className="form-label">Estimated Budget</label>
            <input
              type="number"
              className="form-input"
              value={formData.estimatedBudget}
              onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
              placeholder="Enter amount in USD"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                min={formData.startDate || undefined}
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectPage
