"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Send, RotateCcw, Share2 } from "lucide-react"
import { AIFeedback } from "@/components/ai-feedback"
import { VictoryAnimation } from "@/components/victory-animation"
import { type GameStats, saveGameResult } from "@/lib/game-storage"

interface GameUIProps {
  playerName: string
  onGameComplete: () => void
  onBackToMenu: () => void
}

export function GameUI({ playerName, onGameComplete, onBackToMenu }: GameUIProps) {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [feedback, setFeedback] = useState("")
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [gameHistory, setGameHistory] = useState<Array<{ guess: number; feedback: string }>>([])
  const [showVictory, setShowVictory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1
    setTargetNumber(newTarget)
    setGuess("")
    setAttempts(0)
    setGameStatus("playing")
    setFeedback("")
    setScore(0)
    setStartTime(Date.now())
    setGameHistory([])
    setShowVictory(false)
    inputRef.current?.focus()
  }

  const calculateScore = (attemptCount: number, timeTaken: number) => {
    const baseScore = Math.max(110 - attemptCount * 10, 10)

    // Time bonus (faster = more points)
    const timeBonus = Math.max(20 - Math.floor(timeTaken / 1000), 0)

    return baseScore + timeBonus
  }

  const getFeedbackMessage = (userGuess: number, target: number, attemptCount: number) => {
    const difference = Math.abs(userGuess - target)

    if (userGuess === target) {
      return "🎉 Incredible! You got it exactly right!"
    }

    if (difference <= 5) {
      return "🔥 You're burning hot! So close!"
    } else if (difference <= 10) {
      return "🌡️ Getting warmer! You're very close!"
    } else if (difference <= 20) {
      return userGuess < target
        ? "📈 Too low, but you're on the right track!"
        : "📉 Too high, but you're getting there!"
    } else {
      return userGuess < target ? "⬆️ Way too low! Think bigger!" : "⬇️ Way too high! Think smaller!"
    }
  }

  const handleGuess = () => {
    const userGuess = Number.parseInt(guess)
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setFeedback("Please enter a valid number between 1 and 100!")
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    const feedbackMsg = getFeedbackMessage(userGuess, targetNumber, newAttempts)
    setFeedback(feedbackMsg)

    setGameHistory((prev) => [...prev, { guess: userGuess, feedback: feedbackMsg }])

    if (userGuess === targetNumber) {
      const timeTaken = Date.now() - startTime
      const finalScore = calculateScore(newAttempts, timeTaken)
      setScore(finalScore)
      setGameStatus("won")
      setShowVictory(true)

      // Save game result
      const gameResult: GameStats = {
        playerName,
        score: finalScore,
        attempts: newAttempts,
        timeTaken: Math.floor(timeTaken / 1000),
        timestamp: Date.now(),
        targetNumber,
      }
      saveGameResult(gameResult)

      setTimeout(() => {
        setShowVictory(false)
      }, 5000)
    }

    setGuess("")
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess()
    }
  }

  const shareScore = () => {
    const text = `🎯 I just scored ${score} points in the Number Guessing Game! I guessed the number ${targetNumber} in ${attempts} attempts! Can you beat my score?`
    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      alert("Score copied to clipboard!")
    }
  }

  const progressValue = Math.min((attempts / 10) * 100, 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBackToMenu}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-white/20 text-white">
            Player: {playerName}
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Attempts: {attempts}
          </Badge>
          {score > 0 && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200">
              Score: {score}
            </Badge>
          )}
        </div>
      </div>

      <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Guess the Number Between 1 and 100!</h2>

          {gameStatus === "playing" && (
            <>
              <div className="space-y-4">
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input
                    ref={inputRef}
                    type="number"
                    min="1"
                    max="100"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your guess..."
                    className="text-center text-lg font-bold bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Button
                    onClick={handleGuess}
                    disabled={!guess}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <Progress value={progressValue} className="max-w-md mx-auto" />
                <p className="text-white/80 text-sm">Difficulty increases after 10 attempts</p>
              </div>
            </>
          )}

          {gameStatus === "won" && (
            <div className="space-y-4">
              <div className="text-6xl">🏆</div>
              <h3 className="text-3xl font-bold text-yellow-400">Congratulations!</h3>
              <p className="text-white text-lg">
                You guessed {targetNumber} in {attempts} attempts!
              </p>
              <p className="text-2xl font-bold text-yellow-400">Final Score: {score} points</p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={startNewGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button
                  onClick={shareScore}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Score
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {feedback && gameStatus === "playing" && (
        <AIFeedback message={feedback} attempts={attempts} playerName={playerName} />
      )}

      {gameHistory.length > 0 && gameStatus === "playing" && (
        <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Game History</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {gameHistory.slice(-5).map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-white/80">
                  Guess #{gameHistory.length - 4 + index}: {entry.guess}
                </span>
                <span className="text-white/60">{entry.feedback}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {showVictory && <VictoryAnimation />}
    </div>
  )
}
