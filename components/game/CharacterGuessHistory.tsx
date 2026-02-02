import { GuessResult } from "@/types/GameState";
import CharacterGuessCard from "./CharacterGuessCard";
import GuessHistoryHeader from "./GuessHistoryHeader";

interface CharacterGuessHistoryProps {
  guesses: GuessResult[];
}

export default function CharacterGuessHistory({
  guesses,
}: CharacterGuessHistoryProps) {
  if (guesses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No guesses yet. Start by searching for a character!</p>
      </div>
    );
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
        subtitle="Find the character of the day"
        count={guesses.length}
      />

      <div className="space-y-3 relative">
        <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent rounded-2xl pointer-events-none" />
        {reversedGuesses.map((guess, index) => {
          const originalIndex = guesses.length - 1 - index;
          const isNew = isLastGuessNew && originalIndex === lastGuessIndex;

          return (
            <CharacterGuessCard
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
