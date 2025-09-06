"use client"
import React, { useState } from "react"
import { useVoiceRecording } from "../hooks/useVoiceRecording"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Keyboard } from "lucide-react"
import { VoiceRecorder } from "../components/VoiceRecorder"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { apiService } from "../services/api"

export const CreateJournalPage: React.FC = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  // Remove isVoiceMode
  const {
    isRecording,
    transcript,
    isSupported,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useVoiceRecording()
  // Remove showSaveOptions

  const navigate = useNavigate()

  // Sync transcript from voice recording to content
  React.useEffect(() => {
    if (isRecording) {
      setContent(transcript)
    }
  }, [transcript, isRecording])

  // Remove handleSave

  const handleManualSave = async () => {
    try {
      await apiService.createJournal({ title, content })
      navigate("/")
    } catch (error) {
      alert("Failed to create journal. Please try again.")
    }
  }

  const handleAiEnhance = () => {
    // Navigate to theme selection
    navigate("/theme-selection", {
      state: { title, content },
    })
  }

  // Remove showSaveOptions conditional UI

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={() => navigate("/")} className="text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <main className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter journal title"
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />

          <div className="relative">
            <Textarea
              label="Content"
              value={content}
              onChange={(e) => !isRecording && setContent(e.target.value)}
              placeholder="Write your journal entry or use the mic..."
              rows={12}
              className={`bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-12 ${isRecording ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isRecording}
            />
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!isSupported}
              className={`absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full transition-colors ${isRecording ? "bg-blue-600 animate-pulse" : "bg-gray-700 hover:bg-blue-600"}`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {/* Mic icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            {isRecording && (
              <div className="absolute bottom-2 right-2 text-xs text-blue-400 animate-pulse">Recording...</div>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <Button
              onClick={handleAiEnhance}
              disabled={!content.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 py-4 text-lg font-semibold"
            >
              ✨ Enhance with AI
            </Button>

            <Button
              onClick={handleManualSave}
              disabled={!title.trim() || !content.trim()}
              variant="outline"
              className="w-full py-4 text-lg border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <Keyboard className="w-5 h-5 mr-2" />
              Create Manually
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
