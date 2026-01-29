"use client";

import CharacterSearch from "@/components/CharacterSearch";
import GuessHistory from "@/components/game/GuessHistory";
import GameSkeleton from "@/components/skeletons/GameSkeleton";
import { useCharacterGame } from "@/hooks/useCharacterGame";

export default function CharacterOfTheDay() {
  const { characterOfTheDay, guesses, isWon, isLoading, handleGuess } =
    useCharacterGame();

  if (isLoading) {
    return <GameSkeleton />;
  }

  return (
    <div className="w-full space-y-8 flex flex-col justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Character of the Day
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Guess the crypto figure!
        </p>
      </div>

      {isWon && (
        <div className="w-full max-w-md mx-auto bg-green-500/10 border-2 border-green-500 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div className="font-bold text-green-700 dark:text-green-400">
            Congratulations!
          </div>
          <div className="text-sm text-green-600 dark:text-green-500">
            You guessed {characterOfTheDay.name} in {guesses.length}{" "}
            {guesses.length === 1 ? "try" : "tries"}!
          </div>
        </div>
      )}

      {!isWon && (
        <CharacterSearch
          onGuess={handleGuess}
          guessedIds={guesses.map((g) => g.character.id)}
        />
      )}

      <GuessHistory guesses={guesses} />

      {process.env.NODE_ENV === "development" && (
        <div className="w-full max-w-md mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-xs">
          <div className="font-mono text-gray-600 dark:text-gray-400">
            <div>Debug Info:</div>
            <div>Character: {characterOfTheDay.name}</div>
            <div>Role: {characterOfTheDay.role}</div>
            <div>Chain: {characterOfTheDay.primaryChain}</div>
            <div>Year: {characterOfTheDay.yearJoined}</div>
          </div>
        </div>
      )}
    </div>
  );
}
