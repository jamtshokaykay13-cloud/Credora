function ListSection({ title, items, emptyText, className = 'chip-list', itemClassName = 'chip' }) {
  return (
    <section>
      <h3>{title}</h3>
      {items.length > 0 ? (
        <ul className={className}>
          {items.map((item) => (
            <li key={item} className={itemClassName}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="cv-placeholder">{emptyText}</p>
      )}
    </section>
  )
}

function TextSection({ title, text, emptyText }) {
  return (
    <section>
      <h3>{title}</h3>
      {text ? <p>{text}</p> : <p className="cv-placeholder">{emptyText}</p>}
    </section>
  )
}

export default function CvDocument({ cv, template }) {
  const skills = cv.skills.split(',').map((s) => s.trim()).filter(Boolean)
  const languages = cv.languages.split(',').map((l) => l.trim()).filter(Boolean)
  const certificates = cv.certificates.split('\n').map((c) => c.trim()).filter(Boolean)
  const contactLines = [cv.email, cv.phone, cv.location].filter(Boolean)
  const linkLines = [cv.linkedin, cv.portfolio].filter(Boolean)

  return (
    <div className={`cv-preview template-${template}`}>
      <header className="cv-header">
        {cv.photo && <img src={cv.photo} alt={cv.name || 'Profile'} className="cv-photo" />}
        <div>
          <h2>{cv.name || 'Your Name'}</h2>
          <p className="cv-job-title">{cv.jobTitle || 'Desired job title'}</p>
        </div>
      </header>

      <div className="cv-body">
        <aside className="cv-sidebar">
          <section>
            <h3>Contact</h3>
            {contactLines.length > 0 ? (
              <ul className="cv-contact-list">
                {contactLines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            ) : (
              <p className="cv-placeholder">No contact details yet</p>
            )}
            {linkLines.length > 0 && (
              <ul className="cv-contact-list">
                {linkLines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            )}
          </section>

          <ListSection title="Skills" items={skills} emptyText="No skills added yet" />
          <ListSection title="Languages" items={languages} emptyText="No languages added yet" />

          <section>
            <h3>Certificates & Training</h3>
            {certificates.length > 0 ? (
              <ul className="cert-list">
                {certificates.map((c) => <li key={c}>{c}</li>)}
              </ul>
            ) : (
              <p className="cv-placeholder">No certificates added yet</p>
            )}
            {cv.certificateImages.length > 0 && (
              <div className="cert-image-grid">
                {cv.certificateImages.map((img) => (
                  <div key={img.id} className="cert-image-item">
                    <img src={img.dataUrl} alt={img.name} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>

        <main className="cv-main">
          <TextSection title="Summary" text={cv.summary} emptyText="No summary added yet" />
          <TextSection title="Experience" text={cv.experience} emptyText="No experience added yet" />
          <TextSection title="Projects" text={cv.projects} emptyText="No projects added yet" />
          <TextSection title="Education" text={cv.education} emptyText="No education added yet" />
        </main>
      </div>
    </div>
  )
}
