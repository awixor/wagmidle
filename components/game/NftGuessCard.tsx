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
        group relative overflow-hidden rounded-2xl p-4
        transition-all duration-500 ease-out
        ${isNew ? "animate-slide-in-right" : ""}
        ${
          isCorrect
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-500/60 shadow-lg shadow-emerald-200 dark:shadow-emerald-500/25"
            : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-purple-500/10"
        }
      `}
    >
      {isCorrect && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-300/30 dark:via-emerald-400/20 to-transparent animate-shimmer" />
      )}
      {!isCorrect && (
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-purple-100 dark:via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="relative flex items-center gap-4">
        <div
          className={`
            relative w-16 h-16 rounded-xl overflow-hidden 
            ring-2 transition-all duration-300
            ${
              isCorrect
                ? "ring-emerald-500 shadow-lg shadow-emerald-300 dark:shadow-emerald-500/40 scale-105"
                : "ring-gray-300 dark:ring-gray-600 group-hover:ring-purple-400 dark:group-hover:ring-purple-500/50 group-hover:scale-[1.02]"
            }
          `}
        >
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900 dark:text-foreground truncate tracking-tight">
              {nft.name}
            </span>
            {isCorrect && (
              <span className="text-emerald-500 dark:text-emerald-400 animate-bounce">
                ✨
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/50 text-xs text-gray-600 dark:text-gray-400 font-medium">
              #{guessNumber}
            </span>
          </div>
        </div>

        <div
          className={`
            relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider
            transition-all duration-300
            ${
              isCorrect
                ? "bg-emerald-100 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/40 shadow-md shadow-emerald-100 dark:shadow-emerald-500/20"
                : "bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 group-hover:border-red-300 dark:group-hover:border-red-400/40"
            }
          `}
        >
          {isCorrect && (
            <div className="absolute inset-0 rounded-xl bg-emerald-200/50 dark:bg-emerald-400/20 animate-pulse" />
          )}
          <span className="relative flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Correct!
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Wrong
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
