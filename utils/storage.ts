import { GuessResult } from "@/types/GameState";
import { Token } from "@/types/Token";
import { TokenAttributeComparison } from "@/utils/tokenGameLogic";

const STORAGE_KEY = "wagmidle-progress";
const TOKEN_STORAGE_KEY = "wagmidle-token-progress";

interface SavedCharacterProgress {
  date: string;
  guesses: GuessResult[];
  isWon: boolean;
}

export interface TokenGuessResult {
  token: Token;
  comparison: TokenAttributeComparison;
  timestamp: Date;
}

interface SavedTokenProgress {
  date: string;
  guesses: TokenGuessResult[];
  isWon: boolean;
}

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

// Character progress functions
export function loadCharacterProgress(): SavedCharacterProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const progress: SavedCharacterProgress = JSON.parse(saved);

    if (progress.date !== getTodayDateString()) {
      localStorage.removeItem(STORAGE_KEY);

      return null;
    }

    progress.guesses = progress.guesses.map((guess) => ({
      ...guess,
      timestamp: new Date(guess.timestamp),
    }));

    return progress;
  } catch {
    return null;
  }
}

export function saveCharacterProgress(
  guesses: GuessResult[],
  isWon: boolean,
): void {
  if (typeof window === "undefined") return;

  const progress: SavedCharacterProgress = {
    date: getTodayDateString(),
    guesses,
    isWon,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Token progress functions
export function loadTokenProgress(): SavedTokenProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!saved) return null;

    const progress: SavedTokenProgress = JSON.parse(saved);

    if (progress.date !== getTodayDateString()) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }

    progress.guesses = progress.guesses.map((guess) => ({
      ...guess,
      timestamp: new Date(guess.timestamp),
    }));

    return progress;
  } catch {
    return null;
  }
}

export function saveTokenProgress(
  guesses: TokenGuessResult[],
  isWon: boolean,
): void {
  if (typeof window === "undefined") return;

  const progress: SavedTokenProgress = {
    date: getTodayDateString(),
    guesses,
    isWon,
  };

  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(progress));
}

// NFT progress functions
const NFT_STORAGE_KEY = "wagmidle-nft-progress";

import { NftGuessResult } from "@/types/GameState";

interface SavedNftProgress {
  date: string;
  guesses: NftGuessResult[];
  isWon: boolean;
}

export function loadNftProgress(): SavedNftProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(NFT_STORAGE_KEY);

    if (!saved) return null;

    const progress: SavedNftProgress = JSON.parse(saved);

    if (progress.date !== getTodayDateString()) {
      localStorage.removeItem(NFT_STORAGE_KEY);
      return null;
    }

    progress.guesses = progress.guesses.map((guess) => ({
      ...guess,
      timestamp: new Date(guess.timestamp),
    }));

    return progress;
  } catch {
    return null;
  }
}

export function saveNftProgress(
  guesses: NftGuessResult[],
  isWon: boolean,
): void {
  if (typeof window === "undefined") return;

  const progress: SavedNftProgress = {
    date: getTodayDateString(),
    guesses,
    isWon,
  };

  localStorage.setItem(NFT_STORAGE_KEY, JSON.stringify(progress));
}
