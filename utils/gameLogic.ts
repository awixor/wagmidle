import { CryptoFigure } from "@/types/CryptoFigure";

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
  return {
    name: guess.name === target.name ? "match" : "no-match",
    role: guess.role === target.role ? "match" : "no-match",
    primaryChain:
      guess.primaryChain === target.primaryChain ? "match" : "no-match",
    yearJoined: {
      match: guess.yearJoined === target.yearJoined ? "match" : "no-match",
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
  return (
    comparison.name === "match" &&
    comparison.role === "match" &&
    comparison.primaryChain === "match" &&
    comparison.yearJoined.match === "match"
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

/**
 * Gets an arrow icon based on year direction
 * @param direction - The direction hint for the year
 * @returns Arrow symbol
 */
export function getYearDirectionArrow(direction?: YearDirection): string {
  if (!direction || direction === "match") return "";
  return direction === "higher" ? "↑" : "↓";
}
