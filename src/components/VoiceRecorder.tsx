"use client"

import React from "react"
import { Mic, MicOff } from "lucide-react"
import { useVoiceRecording } from "../hooks/useVoiceRecording"
import { Button } from "./ui/Button"

interface VoiceRecorderProps {
  onTranscriptChange: (transcript: string) => void
  transcript: string
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscriptChange, transcript }) => {
  const {
    isRecording,
    transcript: voiceTranscript,
    isSupported,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useVoiceRecording()

  React.useEffect(() => {
    onTranscriptChange(voiceTranscript)
  }, [voiceTranscript, onTranscriptChange])

  if (!isSupported) {
    return <div className="text-center p-4 text-gray-500">Voice recording is not supported in your browser</div>
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{isRecording ? "Listening..." : "Speak your story..."}</h2>
        <p className="text-gray-300">
          {isRecording ? "Tap to stop recording" : "Tap the microphone to start recording"}
        </p>
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording
            ? "bg-gradient-to-br from-purple-500 to-red-500 animate-pulse"
            : "bg-gradient-to-br from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600"
        }`}
      >
        {isRecording ? <MicOff className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
      </button>

      {transcript && (
        <div className="w-full max-w-md">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Captured so far:</h3>
            <p className="text-white text-sm leading-relaxed">{transcript}</p>
          </div>
          <Button onClick={clearTranscript} variant="ghost" className="mt-2 text-gray-300 hover:text-white">
            Clear transcript
          </Button>
        </div>
      )}
    </div>
  )
}
