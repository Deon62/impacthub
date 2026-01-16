import { useState } from 'react'
import './FundersDashboard.css'
import { 
  DashboardIcon, 
  ProjectsIcon, 
  ReportsIcon, 
  DonationsIcon, 
  OrganizationIcon, 
  SettingsIcon, 
  LogoutIcon 
} from '../icons/Icons'
import FundersDashboardContent from './FundersDashboardContent'
import FundedProjectsPage from './FundedProjectsPage'
import FundersDonationsPage from './FundersDonationsPage'
import FundersReportsPage from './FundersReportsPage'
import FundersSDGOverviewPage from './FundersSDGOverviewPage'
import FundersOrganizationPage from './FundersOrganizationPage'
import SettingsPage from './SettingsPage'

function FundersDashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [settingsActive, setSettingsActive] = useState(false)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'funded-projects', label: 'Funded Projects', icon: ProjectsIcon },
    { id: 'donations', label: 'Donations', icon: DonationsIcon },
    { id: 'reports', label: 'Reports', icon: ReportsIcon },
  ]

  const secondaryItems = [
    { id: 'sdg-overview', label: 'SDG Overview', icon: ProjectsIcon },
    { id: 'organization', label: 'Organization Profile', icon: OrganizationIcon },
  ]

  const handleLogout = () => {
    onLogout && onLogout()
  }

  return (
    <div className="funders-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-logo">ImpactHub</h1>
        </div>
        
        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id && !settingsActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id)
                  setSettingsActive(false)
                }}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-separator"></div>

        <nav className="sidebar-nav sidebar-nav-secondary">
          {secondaryItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id && !settingsActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id)
                  setSettingsActive(false)
                }}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-separator"></div>

        <div className="sidebar-footer">
          <button 
            className={`nav-item ${settingsActive ? 'active' : ''}`} 
            onClick={() => {
              setActiveNav('')
              setSettingsActive(true)
            }}
          >
            <SettingsIcon className="nav-icon" />
            <span className="nav-label">Settings</span>
          </button>
          <button className="nav-item nav-item-logout" onClick={handleLogout}>
            <LogoutIcon className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {activeNav === 'dashboard' && (
            <FundersDashboardContent 
              onViewAllProjects={() => setActiveNav('funded-projects')}
              onViewAllDonations={() => setActiveNav('donations')}
              onViewAllReports={() => setActiveNav('reports')}
            />
          )}
          {activeNav === 'funded-projects' && <FundedProjectsPage />}
          {activeNav === 'donations' && <FundersDonationsPage />}
          {activeNav === 'reports' && <FundersReportsPage />}
          {activeNav === 'sdg-overview' && <FundersSDGOverviewPage />}
          {activeNav === 'organization' && <FundersOrganizationPage />}
          {settingsActive && <SettingsPage onLogout={handleLogout} />}
        </div>
      </main>
    </div>
  )
}

export default FundersDashboard
