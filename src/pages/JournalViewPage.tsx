

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Edit3 } from "lucide-react"
import type { Journal } from "../types"
import { apiService } from "../services/api"
import { generateBackgroundStyle } from "../utils/backgroundUtils"
import { Button } from "../components/ui/Button"

const JournalViewPage: React.FC = () => {
  const [journal, setJournal] = useState<Journal | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetchJournal()
  }, [id])

  const fetchJournal = async () => {
    if (!id) return

    try {
      // In a real app, you'd have a getJournal endpoint
      const response = await apiService.getAllJournals()
      console.log({response, id})
      const foundJournal = response.data.find((j) => j.id == id)
      setJournal(foundJournal || null)
    } catch (error) {
      console.error("Error fetching journal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  const backgroundStyle = generateBackgroundStyle(journal.backgroundInfo)

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <header className="flex items-center justify-between p-4 bg-black bg-opacity-20">
  <button onClick={() => navigate("/")} className="text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Button
          onClick={() => navigate(`/edit/${journal.id}`)}
          variant="ghost"
          className="text-white hover:text-gray-800"
        >
          <Edit3 className="w-5 h-5" />
        </Button>
      </header>

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 text-balance">{journal.title}</h1>
            <p className="text-white text-opacity-90 text-lg">{formatDate(journal.date)}</p>
          </div>

          <div className="bg-black bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed text-lg whitespace-pre-wrap text-pretty">{journal.content}</p>
            </div>
          </div>

          {/* {journal.theme.displayName !== "None" && (
            <div className="mt-6 text-center">
              <span className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium text-gray-900">
                {journal.theme.displayName}
              </span>
            </div>
          )} */}
        </div>
      </main>
    </div>
  )
}

export default JournalViewPage;