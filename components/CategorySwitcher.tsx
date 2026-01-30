"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Bitcoin, UserRoundSearchIcon, ImageIcon } from "lucide-react";

export enum GameCategory {
  Characters = "characters",
  Tokens = "tokens",
  NFTs = "nfts",
}

interface Tab {
  id: GameCategory;
  label: string;
  shortLabel?: string;
  icon: React.ReactNode;
}

interface CategorySwitcherProps {
  activeCategory: GameCategory;
  onCategoryChange: (category: GameCategory) => void;
}

const TABS: Tab[] = [
  {
    id: GameCategory.Characters,
    label: "Characters",
    shortLabel: "Chars",
    icon: <UserRoundSearchIcon className="w-5 h-5" />,
  },
  {
    id: GameCategory.Tokens,
    label: "Tokens",
    icon: <Bitcoin className="w-5 h-5" />,
  },
  {
    id: GameCategory.NFTs,
    label: "NFTs",
    icon: <ImageIcon className="w-5 h-5" />,
  },
];

export default function CategorySwitcher({
  activeCategory,
  onCategoryChange,
}: CategorySwitcherProps) {
  const activeIndex = useMemo(
    () => TABS.findIndex((tab) => tab.id === activeCategory),
    [activeCategory],
  );

  const tabCount = TABS.length;
  const tabWidthPercent = 100 / tabCount;

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative inline-flex bg-gray-200 dark:bg-gray-800 rounded-xl p-1">
        {/* Animated background indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500"
          style={{
            width: `calc(${tabWidthPercent}% - 4px)`,
            left: 4,
          }}
          initial={false}
          animate={{
            x: `calc(${activeIndex * 100}% + ${activeIndex * 4}px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        {/* Tab buttons */}
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              className={`relative z-10 px-4 sm:px-6 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.shortLabel ? (
                  <>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </>
                ) : (
                  tab.label
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
