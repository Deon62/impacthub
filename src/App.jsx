import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import NGODashboard from './components/dashboards/NGODashboard'
import FundersDashboard from './components/dashboards/FundersDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('entry')

  const handleLoginSubmit = (credentials) => {
    if (credentials.type === 'ngo') {
      setCurrentPage('ngo')
    } else if (credentials.type === 'funder') {
      setCurrentPage('funder')
    }
  }

  if (currentPage === 'login') {
    return <Login onBack={() => setCurrentPage('entry')} onLogin={handleLoginSubmit} />
  }

  if (currentPage === 'ngo') {
    return <NGODashboard onLogout={() => setCurrentPage('entry')} />
  }

  if (currentPage === 'funder') {
    return <FundersDashboard onLogout={() => setCurrentPage('entry')} />
  }

  return (
    <div className="home-layout">
      {/* LEFT */}
      <div className="home-left">
        <div className="home-left-content">
          <h1 className="home-hero-title">
            Turn projects and funding into trusted impact evidence.
          </h1>

          <p className="home-hero-subtitle">
            A secure platform for NGOs and funders to track projects, funding flows,
            and measurable outcomes all in one place.
          </p>

          <div className="home-buttons">
            <button
              className="btn-primary"
              onClick={() => setCurrentPage('login')}
            >
              Get Started
            </button>

            <button className="btn-secondary">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="home-right">
        <img
          src="/assets/home.jpg"
          alt="Abstract representation of transparency and flow"
          className="home-image"
        />
      </div>
    </div>
  )
}

export default App
