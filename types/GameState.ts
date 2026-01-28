import { CryptoFigure } from "@/types/CryptoFigure";
import { AttributeComparison } from "@/utils/gameLogic";

export interface GuessResult {
  character: CryptoFigure;
  comparison: AttributeComparison;
  timestamp: Date;
}

export interface GameState {
  guesses: GuessResult[];
  isComplete: boolean;
  isWon: boolean;
  characterOfTheDay: CryptoFigure;
}
