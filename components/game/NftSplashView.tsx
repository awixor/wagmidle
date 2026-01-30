"use client";

import { motion } from "framer-motion";

interface NftSplashViewProps {
  imageUrl: string;
  guessCount: number;
  isRevealed?: boolean;
  className?: string;
}

/**
 * Calculate zoom level based on guess count
 * Starts at 400%, decreases by 50% per guess, min 100%
 */
function calculateZoomLevel(guessCount: number, isRevealed: boolean): number {
  if (isRevealed) return 100;
  return Math.max(100, 400 - guessCount * 50);
}

/**
 * Get background position based on guess count for variety
 */
function getBackgroundPosition(guessCount: number): string {
  const positions = [
    "25% 25%",
    "75% 25%",
    "50% 50%",
    "25% 75%",
    "75% 75%",
    "50% 25%",
    "50% 75%",
  ];
  return positions[guessCount % positions.length];
}

export default function NftSplashView({
  imageUrl,
  guessCount,
  isRevealed = false,
  className = "",
}: NftSplashViewProps) {
  const zoomLevel = calculateZoomLevel(guessCount, isRevealed);
  const position = isRevealed ? "50% 50%" : getBackgroundPosition(guessCount);
  const blur = zoomLevel === 100 && !isRevealed ? 10 : 0;

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        animate={{
          backgroundSize: `${zoomLevel}%`,
          backgroundPosition: position,
          filter: `blur(${blur}px)`,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
