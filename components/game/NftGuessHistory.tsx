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
    <div className="w-full max-w-md">
      <div className="relative mb-6">
        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-linear-to-b from-purple-500 via-pink-500 to-orange-400 rounded-full" />
        <div className="flex items-center justify-between pl-4">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Your Guesses
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Find the NFT of the day
            </p>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-gray-800 to-gray-900 text-gray-200 text-sm font-semibold border border-gray-700/50 shadow-inner">
            {guesses.length} {guesses.length === 1 ? "attempt" : "attempts"}
          </span>
        </div>
      </div>

      <div className="space-y-3 relative">
        <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent rounded-2xl pointer-events-none" />
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
