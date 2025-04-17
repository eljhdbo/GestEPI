import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EpiPage from './pages/EpiPage'
import ControlePage from './pages/ControlePage'
import AlertsPage from './pages/AlertsPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/epis" />} />
        <Route path="/epis" element={<EpiPage />} />
        <Route path="/controles" element={<ControlePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Routes>
    </Router>
  )
}

export default App
