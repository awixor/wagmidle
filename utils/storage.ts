import { GuessResult } from "@/types/GameState";

const STORAGE_KEY = "wagmidle-progress";

interface SavedProgress {
  date: string;
  guesses: GuessResult[];
  isWon: boolean;
}

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function loadProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const progress: SavedProgress = JSON.parse(saved);

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

export function saveProgress(guesses: GuessResult[], isWon: boolean): void {
  if (typeof window === "undefined") return;

  const progress: SavedProgress = {
    date: getTodayDateString(),
    guesses,
    isWon,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getInitialGuesses(): GuessResult[] {
  const saved = loadProgress();

  return saved?.guesses ?? [];
}

export function getInitialWonState(): boolean {
  const saved = loadProgress();

  return saved?.isWon ?? false;
}
