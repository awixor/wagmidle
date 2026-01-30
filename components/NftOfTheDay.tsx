"use client";

import NftSearch from "@/components/NftSearch";
import NftSplashView from "@/components/game/NftSplashView";
import NftGuessHistory from "@/components/game/NftGuessHistory";
import GameSkeleton from "@/components/skeletons/GameSkeleton";
import { useNftGame } from "@/hooks/useNftGame";

export default function NftOfTheDay() {
  const { guesses, isWon, isLoading, isSubmitting, handleGuess, winnerName } =
    useNftGame();

  const ZOOM_LEVELS = [1200, 1000, 800, 600, 400, 300, 200, 150, 100];
  const zoomLevel = isWon
    ? 100
    : ZOOM_LEVELS[Math.min(guesses.length, ZOOM_LEVELS.length - 1)];

  const todayString = new Date().toISOString().split("T")[0];
  const nftImageUrl = `/api/nft-image?date=${todayString}&zoom=${zoomLevel}`;

  if (isLoading) {
    return <GameSkeleton />;
  }

  return (
    <div className="w-full space-y-8 flex flex-col justify-center items-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">NFT of the Day</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Guess the NFT collection!
        </p>
      </div>

      <div className="w-full max-w-md">
        <NftSplashView imageUrl={nftImageUrl} />
      </div>

      {isWon && (
        <div className="w-full max-w-md mx-auto bg-linear-to-r from-green-500/20 to-emerald-500/10 border-2 border-green-500 rounded-xl p-6 text-center shadow-lg shadow-green-500/20">
          <div className="text-4xl mb-3">🎉</div>
          <div className="font-bold text-xl text-green-400">
            Congratulations!
          </div>
          <div className="text-sm text-green-500 mt-1">
            You guessed <span className="font-semibold">{winnerName}</span> in{" "}
            {guesses.length} {guesses.length === 1 ? "try" : "tries"}!
          </div>
        </div>
      )}

      {!isWon && (
        <NftSearch
          onGuess={handleGuess}
          guessedIds={guesses.map((guess) => guess.nft.id)}
          disabled={isSubmitting}
        />
      )}

      <NftGuessHistory guesses={guesses} />
    </div>
  );
}
