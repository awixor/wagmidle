import { NftGuessResult } from "@/types/GameState";
import NftGuessCard from "./NftGuessCard";
import GuessHistoryHeader from "./GuessHistoryHeader";

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
    <div className="w-full space-y-4">
      <GuessHistoryHeader
        title="Your Guesses"
        subtitle="Find the NFT of the day"
        count={guesses.length}
      />

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
