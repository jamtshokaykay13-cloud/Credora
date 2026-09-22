import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CvProvider } from './CvContext'
import RequireAuth from './RequireAuth'
import Login from './pages/Login'
import Choice from './pages/Choice'
import CvForm from './pages/CvForm'
import Preview from './pages/Preview'
import SkillsCheck from './pages/SkillsCheck'
import Done from './pages/Done'
import './App.css'

export default function App() {
  return (
    <CvProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/choice" element={<RequireAuth><Choice /></RequireAuth>} />
          <Route path="/details" element={<RequireAuth><CvForm /></RequireAuth>} />
          <Route path="/preview" element={<RequireAuth><Preview /></RequireAuth>} />
          <Route path="/skills" element={<RequireAuth><SkillsCheck /></RequireAuth>} />
          <Route path="/done" element={<RequireAuth><Done /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </CvProvider>
  )
}
