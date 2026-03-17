"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Info, Mic, MicOff, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { useLocale } from "next-intl"

interface MicrophoneProps {
  onVoiceInput: (text: string) => void
  exampleText?: string

  autoStopRecording?: boolean
  showSpokenText?: boolean
  microphoneId?: string
  showExampleVarient?: "default" | "tooltip"
  SpokenTextVarient?: "default" | "float"
}

export const Microphone = ({
  onVoiceInput,
  exampleText,
  autoStopRecording = false,
  showSpokenText = true,
  microphoneId = "default",
  showExampleVarient = "default",
  SpokenTextVarient = "default",
}: MicrophoneProps) => {
  const language = useLocale()
  const [isExampleExpanded, setIsExampleExpanded] = useState(false)
  const [activeMicrophoneId, setActiveMicrophoneId] = useState<string | null>(
    null
  )

  const {
    transcript: recordedText,
    listening: recording,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    lang: language === "ar" ? "ar-EG" : "en-US",
    continuous: !autoStopRecording,
    interimResults: true,
  })

  const transcript = activeMicrophoneId === microphoneId ? recordedText : ""
  const listening = activeMicrophoneId === microphoneId ? recording : false

  const handleStopRecording = () => {
    onVoiceInput(transcript)
    resetTranscript()
    setActiveMicrophoneId(null)
  }

  const startRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error(
        language === "ar"
          ? "متصفحك لا يدعم التعرف على الصوت"
          : "Your browser doesn't support speech recognition"
      )
      return
    }

    try {
      setActiveMicrophoneId(microphoneId)

      resetTranscript()
      SpeechRecognition.startListening({
        continuous: !autoStopRecording,
        language: language === "ar" ? "ar-EG" : "en-US",
      })
      toast.info(language === "ar" ? "جاري التسجيل..." : "Recording started...")
    } catch (error) {
      console.error("Start recording error:", error)
      toast.error(
        language === "ar" ? "فشل في بدء التسجيل" : "Failed to start recording"
      )
    }
  }

  const stopRecording = () => {
    try {
      SpeechRecognition.stopListening()
      toast.info(language === "ar" ? "تم إيقاف التسجيل" : "Recording stopped")

      // Always send the final transcript when stopping recording
      if (transcript.trim()) {
        handleStopRecording()
      }
    } catch (error) {
      console.error("Error stopping recognition:", error)
      toast.error(
        language === "ar" ? "فشل في إيقاف التسجيل" : "Failed to stop recording"
      )
    }
  }

  const toggleRecording = () => {
    if (listening) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="relative">
      <div
        className={`flex items-center ${showExampleVarient === "tooltip" ? "gap-1" : "gap-4"}`}
      >
        <Button
          type="button"
          size="icon"
          onClick={toggleRecording}
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            listening
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-primary/10 text-primary hover:bg-primary/90 hover:text-white"
          }`}
          aria-label={
            language === "ar"
              ? listening
                ? "إيقاف التسجيل"
                : "بدء التسجيل"
              : listening
                ? "Stop recording"
                : "Start recording"
          }
        >
          {listening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        {exampleText &&
          (showExampleVarient === "tooltip" ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:bg-gray-100"
              aria-label={
                language === "ar" ? "عرض مثال الاستخدام" : "Show usage example"
              }
              title={exampleText}
            >
              <Info className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex-1">
              <div
                className="flex cursor-pointer items-center gap-2 rounded p-1 transition-colors hover:bg-gray-50"
                onClick={() => setIsExampleExpanded(!isExampleExpanded)}
              >
                <Info className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {language === "ar" ? "مثال للاستخدام" : "Usage example"}
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  {isExampleExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </span>
              </div>

              {isExampleExpanded && (
                <div className="mt-1 rounded border border-gray-100 bg-gray-50 p-2 text-sm text-gray-600">
                  {exampleText}
                </div>
              )}
            </div>
          ))}
      </div>

      {transcript && showSpokenText && (
        <div
          className={`${
            SpokenTextVarient === "float"
              ? "absolute bottom-full left-0 z-50 mb-2 max-w-[300px] min-w-[200px] shadow-lg"
              : "relative mt-4"
          } rounded-lg border border-dashed border-gray-500 bg-gray-50 p-4`}
        >
          <button
            type="button"
            className="absolute -top-1 -left-1 inline-flex items-center justify-center rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100"
            title={language === "ar" ? "غلق" : "Close"}
            onClick={() => {
              resetTranscript()
            }}
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-sm wrap-break-word whitespace-pre-wrap text-gray-600">
            {transcript}
          </p>
        </div>
      )}
    </div>
  )
}
