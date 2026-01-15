import { useState } from 'react'
import './NGODashboard.css'
import { 
  DashboardIcon, 
  ProjectsIcon, 
  ReportsIcon, 
  DonationsIcon, 
  OrganizationIcon, 
  UsersIcon, 
  SettingsIcon, 
  LogoutIcon 
} from '../icons/Icons'
import DashboardContent from './DashboardContent'
import ProjectsPage from './ProjectsPage'
import ReportsPage from './ReportsPage'
import DonationsPage from './DonationsPage'
import OrganizationPage from './OrganizationPage'
import UsersPage from './UsersPage'
import SettingsPage from './SettingsPage'
import ProjectDetailPage from './ProjectDetailPage'
import CreateProjectPage from './CreateProjectPage'

function NGODashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [settingsActive, setSettingsActive] = useState(false)
  const [viewingProject, setViewingProject] = useState(null)
  const [creatingProject, setCreatingProject] = useState(false)

  const handleViewProject = (projectId) => {
    setViewingProject(projectId)
    setActiveNav('')
    setSettingsActive(false)
    setCreatingProject(false)
  }

  const handleCreateProject = (newProject) => {
    // TODO: Save project to backend
    console.log('Creating project:', newProject)
    // After creation, view the new project
    setViewingProject(newProject.id)
    setCreatingProject(false)
    setActiveNav('')
    setSettingsActive(false)
  }

  const handleCancelCreate = () => {
    setCreatingProject(false)
    setActiveNav('projects')
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'projects', label: 'Projects', icon: ProjectsIcon },
    { id: 'reports', label: 'Impact Summaries', icon: ReportsIcon },
    { id: 'donations', label: 'Donations', icon: DonationsIcon },
    { id: 'organization', label: 'Organization', icon: OrganizationIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
  ]

  const handleLogout = () => {
    onLogout && onLogout()
  }

  return (
    <div className="ngo-dashboard">
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
                className={`nav-item ${activeNav === item.id && !viewingProject && !creatingProject ? 'active' : ''}`}
                onClick={() => {
                  setViewingProject(null)
                  setCreatingProject(false)
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
            className={`nav-item ${settingsActive && !viewingProject ? 'active' : ''}`} 
            onClick={() => {
              setViewingProject(null)
              setCreatingProject(false)
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
          {creatingProject ? (
            <CreateProjectPage 
              onCancel={handleCancelCreate}
              onCreateProject={handleCreateProject}
            />
          ) : viewingProject ? (
            <ProjectDetailPage 
              projectId={viewingProject}
              onBack={() => {
                setViewingProject(null)
                setActiveNav('projects')
              }}
              onEdit={(projectId) => {
                // TODO: Navigate to edit project
                console.log('Edit project:', projectId)
              }}
              onGenerateReport={(projectId) => {
                setViewingProject(null)
                setActiveNav('reports')
                // TODO: Pre-select project in reports page
              }}
            />
          ) : (
            <>
              {activeNav === 'dashboard' && <DashboardContent onViewProject={handleViewProject} onNavigateToReports={() => setActiveNav('reports')} />}
              {activeNav === 'projects' && <ProjectsPage onViewProject={handleViewProject} onCreateProject={() => setCreatingProject(true)} />}
              {activeNav === 'reports' && <ReportsPage />}
              {activeNav === 'donations' && <DonationsPage />}
              {activeNav === 'organization' && <OrganizationPage />}
              {activeNav === 'users' && <UsersPage />}
              {settingsActive && <SettingsPage onLogout={handleLogout} />}
              {!['dashboard', 'projects', 'reports', 'donations', 'organization', 'users'].includes(activeNav) && !settingsActive && (
                <>
                  <h2 className="page-title">
                    {navigationItems.find(item => item.id === activeNav)?.label || 'Dashboard'}
                  </h2>
                  <div className="page-content">
                    <p>Content for {activeNav} will go here.</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default NGODashboard
