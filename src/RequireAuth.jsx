import { Navigate } from 'react-router-dom'
import { useCv } from './CvContext'
import AppHeader from './components/AppHeader'

export default function RequireAuth({ children }) {
  const { user } = useCv()
  if (!user) return <Navigate to="/" replace />
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}
