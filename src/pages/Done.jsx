import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'
import CvDocument from '../components/CvDocument'

export default function Done() {
  const { cv, template } = useCv()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSaved(true), 600)
    return () => clearTimeout(timer)
  }, [])

  function handleDownload() {
    const content = [
      cv.name,
      cv.jobTitle,
      [cv.email, cv.phone, cv.location].filter(Boolean).join(' · '),
      [cv.linkedin, cv.portfolio].filter(Boolean).join(' · '),
      '',
      'Summary:', cv.summary,
      '',
      'Education:', cv.education,
      '',
      'Experience:', cv.experience,
      '',
      'Projects:', cv.projects,
      '',
      'Skills:', cv.skills,
      '',
      'Languages:', cv.languages,
      '',
      'Certificates & Training:', cv.certificates,
      cv.certificateImages.length > 0
        ? `\nCertificate images (${cv.certificateImages.length}) are included in the app preview, not this text file.`
        : '',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${cv.name || 'cv'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleFinish() {
    navigate('/choice')
  }

  function handleCompareSkills() {
    navigate('/skills', { state: { from: 'done' } })
  }

  if (!saved) {
    return (
      <div className="page centered">
        <div className="card">
          <p>Saving your information…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>All Set!</h1>
      <p className="subtitle">Your CV has been saved. Here's the final result.</p>

      <CvDocument cv={cv} template={template} />

      <div className="finalize-question">
        <div className="actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            Download CV
          </button>
          <button className="btn btn-secondary" onClick={handleCompareSkills}>
            Compare Skills
          </button>
          <button className="btn btn-secondary" onClick={handleFinish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  )
}
