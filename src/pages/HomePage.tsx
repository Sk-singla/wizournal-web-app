"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import type { Journal } from "../types"
import { apiService } from "../services/api"
import { JournalCard } from "../components/JournalCard"
import { Button } from "../components/ui/Button"

export const HomePage: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Removed swipedJournalId state

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      const response = await apiService.getAllJournals()
      setJournals(response.data)
    } catch (error) {
      console.error("Error fetching journals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteJournal = async (journalId: string) => {
    try {
      await apiService.deleteJournal(journalId)
      setJournals(journals.filter((j) => j.id !== journalId))
    } catch (error) {
      console.error("Error deleting journal:", error)
    }
  }

  const handleJournalClick = (journal: Journal) => {
    navigate(`/journal/${journal.id}`)
  }

  // Removed handleSwipe

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-lg text-center">
          Loading Journals...<br />
          <span className="text-gray-400 text-base">Waking up Render's free instance... Might take some time</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Wizournal</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={logout} variant="ghost" size="sm" className="text-gray-300 hover:text-gray-800">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="p-4 pb-20">
        {journals.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-4">No journals yet</h2>
            <p className="text-gray-400 mb-8">Start your magical journaling journey!</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-md mx-auto">
            <AnimatePresence>
              {journals.map((journal) => (
                <motion.div
                  key={journal.id}
                  className="relative"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <JournalCard
                    journal={journal}
                    onClick={() => handleJournalClick(journal)}
                    onDelete={() => handleDeleteJournal(journal.id)}
                  />
                  <button
                    onClick={() => handleDeleteJournal(journal.id)}
                    className="absolute top-2 right-2 text-gray-200 hover:text-primary p-2"
                    aria-label="Delete journal"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => navigate("/create")}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <Plus className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  )
}
