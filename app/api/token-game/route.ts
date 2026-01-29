import { NextRequest, NextResponse } from "next/server";
import { tokens } from "@/data/tokens.server";
import { getTokenOfTheDay } from "@/utils/tokenOfTheDay";
import {
  compareTokens,
  isCorrectTokenGuess,
  TokenAttributeComparison,
} from "@/utils/tokenGameLogic";
import { Token } from "@/types/Token";

export interface TokenGuessResponse {
  guessedToken: Token;
  comparison: TokenAttributeComparison;
  isCorrect: boolean;
}

export interface TokenGuessErrorResponse {
  error: string;
}

/**
 * POST /api/token-game
 * Submit a guess for the token of the day.
 *
 * Request body: { tokenId: string }
 * Response: { guessedToken, comparison, isCorrect }
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<TokenGuessResponse | TokenGuessErrorResponse>> {
  try {
    const body = await request.json();
    const { tokenId } = body;

    if (!tokenId || typeof tokenId !== "string") {
      return NextResponse.json(
        { error: "Invalid request: tokenId is required" },
        { status: 400 },
      );
    }

    const guessedToken = tokens.find((t) => t.id === tokenId);

    if (!guessedToken) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    const tokenOfTheDay = getTokenOfTheDay();

    const comparison = compareTokens(guessedToken, tokenOfTheDay);
    const isCorrect = isCorrectTokenGuess(comparison);

    return NextResponse.json({
      guessedToken,
      comparison,
      isCorrect,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
