import { useState, useEffect, useCallback, useRef } from "react";
import { Nft } from "@/types/Nft";
import { NftGuessResult } from "@/types/GameState";
import { saveNftProgress, loadNftProgress } from "@/utils/storage";

interface NftGuessApiResponse {
  guessedNft: Nft;
  isCorrect: boolean;
}

export function useNftGame() {
  const hasLoadedRef = useRef(false);

  const [gameState, setGameState] = useState<{
    guesses: NftGuessResult[];
    isWon: boolean;
    isLoading: boolean;
    isSubmitting: boolean;
  }>(() => {
    if (typeof window === "undefined") {
      return {
        guesses: [],
        isWon: false,
        isLoading: true,
        isSubmitting: false,
      };
    }

    const savedProgress = loadNftProgress();

    return {
      guesses: savedProgress?.guesses ?? [],
      isWon: savedProgress?.isWon ?? false,
      isLoading: false,
      isSubmitting: false,
    };
  });

  const { guesses, isWon, isLoading, isSubmitting } = gameState;

  useEffect(() => {
    hasLoadedRef.current = true;
  }, []);

  useEffect(() => {
    if (hasLoadedRef.current && !isLoading) {
      saveNftProgress(guesses, isWon);
    }
  }, [guesses, isWon, isLoading]);

  const handleGuess = useCallback(
    async (nftId: string) => {
      if (isWon || isSubmitting) return;

      setGameState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        const response = await fetch("/api/nft-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nftId }),
        });

        if (!response.ok) {
          setGameState((prev) => ({ ...prev, isSubmitting: false }));
          return;
        }

        const data: NftGuessApiResponse = await response.json();

        const guessResult: NftGuessResult = {
          nft: data.guessedNft,
          isCorrect: data.isCorrect,
          timestamp: new Date(),
        };

        setGameState((prev) => ({
          ...prev,
          guesses: [...prev.guesses, guessResult],
          isWon: data.isCorrect || prev.isWon,
          isSubmitting: false,
        }));
      } catch (error) {
        console.error("Error submitting guess:", error);
        setGameState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [isWon, isSubmitting],
  );

  const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  const winnerName = isWon && lastGuess ? lastGuess.nft.name : "";

  return {
    guesses,
    isWon,
    isLoading,
    isSubmitting,
    handleGuess,
    winnerName,
  };
}
