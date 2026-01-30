import { NftGuessResult } from "@/types/GameState";
import Image from "next/image";

interface NftGuessCardProps {
  guess: NftGuessResult;
  guessNumber: number;
  isNew?: boolean;
}

export default function NftGuessCard({
  guess,
  guessNumber,
  isNew = false,
}: NftGuessCardProps) {
  const { nft, isCorrect } = guess;

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl p-4
        transition-all duration-500 ease-out
        ${isNew ? "animate-slide-in-right" : ""}
        ${
          isCorrect
            ? "bg-linear-to-r from-green-500/20 to-emerald-500/10 border-2 border-green-500 shadow-lg shadow-green-500/20"
            : "bg-linear-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-gray-600"
        }
      `}
    >
      {isCorrect && (
        <div className="absolute inset-0 bg-linear-to-r from-green-500/10 via-emerald-500/5 to-transparent animate-pulse" />
      )}

      <div className="relative flex items-center gap-4">
        <div
          className={`
            relative w-14 h-14 rounded-lg overflow-hidden 
            ring-2 transition-all duration-300
            ${isCorrect ? "ring-green-500 shadow-lg shadow-green-500/30" : "ring-gray-600"}
          `}
        >
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-foreground truncate">
              {nft.name}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Guess #{guessNumber}
          </div>
        </div>

        <div
          className={`
            px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide
            ${
              isCorrect
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/10 text-red-400/80 border border-red-500/20"
            }
          `}
        >
          {isCorrect ? "Correct!" : "Wrong"}
        </div>
      </div>
    </div>
  );
}
