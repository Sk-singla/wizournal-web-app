

import type React from "react"
import { useState } from "react"
import type { JournalTheme } from "../types"
import { getThemePresets } from "../utils/backgroundUtils"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

interface ThemeSelectorProps {
  selectedTheme: JournalTheme | null
  onThemeSelect: (theme: JournalTheme) => void
  onGenerate: () => void
  isGenerating: boolean
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeSelect,
  onGenerate,
  isGenerating,
}) => {
  const [customTheme, setCustomTheme] = useState("")
  const themes = getThemePresets()

  const handleCustomThemeSelect = () => {
    if (customTheme.trim()) {
      onThemeSelect({
        displayName: "Custom",
        description: customTheme.trim(),
        key: `Custom:${customTheme.trim()}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Choose Your Theme</h1>

        <div className="space-y-4 mb-8">
          {themes.map((theme) => (
            <button
              key={theme.key}
              onClick={() => onThemeSelect(theme)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedTheme?.key === theme.key
                  ? "border-blue-500 bg-blue-500 bg-opacity-20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedTheme?.key === theme.key ? "border-blue-500 bg-blue-500" : "border-gray-400"
                  }`}
                />
                <div>
                  <h3 className="font-semibold">{theme.displayName}</h3>
                  <p className="text-sm text-gray-400">{theme.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Or craft your own theme...</h3>
          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                selectedTheme?.key.startsWith("Custom:") ? "border-blue-500 bg-blue-500" : "border-gray-400"
              }`}
            />
            <Input
              placeholder="e.g., a cyberpunk detective story"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              onBlur={handleCustomThemeSelect}
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <Button
          onClick={onGenerate}
          disabled={!selectedTheme || isGenerating}
          isLoading={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 py-3 text-lg font-semibold"
        >
          ✨ Generate Journal!
        </Button>
      </div>
    </div>
  )
}
