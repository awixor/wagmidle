import { GuessResult } from "@/types/GameState";
import GuessCard from "./GuessCard";

interface GuessHistoryProps {
  guesses: GuessResult[];
}

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  if (guesses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No guesses yet. Start by searching for a character!</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Your Guesses ({guesses.length})
      </h2>

      <div className="space-y-3">
        {guesses.map((guess, index) => (
          <GuessCard
            key={index}
            guess={guess}
            guessNumber={guesses.length - index}
          />
        ))}
      </div>
    </div>
  );
}
