"use client"

import type React from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { ThemeSelector } from "../components/ThemeSelector"
import type { JournalTheme } from "../types"
import { getThemePresets } from "../utils/backgroundUtils"
import { apiService } from "../services/api"

export const ThemeSelectionPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { title, content } = location.state as { title: string; content: string }
  const themePresets = getThemePresets()
  const [selectedTheme, setSelectedTheme] = useState<JournalTheme | null>(themePresets.length > 0 ? themePresets[0] : null)
  const [isGenerating, setIsGenerating] = useState(false)


  const handleGenerate = async () => {
    if (!selectedTheme) return

    setIsGenerating(true)
    try {
      const response = await apiService.generateJournal({
        userInput: content,
        theme: selectedTheme,
      })

      const journal = {
        title: response.data.title,
        content: response.data.content,
        theme: selectedTheme,
        backgroundInfo: response.data.backgroundInfo,
      }

      navigate(`/journal/${response.data.id}`)
    } catch (error) {
      console.error("Error generating journal:", error)
      alert("Failed to generate journal. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <header className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="p-4">
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Your Journal Entry</h3>
            <h4 className="text-white font-semibold mb-2">{title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {content.length > 150 ? content.substring(0, 150) + "..." : content}
            </p>
          </div>
        </div>

        <ThemeSelector
          selectedTheme={selectedTheme}
          onThemeSelect={setSelectedTheme}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  )
}
