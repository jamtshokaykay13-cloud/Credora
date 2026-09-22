import { useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'
import CvDocument from '../components/CvDocument'
import { TEMPLATES } from '../templates'

export default function Preview() {
  const { cv, template, setTemplate } = useCv()
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1>Preview Your CV</h1>
      <p className="subtitle">Not happy with the look? Switch templates below — your CV updates instantly.</p>

      <div className="template-switcher">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`template-swatch-btn${template === t.id ? ' selected' : ''}`}
            onClick={() => setTemplate(t.id)}
          >
            <span className={`template-swatch swatch-${t.id}`} />
            {t.name}
          </button>
        ))}
      </div>

      <CvDocument cv={cv} template={template} />

      <div className="finalize-question">
        <p>Is this CV ready to finalize?</p>
        <div className="actions">
          <button className="btn btn-secondary" onClick={() => navigate('/details')}>
            Edit CV
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/done')}>
            Yes, finalize
          </button>
        </div>
      </div>
    </div>
  )
}
