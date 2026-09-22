import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'

const eyeCommon = { width: 18, height: 18, viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

function EyeIcon() {
  return (
    <svg {...eyeCommon}>
      <path d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg {...eyeCommon}>
      <path d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6z" />
      <circle cx="10" cy="10" r="2.5" />
      <path d="M2.5 2.5l15 15" />
    </svg>
  )
}

export default function Login() {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useCv()
  const navigate = useNavigate()

  function switchMode() {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
    setConfirmPassword('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!username.trim() || password.trim().length < 4) {
      setError('Wrong information. Please check your username and password (min 4 characters).')
      return
    }

    if (mode === 'signup') {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setError('')
    login(username.trim())
    navigate('/choice')
  }

  return (
    <div className="page centered">
      <div className="card auth-card">
        <h1>Credora</h1>
        <p className="subtitle">{mode === 'login' ? 'Log in to your account' : 'Create a new account'}</p>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="jane_doe" />
          </label>

          {mode === 'signup' && (
            <>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="555-1234"
                />
              </label>
            </>
          )}

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </label>

          {mode === 'signup' && (
            <label>
              Re-enter Password
              <div className="password-field">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </label>
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn btn-primary">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <button type="button" className="btn-link" onClick={switchMode}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  )
}
