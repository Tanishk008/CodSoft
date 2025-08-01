export interface GameStats {
  playerName: string
  score: number
  attempts: number
  timeTaken: number
  timestamp: number
  targetNumber: number
}

export function saveGameResult(gameStats: GameStats) {
  const existingData = localStorage.getItem("numberGuessGame")
  const gameHistory: GameStats[] = existingData ? JSON.parse(existingData) : []

  gameHistory.push(gameStats)
  localStorage.setItem("numberGuessGame", JSON.stringify(gameHistory))
}

export function getLeaderboard(): GameStats[] {
  const existingData = localStorage.getItem("numberGuessGame")
  if (!existingData) return []

  const gameHistory: GameStats[] = JSON.parse(existingData)

  // Sort by score (descending), then by attempts (ascending), then by time (ascending)
  return gameHistory.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (a.attempts !== b.attempts) return a.attempts - b.attempts
    return a.timeTaken - b.timeTaken
  })
}

export function getPlayerStats(playerName: string): GameStats[] {
  const existingData = localStorage.getItem("numberGuessGame")
  if (!existingData) return []

  const gameHistory: GameStats[] = JSON.parse(existingData)
  return gameHistory.filter((game) => game.playerName === playerName).sort((a, b) => b.timestamp - a.timestamp)
}
