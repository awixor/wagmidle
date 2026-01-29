"use client";

import { motion } from "framer-motion";

export type GameCategory = "characters" | "tokens";

interface CategorySwitcherProps {
  activeCategory: GameCategory;
  onCategoryChange: (category: GameCategory) => void;
}

export default function CategorySwitcher({
  activeCategory,
  onCategoryChange,
}: CategorySwitcherProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative inline-flex bg-gray-200 dark:bg-gray-800 rounded-xl p-1">
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500"
          layoutId="activeTab"
          initial={false}
          animate={{
            x: activeCategory === "characters" ? 0 : "100%",
            width: "50%",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        <button
          onClick={() => onCategoryChange("characters")}
          className={`relative z-10 px-4 sm:px-6 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
            activeCategory === "characters"
              ? "text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="hidden sm:inline">Characters</span>
            <span className="sm:hidden">Chars</span>
          </span>
        </button>

        <button
          onClick={() => onCategoryChange("tokens")}
          className={`relative z-10 px-4 sm:px-6 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
            activeCategory === "tokens"
              ? "text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tokens
          </span>
        </button>
      </div>
    </div>
  );
}
