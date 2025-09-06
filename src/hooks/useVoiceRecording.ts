"use client"

import { useState, useRef, useCallback } from "react"

// Define SpeechRecognition interface for TypeScript
interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}


interface UseVoiceRecordingReturn {
  isRecording: boolean
  transcript: string
  isSupported: boolean
  startRecording: () => void
  stopRecording: () => void
  clearTranscript: () => void
}

export const useVoiceRecording = (): UseVoiceRecordingReturn => {
  const [isRecording, setIsRecording] = useState(false)
  const [finalTranscript, setFinalTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const isSupported =
    typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)

  const startRecording = useCallback(() => {
    if (!isSupported || typeof window === "undefined") return

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognitionConstructor()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let newFinal = ""
      let newInterim = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          newFinal += transcript
        } else {
          newInterim += transcript
        }
      }

      if (newFinal) {
        setFinalTranscript((prev) => prev + newFinal)
      }
      setInterimTranscript(newInterim)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [isSupported])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsRecording(false)
    setInterimTranscript("")
  }, [])

  const clearTranscript = useCallback(() => {
    setFinalTranscript("")
    setInterimTranscript("")
  }, [])

  return {
    isRecording,
    transcript: finalTranscript + interimTranscript,
    isSupported,
    startRecording,
    stopRecording,
    clearTranscript,
  }
}
