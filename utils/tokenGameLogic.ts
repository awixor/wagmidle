import { Token } from "@/types/Token";
import { MatchType } from "@/utils/gameLogic";

export type RankDirection = "higher" | "lower" | "match";

export interface TokenAttributeComparison {
  name: MatchType;
  network: MatchType;
  category: MatchType;
  launchYear: {
    match: MatchType;
    direction?: RankDirection;
  };
  marketCapRank: {
    match: MatchType;
    direction?: RankDirection;
  };
}

/**
 * Compares a guessed token against the target token
 * @param guess - The token the user guessed
 * @param target - The correct "Token of the Day"
 * @returns Comparison results for each attribute
 */
export function compareTokens(
  guess: Token,
  target: Token,
): TokenAttributeComparison {
  return {
    name: guess.name === target.name ? "match" : "no-match",
    network: guess.network === target.network ? "match" : "no-match",
    category: guess.category === target.category ? "match" : "no-match",
    launchYear: {
      match: guess.launchYear === target.launchYear ? "match" : "no-match",
      direction:
        guess.launchYear === target.launchYear
          ? "match"
          : guess.launchYear < target.launchYear
            ? "higher"
            : "lower",
    },
    marketCapRank: {
      match:
        guess.marketCapRank === target.marketCapRank ? "match" : "no-match",
      direction:
        guess.marketCapRank === target.marketCapRank
          ? "match"
          : guess.marketCapRank > target.marketCapRank
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
export function isCorrectTokenGuess(
  comparison: TokenAttributeComparison,
): boolean {
  return (
    comparison.name === "match" &&
    comparison.network === "match" &&
    comparison.category === "match" &&
    comparison.launchYear.match === "match" &&
    comparison.marketCapRank.match === "match"
  );
}

/**
 * Gets a color class based on match type
 * @param matchType - The type of match
 * @returns Tailwind CSS classes for the match type
 */
export function getTokenMatchColor(matchType: MatchType): string {
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
 * Gets an arrow icon based on rank direction
 * @param direction - The direction hint
 * @returns Arrow symbol
 */
export function getRankDirectionArrow(direction?: RankDirection): string {
  if (!direction || direction === "match") return "";
  return direction === "higher" ? "↑" : "↓";
}
