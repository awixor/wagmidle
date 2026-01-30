import { GuessResult } from "@/types/GameState";
import Image from "next/image";
import AttributeBox from "./AttributeBox";
import { imgsrcPlaceholder } from "@/data/figures";
import { extractXHandle } from "@/utils/textUtils";
import { DIRECTION_ICONS } from "@/utils/gameLogic";

interface CharacterGuessCardProps {
  guess: GuessResult;
  guessNumber: number;
  isNew?: boolean;
}

export default function CharacterGuessCard({
  guess,
  guessNumber,
  isNew = false,
}: CharacterGuessCardProps) {
  const { character, comparison } = guess;
  const { name, role, primaryChain, yearJoined, imageUrl } = character;
  const {
    name: nameComparison,
    role: roleComparison,
    primaryChain: primaryChainComparison,
    yearJoined: yearJoinedComparison,
  } = comparison;

  const xHandle = extractXHandle(imageUrl);
  const xProfileUrl = xHandle ? `https://x.com/${xHandle}` : undefined;

  const YearDirectionIcon = yearJoinedComparison.direction
    ? DIRECTION_ICONS[yearJoinedComparison.direction]
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700">
          <Image
            src={imageUrl || imgsrcPlaceholder}
            alt={name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1" role="heading" aria-level={1}>
          {xProfileUrl ? (
            <a
              href={xProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-purple-400 transition-colors inline-flex items-center gap-1 group"
            >
              {name}
            </a>
          ) : (
            <div className="font-semibold text-foreground">{name}</div>
          )}
          <div className="text-xs text-gray-500">Guess #{guessNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch">
        <AttributeBox
          label="Name"
          value={name}
          matchType={nameComparison}
          isNew={isNew}
          animationIndex={0}
        />

        <AttributeBox
          label="Role"
          value={role}
          matchType={roleComparison}
          isNew={isNew}
          animationIndex={1}
        />

        <AttributeBox
          label="Chain"
          value={primaryChain}
          matchType={primaryChainComparison}
          isNew={isNew}
          animationIndex={2}
        />

        <AttributeBox
          label="Year"
          value={
            <span className="inline-flex items-center gap-1">
              {yearJoined}
              {YearDirectionIcon && <YearDirectionIcon className="w-4 h-4" />}
            </span>
          }
          matchType={yearJoinedComparison.match}
          isNew={isNew}
          animationIndex={3}
        />
      </div>
    </div>
  );
}
