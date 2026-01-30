import { NftGuessResult } from "@/types/GameState";
import NftGuessCard from "./NftGuessCard";

interface NftGuessHistoryProps {
  guesses: NftGuessResult[];
}

export default function NftGuessHistory({ guesses }: NftGuessHistoryProps) {
  if (guesses.length === 0) {
    return null;
  }

  const lastGuessIndex = guesses.length - 1;
  const lastGuess = guesses[lastGuessIndex];
  const isLastGuessNew =
    lastGuess &&
    new Date().getTime() - new Date(lastGuess.timestamp).getTime() < 2000;

  const reversedGuesses = [...guesses].reverse();

  return (
    <div className="w-full space-y-4 max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Your Guesses</h2>
        <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-medium">
          {guesses.length} {guesses.length === 1 ? "attempt" : "attempts"}
        </span>
      </div>

      <div className="space-y-3">
        {reversedGuesses.map((guess, index) => {
          const originalIndex = guesses.length - 1 - index;
          const isNew = isLastGuessNew && originalIndex === lastGuessIndex;

          return (
            <NftGuessCard
              key={originalIndex}
              guess={guess}
              guessNumber={guesses.length - index}
              isNew={isNew}
            />
          );
        })}
      </div>
    </div>
  );
}
