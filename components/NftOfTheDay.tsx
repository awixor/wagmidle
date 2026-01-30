"use client";

import { useState, useEffect } from "react";
import NftSearch from "@/components/NftSearch";
import NftSplashView from "@/components/game/NftSplashView";
import GameSkeleton from "@/components/skeletons/GameSkeleton";
import { useNftGame } from "@/hooks/useNftGame";

interface NftOfTheDayData {
  imageUrl: string;
}

export default function NftOfTheDay() {
  const { guesses, isWon, isLoading, isSubmitting, handleGuess, winnerName } =
    useNftGame();

  const [nftImage, setNftImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    async function fetchNftImage() {
      try {
        const res = await fetch("/api/nft-game");
        if (res.ok) {
          const data: NftOfTheDayData = await res.json();

          setNftImage(data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching NFT image:", err);
      } finally {
        setImageLoading(false);
      }
    }
    fetchNftImage();
  }, []);

  if (isLoading || imageLoading) {
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

      {nftImage && (
        <div className="w-full max-w-md">
          <NftSplashView
            imageUrl={nftImage}
            guessCount={guesses.length}
            isRevealed={isWon}
          />
        </div>
      )}

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
        <NftSearch
          onGuess={handleGuess}
          guessedIds={guesses.map((guess) => guess.nft.id)}
          disabled={isSubmitting}
        />
      )}

      {/* Guess history */}
      {guesses.length > 0 && (
        <div className="w-full max-w-md space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Your Guesses:</h3>
          <div className="space-y-2">
            {guesses.map((guess, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  guess.isCorrect
                    ? "bg-green-500/10 border-green-500"
                    : "bg-red-500/10 border-red-500/50"
                }`}
              >
                <span className="font-medium">{guess.nft.name}</span>
                {guess.isCorrect && <span className="ml-2">✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
