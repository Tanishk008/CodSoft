"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, TrendingUp, Clock, Target } from "lucide-react"
import { getPlayerStats, type GameStats } from "@/lib/game-storage"

interface PlayerStatsProps {
  playerName: string
  onBackToMenu: () => void
}

export function PlayerStats({ playerName, onBackToMenu }: PlayerStatsProps) {
  const [stats, setStats] = useState<GameStats[]>([])
  const [summary, setSummary] = useState({
    totalGames: 0,
    bestScore: 0,
    averageAttempts: 0,
    averageTime: 0,
    totalScore: 0,
  })

  useEffect(() => {
    const playerStats = getPlayerStats(playerName)
    setStats(playerStats)

    if (playerStats.length > 0) {
      setSummary({
        totalGames: playerStats.length,
        bestScore: Math.max(...playerStats.map((s) => s.score)),
        averageAttempts: Math.round(playerStats.reduce((sum, s) => sum + s.attempts, 0) / playerStats.length),
        averageTime: Math.round(playerStats.reduce((sum, s) => sum + s.timeTaken, 0) / playerStats.length),
        totalScore: playerStats.reduce((sum, s) => sum + s.score, 0),
      })
    }
  }, [playerName])

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
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-400" />
          {playerName}'s Stats
        </h2>
      </div>

      {stats.length === 0 ? (
        <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
          <BarChart3 className="h-16 w-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No games played yet!</p>
          <p className="text-white/40">Start playing to see your statistics here.</p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-300/30">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{summary.totalGames}</p>
                  <p className="text-blue-200 text-sm">Total Games</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-300/30">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{summary.bestScore}</p>
                  <p className="text-yellow-200 text-sm">Best Score</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-300/30">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{summary.averageAttempts}</p>
                  <p className="text-green-200 text-sm">Avg Attempts</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-300/30">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{summary.averageTime}s</p>
                  <p className="text-purple-200 text-sm">Avg Time</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Games</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stats.slice(0, 10).map((game, index) => (
                <Card key={index} className="p-4 bg-white/5 border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Game #{stats.length - index}</p>
                      <p className="text-white/60 text-sm">{new Date(game.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200">
                        {game.score} pts
                      </Badge>
                      <div className="text-right text-sm text-white/60">
                        <div>{game.attempts} attempts</div>
                        <div>{game.timeTaken}s</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
