import { TokenGuessResult } from "@/utils/storage";
import { getRankDirectionArrow } from "@/utils/tokenGameLogic";
import Image from "next/image";
import AttributeBox from "@/components/game/AttributeBox";

interface TokenGuessCardProps {
  guess: TokenGuessResult;
  guessNumber: number;
  isNew?: boolean;
}

export default function TokenGuessCard({
  guess,
  guessNumber,
  isNew = false,
}: TokenGuessCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 bg-gray-800 flex items-center justify-center">
          {guess.token.imageUrl ? (
            <Image
              src={guess.token.imageUrl}
              alt={guess.token.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400">
              {guess.token.ticker.slice(0, 2)}
            </span>
          )}
        </div>
        <div className="flex-1" role="heading" aria-level={1}>
          <div className="font-semibold text-foreground">
            {guess.token.name}{" "}
            <span className="text-gray-500">({guess.token.ticker})</span>
          </div>
          <div className="text-xs text-gray-500">Guess #{guessNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-stretch">
        <AttributeBox
          label="Name"
          value={guess.token.name}
          matchType={guess.comparison.name}
          isNew={isNew}
          animationIndex={0}
        />

        <AttributeBox
          label="Network"
          value={guess.token.network}
          matchType={guess.comparison.network}
          isNew={isNew}
          animationIndex={1}
        />

        <AttributeBox
          label="Category"
          value={guess.token.category}
          matchType={guess.comparison.category}
          isNew={isNew}
          animationIndex={2}
        />

        <AttributeBox
          label="Year"
          value={
            <>
              {guess.token.launchYear}
              {guess.comparison.launchYear.direction && (
                <span className="text-lg">
                  {getRankDirectionArrow(guess.comparison.launchYear.direction)}
                </span>
              )}
            </>
          }
          matchType={guess.comparison.launchYear.match}
          isNew={isNew}
          animationIndex={3}
        />

        <AttributeBox
          label="Rank"
          value={
            <>
              #{guess.token.marketCapRank}
              {guess.comparison.marketCapRank.direction && (
                <span className="text-lg">
                  {getRankDirectionArrow(
                    guess.comparison.marketCapRank.direction,
                  )}
                </span>
              )}
            </>
          }
          matchType={guess.comparison.marketCapRank.match}
          isNew={isNew}
          animationIndex={4}
        />
      </div>
    </div>
  );
}
