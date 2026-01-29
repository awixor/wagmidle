import { useState, useEffect, useCallback, useRef } from "react";
import { Token } from "@/types/Token";
import { TokenAttributeComparison } from "@/utils/tokenGameLogic";
import {
  TokenGuessResult,
  saveTokenProgress,
  loadTokenProgress,
} from "@/utils/storage";

interface TokenGuessApiResponse {
  guessedToken: Token;
  comparison: TokenAttributeComparison;
  isCorrect: boolean;
}

export function useTokenGame() {
  const hasLoadedRef = useRef(false);

  const [gameState, setGameState] = useState<{
    guesses: TokenGuessResult[];
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

    const savedProgress = loadTokenProgress();

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
      saveTokenProgress(guesses, isWon);
    }
  }, [guesses, isWon, isLoading]);

  const handleGuess = useCallback(
    async (tokenId: string) => {
      if (isWon || isSubmitting) return;

      setGameState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        const response = await fetch("/api/token-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        });

        if (!response.ok) {
          setGameState((prev) => ({ ...prev, isSubmitting: false }));
          return;
        }

        const data: TokenGuessApiResponse = await response.json();

        const guessResult: TokenGuessResult = {
          token: data.guessedToken,
          comparison: data.comparison,
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
  const winnerName = isWon && lastGuess ? lastGuess.token.name : "";

  return {
    guesses,
    isWon,
    isLoading,
    isSubmitting,
    handleGuess,
    winnerName,
  };
}
