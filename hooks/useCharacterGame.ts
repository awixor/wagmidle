import { useState, useEffect, useCallback, useRef } from "react";
import { CryptoFigure } from "@/types/CryptoFigure";
import { GuessResult } from "@/types/GameState";
import { getCharacterOfTheDay } from "@/utils/characterOfTheDay";
import { compareCharacters, isCorrectGuess } from "@/utils/gameLogic";
import { saveProgress, loadProgress } from "@/utils/storage";

export function useCharacterGame() {
  const [characterOfTheDay] = useState<CryptoFigure>(() =>
    getCharacterOfTheDay(),
  );

  const hasLoadedRef = useRef(false);

  const [gameState, setGameState] = useState<{
    guesses: GuessResult[];
    isWon: boolean;
    isLoading: boolean;
  }>(() => {
    if (typeof window === "undefined") {
      return {
        guesses: [],
        isWon: false,
        isLoading: true,
      };
    }

    const savedProgress = loadProgress();

    return {
      guesses: savedProgress?.guesses ?? [],
      isWon: savedProgress?.isWon ?? false,
      isLoading: false,
    };
  });

  const { guesses, isWon, isLoading } = gameState;

  useEffect(() => {
    hasLoadedRef.current = true;
  }, []);

  useEffect(() => {
    if (hasLoadedRef.current && !isLoading) {
      saveProgress(guesses, isWon);
    }
  }, [guesses, isWon, isLoading]);

  const handleGuess = useCallback(
    (guessedCharacter: CryptoFigure) => {
      if (isWon) return;

      const comparison = compareCharacters(guessedCharacter, characterOfTheDay);
      const guessResult: GuessResult = {
        character: guessedCharacter,
        comparison,
        timestamp: new Date(),
      };

      const newWonState = isCorrectGuess(comparison);

      setGameState((prev) => ({
        ...prev,
        guesses: [...prev.guesses, guessResult],
        isWon: newWonState || prev.isWon,
      }));
    },
    [characterOfTheDay, isWon],
  );

  return {
    characterOfTheDay,
    guesses,
    isWon,
    isLoading,
    handleGuess,
  };
}
