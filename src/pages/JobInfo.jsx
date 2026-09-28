import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JOB_INFO = {
  'Frontend Developer': {
    focus: 'Building the visual, interactive parts of websites and web apps that users see and click on.',
    description:
      'Frontend developers turn designs into working interfaces using HTML, CSS and JavaScript, often with frameworks like React. They care about layout, responsiveness, accessibility and making sure the app feels fast and intuitive for the end user.',
  },
  'Data Analyst': {
    focus: 'Turning raw data into clear insights that help a business make decisions.',
    description:
      'Data analysts collect, clean and explore data, then use tools like SQL, Excel and Python to spot trends and build reports or dashboards. They work closely with teams to answer specific business questions with evidence rather than guesswork.',
  },
  'Project Manager': {
    focus: 'Keeping a project on track by coordinating people, time and budget.',
    description:
      'Project managers plan the work, set milestones, and make sure the team stays aligned with the goal. They handle risks, communicate progress to stakeholders, and remove blockers so the team can deliver on time and within budget.',
  },
}

export default function JobInfo() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(() => new Set())

  const jobNames = Object.keys(JOB_INFO).filter((j) =>
    j.toLowerCase().includes(query.trim().toLowerCase())
  )

  const toggle = (job) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(job)) {
        next.delete(job)
      } else {
        next.add(job)
      }
      return next
    })
  }

  return (
    <div className="page">
      <h1>Job Information</h1>
      <p className="subtitle">Explore what different jobs focus on before you tailor your CV.</p>

      <label className="job-select">
        Filter jobs
        <input
          type="text"
          placeholder="Search job title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {jobNames.length === 0 ? (
        <div className="skills-result">
          <p className="hint">No job matches your filter. Try a different search.</p>
        </div>
      ) : (
        jobNames.map((job) => {
          const info = JOB_INFO[job]
          const isOpen = expanded.has(job)
          return (
            <div className="skills-result" key={job}>
              <div className="job-info-header">
                <h3>{job}</h3>
                <span
                  className="job-toggle"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(job)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(job)}
                >
                  {isOpen ? 'Show less' : 'Show more'}
                </span>
              </div>
              {isOpen && (
                <>
                  <p><strong>Focus:</strong> {info.focus}</p>
                  <p>{info.description}</p>
                </>
              )}
            </div>
          )
        })
      )}

      <div className="actions">
        <button className="btn btn-secondary" onClick={() => navigate('/choice')}>
          Back to Menu
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/skills', { state: { from: 'choice' } })}>
          Check Skill Set
        </button>
      </div>
    </div>
  )
}
