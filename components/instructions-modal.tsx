"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Clock, Star } from "lucide-react"

interface InstructionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900 to-blue-900 text-white border-purple-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Target className="h-6 w-6 text-yellow-400" />
            How to Play Number Guess Game
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              Game Rules
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• The computer picks a random number between 1 and 100</li>
              <li>• Enter your guess and get instant AI-powered feedback</li>
              <li>• Keep guessing until you find the correct number</li>
              <li>• Try to guess in as few attempts as possible for higher scores</li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Scoring System
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <Badge variant="secondary" className="bg-green-500/20 text-green-200">
                  1st attempt: 100 points
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                  2nd attempt: 90 points
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
                  3rd attempt: 80 points
                </Badge>
              </div>
              <div className="space-y-1">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-200">
                  4th attempt: 70 points
                </Badge>
                <Badge variant="secondary" className="bg-red-500/20 text-red-200">
                  5th+ attempt: 60-10 points
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200">
                  Time bonus: +0-20 points
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Start with 50 to divide the range in half</li>
              <li>• Pay attention to AI feedback for better hints</li>
              <li>• Faster guesses earn time bonus points</li>
              <li>• Check the leaderboard to see top players</li>
              <li>• Your stats are saved across sessions</li>
            </ul>
          </div>

          <div className="text-center">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8"
            >
              Got it! Let's Play
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
