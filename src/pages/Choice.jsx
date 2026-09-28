import { useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'

export default function Choice() {
  const navigate = useNavigate()
  const { cv } = useCv()
  const hasExistingCv = Boolean(cv.name || cv.email)

  return (
    <div className="page">
      <h1>What would you like to do?</h1>
      <p className="subtitle">Choose an option to get started.</p>

      <div className="grid-cards">
        {hasExistingCv && (
          <button className="template-card" onClick={() => navigate('/details')}>
            <div className="template-swatch swatch-classic" />
            <h3>Manage My CV</h3>
            <p>Update your details, certifications, skills, projects and experience.</p>
          </button>
        )}
        <button className="template-card" onClick={() => navigate('/details')}>
          <div className="template-swatch swatch-modern" />
          <h3>Design a CV</h3>
          <p>Fill in your details, then pick a template while you preview it.</p>
        </button>
        <button className="template-card" onClick={() => navigate('/skills', { state: { from: 'choice' } })}>
          <div className="template-swatch swatch-minimal" />
          <h3>Check Skill Set</h3>
          <p>See what skills are required for a job you're interested in.</p>
        </button>
        <button className="template-card" onClick={() => navigate('/job-info')}>
          <div className="template-swatch swatch-classic" />
          <h3>Job Information</h3>
          <p>Filter jobs and read what each one focuses on before you tailor your CV.</p>
        </button>
      </div>
    </div>
  )
}
