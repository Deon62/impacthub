import { useState } from 'react'
import './SettingsPage.css'

function SettingsPage({ onLogout }) {
  const [accountData, setAccountData] = useState({
    name: 'John Doe',
    email: 'admin@impactngo.org',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    reportGeneration: true,
  })

  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSaveAccount = (e) => {
    e.preventDefault()
    // TODO: Save account settings
    console.log('Saving account settings:', accountData)
    alert('Account settings saved successfully')
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // TODO: Change password
    console.log('Changing password')
    alert('Password changed successfully')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleLogoutAll = () => {
    if (window.confirm('Are you sure you want to log out of all sessions?')) {
      // TODO: Logout all sessions
      console.log('Logging out of all sessions')
      alert('Logged out of all sessions')
    }
  }

  const handleLeaveOrganization = () => {
    if (window.confirm('Are you sure you want to leave this organization? This action cannot be undone.')) {
      // TODO: Leave organization
      console.log('Leaving organization')
    }
  }

  const handleDeleteAccount = () => {
    const confirm = window.prompt('Type "DELETE" to confirm account deletion:')
    if (confirm === 'DELETE') {
      // TODO: Delete account
      console.log('Deleting account')
      alert('Account deletion requested')
    }
  }

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Account and security settings</p>
        </div>
      </div>

      {/* Section A: Account Settings */}
      <section className="settings-section">
        <h2 className="section-title">Account Settings</h2>
        <form onSubmit={handleSaveAccount}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={accountData.name}
                onChange={(e) => handleAccountChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={accountData.email}
                onChange={(e) => handleAccountChange('email', e.target.value)}
              />
              <span className="form-hint">Email verification required for changes</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>

        <div className="password-section">
          <h3 className="subsection-title">Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Section B: Security */}
      <section className="settings-section">
        <h2 className="section-title">Security</h2>
        <div className="security-info">
          <div className="info-row">
            <span className="info-label">Last login:</span>
            <span className="info-value">January 15, 2024 at 10:30 AM</span>
          </div>
          <div className="info-row">
            <span className="info-label">Active sessions:</span>
            <span className="info-value">2 devices</span>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleLogoutAll}>
            Log out of all sessions
          </button>
        </div>
      </section>

      {/* Section C: Notifications */}
      <section className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="notification-toggles">
          <label className="toggle-item">
            <input
              type="checkbox"
              checked={notifications.projectUpdates}
              onChange={() => handleNotificationToggle('projectUpdates')}
            />
            <div className="toggle-content">
              <span className="toggle-label">Project updates</span>
              <span className="toggle-description">Email notifications for project updates</span>
            </div>
          </label>

          <label className="toggle-item">
            <input
              type="checkbox"
              checked={notifications.reportGeneration}
              onChange={() => handleNotificationToggle('reportGeneration')}
            />
            <div className="toggle-content">
              <span className="toggle-label">Report generation</span>
              <span className="toggle-description">Email notifications when reports are generated</span>
            </div>
          </label>
        </div>
      </section>

      {/* Section D: Danger Zone */}
      <section className="settings-section danger-zone">
        <h2 className="section-title">Danger Zone</h2>
        <div className="danger-actions">
          <div className="danger-action-item">
            <div>
              <h3 className="danger-action-title">Leave Organization</h3>
              <p className="danger-action-description">Remove yourself from this organization</p>
            </div>
            <button type="button" className="btn-danger" onClick={handleLeaveOrganization}>
              Leave Organization
            </button>
          </div>

          <div className="danger-action-item">
            <div>
              <h3 className="danger-action-title">Delete Account</h3>
              <p className="danger-action-description">Permanently delete your account and all data</p>
            </div>
            <button type="button" className="btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
