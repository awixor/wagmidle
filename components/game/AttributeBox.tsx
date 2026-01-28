"use client";

import { MatchType, getMatchColor } from "@/utils/gameLogic";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface AttributeBoxProps {
  label: string;
  value: ReactNode;
  matchType: MatchType;
  isNew?: boolean;
  animationIndex?: number;
}

export default function AttributeBox({
  label,
  value,
  matchType,
  isNew = false,
  animationIndex = 0,
}: AttributeBoxProps) {
  const delay = animationIndex * 0.2;
  const [hasRevealed, setHasRevealed] = useState(!isNew);

  if (!isNew) {
    return (
      <div
        className={`px-3 py-2 rounded-lg border-2 text-center ${getMatchColor(matchType)}`}
      >
        <div className="text-xs font-medium opacity-90">{label}</div>
        <div className="text-sm font-semibold flex items-center justify-center gap-1">
          {value}
        </div>
      </div>
    );
  }

  const colorClass = hasRevealed
    ? getMatchColor(matchType)
    : "bg-gray-500 text-white border-gray-600";

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        className={`px-3 py-2 rounded-lg border-2 text-center h-full ${colorClass}`}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: [0, 90, 0] }}
        transition={{
          delay,
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        onUpdate={(latest) => {
          if (
            !hasRevealed &&
            typeof latest.rotateX === "number" &&
            latest.rotateX >= 85
          ) {
            setHasRevealed(true);
          }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="text-xs font-medium opacity-90">{label}</div>
        <div className="text-sm font-semibold flex items-center justify-center gap-1">
          {value}
        </div>
      </motion.div>
    </div>
  );
}
