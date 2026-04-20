import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import WorkforcePage from './pages/WorkforcePage'
import LegalRecordsPage from './pages/LegalRecordsPage'
import IncidentsPage from './pages/IncidentsPage'
import WorkPermitsPage from './pages/WorkPermitsPage'
import AuditsPage from './pages/AuditsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import TeamPage from './pages/TeamPage'

function App() {
  return (
    <Routes>
      {/* Login — No layout */}
      <Route path="/" element={<LoginPage />} />

      {/* App Shell — With Sidebar + Navbar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workforce" element={<WorkforcePage />} />
        <Route path="/legal" element={<LegalRecordsPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/permits" element={<WorkPermitsPage />} />
        <Route path="/audits" element={<AuditsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
