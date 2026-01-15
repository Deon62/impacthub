import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import NGODashboard from './components/dashboards/NGODashboard'
import FundersDashboard from './components/dashboards/FundersDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('entry') // 'entry', 'login', 'ngo', 'funder', 'admin'
  const [userType, setUserType] = useState(null)

  const handleLogin = () => {
    setCurrentPage('login')
  }

  const handleRequestNGOAccess = () => {
    // TODO: Navigate to NGO signup/request access page
    console.log('Navigate to request NGO access')
  }

  const handleRequestFunderAccess = () => {
    // TODO: Navigate to Funder signup/request access page
    console.log('Navigate to request Funder access')
  }

  const handleBackToHome = () => {
    setCurrentPage('entry')
    setUserType(null)
  }

  const handleLoginSubmit = (credentials) => {
    if (credentials.type === 'ngo') {
      setUserType('ngo')
      setCurrentPage('ngo')
    } else if (credentials.type === 'funder') {
      setUserType('funder')
      setCurrentPage('funder')
    } else if (credentials.type === 'admin') {
      setUserType('admin')
      setCurrentPage('admin')
    }
  }

  const handleLogout = () => {
    setCurrentPage('entry')
    setUserType(null)
  }

  if (currentPage === 'login') {
    return <Login onBack={handleBackToHome} onLogin={handleLoginSubmit} />
  }

  if (currentPage === 'ngo') {
    return <NGODashboard onLogout={handleLogout} />
  }

  if (currentPage === 'funder') {
    return <FundersDashboard onLogout={handleLogout} />
  }

  if (currentPage === 'admin') {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <p>Coming soon...</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div className="entry-page" style={{ backgroundColor: '#F7F9FC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="entry-content" style={{ position: 'relative', zIndex: 10 }}>
        <h1 className="product-name" style={{ color: '#1F3A5F' }}>ImpactHub</h1>
        <p className="value-proposition" style={{ color: '#1A1A1A' }}>
          Professional NGO reporting and tracking for high-stakes funding review
        </p>
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleLogin}>
            Login
          </button>
          <button className="btn-secondary" onClick={handleRequestNGOAccess}>
            Request NGO Access
          </button>
        </div>
        <div className="secondary-action">
          <button className="btn-tertiary" onClick={handleRequestFunderAccess}>
            Request Funder Access
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
