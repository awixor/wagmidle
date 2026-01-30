import { GuessResult } from "@/types/GameState";
import CharacterGuessCard from "./CharacterGuessCard";

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
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Your Guesses ({guesses.length})
      </h2>

      <div className="space-y-3">
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
