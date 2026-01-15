import { useState } from 'react'
import './UsersPage.css'

function UsersPage() {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('staff')
  const isAdmin = true // TODO: Get from auth context
  const currentUserEmail = 'admin@impactngo.org' // TODO: Get from auth context

  // Mock data - replace with actual data later
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'admin@impactngo.org', role: 'admin', status: 'active', lastActive: '2024-01-15T10:30:00' },
    { id: 2, name: 'Jane Smith', email: 'jane@impactngo.org', role: 'staff', status: 'active', lastActive: '2024-01-14T15:20:00' },
  ])

  const handleInviteUser = (e) => {
    e.preventDefault()
    // TODO: Send invite
    const newUser = {
      id: users.length + 1,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'invited',
      lastActive: null,
    }
    setUsers([...users, newUser])
    setShowInviteModal(false)
    setInviteEmail('')
    setInviteRole('staff')
  }

  const handleRoleChange = (userId, newRole) => {
    if (!isAdmin) return
    
    const adminCount = users.filter(u => u.role === 'admin' && u.id !== userId).length
    if (newRole !== 'admin' && adminCount === 0) {
      alert('At least one Admin is required')
      return
    }

    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
  }

  const handleRemoveUser = (userId, userEmail) => {
    if (userEmail === currentUserEmail) {
      alert('You cannot remove yourself')
      return
    }

    const user = users.find(u => u.id === userId)
    if (user.role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length
      if (adminCount === 1) {
        alert('At least one Admin is required')
        return
      }
    }

    if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="users-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage organization users and roles</p>
        </div>
        <button className="btn-primary" onClick={() => setShowInviteModal(true)}>
          Invite User
        </button>
      </div>

      {/* Section A: Users Table */}
      {users.length > 0 ? (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {isAdmin && user.email !== currentUserEmail ? (
                      <select
                        className="role-select"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                      </select>
                    ) : (
                      <span className="role-badge">{user.role}</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${user.status === 'active' ? 'status-active' : 'status-invited'}`}>
                      {user.status === 'active' ? 'Active' : 'Invited'}
                    </span>
                  </td>
                  <td className="last-active">{formatDate(user.lastActive)}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action">Edit</button>
                      {user.email !== currentUserEmail && (
                        <button 
                          className="btn-action btn-remove"
                          onClick={() => handleRemoveUser(user.id, user.email)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Section C: Empty State */
        <div className="empty-state">
          <p className="empty-message">No users added yet.</p>
          <button className="btn-primary" onClick={() => setShowInviteModal(true)}>
            Invite first user
          </button>
        </div>
      )}

      {/* Section B: Invite User Modal */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Invite User</h3>
              <button className="modal-close" onClick={() => setShowInviteModal(false)}>×</button>
            </div>
            <form className="modal-body" onSubmit={handleInviteUser}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersPage
