"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"
import { CreateJournalPage } from "./pages/CreateJournalPage"
import { ThemeSelectionPage } from "./pages/ThemeSelectionPage"
import { JournalViewPage } from "./pages/JournalViewPage"
import { EditJournalPage } from "./pages/EditJournalPage"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateJournalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theme-selection"
            element={
              <ProtectedRoute>
                <ThemeSelectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal/:id"
            element={
              <ProtectedRoute>
                <JournalViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditJournalPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
