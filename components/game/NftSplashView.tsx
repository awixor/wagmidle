"use client";

import { motion } from "framer-motion";

export type RevealState = 1 | 2 | 3 | 4 | 5;

interface NftSplashViewProps {
  imageUrl: string;
  revealState: RevealState;
  className?: string;
}

const REVEAL_STATES = {
  1: {
    backgroundSize: "400%",
    backgroundPosition: "25% 25%",
    filter: "blur(0px)",
  },
  2: {
    backgroundSize: "250%",
    backgroundPosition: "75% 50%",
    filter: "blur(0px)",
  },
  3: {
    backgroundSize: "150%",
    backgroundPosition: "50% 50%",
    filter: "blur(0px)",
  },
  4: {
    backgroundSize: "100%",
    backgroundPosition: "50% 50%",
    filter: "blur(10px)",
  },
  5: {
    backgroundSize: "100%",
    backgroundPosition: "50% 50%",
    filter: "blur(0px)",
  },
};

export default function NftSplashView({
  imageUrl,
  revealState,
  className = "",
}: NftSplashViewProps) {
  const currentState = REVEAL_STATES[revealState];

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        animate={{
          backgroundSize: currentState.backgroundSize,
          backgroundPosition: currentState.backgroundPosition,
          filter: currentState.filter,
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
