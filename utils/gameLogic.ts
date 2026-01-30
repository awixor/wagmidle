import { CryptoFigure } from "@/types/CryptoFigure";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

export type MatchType = "match" | "partial" | "no-match";
export type YearDirection = "higher" | "lower" | "match";

export interface AttributeComparison {
  name: MatchType;
  role: MatchType;
  primaryChain: MatchType;
  yearJoined: {
    match: MatchType;
    direction?: YearDirection;
  };
}

/**
 * Compares a guessed character against the target character
 * @param guess - The character the user guessed
 * @param target - The correct "Character of the Day"
 * @returns Comparison results for each attribute
 */
export function compareCharacters(
  guess: CryptoFigure,
  target: CryptoFigure,
): AttributeComparison {
  // Helper to keep the return object clean
  const check = (key: keyof CryptoFigure) =>
    guess[key] === target[key] ? "match" : "no-match";

  return {
    name: check("name"),
    role: check("role"),
    primaryChain: check("primaryChain"),
    yearJoined: {
      match: check("yearJoined"),
      direction:
        guess.yearJoined === target.yearJoined
          ? "match"
          : guess.yearJoined < target.yearJoined
            ? "higher"
            : "lower",
    },
  };
}

/**
 * Checks if the guess is completely correct
 * @param comparison - The comparison result
 * @returns True if all attributes match
 */
export function isCorrectGuess(comparison: AttributeComparison): boolean {
  const { name, role, primaryChain, yearJoined } = comparison;

  return [name, role, primaryChain, yearJoined.match].every(
    (status) => status === "match",
  );
}

/**
 * Gets a color class based on match type
 * @param matchType - The type of match
 * @returns Tailwind CSS classes for the match type
 */
export function getMatchColor(matchType: MatchType): string {
  switch (matchType) {
    case "match":
      return "bg-green-500 text-white border-green-600";
    case "partial":
      return "bg-yellow-500 text-white border-yellow-600";
    case "no-match":
      return "bg-gray-500 text-white border-gray-600";
  }
}

export const DIRECTION_ICONS: Record<string, LucideIcon> = {
  higher: ArrowUp,
  lower: ArrowDown,
};
