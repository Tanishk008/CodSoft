"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Loader2, Bot } from "lucide-react"

interface AIFeedbackProps {
  message: string
  attempts: number
  playerName: string
}

export function AIFeedback({ message, attempts, playerName }: AIFeedbackProps) {
  const [aiMessage, setAiMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    generateAIFeedback()
  }, [message, attempts])

  const generateAIFeedback = async () => {
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const motivationalMessages = [
      `Great job, ${playerName}! ${message}`,
      `${playerName}, you're doing amazing! ${message}`,
      `Keep it up, ${playerName}! ${message}`,
      `Nice try, ${playerName}! ${message}`,
      `${playerName}, you're getting closer! ${message}`,
    ]

    const encouragementByAttempts = {
      1: "Wow! First try? You might be a natural!",
      2: "Excellent intuition! You're really good at this!",
      3: "Still doing great! Three's a charm!",
      4: "Don't give up! You're building great strategy!",
      5: "Halfway there! Your persistence is admirable!",
      6: "Keep going! Every guess teaches you something!",
      7: "You're in the zone! Trust your instincts!",
      8: "Almost there! I can feel you're close!",
      9: "One more push! You've got this!",
      10: "Double digits! You're really thinking this through!",
    }

    const baseMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    const encouragement =
      encouragementByAttempts[attempts as keyof typeof encouragementByAttempts] ||
      "Keep pushing forward! Every expert was once a beginner!"

    setAiMessage(`${baseMessage} ${encouragement}`)
    setIsLoading(false)
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-blue-300/30">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Bot className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-200 mb-1">AI Coach</div>
          {isLoading ? (
            <div className="text-white/80">Analyzing your guess...</div>
          ) : (
            <div className="text-white">{aiMessage}</div>
          )}
        </div>
      </div>
    </Card>
  )
}
