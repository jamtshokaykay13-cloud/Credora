import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'

const JOB_SKILLS = {
  'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  'Data Analyst': ['SQL', 'Excel', 'Python', 'Statistics', 'Data Visualization'],
  'Project Manager': ['Communication', 'Agile', 'Risk Management', 'Budgeting'],
}

export default function SkillsCheck() {
  const { cv } = useCv()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? 'choice'
  const [job, setJob] = useState('Frontend Developer')

  const mySkills = new Set(cv.skills.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean))
  const required = JOB_SKILLS[job]
  const missing = required.filter((s) => !mySkills.has(s.toLowerCase()))

  return (
    <div className="page">
      <h1>Check Required Skill Sets</h1>
      <p className="subtitle">Compare your CV skills against jobs you're interested in.</p>

      <label className="job-select">
        Job of interest
        <select value={job} onChange={(e) => setJob(e.target.value)}>
          {Object.keys(JOB_SKILLS).map((j) => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </label>

      <div className="skills-result">
        <h3>Required Skills</h3>
        <ul className="chip-list">
          {required.map((s) => (
            <li key={s} className={`chip${mySkills.has(s.toLowerCase()) ? ' chip-have' : ' chip-missing'}`}>
              {s}
            </li>
          ))}
        </ul>

        {missing.length > 0 ? (
          <p className="hint">You're missing: {missing.join(', ')}. Add them to your CV if applicable.</p>
        ) : (
          <p className="hint hint-good">Your CV covers all required skills for this role.</p>
        )}
      </div>

      <div className="actions">
        {from === 'done' && (
          <>
            <button className="btn btn-secondary" onClick={() => navigate('/details')}>
              Back to Edit CV
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/done')}>
              Back to Download
            </button>
          </>
        )}
        {from === 'choice' && (
          <>
            <button className="btn btn-secondary" onClick={() => navigate('/choice')}>
              Back to Menu
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/details')}>
              Design a CV
            </button>
          </>
        )}
      </div>
    </div>
  )
}
