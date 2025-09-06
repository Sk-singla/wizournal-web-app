"use client"

import type React from "react"
import { Trash2 } from "lucide-react"
import type { Journal } from "../types"
import { generateBackgroundStyle } from "../utils/backgroundUtils"

interface JournalCardProps {
  journal: Journal
  onClick: () => void
  onDelete: () => void
  showDeleteButton?: boolean
}

export const JournalCard: React.FC<JournalCardProps> = ({ journal, onClick, onDelete, showDeleteButton = false }) => {
  const backgroundStyle = generateBackgroundStyle(journal.backgroundInfo)
  const previewContent = journal.content.length > 100 ? journal.content.substring(0, 100) + "..." : journal.content

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="relative">
      {showDeleteButton && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      <div
        onClick={onClick}
        className="rounded-2xl p-6 text-white cursor-pointer transform transition-all duration-200 hover:scale-105 shadow-lg"
        style={backgroundStyle}
      >
        <h3 className="text-xl font-bold mb-2 text-balance">{journal.title}</h3>
        <p className="text-sm opacity-90 mb-3">{formatDate(journal.date)}</p>
        <p className="text-sm leading-relaxed opacity-95 text-pretty">{previewContent}</p>
      </div>
    </div>
  )
}
