import { TokenGuessResult } from "@/utils/storage";
import Image from "next/image";
import AttributeBox from "@/components/game/AttributeBox";
import { DIRECTION_ICONS } from "@/utils/gameLogic";

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
  const {
    name,
    network,
    category,
    launchYear,
    marketCapRank,
    imageUrl,
    ticker,
  } = guess.token;
  const {
    name: nameComparison,
    network: networkComparison,
    category: categoryComparison,
    launchYear: launchYearComparison,
    marketCapRank: marketCapRankComparison,
  } = guess.comparison;

  const LaunchYearDirectionIcon = launchYearComparison.direction
    ? DIRECTION_ICONS[launchYearComparison.direction]
    : null;
  const MarketCapRankDirectionIcon = marketCapRankComparison.direction
    ? DIRECTION_ICONS[marketCapRankComparison.direction]
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 bg-gray-800 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400">
              {ticker.slice(0, 2)}
            </span>
          )}
        </div>
        <div className="flex-1" role="heading" aria-level={1}>
          <div className="font-semibold text-foreground">
            {name} <span className="text-gray-500">({ticker})</span>
          </div>
          <div className="text-xs text-gray-500">Guess #{guessNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-stretch">
        <AttributeBox
          label="Name"
          value={name}
          matchType={nameComparison}
          isNew={isNew}
          animationIndex={0}
        />

        <AttributeBox
          label="Network"
          value={network}
          matchType={networkComparison}
          isNew={isNew}
          animationIndex={1}
        />

        <AttributeBox
          label="Category"
          value={category}
          matchType={categoryComparison}
          isNew={isNew}
          animationIndex={2}
        />

        <AttributeBox
          label="Year"
          value={
            <>
              {launchYear}
              {LaunchYearDirectionIcon && (
                <LaunchYearDirectionIcon className="w-4 h-4" />
              )}
            </>
          }
          matchType={launchYearComparison.match}
          isNew={isNew}
          animationIndex={3}
        />

        <AttributeBox
          label="Rank"
          value={
            <>
              #{marketCapRank}
              {MarketCapRankDirectionIcon && (
                <MarketCapRankDirectionIcon className="w-4 h-4" />
              )}
            </>
          }
          matchType={marketCapRankComparison.match}
          isNew={isNew}
          animationIndex={4}
        />
      </div>
    </div>
  );
}
