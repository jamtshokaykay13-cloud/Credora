import { useNavigate } from 'react-router-dom'
import { useCv } from '../CvContext'

export default function CvForm() {
  const { cv, setCv } = useCv()
  const navigate = useNavigate()

  function update(field) {
    return (e) => {
      const { value } = e.target
      setCv((prev) => ({ ...prev, [field]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/preview')
  }

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCv((prev) => ({ ...prev, photo: reader.result }))
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function removePhoto() {
    setCv((prev) => ({ ...prev, photo: null }))
  }

  function handleCertificateImages(e) {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setCv((prev) => ({
          ...prev,
          certificateImages: [
            ...prev.certificateImages,
            { id: `${Date.now()}-${file.name}`, name: file.name, dataUrl: reader.result },
          ],
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  function removeCertificateImage(id) {
    setCv((prev) => ({ ...prev, certificateImages: prev.certificateImages.filter((img) => img.id !== id) }))
  }

  return (
    <div className="page">
      <h1>Enter Your CV Information</h1>

      <form onSubmit={handleSubmit} className="form form-grid">
        <div className="full photo-field">
          {cv.photo ? (
            <img src={cv.photo} alt="Profile" className="photo-preview" />
          ) : (
            <div className="photo-preview photo-placeholder">No photo</div>
          )}
          <div className="photo-field-controls">
            <label className="photo-upload-label">
              Profile Photo
              <input type="file" accept="image/*" onChange={handlePhoto} />
            </label>
            {cv.photo && (
              <button type="button" className="btn-link" onClick={removePhoto}>
                Remove photo
              </button>
            )}
          </div>
        </div>
        <label>
          Full Name
          <input value={cv.name} onChange={update('name')} required />
        </label>
        <label>
          Job Title / Desired Role
          <input value={cv.jobTitle} onChange={update('jobTitle')} placeholder="Frontend Developer" />
        </label>
        <label>
          Email
          <input type="email" value={cv.email} onChange={update('email')} required />
        </label>
        <label>
          Phone
          <input value={cv.phone} onChange={update('phone')} />
        </label>
        <label>
          Location
          <input value={cv.location} onChange={update('location')} placeholder="City, Country" />
        </label>
        <label>
          Languages (comma separated)
          <input value={cv.languages} onChange={update('languages')} placeholder="English, Dzongkha" />
        </label>
        <label>
          LinkedIn
          <input value={cv.linkedin} onChange={update('linkedin')} placeholder="linkedin.com/in/username" />
        </label>
        <label>
          Portfolio / Website
          <input value={cv.portfolio} onChange={update('portfolio')} placeholder="yourportfolio.com" />
        </label>
        <label className="full">
          Summary
          <textarea rows={3} value={cv.summary} onChange={update('summary')} />
        </label>
        <label className="full">
          Education
          <textarea rows={3} value={cv.education} onChange={update('education')} />
        </label>
        <label className="full">
          Experience
          <textarea rows={4} value={cv.experience} onChange={update('experience')} />
        </label>
        <label className="full">
          Projects
          <textarea
            rows={3}
            value={cv.projects}
            onChange={update('projects')}
            placeholder="Project name – short description of what you built and the tools used"
          />
        </label>
        <label className="full">
          Skills (comma separated)
          <input value={cv.skills} onChange={update('skills')} placeholder="React, JavaScript, CSS" />
        </label>
        <label className="full">
          Certificates & Training (one per line)
          <textarea
            rows={3}
            value={cv.certificates}
            onChange={update('certificates')}
            placeholder={'AWS Certified Developer – Associate\nGoogle UX Design Certificate'}
          />
        </label>

        <label className="full">
          Certificate Images
          <input type="file" accept="image/*" multiple onChange={handleCertificateImages} />
        </label>

        {cv.certificateImages.length > 0 && (
          <div className="full cert-image-grid">
            {cv.certificateImages.map((img) => (
              <div key={img.id} className="cert-image-item">
                <img src={img.dataUrl} alt={img.name} />
                <button type="button" className="cert-image-remove" onClick={() => removeCertificateImage(img.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="full actions">
          <button type="submit" className="btn btn-primary">
            Preview CV
          </button>
        </div>
      </form>
    </div>
  )
}
