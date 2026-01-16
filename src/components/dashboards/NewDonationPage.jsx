import './NewDonationPage.css'

function NewDonationPage() {
  return (
    <div className="new-donation-page">
      <h1 className="page-title">New Donation / Pledge</h1>
      <p className="page-subtitle">
        Commit funding to a project
      </p>

      <form className="donation-form">
        <div className="form-group">
          <label>Project</label>
          <select>
            <option>Select project</option>
            <option>Clean Water Initiative</option>
            <option>Education Access Program</option>
          </select>
        </div>

        <div className="form-group">
          <label>Donation Type</label>
          <select>
            <option>One-time</option>
            <option>Pledge</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount (USD)</label>
          <input type="number" placeholder="e.g. 50000" />
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea rows="3" />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Confirm Donation
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewDonationPage
