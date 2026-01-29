import { NextRequest, NextResponse } from "next/server";
import { cryptoFigures } from "@/data/figures.server";
import { getCharacterOfTheDay } from "@/utils/characterOfTheDay";
import {
  compareCharacters,
  isCorrectGuess,
  AttributeComparison,
} from "@/utils/gameLogic";
import { CryptoFigure } from "@/types/CryptoFigure";

export interface GuessResponse {
  guessedCharacter: CryptoFigure;
  comparison: AttributeComparison;
  isCorrect: boolean;
}

export interface GuessErrorResponse {
  error: string;
}

/**
 * POST /api/game
 * Submit a guess for the character of the day.
 *
 * Request body: { characterId: string }
 * Response: { guessedCharacter, comparison, isCorrect }
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<GuessResponse | GuessErrorResponse>> {
  try {
    const body = await request.json();
    const { characterId } = body;

    if (!characterId || typeof characterId !== "string") {
      return NextResponse.json(
        { error: "Invalid request: characterId is required" },
        { status: 400 },
      );
    }

    const guessedCharacter = cryptoFigures.find((c) => c.id === characterId);

    if (!guessedCharacter) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 },
      );
    }

    const characterOfTheDay = getCharacterOfTheDay();

    const comparison = compareCharacters(guessedCharacter, characterOfTheDay);
    const isCorrect = isCorrectGuess(comparison);

    return NextResponse.json({
      guessedCharacter,
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
