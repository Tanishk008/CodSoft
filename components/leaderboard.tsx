"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"
import { getLeaderboard, type GameStats } from "@/lib/game-storage"

interface LeaderboardProps {
  onBackToMenu: () => void
}

export function Leaderboard({ onBackToMenu }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<GameStats[]>([])

  useEffect(() => {
    setLeaderboard(getLeaderboard())
  }, [])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-white/60 font-bold">{index + 1}</span>
    }
  }

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
      case 1:
        return "bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/30"
      case 2:
        return "bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600/30"
      default:
        return "bg-white/5 border-white/10"
    }
  }

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
          <Trophy className="h-6 w-6 text-yellow-400" />
          Global Leaderboard
        </h2>
      </div>

      <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
        {leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No games played yet!</p>
            <p className="text-white/40">Be the first to set a record!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Top Players</h3>
              <p className="text-white/60">Showing top {Math.min(leaderboard.length, 10)} players</p>
            </div>

            {leaderboard.slice(0, 10).map((player, index) => (
              <Card key={index} className={`p-4 ${getRankColor(index)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">{getRankIcon(index)}</div>
                    <div>
                      <p className="font-semibold text-white">{player.playerName}</p>
                      <p className="text-sm text-white/60">{new Date(player.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200 mb-1">
                        {player.score} pts
                      </Badge>
                      <div className="text-xs text-white/60">
                        {player.attempts} attempts • {player.timeTaken}s
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
