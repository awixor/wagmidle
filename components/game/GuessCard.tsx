import { GuessResult } from "@/types/GameState";
import { getYearDirectionArrow } from "@/utils/gameLogic";
import Image from "next/image";
import AttributeBox from "./AttributeBox";

interface GuessCardProps {
  guess: GuessResult;
  guessNumber: number;
  isNew?: boolean;
}

export default function GuessCard({
  guess,
  guessNumber,
  isNew = false,
}: GuessCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700">
          <Image
            src={guess.character.imageUrl}
            alt={guess.character.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1" role="heading" aria-level={1}>
          <div className="font-semibold text-foreground">
            {guess.character.name}
          </div>
          <div className="text-xs text-gray-500">Guess #{guessNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch">
        <AttributeBox
          label="Name"
          value={guess.character.name}
          matchType={guess.comparison.name}
          isNew={isNew}
          animationIndex={0}
        />

        <AttributeBox
          label="Role"
          value={guess.character.role}
          matchType={guess.comparison.role}
          isNew={isNew}
          animationIndex={1}
        />

        <AttributeBox
          label="Chain"
          value={guess.character.primaryChain}
          matchType={guess.comparison.primaryChain}
          isNew={isNew}
          animationIndex={2}
        />

        <AttributeBox
          label="Year"
          value={
            <>
              {guess.character.yearJoined}
              {guess.comparison.yearJoined.direction && (
                <span className="text-lg">
                  {getYearDirectionArrow(guess.comparison.yearJoined.direction)}
                </span>
              )}
            </>
          }
          matchType={guess.comparison.yearJoined.match}
          isNew={isNew}
          animationIndex={3}
        />
      </div>
    </div>
  );
}
