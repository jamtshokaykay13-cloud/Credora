import { Link, useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'

export default function AppHeader() {
  const { user, logout } = useCv()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="app-header">
      <Link to="/choice" className="app-brand">Credora</Link>
      <div className="app-header-right">
        {user && <span className="app-username">{user.username}</span>}
        <button className="btn-link" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  )
}
