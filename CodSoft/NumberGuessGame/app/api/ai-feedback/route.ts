import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { guess, targetNumber, attempts, playerName } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `You are an encouraging AI coach for a number guessing game. The player is trying to guess a number between 1-100. 
    Be supportive, motivational, and give helpful hints without revealing the exact number. 
    Keep responses concise but enthusiastic. Use emojis appropriately.`,
    prompt: `Player ${playerName} guessed ${guess}. The target number is ${targetNumber}. This is attempt #${attempts}. 
    Give encouraging feedback and a helpful hint about whether they should go higher or lower.`,
  })

  return result.toAIStreamResponse()
}
