"use client"

import { useEffect, useState } from "react"

export function VictoryAnimation() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setConfetti(newConfetti)

    const interval = setInterval(() => {
      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            y: piece.y + 5,
            x: piece.x + (Math.random() - 0.5) * 2,
          }))
          .filter((piece) => piece.y < window.innerHeight + 10),
      )
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setConfetti([])
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full animate-pulse"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            transform: "rotate(45deg)",
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl animate-bounce">🎉</div>
      </div>
    </div>
  )
}
