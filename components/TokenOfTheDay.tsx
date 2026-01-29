"use client";

import TokenSearch from "@/components/TokenSearch";
import TokenGuessHistory from "@/components/game/TokenGuessHistory";
import GameSkeleton from "@/components/skeletons/GameSkeleton";
import { useTokenGame } from "@/hooks/useTokenGame";

export default function TokenOfTheDay() {
  const { guesses, isWon, isLoading, isSubmitting, handleGuess, winnerName } =
    useTokenGame();

  if (isLoading) {
    return <GameSkeleton />;
  }

  return (
    <div className="w-full space-y-8 flex flex-col justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Token of the Day</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Guess the crypto token!
        </p>
      </div>

      {isWon && (
        <div className="w-full max-w-md mx-auto bg-green-500/10 border-2 border-green-500 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div className="font-bold text-green-700 dark:text-green-400">
            Congratulations!
          </div>
          <div className="text-sm text-green-600 dark:text-green-500">
            You guessed {winnerName} in {guesses.length}{" "}
            {guesses.length === 1 ? "try" : "tries"}!
          </div>
        </div>
      )}

      {!isWon && (
        <TokenSearch
          onGuess={handleGuess}
          guessedIds={guesses.map((guess) => guess.token.id)}
          disabled={isSubmitting}
        />
      )}

      <TokenGuessHistory guesses={guesses} />
    </div>
  );
}
