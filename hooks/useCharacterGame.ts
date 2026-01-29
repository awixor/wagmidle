import { useState, useEffect, useCallback, useRef } from "react";
import { CryptoFigure } from "@/types/CryptoFigure";
import { GuessResult } from "@/types/GameState";
import { AttributeComparison } from "@/utils/gameLogic";
import { saveProgress, loadProgress } from "@/utils/storage";

interface GuessApiResponse {
  guessedCharacter: CryptoFigure;
  comparison: AttributeComparison;
  isCorrect: boolean;
}

export function useCharacterGame() {
  const hasLoadedRef = useRef(false);

  const [gameState, setGameState] = useState<{
    guesses: GuessResult[];
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

    const savedProgress = loadProgress();

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
      saveProgress(guesses, isWon);
    }
  }, [guesses, isWon, isLoading]);

  const handleGuess = useCallback(
    async (characterId: string) => {
      if (isWon || isSubmitting) return;

      setGameState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        const response = await fetch("/api/game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ characterId }),
        });

        if (!response.ok) {
          setGameState((prev) => ({ ...prev, isSubmitting: false }));
          return;
        }

        const data: GuessApiResponse = await response.json();

        const guessResult: GuessResult = {
          character: data.guessedCharacter,
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
  const winnerName = isWon && lastGuess ? lastGuess.character.name : "";

  return {
    guesses,
    isWon,
    isLoading,
    isSubmitting,
    handleGuess,
    winnerName,
  };
}
