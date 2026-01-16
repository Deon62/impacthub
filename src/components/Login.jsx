import { useState } from 'react'
import './Login.css'

function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    // Navigate to Admin dashboard
    onLogin && onLogin({ email, password, type: 'admin' })
  }

  const handleGoogleLogin = () => {
    // Navigate to NGO dashboard
    onLogin && onLogin({ provider: 'google', type: 'ngo' })
  }

  const handleAppleLogin = () => {
    // Navigate to Funders dashboard
    onLogin && onLogin({ provider: 'apple', type: 'funder' })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <div className="social-login">
          <button type="button" className="btn-social btn-google" onClick={handleGoogleLogin}>
            <img src="/assets/google.png" alt="Google" className="social-icon" />
            Continue with Google
          </button>
          <button type="button" className="btn-social btn-apple" onClick={handleAppleLogin}>
            <img src="/assets/apple.png" alt="Apple" className="social-icon" />
            Continue with Apple
          </button>
        </div>

        <div className="divider">
          <span className="divider-text">or</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-actions">
            <a href="#" className="forgot-password-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-login">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <button className="back-link" onClick={onBack}>
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
