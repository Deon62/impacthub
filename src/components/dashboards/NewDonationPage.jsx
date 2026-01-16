import { useState } from 'react'
import { HiOutlineWallet } from 'react-icons/hi2'
import './NewDonationPage.css'

function NewDonationPage({ onBack }) {
  // Mock projects data
  const projects = [
    { id: 1, name: 'Clean Water Initiative', ngo: 'WaterForAll', status: 'active' },
    { id: 2, name: 'Education Access Program', ngo: 'EduFirst', status: 'active' },
    { id: 3, name: 'Healthcare Outreach', ngo: 'HealthAid', status: 'active' },
    { id: 4, name: 'Sustainable Agriculture', ngo: 'AgriGrow', status: 'active' },
  ]

  // Form state
  const [formData, setFormData] = useState({
    // Donation Details
    projectId: '',
    donationType: 'one-time',
    amount: '',
    notes: '',
    fundingConditions: '',

    // Payment Method
    paymentMethod: 'bank-transfer',

    // Organization Payment Details
    organizationName: '',
    billingEmail: '',
    invoiceReference: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.projectId) newErrors.projectId = 'Please select a project'
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount'
    }
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required'
    if (!formData.billingEmail) newErrors.billingEmail = 'Billing email is required'
    if (formData.billingEmail && !formData.billingEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.billingEmail = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Frontend-only data modeling for future backend integration
    const donationData = {
      donation: {
        projectId: formData.projectId,
        amount: parseFloat(formData.amount),
        type: formData.donationType,
        notes: formData.notes,
        fundingConditions: formData.fundingConditions,
        createdAt: new Date().toISOString(),
      },
      paymentMethod: {
        type: formData.paymentMethod,
        status: 'pending', // Will be 'confirmed' after backend processing
      },
      organizationBillingDetails: {
        name: formData.organizationName,
        billingEmail: formData.billingEmail,
        invoiceReference: formData.invoiceReference,
      },
    }

    console.log('Donation submission data:', donationData)
    setSubmitted(true)

    // Simulate processing
    setTimeout(() => {
      // In real implementation, would call backend API here
      alert(
        `Donation ${formData.donationType === 'pledge' ? 'pledge' : 'submission'} confirmed!\n\nProject: ${
          projects.find(p => p.id === parseInt(formData.projectId))?.name
        }\nAmount: $${parseFloat(formData.amount).toLocaleString('en-US')}`
      )
      handleReset()
    }, 500)
  }

  const handleReset = () => {
    setFormData({
      projectId: '',
      donationType: 'one-time',
      amount: '',
      notes: '',
      fundingConditions: '',
      paymentMethod: 'bank-transfer',
      organizationName: '',
      billingEmail: '',
      invoiceReference: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="new-donation-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Donation / Pledge</h1>
          <p className="page-subtitle">Commit funding to support our partner NGOs</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="donation-form-container">
        <div className="form-layout">
          {/* LEFT COLUMN: Form Sections */}
          <div className="form-left">
            {/* SECTION 1: Donation Details */}
            <section className="form-section">
              <h2 className="section-title">Donation Details</h2>

              <div className="form-group">
                <label htmlFor="projectId" className="form-label">
                  Project <span className="required">*</span>
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  className={`form-input ${errors.projectId ? 'input-error' : ''}`}
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} — {project.ngo}
                    </option>
                  ))}
                </select>
                {errors.projectId && <span className="error-message">{errors.projectId}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="donationType" className="form-label">
                  Donation Type <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="donationType"
                      value="one-time"
                      checked={formData.donationType === 'one-time'}
                      onChange={handleInputChange}
                    />
                    <span>One-time Donation</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="donationType"
                      value="pledge"
                      checked={formData.donationType === 'pledge'}
                      onChange={handleInputChange}
                    />
                    <span>Pledge (Commitment)</span>
                  </label>
                </div>
                <p className="helper-text">
                  {formData.donationType === 'pledge'
                    ? 'A pledge commits funding but payment is processed at a later date.'
                    : 'A donation processes payment immediately upon confirmation.'}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="form-label">
                  Amount (USD) <span className="required">*</span>
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="e.g. 50000"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`form-input ${errors.amount ? 'input-error' : ''}`}
                  min="0"
                  step="1"
                />
                {formData.amount && (
                  <p className="amount-preview">
                    {parseFloat(formData.amount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    })}
                  </p>
                )}
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fundingConditions" className="form-label">
                  Funding Conditions or Restrictions (optional)
                </label>
                <textarea
                  id="fundingConditions"
                  name="fundingConditions"
                  placeholder="e.g., Funds to be used exclusively for personnel costs..."
                  value={formData.fundingConditions}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  rows="2"
                />
                <p className="helper-text">Any specific conditions on how funds should be used</p>
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  Additional Notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any other relevant information..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  rows="2"
                />
              </div>
            </section>

            {/* SECTION 3: Organization Payment Details */}
            <section className="form-section">
              <h2 className="section-title">Organization Payment Details</h2>
              <p className="section-description">
                These details will appear on all payment confirmations and invoices.
              </p>

              <div className="form-group">
                <label htmlFor="organizationName" className="form-label">
                  Organization Name <span className="required">*</span>
                </label>
                <input
                  id="organizationName"
                  type="text"
                  name="organizationName"
                  placeholder="e.g., Global Foundation for Impact"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.organizationName ? 'input-error' : ''}`}
                />
                {errors.organizationName && <span className="error-message">{errors.organizationName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="billingEmail" className="form-label">
                  Billing Email <span className="required">*</span>
                </label>
                <input
                  id="billingEmail"
                  type="email"
                  name="billingEmail"
                  placeholder="finance@organization.org"
                  value={formData.billingEmail}
                  onChange={handleInputChange}
                  className={`form-input ${errors.billingEmail ? 'input-error' : ''}`}
                />
                <p className="helper-text">Confirmation and payment instructions will be sent here</p>
                {errors.billingEmail && <span className="error-message">{errors.billingEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="invoiceReference" className="form-label">
                  Internal Reference / PO (optional)
                </label>
                <input
                  id="invoiceReference"
                  type="text"
                  name="invoiceReference"
                  placeholder="e.g., PO-2024-0001"
                  value={formData.invoiceReference}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <p className="helper-text">Used for your internal accounting and tracking</p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Payment Methods */}
          <div className="form-right">
            {/* SECTION 2: Payment Method */}
            <section className="form-section payment-section">
              <h2 className="section-title">Payment Method</h2>
              <p className="section-description">
                Select how you'd like to fund this donation.
              </p>

              <div className="payment-options">
                {/* Bank Transfer */}
                <label className="payment-option active">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleInputChange}
                    className="payment-radio"
                  />
                  <div className="payment-option-icon bank-icon">
                    🏦
                  </div>
                  <div className="payment-option-content">
                    <div className="payment-option-title">Bank Transfer</div>
                    <p className="payment-option-detail">Direct transfer to organizational account</p>
                  </div>
                </label>

                {/* Credit Card - Visa */}
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="visa"
                    checked={formData.paymentMethod === 'visa'}
                    onChange={handleInputChange}
                    className="payment-radio"
                  />
                  <div className="payment-option-icon">
                    <img src="/assets/visa.png" alt="Visa" className="card-logo-single" />
                  </div>
                  <div className="payment-option-content">
                    <div className="payment-option-title">Visa</div>
                    <p className="payment-option-detail">Visa credit or debit card</p>
                  </div>
                </label>

                {/* Credit Card - Mastercard */}
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mastercard"
                    checked={formData.paymentMethod === 'mastercard'}
                    onChange={handleInputChange}
                    className="payment-radio"
                  />
                  <div className="payment-option-icon">
                    <img src="/assets/mastercard.png" alt="Mastercard" className="card-logo-single" />
                  </div>
                  <div className="payment-option-content">
                    <div className="payment-option-title">Mastercard</div>
                    <p className="payment-option-detail">Mastercard credit or debit card</p>
                  </div>
                </label>

                {/* Wallet */}
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={formData.paymentMethod === 'wallet'}
                    onChange={handleInputChange}
                    className="payment-radio"
                  />
                  <div className="payment-option-icon">
                    <HiOutlineWallet size={24} />
                  </div>
                  <div className="payment-option-content">
                    <div className="payment-option-title">Wallet / Escrow</div>
                    <p className="payment-option-detail">Secure fund escrow service</p>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'bank-transfer' && (
                <div className="info-box">
                  <p>
                    <strong>Next Steps:</strong> After confirming your donation, you will receive bank transfer
                    instructions and your unique reference number via email.
                  </p>
                </div>
              )}
            </section>

            {/* Form Actions */}
            <div className="form-actions-right">
              <button
                type="submit"
                disabled={submitted}
                className="btn-submit primary-button"
              >
                {formData.donationType === 'pledge' ? 'Confirm Pledge' : 'Confirm Donation'}
              </button>
              <button type="button" onClick={onBack} className="btn-cancel secondary-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewDonationPage
