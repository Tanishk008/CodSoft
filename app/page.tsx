"use client"

import { useState, useEffect } from "react"
import { GameUI } from "@/components/game-ui"
import { InstructionsModal } from "@/components/instructions-modal"
import { Leaderboard } from "@/components/leaderboard"
import { PlayerStats } from "@/components/player-stats"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, Play, BarChart3, Info } from "lucide-react"

export default function Home() {
  const [currentView, setCurrentView] = useState<"menu" | "game" | "leaderboard" | "stats">("menu")
  const [showInstructions, setShowInstructions] = useState(false)
  const [playerName, setPlayerName] = useState("")

  useEffect(() => {
    const savedName = localStorage.getItem("playerName")
    if (savedName) {
      setPlayerName(savedName)
    }
  }, [])

  const handleStartGame = (name: string) => {
    setPlayerName(name)
    localStorage.setItem("playerName", name)
    setCurrentView("game")
  }

  const handleGameComplete = () => {
    setCurrentView("menu")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Number Guess Game</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInstructions(true)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Info className="h-4 w-4 mr-1" />
              Rules
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {currentView === "menu" && (
          <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-white mb-2">Welcome to the Ultimate</h2>
                <h3 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Number Guessing Challenge!
                </h3>
                <p className="text-white/80 text-lg">Test your intuition and compete with players worldwide!</p>
              </div>

              {playerName && (
                <p className="text-white/90 text-xl">
                  Welcome back, <span className="font-bold text-yellow-400">{playerName}</span>!
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Button
                  onClick={() => handleStartGame(playerName || "Player")}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Game
                </Button>

                <Button
                  onClick={() => setCurrentView("leaderboard")}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl"
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Leaderboard
                </Button>

                <Button
                  onClick={() => setCurrentView("stats")}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold py-4 px-6 rounded-xl"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  My Stats
                </Button>
              </div>
            </div>
          </Card>
        )}

        {currentView === "game" && (
          <GameUI
            playerName={playerName}
            onGameComplete={handleGameComplete}
            onBackToMenu={() => setCurrentView("menu")}
          />
        )}

        {currentView === "leaderboard" && <Leaderboard onBackToMenu={() => setCurrentView("menu")} />}

        {currentView === "stats" && <PlayerStats playerName={playerName} onBackToMenu={() => setCurrentView("menu")} />}

        <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
      </div>
    </div>
  )
}
