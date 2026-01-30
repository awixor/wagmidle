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
  const check = (key: keyof Token) =>
    guess[key] === target[key] ? "match" : "no-match";

  const compareNumeric = (gVal: number, tVal: number, invert = false) => {
    if (gVal === tVal)
      return { match: "match" as const, direction: "match" as const };

    const isHigher = invert ? gVal > tVal : gVal < tVal;

    return {
      match: "no-match" as const,
      direction: isHigher ? ("higher" as const) : ("lower" as const),
    };
  };

  return {
    name: check("name"),
    network: check("network"),
    category: check("category"),
    launchYear: compareNumeric(guess.launchYear, target.launchYear),
    marketCapRank: compareNumeric(
      guess.marketCapRank,
      target.marketCapRank,
      true,
    ),
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
