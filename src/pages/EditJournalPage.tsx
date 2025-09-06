"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import type { Journal } from "../types"
import { apiService } from "../services/api"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Button } from "../components/ui/Button"

export const EditJournalPage: React.FC = () => {
  const [journal, setJournal] = useState<Journal | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJournal()
  }, [id])

  const fetchJournal = async () => {
    if (!id) return

    try {
      const response = await apiService.getAllJournals()
      const foundJournal = response.data.find((j) => j.id == id)
      if (foundJournal) {
        setJournal(foundJournal)
        setTitle(foundJournal.title)
        setContent(foundJournal.content)
      }
    } catch (error) {
      console.error("Error fetching journal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!journal || !title.trim() || !content.trim()) return

    setIsSaving(true)
    try {
      await apiService.createJournal({
        ...journal,
        title: title.trim(),
        content: content.trim(),
      })
      navigate(`/journal/${journal.id}`)
    } catch (error) {
      console.error("Error saving journal:", error)
      alert("Failed to save journal. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-lg">Loading journal...</div>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-lg">Journal not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => navigate(`/journal/${journal.id}`)} className="text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <main className="p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />

          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />

          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || isSaving}
            isLoading={isSaving}
            className="w-full py-3"
          >
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  )
}
