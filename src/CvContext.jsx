import { createContext, useContext, useState } from 'react'

const CvContext = createContext(null)

const emptyCv = {
  name: '',
  photo: null,
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  education: '',
  experience: '',
  projects: '',
  skills: '',
  languages: '',
  certificates: '',
  certificateImages: [],
}

export function CvProvider({ children }) {
  const [user, setUser] = useState(null)
  const [template, setTemplate] = useState('modern')
  const [cv, setCv] = useState(emptyCv)

  const login = (username) => setUser({ username })
  const logout = () => {
    setUser(null)
    setTemplate('modern')
    setCv(emptyCv)
  }

  const value = { user, login, logout, template, setTemplate, cv, setCv }
  return <CvContext.Provider value={value}>{children}</CvContext.Provider>
}

export function useCv() {
  const ctx = useContext(CvContext)
  if (!ctx) throw new Error('useCv must be used within CvProvider')
  return ctx
}
